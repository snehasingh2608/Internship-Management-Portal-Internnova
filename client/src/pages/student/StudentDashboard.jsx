import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import StudentLayout from '../../layout/StudentLayout';
import { nocAPI, handleAPIError, STUDENT_ID } from '../../api';

import InternshipStatusCard from '../../components/dashboard/InternshipStatusCard';
import NOCStatusTracker from '../../components/dashboard/NOCStatusTracker';
import AttendanceTracker from '../../components/dashboard/AttendanceTracker';
import AlertsNotifications from '../../components/dashboard/AlertsNotifications';
import RecentActivity from '../../components/dashboard/RecentActivity';
import QuickActions from '../../components/dashboard/QuickActions';
import { 
  AcademicCapIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';

const StudentDashboard = () => {
  // University internship data
  const userName = 'Alex Johnson';
  
  const [loading, setLoading] = useState(true);
  const [nocData, setNocData] = useState(null);
  
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

  // Fetch NOC data on component mount
  useEffect(() => {
    const fetchNOCData = async () => {
      try {
        setLoading(true);
        const response = await nocAPI.getNOCData(STUDENT_ID);
        
        if (response.data) {
          setNocData(response.data);
          
          // Update alerts based on NOC status
          updateAlertsBasedOnNOCStatus(response.data.status);
        }
        
        console.log('NOC Data:', response.data);
      } catch (error) {
        console.error('Error fetching NOC data:', error);
        // Keep using default data if API fails
      } finally {
        setLoading(false);
      }
    };

    fetchNOCData();
  }, []);

  // Update alerts based on NOC status
  const updateAlertsBasedOnNOCStatus = (status) => {
    setAlerts(prev => {
      const filteredAlerts = prev.filter(alert => alert.title !== 'NOC pending approval');
      
      if (status === 'pending') {
        return [
          {
            id: Date.now(),
            type: 'warning',
            title: 'NOC pending approval',
            description: 'Your NOC application is waiting for faculty review',
            time: '2 hours ago',
            urgency: 'medium'
          },
          ...filteredAlerts
        ];
      } else if (status === 'approved') {
        return [
          {
            id: Date.now(),
            type: 'success',
            title: 'NOC Approved',
            description: 'Your NOC has been approved! You can now download your certificate.',
            time: '1 hour ago',
            urgency: 'low'
          },
          ...filteredAlerts
        ];
      } else if (status === 'rejected') {
        return [
          {
            id: Date.now(),
            type: 'error',
            title: 'NOC Rejected',
            description: 'Your NOC application was rejected. Please review and reapply.',
            time: '2 hours ago',
            urgency: 'high'
          },
          ...filteredAlerts
        ];
      }
      
      return filteredAlerts;
    });
  };

  const internshipData = {
    role: 'Software Development Intern',
    company: 'Tech Solutions Inc.',
    duration: 'Jan 2024 - Jun 2024',
    status: 'Ongoing',
    faculty: 'Dr. Sarah Johnson',
    progress: 65
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

  // Add loading state
  if (loading) return <p>Loading...</p>;

  return (
    <StudentLayout>
      <div className="p-6 max-w-7xl mx-auto">
        {/* Greeting Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            👋 Welcome back, {userName}!
          </h1>
          <p className="text-lg text-gray-600">
            Track your internship progress and academic requirements �
          </p>
        </div>

        {/* Academic Insight */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100 rounded-xl p-4 mb-8">
          <p className="text-sm text-blue-800">
            � Your internship is 65% complete. Keep up the good work! 🎯
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Internship Status and NOC */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <InternshipStatusCard internship={internshipData} />
              <NOCStatusTracker noc={nocData || { status: 'No Data', submittedDate: '', updatedDate: '', remarks: 'No NOC data available' }} />
            </div>

            {/* Attendance Tracker */}
            <AttendanceTracker attendance={attendanceData} />

            {/* Alerts and Notifications */}
            <AlertsNotifications alerts={alerts} />
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Quick Actions */}
            <QuickActions actions={quickActions} />

            {/* Recent Activity */}
            <RecentActivity activities={recentActivities} />
          </div>
        </div>
      </div>
    </StudentLayout>
  );
};

export default StudentDashboard;