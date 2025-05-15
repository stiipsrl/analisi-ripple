// document.addEventListener('DOMContentLoaded', function() {
//     // Load content for tabs
//     loadTabContent('overview', 'views/overview-content.html');
    
//     // Add click handlers to tab buttons
//     document.querySelectorAll('.tab-btn').forEach(button => {
//         button.addEventListener('click', () => {
//             const tabId = button.dataset.tab;
            
//             // Remove active class from all tabs
//             document.querySelectorAll('.tab-btn').forEach(btn => 
//                 btn.classList.remove('active')
//             );
//             document.querySelectorAll('.tab-content').forEach(content => 
//                 content.classList.remove('active')
//             );
            
//             // Add active class to clicked tab
//             button.classList.add('active');
//             document.getElementById(tabId).classList.add('active');
            
//             // Load content if not already loaded
//             loadTabContent(tabId, `${tabId}-content.html`);
//         });
//     });
// });

function loadTabContent(tabId, contentUrl) {
    const tabContent = document.getElementById(tabId);
    
    // Check if content is already loaded
    if (!tabContent.hasChildNodes()) {
        fetch(contentUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.text();
            })
            .then(html => {
                tabContent.innerHTML = html;
                initializeTabSpecificFunctionality(tabId);
            })
            .catch(error => {
                console.error('Error loading tab content:', error);
                tabContent.innerHTML = `<p class="text-red-500">Error loading content: ${error.message}</p>`;
            });
    }
}

function initializeTabSpecificFunctionality(tabId) {
    switch(tabId) {
        case 'analysis':
            initializeSprintTimeline();
            break;
        case 'demo':
            initializeDemoScreen();
            break;
    }
}

function initializeSprintTimeline() {
    // Add animation to sprint items
    document.querySelectorAll('.sprint-item').forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
        item.classList.add('animate-fadeIn');
    });
}

function initializeDemoScreen() {
    // Initialize demo screen interactions
    const demoButtons = document.querySelectorAll('.demo-button');
    demoButtons.forEach(button => {
        button.addEventListener('click', handleDemoInteraction);
    });
    
    // Add QR scanner animation
    const scannerButton = document.querySelector('[data-action="scan-qr"]');
    if (scannerButton) {
        scannerButton.addEventListener('click', simulateQRScan);
    }
}

function handleDemoInteraction(event) {
    const button = event.currentTarget;
    const action = button.dataset.action;
    
    // Add visual feedback
    button.classList.add('active');
    setTimeout(() => button.classList.remove('active'), 200);
    
    // Handle specific demo actions
    switch(action) {
        case 'check-in':
            simulateCheckIn();
            break;
        case 'check-out':
            simulateCheckOut();
            break;
    }
}

function simulateQRScan() {
    const scannerContainer = document.querySelector('.qr-scanner-container');
    if (scannerContainer) {
        scannerContainer.classList.add('scanning');
        setTimeout(() => {
            scannerContainer.classList.remove('scanning');
            // Show success message or update UI
            const statusMessage = document.createElement('div');
            statusMessage.className = 'bg-green-100 text-green-800 p-2 rounded text-sm text-center mt-2';
            statusMessage.textContent = 'QR Code scansionato con successo!';
            scannerContainer.parentNode.appendChild(statusMessage);
            
            setTimeout(() => {
                statusMessage.remove();
            }, 3000);
        }, 1500);
    }
}

function simulateCheckIn() {
    // Update UI to show check-in successful
    const statusElement = document.querySelector('.status-indicator');
    if (statusElement) {
        statusElement.innerHTML = '<span class="inline-block w-2 h-2 bg-blue-500 rounded-full mr-2"></span><span class="text-sm font-medium text-blue-700">In lavorazione</span>';
    }
}

function simulateCheckOut() {
    // Update UI to show check-out successful
    const statusElement = document.querySelector('.status-indicator');
    if (statusElement) {
        statusElement.innerHTML = '<span class="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span><span class="text-sm font-medium text-green-700">Pronto</span>';
    }
}