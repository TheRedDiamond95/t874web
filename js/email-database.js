// Email database and related functions
const emailDatabase = [
    {
        email: "parthiv.prathapaneni@gmail.com",
        name: "Parthiv Prathapaneni",
        type: "personal"
    },
    {
        email: "223671@students.srvusd.net",
        name: "Parthiv Prathapaneni",
        type: "school"
    }
];

// Function to search emails based on input
function searchEmails(query) {
    if (!query) return [];
    
    const searchTerm = query.toLowerCase();
    return emailDatabase.filter(entry => 
        entry.email.toLowerCase().includes(searchTerm) ||
        entry.name.toLowerCase().includes(searchTerm)
    );
}

// Function to get all emails
function getAllEmails() {
    return emailDatabase;
}

// Function to validate email format
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Export functions for use in other files
window.emailDatabase = {
    searchEmails,
    getAllEmails,
    isValidEmail
}; 