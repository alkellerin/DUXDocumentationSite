// FAQ Animation
const faqQuestions = document.querySelectorAll(".faq-question");

faqQuestions.forEach((question) => {
  question.addEventListener("click", () => {
    faqQuestions.forEach((item) => {
      if (item !== question) {
        item.classList.remove("active");
        item.nextElementSibling.style.maxHeight = null;
      }
    });

    question.classList.toggle("active");

    const answer = question.nextElementSibling;

    if (answer.style.maxHeight) {
      answer.style.maxHeight = null;
    } else {
      answer.style.maxHeight = answer.scrollHeight + "px";
    }
  });
});

// TAB Navigation
class TabbedInterface {
  constructor() {
      this.tabItems = document.querySelectorAll('.tab-item');
      this.tabContents = document.querySelectorAll('.tab-content');
      this.init();
  }

  init() {
      this.tabItems.forEach(tabItem => {
          tabItem.addEventListener('click', (e) => {
              const tabId = e.currentTarget.getAttribute('data-tab');
              this.switchTab(tabId);
          });
      });
  }

  switchTab(tabId) {
      // Remove active class from all tabs and content
      this.tabItems.forEach(item => item.classList.remove('active'));
      this.tabContents.forEach(content => content.classList.remove('active'));

      // Add active class to clicked tab and corresponding content
      document.querySelector(`[data-tab="${tabId}"]`).classList.add('active');
      document.getElementById(tabId).classList.add('active');

      // Update the content area data attribute to position the arrow
      const contentArea = document.querySelector('.content-area');
      contentArea.setAttribute('data-active', tabId);

      // Optional: Analytics or tracking
      this.trackTabSwitch(tabId);
  }

  trackTabSwitch(tabId) {
      // You can add analytics tracking here
      console.log(`Tab switched to: ${tabId}`);

  }

  // Method to programmatically switch tabs
  goToTab(tabId) {
      this.switchTab(tabId);
  }

  // Method to get current active tab
  getCurrentTab() {
      const activeTab = document.querySelector('.tab-item.active');
      return activeTab ? activeTab.getAttribute('data-tab') : null;
  }
}

// Initialize the tabbed interface when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const tabbedInterface = new TabbedInterface();
  
  // Make it globally accessible if needed
  window.tabbedInterface = tabbedInterface;
});

// Optional: Handle browser back/forward buttons
window.addEventListener('popstate', (e) => {
  if (e.state && e.state.tab) {
      window.tabbedInterface.goToTab(e.state.tab);
  }
});

// Optional: Update URL when tabs change (for bookmarkable URLs)
function updateURL(tabId) {
  const newURL = new URL(window.location);
  newURL.searchParams.set('tab', tabId);
  history.pushState({tab: tabId}, '', newURL);
}