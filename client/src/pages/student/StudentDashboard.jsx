import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import StudentLayout from '../../layout/StudentLayout';

import InternshipStatusCard from '../../components/dashboard/InternshipStatusCard';
import NOCStatusTracker from '../../components/dashboard/NOCStatusTracker';
import AttendanceTracker from '../../components/dashboard/AttendanceTracker';
import AlertsNotifications from '../../components/dashboard/AlertsNotifications';
import RecentActivity from '../../components/dashboard/RecentActivity';
import QuickActions from '../../components/dashboard/QuickActions';

const StudentDashboard = () => {
  // University internship data
  const userName = 'Alex Johnson';
  
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: 'warning',
      title: 'NOC pending approval',
      description: 'Your NOC application is waiting for faculty review',
      time: '2 hours ago',
      urgency: 'medium'
    },
    {
      id: 2,
      type: 'error',
      title: 'Attendance not marked today',
      description: 'Please mark your attendance for today',
      time: '30 minutes ago',
      urgency: 'high'
    },
    {
      id: 3,
      type: 'deadline',
      title: 'Report submission due',
      description: 'Monthly internship report due in 3 days',
      time: '1 day ago',
      urgency: 'medium'
    }
  ]);

  // Function to add new alerts (for NOC status updates)
  const addAlert = (alert) => {
    setAlerts(prev => [alert, ...prev]);
  };

  // Simulate NOC status update alerts
  const simulateNOCAlerts = () => {
    // This would be called from NOC form or other components
    // For now, we'll keep the initial alerts
  };

  const internshipData = {
    role: 'Software Development Intern',
    company: 'Tech Solutions Inc.',
    duration: 'Jan 2024 - Jun 2024',
    status: 'Ongoing',
    faculty: 'Dr. Sarah Johnson',
    progress: 65
  };

  const nocData = {
    status: 'Pending',
    submittedDate: 'Oct 15, 2023',
    updatedDate: 'Oct 18, 2023',
    remarks: 'Awaiting faculty approval. Please ensure all documents are uploaded.'
  };

  const attendanceData = {
    percentage: 92,
    daysPresent: 46,
    totalDays: 50,
    todayStatus: 'pending',
    weeklyStats: {
      present: 4,
      total: 5
    }
  };

  const recentActivities = [
    {
      type: 'attendance',
      title: 'Attendance marked',
      description: 'Present for 8 hours',
      time: 'Yesterday, 5:30 PM'
    },
    {
      type: 'noc',
      title: 'NOC application submitted',
      description: 'For internship completion certificate',
      time: '3 days ago'
    },
    {
      type: 'faculty',
      title: 'Faculty feedback received',
      description: 'Monthly performance review completed',
      time: '1 week ago'
    }
  ];

  const quickActions = [
    { id: 'noc', label: 'Apply for NOC', route: '/apply-noc' },
    { id: 'attendance', label: 'Mark Attendance', route: '/attendance' },
    { id: 'report', label: 'Submit Monthly Report', route: '/submit-report' },
    { id: 'feedback', label: 'View Feedback', route: '/feedback' },
  ];

  return (
    <StudentLayout>
      <div className="p-6 max-w-7xl mx-auto">
        {/* Greeting Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            👋 Welcome back, {user?.name || 'Student'}!
          </h1>
          <p className="text-lg text-gray-600">
            Track your internship progress and academic requirements 
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <InternshipStatusCard internship={internshipData} />
              <NOCStatusTracker noc={nocData || { status: 'No Data', submittedDate: '', updatedDate: '', remarks: 'No NOC data available' }} />
            </div>
            <AttendanceTracker attendance={attendanceData} />
            <AlertsNotifications alerts={alerts} />
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            <QuickActions actions={quickActions} />
            {recentActivities.length > 0 ? (
                 <RecentActivity activities={recentActivities} />
            ) : (
                 <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm text-center text-sm text-gray-500">No recent activity found.</div>
            )}
          </div>
        </div>
      </div>
    </StudentLayout>
  );
};

export default StudentDashboard;