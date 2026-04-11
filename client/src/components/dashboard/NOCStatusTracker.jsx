import React from 'react';
import { 
  DocumentTextIcon, 
  CalendarIcon, 
  ArrowDownTrayIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import Badge from '../ui/Badge';

const NOCStatusTracker = ({ noc }) => {
  const getStatusVariant = (status) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return 'success';
      case 'pending':
        return 'warning';
      case 'rejected':
        return 'danger';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return <CheckCircleIcon className="w-5 h-5 text-green-600" />;
      case 'pending':
        return <ClockIcon className="w-5 h-5 text-yellow-600" />;
      case 'rejected':
        return <ExclamationTriangleIcon className="w-5 h-5 text-red-600" />;
      default:
        return <DocumentTextIcon className="w-5 h-5 text-gray-600" />;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">NOC Status</h3>
        <Badge variant={getStatusVariant(noc.status)} size="sm">
          {noc.status}
        </Badge>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
            noc.status === 'approved' ? 'bg-green-50' : 
            noc.status === 'pending' ? 'bg-yellow-50' : 'bg-red-50'
          }`}>
            {getStatusIcon(noc.status)}
          </div>
          <div className="flex-1">
            <p className="font-medium text-gray-900">NOC Application</p>
            <p className="text-sm text-gray-600">Internship Completion Certificate</p>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <CalendarIcon className="w-4 h-4" />
            <span>Submitted: {noc.submittedDate}</span>
          </div>
          
          {noc.updatedDate && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <ClockIcon className="w-4 h-4" />
              <span>Last Updated: {noc.updatedDate}</span>
            </div>
          )}
        </div>
        
        {noc.remarks && (
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-sm font-medium text-gray-700 mb-1">Faculty Remarks:</p>
            <p className="text-sm text-gray-600">{noc.remarks}</p>
          </div>
        )}
        
        <div className="flex gap-3 pt-2">
          {noc.status === 'approved' && (
            <button className="flex-1 bg-green-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center justify-center gap-2">
              <ArrowDownTrayIcon className="w-4 h-4" />
              Download NOC
            </button>
          )}
          
          {noc.status === 'rejected' && (
            <button className="flex-1 bg-blue-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200">
              Reapply for NOC
            </button>
          )}
          
          {noc.status === 'pending' && (
            <button className="flex-1 bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors duration-200">
              View Application
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NOCStatusTracker;
