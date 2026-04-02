import React, { useState, useEffect } from 'react';
import { applicationAPI, attendanceAPI } from '../../api/api';
import { 
  BriefcaseIcon, 
  ClockIcon, 
  CheckCircleIcon, 
  XCircleIcon,
  ArrowUpTrayIcon,
  ArrowDownTrayIcon,
  EyeIcon,
  XMarkIcon,
  DocumentIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';

const MyApplicationsComplete = () => {
  const [applications, setApplications] = useState([
    {
      _id: "1",
      company: "TechCorp",
      role: "Frontend Developer Intern",
      status: "approved",
      createdAt: "2024-04-01",
      description: "Leading frontend development team in building scalable web applications using React and modern JavaScript frameworks."
    },
    {
      _id: "2",
      company: "InnovateInc",
      role: "UI/UX Designer Intern",
      status: "pending",
      createdAt: "2024-04-02",
      description: "Innovative startup focused on creating intuitive user experiences through design thinking and user research methodologies."
    },
    {
      _id: "3",
      company: "DataSystems",
      role: "Backend Developer Intern",
      status: "rejected",
      createdAt: "2024-04-03",
      description: "Enterprise-level backend development with focus on scalable architecture and cloud infrastructure management."
    },
    {
      _id: "4",
      company: "CloudTech",
      role: "Full Stack Developer Intern",
      status: "approved",
      createdAt: "2024-04-05",
      description: "End-to-end development opportunities working with modern cloud technologies and DevOps practices."
    },
    {
      _id: "5",
      company: "DesignStudio",
      role: "Product Designer Intern",
      status: "pending",
      createdAt: "2024-04-06",
      description: "Creative design agency specializing in product design, branding, and user experience optimization."
    }
  ]);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showAttendanceModal, setShowAttendanceModal] = useState(false);
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [uploadForm, setUploadForm] = useState({
    date: '',
    file: null,
    remarks: ''
  });
  const [uploadLoading, setUploadLoading] = useState(false);

  // Fetch applications on component mount
  useEffect(() => {
    // fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const studentId = localStorage.getItem('userId');
      const response = await applicationAPI.getStudentApplications(studentId);
      setApplications(response.data || []);
    } catch (error) {
      console.error('Error fetching applications:', error);
      setApplications([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchAttendanceRecords = async (internshipId) => {
    try {
      const studentId = localStorage.getItem('userId');
      const response = await attendanceAPI.getStudentAttendance(studentId);
      const filteredRecords = response.data.filter(record => record.internshipId === internshipId);
      setAttendanceRecords(filteredRecords || []);
    } catch (error) {
      console.error('Error fetching attendance records:', error);
      setAttendanceRecords([]);
    }
  };

  // Categorize applications
  const pendingApplications = applications.filter(app => app.status === 'pending');
  const approvedInternships = applications.filter(app => app.status === 'approved');
  const rejectedApplications = applications.filter(app => app.status === 'rejected');

  const handleUploadAttendance = async (internship) => {
    setSelectedInternship(internship);
    setShowUploadModal(true);
    setUploadForm({
      date: '',
      file: null,
      remarks: ''
    });
  };

  const handleViewAttendance = async (internship) => {
    setSelectedInternship(internship);
    await fetchAttendanceRecords(internship._id);
    setShowAttendanceModal(true);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadForm(prev => ({ ...prev, file }));
    }
  };

  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    
    if (!uploadForm.date || !uploadForm.file) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      setUploadLoading(true);
      const studentId = localStorage.getItem('userId');
      const formData = new FormData();
      formData.append('studentId', studentId);
      formData.append('internshipId', selectedInternship._id);
      formData.append('date', uploadForm.date);
      formData.append('file', uploadForm.file);
      formData.append('remarks', uploadForm.remarks);

      await attendanceAPI.uploadAttendance(formData);
      
      alert('Attendance uploaded successfully!');
      setShowUploadModal(false);
      await fetchAttendanceRecords(selectedInternship._id);
    } catch (error) {
      console.error('Error uploading attendance:', error);
      alert('Failed to upload attendance. Please try again.');
    } finally {
      setUploadLoading(false);
    }
  };

  // Improved Status Badge Component
  const StatusBadge = ({ status }) => {
    const statusConfig = {
      pending: { 
        bg: 'bg-yellow-100', 
        text: 'text-yellow-700', 
        label: 'Pending',
        icon: <ClockIcon className="w-4 h-4" />
      },
      approved: { 
        bg: 'bg-green-100', 
        text: 'text-green-700', 
        label: 'Approved',
        icon: <CheckCircleIcon className="w-4 h-4" />
      },
      rejected: { 
        bg: 'bg-red-100', 
        text: 'text-red-700', 
        label: 'Rejected',
        icon: <XCircleIcon className="w-4 h-4" />
      }
    };

    const config = statusConfig[status?.toLowerCase()] || statusConfig.pending;

    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        {config.icon}
        <span className="ml-1">{config.label}</span>
      </span>
    );
  };

  // Clean List Item Component
  const ApplicationListItem = ({ application, showActions = false }) => {
    return (
      <div className="py-4 flex justify-between items-center">
        {/* Left Side - Application Info */}
        <div className="flex-1">
          <div className="flex items-center mb-1">
            <BriefcaseIcon className="w-4 h-4 text-gray-400 mr-2" />
            <h3 className="font-semibold text-gray-800">{application.company}</h3>
          </div>
          <p className="text-sm text-gray-600 mb-1">{application.role}</p>
          <p className="text-xs text-gray-400">
            Applied on {new Date(application.createdAt).toLocaleDateString()}
          </p>
        </div>

        {/* Right Side - Status and Actions */}
        <div className="flex items-center gap-3">
          <StatusBadge status={application.status} />
          
          {showActions && (
            <div className="flex gap-2">
              <button
                onClick={() => handleUploadAttendance(application)}
                className="
                  bg-gradient-to-r from-blue-500 to-purple-500 
                  text-white 
                  px-3 py-1.5 
                  rounded-lg 
                  hover:opacity-90 
                  transition-all 
                  duration-200 
                  flex items-center 
                  text-sm
                "
              >
                <ArrowUpTrayIcon className="w-3 h-3 mr-1" />
                Upload
              </button>
              <button
                onClick={() => handleViewAttendance(application)}
                className="
                  bg-gray-100 
                  text-gray-600
                  px-3 py-1.5 
                  rounded-lg 
                  hover:bg-gray-200 
                  transition-all 
                  duration-200 
                  flex items-center 
                  text-sm
                "
              >
                <EyeIcon className="w-3 h-3 mr-1" />
                View
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-10">
        <h1 className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-semibold text-3xl mb-3">My Applications</h1>
        <p className="text-gray-500">Track your internship applications and manage attendance records</p>
      </div>

      {/* Applications Grid */}
      {applications.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <BriefcaseIcon className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-3">🚀 You haven't applied to any internships yet.</h3>
          <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-lg hover:opacity-90 transition-colors duration-200 font-medium">
            Browse Internships
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Pending Applications */}
          {pendingApplications.length > 0 && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center mb-6">
                <ClockIcon className="w-6 h-6 text-yellow-500 mr-3" />
                <h2 className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-semibold text-xl">Pending Applications</h2>
              </div>
              <div className="divide-y divide-gray-100">
                {pendingApplications.map((application) => (
                  <ApplicationListItem key={application._id} application={application} />
                ))}
              </div>
            </div>
          )}

          {/* Approved Internships */}
          {approvedInternships.length > 0 && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center mb-6">
                <CheckCircleIcon className="w-6 h-6 text-green-500 mr-3" />
                <h2 className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-semibold text-xl">Approved Internships</h2>
              </div>
              <div className="divide-y divide-gray-100">
                {approvedInternships.map((internship) => (
                  <ApplicationListItem key={internship._id} application={internship} showActions={true} />
                ))}
              </div>
            </div>
          )}

          {/* Rejected Applications */}
          {rejectedApplications.length > 0 && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center mb-6">
                <XCircleIcon className="w-6 h-6 text-red-500 mr-3" />
                <h2 className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-semibold text-xl">Rejected Applications</h2>
              </div>
              <div className="divide-y divide-gray-100">
                {rejectedApplications.map((application) => (
                  <ApplicationListItem key={application._id} application={application} />
                ))}
              </div>
            </div>
          )}

          {/* No Approved Internships Message */}
          {approvedInternships.length === 0 && applications.length > 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No approved internships yet.</p>
            </div>
          )}
        </div>
      )}

      {/* Upload Attendance Modal */}
      {showUploadModal && selectedInternship && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full mx-4">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-800">Upload Attendance</h3>
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleUploadSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={uploadForm.date}
                    onChange={(e) => setUploadForm(prev => ({ ...prev, date: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload File <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleFileChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-2">Accepted formats: Images and PDF</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Remarks (Optional)
                  </label>
                  <textarea
                    value={uploadForm.remarks}
                    onChange={(e) => setUploadForm(prev => ({ ...prev, remarks: e.target.value }))}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Add any additional notes..."
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowUploadModal(false)}
                    className="flex-1 px-4 py-3 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={uploadLoading}
                    className="
                      flex-1 
                      bg-gradient-to-r from-blue-500 to-purple-500 
                      text-white 
                      px-4 py-3 
                      rounded-lg 
                      hover:opacity-90 
                      disabled:opacity-50 
                      disabled:cursor-not-allowed 
                      flex items-center 
                      justify-center
                      transition-all 
                      duration-200
                    "
                  >
                    {uploadLoading ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    ) : (
                      <ArrowUpTrayIcon className="w-4 h-4 mr-2" />
                    )}
                    Upload
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* View Attendance Modal */}
      {showAttendanceModal && selectedInternship && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full mx-4 max-h-[80vh] overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">Attendance Records</h3>
                  <p className="text-sm text-gray-500">{selectedInternship.company} - {selectedInternship.role}</p>
                </div>
                <button
                  onClick={() => setShowAttendanceModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6 overflow-y-auto max-h-[60vh]">
              {attendanceRecords.length === 0 ? (
                <div className="text-center py-12">
                  <DocumentIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No attendance records found</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {attendanceRecords.map((record) => (
                    <div key={record._id} className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            <CalendarIcon className="w-5 h-5 text-gray-400 mr-2" />
                            <span className="font-medium text-gray-800">
                              {new Date(record.date).toLocaleDateString()}
                            </span>
                          </div>
                          {record.remarks && (
                            <p className="text-sm text-gray-600 mt-1">{record.remarks}</p>
                          )}
                        </div>
                        <div className="ml-4">
                          <StatusBadge status={record.status} />
                        </div>
                      </div>
                      
                      {record.proofUrl && (
                        <div className="mt-3 flex gap-3">
                          <a
                            href={record.proofUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                          >
                            <EyeIcon className="w-4 h-4 mr-1" />
                            View Proof
                          </a>
                          <a
                            href={record.proofUrl}
                            download
                            className="text-gray-600 hover:text-gray-800 text-sm font-medium flex items-center"
                          >
                            <ArrowDownTrayIcon className="w-4 h-4 mr-1" />
                            Download
                          </a>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );};

export default MyApplicationsComplete;
