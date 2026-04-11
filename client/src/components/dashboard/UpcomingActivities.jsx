import React from 'react';
import { 
  CalendarIcon, 
  DocumentTextIcon, 
  ClockIcon,
  CheckCircleIcon 
} from '@heroicons/react/24/outline';
import Badge from '../ui/Badge';

const UpcomingActivities = ({ activities }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'interview':
        return <CalendarIcon className="w-5 h-5" />;
      case 'deadline':
        return <ClockIcon className="w-5 h-5" />;
      case 'document':
        return <DocumentTextIcon className="w-5 h-5" />;
      case 'completed':
        return <CheckCircleIcon className="w-5 h-5" />;
      default:
        return <ClockIcon className="w-5 h-5" />;
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'interview':
        return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'deadline':
        return 'bg-red-50 text-red-600 border-red-100';
      case 'document':
        return 'bg-yellow-50 text-yellow-600 border-yellow-100';
      case 'completed':
        return 'bg-green-50 text-green-600 border-green-100';
      default:
        return 'bg-gray-50 text-gray-600 border-gray-100';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
      <div className="p-6 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900">Upcoming Activities</h3>
        <p className="text-sm text-gray-600 mt-1">Stay on top of your schedule</p>
      </div>
      
      <div className="p-6">
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={index} className="flex gap-4">
              <div className={`flex-shrink-0 w-10 h-10 rounded-full border ${getActivityColor(activity.type)} flex items-center justify-center`}>
                {getActivityIcon(activity.type)}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-medium text-gray-900">{activity.title}</h4>
                  <Badge variant={activity.type === 'deadline' ? 'danger' : 'default'} size="xs">
                    {activity.time}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">{activity.description}</p>
                {activity.date && (
                  <p className="text-xs text-gray-500 mt-1">{activity.date}</p>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {activities.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No upcoming activities</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpcomingActivities;
