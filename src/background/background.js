import { translateText } from '../utils/api.js';
import { MESSAGE_TYPES } from '../utils/constants.js';

chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    console.log('Extension installed for the first time');
  } else if (details.reason === 'update') {
    console.log('Extension updated from version ' + details.previousVersion);
  }
});

// Translation requests come from the content script. The fetch has to run
// here: requests made from the content script run in the YouTube page's
// context, where Chrome blocks them ("Unsafe attempt to load URL ...").
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message?.type !== MESSAGE_TYPES.TRANSLATE) {
    return false;
  }

  translateText(message.text, message.targetLang).then(sendResponse);
  return true; // keep the channel open for the async response
});
