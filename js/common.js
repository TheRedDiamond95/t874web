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
  // If no login state is set, set it to logged in by default
  if (localStorage.getItem(LOGIN_STORAGE_KEY) === null) {
    localStorage.setItem(LOGIN_STORAGE_KEY, "1");
  }
  return localStorage.getItem(LOGIN_STORAGE_KEY) === "1";
}

// Update UI based on login status
function updateLoginUI() {
  const loginStatus = document.getElementById('loginStatus');
  const loginToggle = document.getElementById('loginToggle');
  const protectedLinks = document.querySelectorAll('[data-requires-login]');
  
  if (loginStatus) {
    loginStatus.textContent = "Logged in";
  }
  
  if (loginToggle) {
    // Update button text and icon
    const icon = loginToggle.querySelector('i');
    const text = loginToggle.querySelector('span');
    
    if (icon) {
      icon.setAttribute('data-feather', 'log-out');
    }
    if (text) {
      text.textContent = 'Logout';
    }
    if (window.feather) {
      feather.replace();
    }
  }

  // Show all protected navigation items
  protectedLinks.forEach(link => {
    link.classList.remove('hidden');
  });
}

// Initialize common functionality
document.addEventListener('DOMContentLoaded', function() {
  // Set default login state to logged in
  if (localStorage.getItem(LOGIN_STORAGE_KEY) === null) {
    localStorage.setItem(LOGIN_STORAGE_KEY, "1");
  }
  
  // Initialize login UI
  updateLoginUI();
  
  // Add login toggle handler if button exists
  const loginToggle = document.getElementById('loginToggle');
  if (loginToggle) {
    // Remove any existing click handlers
    loginToggle.replaceWith(loginToggle.cloneNode(true));
    const newLoginToggle = document.getElementById('loginToggle');
    
    // Add new click handler
    newLoginToggle.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      // Only allow logout, not login
      if (isUserLoggedIn()) {
        localStorage.setItem(LOGIN_STORAGE_KEY, "0");
        window.location.href = 'index.html';
      }
    });
    
    // Add logout icon if it doesn't exist
    if (!newLoginToggle.querySelector('i')) {
      const loginIcon = document.createElement('i');
      loginIcon.setAttribute('data-feather', 'log-out');
      const textSpan = document.createElement('span');
      textSpan.textContent = 'Logout';
      newLoginToggle.appendChild(loginIcon);
      newLoginToggle.appendChild(textSpan);
    }
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
    
    // Increased max rotation to 2.5 degrees
    const rotateY = ((x - centerX) / centerX) * 2.5;
    const rotateX = -((y - centerY) / centerY) * 2.5;
    
    // Apply the transform with smooth transition
    element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
  }

  function resetCardTilt() {
    this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
  }
  
  // Initialize sidebar if it exists
  const sidebar = document.getElementById('sidebar');
  if (sidebar) {
    sidebar.classList.add('minimized'); // Start minimized
  }
}); 