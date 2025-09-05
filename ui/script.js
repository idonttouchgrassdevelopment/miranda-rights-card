// Global variables for configuration
let mirandaRights = [];
let uiSettings = {};

// Listen for messages from the game client
window.addEventListener('message', function(event) {
    var item = event.data;
    
    // Handle UI visibility
    if (item.type === "ui") {
        if (item.status) {
            // Store config data
            if (item.config) {
                mirandaRights = item.config.rights;
                uiSettings = item.config.uiSettings;
                
                // Update UI with config data
                updateUIFromConfig();
            }
            
            // Show the UI
            document.getElementById("miranda-card").classList.add('visible');
        } else {
            // Hide the UI
            document.getElementById("miranda-card").classList.remove('visible');
        }
    }
});

// Update UI elements based on config
function updateUIFromConfig() {
    // Update title
    if (uiSettings.Title) {
        document.getElementById("card-title").textContent = uiSettings.Title;
    }
    
    // Update button text
    if (uiSettings.AcknowledgeButtonText) {
        document.getElementById("acknowledge-rights").textContent = uiSettings.AcknowledgeButtonText;
    }
    
    if (uiSettings.CloseButtonText) {
        document.getElementById("close-card").textContent = uiSettings.CloseButtonText;
    }
    
    // Update rights text
    const rightsTextContainer = document.getElementById("rights-text");
    rightsTextContainer.innerHTML = ''; // Clear existing content
    
    // Add each right as a paragraph
    mirandaRights.forEach((right, index) => {
        const paragraph = document.createElement('p');
        paragraph.textContent = `${index + 1}. ${right}`;
        rightsTextContainer.appendChild(paragraph);
    });
}

// Close button functionality
document.getElementById("close-card").addEventListener('click', function() {
    // Send message to client script to close UI
    $.post('https://miranda-rights-card/close', JSON.stringify({}));
});

// Acknowledge rights button functionality
document.getElementById("acknowledge-rights").addEventListener('click', function() {
    // Send message to client script to trigger acknowledgment
    $.post('https://miranda-rights-card/acknowledge', JSON.stringify({}));
    
    // Visual feedback that the button was pressed
    const button = document.getElementById("acknowledge-rights");
    button.style.backgroundColor = "#2a5e95";
    button.textContent = "Acknowledged";
    
    // Reset button after 2 seconds
    setTimeout(() => {
        button.style.backgroundColor = "#3a6ea5";
        button.textContent = uiSettings.AcknowledgeButtonText || "I Understand";
    }, 2000);
});

// Close UI when pressing Escape key
document.addEventListener('keyup', function(event) {
    if (event.key === "Escape") {
        $.post('https://miranda-rights-card/close', JSON.stringify({}));
    }
});

// Prevent form submission
document.addEventListener('submit', function(event) {
    event.preventDefault();
});