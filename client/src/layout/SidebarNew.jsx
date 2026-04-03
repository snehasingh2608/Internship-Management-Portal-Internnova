// import React from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { 
//   HomeIcon,
//   UsersIcon,
//   BriefcaseIcon,
//   DocumentIcon,
//   ClockIcon,
//   ChartIcon
// } from '../components/icons';

// const SidebarNew = ({ role }) => {
//   const location = useLocation();

//   const facultyMenu = [
//     { 
//       name: 'Dashboard', 
//       path: '/faculty/dashboard', 
//       icon: <HomeIcon className="h-5 w-5" /> 
//     },
//     { 
//       name: 'Students', 
//       path: '/faculty/students', 
//       icon: <UsersIcon className="h-5 w-5" /> 
//     },
//     { 
//       name: 'Internships', 
//       path: '/faculty/internships', 
//       icon: <BriefcaseIcon className="h-5 w-5" /> 
//     },
//     { 
//       name: 'NOC Approvals', 
//       path: '/faculty/noc-approvals', 
//       icon: <DocumentIcon className="h-5 w-5" /> 
//     },
//     { 
//       name: 'Attendance', 
//       path: '/faculty/attendance-monitoring', 
//       icon: <ClockIcon className="h-5 w-5" /> 
//     },
//     { 
//       name: 'Reports', 
//       path: '/faculty/reports', 
//       icon: <ChartIcon className="h-5 w-5" /> 
//     },
//   ];

//   const studentMenu = [
//     { 
//       name: 'Dashboard', 
//       path: '/student/dashboard', 
//       icon: <HomeIcon className="h-5 w-5" /> 
//     },
//     { 
//       name: 'Internships', 
//       path: '/student/internships', 
//       icon: <BriefcaseIcon className="h-5 w-5" /> 
//     },
//     { 
//       name: 'Profile', 
//       path: '/student/profile', 
//       icon: <UsersIcon className="h-5 w-5" /> 
//     },
//     { 
//       name: 'My Applications', 
//       path: '/student/applications', 
//       icon: <DocumentIcon className="h-5 w-5" /> 
//     },
//   ];

//   const adminMenu = [
//     { 
//       name: 'Dashboard', 
//       path: '/admin/dashboard', 
//       icon: <HomeIcon className="h-5 w-5" /> 
//     },
//     { 
//       name: 'User Management', 
//       path: '/admin/users', 
//       icon: <UsersIcon className="h-5 w-5" /> 
//     },
//     { 
//       name: 'NOC Approvals', 
//       path: '/admin/internships', 
//       icon: <DocumentIcon className="h-5 w-5" /> 
//     },
//   ];

//   const getMenuItems = () => {
//     switch (role) {
//       case 'faculty':
//         return facultyMenu;
//       case 'student':
//         return studentMenu;
//       case 'admin':
//         return adminMenu;
//       default:
//         return studentMenu;
//     }
//   };

//   const menuItems = getMenuItems();

//   return (
//     <div className="flex flex-col w-64 bg-white shadow-lg">
//       <div className="flex items-center h-16 px-6 bg-blue-600">
//         <h1 className="text-xl font-bold text-white">InternNova</h1>
//       </div>
      
//       <nav className="flex-1 px-4 py-6 space-y-2">
//         {menuItems.map((item) => {
//           const isActive = location.pathname === item.path;
          
//           return (
//             <Link
//               key={item.path}
//               to={item.path}
//               className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
//                 isActive
//                   ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
//                   : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
//               }`}
//             >
//               <div className={`flex-shrink-0 ${
//                 isActive ? 'text-blue-700' : 'text-gray-400 group-hover:text-gray-500'
//               }`}>
//                 {item.icon}
//               </div>
//               <span className="ml-3">{item.name}</span>
//             </Link>
//           );
//         })}
//       </nav>

//       <div className="flex-shrink-0 px-4 py-4 border-t border-gray-200">
//         <div className="text-xs text-gray-500 text-center">
//           <p>© 2024 InternNova</p>
//           <p className="mt-1">Version 1.0.0</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SidebarNew;
