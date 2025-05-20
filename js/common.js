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
  const tiltElements = document.querySelectorAll(`
    .card, 
    .wiki-article, 
    .wiki-category, 
    .stat-card, 
    .profile-header, 
    .banner,
    .wiki-directory > div,
    .dashboard-stats > div,
    .announcement-card,
    .event-card,
    .profile-card,
    .merit-badge-card,
    .communication-card,
    .notification-card,
    .settings-card,
    .help-card,
    .resource-card,
    .training-card,
    .achievement-card,
    .progress-card,
    .calendar-event,
    .email-card,
    .message-card,
    .document-card,
    .media-card,
    .gallery-item,
    .team-card,
    .leaderboard-card,
    .activity-card,
    .feedback-card,
    .report-card,
    .analytics-card,
    .chart-card,
    .metric-card,
    .insight-card,
    .trend-card,
    .comparison-card,
    .summary-card,
    .detail-card,
    .overview-card,
    .status-card,
    .alert-card,
    .info-card,
    .warning-card,
    .success-card,
    .error-card
  `);
  
  tiltElements.forEach(element => {
    element.addEventListener('mousemove', handleCardTilt);
    element.addEventListener('mouseleave', resetCardTilt);
  });

  function handleCardTilt(e) {
    const element = this;
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Reduced max rotation to 0.5 degrees
    const rotateY = ((x - centerX) / centerX) * 0.5;
    const rotateX = -((y - centerY) / centerY) * 0.5;
    
    // Apply the transform with reduced scale
    element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
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