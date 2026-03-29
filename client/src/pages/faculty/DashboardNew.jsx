import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../layout/Navbar';
import Sidebar from '../../layout/Sidebar';
import { internshipAPI, applicationAPI, nocAPI } from '../../api/api';
import Greeting from '../../components/Greeting';
import StatCard from '../../components/ui/StatCard';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import { 
  BriefcaseIcon, 
  UsersIcon, 
  CheckCircleIcon, 
  ExclamationIcon,
  DocumentIcon,
  ChartIcon,
  EyeIcon
} from '../../components/icons';

const FacultyDashboard = () => {
  const [stats, setStats] = useState({
    activeInternships: 0,
    totalApplicants: 0,
    pendingNOCs: 0,
    approvedInternships: 0,
  });
  const [pendingNOCs, setPendingNOCs] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedNOC, setSelectedNOC] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [internshipsRes, applicationsRes, nocRes] = await Promise.all([
        internshipAPI.getMyListings(),
        applicationAPI.getMyApplications(),
        nocAPI.getPending()
      ]);

      const internships = internshipsRes.data || [];
      const applications = applicationsRes.data || [];
      const pendingNocs = nocRes.data || [];

      setStats({
        activeInternships: internships.filter(i => i.status === 'active').length,
        totalApplicants: applications.length,
        pendingNOCs: pendingNocs.length,
        approvedInternships: internships.filter(i => i.status === 'closed').length,
      });

      setPendingNOCs(pendingNocs.slice(0, 5));

      // Mock recent activity
      setRecentActivity([
        { type: 'application', message: 'John Doe applied for Frontend Developer', time: '2 hours ago' },
        { type: 'approval', message: 'NOC approved for Jane Smith', time: '3 hours ago' },
        { type: 'submission', message: 'Resume uploaded by Mike Johnson', time: '5 hours ago' },
      ]);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNOCAction = async (nocId, action) => {
    try {
      if (action === 'approve') {
        await nocAPI.approve(nocId);
      } else {
        await nocAPI.reject(nocId, { remarks: 'Rejected by faculty' });
      }
      fetchDashboardData();
    } catch (error) {
      console.error('Error handling NOC action:', error);
    }
  };

  const viewOfferLetter = (noc) => {
    setSelectedNOC(noc);
    setShowModal(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <div className="flex flex-1">
          <Sidebar role="faculty" />
          <main className="flex-1 p-6 md:p-8 overflow-y-auto">
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar role="faculty" />
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <Greeting />

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard
                title="Active Internships"
                value={stats.activeInternships}
                icon={<BriefcaseIcon />}
                trend="2 this week"
                trendDirection="up"
                color="blue"
              />
              <StatCard
                title="Total Applicants"
                value={stats.totalApplicants}
                icon={<UsersIcon />}
                trend="+12 this week"
                trendDirection="up"
                color="green"
              />
              <StatCard
                title="Pending NOCs"
                value={stats.pendingNOCs}
                icon={<ExclamationIcon />}
                trend="3 new today"
                trendDirection="up"
                color="yellow"
              />
              <StatCard
                title="Approved Internships"
                value={stats.approvedInternships}
                icon={<CheckCircleIcon />}
                trend="5 this week"
                trendDirection="up"
                color="green"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* Pending Actions */}
              <div className="lg:col-span-2">
                <Card className="border-l-4 border-l-yellow-400">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Pending Actions</h3>
                    <Link to="/faculty/noc-approvals">
                      <Button variant="outline" size="sm">View All</Button>
                    </Link>
                  </div>
                  
                  {pendingNOCs.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <CheckCircleIcon />
                      <p className="mt-2">No pending NOCs</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {pendingNOCs.map((noc) => (
                        <div key={noc._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">{noc.studentName}</p>
                            <p className="text-sm text-gray-600">{noc.company} • ${noc.stipend}/month</p>
                            <p className="text-xs text-gray-500 mt-1">Applied {noc.appliedDate}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => viewOfferLetter(noc)}
                            >
                              <EyeIcon className="mr-1" />
                              View
                            </Button>
                            <Button
                              variant="success"
                              size="sm"
                              onClick={() => handleNOCAction(noc._id, 'approve')}
                            >
                              Approve
                            </Button>
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() => handleNOCAction(noc._id, 'reject')}
                            >
                              Reject
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </Card>
              </div>

              {/* Quick Actions */}
              <Card>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Link to="/faculty/post-internship">
                    <Button variant="primary" className="w-full justify-start">
                      <BriefcaseIcon className="mr-2" />
                      Post Internship
                    </Button>
                  </Link>
                  <Link to="/faculty/reports">
                    <Button variant="secondary" className="w-full justify-start">
                      <ChartIcon className="mr-2" />
                      View Reports
                    </Button>
                  </Link>
                  <Link to="/faculty/students">
                    <Button variant="secondary" className="w-full justify-start">
                      <UsersIcon className="mr-2" />
                      Manage Students
                    </Button>
                  </Link>
                </div>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className={`p-2 rounded-full ${
                      activity.type === 'application' ? 'bg-blue-100' :
                      activity.type === 'approval' ? 'bg-green-100' :
                      'bg-gray-100'
                    }`}>
                      {
                        activity.type === 'application' ? <DocumentIcon /> :
                        activity.type === 'approval' ? <CheckCircleIcon /> :
                        <DocumentIcon />
                      }
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">{activity.message}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </main>
      </div>

      {/* Offer Letter Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Offer Letter"
        size="md"
      >
        {selectedNOC && (
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Student Details</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Name:</span>
                  <p className="font-medium">{selectedNOC.studentName}</p>
                </div>
                <div>
                  <span className="text-gray-600">Email:</span>
                  <p className="font-medium">{selectedNOC.studentEmail}</p>
                </div>
                <div>
                  <span className="text-gray-600">Company:</span>
                  <p className="font-medium">{selectedNOC.company}</p>
                </div>
                <div>
                  <span className="text-gray-600">Stipend:</span>
                  <p className="font-medium">${selectedNOC.stipend}/month</p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setShowModal(false)}>
                Close
              </Button>
              <Button variant="primary">
                <DocumentIcon className="mr-2" />
                Download Offer Letter
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default FacultyDashboard;
