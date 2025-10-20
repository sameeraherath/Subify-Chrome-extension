// API configuration and utilities
export const API_CONFIG = {
  BASE_URL: 'https://api.mymemory.translated.net/get',
  DEFAULT_LANGUAGE: 'si', // Sinhala
  FALLBACK_LANGUAGE: 'si'
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
  'vi': 'Vietnamese'
};

// Translation API function
export async function translateText(text, targetLang = API_CONFIG.DEFAULT_LANGUAGE) {
  try {
    const response = await fetch(
      `${API_CONFIG.BASE_URL}?q=${encodeURIComponent(text)}&langpair=en|${targetLang}`
    );

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data.responseData.translatedText;
  } catch (error) {
    console.error('Translation error:', error);
    return 'Error translating text';
  }
}
