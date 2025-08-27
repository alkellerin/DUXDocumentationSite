let isInitialized = false;

function initializeNavigation() {
    if (isInitialized) return;
    
    console.log('Initializing navigation...');
    
    // Setup sidebar navigation
    setupSidebar();
    
    // Setup horizontal tabs (use event delegation for dynamic content)
    setupHorizontalTabs();
    
    isInitialized = true;
    console.log('✓ Navigation ready');
}

function setupSidebar() {
    const sidebarButtons = document.querySelectorAll('.nav-item[data-tab]');
    const contentSections = document.querySelectorAll('.content-section');
    
    console.log(`Sidebar: ${sidebarButtons.length} buttons, ${contentSections.length} sections`);
    
    sidebarButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('data-tab');
            const targetSection = document.getElementById(targetId);
            
            if (!targetSection) return;
            
            // Hide all sections, show target
            contentSections.forEach(section => section.classList.add('hidden'));
            targetSection.classList.remove('hidden');
            
            // Update active states
            sidebarButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            console.log(`Switched to: ${targetId}`);
        });
    });
    
    // Show initial content
    const activeButton = document.querySelector('.nav-item.sub.active');
    if (activeButton) {
        const initialId = activeButton.getAttribute('data-tab');
        const initialSection = document.getElementById(initialId);
        if (initialSection) {
            contentSections.forEach(section => section.classList.add('hidden'));
            initialSection.classList.remove('hidden');
        }
    }
}

function setupHorizontalTabs() {
    // Use event delegation on document to handle all horizontal tabs
    document.addEventListener('click', function(e) {
        const tabButton = e.target.closest('.tab-btn');
        if (!tabButton) return;
        
        e.preventDefault();
        e.stopPropagation();
        
        const targetId = tabButton.getAttribute('data-tab');
        console.log(`🔍 Tab button clicked: "${tabButton.textContent.trim()}" -> ${targetId}`);
        
        const targetPanel = document.getElementById(targetId);
        
        if (!targetPanel) {
            console.error(`❌ Tab panel "${targetId}" not found!`);
            return;
        }
        
        console.log(`✓ Found target panel: ${targetId}`);
        
        // Find the tab container this button belongs to
        const tabContainer = tabButton.closest('.tabs');
        if (!tabContainer) {
            console.error('❌ No .tabs container found for button');
            return;
        }
        
        // Get all buttons and panels in THIS tab container only
        const containerButtons = tabContainer.querySelectorAll('.tab-btn');
        const containerPanels = tabContainer.querySelectorAll('.tab-panel');
        
        console.log(`📊 Container has ${containerButtons.length} buttons and ${containerPanels.length} panels`);
        
        // EXPLICIT CSS CONTROL - Force display states directly
        console.log('🔧 Setting explicit display states...');
        
        // Hide all panels and deactivate all buttons in this container
        containerButtons.forEach(btn => {
            btn.classList.remove('active');
        });
        
        containerPanels.forEach(panel => {
            panel.classList.remove('active');
            panel.style.display = 'none'; // Force hide
            console.log(`  Hidden panel: ${panel.id}`);
        });
        
        // Show target panel and activate button
        tabButton.classList.add('active');
        targetPanel.classList.add('active');
        targetPanel.style.display = 'block'; // Force show
        
        console.log(`  Shown panel: ${targetId}`);
        
        // Verify it worked
        setTimeout(() => {
            const computedStyle = window.getComputedStyle(targetPanel);
            const hasActive = targetPanel.classList.contains('active');
            console.log(`🔍 Final state - Panel ${targetId}: hasActive=${hasActive} display="${computedStyle.display}" inlineStyle="${targetPanel.style.display}"`);
            
            if (computedStyle.display === 'none') {
                console.error(`❌ STILL HIDDEN! Something is overriding our CSS`);
            } else {
                console.log(`✅ Panel ${targetId} is now visible`);
            }
        }, 50);
        
        console.log(`✅ Tab activation completed: ${targetId}`);
    });
    
    console.log('✓ Horizontal tabs ready with explicit CSS control');
}

// Simple initialization - no complex timing needed
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeNavigation);
} else {
    initializeNavigation();
}

// Single fallback for any content loaded after initial load
setTimeout(() => {
    if (!isInitialized) {
        initializeNavigation();
    }
}, 500);