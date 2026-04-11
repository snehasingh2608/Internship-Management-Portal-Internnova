// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import StudentLayout from '../../layout/StudentLayout';

// import InternshipStatusCard from '../../components/dashboard/InternshipStatusCard';
// import NOCStatusTracker from '../../components/dashboard/NOCStatusTracker';
// import AttendanceTracker from '../../components/dashboard/AttendanceTracker';
// import AlertsNotifications from '../../components/dashboard/AlertsNotifications';
// import RecentActivity from '../../components/dashboard/RecentActivity';
// import QuickActions from '../../components/dashboard/QuickActions';

// const StudentDashboard = () => {
//   // University internship data
//   const userName = 'Alex Johnson';
  
//   const [alerts, setAlerts] = useState([
//     {
//       id: 1,
//       type: 'warning',
//       title: 'NOC pending approval',
//       description: 'Your NOC application is waiting for faculty review',
//       time: '2 hours ago',
//       urgency: 'medium'
//     },
//     {
//       id: 2,
//       type: 'error',
//       title: 'Attendance not marked today',
//       description: 'Please mark your attendance for today',
//       time: '30 minutes ago',
//       urgency: 'high'
//     },
//     {
//       id: 3,
//       type: 'deadline',
//       title: 'Report submission due',
//       description: 'Monthly internship report due in 3 days',
//       time: '1 day ago',
//       urgency: 'medium'
//     }
//   ]);

//   // Function to add new alerts (for NOC status updates)
//   const addAlert = (alert) => {
//     setAlerts(prev => [alert, ...prev]);
//   };

//   // Simulate NOC status update alerts
//   const simulateNOCAlerts = () => {
//     // This would be called from NOC form or other components
//     // For now, we'll keep the initial alerts
//   };

//   const internshipData = {
//     role: 'Software Development Intern',
//     company: 'Tech Solutions Inc.',
//     duration: 'Jan 2024 - Jun 2024',
//     status: 'Ongoing',
//     faculty: 'Dr. Sarah Johnson',
//     progress: 65
//   };

//   const nocData = {
//     status: 'Pending',
//     submittedDate: 'Oct 15, 2023',
//     updatedDate: 'Oct 18, 2023',
//     remarks: 'Awaiting faculty approval. Please ensure all documents are uploaded.'
//   };

//   const attendanceData = {
//     percentage: 92,
//     daysPresent: 46,
//     totalDays: 50,
//     todayStatus: 'pending',
//     weeklyStats: {
//       present: 4,
//       total: 5
//     }
//   };

//   const recentActivities = [
//     {
//       type: 'attendance',
//       title: 'Attendance marked',
//       description: 'Present for 8 hours',
//       time: 'Yesterday, 5:30 PM'
//     },
//     {
//       type: 'noc',
//       title: 'NOC application submitted',
//       description: 'For internship completion certificate',
//       time: '3 days ago'
//     },
//     {
//       type: 'faculty',
//       title: 'Faculty feedback received',
//       description: 'Monthly performance review completed',
//       time: '1 week ago'
//     }
//   ];

//   const quickActions = [
//     { id: 'noc', label: 'Apply for NOC', route: '/apply-noc' },
//     { id: 'attendance', label: 'Mark Attendance', route: '/attendance' },
//     { id: 'report', label: 'Submit Monthly Report', route: '/submit-report' },
//     { id: 'feedback', label: 'View Feedback', route: '/feedback' },
//   ];

//   return (
//     <StudentLayout>
//       <div className="p-6 max-w-7xl mx-auto">
//         {/* Greeting Section */}
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">
//             👋 Welcome back, {user?.name || 'Student'}!
//           </h1>
//           <p className="text-lg text-gray-600">
//             Track your internship progress and academic requirements 
//           </p>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Left Column */}
//           <div className="lg:col-span-2 space-y-8">
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//               <InternshipStatusCard internship={internshipData} />
//               <NOCStatusTracker noc={nocData || { status: 'No Data', submittedDate: '', updatedDate: '', remarks: 'No NOC data available' }} />
//             </div>
//             <AttendanceTracker attendance={attendanceData} />
//             <AlertsNotifications alerts={alerts} />
//           </div>

//           {/* Right Column */}
//           <div className="space-y-8">
//             <QuickActions actions={quickActions} />
//             {recentActivities.length > 0 ? (
//                  <RecentActivity activities={recentActivities} />
//             ) : (
//                  <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm text-center text-sm text-gray-500">No recent activity found.</div>
//             )}
//           </div>
//         </div>
//       </div>
//     </StudentLayout>
//   );
// };

// export default StudentDashboard;


// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import StudentLayout from '../../layout/StudentLayout';

