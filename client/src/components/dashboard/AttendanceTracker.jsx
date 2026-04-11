import React from 'react';
import { 
  CalendarIcon, 
  CheckCircleIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import Badge from '../ui/Badge';

const AttendanceTracker = ({ attendance }) => {
  const getAttendanceColor = (percentage) => {
    if (percentage >= 90) return 'text-green-600 bg-green-50';
    if (percentage >= 75) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getTodayStatusVariant = (status) => {
    switch (status) {
      case 'marked':
        return 'success';
      case 'pending':
        return 'warning';
      default:
        return 'default';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Attendance Tracker</h3>
        <Badge variant={getTodayStatusVariant(attendance.todayStatus)} size="sm">
          {attendance.todayStatus === 'marked' ? 'Marked Today' : 'Not Marked'}
        </Badge>
      </div>
      
      <div className="space-y-4">
        <div className="text-center py-4">
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${getAttendanceColor(attendance.percentage)} mb-3`}>
            <span className="text-2xl font-bold">{attendance.percentage}%</span>
          </div>
          <p className="text-sm text-gray-600">Overall Attendance</p>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-green-50 rounded-lg p-3 text-center">
            <CheckCircleIcon className="w-6 h-6 text-green-600 mx-auto mb-1" />
            <p className="text-2xl font-bold text-green-600">{attendance.daysPresent}</p>
            <p className="text-xs text-green-700">Days Present</p>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-3 text-center">
            <CalendarIcon className="w-6 h-6 text-gray-600 mx-auto mb-1" />
            <p className="text-2xl font-bold text-gray-600">{attendance.totalDays}</p>
            <p className="text-xs text-gray-700">Total Days</p>
          </div>
        </div>
        
        <div className="pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">This Week</span>
            <span className="text-sm font-medium text-gray-900">{attendance.weeklyStats.present}/{attendance.weeklyStats.total} days</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(attendance.weeklyStats.present / attendance.weeklyStats.total) * 100}%` }}
            />
          </div>
        </div>
        
        <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium py-2.5 px-4 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center gap-2">
          <ClockIcon className="w-4 h-4" />
          {attendance.todayStatus === 'marked' ? 'View Attendance Log' : 'Mark Attendance'}
        </button>
      </div>
    </div>
  );
};

export default AttendanceTracker;
