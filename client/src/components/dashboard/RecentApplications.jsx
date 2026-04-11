import React from 'react';
import { BuildingOfficeIcon, CalendarIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import Badge from '../ui/Badge';

const RecentApplications = ({ applications }) => {
  const getStatusVariant = (status) => {
    switch (status.toLowerCase()) {
      case 'applied':
        return 'info';
      case 'interview':
        return 'warning';
      case 'rejected':
        return 'danger';
      case 'accepted':
        return 'success';
      default:
        return 'default';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
      <div className="p-6 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900">Recent Applications</h3>
        <p className="text-sm text-gray-600 mt-1">Track your latest internship applications</p>
      </div>
      
      <div className="divide-y divide-gray-100">
        {applications.map((application, index) => (
          <div 
            key={index}
            className="p-6 hover:bg-gray-50 transition-colors duration-150 cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg flex items-center justify-center">
                    <BuildingOfficeIcon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                      {application.role}
                    </h4>
                    <p className="text-sm text-gray-600">{application.company}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 mt-3">
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <CalendarIcon className="w-4 h-4" />
                    <span>{application.date}</span>
                  </div>
                  <Badge variant={getStatusVariant(application.status)} size="sm">
                    {application.status}
                  </Badge>
                </div>
              </div>
              
              <ChevronRightIcon className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
            </div>
          </div>
        ))}
      </div>
      
      {applications.length === 0 && (
        <div className="p-8 text-center">
          <p className="text-gray-500">No applications yet</p>
        </div>
      )}
    </div>
  );
};

export default RecentApplications;
