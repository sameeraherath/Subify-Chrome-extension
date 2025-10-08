# Architecture Documentation

## Overview

The YouTube Subtitle Translator is a Chrome extension built using Manifest V3. It consists of multiple components that work together to provide real-time translation of YouTube subtitles.

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      Chrome Browser                          │
│  ┌────────────────────────────────────────────────────────┐ │
│  │                Extension Components                     │ │
│  │                                                         │ │
│  │  ┌──────────────┐  ┌──────────────┐  ┌─────────────┐ │ │
│  │  │   Popup UI   │  │  Background  │  │   Content   │ │ │
│  │  │  (popup.js)  │  │   Service    │  │   Script    │ │ │
│  │  │              │  │   Worker     │  │ (content.js)│ │ │
│  │  │  - Language  │  │ (background  │  │             │ │ │
│  │  │    Selector  │  │     .js)     │  │ - Subtitle  │ │ │
│  │  │  - Settings  │  │              │  │   Detection │ │ │
│  │  │    Storage   │  │ - Lifecycle  │  │ - Event     │ │ │
│  │  │              │  │   Events     │  │   Handlers  │ │ │
│  │  └──────┬───────┘  └──────────────┘  └──────┬──────┘ │ │
│  │         │                                    │         │ │
│  │         └────────────┬───────────────────────┘         │ │
│  │                      │                                 │ │
│  │              Chrome Storage API                        │ │
│  │              (sync storage)                            │ │
│  └────────────────────────────────────────────────────────┘ │
│                         │                                   │
│                         │ YouTube Page                      │
│  ┌──────────────────────▼──────────────────────────────┐   │
│  │  YouTube Video Player                               │   │
│  │  ┌────────────────────────────────────────────────┐ │   │
│  │  │  Subtitle Elements (.ytp-caption-segment)      │ │   │
│  │  │  - Dynamically loaded                          │ │   │
│  │  │  - Monitored by MutationObserver              │ │   │
│  │  └────────────────────────────────────────────────┘ │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────┬───────────────────────────────────┘
                          │
                          │ HTTPS API Calls
                          ▼
         ┌────────────────────────────────┐
         │   MyMemory Translation API     │
         │   (api.mymemory.translated.net)│
         │                                │
         │   GET /get                     │
         │   - q: text to translate       │
         │   - langpair: en|{target}      │
         │                                │
         │   Response: JSON               │
         │   - translatedText             │
         │   - match quality              │
         │   - translation matches        │
         └────────────────────────────────┘
```

## Component Breakdown

### 1. Manifest Configuration (`manifest.json`)

**Purpose**: Defines extension metadata, permissions, and component entry points.

**Key Properties**:

```json
{
  "manifest_version": 3,
  "permissions": ["storage", "activeTab", "scripting"],
  "background": {
    "service_worker": "background.js"
  },
  "content_scripts": [
    {
      "matches": ["https://www.youtube.com/*"],
      "js": ["content.js"]
    }
  ],
  "action": {
    "default_popup": "popup.html"
  }
}
```

**Permissions Explained**:

- `storage`: Persist user language preferences
- `activeTab`: Access current YouTube tab content
- `scripting`: Inject content scripts dynamically

### 2. Popup Interface (`popup.html` + `popup.js`)

**Purpose**: Provides user interface for language selection and settings.

**Components**:

- HTML dropdown for language selection
- JavaScript for state management and storage interaction

**Data Flow**:

```
User Selection → popup.js → Chrome Storage API → Saved Preference
                                    ↓
                            Retrieved by content.js
```

**Key Functions**:

```javascript
// Initialize dropdown with saved preference
function initializeDropdown()

// Handle language selection changes
document.getElementById('lang-select').addEventListener('change', handler)

