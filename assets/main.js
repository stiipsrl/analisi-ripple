document.addEventListener('DOMContentLoaded', function() {
    // Function to load tab content
    function loadTabContent(tabId) {
        const contentUrl = `views/${tabId}-content.html`;
        const tabContent = document.getElementById(tabId);
        
        // Check if content is already loaded
        if (!tabContent.hasChildNodes()) {
            fetch(contentUrl)
                .then(response => response.text())
                .then(html => {
                    tabContent.innerHTML = html;
                })
                .catch(error => {
                    console.error('Error loading tab content:', error);
                    //tabContent.innerHTML = '<p class="text-red-500">Error loading content</p>';
                });
        }
    }
    
    // Load content for initially active tab
    const activeTab = document.querySelector('.tab-btn.active');
    if (activeTab) {
        const initialTabId = activeTab.dataset.tab;
        loadTabContent(initialTabId);
        document.getElementById(initialTabId).classList.add('active');
    }
    
    // Add click handlers to tab buttons
    document.querySelectorAll('.tab-btn').forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.dataset.tab;
            
            // Remove active class from all tabs
            document.querySelectorAll('.tab-btn').forEach(btn => 
                btn.classList.remove('active')
            );
            document.querySelectorAll('.tab-content').forEach(content => 
                content.classList.remove('active')
            );
            
            // Add active class to clicked tab
            button.classList.add('active');
            document.getElementById(tabId).classList.add('active');
            
            // Load content for the tab if not already loaded
            loadTabContent(tabId);
        });
    });
});