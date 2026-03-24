import axios from "axios";

const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

// Auth
export const authAPI = {
  login: (email, password) => api.post("/api/auth/login", { email, password }),
  register: (data) => api.post("/api/auth/register", data),
  getMe: () => api.get("/api/auth/me"),
};

// Internships
export const internshipAPI = {
  getAll: () => api.get("/api/internships"),
  getById: (id) => api.get(`/api/internships/${id}`),
  create: (data) => api.post("/api/internships", data),
  update: (id, data) => api.put(`/api/internships/${id}`, data),
  getMyListings: () => api.get("/api/internships/my"),
};

// Applications
export const applicationAPI = {
  apply: (internshipId) => api.post("/api/applications", { internshipId }),
  getMyApplications: () => api.get("/api/applications/my"),
  getByInternship: (internshipId) => api.get(`/api/applications/internship/${internshipId}`),
};

// Users
export const userAPI = {
  getAll: () => api.get("/api/users"),
  getById: (id) => api.get(`/api/users/${id}`),
  create: (data) => api.post("/api/users", data),
  update: (id, data) => api.put(`/api/users/${id}`, data),
  delete: (id) => api.delete(`/api/users/${id}`),
  getProfile: () => api.get("/api/users/profile/me"),
  updateProfile: (data) => {
    const formData = new FormData();
    Object.keys(data).forEach((k) => {
      if (data[k] !== undefined && data[k] !== null) {
        if (k === "skills" && Array.isArray(data[k])) {
          formData.append(k, data[k].join(","));
        } else if (k !== "resume" && typeof data[k] === "object") {
          formData.append(k, JSON.stringify(data[k]));
        } else if (k !== "resume") {
          formData.append(k, data[k]);
        }
      }
    });
    if (data.resume instanceof File) formData.append("resume", data.resume);
    return api.put("/api/users/profile/me", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
};

// Attendance
export const attendanceAPI = {
  getStudents: () => api.get("/api/attendance/students"),
  getLogsByStudent: (studentId) => api.get(`/api/attendance/logs/${studentId}`),
  getAllLogs: () => api.get("/api/attendance"),
  approve: (id) => api.put(`/api/attendance/approve/${id}`),
  getInternshipAttendance: () => api.get("/api/attendance/internship-attendance"),
};

// NOC Requests
export const nocAPI = {
  create: (data) => {
    const formData = new FormData();
    Object.keys(data).forEach((k) => {
      if (data[k] !== undefined && data[k] !== null && k !== "offerLetter") {
        formData.append(k, data[k]);
      }
    });
    if (data.offerLetter instanceof File) formData.append("offerLetter", data.offerLetter);
    return api.post("/api/noc-requests", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  getMyRequests: () => api.get("/api/noc-requests/my"),
  getPending: () => api.get("/api/noc-requests/pending"),
  getAll: () => api.get("/api/noc-requests"),
  approve: (id) => api.put(`/api/noc-requests/${id}/approve`), // kept for backwards compatibility
  facultyApprove: (id) => api.put(`/api/noc-requests/faculty-approve/${id}`),
  adminApprove: (id) => api.put(`/api/noc-requests/admin-approve/${id}`),
  reject: (id, remarks) => api.put(`/api/noc-requests/reject/${id}`, { remarks }),
};

export default api;
