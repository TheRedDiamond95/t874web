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

  // Initialize card tilting effect
  const cards = document.querySelectorAll('.card, .wiki-article, .wiki-category, .stat-card, .profile-header, .banner');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', handleCardTilt);
    card.addEventListener('mouseleave', resetCardTilt);
  });

  function handleCardTilt(e) {
    const card = this;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position within the card
    const y = e.clientY - rect.top; // y position within the card
    
    // Calculate rotation based on mouse position
    // Center of the card is (rect.width/2, rect.height/2)
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate rotation angles (in degrees)
    // Max rotation of 5 degrees in any direction
    const rotateY = ((x - centerX) / centerX) * 5;
    const rotateX = -((y - centerY) / centerY) * 5;
    
    // Apply the transform
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  }

  function resetCardTilt() {
    this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
  }
  
  // Initialize sidebar if it exists
  const sidebar = document.getElementById('sidebar');
  if (sidebar) {
    // Remove click-based toggle
    sidebar.classList.add('minimized'); // Start minimized
    
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