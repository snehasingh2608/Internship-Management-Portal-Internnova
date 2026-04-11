import React from 'react';
import { 
  CheckCircleIcon, 
  ClockIcon, 
  DocumentTextIcon,
  UserIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';
import Badge from '../ui/Badge';

const RecentActivity = ({ activities }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'attendance':
        return <CheckCircleIcon className="w-4 h-4 text-green-600" />;
      case 'noc':
        return <DocumentTextIcon className="w-4 h-4 text-blue-600" />;
      case 'faculty':
        return <UserIcon className="w-4 h-4 text-purple-600" />;
      case 'deadline':
        return <ClockIcon className="w-4 h-4 text-orange-600" />;
      default:
        return <CalendarIcon className="w-4 h-4 text-gray-600" />;
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'attendance':
        return 'bg-green-50 border-green-100';
      case 'noc':
        return 'bg-blue-50 border-blue-100';
      case 'faculty':
        return 'bg-purple-50 border-purple-100';
      case 'deadline':
        return 'bg-orange-50 border-orange-100';
      default:
        return 'bg-gray-50 border-gray-100';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
        <span className="text-sm text-gray-500">Last 7 days</span>
      </div>
      
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex gap-3">
            <div className={`flex-shrink-0 w-8 h-8 rounded-full border ${getActivityColor(activity.type)} flex items-center justify-center`}>
              {getActivityIcon(activity.type)}
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">{activity.title}</p>
              <p className="text-xs text-gray-600">{activity.description}</p>
              <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
      
      {activities.length === 0 && (
        <div className="text-center py-8">
          <CalendarIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No recent activity</p>
        </div>
      )}
    </div>
  );
};

export default RecentActivity;