// Save to Chrome storage
chrome.storage.sync.set({ targetLang: selectedLang })
```

**Storage Schema**:

```javascript
{
  targetLang: "fr"; // ISO 639-1 language code
}
```

### 3. Background Service Worker (`background.js`)

**Purpose**: Handles extension lifecycle events and background tasks.

**Lifecycle Events**:

- `chrome.runtime.onInstalled`: Triggered on installation or update
- Logs installation/update events for debugging

**Current Implementation**:

```javascript
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === "install") {
    console.log("Extension installed");
  } else if (details.reason === "update") {
    console.log("Extension updated");
  }
});
```

**Future Enhancements**:

- Request management
- Background translation caching
- Analytics and error reporting

### 4. Content Script (`content.js`)

**Purpose**: Main logic for subtitle detection, translation, and tooltip display.

#### 4.1 Subtitle Detection

**Challenge**: YouTube loads subtitles dynamically as video plays.

**Solution**: MutationObserver pattern

```javascript
// Create observer to watch for subtitle changes
let observer = new MutationObserver(() => {
  attachListener();
});

// Observe entire document for subtitle elements
observer.observe(document.body, {
  childList: true, // Watch for added/removed nodes
  subtree: true, // Watch entire tree
});
```

**Target Elements**:

- Class: `.ytp-caption-segment`
- Parent: `.ytp-caption-window-container`
- Dynamically created by YouTube player

#### 4.2 Event Handling

**Flow Diagram**:

```
User hovers over subtitle word
         ↓
handleMouseOver(event) triggered
         ↓
Extract word text from event.target.textContent
         ↓
Call translateText(word)
         ↓
API request to MyMemory
         ↓
Create tooltip element
         ↓
Position tooltip near cursor
         ↓
Attach mousemove listener for following
         ↓
Auto-remove after 2 seconds
```

**Event Listener Attachment**:

```javascript
function attachListener() {
  const subtitleElements = document.getElementsByClassName(
    "ytp-caption-segment"
  );

  Array.from(subtitleElements).forEach((subtitle) => {
    subtitle.addEventListener("mouseover", handleMouseOver);
  });
}
```

#### 4.3 Translation Logic

**Function**: `translateText(text)`

**Process**:

1. Retrieve target language from Chrome storage
2. Build API URL with encoded text and language pair
3. Make fetch request to MyMemory API
4. Parse JSON response
5. Extract translated text
6. Handle errors gracefully

**Code Structure**:

```javascript
async function translateText(text) {
  try {
    // 1. Get user preference
    const { targetLang } = await chrome.storage.sync.get("targetLang");
    const lang = targetLang || "fr";

    // 2. Build API URL
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
      text
    )}&langpair=en|${lang}`;

    // 3. Fetch translation
    const response = await fetch(url);

    // 4. Validate response
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    // 5. Parse and return
    const data = await response.json();
    return data.responseData.translatedText;
  } catch (error) {
    console.error("Translation error:", error);
    return "Error translating text";
  }
}
```

#### 4.4 Tooltip System

**Creation and Styling**:

```javascript
const tooltip = document.createElement("div");
tooltip.style.position = "absolute";
tooltip.style.backgroundColor = "yellow";
tooltip.style.color = "black";
tooltip.style.fontSize = "25px";
tooltip.style.borderRadius = "5px";
tooltip.style.padding = "6px";
tooltip.style.zIndex = "1000";
tooltip.style.pointerEvents = "none"; // Prevent tooltip from blocking mouse
tooltip.innerText = translatedWord;
document.body.appendChild(tooltip);
```

**Positioning**:

```javascript
// Initial position
tooltip.style.left = event.clientX + 10 + "px";
tooltip.style.top = event.clientY + 10 + "px";

// Update position on mouse move
function updateTooltipPosition(event) {
  tooltip.style.left = event.clientX + 10 + "px";
  tooltip.style.top = event.clientY + 10 + "px";
}
document.addEventListener("mousemove", updateTooltipPosition);
```

**Cleanup**:

```javascript
setTimeout(() => {
  document.body.removeChild(tooltip);
  document.removeEventListener("mousemove", updateTooltipPosition);
}, 2000);
```