// import InternshipStatusCard from '../../components/dashboard/InternshipStatusCard';
// import NOCStatusTracker from '../../components/dashboard/NOCStatusTracker';
// import AttendanceTracker from '../../components/dashboard/AttendanceTracker';
// import AlertsNotifications from '../../components/dashboard/AlertsNotifications';
// import RecentActivity from '../../components/dashboard/RecentActivity';
// import QuickActions from '../../components/dashboard/QuickActions';

// const StudentDashboard = () => {
//   // University internship data
//   const userName = 'Alex Johnson';
  
//   const [alerts, setAlerts] = useState([
//     {
//       id: 1,
//       type: 'warning',
//       title: 'NOC pending approval',
//       description: 'Your NOC application is waiting for faculty review',
//       time: '2 hours ago',
//       urgency: 'medium'
//     },
//     {
//       id: 2,
//       type: 'error',
//       title: 'Attendance not marked today',
//       description: 'Please mark your attendance for today',
//       time: '30 minutes ago',
//       urgency: 'high'
//     },
//     {
//       id: 3,
//       type: 'deadline',
//       title: 'Report submission due',
//       description: 'Monthly internship report due in 3 days',
//       time: '1 day ago',
//       urgency: 'medium'
//     }
//   ]);

//   // Function to add new alerts (for NOC status updates)
//   const addAlert = (alert) => {
//     setAlerts(prev => [alert, ...prev]);
//   };

//   // Simulate NOC status update alerts
//   const simulateNOCAlerts = () => {
//     // This would be called from NOC form or other components
//     // For now, we'll keep the initial alerts
//   };

//   const internshipData = {
//     role: 'Software Development Intern',
//     company: 'Tech Solutions Inc.',
//     duration: 'Jan 2024 - Jun 2024',
//     status: 'Ongoing',
//     faculty: 'Dr. Sarah Johnson',
//     progress: 65
//   };

//   const nocData = {
//     status: 'Pending',
//     submittedDate: 'Oct 15, 2023',
//     updatedDate: 'Oct 18, 2023',
//     remarks: 'Awaiting faculty approval. Please ensure all documents are uploaded.'
//   };

//   const attendanceData = {
//     percentage: 92,
//     daysPresent: 46,
//     totalDays: 50,
//     todayStatus: 'pending',
//     weeklyStats: {
//       present: 4,
//       total: 5
//     }
//   };

//   const recentActivities = [
//     {
//       type: 'attendance',
//       title: 'Attendance marked',
//       description: 'Present for 8 hours',
//       time: 'Yesterday, 5:30 PM'
//     },
//     {
//       type: 'noc',
//       title: 'NOC application submitted',
//       description: 'For internship completion certificate',
//       time: '3 days ago'
//     },
//     {
//       type: 'faculty',
//       title: 'Faculty feedback received',
//       description: 'Monthly performance review completed',
//       time: '1 week ago'
//     }
//   ];

//   const quickActions = [
//     { id: 'noc', label: 'Apply for NOC', route: '/apply-noc' },
//     { id: 'attendance', label: 'Mark Attendance', route: '/attendance' },
//     { id: 'report', label: 'Submit Monthly Report', route: '/submit-report' },
//     { id: 'feedback', label: 'View Feedback', route: '/feedback' },
//   ];

//   return (
//     <StudentLayout>
//       <div className="p-6 max-w-7xl mx-auto">
//         {/* Greeting Section */}
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">
//             👋 Welcome back, {user?.name || 'Student'}!
//           </h1>
//           <p className="text-lg text-gray-600">
//             Track your internship progress and academic requirements 
//           </p>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Left Column */}
//           <div className="lg:col-span-2 space-y-8">
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//               <InternshipStatusCard internship={internshipData} />
//               <NOCStatusTracker noc={nocData || { status: 'No Data', submittedDate: '', updatedDate: '', remarks: 'No NOC data available' }} />
//             </div>
//             <AttendanceTracker attendance={attendanceData} />
//             <AlertsNotifications alerts={alerts} />
//           </div>

//           {/* Right Column */}
//           <div className="space-y-8">
//             <QuickActions actions={quickActions} />
//             {recentActivities.length > 0 ? (
//                  <RecentActivity activities={recentActivities} />
//             ) : (
//                  <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm text-center text-sm text-gray-500">No recent activity found.</div>
//             )}
//           </div>
//         </div>
//       </div>
//     </StudentLayout>
//   );
// };

// export default StudentDashboard;


import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import StudentLayout from '../../layout/StudentLayout';
import { useAuth } from '../../context/AuthContext';
import { applicationAPI, nocAPI, attendanceAPI } from '../../api/api';

import InternshipStatusCard from '../../components/dashboard/InternshipStatusCard';
import NOCStatusTracker from '../../components/dashboard/NOCStatusTracker';
import AttendanceTracker from '../../components/dashboard/AttendanceTracker';
import AlertsNotifications from '../../components/dashboard/AlertsNotifications';
import RecentActivity from '../../components/dashboard/RecentActivity';
import QuickActions from '../../components/dashboard/QuickActions';

const StudentDashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  // Dynamic States
  const [alerts, setAlerts] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);
  const [internshipData, setInternshipData] = useState({
    role: 'No Active Internship', company: 'N/A', duration: '--', status: 'Not Applied', faculty: 'N/A', progress: 0
  });
  const [nocData, setNocData] = useState({
    status: 'Not Applied', submittedDate: '--', updatedDate: '--', remarks: 'Submit an NOC request to begin.'
  });
  const [attendanceData, setAttendanceData] = useState({
    percentage: 0, daysPresent: 0, totalDays: 60, todayStatus: 'pending', weeklyStats: { present: 0, total: 5 }
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        if (!user) return;

        const [appsRes, nocRes, attRes] = await Promise.all([
          applicationAPI.getMyApplications().catch(() => ({ data: [] })),
          nocAPI.getMyRequests().catch(() => ({ data: [] })),
          attendanceAPI.getLogsByStudent(user.id).catch(() => ({ data: [] }))
        ]);

        const apps = appsRes.data || [];
        const nocs = nocRes.data || [];
        const logs = attRes.data || [];

        const newAlerts = [];
        const activities = [];

        // 1. Map Internships
        const latestApp = apps.find(a => a.status === 'approved') || apps[0];
        if (latestApp && latestApp.internshipId) {
          setInternshipData({
            role: latestApp.internshipId.title || 'Intern',
            company: latestApp.internshipId.company || 'Unknown Company',
            duration: `${latestApp.internshipId.duration || 6} Months`,
            status: latestApp.status,
            faculty: latestApp.internshipId.postedBy?.name || 'Assigned Faculty',
            progress: latestApp.status === 'approved' ? 25 : 10
          });
          activities.push({
            type: 'internship', title: `Application ${latestApp.status}`, description: `For ${latestApp.internshipId.company}`, time: new Date(latestApp.updatedAt || latestApp.createdAt).toLocaleString()
          });
        }

        // 2. Map NOC
        const latestNoc = nocs[0];
        if (latestNoc) {
          setNocData({
            status: latestNoc.approvalStatus,
            submittedDate: new Date(latestNoc.createdAt).toLocaleDateString(),
            updatedDate: new Date(latestNoc.updatedAt).toLocaleDateString(),
            remarks: latestNoc.remarks || 'Awaiting review.'
          });
          if (latestNoc.approvalStatus === 'pending') {
            newAlerts.push({ id: 1, type: 'warning', title: 'NOC Pending', description: 'Your NOC is awaiting faculty review.', urgency: 'medium' });
          }
          activities.push({
            type: 'noc', title: `NOC ${latestNoc.approvalStatus}`, description: `Status update recorded`, time: new Date(latestNoc.updatedAt || latestNoc.createdAt).toLocaleString()
          });
        } else {
           newAlerts.push({ id: 1, type: 'warning', title: 'Missing NOC', description: 'You have not submitted an NOC request yet.', urgency: 'high' });
        }

        // 3. Map Attendance
        const daysPresent = logs.length;
        const totalDays = 60; 
        const todayStr = new Date().toDateString();
        const hasMarkedToday = logs.some(l => new Date(l.date).toDateString() === todayStr);

        setAttendanceData({
          percentage: totalDays > 0 ? Math.round((daysPresent / totalDays) * 100) : 0,
          daysPresent,
          totalDays,
          todayStatus: hasMarkedToday ? 'present' : 'pending',
          weeklyStats: { present: Math.min(daysPresent, 5), total: 5 }
        });

        if (!hasMarkedToday) {
          newAlerts.push({ id: 2, type: 'error', title: 'Attendance Missing', description: 'Please mark your attendance for today.', urgency: 'high' });
        }
        
        logs.slice(0, 2).forEach(log => {
           activities.push({
              type: 'attendance', title: 'Attendance logged', description: `Logged ${log.hours || 8} hours`, time: new Date(log.date).toLocaleDateString()
           });
        });

        activities.sort((a, b) => new Date(b.time) - new Date(a.time));
        setRecentActivities(activities.slice(0, 5));
        setAlerts(newAlerts);

      } catch (err) {
        console.error("Dashboard Fetch Error", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, [user]);

  const quickActions = [
    { id: 'noc', label: 'Apply for NOC', route: '/apply-noc' },
    { id: 'attendance', label: 'Mark Attendance', route: '/attendance' },
    { id: 'report', label: 'Submit Monthly Report', route: '/submit-report' },
    { id: 'feedback', label: 'View Feedback', route: '/feedback' },
  ];

  if (loading) {
    return (
      <StudentLayout>
         <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div></div>
      </StudentLayout>
    );
  }

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
              <NOCStatusTracker noc={nocData} />
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