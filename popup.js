// Function to initialize the language dropdown with the stored language
function initializeDropdown() {
  chrome.storage.sync.get('targetLang', (data) => {
      const selectedLang = data.targetLang || 'fr'; // Default to French if no language is set
      const langSelect = document.getElementById('lang-select');
      langSelect.value = selectedLang;
  });
}

// Event listener for language selection
document.addEventListener('DOMContentLoaded', () => {
  initializeDropdown();
  document.getElementById('lang-select').addEventListener('change', (event) => {
      const selectedLang = event.target.value;

      // Save the selected language to Chrome storage
      chrome.storage.sync.set({ targetLang: selectedLang }, () => {
          console.log('Target language set to ' + selectedLang);
      });
  });
});
