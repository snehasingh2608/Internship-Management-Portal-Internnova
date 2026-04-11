import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentLayout from '../../layout/StudentLayout';
import { 
  ArrowLeftIcon,
  DocumentArrowUpIcon,
  CalendarIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

const SubmitReport = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    reportTitle: '',
    description: '',
    reportFile: null
  });
  
  const [showSuccess, setShowSuccess] = useState(false);
  const [submittedReports, setSubmittedReports] = useState([
    {
      id: 1,
      title: 'Week 1 Report',
      description: 'Introduction to company and initial tasks',
      submittedDate: '2024-03-08',
      status: 'Submitted'
    },
    {
      id: 2,
      title: 'Week 2 Report',
      description: 'Frontend development progress and team collaboration',
      submittedDate: '2024-03-15',
      status: 'Reviewed'
    },
    {
      id: 3,
      title: 'Month 1 Report',
      description: 'Comprehensive monthly progress summary',
      submittedDate: '2024-03-22',
      status: 'Under Review'
    }
  ]);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Log report data to console (for now)
    console.log('Report Submitted:', {
      ...formData,
      submittedAt: new Date().toISOString(),
      status: 'Submitted'
    });

    // Add to submitted reports
    const newReport = {
      id: submittedReports.length + 1,
      title: formData.reportTitle,
      description: formData.description,
      submittedDate: new Date().toISOString().split('T')[0],
      status: 'Submitted'
    };
    
    setSubmittedReports(prev => [newReport, ...prev]);
    
    // Show success message
    setShowSuccess(true);
    
    // Reset form
    setFormData({
      reportTitle: '',
      description: '',
      reportFile: null
    });
    
    // Hide success message after 3 seconds
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Submitted':
        return 'bg-blue-100 text-blue-800';
      case 'Under Review':
        return 'bg-yellow-100 text-yellow-800';
      case 'Reviewed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <StudentLayout>
      <div className="p-6 max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/student/dashboard')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            Back to Dashboard
          </button>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Submit Monthly Report</h1>
          <p className="text-lg text-gray-600">
            Upload your internship progress reports for faculty review
          </p>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircleIcon className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-green-800">Report Submitted!</h3>
                <p className="text-green-700">Your report has been uploaded and is pending faculty review.</p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Report Submission Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <DocumentArrowUpIcon className="w-6 h-6 text-blue-600" />
                Submit New Report
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Report Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="reportTitle"
                    value={formData.reportTitle}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., Week 1 Report, Month 1 Report"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Brief description of your work and achievements during this period..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Report File <span className="text-red-500">*</span>
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                    <DocumentArrowUpIcon className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <div className="flex flex-col items-center">
                      <label className="cursor-pointer">
                        <span className="text-sm font-medium text-blue-600 hover:text-blue-700">
                          Choose file
                        </span>
                        <input
                          type="file"
                          name="reportFile"
                          onChange={handleInputChange}
                          required
                          accept=".pdf,.doc,.docx"
                          className="hidden"
                        />
                      </label>
                      <p className="text-xs text-gray-500 mt-1">
                        PDF, DOC, or DOCX files only (Max 10MB)
                      </p>
                    </div>
                    {formData.reportFile && (
                      <p className="text-sm text-green-600 mt-3">
                        Selected: {formData.reportFile.name}
                      </p>
                    )}
                  </div>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium py-3 px-6 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center gap-2"
                >
                  <DocumentArrowUpIcon className="w-5 h-5" />
                  Submit Report
                </button>
              </form>
            </div>
          </div>

          {/* Previous Reports */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <CalendarIcon className="w-6 h-6 text-blue-600" />
                Previous Reports
              </h2>
              
              <div className="space-y-4">
                {submittedReports.map((report) => (
                  <div key={report.id} className="border border-gray-100 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-medium text-gray-900">
                        {report.title}
                      </h3>
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${getStatusColor(report.status)}`}>
                        {report.status}
                      </span>
                    </div>
                    
                    <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                      {report.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        {new Date(report.submittedDate).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                      <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">
                        View
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Report Summary */}
              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-1">
                    {submittedReports.length}
                  </div>
                  <p className="text-sm text-gray-600">Reports Submitted</p>
                  <div className="text-sm text-gray-500 mt-1">
                    {submittedReports.filter(r => r.status === 'Reviewed').length} reviewed
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
};

export default SubmitReport;
