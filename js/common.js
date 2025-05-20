// Common functionality for all pages
const LOGIN_STORAGE_KEY = 'isLoggedIn';

// Navigation items that require login
const PROTECTED_ROUTES = [
  'wiki.html',
  'dashboard.html',
  'communications.html'
];

// Check if user is logged in
function isUserLoggedIn() {
  return localStorage.getItem(LOGIN_STORAGE_KEY) === "1";
}

// Update UI based on login status
function updateLoginUI() {
  const loginStatus = document.getElementById('loginStatus');
  const loginToggle = document.getElementById('loginToggle');
  const protectedLinks = document.querySelectorAll('[data-requires-login]');
  
  if (loginStatus) {
    loginStatus.textContent = isUserLoggedIn() ? "Logged in" : "Logged out";
  }
  
  if (loginToggle) {
    loginToggle.textContent = isUserLoggedIn() ? "Logout" : "Login";
  }

  // Update visibility of protected navigation items
  protectedLinks.forEach(link => {
    if (isUserLoggedIn()) {
      link.classList.remove('hidden');
    } else {
      link.classList.add('hidden');
    }
  });
}

// Toggle login status
function toggleLogin() {
  const newLoginState = !isUserLoggedIn();
  localStorage.setItem(LOGIN_STORAGE_KEY, newLoginState ? "1" : "0");
  updateLoginUI();
  
  // Redirect to index if logging out while on a protected page
  if (!newLoginState && PROTECTED_ROUTES.includes(window.location.pathname.split('/').pop())) {
    window.location.href = 'index.html';
  }
}

// Initialize common functionality
document.addEventListener('DOMContentLoaded', function() {
  // Initialize login UI
  updateLoginUI();
  
  // Add login toggle handler if button exists
  const loginToggle = document.getElementById('loginToggle');
  if (loginToggle) {
    loginToggle.addEventListener('click', toggleLogin);
    // Add login icon
    const loginIcon = document.createElement('i');
    loginIcon.setAttribute('data-feather', 'log-in');
    loginToggle.insertBefore(loginIcon, loginToggle.firstChild);
  }
  
  // Initialize Feather icons if available
  if (window.feather) {
    feather.replace();
  }
  
  // Initialize sidebar if it exists
  const sidebar = document.getElementById('sidebar');
  if (sidebar) {
    // Initialize sidebar state from localStorage
    const isMinimized = localStorage.getItem('sidebarMinimized') === 'true';
    if (isMinimized) {
      sidebar.classList.add('minimized');
    }
    
    // Toggle sidebar on click
    sidebar.addEventListener('click', (e) => {
      if (e.target === sidebar || e.target.parentElement === sidebar) {
        const newState = !sidebar.classList.contains('minimized');
        sidebar.classList.toggle('minimized');
        localStorage.setItem('sidebarMinimized', newState);
      }
    });
    
    // Update login button text and icon based on state
    function updateLoginButton() {
      if (loginToggle) {
        const isLoggedIn = isUserLoggedIn();
        const icon = loginToggle.querySelector('i');
        const text = loginToggle.querySelector('span');
        
        if (icon) {
          icon.setAttribute('data-feather', isLoggedIn ? 'log-out' : 'log-in');
        }
        if (text) {
          text.textContent = isLoggedIn ? 'Logout' : 'Login';
        }
        if (window.feather) {
          feather.replace();
        }
      }
    }
    
    // Update login button when login state changes
    const originalUpdateLoginUI = updateLoginUI;
    updateLoginUI = function() {
      originalUpdateLoginUI();
      updateLoginButton();
    };
    
    // Initial update
    updateLoginButton();
  }
}); 