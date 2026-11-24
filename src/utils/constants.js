// Constants used throughout the extension
export const EXTENSION_CONFIG = {
  NAME: 'Subify',
  VERSION: '1.1.0',
  DEFAULT_LANGUAGE: 'si',
  SUPPORTED_LANGUAGES: [
    'fr', 'es', 'de', 'si', 'ar', 'zh-CN', 'zh-TW',
    'ja', 'ko', 'ru', 'pt', 'it', 'nl', 'sv', 'pl', 'tr', 'vi',
    'hi', 'bn', 'id', 'th', 'he', 'uk'
  ]
};

export const UI_CONFIG = {
  TOOLTIP_DURATION: 2000, // 2 seconds
  TOAST_DURATION: 4500, // 4.5 seconds
  ANIMATION_DURATION: 300, // 0.3 seconds
  MAX_TOOLTIP_WIDTH: 200,
  TOOLTIP_OFFSET_X: 15,
  TOOLTIP_OFFSET_Y: 10
};

export const API_CONFIG = {
  BASE_URL: 'https://api.mymemory.translated.net/get',
  TIMEOUT: 5000, // 5 seconds
  RETRY_ATTEMPTS: 3
};

// Message types exchanged between the content script and the background worker
export const MESSAGE_TYPES = {
  TRANSLATE: 'SUBIFY_TRANSLATE'
};

export const STORAGE_KEYS = {
  TARGET_LANGUAGE: 'targetLang',
  USER_PREFERENCES: 'userPreferences',
  TRANSLATION_HISTORY: 'translationHistory'
};

// Language mapping for display names
export const LANGUAGE_NAMES = {
  'fr': 'French',
  'es': 'Spanish',
  'de': 'German',
  'si': 'Sinhala',
  'ar': 'Arabic',
  'zh-CN': 'Chinese (Simplified)',
  'zh-TW': 'Chinese (Traditional)',
  'ja': 'Japanese',
  'ko': 'Korean',
  'ru': 'Russian',
  'pt': 'Portuguese',
  'it': 'Italian',
  'nl': 'Dutch',
  'sv': 'Swedish',
  'pl': 'Polish',
  'tr': 'Turkish',
  'vi': 'Vietnamese',
  'hi': 'Hindi',
  'bn': 'Bengali',
  'id': 'Indonesian',
  'th': 'Thai',
  'he': 'Hebrew',
  'uk': 'Ukrainian'
};
