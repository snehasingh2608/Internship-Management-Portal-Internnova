import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import SidebarModern from '../../layout/SidebarModern';
import KPICard from '../../components/ui/KPICard';
import PendingActions from '../../components/ui/PendingActions';
import ActiveListings from '../../components/ui/ActiveListings';
import RecentActivity from '../../components/ui/RecentActivity';
import QuickActions from '../../components/ui/QuickActions';
import { 
  BriefcaseIcon, 
  UsersIcon, 
  ClockIcon, 
  CheckCircleIcon,
  DocumentIcon,
  TrendingUpIcon
} from '@heroicons/react/24/outline';

const DashboardRedesign = () => {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    activeInternships: 0,
    totalApplicants: 0,
    pendingNOCs: 0,
    approvedInternships: 0,
    activeStudents: 0,
  });
  const [pendingNOCs, setPendingNOCs] = useState([]);
  const [activeListings, setActiveListings] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    
    // Simulate API call with realistic data
    setTimeout(() => {
      const mockData = {
        stats: {
          activeInternships: 12,
          totalApplicants: 248,
          pendingNOCs: 8,
          approvedInternships: 45,
          activeStudents: 156,
        },
        pendingNOCs: [
          {
            id: 1,
            studentName: 'Sarah Johnson',
            company: 'TechCorp Solutions',
            stipend: 1500,
            status: 'pending',
            avatar: 'SJ'
          },
          {
            id: 2,
            studentName: 'Michael Chen',
            company: 'StartupXYZ',
            stipend: 1200,
            status: 'pending',
            avatar: 'MC'
          },
          {
            id: 3,
            studentName: 'Emily Davis',
            company: 'Innovation Labs',
            stipend: 1800,
            status: 'pending',
            avatar: 'ED'
          },
          {
            id: 4,
            studentName: 'James Wilson',
            company: 'Digital Dynamics',
            stipend: 1400,
            status: 'pending',
            avatar: 'JW'
          },
          {
            id: 5,
            studentName: 'Lisa Anderson',
            company: 'CloudTech Inc',
            stipend: 1600,
            status: 'pending',
            avatar: 'LA'
          }
        ],
        activeListings: [
          {
            id: 1,
            title: 'Frontend Developer Intern',
            company: 'TechCorp Solutions',
            location: 'San Francisco, CA',
            stipend: '$1500/month',
            duration: '3 months',
            status: 'active',
            applicants: 24
          },
          {
            id: 2,
            title: 'UX/UI Design Intern',
            company: 'Creative Agency',
            location: 'Remote',
            stipend: '$1200/month',
            duration: '4 months',
            status: 'active',
            applicants: 18
          },
          {
            id: 3,
            title: 'Data Science Intern',
            company: 'Analytics Pro',
            location: 'New York, NY',
            stipend: '$1800/month',
            duration: '6 months',
            status: 'active',
            applicants: 32
          }
        ],
        recentActivity: [
          { type: 'approval', message: 'NOC approved for John Smith', time: '2 hours ago' },
          { type: 'application', message: 'New application from Emma Wilson', time: '3 hours ago' },
          { type: 'attendance', message: 'Attendance report submitted by Alex Brown', time: '5 hours ago' },
          { type: 'approval', message: 'NOC approved for Sarah Davis', time: '6 hours ago' },
          { type: 'application', message: 'Michael Chen applied for Frontend Developer', time: '8 hours ago' },
          { type: 'attendance', message: 'Weekly attendance completed by Lisa Anderson', time: '12 hours ago' },
        ]
      };

      setStats(mockData.stats);
      setPendingNOCs(mockData.pendingNOCs);
      setActiveListings(mockData.activeListings);
      setRecentActivity(mockData.recentActivity);
      setLoading(false);
    }, 1000);
  };

  const handleApproveNOC = (noc) => {
    setPendingNOCs(prev => prev.filter(item => item.id !== noc.id));
    setStats(prev => ({ ...prev, pendingNOCs: prev.pendingNOCs - 1 }));
  };

  const handleRejectNOC = (noc) => {
    setPendingNOCs(prev => prev.filter(item => item.id !== noc.id));
    setStats(prev => ({ ...prev, pendingNOCs: prev.pendingNOCs - 1 }));
  };

  const handlePostInternship = () => {
    console.log('Navigate to post internship');
  };

  const handleViewReports = () => {
    console.log('Navigate to reports');
  };

  const handleManageStudents = () => {
    console.log('Navigate to student management');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex flex-col">
        <Header user={{ name: 'Loading...' }} />
        <div className="flex flex-1">
          <SidebarModern role="faculty" />
          <main className="flex-1 p-6 md:p-8 overflow-y-auto">
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex flex-col">
      <Header user={user} />
      
      <div className="flex flex-1">
        <SidebarModern role="faculty" />
        
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {/* Colorful KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
              {/* Active Internships - Blue */}
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                    <BriefcaseIcon className="w-6 h-6" />
                  </div>
                  <div className="flex items-center space-x-1 text-xs font-medium bg-white/20 px-2 py-1 rounded-full">
                    <TrendingUpIcon className="w-3 h-3" />
                    <span>+2 this week</span>
                  </div>
                </div>
                <div className="text-3xl font-bold mb-1">{stats.activeInternships}</div>
                <div className="text-blue-100 text-sm font-medium">Active Internships</div>
              </div>

              {/* Total Applicants - Purple */}
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                    <UsersIcon className="w-6 h-6" />
                  </div>
                  <div className="flex items-center space-x-1 text-xs font-medium bg-white/20 px-2 py-1 rounded-full">
                    <TrendingUpIcon className="w-3 h-3" />
                    <span>+12 this week</span>
                  </div>
                </div>
                <div className="text-3xl font-bold mb-1">{stats.totalApplicants}</div>
                <div className="text-purple-100 text-sm font-medium">Total Applicants</div>
              </div>

              {/* Pending NOCs - Yellow (Highlighted) */}
              <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 ring-4 ring-yellow-200 ring-opacity-50">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                    <ClockIcon className="w-6 h-6" />
                  </div>
                  <div className="flex items-center space-x-1 text-xs font-medium bg-white/20 px-2 py-1 rounded-full animate-pulse">
                    <span>Requires Action</span>
                  </div>
                </div>
                <div className="text-3xl font-bold mb-1">{stats.pendingNOCs}</div>
                <div className="text-yellow-100 text-sm font-medium">Pending NOCs</div>
              </div>

              {/* Approved Internships - Green */}
              <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                    <CheckCircleIcon className="w-6 h-6" />
                  </div>
                  <div className="flex items-center space-x-1 text-xs font-medium bg-white/20 px-2 py-1 rounded-full">
                    <TrendingUpIcon className="w-3 h-3" />
                    <span>+5 this week</span>
                  </div>
                </div>
                <div className="text-3xl font-bold mb-1">{stats.approvedInternships}</div>
                <div className="text-green-100 text-sm font-medium">Approved Internships</div>
              </div>

              {/* Active Students - Indigo */}
              <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                    <UsersIcon className="w-6 h-6" />
                  </div>
                  <div className="flex items-center space-x-1 text-xs font-medium bg-white/20 px-2 py-1 rounded-full">
                    <TrendingUpIcon className="w-3 h-3" />
                    <span>+8 this month</span>
                  </div>
                </div>
                <div className="text-3xl font-bold mb-1">{stats.activeStudents}</div>
                <div className="text-indigo-100 text-sm font-medium">Active Students</div>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Pending Actions & Active Listings */}
              <div className="lg:col-span-2 space-y-6">
                {/* Pending Actions - Prominent Section */}
                <div className="bg-white rounded-2xl shadow-xl border-l-4 border-l-yellow-400 overflow-hidden">
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-500 px-6 py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                          <ClockIcon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white">Pending Actions</h3>
                          <p className="text-yellow-100 text-sm">NOC approvals requiring your attention</p>
                        </div>
                      </div>
                      <div className="bg-white/20 px-3 py-1 rounded-full">
                        <span className="text-white font-bold">{stats.pendingNOCs}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-yellow-50">
                    <div className="space-y-3">
                      {pendingNOCs.map((noc) => (
                        <div key={noc.id} className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-yellow-200">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                              {noc.avatar}
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900">{noc.studentName}</p>
                              <p className="text-sm text-gray-600">{noc.company}</p>
                              <p className="text-xs text-gray-500">${noc.stipend}/month</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
                              Pending
                            </span>
                            <button
                              onClick={() => handleApproveNOC(noc)}
                              className="px-3 py-1 bg-green-500 text-white text-xs font-medium rounded-lg hover:bg-green-600 transition-colors"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleRejectNOC(noc)}
                              className="px-3 py-1 bg-red-500 text-white text-xs font-medium rounded-lg hover:bg-red-600 transition-colors"
                            >
                              Reject
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {pendingNOCs.length > 0 && (
                      <div className="mt-4 text-center">
                        <button className="text-yellow-600 hover:text-yellow-700 font-medium text-sm">
                          View all pending NOCs →
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Active Listings */}
                <ActiveListings
                  internships={activeListings}
                  onPostInternship={handlePostInternship}
                />
              </div>

              {/* Right Column - Recent Activity & Quick Actions */}
              <div className="space-y-6">
                {/* Recent Activity Panel */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                        <DocumentIcon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">Recent Activity</h3>
                        <p className="text-blue-100 text-sm">Latest updates and notifications</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="space-y-4">
                      {recentActivity.slice(0, 5).map((activity, index) => (
                        <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                          <div className={`p-2 rounded-full ${
                            activity.type === 'approval' ? 'bg-green-100' :
                            activity.type === 'application' ? 'bg-blue-100' :
                            'bg-yellow-100'
                          }`}>
                            {activity.type === 'approval' ? <CheckCircleIcon className="w-4 h-4 text-green-600" /> :
                             activity.type === 'application' ? <DocumentIcon className="w-4 h-4 text-blue-600" /> :
                             <ClockIcon className="w-4 h-4 text-yellow-600" />}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                            <p className="text-xs text-gray-500">{activity.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {recentActivity.length > 5 && (
                      <div className="mt-4 text-center">
                        <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                          View all activity →
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Quick Actions */}
                <QuickActions
                  onPostInternship={handlePostInternship}
                  onViewReports={handleViewReports}
                  onManageStudents={handleManageStudents}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardRedesign;
