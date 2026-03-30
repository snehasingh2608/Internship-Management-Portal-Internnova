import React from 'react';
import Button from './Button';
import { 
  BriefcaseIcon, 
  ChartBarIcon, 
  UsersIcon
} from '@heroicons/react/24/outline';

const QuickActions = ({ onPostInternship, onViewReports, onManageStudents }) => {
  const actions = [
    {
      label: 'Post Internship',
      icon: <BriefcaseIcon className="w-5 h-5" />,
      color: 'primary',
      onClick: onPostInternship
    },
    {
      label: 'View Reports',
      icon: <ChartBarIcon className="w-5 h-5" />,
      color: 'secondary',
      onClick: onViewReports
    },
    {
      label: 'Manage Students',
      icon: <UsersIcon className="w-5 h-5" />,
      color: 'secondary',
      onClick: onManageStudents
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
      
      <div className="space-y-3">
        {actions.map((action, index) => (
          <Button
            key={index}
            variant={action.color === 'primary' ? 'primary' : 'outline'}
            onClick={action.onClick}
            className="w-full justify-start"
          >
            <div className="flex items-center space-x-3">
              {action.icon}
              <span>{action.label}</span>
            </div>
          </Button>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="text-center">
          <p className="text-xs text-gray-500 mb-3">Need help?</p>
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            View Documentation →
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;