## Data Flow

### Complete User Interaction Flow

```
1. User clicks extension icon
   ↓
2. popup.html loads with popup.js
   ↓
3. popup.js calls chrome.storage.sync.get('targetLang')
   ↓
4. Dropdown populated with saved preference (or default 'fr')
   ↓
5. User selects language (e.g., 'es' for Spanish)
   ↓
6. Change event triggers
   ↓
7. chrome.storage.sync.set({ targetLang: 'es' })
   ↓
8. User navigates to YouTube video with subtitles
   ↓
9. content.js injected into page (matches: youtube.com/*)
   ↓
10. MutationObserver starts monitoring for subtitles
   ↓
11. YouTube loads subtitle elements (.ytp-caption-segment)
   ↓
12. Observer detects new elements
   ↓
13. attachListener() adds mouseover handlers
   ↓
14. User hovers over word "hello"
   ↓
15. handleMouseOver(event) triggered
   ↓
16. translateText("hello") called
   ↓
17. Retrieves targetLang from storage ('es')
   ↓
18. Fetch request: GET /get?q=hello&langpair=en|es
   ↓
19. MyMemory API processes request
   ↓
20. Response: { translatedText: "hola", ... }
   ↓
21. Create tooltip element
   ↓
22. Set content: "hola"
   ↓
23. Position at cursor location
   ↓
24. Attach mousemove listener for tooltip following
   ↓
25. After 2 seconds, remove tooltip and cleanup listeners
```

## API Integration Architecture

### MyMemory Translation API

**Endpoint**: `GET https://api.mymemory.translated.net/get`

**Request Pattern**:

```
Extension → HTTPS Request → MyMemory Server
                ↓
        Query Parameters:
        - q: URL-encoded text
        - langpair: "en|{targetLang}"
                ↓
        Response: JSON
                ↓
Extension ← Translated Text ← MyMemory Server
```

**Response Structure**:

```json
{
  "responseData": {
    "translatedText": "translated text here",
    "match": 0.95
  },
  "quotaFinished": false,
  "responseStatus": 200,
  "matches": [...]
}
```

**Error Handling Strategy**:

1. Network errors → Try-catch in translateText()
2. API errors (status !== 200) → Check response.ok
3. Invalid responses → Return fallback message
4. Quota exceeded → Log warning, show error to user

## Storage Architecture

### Chrome Storage Sync

**Type**: `chrome.storage.sync`

**Benefits**:

- Synchronized across user's Chrome instances
- Persists across browser sessions
- Limited to 100KB total (sufficient for language preference)

**Schema**:

```typescript
interface StorageSchema {
  targetLang: string; // ISO 639-1 code (e.g., 'fr', 'es', 'de')
}
```

**Operations**:

1. **Write** (popup.js):

```javascript
chrome.storage.sync.set({ targetLang: "fr" }, () => {
  console.log("Language preference saved");
});
```

2. **Read** (content.js, popup.js):

```javascript
chrome.storage.sync.get("targetLang", (data) => {
  const lang = data.targetLang || "fr"; // Default fallback
});
```

## Performance Considerations

### 1. Subtitle Detection Performance

**Challenge**: MutationObserver can fire frequently on YouTube
**Optimization**: Debounce or throttle observer callbacks

```javascript
let timeoutId;
let observer = new MutationObserver(() => {
  clearTimeout(timeoutId);
  timeoutId = setTimeout(attachListener, 100); // Debounce 100ms
});
```

### 2. API Request Performance

**Current**: Each hover triggers new API request
**Optimization**: Implement caching

```javascript
const translationCache = new Map();

async function translateTextCached(text) {
  const cacheKey = `${text}_${lang}`;
  if (translationCache.has(cacheKey)) {
    return translationCache.get(cacheKey);
  }

  const translation = await translateText(text);
  translationCache.set(cacheKey, translation);
  return translation;
}
```

