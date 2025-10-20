# API Documentation

## Overview

The Subify extension integrates with the **MyMemory Translation API** to provide real-time translation services. This document provides detailed information about the API integration, usage patterns, and best practices.

## Table of Contents

- [API Provider Information](#api-provider-information)
- [Authentication](#authentication)
- [Endpoints](#endpoints)
- [Request/Response Examples](#requestresponse-examples)
- [Error Handling](#error-handling)
- [Rate Limits](#rate-limits)
- [Supported Languages](#supported-languages)
- [Code Implementation](#code-implementation)
- [Testing the API](#testing-the-api)

## API Provider Information

- **Service Name**: MyMemory Translation API
- **Provider**: Translated.net
- **Base URL**: `https://api.mymemory.translated.net`
- **Protocol**: HTTPS/REST
- **Response Format**: JSON
- **Official Documentation**: [https://mymemory.translated.net/doc/](https://mymemory.translated.net/doc/)

## Authentication

### Free Tier (Anonymous)

- **No authentication required**
- Limit: **100 requests per day**
- No registration needed

### Registered Tier

- **Optional email parameter**: `de=your@email.com`
- Limit: **1,000 requests per day**
- Free registration at [MyMemory](https://mymemory.translated.net/)

### Premium Tier

- **API Key required**: `key=YOUR_API_KEY`
- Higher limits and priority processing
- Contact provider for pricing

## Endpoints

### GET /get - Translate Text

Translates text from source language to target language.

**Endpoint**: `GET https://api.mymemory.translated.net/get`

**Query Parameters**:

| Parameter  | Type   | Required | Description                     | Example            |
| ---------- | ------ | -------- | ------------------------------- | ------------------ |
| `q`        | string | Yes      | Text to translate               | `hello`            |
| `langpair` | string | Yes      | Source and target language pair | `en\|fr`           |
| `de`       | string | No       | Email for increased quota       | `user@example.com` |
| `key`      | string | No       | API key for premium access      | `your-api-key`     |

**Language Pair Format**: `source|target` (e.g., `en|fr` for English to French)

## Request/Response Examples

### Example 1: Basic Translation Request

**Request**:

```http
GET https://api.mymemory.translated.net/get?q=hello&langpair=en|fr
```

**JavaScript (fetch)**:

```javascript
const text = "hello";
const langPair = "en|fr";
const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
  text
)}&langpair=${langPair}`;

const response = await fetch(url);
const data = await response.json();
console.log(data.responseData.translatedText); // Output: "bonjour"
```

**Response**:

```json
{
  "responseData": {
    "translatedText": "bonjour",
    "match": 1
  },
  "quotaFinished": false,
  "mtLangSupported": null,
  "responseDetails": "",
  "responseStatus": 200,
  "responderId": "0",
  "exception_code": null,
  "matches": [
    {
      "id": "0",
      "segment": "hello",
      "translation": "bonjour",
      "source": "en-US",
      "target": "fr-FR",
      "quality": "74",
      "reference": null,
      "usage-count": 2,
      "subject": "All",
      "created-by": "MT!",
      "last-updated-by": "MT!",
      "create-date": "2024-01-01",
      "last-update-date": "2024-01-01",
      "match": 1
    }
  ]
}
```

### Example 2: Translation with Email (Higher Quota)

**Request**:

```javascript
const text = "How are you?";
const langPair = "en|es";
const email = "your@email.com";
const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
  text
)}&langpair=${langPair}&de=${email}`;

const response = await fetch(url);
const data = await response.json();
console.log(data.responseData.translatedText); // Output: "¿Cómo estás?"
```

### Example 3: Phrase Translation

**Request**:

```http
GET https://api.mymemory.translated.net/get?q=good%20morning&langpair=en|de
```

**Response**:

```json
{
  "responseData": {
    "translatedText": "Guten Morgen",
    "match": 0.95
  },
  "quotaFinished": false,
  "responseStatus": 200
}
```

## Error Handling

### Common Error Responses

#### 1. Invalid Language Pair (400)

```json
{
  "responseData": {
    "translatedText": ""
  },
  "responseDetails": "INVALID LANGUAGE PAIR SPECIFIED. EXAMPLE: EN|IT",
  "responseStatus": 400
}
```

#### 2. Quota Exceeded (429)

```json
{
  "responseData": {
    "translatedText": ""
  },
  "responseDetails": "QUOTA EXCEEDED",
  "responseStatus": 429,
  "quotaFinished": true
}
```

#### 3. Network Error

```javascript
try {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return data.responseData.translatedText;
} catch (error) {
  console.error("Translation error:", error);
  return "Error translating text";
}
```

### Error Handling Best Practices

1. **Always check response status**:

```javascript
if (!response.ok) {
  throw new Error("Network response was not ok");
}
```

2. **Validate API response structure**:

```javascript
if (data.responseData && data.responseData.translatedText) {
  return data.responseData.translatedText;
} else {
  throw new Error("Invalid response structure");
}
```

3. **Handle quota limits gracefully**:

```javascript
if (data.quotaFinished) {
  console.warn("Translation quota exceeded");
  return "Translation limit reached";
}
```

## Rate Limits

| Tier       | Requests/Day | Authentication | Cost |
| ---------- | ------------ | -------------- | ---- |
| Anonymous  | 100          | None           | Free |
| Registered | 1,000        | Email          | Free |
| Premium    | Custom       | API Key        | Paid |

### Rate Limit Headers

The API doesn't provide rate limit headers, but you can track usage locally:

```javascript
let requestCount = 0;
const MAX_REQUESTS = 100;

async function translateWithRateLimit(text, langPair) {
  if (requestCount >= MAX_REQUESTS) {
    throw new Error("Daily rate limit exceeded");
  }

  const result = await translateText(text, langPair);
  requestCount++;
  return result;
}
```

## Supported Languages

**Current Version (v1.0)**:
The extension currently supports translation from English (`en`) to:
- **Sinhala** (`si`) - Primary supported language

**Coming Soon (v2.0)**:
The extension will support translation from English (`en`) to the following languages:

| Language   | Code | Language              | Code    |
| ---------- | ---- | --------------------- | ------- |
| French     | `fr` | Arabic                | `ar`    |
| Spanish    | `es` | Chinese (Simplified)  | `zh-CN` |
| German     | `de` | Chinese (Traditional) | `zh-TW` |
| Sinhala    | `si` | Japanese              | `ja`    |
| Korean     | `ko` | Russian               | `ru`    |
| Portuguese | `pt` | Italian               | `it`    |
| Dutch      | `nl` | Swedish               | `sv`    |
| Polish     | `pl` | Turkish               | `tr`    |
| Vietnamese | `vi` |                       |         |

> **Note**: When users attempt to select languages other than Sinhala, the extension displays a "Coming Soon" toast notification indicating that multi-language support will be available in the next version.

### Language Code Reference

**Format**: ISO 639-1 (two-letter codes)

- For regional variants: `language-REGION` (e.g., `zh-CN`, `zh-TW`)
- **Source language**: Always `en` (English) in this extension
- **Target language**: User-selected from dropdown

## Code Implementation

### Current Implementation in Extension

**Location**: `content.js`

```javascript
// Function to translate text using MyMemory Translation API
async function translateText(text) {
  try {
    // Retrieve the selected language from storage
    const { targetLang } = await chrome.storage.sync.get("targetLang");

    // Default to French if no language is set
    const lang = targetLang || "fr";

    // Fetch translation from MyMemory Translation API
    const response = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
        text
      )}&langpair=en|${lang}`
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data.responseData.translatedText;
  } catch (error) {
    console.error("Translation error:", error);
    return "Error translating text";
  }
}
```

### Enhanced Implementation with Better Error Handling

```javascript
async function translateText(text) {
  try {
    // Retrieve the selected language from storage
    const { targetLang } = await chrome.storage.sync.get("targetLang");
    const lang = targetLang || "fr";

    // Validate input
    if (!text || text.trim() === "") {
      return "";
    }

    // Build API URL
    const apiUrl = new URL("https://api.mymemory.translated.net/get");
    apiUrl.searchParams.set("q", text);
    apiUrl.searchParams.set("langpair", `en|${lang}`);

    // Optional: Add email for higher quota
    // apiUrl.searchParams.set('de', 'your@email.com');

    // Fetch translation with timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5s timeout

    const response = await fetch(apiUrl, {
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Check for API-level errors
    if (data.responseStatus !== 200) {
      throw new Error(data.responseDetails || "Translation failed");
    }

    // Check for quota exceeded
    if (data.quotaFinished) {
      console.warn("Translation quota exceeded");
      return "Quota exceeded";
    }

    // Validate response data
    if (!data.responseData || !data.responseData.translatedText) {
      throw new Error("Invalid response structure");
    }

    return data.responseData.translatedText;
  } catch (error) {
    if (error.name === "AbortError") {
      console.error("Translation request timeout");
      return "Request timeout";
    }

    console.error("Translation error:", error);
    return "Translation error";
  }
}
```

### Caching Implementation (Optional)

To reduce API calls and improve performance:

```javascript
// Simple cache with expiration
const translationCache = new Map();
const CACHE_DURATION = 3600000; // 1 hour in milliseconds

async function translateTextWithCache(text) {
  const { targetLang } = await chrome.storage.sync.get("targetLang");
  const lang = targetLang || "fr";
  const cacheKey = `${text}_${lang}`;

  // Check cache
  const cached = translationCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.translation;
  }

  // Fetch new translation
  const translation = await translateText(text);

  // Store in cache
  translationCache.set(cacheKey, {
    translation,
    timestamp: Date.now(),
  });

  return translation;
}
```

## Testing the API

### Manual Testing with cURL

```bash
# Basic translation
curl "https://api.mymemory.translated.net/get?q=hello&langpair=en|fr"

# Translation with email
curl "https://api.mymemory.translated.net/get?q=hello&langpair=en|es&de=your@email.com"

# Phrase translation
curl "https://api.mymemory.translated.net/get?q=good%20morning&langpair=en|de"
```

### Testing in Browser Console

```javascript
// Test basic translation
fetch("https://api.mymemory.translated.net/get?q=hello&langpair=en|fr")
  .then((response) => response.json())
  .then((data) => console.log(data));

// Test different languages
const languages = ["fr", "es", "de", "si"];
languages.forEach(async (lang) => {
  const response = await fetch(
    `https://api.mymemory.translated.net/get?q=hello&langpair=en|${lang}`
  );
  const data = await response.json();
  console.log(`${lang}: ${data.responseData.translatedText}`);
});
```

### Unit Testing Example

```javascript
// Example using Jest
describe("translateText", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
    chrome.storage.sync.get = jest.fn();
  });

  test("should translate text successfully", async () => {
    chrome.storage.sync.get.mockResolvedValue({ targetLang: "fr" });

    global.fetch.mockResolvedValue({
      ok: true,
      json: async () => ({
        responseData: { translatedText: "bonjour" },
        responseStatus: 200,
        quotaFinished: false,
      }),
    });

    const result = await translateText("hello");
    expect(result).toBe("bonjour");
  });

  test("should handle errors gracefully", async () => {
    chrome.storage.sync.get.mockResolvedValue({ targetLang: "fr" });
    global.fetch.mockRejectedValue(new Error("Network error"));

    const result = await translateText("hello");
    expect(result).toBe("Error translating text");
  });
});
```

## Best Practices

### 1. Request Optimization

- **Cache translations** to avoid repeated API calls
- **Debounce requests** for frequently hovered words
- **Batch requests** when possible (though API doesn't support batch natively)

### 2. Error Handling

- Always implement try-catch blocks
- Provide user-friendly error messages
- Log errors for debugging

### 3. Performance

- Set request timeouts (5-10 seconds)
- Handle slow network conditions gracefully
- Consider using service workers for background requests

### 4. User Experience

- Show loading indicators for slow translations
- Cache frequently used translations
- Provide fallback content on errors

### 5. Rate Limit Management

- Track request count locally
- Implement request throttling
- Consider upgrading to registered tier for higher limits

## Additional Resources

- **Official API Documentation**: https://mymemory.translated.net/doc/
- **API Specification**: https://mymemory.translated.net/doc/spec.php
- **OpenAPI/Swagger Documentation**: See `api-documentation.yaml` in this repository
- **Provider Website**: https://mymemory.translated.net/

## Support and Issues

For API-related issues:

- Check the [official FAQ](https://mymemory.translated.net/doc/faq.php)
- Contact MyMemory support through their website
- Report extension-specific issues in the GitHub repository

---

**Last Updated**: December 2024  
**API Version**: v1  
**Document Version**: 1.0.0
