function showContent(tabId) {
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => section.classList.add('hidden'));
  
    const target = document.getElementById(tabId);
    if (target) {
      target.classList.remove('hidden');
    }
  }

function toggleDropdown(parentTab) {
  var parentButton = document.querySelector('[data-tab="' + parentTab + '"]');
  var submenu = parentButton.nextElementSibling;
  var dropdownIcon = parentButton.querySelector('.drop-down-sub');

  if (!submenu || !submenu.classList.contains('sub-menu')) return;

  // Close all other submenus
  allSubmenus.forEach(function(otherMenu) {
    if (otherMenu !== submenu) {
      otherMenu.classList.remove('show');
    }
  });

  // Toggle current submenu
  submenu.classList.toggle('show');

  // Toggle the dropdown icon
  if (dropdownIcon) {
    dropdownIcon.classList.toggle('expanded');
  }

  // Reset all other dropdown icons
  document.querySelectorAll('.drop-down-sub').forEach(function(icon) {
    if (icon !== dropdownIcon) {
      icon.classList.remove('expanded');
    }
  });
}

navItems.forEach(function(item) {
    item.addEventListener('click', function(event) {
      var tabId = this.getAttribute('data-tab');
      var hasDropdown = this.getAttribute('data-has-dropdown');
      var isSubItem = this.classList.contains('sub');
  
      if (hasDropdown) {
        toggleDropdown(tabId);
      } else {
        // Only hide submenus if this isn't a sub-item
        if (!isSubItem) {
          allSubmenus.forEach(function(submenu) {
            submenu.classList.remove('show');
          });
  
          document.querySelectorAll('.drop-down-sub').forEach(function(icon) {
            icon.classList.remove('expanded');
          });
        }
      }
  
      showContent(tabId);
    });
  });
  

// Initial load
showContent('nav1');

