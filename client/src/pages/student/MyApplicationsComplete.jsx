import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { applicationAPI } from '../../api/api';
import { 
  BriefcaseIcon, 
  CalendarIcon,
  UserIcon,
  DocumentTextIcon,
  ChartBarIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import StudentLayout from '../../layout/StudentLayout';

const MyApplicationsComplete = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      
      // TEMPORARY MOCK DATA FOR VISUALIZATION
      setApplications([
        {
          _id: "mock1",
          status: "approved",
          nocStatus: "approved",
          internshipId: {
            title: "Frontend Engineering Intern",
            company: "Google DeepMind",
            duration: 6,
            postedBy: { name: "Dr. Alan Turing" }
          }
        },
        {
          _id: "mock2",
          status: "approved",
          nocStatus: "pending",
          internshipId: {
            title: "Data Science Intern",
            company: "OpenAI",
            duration: 3,
            postedBy: { name: "Prof. Ada Lovelace" }
          }
        }
      ]);
      
      // UNCOMMENT THIS TO RESTORE DATABASE CONNECTION
      // const response = await applicationAPI.getMyApplications().catch(() => ({ data: [] }));
      // setApplications(response.data || []);
      
    } catch (error) {
      console.error('Error fetching applications:', error);
      setApplications([]);
    } finally {
      setLoading(false);
    }
  };

  // Goal 2: Remove completely - Pending & Rejected Applications
  // We only keep the approved ones for Internship Records
  const approvedInternships = applications.filter(app => app.status === 'approved');

  // Goal 7: Status UI - Use simple Tailwind span badges
  const StatusBadge = ({ status }) => {
    const s = status?.toLowerCase() || 'pending';
    let config = { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'Pending' };

    if (s === 'approved' || s === 'completed' || s === 'ongoing') {
      config = { bg: 'bg-green-100', text: 'text-green-700', label: s.charAt(0).toUpperCase() + s.slice(1) };
    } else if (s === 'rejected') {
      config = { bg: 'bg-red-100', text: 'text-red-700', label: 'Rejected' };
    }

    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    );
  };

  // Goal 4: Update Internship Card
  const InternshipCard = ({ application }) => {
    const company = application.internshipId?.company || application.company || 'Unknown Company';
    const role = application.internshipId?.title || application.role || 'Intern';
    const durationValue = application.internshipId?.duration || 6;
    const facultyName = application.internshipId?.postedBy?.name || 'Assigned Faculty';
    
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center mb-2">
              <BriefcaseIcon className="w-5 h-5 text-gray-400 mr-3" />
              <h3 className="font-semibold text-gray-900 text-lg">{company}</h3>
            </div>
            <p className="text-gray-600 mb-1">{role}</p>
            <div className="flex items-center text-sm text-gray-500">
              <CalendarIcon className="w-4 h-4 mr-1" />
              <span>Duration: {durationValue} Months</span>
            </div>
          </div>
          
          <div className="flex flex-col gap-2 items-end">
             <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-500">Status:</span>
                <StatusBadge status="ongoing" />
             </div>
             <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-500">NOC:</span>
                <StatusBadge status={application.nocStatus || 'pending'} />
             </div>
          </div>
        </div>

        <div className="mb-4 pt-1">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Progress</span>
            <span className="text-sm text-gray-600">25%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: '25%' }}
            ></div>
          </div>
        </div>

        {/* Goal 6: Optional Detail Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center text-sm">
            <UserIcon className="w-4 h-4 text-gray-400 mr-2" />
            <div>
              <p className="text-gray-500 text-xs text-left">Faculty</p>
              <p className="font-medium text-gray-700 text-left">{facultyName}</p>
            </div>
          </div>
          
          <div className="flex items-center text-sm">
            <ClockIcon className="w-4 h-4 text-gray-400 mr-2" />
            <div>
              <p className="text-gray-500 text-xs text-left">Last Attendance</p>
              <p className="font-medium text-gray-700 text-left">--</p>
            </div>
          </div>
          
          <div className="flex items-center text-sm">
            <DocumentTextIcon className="w-4 h-4 text-gray-400 mr-2" />
            <div>
              <p className="text-gray-500 text-xs text-left">Last Report</p>
              <p className="font-medium text-gray-700 text-left">--</p>
            </div>
          </div>
        </div>

        {/* Goal 5: Replace Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <button
            onClick={() => navigate('/attendance')}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium py-2.5 px-4 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-sm"
          >
            <ClockIcon className="w-4 h-4" />
            Mark Attendance
          </button>
          
          <button
            onClick={() => navigate('/submit-report')}
            className="flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 font-medium py-2.5 px-4 rounded-lg hover:bg-gray-50 transition-all duration-200"
          >
            <DocumentTextIcon className="w-4 h-4" />
            Submit Report
          </button>
          
          <button
            onClick={() => navigate('/feedback')}
            className="flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 font-medium py-2.5 px-4 rounded-lg hover:bg-gray-50 transition-all duration-200"
          >
            <ChartBarIcon className="w-4 h-4" />
            View Feedback
          </button>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <StudentLayout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </StudentLayout>
    );
  }

  return (
    <StudentLayout>
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        {/* Header - Goal 1: Renaming Title and Subtitle */}
        <div className="mb-10 text-left">
          <h1 className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-semibold text-3xl mb-3">
            Internship Records
          </h1>
          <p className="text-gray-500">
            View and manage your internship lifecycle, NOC status, attendance, and reports
          </p>
        </div>

        {/* Applications Grid */}
        {approvedInternships.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <BriefcaseIcon className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">No active internship records</h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              Your approved internships will appear here. You can then manage attendance, reports, and more.
            </p>
            <button 
              onClick={() => navigate('/student/dashboard')}
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-lg hover:opacity-90 transition-colors duration-200 font-medium"
            >
              Go to Dashboard
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Goal 3: Rename Section to Internship Records */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center mb-6">
                <BriefcaseIcon className="w-6 h-6 text-blue-500 mr-3" />
                <h2 className="text-xl font-semibold text-gray-800">Internship Records</h2>
              </div>
              <div className="grid grid-cols-1 gap-6">
                {approvedInternships.map((internship) => (
                  <InternshipCard key={internship._id} application={internship} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </StudentLayout>
  );
};

export default MyApplicationsComplete;
