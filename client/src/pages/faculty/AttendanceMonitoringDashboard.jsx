import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import SidebarModern from '../../layout/SidebarModern';
import KPICard from '../../components/ui/KPICard';
import { 
  UsersIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ArrowDownTrayIcon,
  CalendarIcon,
  BuildingOfficeIcon,
  ArrowPathIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import LineChartComponent from '../../components/charts/LineChartComponent';
import PieChartComponent from '../../components/charts/PieChartComponent';

const AttendanceMonitoringDashboard = () => {
  const [user, setUser] = useState(null);
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedInternship, setSelectedInternship] = useState('all');
  const [selectedDateRange, setSelectedDateRange] = useState('today');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const internships = [
    { value: 'all', label: 'All Internships' },
    { value: 'techcorp', label: 'TechCorp Solutions' },
    { value: 'creative', label: 'Creative Agency' },
    { value: 'analytics', label: 'Analytics Pro' },
    { value: 'startup', label: 'StartupXYZ' },
  ];

  const dateRanges = [
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'custom', label: 'Custom Range' },
  ];

  const departments = [
    { value: 'all', label: 'All Departments' },
    { value: 'cs', label: 'Computer Science' },
    { value: 'it', label: 'Information Technology' },
    { value: 'engineering', label: 'Engineering' },
    { value: 'business', label: 'Business' },
  ];

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    
    fetchAttendanceData();
  }, [selectedInternship, selectedDateRange, selectedDepartment]);

  const fetchAttendanceData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate random error (20% chance)
      if (Math.random() < 0.2) {
        throw new Error('Failed to load attendance data');
      }
      
      const mockData = [
        { 
          id: 1, 
          studentName: 'John Smith', 
          studentId: 'STU001',
          internship: 'TechCorp Solutions', 
          department: 'Computer Science',
          date: '2024-03-15', 
          status: 'present', 
          checkIn: '09:15 AM', 
          checkOut: '06:30 PM',
          email: 'john.smith@university.edu'
        },
        { 
          id: 2, 
          studentName: 'Sarah Johnson', 
          studentId: 'STU002',
          internship: 'Creative Agency', 
          department: 'Information Technology',
          date: '2024-03-15', 
          status: 'absent', 
          checkIn: '-', 
          checkOut: '-',
          email: 'sarah.johnson@university.edu'
        },
        { 
          id: 3, 
          studentName: 'Michael Chen', 
          studentId: 'STU003',
          internship: 'Analytics Pro', 
          department: 'Engineering',
          date: '2024-03-15', 
          status: 'present', 
          checkIn: '09:05 AM', 
          checkOut: '06:45 PM',
          email: 'michael.chen@university.edu'
        },
        { 
          id: 4, 
          studentName: 'Emily Davis', 
          studentId: 'STU004',
          internship: 'StartupXYZ', 
          department: 'Business',
          date: '2024-03-15', 
          status: 'leave', 
          checkIn: '-', 
          checkOut: '-',
          email: 'emily.davis@university.edu'
        },
        { 
          id: 5, 
          studentName: 'James Wilson', 
          studentId: 'STU005',
          internship: 'TechCorp Solutions', 
          department: 'Computer Science',
          date: '2024-03-15', 
          status: 'present', 
          checkIn: '09:30 AM', 
          checkOut: '07:00 PM',
          email: 'james.wilson@university.edu'
        },
        { 
          id: 6, 
          studentName: 'Lisa Anderson', 
          studentId: 'STU006',
          internship: 'CloudTech Inc', 
          department: 'Information Technology',
          date: '2024-03-15', 
          status: 'present', 
          checkIn: '08:45 AM', 
          checkOut: '06:15 PM',
          email: 'lisa.anderson@university.edu'
        },
        { 
          id: 7, 
          studentName: 'Robert Brown', 
          studentId: 'STU007',
          internship: 'TechCorp Solutions', 
          department: 'Engineering',
          date: '2024-03-15', 
          status: 'absent', 
          checkIn: '-', 
          checkOut: '-',
          email: 'robert.brown@university.edu'
        },
        { 
          id: 8, 
          studentName: 'Jennifer Lee', 
          studentId: 'STU008',
          internship: 'Innovation Labs', 
          department: 'Computer Science',
          date: '2024-03-15', 
          status: 'present', 
          checkIn: '09:00 AM', 
          checkOut: '06:30 PM',
          email: 'jennifer.lee@university.edu'
        },
      ];
      
      setAttendanceData(mockData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = () => {
    const total = attendanceData.length;
    const present = attendanceData.filter(item => item.status === 'present').length;
    const absent = attendanceData.filter(item => item.status === 'absent').length;
    const attendanceRate = total > 0 ? Math.round((present / total) * 100) : 0;
    
    return { total, present, absent, attendanceRate };
  };

  const stats = calculateStats();

  const getStatusBadge = (status) => {
    const statusConfig = {
      present: { color: 'bg-green-100 text-green-800', label: 'Present', icon: <CheckCircleIcon className="w-4 h-4" /> },
      absent: { color: 'bg-red-100 text-red-800', label: 'Absent', icon: <XCircleIcon className="w-4 h-4" /> },
      leave: { color: 'bg-yellow-100 text-yellow-800', label: 'Leave', icon: <ClockIcon className="w-4 h-4" /> },
    };
    
    const config = statusConfig[status] || statusConfig.present;
    return (
      <span className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full ${config.color}`}>
        {config.icon}
        <span className="ml-1">{config.label}</span>
      </span>
    );
  };

  const filteredData = attendanceData.filter(item => {
    const matchesSearch = item.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.studentId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesInternship = selectedInternship === 'all' || item.internship.toLowerCase().includes(selectedInternship);
    const matchesDepartment = selectedDepartment === 'all' || item.department.toLowerCase().includes(selectedDepartment);
    
    return matchesSearch && matchesInternship && matchesDepartment;
  });

  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleExport = (format) => {
    console.log(`Exporting attendance data as ${format}`);
    // Export logic here
  };

  const handleRowClick = (student) => {
    setSelectedStudent(student);
    setShowStudentModal(true);
  };

  const chartData = [
    { name: 'Mon', present: 45, absent: 5 },
    { name: 'Tue', present: 42, absent: 8 },
    { name: 'Wed', present: 48, absent: 2 },
    { name: 'Thu', present: 40, absent: 10 },
    { name: 'Fri', present: 43, absent: 7 },
    { name: 'Sat', present: 35, absent: 0 },
    { name: 'Sun', present: 0, absent: 0 },
  ];

  const pieData = [
    { name: 'Present', value: stats.present },
    { name: 'Absent', value: stats.absent },
    { name: 'Leave', value: attendanceData.filter(item => item.status === 'leave').length },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header user={{ name: 'Loading...' }} />
        <div className="flex flex-1">
          <SidebarModern role="faculty" />
          <main className="flex-1 p-6 md:p-8 overflow-y-auto">
            <div className="max-w-7xl mx-auto">
              {/* Loading Skeleton */}
              <div className="animate-pulse">
                <div className="flex items-center justify-between mb-8">
                  <div className="h-8 bg-gray-200 rounded w-64"></div>
                  <div className="flex space-x-3">
                    <div className="h-10 bg-gray-200 rounded w-32"></div>
                    <div className="h-10 bg-gray-200 rounded w-32"></div>
                    <div className="h-10 bg-gray-200 rounded w-32"></div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="bg-gray-200 rounded-xl h-32"></div>
                  ))}
                </div>
                
                <div className="bg-gray-200 rounded-xl h-96"></div>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header user={user} />
      
      <div className="flex flex-1">
        <SidebarModern role="faculty" />
        
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Attendance Monitoring</h1>
                <p className="text-gray-600">Track and manage student internship attendance</p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 mt-4 lg:mt-0">
                {/* Internship Filter */}
                <div className="relative">
                  <select
                    value={selectedInternship}
                    onChange={(e) => setSelectedInternship(e.target.value)}
                    className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {internships.map(internship => (
                      <option key={internship.value} value={internship.value}>{internship.label}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <BuildingOfficeIcon className="h-5 w-5" />
                  </div>
                </div>

                {/* Date Range Filter */}
                <div className="relative">
                  <select
                    value={selectedDateRange}
                    onChange={(e) => setSelectedDateRange(e.target.value)}
                    className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {dateRanges.map(range => (
                      <option key={range.value} value={range.value}>{range.label}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <CalendarIcon className="h-5 w-5" />
                  </div>
                </div>

                {/* Department Filter */}
                <div className="relative">
                  <select
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                    className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {departments.map(dept => (
                      <option key={dept.value} value={dept.value}>{dept.label}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <FunnelIcon className="h-5 w-5" />
                  </div>
                </div>

                {/* Search Bar */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search student..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                  </div>
                </div>

                {/* Export Button */}
                <div className="relative group">
                  <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
                    <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
                    Export
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                    <button
                      onClick={() => handleExport('csv')}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-t-lg"
                    >
                      Export as CSV
                    </button>
                    <button
                      onClick={() => handleExport('pdf')}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-b-lg"
                    >
                      Export as PDF
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {error ? (
              /* Error State */
              <div className="bg-white rounded-xl shadow-md p-8 text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ExclamationTriangleIcon className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Unable to load attendance data</h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  There was an error loading the attendance data. Please check your connection and try again.
                </p>
                <button
                  onClick={fetchAttendanceData}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  <ArrowPathIcon className="h-4 w-4 mr-2" />
                  Retry
                </button>
              </div>
            ) : (
              <>
                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <KPICard
                    title="Total Students"
                    value={stats.total}
                    icon={<UsersIcon />}
                    trend="Active interns"
                    trendDirection="up"
                    color="blue"
                  />
                  
                  <KPICard
                    title="Present Today"
                    value={stats.present}
                    icon={<CheckCircleIcon />}
                    trend={`${stats.present > 0 ? 'On time' : 'No check-ins'}`}
                    trendDirection="up"
                    color="green"
                  />
                  
                  <KPICard
                    title="Absent Today"
                    value={stats.absent}
                    icon={<XCircleIcon />}
                    trend={`${stats.absent > 0 ? 'Needs attention' : 'All present'}`}
                    trendDirection={stats.absent > 0 ? 'down' : 'up'}
                    color="red"
                  />
                  
                  <KPICard
                    title="Attendance Rate"
                    value={`${stats.attendanceRate}%`}
                    icon={<ClockIcon />}
                    trend={`${stats.attendanceRate >= 80 ? 'Excellent' : 'Needs improvement'}`}
                    trendDirection={stats.attendanceRate >= 80 ? 'up' : 'down'}
                    color="purple"
                  />
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                  {/* Attendance Trend Chart */}
                  <div className="bg-white rounded-xl shadow-md p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Attendance Trend</h3>
                    <LineChartComponent
                      data={chartData}
                      gradientColors={['#10B981', '#059669']}
                      strokeWidth={3}
                      curveType="monotone"
                    />
                  </div>

                  {/* Present vs Absent Pie Chart */}
                  <div className="bg-white rounded-xl shadow-md p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Attendance Distribution</h3>
                    <PieChartComponent
                      data={pieData}
                      colors={['#10B981', '#EF4444', '#F59E0B']}
                      showLegend={true}
                      showTooltip={true}
                    />
                  </div>
                </div>

                {/* Attendance Table */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">Student Attendance Records</h3>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Student
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Internship
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Department
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Check-in
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Check-out
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {paginatedData.map((record, index) => (
                          <tr 
                            key={record.id} 
                            className="hover:bg-gray-50 transition-colors cursor-pointer"
                            onClick={() => handleRowClick(record)}
                          >
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                                  <span className="text-blue-600 font-semibold text-sm">
                                    {record.studentName.split(' ').map(n => n[0]).join('')}
                                  </span>
                                </div>
                                <div>
                                  <div className="text-sm font-medium text-gray-900">{record.studentName}</div>
                                  <div className="text-xs text-gray-500">{record.studentId}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {record.internship}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                              {record.department}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                              {new Date(record.date).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {getStatusBadge(record.status)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                              {record.checkIn}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                              {record.checkOut}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="px-6 py-4 border-t border-gray-200">
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-700">
                          Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length} results
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="px-3 py-1 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                          >
                            Previous
                          </button>
                          {[...Array(totalPages)].map((_, i) => (
                            <button
                              key={i + 1}
                              onClick={() => setCurrentPage(i + 1)}
                              className={`px-3 py-1 text-sm border rounded-md ${
                                currentPage === i + 1
                                  ? 'bg-blue-600 text-white border-blue-600'
                                  : 'border-gray-300 hover:bg-gray-50'
                              }`}
                            >
                              {i + 1}
                            </button>
                          ))}
                          <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="px-3 py-1 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                          >
                            Next
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}

            {/* Student Details Modal */}
            {showStudentModal && selectedStudent && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">Student Attendance Details</h3>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center mb-6">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                        <span className="text-blue-600 font-bold text-xl">
                          {selectedStudent.studentName.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold text-gray-900">{selectedStudent.studentName}</h4>
                        <p className="text-gray-600">{selectedStudent.studentId}</p>
                        <p className="text-sm text-gray-500">{selectedStudent.email}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Internship</label>
                        <p className="text-gray-900">{selectedStudent.internship}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                        <p className="text-gray-900">{selectedStudent.department}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                        <p className="text-gray-900">{new Date(selectedStudent.date).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                        <div>{getStatusBadge(selectedStudent.status)}</div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Check-in Time</label>
                        <p className="text-gray-900">{selectedStudent.checkIn}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Check-out Time</label>
                        <p className="text-gray-900">{selectedStudent.checkOut}</p>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-3">
                      <button
                        onClick={() => setShowStudentModal(false)}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        Close
                      </button>
                      <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                        Edit Attendance
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AttendanceMonitoringDashboard;
