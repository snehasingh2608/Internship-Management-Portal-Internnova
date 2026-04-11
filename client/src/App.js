import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import { Toaster } from 'react-hot-toast';
// import StudentDashboard from './pages/student/Dashboard';
import StudentDashboard from './pages/student/StudentDashboard';
// import Internships from './pages/student/Internships';
import Profile from './pages/student/Profile';
import NOCRequest from './pages/student/NOCRequest';
// import MyApplications from './pages/student/MyApplications';
import InternshipRecords from './pages/student/InternshipRecords';
//  import FacultyDashboard from './pages/faculty/Dashboard';
import FacultyDashboard from './pages/faculty/DashboardModern';
//import AttendanceDashboard from './pages/faculty/AttendanceDashboard';
import AttendanceMonitoring from './pages/faculty/AttendanceMonitoring';
import Students from './pages/faculty/Students';
import StudentLayout from './layout/StudentLayout';
// import Reports from './pages/faculty/ReportsDashboard';
import Reports from './pages/faculty/ReportsAnalytics';
import AdminDashboard from './pages/admin/Dashboard';
import UserManagement from './pages/admin/UserManagement';
import ApproveInternships from './pages/admin/ApproveInternships';
// import NOCApproval from './pages/faculty/NOCApproval';
import NOCApproval from './pages/faculty/NOCApprovalsFixed';
import NOCApprovalAdmin from './pages/admin/NOCApprovalAdmin';
import ApplyNOC from './pages/student/ApplyNOC';
import Attendance from './pages/student/Attendance';
import SubmitReport from './pages/student/SubmitReport';
import Feedback from './pages/student/Feedback';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* <Route path="/student/dashboard" element={<ProtectedRoute allowedRoles={['student']}><StudentDashboard /></ProtectedRoute>} /> */}
          <Route 
  path="/student/dashboard" 
  element={
    <ProtectedRoute allowedRoles={['student']}>
      <StudentDashboard />
    </ProtectedRoute>
  } 
/>
          
          <Route path="/student/noc-request" element={<ProtectedRoute allowedRoles={['student']}><NOCRequest /></ProtectedRoute>} />
          <Route path="/student/applications" element={<ProtectedRoute allowedRoles={['student']}><InternshipRecords /></ProtectedRoute>} />
          <Route path="/apply-noc" element={<ProtectedRoute allowedRoles={['student']}><ApplyNOC /></ProtectedRoute>} />
          <Route path="/attendance" element={<ProtectedRoute allowedRoles={['student']}><Attendance /></ProtectedRoute>} />
          <Route path="/submit-report" element={<ProtectedRoute allowedRoles={['student']}><SubmitReport /></ProtectedRoute>} />
          <Route path="/feedback" element={<ProtectedRoute allowedRoles={['student']}><Feedback /></ProtectedRoute>} />
          <Route 
  path="/faculty/dashboard" 
  element={
    <ProtectedRoute allowedRoles={['faculty']}>
      <FacultyDashboard />
    </ProtectedRoute>
  } 
/>
          {/* <Route path="/faculty/dashboard" element={<ProtectedRoute allowedRoles={['faculty']}><FacultyDashboard /></ProtectedRoute>} />
          <Route path="/faculty/attendance" element={<ProtectedRoute allowedRoles={['faculty']}><AttendanceDashboard /></ProtectedRoute>} /> */}
          <Route path="/faculty/attendance-monitoring" element={<ProtectedRoute allowedRoles={['faculty']}><AttendanceMonitoring /></ProtectedRoute>} />
          <Route path="/faculty/students" element={<ProtectedRoute allowedRoles={['faculty']}><Students /></ProtectedRoute>} />
          <Route path="/faculty/reports" element={<ProtectedRoute allowedRoles={['faculty']}><Reports /></ProtectedRoute>} />
          <Route path="/faculty/noc-approvals" element={<ProtectedRoute allowedRoles={['faculty']}><NOCApproval /></ProtectedRoute>} />
          <Route path="/admin/dashboard" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/users" element={<ProtectedRoute allowedRoles={['admin']}><UserManagement /></ProtectedRoute>} />
          <Route path="/admin/internships" element={<ProtectedRoute allowedRoles={['admin']}><ApproveInternships /></ProtectedRoute>} />
          <Route path="/admin/noc-approval" element={<ProtectedRoute allowedRoles={['admin']}><NOCApprovalAdmin /></ProtectedRoute>} />
          <Route path="*" element={<div className="p-10 text-center">404 - Not Found</div>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
