// Import utilities
import { translateText } from '../utils/api.js';
import { getStoredLanguage } from '../utils/storage.js';
import { UI_CONFIG } from '../utils/constants.js';

// Enhanced tooltip creation with better styling
function createTooltip(text, translatedText, event) {
    const tooltip = document.createElement('div');
    tooltip.className = 'subify-tooltip';

    // Apply modern styling
    Object.assign(tooltip.style, {
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        padding: '8px 12px',
        fontSize: '14px',
        fontWeight: '500',
        zIndex: '10000',
        pointerEvents: 'none',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
        backdropFilter: 'blur(10px)',
        maxWidth: `${UI_CONFIG.MAX_TOOLTIP_WIDTH}px`,
        wordWrap: 'break-word',
        opacity: '0',
        transform: 'translateY(5px)',
        transition: 'all 0.2s ease-out'
    });

    // Add content with original and translated text
    tooltip.innerHTML = `
        <div style="font-size: 12px; opacity: 0.7; margin-bottom: 2px;">${text}</div>
        <div style="font-weight: 600;">${translatedText}</div>
    `;

    document.body.appendChild(tooltip);

    // Position tooltip
    positionTooltip(tooltip, event);

    // Animate in
    requestAnimationFrame(() => {
        tooltip.style.opacity = '1';
        tooltip.style.transform = 'translateY(0)';
    });

    return tooltip;
}

// Smart positioning function
function positionTooltip(tooltip, event) {
    const rect = tooltip.getBoundingClientRect();
    const viewport = {
        width: window.innerWidth,
        height: window.innerHeight
    };

    let x = event.clientX + UI_CONFIG.TOOLTIP_OFFSET_X;
    let y = event.clientY - rect.height - UI_CONFIG.TOOLTIP_OFFSET_Y;

    // Adjust if tooltip goes off screen
    if (x + rect.width > viewport.width) {
        x = event.clientX - rect.width - UI_CONFIG.TOOLTIP_OFFSET_X;
    }
    if (y < 0) {
        y = event.clientY + UI_CONFIG.TOOLTIP_OFFSET_Y;
    }

    tooltip.style.left = x + 'px';
    tooltip.style.top = y + 'px';
}

// Function to handle mouse hover over subtitles
async function handleMouseOver(event) {
    const word = event.target.textContent.trim();

    if (word.length === 0) return;

    try {
        // Get stored language preference
        const targetLang = await getStoredLanguage();

        // Translate the word
        const translatedWord = await translateText(word, targetLang);

        // Create and show tooltip
        const tooltip = createTooltip(word, translatedWord, event);

        // Function to update tooltip position
        function updateTooltipPosition(event) {
            positionTooltip(tooltip, event);
        }

        // Update the tooltip position when the mouse moves
        document.addEventListener('mousemove', updateTooltipPosition);

        // Automatically remove the tooltip after configured duration
        setTimeout(() => {
            if (tooltip.parentNode) {
                tooltip.style.opacity = '0';
                tooltip.style.transform = 'translateY(5px)';
                setTimeout(() => {
                    if (tooltip.parentNode) {
                        document.body.removeChild(tooltip);
                    }
                }, UI_CONFIG.ANIMATION_DURATION);
            }
            document.removeEventListener('mousemove', updateTooltipPosition);
        }, UI_CONFIG.TOOLTIP_DURATION);

    } catch (error) {
        console.error('Translation error:', error);
    }
}

// Function to attach mouse hover event listeners to subtitle elements
function attachListener() {
    // Get all subtitle elements by class name
    const subtitleElements = document.getElementsByClassName('ytp-caption-segment');

    // Iterate over subtitle elements and attach event listener
    Array.from(subtitleElements).forEach(subtitle => {
        // Remove existing listeners to prevent duplicates
        subtitle.removeEventListener('mouseover', handleMouseOver);
        subtitle.addEventListener('mouseover', handleMouseOver);
    });
}

// Create a MutationObserver to detect when YouTube subtitles are loaded
let observer = new MutationObserver(() => {
    attachListener();
});

// Observe changes in the document body to capture dynamically loaded subtitles
observer.observe(document.body, {
    childList: true,
    subtree: true
});

// Initial attachment
attachListener();

console.log('Subify content script loaded successfully');


