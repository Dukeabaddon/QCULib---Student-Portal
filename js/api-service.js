// API Service for Library Management System
const API_URL = 'http://localhost:3000/api';

// Helper function to handle API responses
async function handleResponse(response) {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'API request failed');
  }
  return response.json();
}

// API Service object
const apiService = {
  // Student Profile
  getStudentProfile: async (studentId) => {
    try {
      const response = await fetch(`${API_URL}/students/${studentId}`);
      return handleResponse(response);
    } catch (error) {
      console.error('Error fetching student profile:', error);
      throw error;
    }
  },
  
  // Books
  getBooks: async (filters = {}) => {
    try {
      const queryParams = new URLSearchParams(filters);
      const response = await fetch(`${API_URL}/books?${queryParams}`);
      return handleResponse(response);
    } catch (error) {
      console.error('Error fetching books:', error);
      throw error;
    }
  },
  
  // Equipment
  getEquipment: async (filters = {}) => {
    try {
      const queryParams = new URLSearchParams(filters);
      const response = await fetch(`${API_URL}/equipment?${queryParams}`);
      return handleResponse(response);
    } catch (error) {
      console.error('Error fetching equipment:', error);
      throw error;
    }
  },

  // Equipment Requests
  getEquipmentRequests: async (filters = {}) => {
    try {
      const queryParams = new URLSearchParams(filters);
      const response = await fetch(`${API_URL}/equipment/requests?${queryParams}`);
      return handleResponse(response);
    } catch (error) {
      console.error('Error fetching equipment requests:', error);
      throw error;
    }
  },

  requestEquipment: async (data) => {
    try {
      const response = await fetch(`${API_URL}/equipment/request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      return handleResponse(response);
    } catch (error) {
      console.error('Error submitting equipment request:', error);
      throw error;
    }
  },

  // Notifications
  getNotifications: async (filters = {}) => {
    try {
      const queryParams = new URLSearchParams(filters);
      const response = await fetch(`${API_URL}/notifications?${queryParams}`);
      return handleResponse(response);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      throw error;
    }
  },

  // Mark a notification as read
  patchNotificationRead: async (notifId) => {
    try {
      const response = await fetch(`${API_URL}/notifications/${notifId}/read`, { method: 'PATCH' });
      return handleResponse(response);
    } catch (error) {
      console.error('Error marking notification as read:', error);
      throw error;
    }
  },

  // Meeting Rooms
  getMeetingSlots: async () => {
    try {
      const response = await fetch(`${API_URL}/meeting/slots`);
      return handleResponse(response);
    } catch (error) {
      console.error('Error fetching meeting slots:', error);
      throw error;
    }
  },
  getMeetingBookings: async (date) => {
    try {
      const response = await fetch(`${API_URL}/meeting/bookings?date=${date}`);
      return handleResponse(response);
    } catch (error) {
      console.error('Error fetching meeting bookings for date', date, error);
      throw error;
    }
  },
  registerMeeting: async (booking) => {
    console.log('API registerMeeting payload:', booking);
    try {
      const response = await fetch(`${API_URL}/meeting/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(booking)
      });
      return handleResponse(response);
    } catch (error) {
      console.error('Error registering meeting:', error);
      throw error;
    }
  }
};

// Make apiService globally accessible
window.apiService = apiService;
