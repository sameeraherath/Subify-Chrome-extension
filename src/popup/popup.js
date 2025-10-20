// Import utilities
import { LANGUAGE_NAMES, EXTENSION_CONFIG } from '../utils/constants.js';
import { getStoredLanguage, setStoredLanguage } from '../utils/storage.js';

// Function to initialize the language dropdown with the stored language
async function initializeDropdown() {
  try {
    const selectedLang = await getStoredLanguage();
    const langSelect = document.getElementById('lang-select');
    langSelect.value = selectedLang;

    // Add visual feedback when language changes
    langSelect.addEventListener('change', async (event) => {
        const selectedLang = event.target.value;

        // Check if user selected a language other than Sinhala
        if (!EXTENSION_CONFIG.CURRENTLY_SUPPORTED.includes(selectedLang)) {
            showComingSoonToast(selectedLang);
            // Reset to Sinhala
            langSelect.value = EXTENSION_CONFIG.DEFAULT_LANGUAGE;
            return;
        }

        // Save the language preference
        await setStoredLanguage(selectedLang);

        // Add a subtle animation to the select element
        langSelect.style.transform = 'scale(1.02)';
        setTimeout(() => {
            langSelect.style.transform = 'scale(1)';
        }, 150);
    });
  } catch (error) {
    console.error('Error initializing dropdown:', error);
  }
}

// Show coming soon toast message
function showComingSoonToast(selectedLang) {
  // Create toast element
  const toast = document.createElement('div');
  toast.className = 'coming-soon-toast';
  toast.innerHTML = `
    <div class="toast-content">
      <div class="toast-text">
        <div class="toast-title">Coming Soon!</div>
        <div class="toast-message">${getLanguageName(selectedLang)} translation will be available in the next version</div>
      </div>
    </div>
  `;

  // Add toast styles - improved responsive design
  toast.style.cssText = `
    position: fixed;
    top: 15px;
    left: 50%;
    transform: translateX(-50%);
    background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%);
    color: white;
    padding: 14px 18px;
    border-radius: 10px;
    box-shadow: 0 6px 25px rgba(0, 0, 0, 0.4);
    z-index: 10000;
    opacity: 0;
    transform: translateX(-50%) translateY(-30px);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    border: 1px solid rgba(255, 255, 255, 0.15);
    max-width: calc(100vw - 40px);
    width: 280px;
    text-align: center;
    backdrop-filter: blur(10px);
  `;

  // Add content styles
  const toastContent = toast.querySelector('.toast-content');
  toastContent.style.cssText = `
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  `;

  const toastText = toast.querySelector('.toast-text');
  toastText.style.cssText = `
    width: 100%;
  `;

  const toastTitle = toast.querySelector('.toast-title');
  toastTitle.style.cssText = `
    font-weight: 600;
    font-size: 15px;
    margin-bottom: 4px;
    color: #4ade80;
    line-height: 1.2;
  `;

  const toastMessage = toast.querySelector('.toast-message');
  toastMessage.style.cssText = `
    font-size: 13px;
    opacity: 0.85;
    line-height: 1.4;
    word-wrap: break-word;
    hyphens: auto;
  `;

  document.body.appendChild(toast);

  // Animate in with improved easing
  requestAnimationFrame(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateX(-50%) translateY(0)';
  });

  // Remove after 4.5 seconds with improved timing
  setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(-50%) translateY(-30px)';
      setTimeout(() => {
          if (toast.parentNode) {
              toast.parentNode.removeChild(toast);
          }
      }, 400);
  }, 4500);
}

// Get language name from language code
function getLanguageName(langCode) {
  return LANGUAGE_NAMES[langCode] || langCode;
}


// Enhanced status indicator
function updateStatusIndicator() {
  const statusDot = document.querySelector('.status-dot');
  const statusText = document.querySelector('.status span');

  // Check if extension context is valid
  if (chrome.runtime?.id) {
      statusDot.style.background = '#4ade80';
      statusText.textContent = 'Extension Active';
  } else {
      statusDot.style.background = '#f87171';
      statusText.textContent = 'Extension Inactive';
  }
}

// Keyboard shortcuts
function setupKeyboardShortcuts() {
  document.addEventListener('keydown', (event) => {
      if (event.ctrlKey && event.key === 's') {
          event.preventDefault();
          const langSelect = document.getElementById('lang-select');
          langSelect.focus();
      }
  });
}

