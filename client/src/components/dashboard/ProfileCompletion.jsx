import React from 'react';
import { 
  DocumentTextIcon, 
  CodeBracketIcon, 
  FolderIcon,
  CheckCircleIcon 
} from '@heroicons/react/24/outline';

const ProfileCompletion = ({ completion }) => {
  const getProgressColor = (percentage) => {
    if (percentage >= 80) return 'bg-green-500';
    if (percentage >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const missingItems = [
    { 
      icon: <DocumentTextIcon className="w-4 h-4" />, 
      label: 'Resume', 
      completed: completion.resume 
    },
    { 
      icon: <CodeBracketIcon className="w-4 h-4" />, 
      label: 'Skills', 
      completed: completion.skills 
    },
    { 
      icon: <FolderIcon className="w-4 h-4" />, 
      label: 'Projects', 
      completed: completion.projects 
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Profile Completion</h3>
        <span className="text-2xl font-bold text-gray-900">{completion.percentage}%</span>
      </div>
      
      <div className="mb-6">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-500 ${getProgressColor(completion.percentage)}`}
            style={{ width: `${completion.percentage}%` }}
          />
        </div>
      </div>
      
      <div className="space-y-3 mb-6">
        {missingItems.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                item.completed ? 'bg-green-50 text-green-600' : 'bg-gray-50 text-gray-400'
              }`}>
                {item.completed ? (
                  <CheckCircleIcon className="w-4 h-4" />
                ) : (
                  item.icon
                )}
              </div>
              <span className={`text-sm ${item.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                {item.label}
              </span>
            </div>
            {item.completed && (
              <span className="text-xs text-green-600 font-medium">Completed</span>
            )}
          </div>
        ))}
      </div>
      
      <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium py-2.5 px-4 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-sm hover:shadow-md">
        Complete Profile
      </button>
    </div>
  );
};

export default ProfileCompletion;
