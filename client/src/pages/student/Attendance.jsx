import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentLayout from '../../layout/StudentLayout';
import { attendanceAPI, handleAPIError, STUDENT_ID } from '../../api';
import { 
  ArrowLeftIcon,
  CalendarIcon,
  ClockIcon,
  CheckCircleIcon,
  PhotoIcon,
  DocumentArrowUpIcon
} from '@heroicons/react/24/outline';
// import Badge from '../components/ui/Badge';

const Attendance = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    screenshot: null,
    remarks: ''
  });
  
  const [showSuccess, setShowSuccess] = useState(false);
  const [attendanceHistory, setAttendanceHistory] = useState([
    {
      date: '2024-03-15',
      status: 'Present',
      duration: '8 hours',
      remarks: 'Completed daily tasks and team meeting'
    },
    {
      date: '2024-03-14',
      status: 'Present',
      duration: '7.5 hours',
      remarks: 'Worked on frontend development'
    },
    {
      date: '2024-03-13',
      status: 'Present',
      duration: '8 hours',
      remarks: 'Code review and bug fixes'
    },
    {
      date: '2024-03-12',
      status: 'Absent',
      duration: '0 hours',
      remarks: 'Medical leave'
    }
  ]);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Create FormData for file upload
      const apiFormData = new FormData();
      apiFormData.append('studentId', STUDENT_ID);
      apiFormData.append('date', formData.date);
      apiFormData.append('remarks', formData.remarks || '');
      
      // Add screenshot if exists
      if (formData.screenshot) {
        apiFormData.append('proof', formData.screenshot);
      }

      // Send to backend
      const response = await attendanceAPI.markAttendance(apiFormData);
      
      // Show success message
      setShowSuccess(true);
      
      // Log response
      console.log('Attendance Response:', response.data);

      // Reset form
      setFormData({
        date: new Date().toISOString().split('T')[0],
        screenshot: null,
        remarks: ''
      });
      
      // Hide success message after 3 seconds
      setTimeout(() => setShowSuccess(false), 3000);
      
      // Refresh attendance history
      fetchAttendanceHistory();

    } catch (error) {
      console.error('Attendance Submission Error:', error);
      
      // Show error message (you could use toast here too)
      alert(handleAPIError(error) || 'Failed to mark attendance. Please try again.');
    }
  };

  // Fetch attendance history from backend
  const fetchAttendanceHistory = async () => {
    try {
      const response = await attendanceAPI.getAttendanceRecords(STUDENT_ID);
      
      if (response.data) {
        setAttendanceHistory(response.data);
      }
      
      console.log('Attendance History:', response.data);
    } catch (error) {
      console.error('Error fetching attendance history:', error);
      // Keep using default data if API fails
    }
  };

  // Fetch attendance history on component mount
  useEffect(() => {
    fetchAttendanceHistory();
  }, []);

  const getStatusVariant = (status) => {
    switch (status) {
      case 'Present':
        return 'success';
      case 'Absent':
        return 'danger';
      default:
        return 'default';
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
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Mark Attendance</h1>
          <p className="text-lg text-gray-600">
            Record your daily internship attendance with proof
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
                <h3 className="text-lg font-medium text-green-800">Attendance Marked!</h3>
                <p className="text-green-700">Your attendance has been recorded successfully.</p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Attendance Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <CalendarIcon className="w-6 h-6 text-blue-600" />
                Mark Today's Attendance
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Screenshot <span className="text-red-500">*</span>
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                    <PhotoIcon className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <div className="flex flex-col items-center">
                      <label className="cursor-pointer">
                        <span className="text-sm font-medium text-blue-600 hover:text-blue-700">
                          Choose file
                        </span>
                        <input
                          type="file"
                          name="screenshot"
                          onChange={handleInputChange}
                          required
                          accept=".jpg,.jpeg,.png"
                          className="hidden"
                        />
                      </label>
                      <p className="text-xs text-gray-500 mt-1">
                        JPG, JPEG, or PNG files only
                      </p>
                    </div>
                    {formData.screenshot && (
                      <p className="text-sm text-green-600 mt-3">
                        Selected: {formData.screenshot.name}
                      </p>
                    )}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Remarks (Optional)
                  </label>
                  <textarea
                    name="remarks"
                    value={formData.remarks}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Brief description of your work today..."
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium py-3 px-6 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center gap-2"
                >
                  <ClockIcon className="w-5 h-5" />
                  Mark Attendance
                </button>
              </form>
            </div>
          </div>

          {/* Attendance History */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <DocumentArrowUpIcon className="w-6 h-6 text-blue-600" />
                Recent Attendance
              </h2>
              
              <div className="space-y-4">
                {attendanceHistory.map((entry, index) => (
                  <div key={index} className="border border-gray-100 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-900">
                        {new Date(entry.date).toLocaleDateString('en-US', { 
                          weekday: 'short', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </span>
                      {/* <Badge variant={getStatusVariant(entry.status)} size="sm">
                        {entry.status}
                      </Badge> */}
                      <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-700 rounded">
  Pending
</span>
                    </div>
                    
                    <div className="space-y-1">
                      <p className="text-sm text-gray-600">
                        Duration: <span className="font-medium">{entry.duration}</span>
                      </p>
                      {entry.remarks && (
                        <p className="text-xs text-gray-500 line-clamp-2">
                          {entry.remarks}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Attendance Summary */}
              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 mb-1">
                    {attendanceHistory.filter(a => a.status === 'Present').length} / {attendanceHistory.length}
                  </div>
                  <p className="text-sm text-gray-600">Days Present</p>
                  <div className="text-sm text-gray-500 mt-1">
                    {Math.round((attendanceHistory.filter(a => a.status === 'Present').length / attendanceHistory.length) * 100)}% attendance rate
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

export default Attendance;