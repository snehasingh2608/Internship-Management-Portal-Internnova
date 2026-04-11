import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import StudentLayout from '../../layout/StudentLayout';
import { 
  ArrowLeftIcon,
  DocumentArrowUpIcon,
  AcademicCapIcon,
  BuildingOfficeIcon,
  CalendarIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline';

import { useAuth } from '../../context/AuthContext';

const ApplyNOC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    // Student Details
    name: user?.name || '',
    rollNumber: user?.rollNumber || '',
    branch: user?.department || '',
    semester: user?.year ? `${user?.year} Year` : '',
    
    // Internship Details
    companyName: '',
    role: '',
    startDate: '',
    duration: '',
    stipend: '',
    
    // Documents
    offerLetter: null,
    studentId: null,
    deanApproval: null,
    
    // Other
    remarks: '',
    declaration: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, files, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'file' ? files[0] : type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Log form data to console (for now)
    console.log('NOC Application Submitted:', {
      ...formData,
      status: 'Pending CDC Verification',
      submittedAt: new Date().toISOString()
    });

    // Show success toast
    toast.success('NOC submitted successfully. Awaiting approval', {
      duration: 4000,
    });

    // Simulate status update after 3 seconds (dummy logic)
    setTimeout(() => {
      const randomStatus = Math.random() > 0.3 ? 'approved' : 'rejected';
      
      if (randomStatus === 'approved') {
        toast.success('NOC Approved! You can now download your certificate.  \ud83c\udf89', {
          duration: 5000,
        });
      } else {
        toast.error('NOC Rejected. Please check your application and reapply.', {
          duration: 5000,
        });
      }
    }, 3000);

    // Reset form and navigate back after delay
    setTimeout(() => {
      navigate('/student/dashboard');
    }, 6000);
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
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Apply for NOC</h1>
          <p className="text-lg text-gray-600">
            Submit your No Objection Certificate application for internship
          </p>
        </div>

        {/* Form starts directly - success messages handled by toast */}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Student Details */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <AcademicCapIcon className="w-6 h-6 text-blue-600" />
              Student Details
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  readOnly
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Roll Number
                </label>
                <input
                  type="text"
                  name="rollNumber"
                  value={formData.rollNumber}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  readOnly
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Branch
                </label>
                <input
                  type="text"
                  name="branch"
                  value={formData.branch}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  readOnly
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Semester
                </label>
                <input
                  type="text"
                  name="semester"
                  value={formData.semester}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  readOnly
                />
              </div>
            </div>
          </div>

          {/* Internship Details */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <BuildingOfficeIcon className="w-6 h-6 text-blue-600" />
              Internship Details
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Tech Solutions Inc."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Role/Position <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Software Development Intern"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Date (DOJ) <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Duration <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., 6 months"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Stipend (Optional)
                </label>
                <input
                  type="text"
                  name="stipend"
                  value={formData.stipend}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., $1500/month"
                />
              </div>
            </div>
          </div>

          {/* Document Uploads */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <DocumentArrowUpIcon className="w-6 h-6 text-blue-600" />
              Document Uploads
            </h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Offer Letter <span className="text-red-500">*</span>
                </label>
                <input
                  type="file"
                  name="offerLetter"
                  onChange={handleInputChange}
                  required
                  accept=".pdf,.doc,.docx"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1">PDF, DOC, or DOCX files only</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Student ID Card
                </label>
                <input
                  type="file"
                  name="studentId"
                  onChange={handleInputChange}
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1">PDF, JPG, JPEG, or PNG files only</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dean Approval
                </label>
                <input
                  type="file"
                  name="deanApproval"
                  onChange={handleInputChange}
                  accept=".pdf,.doc,.docx"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1">PDF, DOC, or DOCX files only</p>
              </div>
            </div>
          </div>

          {/* Remarks */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Remarks
            </label>
            <textarea
              name="remarks"
              value={formData.remarks}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Any additional information or special requirements..."
            />
          </div>

          {/* Declaration */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                name="declaration"
                checked={formData.declaration}
                onChange={handleInputChange}
                required
                className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Declaration <span className="text-red-500">*</span>
                </label>
                <p className="text-sm text-gray-600 mt-1">
                  I hereby declare that all the information provided above is true and correct to the best of my knowledge. 
                  I understand that any false information may lead to rejection of my NOC application.
                </p>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => navigate('/student/dashboard')}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium py-3 px-6 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              Submit NOC Application
            </button>
          </div>
        </form>
      </div>
    </StudentLayout>
  );
};

export default ApplyNOC;
