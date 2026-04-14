import axios from 'axios';

// API Configuration - Deployed Backend URL
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://internnova-backend.onrender.com';

// Dummy student ID for now
const STUDENT_ID = "12345";

// Create centralized axios instance with proper configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
});

// Add request interceptor to include auth token if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`, config.data || {});
    return config;
  },
  (error) => {
    console.error('Request Interceptor Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => {
    console.log(`API Response: ${response.config.method?.toUpperCase()} ${response.config.url}`, response.data);
    return response;
  },
  (error) => {
    // Enhanced error logging
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('API Error Response:', {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers,
        url: error.config.url,
        method: error.config.method?.toUpperCase()
      });
    } else if (error.request) {
      // The request was made but no response was received
      console.error('API Network Error:', {
        message: 'Network error - no response received',
        url: error.config?.url,
        method: error.config?.method?.toUpperCase(),
        code: error.code
      });
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('API Request Setup Error:', {
        message: error.message,
        config: error.config
      });
    }
    return Promise.reject(error);
  }
);

// NOC API endpoints - Fixed to match backend routes
export const nocAPI = {
  // Submit NOC application
  submitNOC: (data) => api.post('/api/noc-requests', data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  
  // Get NOC data for student
  getNOCData: (studentId) => api.get(`/api/noc-requests/my`),
  
  // Update NOC status
  updateNOCStatus: (nocId, status) => api.patch(`/api/noc-requests/${nocId}/status`, { status }),
};

// Attendance API endpoints
export const attendanceAPI = {
  // Mark attendance
  markAttendance: (data) => api.post('/api/attendance', data),
  
  // Get attendance records for student
  getAttendanceRecords: (studentId) => api.get(`/api/attendance/student/${studentId}`),
  
  // Get attendance statistics
  getAttendanceStats: (studentId) => api.get(`/api/attendance/stats/${studentId}`),
};

// Report API endpoints
export const reportAPI = {
  // Submit report
  submitReport: (data) => api.post('/api/report', data),
  
  // Get reports for student
  getStudentReports: (studentId) => api.get(`/api/report/student/${studentId}`),
  
  // Update report status
  updateReportStatus: (reportId, status) => api.patch(`/api/report/${reportId}/status`, { status }),
};

// Feedback API endpoints
export const feedbackAPI = {
  // Get feedback for student
  getStudentFeedback: (studentId) => api.get(`/api/feedback/student/${studentId}`),
  
  // Submit feedback reply
  replyToFeedback: (feedbackId, reply) => api.post(`/api/feedback/${feedbackId}/reply`, { reply }),
};

// Internship API endpoints
export const internshipAPI = {
  // Get student internships
  getStudentInternships: (studentId) => api.get(`/api/internship/student/${studentId}`),
  
  // Update internship details
  updateInternship: (internshipId, data) => api.patch(`/api/internship/${internshipId}`, data),
};

// Utility function to handle API errors with better logging
export const handleAPIError = (error) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    const errorMessage = error.response.data?.message || error.response.data?.error || 'Server error occurred';
    console.error('API Error Details:', {
      status: error.response.status,
      message: errorMessage,
      data: error.response.data
    });
    return errorMessage;
  } else if (error.request) {
    // The request was made but no response was received
    console.error('Network Error Details:', {
      message: 'Network error - please check your connection',
      code: error.code
    });
    return 'Network error. Please check your internet connection and try again.';
  } else {
    // Something happened in setting up the request that triggered an Error
    console.error('Request Setup Error:', error.message);
    return error.message || 'An unexpected error occurred';
  }
};

// Export the configured axios instance and constants
export { API_BASE_URL, STUDENT_ID };
export default api;
