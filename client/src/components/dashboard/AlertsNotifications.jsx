import React from 'react';
import { 
  ExclamationTriangleIcon, 
  DocumentTextIcon, 
  ClockIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline';
import Badge from '../ui/Badge';

const AlertsNotifications = ({ alerts }) => {
  const getAlertIcon = (type) => {
    switch (type) {
      case 'warning':
        return <ExclamationTriangleIcon className="w-5 h-5 text-yellow-600" />;
      case 'error':
        return <ExclamationTriangleIcon className="w-5 h-5 text-red-600" />;
      case 'info':
        return <InformationCircleIcon className="w-5 h-5 text-blue-600" />;
      case 'deadline':
        return <ClockIcon className="w-5 h-5 text-orange-600" />;
      default:
        return <InformationCircleIcon className="w-5 h-5 text-gray-600" />;
    }
  };

  const getAlertColor = (type) => {
    switch (type) {
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'error':
        return 'bg-red-50 border-red-200 text-red-800';
      case 'info':
        return 'bg-blue-50 border-blue-200 text-blue-800';
      case 'deadline':
        return 'bg-orange-50 border-orange-200 text-orange-800';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const getUrgencyBadge = (urgency) => {
    switch (urgency) {
      case 'high':
        return <Badge variant="danger" size="xs">High</Badge>;
      case 'medium':
        return <Badge variant="warning" size="xs">Medium</Badge>;
      case 'low':
        return <Badge variant="info" size="xs">Low</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Alerts & Notifications</h3>
        <span className="text-sm text-gray-500">{alerts.length} items</span>
      </div>
      
      <div className="space-y-3">
        {alerts.map((alert, index) => (
          <div 
            key={index}
            className={`flex gap-3 p-3 rounded-lg border ${getAlertColor(alert.type)}`}
          >
            <div className="flex-shrink-0">
              {getAlertIcon(alert.type)}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <p className="font-medium text-sm">{alert.title}</p>
                {getUrgencyBadge(alert.urgency)}
              </div>
              <p className="text-xs opacity-80">{alert.description}</p>
              {alert.time && (
                <p className="text-xs opacity-70 mt-1">{alert.time}</p>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {alerts.length === 0 && (
        <div className="text-center py-8">
          <InformationCircleIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No new notifications</p>
        </div>
      )}
    </div>
  );
};

export default AlertsNotifications;
