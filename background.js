chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason === 'install') {
        console.log('Extension installed for the first time');
    } else if (details.reason === 'update') {
        console.log('Extension updated from version ' + details.previousVersion);
    }
});
