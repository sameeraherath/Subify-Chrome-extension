# Documentation Guide

## 📚 Complete Documentation Overview

This project now has comprehensive documentation to help users, developers, and contributors understand and work with the YouTube Subtitle Translator Chrome extension.

## 📁 Documentation Files

### 1. **README.md** - Main Documentation

- **Purpose**: Primary documentation for end users and developers
- **Contains**:
  - Project overview and features
  - Installation instructions
  - Usage guide
  - Quick start for developers
  - Testing guidelines
  - Contributing information
  - License and support information

### 2. **API.md** - API Integration Documentation

- **Purpose**: Detailed documentation of the MyMemory Translation API integration
- **Contains**:
  - API provider information
  - Authentication details
  - Endpoint documentation
  - Request/Response examples with code
  - Error handling strategies
  - Rate limits and best practices
  - Testing the API
  - Code implementation examples

### 3. **api-documentation.yaml** - OpenAPI/Swagger Specification

- **Purpose**: Machine-readable API specification following OpenAPI 3.0 standard
- **Contains**:
  - Complete API schema definitions
  - Request/Response models
  - Parameter specifications
  - Error response structures
  - Example requests and responses
  - Language code references

### 4. **ARCHITECTURE.md** - Architecture Documentation

- **Purpose**: Technical architecture and system design documentation
- **Contains**:
  - System architecture diagrams
  - Component breakdown
  - Data flow diagrams
  - Code structure explanation
  - Performance considerations
  - Security guidelines
  - Future enhancement plans

### 5. **CONTRIBUTING.md** - Contribution Guidelines

- **Purpose**: Guide for contributors wanting to help improve the project
- **Contains**:
  - Code of conduct
  - Development setup instructions
  - Coding standards
  - Testing guidelines
  - Pull request process
  - Bug reporting templates
  - Enhancement suggestion process

### 6. **LICENSE** - MIT License

- **Purpose**: Legal license information
- **Contains**:
  - MIT License text
  - Copyright information
  - Usage permissions

## 🔍 How to View/Use Each Document

### README.md

**View in**:

- GitHub (automatically displayed)
- Any Markdown viewer
- VS Code with Markdown preview (`Ctrl+Shift+V`)

**Best for**: Getting started, understanding features, installation

### API.md

**View in**:

- Any Markdown viewer
- VS Code with Markdown preview
- GitHub

**Best for**: Understanding API integration, implementing translations, debugging API issues

### api-documentation.yaml (OpenAPI/Swagger)

This is a machine-readable API specification. Here are several ways to view it:

#### Option 1: Swagger Editor Online (Recommended)

