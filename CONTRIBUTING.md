# Contributing to YouTube Subtitle Translator

Thank you for your interest in contributing to the YouTube Subtitle Translator! This document provides guidelines and instructions for contributing to the project.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [How to Contribute](#how-to-contribute)
- [Coding Standards](#coding-standards)
- [Testing Guidelines](#testing-guidelines)
- [Pull Request Process](#pull-request-process)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Enhancements](#suggesting-enhancements)

## Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inspiring community for all. Please be respectful and constructive in all interactions.

### Expected Behavior

- Use welcoming and inclusive language
- Be respectful of differing viewpoints and experiences
- Gracefully accept constructive criticism
- Focus on what is best for the community

## Getting Started

### Prerequisites

- **Browser**: Chrome or Chromium-based browser
- **Git**: For version control
- **Text Editor**: VS Code, Sublime Text, or your preferred editor
- **Basic Knowledge**: JavaScript, Chrome Extensions API, HTML/CSS

### Development Setup

1. **Fork the Repository**

   Click the "Fork" button at the top right of the repository page.

2. **Clone Your Fork**

   ```bash
   git clone https://github.com/YOUR-USERNAME/youtube-subtitle-translator.git
   cd youtube-subtitle-translator
   ```

3. **Set Up Upstream Remote**

   ```bash
   git remote add upstream https://github.com/sameeraherath/youtube-subtitle-translator.git
   ```

4. **Create a Branch**

   ```bash
   git checkout -b feature/your-feature-name
   ```

5. **Load Extension in Chrome**

   - Navigate to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select the project directory

## How to Contribute

### Types of Contributions

We welcome various types of contributions:

- 🐛 **Bug Fixes**: Fix existing issues
- ✨ **New Features**: Add new functionality
- 📝 **Documentation**: Improve or add documentation
- 🎨 **UI/UX Improvements**: Enhance user interface
- 🧪 **Tests**: Add or improve test coverage
- 🌍 **Translations**: Add support for more languages
- ⚡ **Performance**: Optimize existing code

### Finding Issues to Work On

- Check the [Issues](https://github.com/sameeraherath/youtube-subtitle-translator/issues) page
- Look for issues labeled `good first issue` or `help wanted`
- Comment on the issue to let others know you're working on it

## Coding Standards

### JavaScript Style Guide

1. **Use Modern JavaScript (ES6+)**

   ```javascript
   // Good
   const translateText = async (text) => {
     const result = await fetch(url);
     return result.json();
   };

   // Avoid
   var translateText = function (text) {
     return fetch(url).then(function (result) {
       return result.json();
     });
   };
   ```

2. **Consistent Indentation**

   - Use 4 spaces for indentation (not tabs)
   - Be consistent throughout the file

3. **Meaningful Variable Names**

   ```javascript
   // Good
   const targetLanguage = "fr";
   const translatedText = await translateText(word);

   // Avoid
   const tl = "fr";
   const t = await translateText(w);
   ```

4. **Comments for Complex Logic**

   ```javascript
   // Create a MutationObserver to detect when YouTube subtitles are loaded
   let observer = new MutationObserver(() => {
     attachListener();
   });
   ```

5. **Error Handling**

   Always use try-catch for async operations:

   ```javascript
   async function translateText(text) {
     try {
       const response = await fetch(url);
       if (!response.ok) {
         throw new Error("Network response was not ok");
       }
       return await response.json();
     } catch (error) {
       console.error("Translation error:", error);
       return "Error translating text";
     }
   }
   ```

### File Organization

```
youtube-subtitle-translator/
├── manifest.json          # Keep updated with new permissions
├── content.js            # Main logic - keep modular
├── popup.html            # UI structure
├── popup.js              # UI logic
├── background.js         # Background tasks
├── styles/               # CSS files (if added)
├── utils/                # Helper functions (if added)
└── tests/                # Test files (if added)
```

## Testing Guidelines

### Manual Testing Checklist

Before submitting a PR, test the following:

#### Basic Functionality

- [ ] Extension loads without errors
- [ ] Popup opens and displays correctly
- [ ] Language selection works
- [ ] Settings are saved and persist

#### YouTube Integration

- [ ] Extension works on YouTube video pages
- [ ] Subtitles are detected correctly
- [ ] Hover over subtitle words triggers translation
- [ ] Tooltip appears with correct translation
- [ ] Tooltip follows cursor movement
- [ ] Tooltip disappears after 2 seconds

#### Edge Cases

- [ ] Works with different video lengths
- [ ] Handles videos without subtitles gracefully
- [ ] Works with auto-generated subtitles
- [ ] Works with manually uploaded subtitles
- [ ] Handles multiple rapid hovers
- [ ] Works with special characters (é, ñ, ö, etc.)

#### Different Languages

- [ ] Test with at least 3 different target languages
- [ ] Verify translations are accurate
- [ ] Check for encoding issues

#### Error Handling

- [ ] Test with no internet connection
- [ ] Test with API rate limit (if possible)
- [ ] Verify error messages are user-friendly

### Browser Testing

Test on multiple Chromium-based browsers:

- [ ] Google Chrome
- [ ] Microsoft Edge
- [ ] Brave
- [ ] Opera

### Performance Testing

- [ ] Check CPU usage while translating
- [ ] Monitor memory consumption
- [ ] Verify no memory leaks after prolonged use
- [ ] Test on slower network connections

## Pull Request Process

### Before Submitting

1. **Update from Upstream**

   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Test Thoroughly**

   Complete the testing checklist above.

3. **Update Documentation**

   If your changes affect:

   - User-facing features → Update README.md
   - API integration → Update API.md
   - Architecture → Update ARCHITECTURE.md
   - Installation/setup → Update relevant sections

4. **Commit Messages**

   Use clear, descriptive commit messages:

   ```
   Good:
   ✅ Add support for Korean language translation
   ✅ Fix tooltip positioning on wide screens
   ✅ Improve error handling for API failures

   Avoid:
   ❌ Update
   ❌ Fix bug
   ❌ Changes
   ```

   Format:

   ```
   Type: Short description (50 chars or less)

   More detailed explanation if needed (wrap at 72 chars).
   Explain what and why, not how.

   - Bullet points are okay
   - Use present tense: "Add feature" not "Added feature"
   ```

   Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

### Submitting the PR

1. **Push Your Branch**

   ```bash
   git push origin feature/your-feature-name
   ```

2. **Create Pull Request**

   - Go to your fork on GitHub
   - Click "New Pull Request"
   - Select your branch
   - Fill out the PR template

3. **PR Template**

   ```markdown
   ## Description

   Brief description of changes

   ## Type of Change

   - [ ] Bug fix
   - [ ] New feature
   - [ ] Documentation update
   - [ ] Performance improvement

   ## Testing Done

   - [ ] Manual testing on Chrome
   - [ ] Tested with multiple languages
   - [ ] No console errors
   - [ ] Performance verified

   ## Screenshots (if applicable)

   Add screenshots for UI changes

   ## Related Issues

   Closes #issue_number
   ```

4. **Respond to Feedback**

   - Be open to constructive criticism
   - Make requested changes promptly
   - Push additional commits to the same branch

### After PR is Merged

1. **Delete Your Branch**

   ```bash
   git checkout main
   git pull upstream main
   git branch -d feature/your-feature-name
   ```

2. **Celebrate!** 🎉

## Reporting Bugs

### Before Submitting a Bug Report

- Check the [existing issues](https://github.com/sameeraherath/youtube-subtitle-translator/issues)
- Verify the bug in the latest version
- Test in a clean browser profile (no other extensions)

### How to Submit a Good Bug Report

Use this template:

```markdown
## Bug Description

A clear description of what the bug is.

## Steps to Reproduce

1. Go to '...'
2. Click on '...'
3. Hover over '...'
4. See error

## Expected Behavior

What you expected to happen.

## Actual Behavior

What actually happened.

## Screenshots

If applicable, add screenshots.

## Environment

- Browser: Chrome 120.0.6099.109
- Extension Version: 1.0
- OS: Windows 11 / macOS 14 / Ubuntu 22.04
- YouTube Video URL: https://youtube.com/watch?v=...

## Console Errors
```

Paste any console errors here

```

## Additional Context
Any other relevant information.
```

## Suggesting Enhancements

### Before Suggesting

- Check if the enhancement already exists in [Issues](https://github.com/sameeraherath/youtube-subtitle-translator/issues)
- Consider if it aligns with project goals

### How to Suggest an Enhancement

```markdown
## Enhancement Description

Clear description of the proposed feature.

## Problem it Solves

What problem does this enhancement address?

## Proposed Solution

How would you implement this?

## Alternatives Considered

What other solutions did you consider?

## Additional Context

Screenshots, mockups, or examples.
```

## Development Workflow Example

```bash
# 1. Sync with upstream
git checkout main
git pull upstream main

# 2. Create feature branch
git checkout -b feat/add-caching-system

# 3. Make changes
# ... edit files ...

# 4. Test thoroughly
# ... test in Chrome ...

# 5. Commit changes
git add .
git commit -m "feat: Add translation caching to improve performance

Implement in-memory cache for translations to reduce API calls.
Cache expires after 1 hour. Reduces API usage by ~70% for
commonly translated words."

# 6. Push to your fork
git push origin feat/add-caching-system

# 7. Create PR on GitHub
```

## Code Review Process

### What Reviewers Look For

1. **Functionality**: Does it work as intended?
2. **Code Quality**: Is it clean and maintainable?
3. **Testing**: Has it been tested thoroughly?
4. **Documentation**: Are changes documented?
5. **Performance**: Does it impact performance?
6. **Security**: Are there any security concerns?

### Review Timeline

- Initial review: Within 3-5 days
- Follow-up reviews: 1-2 days after changes

## Questions?

If you have questions about contributing:

- Open a [Discussion](https://github.com/sameeraherath/youtube-subtitle-translator/discussions)
- Comment on relevant issues
- Check existing documentation

## Recognition

Contributors will be:

- Listed in the project README
- Acknowledged in release notes
- Appreciated for their time and effort! 🙏

---

Thank you for contributing to YouTube Subtitle Translator! Your efforts help make language learning more accessible for everyone. 🌍✨
