import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentLayout from '../../layout/StudentLayout';
import { 
  BriefcaseIcon, 
  ClockIcon, 
  CheckCircleIcon, 
  XCircleIcon,
  UserIcon,
  CalendarIcon,
  DocumentTextIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

const InternshipRecords = () => {
  const navigate = useNavigate();
  
  const [internships, setInternships] = useState([
    {
      _id: "1",
      company: "TechCorp",
      role: "Frontend Developer Intern",
      status: "approved",
      startDate: "2024-01-15",
      endDate: "2024-06-15",
      internshipStatus: "ongoing",
      nocStatus: "approved",
      progress: 65,
      faculty: "Dr. Sarah Johnson",
      lastAttendanceDate: "2024-03-15",
      lastReportDate: "2024-03-01",
      description: "Leading frontend development team in building scalable web applications using React and modern JavaScript frameworks."
    },
    {
      _id: "2",
      company: "InnovateInc",
      role: "UI/UX Designer Intern",
      status: "approved",
      startDate: "2023-06-01",
      endDate: "2023-12-15",
      internshipStatus: "completed",
      nocStatus: "approved",
      progress: 100,
      faculty: "Prof. Michael Chen",
      lastAttendanceDate: "2023-12-14",
      lastReportDate: "2023-12-01",
      description: "Innovative startup focused on creating intuitive user experiences through design thinking and user research methodologies."
    },
    {
      _id: "3",
      company: "DataSystems",
      role: "Backend Developer Intern",
      status: "approved",
      startDate: "2024-02-01",
      endDate: "2024-08-01",
      internshipStatus: "ongoing",
      nocStatus: "pending",
      progress: 35,
      faculty: "Dr. Emily Davis",
      lastAttendanceDate: "2024-03-14",
      lastReportDate: "2024-03-10",
      description: "Enterprise-level backend development with focus on scalable architecture and cloud infrastructure management."
    }
  ]);

  // Status Badge Components
  const InternshipStatusBadge = ({ status }) => {
    const statusConfig = {
      ongoing: { 
        bg: 'bg-blue-100', 
        text: 'text-blue-700', 
        label: 'Ongoing'
      },
      completed: { 
        bg: 'bg-green-100', 
        text: 'text-green-700', 
        label: 'Completed'
      }
    };

    const config = statusConfig[status?.toLowerCase()] || statusConfig.ongoing;

    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    );
  };

  const NOCStatusBadge = ({ status }) => {
    const statusConfig = {
      pending: { 
        bg: 'bg-yellow-100', 
        text: 'text-yellow-700', 
        label: 'Pending'
      },
      approved: { 
        bg: 'bg-green-100', 
        text: 'text-green-700', 
        label: 'Approved'
      },
      rejected: { 
        bg: 'bg-red-100', 
        text: 'text-red-700', 
        label: 'Rejected'
      }
    };

    const config = statusConfig[status?.toLowerCase()] || statusConfig.pending;

    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    );
  };

  // Internship Card Component
  const InternshipCard = ({ internship }) => {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center mb-2">
              <BriefcaseIcon className="w-5 h-5 text-gray-400 mr-3" />
              <h3 className="font-semibold text-gray-900 text-lg">{internship.company}</h3>
            </div>
            <p className="text-gray-600 mb-1">{internship.role}</p>
            <div className="flex items-center text-sm text-gray-500">
              <CalendarIcon className="w-4 h-4 mr-1" />
              <span>
                {new Date(internship.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} 
                {' – '}
                {new Date(internship.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
            </div>
          </div>
          
          <div className="flex flex-col gap-2">
            <InternshipStatusBadge status={internship.internshipStatus} />
            <NOCStatusBadge status={internship.nocStatus} />
          </div>
        </div>

        {/* Progress Bar */}
        {internship.progress !== undefined && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Progress</span>
              <span className="text-sm text-gray-600">{internship.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${internship.progress}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Additional Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center text-sm">
            <UserIcon className="w-4 h-4 text-gray-400 mr-2" />
            <div>
              <p className="text-gray-500 text-xs">Faculty</p>
              <p className="font-medium text-gray-700">{internship.faculty}</p>
            </div>
          </div>
          
          <div className="flex items-center text-sm">
            <CalendarIcon className="w-4 h-4 text-gray-400 mr-2" />
            <div>
              <p className="text-gray-500 text-xs">Last Attendance</p>
              <p className="font-medium text-gray-700">
                {new Date(internship.lastAttendanceDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </p>
            </div>
          </div>
          
          <div className="flex items-center text-sm">
            <DocumentTextIcon className="w-4 h-4 text-gray-400 mr-2" />
            <div>
              <p className="text-gray-500 text-xs">Last Report</p>
              <p className="font-medium text-gray-700">
                {new Date(internship.lastReportDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <button
            onClick={() => navigate('/attendance')}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium py-2.5 px-4 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <ClockIcon className="w-4 h-4" />
            Mark Attendance
          </button>
          
          <button
            onClick={() => navigate('/submit-report')}
            className="flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 font-medium py-2.5 px-4 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
          >
            <DocumentTextIcon className="w-4 h-4" />
            Submit Monthly Report
          </button>
          
          <button
            onClick={() => navigate('/feedback')}
            className="flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 font-medium py-2.5 px-4 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
          >
            <ChartBarIcon className="w-4 h-4" />
            View Feedback
          </button>
        </div>
      </div>
    );
  };

  return (
    <StudentLayout>
      <div className="p-6 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-semibold text-3xl mb-3">
            Internship Records
          </h1>
          <p className="text-gray-500 text-lg">
            View and manage your internship lifecycle, NOC status, attendance, and reports
          </p>
        </div>

        {/* Internship Records */}
        {internships.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <BriefcaseIcon className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">
              🎓 No internship records yet
            </h3>
            <p className="text-gray-500 mb-6">
              Your approved internships and records will appear here once you start your internship journey.
            </p>
            <button 
              onClick={() => navigate('/apply-noc')}
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-lg hover:opacity-90 transition-colors duration-200 font-medium"
            >
              Apply for NOC
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {internships.map((internship) => (
              <InternshipCard key={internship._id} internship={internship} />
            ))}
          </div>
        )}
      </div>
    </StudentLayout>
  );
};

export default InternshipRecords;