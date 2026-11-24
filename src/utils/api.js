import { EXTENSION_CONFIG } from './constants.js';

// API configuration and utilities
export const API_CONFIG = {
  BASE_URL: 'https://api.mymemory.translated.net/get',
  DEFAULT_LANGUAGE: 'si', // Sinhala
  FALLBACK_LANGUAGE: 'si'
};

// Translation API function
export async function translateText(text, targetLang = API_CONFIG.DEFAULT_LANGUAGE) {
  try {
    if (!text || !text.trim()) {
      return '';
    }

    const lang = EXTENSION_CONFIG.SUPPORTED_LANGUAGES.includes(targetLang)
      ? targetLang
      : API_CONFIG.FALLBACK_LANGUAGE;

    const response = await fetch(
      `${API_CONFIG.BASE_URL}?q=${encodeURIComponent(text)}&langpair=en|${lang}`
    );

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    // MyMemory returns HTTP 200 even for errors (invalid language, quota
    // exceeded); the real status is in responseStatus and the error message
    // is placed in translatedText, so it must not be shown to the user.
    const translatedText = data?.responseData?.translatedText;
    if (Number(data?.responseStatus) !== 200 || !translatedText) {
      throw new Error(
        `Translation API error (${data?.responseStatus}): ${data?.responseDetails || 'no translation returned'}`
      );
    }

    return translatedText;
  } catch (error) {
    console.error('Translation error:', error);
    return 'Error translating text';
  }
}
