import React, { useState, useEffect } from 'react';
import FacultyLayout from '../../components/layout/FacultyLayout';
import KPICard from '../../components/ui/KPICard';
import PendingActions from '../../components/ui/PendingActions';
import ActiveListings from '../../components/ui/ActiveListings';
import RecentActivity from '../../components/ui/RecentActivity';
import QuickActions from '../../components/ui/QuickActions';
import { internshipAPI, applicationAPI, nocAPI, facultyAPI } from '../../api/api';
import { 
  BriefcaseIcon, 
  UsersIcon, 
  ClockIcon, 
  CheckCircleIcon 
} from '@heroicons/react/24/outline';

const DashboardModern = () => {
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
    // Get user from localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    
    fetchDashboardData();
    
    const interval = setInterval(() => {
      fetchDashboardData();
    }, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [internshipsRes, nocRes, metricsRes, activityRes] = await Promise.all([
        internshipAPI.getAll(),
        nocAPI.getPending(),
        facultyAPI.getDashboardMetrics(),
        facultyAPI.getRecentActivity()
      ]);

      const internships = internshipsRes.data || [];
      const pendingNocs = nocRes.data || [];
      const metrics = metricsRes.data || {};
      const activity = activityRes.data || [];

      setStats({
        activeInternships: metrics.activeInternships || 0,
        totalApplicants: metrics.totalApplicants || 0,
        pendingNOCs: metrics.pendingNOCs || 0,
        approvedInternships: metrics.approvedInternships || 0,
        activeStudents: metrics.activeStudents || 0,
      });

      setPendingNOCs(pendingNocs.slice(0, 5));
      setActiveListings(internships.filter(i => i.status === 'active'));

      setRecentActivity(activity);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApproveNOC = async (noc) => {
    try {
      await nocAPI.approve(noc.id);
      fetchDashboardData();
    } catch (error) {
      console.error('Error approving NOC:', error);
    }
  };

  const handleRejectNOC = async (noc) => {
    try {
      await nocAPI.reject(noc.id, { remarks: 'Rejected by faculty' });
      fetchDashboardData();
    } catch (error) {
      console.error('Error rejecting NOC:', error);
    }
  };

  const handlePostInternship = () => {
    // Navigate to post internship page
    window.location.href = '/faculty/post-internship';
  };

  const handleViewReports = () => {
    window.location.href = '/faculty/reports';
  };

  const handleManageStudents = () => {
    window.location.href = '/faculty/students';
  };

  if (loading) {
    return (
      <FacultyLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </FacultyLayout>
    );
  }

  return (
    <FacultyLayout>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Faculty Dashboard</h2>
          <p className="text-gray-600 mt-1">Manage internships, NOC requests, reports, and student engagement.</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <KPICard
          title="Active Internships"
          value={stats.activeInternships}
          icon={<BriefcaseIcon />}
          trend="+2 this week"
          trendDirection="up"
          color="blue"
        />
        
        <KPICard
          title="Total Applicants"
          value={stats.totalApplicants}
          icon={<UsersIcon />}
          trend="+12 this week"
          trendDirection="up"
          color="purple"
        />
        
        <KPICard
          title="Pending NOCs"
          value={stats.pendingNOCs}
          icon={<ClockIcon />}
          trend="+3 today"
          trendDirection="up"
          color="yellow"
        />
        
        <KPICard
          title="Approved Internships"
          value={stats.approvedInternships}
          icon={<CheckCircleIcon />}
          trend="+5 this week"
          trendDirection="up"
          color="green"
        />
        
        <KPICard
          title="Active Students"
          value={stats.activeStudents}
          icon={<UsersIcon />}
          trend="+8 this month"
          trendDirection="up"
          color="blue"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Pending Actions & Active Listings */}
        <div className="lg:col-span-2 space-y-6">
          {/* Pending Actions */}
          <PendingActions
            pendingNOCs={pendingNOCs}
            onApprove={handleApproveNOC}
            onReject={handleRejectNOC}
          />

          {/* Active Listings */}
          <ActiveListings
            internships={activeListings}
            onPostInternship={handlePostInternship}
          />
        </div>

        {/* Right Column - Recent Activity & Quick Actions */}
        <div className="space-y-6">
          {/* Recent Activity */}
          <RecentActivity activities={recentActivity} />

          {/* Quick Actions */}
          <QuickActions
            onPostInternship={handlePostInternship}
            onViewReports={handleViewReports}
            onManageStudents={handleManageStudents}
          />
        </div>
      </div>
    </FacultyLayout>
  );
};

export default DashboardModern;