// Add smooth transitions and hover effects
function addInteractiveEffects() {
  const langSelect = document.getElementById('lang-select');

  // Add focus effect
  langSelect.addEventListener('focus', () => {
      langSelect.style.transform = 'scale(1.02)';
      langSelect.style.boxShadow = '0 0 0 3px rgba(255, 255, 255, 0.3)';
  });

  // Remove focus effect
  langSelect.addEventListener('blur', () => {
      langSelect.style.transform = 'scale(1)';
      langSelect.style.boxShadow = 'none';
  });

  // Add click effect
  langSelect.addEventListener('mousedown', () => {
      langSelect.style.transform = 'scale(0.98)';
  });

  langSelect.addEventListener('mouseup', () => {
      langSelect.style.transform = 'scale(1.02)';
  });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', async () => {
  await initializeDropdown();
  updateStatusIndicator();
  setupKeyboardShortcuts();
  addInteractiveEffects();

  // Set default language to Sinhala if not already set
  try {
    const currentLang = await getStoredLanguage();
    if (!currentLang) {
      await setStoredLanguage(EXTENSION_CONFIG.DEFAULT_LANGUAGE);
    }
  } catch (error) {
    console.error('Error setting default language:', error);
  }

  // Setup privacy policy and links
  setupPrivacyAndLinks();
});

// Setup privacy policy button and external links
function setupPrivacyAndLinks() {
  // Privacy policy button
  const privacyBtn = document.getElementById('privacy-details');
  if (privacyBtn) {
      privacyBtn.addEventListener('click', () => {
          showPrivacyModal();
      });
  }

  // GitHub link
  const githubLink = document.getElementById('github-link');
  if (githubLink) {
      githubLink.addEventListener('click', (e) => {
          e.preventDefault();
          chrome.tabs.create({ url: 'https://github.com/sameeraherath' });
      });
  }

  // Support link
  const supportLink = document.getElementById('support-link');
  if (supportLink) {
      supportLink.addEventListener('click', (e) => {
          e.preventDefault();
          chrome.tabs.create({ url: 'https://github.com/sameeraherath/subify-chrome-extension' });
      });
  }
}

// Show privacy policy modal
function showPrivacyModal() {
  // Create modal overlay
  const modal = document.createElement('div');
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    z-index: 10000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
  `;

  // Create modal content
  const modalContent = document.createElement('div');
  modalContent.style.cssText = `
    background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%);
    color: white;
    padding: 20px;
    border-radius: 15px;
    max-width: 400px;
    max-height: 80vh;
    overflow-y: auto;
    position: relative;
  `;

  modalContent.innerHTML = `
    <button id="close-modal" style="
      position: absolute;
      top: 10px;
      right: 15px;
      background: none;
      border: none;
      color: white;
      font-size: 20px;
      cursor: pointer;
    ">×</button>

    <h2 style="margin-bottom: 15px; font-size: 18px;">🔒 Privacy Policy</h2>

    <div style="font-size: 12px; line-height: 1.5;">
      <h3 style="margin: 15px 0 8px 0; font-size: 14px;">Data Collection</h3>
      <p>Subify does not collect, store, or transmit any personal information. We respect your privacy completely.</p>

      <h3 style="margin: 15px 0 8px 0; font-size: 14px;">Local Storage</h3>
      <p>Only your language preference is stored locally in your browser using Chrome's storage API. This data never leaves your device.</p>

      <h3 style="margin: 15px 0 8px 0; font-size: 14px;">Translation Service</h3>
      <p>Text translations are sent directly to MyMemory Translation API. We do not store or log any translated content.</p>

      <h3 style="margin: 15px 0 8px 0; font-size: 14px;">No Tracking</h3>
      <p>We do not use analytics, tracking pixels, or any other monitoring tools. Your browsing activity remains private.</p>

      <h3 style="margin: 15px 0 8px 0; font-size: 14px;">Third-Party Services</h3>
      <p>We only use MyMemory Translation API for translations. Please review their privacy policy for their data practices.</p>

      <h3 style="margin: 15px 0 8px 0; font-size: 14px;">Contact</h3>
      <p>For privacy questions, contact us through our GitHub repository.</p>
    </div>
  `;

  modal.appendChild(modalContent);
  document.body.appendChild(modal);

  // Close modal functionality
  const closeBtn = modalContent.querySelector('#close-modal');
  closeBtn.addEventListener('click', () => {
      document.body.removeChild(modal);
  });

  // Close on overlay click
  modal.addEventListener('click', (e) => {
      if (e.target === modal) {
          document.body.removeChild(modal);
      }
  });

  // Close on Escape key
  const handleEscape = (e) => {
      if (e.key === 'Escape') {
          document.body.removeChild(modal);
          document.removeEventListener('keydown', handleEscape);
      }
  };
  document.addEventListener('keydown', handleEscape);
}
