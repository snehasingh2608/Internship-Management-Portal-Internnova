import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  DocumentTextIcon, 
  ClockIcon, 
  DocumentArrowUpIcon,
  UserIcon 
} from '@heroicons/react/24/outline';

const QuickActions = ({ actions }) => {
  const navigate = useNavigate();

  const getActionIcon = (action) => {
    switch (action.id) {
      case 'noc':
        return <DocumentTextIcon className="w-5 h-5" />;
      case 'attendance':
        return <ClockIcon className="w-5 h-5" />;
      case 'report':
        return <DocumentArrowUpIcon className="w-5 h-5" />;
      case 'feedback':
        return <UserIcon className="w-5 h-5" />;
      default:
        return <DocumentTextIcon className="w-5 h-5" />;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
      
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={() => navigate(action.route)}
            className="flex flex-col items-center justify-center p-4 border border-gray-100 rounded-xl hover:border-blue-200 hover:bg-blue-50 transition-all duration-200 group"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg flex items-center justify-center mb-2 group-hover:from-blue-100 group-hover:to-purple-100 transition-colors">
              <span className="text-blue-600">
                {getActionIcon(action)}
              </span>
            </div>
            <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
              {action.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
