import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AcademicCapIcon } from '@heroicons/react/24/outline';

const Logo = ({ size = 'medium', clickable = true, className = '' }) => {
  const navigate = useNavigate();

  // Size configurations
  const sizeConfig = {
    small: {
      icon: 'w-6 h-6',
      text: 'text-lg',
      container: 'text-sm'
    },
    medium: {
      icon: 'w-8 h-8',
      text: 'text-xl',
      container: 'text-base'
    },
    large: {
      icon: 'w-10 h-10',
      text: 'text-2xl',
      container: 'text-lg'
    }
  };

  const config = sizeConfig[size] || sizeConfig.medium;

  const handleClick = () => {
    if (clickable) {
      // Navigate to appropriate dashboard based on user role
      const userRole = localStorage.getItem('userRole');
      if (userRole === 'faculty') {
        navigate('/faculty/dashboard');
      } else if (userRole === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/student/dashboard');
      }
    }
  };

  const LogoContent = () => (
    <div className={`flex items-center space-x-2 ${className}`}>
      {/* Graduation Cap Icon */}
      <div className={`flex-shrink-0 ${config.icon}`}>
        <AcademicCapIcon className="w-full h-full" />
      </div>
      
      {/* InternNova Text with Gradient */}
      <div className={`font-bold ${config.text} bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent`}>
        InternNova
      </div>
    </div>
  );

  // If not clickable, return just the logo content
  if (!clickable) {
    return <LogoContent />;
  }

  // If clickable, wrap in Link or button
  return (
    <button
      onClick={handleClick}
      className="flex items-center focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg p-1 hover:bg-gray-50 transition-colors duration-200"
      aria-label="Go to dashboard"
    >
      <LogoContent />
    </button>
  );
};

export default Logo;
