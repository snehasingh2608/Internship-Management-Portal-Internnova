import React from 'react';
import { 
  BuildingOfficeIcon, 
  UserIcon, 
  CalendarIcon,
  CheckCircleIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import Badge from '../ui/Badge';

const InternshipStatusCard = ({ internship }) => {
  const getStatusVariant = (status) => {
    switch (status.toLowerCase()) {
      case 'ongoing':
        return 'success';
      case 'completed':
        return 'info';
      case 'pending':
        return 'warning';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'ongoing':
        return <ClockIcon className="w-5 h-5" />;
      case 'completed':
        return <CheckCircleIcon className="w-5 h-5" />;
      default:
        return <ClockIcon className="w-5 h-5" />;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Current Internship</h3>
        <Badge variant={getStatusVariant(internship.status)} size="sm">
          {internship.status}
        </Badge>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg flex items-center justify-center">
            <BuildingOfficeIcon className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h4 className="font-medium text-gray-900">{internship.role}</h4>
            <p className="text-sm text-gray-600">{internship.company}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <CalendarIcon className="w-4 h-4" />
            <span>{internship.duration}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <UserIcon className="w-4 h-4" />
            <span>{internship.faculty}</span>
          </div>
        </div>
        
        <div className="pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Progress</span>
            <span className="text-sm font-medium text-gray-900">{internship.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${internship.progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternshipStatusCard;
