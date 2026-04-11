import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  HomeIcon,
  UsersIcon,
  BriefcaseIcon,
  DocumentTextIcon,
  ClockIcon,
  ChartBarIcon,
  AcademicCapIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';

const CommonSidebar = ({ role }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const studentMenu = [
    { 
      name: 'Dashboard', 
      path: '/student/dashboard', 
      icon: <HomeIcon className="w-5 h-5" /> 
    },
    // { 
    //   name: 'Internships', 
    //   path: '/student/internships', 
    //   icon: <BriefcaseIcon className="w-5 h-5" /> 
    // },
    { 
      name: 'Internship Records', 
      path: '/student/applications', 
      icon: <DocumentTextIcon className="w-5 h-5" /> 
    },
    { 
      name: 'Profile', 
      path: '/student/profile', 
      icon: <UsersIcon className="w-5 h-5" /> 
    },
  ];

  const facultyMenu = [
    { 
      name: 'Dashboard', 
      path: '/faculty/dashboard', 
      icon: <HomeIcon className="w-5 h-5" /> 
    },
    { 
      name: 'Students', 
      path: '/faculty/students', 
      icon: <UsersIcon className="w-5 h-5" /> 
    },
    { 
      name: 'NOC Approval', 
      path: '/faculty/noc-approvals', 
      icon: <DocumentTextIcon className="w-5 h-5" /> 
    },
    { 
      name: 'Attendance Dashboard', 
      path: '/faculty/attendance', 
      icon: <ChartBarIcon className="w-5 h-5" /> 
    },
    { 
      name: 'Reports', 
      path: '/faculty/reports', 
      icon: <ChartBarIcon className="w-5 h-5" /> 
    },
  ];

  const adminMenu = [
    { 
      name: 'Dashboard', 
      path: '/admin/dashboard', 
      icon: <HomeIcon className="w-5 h-5" /> 
    },
    { 
      name: 'User Management', 
      path: '/admin/users', 
      icon: <UsersIcon className="w-5 h-5" /> 
    },
    { 
      name: 'NOC Approvals', 
      path: '/admin/internships', 
      icon: <DocumentTextIcon className="w-5 h-5" /> 
    },
  ];

  const getMenuItems = () => {
    switch (role) {
      case 'faculty':
        return facultyMenu;
      case 'student':
        return studentMenu;
      case 'admin':
        return adminMenu;
      default:
        return studentMenu;
    }
  };

  const menuItems = getMenuItems();

  return (
    <div className="flex flex-col w-64 bg-white shadow-xl border-r border-gray-200">
      {/* Logo Section */}
      <div className="flex items-center h-16 px-6 bg-gradient-to-r from-blue-500 to-purple-600 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <AcademicCapIcon className="h-6 w-6 text-white drop-shadow-sm" />
          <span className="text-white text-lg font-semibold tracking-wide drop-shadow-sm">
            InternNova
          </span>
        </div>
      </div>

      {/* Logout Section */}
      <div className="px-4 py-3 border-b border-gray-200">
        <button
          onClick={handleLogout}
          className="group flex items-center w-full px-4 py-2 text-sm font-medium text-gray-700 hover:bg-red-50 hover:text-red-700 rounded-lg transition-all duration-200"
        >
          <ArrowRightOnRectangleIcon className="w-5 h-5 mr-3 text-gray-400 group-hover:text-red-500" />
          <span>Logout</span>
        </button>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                isActive
                  ? 'bg-purple-50 text-purple-700 border-l-4 border-purple-500 shadow-sm'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <div className={`flex-shrink-0 transition-colors duration-200 ${
                isActive ? 'text-purple-700' : 'text-gray-400 group-hover:text-gray-600'
              }`}>
                {item.icon}
              </div>
              <span className="ml-3">{item.name}</span>
              {isActive && (
                <div className="ml-auto">
                  <div className="w-2 h-2 bg-purple-700 rounded-full"></div>
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="flex-shrink-0 px-4 py-4 border-t border-gray-200">
        <div className="text-xs text-gray-500 text-center">
          <p className="font-medium">InternNova Portal</p>
          <p className="mt-1">Version 2.0.0</p>
          <p className="mt-2">© 2024 All rights reserved</p>
        </div>
      </div>
    </div>
  );
};

export default CommonSidebar;
