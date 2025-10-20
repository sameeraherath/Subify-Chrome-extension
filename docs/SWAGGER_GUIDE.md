# How to View OpenAPI/Swagger Documentation

## 🎯 Quick Start - View API Documentation Now!

Your project now has a professional OpenAPI/Swagger specification in `api-documentation.yaml`. Here's how to view it interactively:

## ✨ Method 1: Swagger Editor Online (Easiest - No Installation)

### Steps:

1. **Open Swagger Editor**

   - Go to: [https://editor.swagger.io/](https://editor.swagger.io/)

2. **Import Your API Documentation**

   - Click **File** menu (top left)
   - Select **Import file**
   - Browse and select `api-documentation.yaml` from your project folder
   - Or copy the contents of the file and paste it in the left panel

3. **Explore Your API**
   - View rendered documentation on the RIGHT side
   - See all endpoints, parameters, and responses
   - Click "Try it out" to test API calls
   - View example requests and responses

### What You'll See:

```
┌─────────────────────────────────────────────────────────┐
│  Swagger Editor - https://editor.swagger.io/            │
├─────────────────────────────────────────────────────────┤
│  File  Edit  ...                                        │
├──────────────────┬──────────────────────────────────────┤
│                  │                                      │
│  YAML Content    │    Rendered Documentation            │
│  (Left Panel)    │    (Right Panel)                     │
│                  │                                      │
│  openapi: 3.0.3  │  ┌──────────────────────────────┐   │
│  info:           │  │ YouTube Subtitle Translator  │   │
│    title: ...    │  │ API Documentation            │   │
│    version: 1.0  │  │                              │   │
│  paths:          │  │ Endpoints:                   │   │
│    /get:         │  │ GET /get - Translate text    │   │
│      get:        │  │ [Try it out]                 │   │
│        ...       │  │                              │   │
│                  │  │ Parameters:                  │   │
│                  │  │ - q: text to translate       │   │
│                  │  │ - langpair: en|fr            │   │
│                  │  │                              │   │
│                  │  │ Response: 200                │   │
│                  │  │ {                            │   │
│                  │  │   "translatedText": "..."    │   │
│                  │  │ }                            │   │
│                  │  └──────────────────────────────┘   │
└──────────────────┴──────────────────────────────────────┘
```

## 💻 Method 2: VS Code with Extension (For Developers)

### Steps:

1. **Install Swagger Viewer Extension**

   ```
   - Open VS Code
   - Press Ctrl+Shift+X (Extensions)
   - Search for "Swagger Viewer"
   - Install "Swagger Viewer" by Arjun G
   ```

2. **View Documentation**

   ```
   - Open api-documentation.yaml in VS Code
   - Press Shift+Alt+P (Windows) or Shift+Option+P (Mac)
   - Preview appears in side panel
   ```

3. **Alternative: OpenAPI Editor**
   ```
   - Install "OpenAPI (Swagger) Editor" extension
   - Right-click api-documentation.yaml
   - Select "Preview Swagger"
   ```

## 🌐 Method 3: Local Server (Node.js Required)

### Option A: Swagger UI

```bash
# Navigate to your project folder
cd d:\youtube-subtitle-translator\youtube-subtitle-translator

# Run Swagger UI (no installation needed)
npx swagger-ui-cli api-documentation.yaml

# Opens browser at http://localhost:8080
```

### Option B: Redoc (Beautiful Alternative)

```bash
# Navigate to your project folder
cd d:\youtube-subtitle-translator\youtube-subtitle-translator

# Run Redoc
npx redoc-cli serve api-documentation.yaml

# Opens browser at http://localhost:8080
```

## 🎨 Method 4: Redoc Online Viewer

### Steps:

1. **Go to Redoc Demo**

   - Visit: [https://redocly.github.io/redoc/](https://redocly.github.io/redoc/)

2. **Load Your File**
   - Copy content from `api-documentation.yaml`
   - Paste into online viewer
   - Or upload the file if option available

## 📱 Method 5: Postman (For API Testing)

### Steps:

1. **Open Postman**

   - Download from [https://www.postman.com/downloads/](https://www.postman.com/downloads/)

2. **Import API Specification**

   ```
   - Click "Import" button
   - Select "File"
   - Choose api-documentation.yaml
   - API collection is auto-generated
   ```

3. **Test API**
   ```
   - Browse generated requests
   - Modify parameters
   - Send requests
   - View responses
   ```

## 🔍 What You Can Do with the Documentation

### Interactive Features:

✅ **View All Endpoints**

- See GET /get endpoint for translation
- View parameters and their types
- See required vs optional parameters

✅ **Explore Request Parameters**

- `q` - Text to translate
- `langpair` - Language pair (e.g., en|fr)
- `de` - Optional email for higher quota

✅ **See Response Examples**

- Success responses (200)
- Error responses (400, 429, 500)
- JSON structure with examples

✅ **Try API Calls**

- Test translation requests directly
- Modify parameters
- See real responses

✅ **View Data Models**

- TranslationResponse schema
- TranslationMatch schema
- ErrorResponse schema

✅ **Language Reference**

- See all supported language codes
- View language pair examples

## 📊 Documentation Structure

```yaml
openapi: 3.0.3
info:
  title: YouTube Subtitle Translator API Documentation
  description: MyMemory Translation API integration
  version: 1.0.0

paths:
  /get:
    get:
      summary: Translate text
      parameters:
        - q: text to translate
        - langpair: source|target languages
      responses:
        200: Success with translated text
        400: Bad request
        429: Rate limit exceeded

components:
  schemas:
    TranslationResponse: { ... }
    ErrorResponse: { ... }
```

## 🎯 Recommended Viewing Method by Use Case

| Use Case     | Recommended Method    | Why                         |
| ------------ | --------------------- | --------------------------- |
| Quick view   | Swagger Editor Online | No installation, instant    |
| Development  | VS Code Extension     | Integrated with code editor |
| API Testing  | Postman               | Can test requests easily    |
| Presentation | Redoc                 | Beautiful UI                |
| Team Sharing | Swagger Editor Link   | Easy to share URL           |

## 🚀 Next Steps After Viewing

1. **Explore the API Structure**

   - Understand endpoints
   - Review parameters
   - Check response formats

2. **Test API Calls**

   - Try different language pairs
   - Test error scenarios
   - Verify rate limits

3. **Integrate in Code**

   - Use examples from API.md
   - Implement error handling
   - Test thoroughly

4. **Share with Team**
   - Send Swagger Editor link
   - Export as HTML
   - Include in project wiki

## 📝 Example: Testing Translation API

### In Swagger Editor:

1. Click on **GET /get** endpoint
2. Click **"Try it out"** button
3. Enter parameters:
   - `q`: hello
   - `langpair`: en|fr
4. Click **"Execute"**
5. See response:
   ```json
   {
     "responseData": {
       "translatedText": "bonjour"
     },
     "responseStatus": 200
   }
   ```

## 🔗 Quick Links

- **Swagger Editor**: [https://editor.swagger.io/](https://editor.swagger.io/)
- **Redoc**: [https://redocly.github.io/redoc/](https://redocly.github.io/redoc/)
- **Postman**: [https://www.postman.com/downloads/](https://www.postman.com/downloads/)
- **MyMemory API Docs**: [https://mymemory.translated.net/doc/](https://mymemory.translated.net/doc/)

## ❓ Troubleshooting

### Issue: File won't load in Swagger Editor

**Solution**: Check YAML syntax with online validator

### Issue: Can't install VS Code extension

**Solution**: Use Swagger Editor Online instead (no installation needed)

### Issue: npx commands not working

**Solution**: Install Node.js from [https://nodejs.org/](https://nodejs.org/)

### Issue: API calls fail in "Try it out"

**Solution**: CORS restriction - this is normal for browser requests

## 💡 Pro Tips

1. **Bookmark Swagger Editor** with your file loaded
2. **Use VS Code** for quick reference while coding
3. **Export as HTML** for offline viewing
4. **Share link** with team members for collaboration
5. **Update YAML** as API changes

## 🎉 You're All Set!

Your API documentation is professional, interactive, and easy to share. Start with **Swagger Editor Online** - it's the quickest way to see your beautiful API documentation!

---

**Happy API Exploring! 🚀**

_Part of YouTube Subtitle Translator Documentation_
