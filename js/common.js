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
  }
  
  // Initialize Feather icons if available
  if (window.feather) {
    feather.replace();
  }
  
  // Initialize sidebar if it exists
  const sidebar = document.getElementById('sidebar');
  if (sidebar) {
    let sidebarTimeout;
    
    function handleSidebarMouseEnter() {
      clearTimeout(sidebarTimeout);
      sidebar.classList.remove('w-16');
      sidebar.classList.add('w-64');
    }
    
    function handleSidebarMouseLeave() {
      sidebarTimeout = setTimeout(() => {
        sidebar.classList.remove('w-64');
        sidebar.classList.add('w-16');
      }, 500);
    }
    
    sidebar.addEventListener('mouseenter', handleSidebarMouseEnter);
    sidebar.addEventListener('mouseleave', handleSidebarMouseLeave);
    sidebar.classList.add('w-16');
  }
}); 