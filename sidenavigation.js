// function showContent(tabId) {
//     const sections = document.querySelectorAll('.content-section');
//     sections.forEach(section => section.classList.add('hidden'));
  
//     const target = document.getElementById(tabId);
//     if (target) {
//       target.classList.remove('hidden');
//     }
//   }

// function toggleDropdown(parentTab) {
//   var parentButton = document.querySelector('[data-tab="' + parentTab + '"]');
//   var submenu = parentButton.nextElementSibling;
//   var dropdownIcon = parentButton.querySelector('.drop-down-sub');

//   if (!submenu || !submenu.classList.contains('sub-menu')) return;

//   // Close all other submenus
//   allSubmenus.forEach(function(otherMenu) {
//     if (otherMenu !== submenu) {
//       otherMenu.classList.remove('show');
//     }
//   });

//   // Toggle current submenu
//   submenu.classList.toggle('show');

//   // Toggle the dropdown icon
//   if (dropdownIcon) {
//     dropdownIcon.classList.toggle('expanded');
//   }

//   // Reset all other dropdown icons
//   document.querySelectorAll('.drop-down-sub').forEach(function(icon) {
//     if (icon !== dropdownIcon) {
//       icon.classList.remove('expanded');
//     }
//   });
// }

// navItems.forEach(function(item) {
//     item.addEventListener('click', function(event) {
//       var tabId = this.getAttribute('data-tab');
//       var hasDropdown = this.getAttribute('data-has-dropdown');
//       var isSubItem = this.classList.contains('sub');
  
//       if (hasDropdown) {
//         toggleDropdown(tabId);
//       } else {
//         // Only hide submenus if this isn't a sub-item
//         if (!isSubItem) {
//           allSubmenus.forEach(function(submenu) {
//             submenu.classList.remove('show');
//           });
  
//           document.querySelectorAll('.drop-down-sub').forEach(function(icon) {
//             icon.classList.remove('expanded');
//           });
//         }
//       }
  
//       showContent(tabId);
//     });
//   });
  

// // Initial load
// showContent('nav1');


  // Select all sub nav items and content sections
// SIDE NAV
const allNavItems = document.querySelectorAll('.nav-item'); // Gets both regular and sub
const contentSections = document.querySelectorAll('.content-section');

allNavItems.forEach(item => {
  item.addEventListener('click', () => {
    const targetId = item.getAttribute('data-tab');
    
    // Hide all content sections
    contentSections.forEach(section => {
      section.classList.add('hidden');
    });
    
    // Show the selected content section
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      targetSection.classList.remove('hidden');
    }
    
    // Remove active class from all nav items and add to clicked item
    allNavItems.forEach(nav => nav.classList.remove('active'));
    item.classList.add('active');
  });
});



// TABS
document.addEventListener('DOMContentLoaded', () => {
  // Wait a bit more to ensure all content is loaded
  setTimeout(() => {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('[id^="tab"]'); // Find any element with ID starting with "tab"
    
    console.log('Tab buttons found:', tabButtons.length);
    console.log('Tab panels found:', tabPanels.length);
    console.log('All panels:', Array.from(tabPanels).map(p => p.id));
    
    tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        const target = button.getAttribute('data-tab');
        const panel = document.getElementById(target);
        
        if (panel) {
          // Remove active from all
          tabButtons.forEach(btn => btn.classList.remove('active'));
          document.querySelectorAll('[id^="tab"]').forEach(p => p.classList.remove('active'));
          
          // Add active to current
          button.classList.add('active');
          panel.classList.add('active');
        } else {
          console.error('Panel not found:', target);
        }
      });
    });
  }, 100); // Small delay
});


