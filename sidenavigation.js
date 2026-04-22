var navItems = document.querySelectorAll('.nav-item');
var contentSections = document.querySelectorAll('.content-section');

function showContent(tabId) {
    // Hide all content sections
    contentSections.forEach(function(section) {
        section.classList.add('hidden');
    });
    
    // Show selected content section
    var targetSection = document.getElementById(tabId);
    if (targetSection) {
        targetSection.classList.remove('hidden');
    }
    
    // Update active states - remove from all
    navItems.forEach(function(item) {
        item.classList.remove('active');
    });
    
    // Add active class to clicked item
    var activeItem = document.querySelector('[data-tab="' + tabId + '"]');
    if (activeItem) {
        activeItem.classList.add('active');
    }

        var parentTab = activeItem.getAttribute('data-parent');
        if (parentTab) {
            var parentItem = document.querySelector('[data-tab="' + parentTab + '"]');
            if (parentItem) {
                parentItem.classList.add('active');
            }
        }
}

function closeAllDropdowns() {
    // Find all sub items
    var allSubItems = document.querySelectorAll('.nav-item.sub');
    var allDropdownIcons = document.querySelectorAll('.dropdown-arrow');
    
    // Close all sub items
    allSubItems.forEach(function(item) {
        item.classList.remove('show');
    });
    
    // Reset all dropdown icons
    allDropdownIcons.forEach(function(icon) {
        icon.classList.remove('expanded');
    });
}

function toggleDropdown(parentTab) {
    // Find all sub items related to this parent
    var subItems = document.querySelectorAll('.nav-item.sub[data-parent="' + parentTab + '"]');
    var dropdownIcon = document.querySelector('[data-tab="' + parentTab + '"] .dropdown-arrow');
    
    // Check if dropdown is currently expanded
    var isExpanded = false;
    subItems.forEach(function(item) {
        if (item.classList.contains('show')) {
            isExpanded = true;
        }
    });
    
    // Toggle sub items visibility
    subItems.forEach(function(item) {
        if (isExpanded) {
            item.classList.remove('show');
        } else {
            item.classList.add('show');
        }
    });
    
    // Toggle dropdown icon
    if (dropdownIcon) {
        if (isExpanded) {
            dropdownIcon.classList.remove('expanded');
        } else {
            dropdownIcon.classList.add('expanded');
        }
    }
}

// Add click event listeners to navigation items
navItems.forEach(function(item) {
    item.addEventListener('click', function() {
        var tabId = this.getAttribute('data-tab');
        var hasDropdown = this.getAttribute('data-has-dropdown');
        var isSubItem = this.classList.contains('sub');
        
        if (hasDropdown) {
            // Close all other dropdowns first
            var otherDropdowns = document.querySelectorAll('[data-has-dropdown]');
            otherDropdowns.forEach(function(dropdown) {
                var dropdownTab = dropdown.getAttribute('data-tab');
                if (dropdownTab !== tabId) {
                    // Close this dropdown
                    var subItems = document.querySelectorAll('.nav-item.sub[data-parent="' + dropdownTab + '"]');
                    var icon = document.querySelector('[data-tab="' + dropdownTab + '"] .dropdown-arrow');
                    subItems.forEach(function(sub) {
                        sub.classList.remove('show');
                    });
                    if (icon) {
                        icon.classList.remove('expanded');
                    }
                }
            });
            
            // Toggle the dropdown
            toggleDropdown(tabId);
            // Also show the main content for this section
            showContent(tabId);
        } else {
            // If it's not a sub-item, close all dropdowns
            if (!isSubItem) {
                closeAllDropdowns();
            }
            // Regular navigation
            showContent(tabId);
        }
    });
});

// Initialize with first tab active
var firstTab = document.querySelector('.nav-item[data-tab]');
if (firstTab) {
    showContent(firstTab.getAttribute('data-tab'));
}