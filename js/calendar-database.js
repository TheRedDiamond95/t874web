// Calendar events database and management functions
const calendarEvents = [
    {
        id: '1',
        title: 'Team Meeting',
        date: '2024-03-20T10:00:00',
        location: 'Conference Room A',
        description: 'Weekly team sync meeting',
        createdBy: 'admin'
    },
    {
        id: '2',
        title: 'Project Deadline',
        date: '2024-03-25T17:00:00',
        location: 'Remote',
        description: 'Submit final project deliverables',
        createdBy: 'admin'
    },
    {
        id: '3',
        title: 'Client Presentation',
        date: '2024-03-22T14:00:00',
        location: 'Main Hall',
        description: 'Present project progress to client',
        createdBy: 'admin'
    },
    {
        id: '4',
        title: 'Training Session',
        date: '2024-03-28T09:00:00',
        location: 'Training Room',
        description: 'New software training for team',
        createdBy: 'admin'
    },
    {
        id: '5',
        title: 'Team Building',
        date: '2024-03-30T11:00:00',
        location: 'City Park',
        description: 'Quarterly team building activity',
        createdBy: 'admin'
    }
];

// Function to get all events
function getAllEvents() {
    return calendarEvents;
}

// Function to get events for a specific month
function getEventsForMonth(year, month) {
    return calendarEvents.filter(event => {
        const eventDate = new Date(event.date);
        return eventDate.getFullYear() === year && eventDate.getMonth() === month;
    });
}

// Function to get a specific event
function getEventById(id) {
    return calendarEvents.find(event => event.id === id);
}

// Function to add a new event (admin only)
function addEvent(event) {
    if (!isAdmin()) {
        throw new Error('Only admin can add events');
    }
    const newEvent = {
        ...event,
        id: Date.now().toString(),
        createdBy: 'admin'
    };
    calendarEvents.push(newEvent);
    return newEvent;
}

// Function to delete an event (admin only)
function deleteEvent(id) {
    if (!isAdmin()) {
        throw new Error('Only admin can delete events');
    }
    const index = calendarEvents.findIndex(event => event.id === id);
    if (index !== -1) {
        calendarEvents.splice(index, 1);
        return true;
    }
    return false;
}

// Function to check if current user is admin
function isAdmin() {
    // In a real application, this would check user roles/permissions
    // For now, we'll just check if the user is logged in
    return localStorage.getItem('isLoggedIn') === "1";
}

// Export functions for use in other files
window.calendarDatabase = {
    getAllEvents,
    getEventsForMonth,
    getEventById,
    addEvent,
    deleteEvent,
    isAdmin
}; 