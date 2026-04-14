import axios from "axios";

// Base Axios instance
const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "https://internnova-backend.onrender.com/api", // change if needed
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token automatically (if you use auth)
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ---------------- USER API ----------------
export const userAPI = {
  getProfile: () => API.get("/user/profile"),
  updateProfile: (data) => API.put("/user/profile", data),
};

// ---------------- APPLICATION API ----------------
export const applicationAPI = {
  getStudentApplications: (studentId) =>
    API.get(`/applications/student/${studentId}`),
};

// ---------------- ATTENDANCE API ----------------
export const attendanceAPI = {
  uploadAttendance: (formData) =>
    API.post("/attendance/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  getAttendance: (applicationId) =>
    API.get(`/attendance/${applicationId}`),
};

export default API;