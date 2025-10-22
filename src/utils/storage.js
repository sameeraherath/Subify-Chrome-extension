// Import from constants to avoid duplication
import { STORAGE_KEYS } from './constants.js';

// Get stored language preference
export async function getStoredLanguage() {
  try {
    if (!chrome.runtime?.id) {
      console.warn('Extension context invalidated');
      return 'si'; // Default to Sinhala
    }

    const result = await chrome.storage.sync.get(STORAGE_KEYS.TARGET_LANGUAGE);
    return result[STORAGE_KEYS.TARGET_LANGUAGE] || 'si'; // Default to Sinhala
  } catch (error) {
    console.warn('Could not access storage:', error);
    return 'si'; // Default to Sinhala
  }
}

// Set language preference
export async function setStoredLanguage(language) {
  try {
    if (!chrome.runtime?.id) {
      console.warn('Extension context invalidated');
      return false;
    }

    await chrome.storage.sync.set({ [STORAGE_KEYS.TARGET_LANGUAGE]: language });
    console.log('Language preference saved:', language);
    return true;
  } catch (error) {
    console.error('Could not save language preference:', error);
    return false;
  }
}

// Clear all stored data
export async function clearStorage() {
  try {
    if (!chrome.runtime?.id) {
      console.warn('Extension context invalidated');
      return false;
    }

    await chrome.storage.sync.clear();
    return true;
  } catch (error) {
    console.error('Could not clear storage:', error);
    return false;
  }
}
