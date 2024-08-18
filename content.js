// Function to translate text using MyMemory Translation API
async function translateText(text) {
    try {
        // Retrieve the selected language from storage
        const { targetLang } = await chrome.storage.sync.get('targetLang');
        
        // Default to French if no language is set
        const lang = targetLang || 'fr';
    
        // Fetch translation from MyMemory Translation API
        const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${lang}`);
        
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

// Function to handle mouse hover over subtitles
function handleMouseOver(event) {
    const word = event.target.textContent;

    translateText(word).then(translatedWord => {
        // Create a tooltip element
        const tooltip = document.createElement('div');
        tooltip.style.position = 'absolute';
        tooltip.style.backgroundColor = 'yellow';
        tooltip.style.color = 'black';  // Better contrast for readability
        tooltip.style.border = '1px solid black';
        tooltip.style.fontSize = '25px';
        tooltip.style.borderRadius = '5px';
        tooltip.style.padding = '6px';
        tooltip.style.zIndex = '1000';
        tooltip.style.pointerEvents = 'none';  // Prevent tooltip from capturing mouse events
        tooltip.innerText = translatedWord;
        document.body.appendChild(tooltip);

        // Position the tooltip slightly offset from the cursor
        tooltip.style.left = (event.clientX + 10) + 'px';  // Position to the right of the cursor
        tooltip.style.top = (event.clientY + 10) + 'px';   // Position below the cursor

        // Function to update tooltip position
        function updateTooltipPosition(event) {
            tooltip.style.left = (event.clientX + 10) + 'px';  // Position to the right of the cursor
            tooltip.style.top = (event.clientY + 10) + 'px';   // Position below the cursor
        }

        // Update the tooltip position when the mouse moves
        document.addEventListener('mousemove', updateTooltipPosition);

        // Automatically remove the tooltip after 2 seconds
        setTimeout(() => {
            document.body.removeChild(tooltip);  // Remove the tooltip from the DOM
            document.removeEventListener('mousemove', updateTooltipPosition);  // Stop updating tooltip position
        }, 2000);
    });
}

// Example usage: Attach the handleMouseOver function to subtitle elements
document.querySelectorAll('.subtitle').forEach(element => {
    element.addEventListener('mouseover', handleMouseOver);
});

// Function to attach mouse hover event listeners to subtitle elements
function attachListener() {
    // Get all subtitle elements by class name
    const subtitleElements = document.getElementsByClassName('ytp-caption-segment');

    // Iterate over subtitle elements and attach event listener
    Array.from(subtitleElements).forEach(subtitle => {
        subtitle.addEventListener('mouseover', handleMouseOver);
    });
}

// Create a MutationObserver to detect when YouTube subtitles are loaded and then attach the event listeners
let observer = new MutationObserver(() => {
    attachListener();
});

// Observe changes in the document body to capture dynamically loaded subtitles
observer.observe(document.body, {
    childList: true,
    subtree: true
});