### 3. Memory Management

**Challenge**: Multiple tooltips and event listeners
**Solution**: Proper cleanup in setTimeout

```javascript
setTimeout(() => {
  // Remove tooltip from DOM
  if (tooltip && tooltip.parentNode) {
    document.body.removeChild(tooltip);
  }

  // Remove event listener
  document.removeEventListener("mousemove", updateTooltipPosition);
}, 2000);
```

## Security Considerations

### 1. Content Security Policy (CSP)

- Extension follows Manifest V3 CSP requirements
- No inline scripts or styles
- External API calls allowed (MyMemory is HTTPS)

### 2. API Security

- No API key exposed (free tier)
- HTTPS only for all requests
- No sensitive user data transmitted

### 3. User Privacy

- Only language preference stored locally
- No tracking or analytics
- No data sent to third parties except translation API

## Extension Lifecycle

```
Installation
     ↓
background.js: onInstalled event
     ↓
User configures language (popup.js)
     ↓
Settings saved to Chrome storage
     ↓
User visits YouTube
     ↓
content.js injected automatically
     ↓
MutationObserver starts
     ↓
Subtitle detection begins
     ↓
User interaction (hover)
     ↓
Translation requested
     ↓
Tooltip displayed
     ↓
Cleanup after 2s
     ↓
(Repeat for each hover)
```

## Technology Stack

| Component        | Technology            | Version     |
| ---------------- | --------------------- | ----------- |
| Extension API    | Chrome Extensions     | Manifest V3 |
| JavaScript       | ES2017+ (async/await) | -           |
| Translation API  | MyMemory Translation  | REST API    |
| Storage          | Chrome Storage Sync   | -           |
| DOM Manipulation | Native JavaScript     | -           |
| Event Handling   | MutationObserver API  | -           |

## File Structure

```
youtube-subtitle-translator/
│
├── manifest.json           # Extension configuration
│   └── Defines: permissions, content scripts, background worker
│
├── popup.html             # User interface
│   └── Contains: language dropdown, settings form
│
├── popup.js               # UI logic
│   └── Handles: language selection, storage operations
│
├── content.js             # Main functionality
│   └── Handles: subtitle detection, translation, tooltips
│
├── background.js          # Background tasks
│   └── Handles: lifecycle events, installation
│
├── images/                # Icons
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
│
├── README.md              # User documentation
├── API.md                 # API documentation
├── ARCHITECTURE.md        # This file
└── api-documentation.yaml # OpenAPI/Swagger spec
```

## Future Architecture Enhancements

### 1. Caching Layer

```
content.js → Cache Manager → IndexedDB
                ↓
           API Manager → MyMemory API
```

### 2. Settings Manager

```
popup.js → Settings Service → Chrome Storage
                ↓
         Validation Layer
```

### 3. Error Reporting

```
All Components → Error Logger → Background Service → Analytics
```

### 4. Multi-API Support

```
Translation Manager
    ├── MyMemory Adapter
    ├── Google Translate Adapter (future)
    └── DeepL Adapter (future)
```

## Debugging and Development

### Chrome DevTools Access

1. **Popup Debug**: Right-click extension icon → Inspect popup
2. **Content Script Debug**: F12 on YouTube page → Console
3. **Background Script Debug**: chrome://extensions → Inspect service worker

### Log Locations

- Popup logs: Popup DevTools console
- Content script logs: YouTube page console
- Background logs: Background service worker console

### Common Debug Scenarios

```javascript
// Check if content script is loaded
console.log("YouTube Subtitle Translator loaded");

// Check storage state
chrome.storage.sync.get("targetLang", (data) => console.log(data));

// Monitor subtitle detection
const observer = new MutationObserver((mutations) => {
  console.log("Mutations detected:", mutations.length);
  attachListener();
});
```

---

**Document Version**: 1.0.0  
**Last Updated**: December 2024  
**Author**: Development Team
