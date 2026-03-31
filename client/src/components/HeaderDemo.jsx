import React from 'react';
import NotificationsDropdown from './NotificationsDropdown';

const HeaderDemo = () => {
  return (
    <div className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Logo/Title */}
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-900">Faculty Dashboard</h1>
          </div>

          {/* Right side - Notifications and Profile */}
          <div className="flex items-center space-x-4">
            {/* Notifications Dropdown */}
            <NotificationsDropdown />
            
            {/* Profile */}
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderDemo;
