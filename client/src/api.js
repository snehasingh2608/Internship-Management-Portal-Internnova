import axios from 'axios';

// API Configuration
const API = "http://localhost:5000/api";

// Dummy student ID for now
const STUDENT_ID = "12345";

// Create axios instance with base URL
const api = axios.create({
  baseURL: API,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// NOC API endpoints
export const nocAPI = {
  // Submit NOC application
  submitNOC: (data) => api.post(`/noc`, data),
  
  // Get NOC data for student
  getNOCData: (studentId) => api.get(`/noc/${studentId}`),
  
  // Update NOC status
  updateNOCStatus: (nocId, status) => api.patch(`/noc/${nocId}/status`, { status }),
};

// Attendance API endpoints
export const attendanceAPI = {
  // Mark attendance
  markAttendance: (data) => api.post(`/attendance`, data),
  
  // Get attendance records for student
  getAttendanceRecords: (studentId) => api.get(`/attendance/student/${studentId}`),
  
  // Get attendance statistics
  getAttendanceStats: (studentId) => api.get(`/attendance/stats/${studentId}`),
};

// Report API endpoints
export const reportAPI = {
  // Submit report
  submitReport: (data) => api.post(`/report`, data),
  
  // Get reports for student
  getStudentReports: (studentId) => api.get(`/report/student/${studentId}`),
  
  // Update report status
  updateReportStatus: (reportId, status) => api.patch(`/report/${reportId}/status`, { status }),
};

// Feedback API endpoints
export const feedbackAPI = {
  // Get feedback for student
  getStudentFeedback: (studentId) => api.get(`/feedback/student/${studentId}`),
  
  // Submit feedback reply
  replyToFeedback: (feedbackId, reply) => api.post(`/feedback/${feedbackId}/reply`, { reply }),
};

// Internship API endpoints
export const internshipAPI = {
  // Get student internships
  getStudentInternships: (studentId) => api.get(`/internship/student/${studentId}`),
  
  // Update internship details
  updateInternship: (internshipId, data) => api.patch(`/internship/${internshipId}`, data),
};

// Utility function to handle API errors
export const handleAPIError = (error) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.error('API Error:', error.response.data);
    return error.response.data.message || 'An error occurred';
  } else if (error.request) {
    // The request was made but no response was received
    console.error('Network Error:', error.request);
    return 'Network error. Please check your connection.';
  } else {
    // Something happened in setting up the request that triggered an Error
    console.error('Error:', error.message);
    return error.message || 'An unexpected error occurred';
  }
};

export { API, STUDENT_ID };
export default api;