1. Go to [https://editor.swagger.io/](https://editor.swagger.io/)
2. Click **File** → **Import file**
3. Select your `api-documentation.yaml` file
4. View the interactive documentation in the right panel
5. Try out API calls directly from the interface

#### Option 2: VS Code with Extensions

1. Install the **Swagger Viewer** extension:
   - Open VS Code
   - Press `Ctrl+Shift+X`
   - Search for "Swagger Viewer"
   - Install the extension by Arjun G
2. Open `api-documentation.yaml`
3. Press `Shift+Alt+P` (Windows/Linux) or `Shift+Option+P` (Mac)
4. View the rendered documentation in preview pane

Popular VS Code Extensions:

- **Swagger Viewer** by Arjun G
- **OpenAPI (Swagger) Editor** by 42Crunch
- **YAML** by Red Hat (for syntax highlighting)

#### Option 3: Swagger UI Locally

```bash
# Using npx (no installation needed)
npx swagger-ui-cli api-documentation.yaml

# Or install globally
npm install -g swagger-ui-cli
swagger-ui-cli api-documentation.yaml
```

#### Option 4: Redoc (Alternative Viewer)

```bash
# Using npx
npx redoc-cli serve api-documentation.yaml

# Or install globally
npm install -g redoc-cli
redoc-cli serve api-documentation.yaml
```

#### Option 5: Online YAML Viewer

1. Go to [https://redocly.github.io/redoc/](https://redocly.github.io/redoc/)
2. Or [https://petstore.swagger.io/](https://petstore.swagger.io/)
3. Enter the URL or paste the YAML content

### ARCHITECTURE.md

**View in**:

- Any Markdown viewer
- VS Code with Markdown preview
- GitHub

**Best for**: Understanding system design, modifying code, architectural decisions

### CONTRIBUTING.md

**View in**:

- GitHub (linked from main README)
- Any Markdown viewer
- VS Code with Markdown preview

**Best for**: Contributing code, reporting bugs, suggesting features

## 🎯 Quick Start Guide by Role

### For End Users

1. Read **README.md** (Features & Installation sections)
2. Follow installation instructions
3. Check **Support** section if you encounter issues

### For Developers Integrating the Extension

1. Read **README.md** (Full overview)
2. Study **ARCHITECTURE.md** (Understand system design)
3. Review **API.md** (Learn API integration)
4. Check **api-documentation.yaml** in Swagger Editor (See API specs)
5. Examine source code files

### For Contributors

1. Read **README.md** (Understand the project)
2. Read **CONTRIBUTING.md** (Follow contribution guidelines)
3. Study **ARCHITECTURE.md** (Understand codebase structure)
4. Review **API.md** (Understand API usage)
5. Set up development environment
6. Make changes and test
7. Submit PR following guidelines

### For API Integration

1. Read **API.md** (Complete API guide)
2. View **api-documentation.yaml** in Swagger Editor (Interactive API docs)
3. Test API calls using examples
4. Implement in your code
5. Handle errors properly

## 🛠️ Setting Up Documentation Tools

### Install VS Code Extensions (Recommended)

```bash
# Open VS Code
# Press Ctrl+Shift+X
# Search and install:
```

1. **Markdown All in One** - Enhanced Markdown editing
2. **Markdown Preview Enhanced** - Better Markdown preview
3. **Swagger Viewer** - View OpenAPI/Swagger specs
4. **YAML** - YAML syntax highlighting
5. **OpenAPI (Swagger) Editor** - OpenAPI editing support

### Install Node.js Tools (Optional)

```bash
# Install Swagger UI CLI
npm install -g swagger-ui-cli

# Install Redoc CLI
npm install -g redoc-cli

# Install OpenAPI CLI tools
npm install -g @openapitools/openapi-generator-cli
```

## 📖 Documentation Structure

```
youtube-subtitle-translator/
│
├── README.md                  # Main documentation (START HERE)
│   ├── Features & Overview
│   ├── Installation Guide
│   ├── Usage Instructions
│   ├── Quick Start Development
│   └── Links to other docs
│
├── API.md                     # API Integration Guide
│   ├── API Overview
│   ├── Authentication
│   ├── Endpoints Details
│   ├── Code Examples
│   ├── Error Handling
│   └── Testing Guide
│
├── api-documentation.yaml     # OpenAPI/Swagger Spec
│   ├── API Schema
│   ├── Request/Response Models
│   ├── Parameters
│   ├── Error Structures
│   └── Examples
│
├── ARCHITECTURE.md           # Architecture Documentation
│   ├── System Architecture
│   ├── Component Details
│   ├── Data Flow
│   ├── Performance Notes
│   └── Security Guidelines
│
├── CONTRIBUTING.md          # Contribution Guide
│   ├── Code of Conduct
│   ├── Development Setup
│   ├── Coding Standards
│   ├── Testing Guidelines
│   └── PR Process
│
└── LICENSE                 # MIT License
    └── Legal Information
```

## 🔗 External Documentation Links

### Chrome Extensions

- [Chrome Extensions Documentation](https://developer.chrome.com/docs/extensions/)
- [Manifest V3 Guide](https://developer.chrome.com/docs/extensions/mv3/intro/)
- [Content Scripts](https://developer.chrome.com/docs/extensions/mv3/content_scripts/)
- [Storage API](https://developer.chrome.com/docs/extensions/reference/storage/)

### MyMemory Translation API

- [Official API Documentation](https://mymemory.translated.net/doc/)
- [API Specification](https://mymemory.translated.net/doc/spec.php)
- [Supported Languages](https://mymemory.translated.net/doc/spec.php)

### Web APIs Used

- [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [MutationObserver](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver)
- [Chrome Storage API](https://developer.chrome.com/docs/extensions/reference/storage/)

## 💡 Tips for Using Documentation

### For Reading

1. **Start with README.md** - Get the big picture
2. **Use table of contents** - Jump to relevant sections
3. **Follow code examples** - Try them in your browser console
4. **Check diagrams** - Visualize data flow and architecture

### For Contributing

1. **Update relevant docs** when making changes
2. **Keep examples current** with code changes
3. **Add screenshots** for visual changes
4. **Test documentation links** before committing

### For API Integration

1. **Use Swagger Editor** for interactive exploration
2. **Test API calls** in browser console first
3. **Read error handling** section carefully
4. **Check rate limits** before implementation

## 🎨 Viewing Swagger/OpenAPI Documentation

### Method 1: Swagger Editor (Best for Development)

1. **Online**:

   - Visit https://editor.swagger.io/
   - File → Import File → Select `api-documentation.yaml`
   - Interactive documentation appears on the right
   - Try API calls directly

2. **Local**:
   ```bash
   npx swagger-ui-cli api-documentation.yaml
   # Opens browser at http://localhost:8080
   ```

### Method 2: Redoc (Best for Presentation)

```bash
npx redoc-cli serve api-documentation.yaml
# Opens browser with beautiful documentation
```

### Method 3: VS Code (Best for Editing)

1. Install "Swagger Viewer" extension
2. Open `api-documentation.yaml`
3. Press `Shift+Alt+P` (or `Shift+Option+P` on Mac)
4. Preview pane shows rendered documentation

### Method 4: Postman (Best for Testing)

1. Open Postman
2. File → Import → Select `api-documentation.yaml`
3. API collection is created automatically
4. Test endpoints directly

## 📱 Quick Reference Card

| Need to...        | Read...                | View with...        |
| ----------------- | ---------------------- | ------------------- |
| Install extension | README.md              | Any Markdown viewer |
| Use extension     | README.md → Usage      | Browser/GitHub      |
| Understand API    | API.md                 | Markdown viewer     |
| See API schema    | api-documentation.yaml | Swagger Editor      |
| Modify code       | ARCHITECTURE.md        | VS Code             |
| Contribute        | CONTRIBUTING.md        | Markdown viewer     |
| Report bug        | README.md → Support    | GitHub Issues       |

## ✅ Documentation Checklist

- [x] README.md - Complete overview
- [x] API.md - Detailed API documentation
- [x] api-documentation.yaml - OpenAPI specification
- [x] ARCHITECTURE.md - System architecture
- [x] CONTRIBUTING.md - Contribution guidelines
- [x] LICENSE - Legal information
- [ ] Add screenshots to README.md
- [ ] Create video tutorial (optional)
- [ ] Add FAQ section (optional)

## 🚀 Next Steps

1. **Review all documentation files**
2. **Test API using Swagger Editor**
3. **Add screenshots** to README.md
4. **Share with team** or community
5. **Gather feedback** and improve

## 📞 Need Help?

- **General questions**: Open a [Discussion](https://github.com/sameeraherath/youtube-subtitle-translator/discussions)
- **Documentation issues**: Open an [Issue](https://github.com/sameeraherath/youtube-subtitle-translator/issues)
- **API problems**: Check [API.md](API.md) and [api-documentation.yaml](api-documentation.yaml)

---

**Happy Documentation Reading! 📚**

_This guide is part of the YouTube Subtitle Translator project._
