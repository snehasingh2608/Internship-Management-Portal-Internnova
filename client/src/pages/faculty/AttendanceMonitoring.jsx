import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Navbar from '../../layout/Navbar';
import CommonSidebar from '../../layout/CommonSidebar';
import { attendanceAPI, internshipAPI, userAPI } from '../../api/api';
import {
  UserGroupIcon,
  ChartBarIcon,
  CheckCircleIcon,
  XCircleIcon,
  ArrowPathIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ArrowDownTrayIcon,
  CalendarIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  UserIcon,
  AcademicCapIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  EyeIcon
} from '@heroicons/react/24/outline';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const AttendanceMonitoring = () => {
  // State management
  const [attendanceData, setAttendanceData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [internships, setInternships] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [retryCount, setRetryCount] = useState(0);
  
  // Filter states
  const [selectedInternship, setSelectedInternship] = useState('all');
  const [selectedStudent, setSelectedStudent] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [dateRange, setDateRange] = useState('today');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  
  // UI states
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  // Fetch data on component mount
  useEffect(() => {
    fetchAllData();
  }, [retryCount]);

  const fetchAllData = async () => {
    setLoading(true);
    setError('');
    
    try {
      // Fetch all data in parallel
      const [attendanceRes, internshipsRes, studentsRes] = await Promise.all([
        attendanceAPI.getAllAttendanceLogs().catch(() => ({ data: [] })),
        internshipAPI.getAll().catch(() => ({ data: [] })),
        userAPI.getAll().catch(() => ({ data: [] }))
      ]);

      // Process attendance data
      const attendance = attendanceRes.data || [];
      const processedAttendance = attendance.map(record => ({
        ...record,
        date: record.date || new Date().toISOString().split('T')[0],
        checkIn: record.checkIn || '09:00 AM',
        checkOut: record.checkOut || '06:00 PM',
        status: record.status?.toLowerCase() || 'present'
      }));

      setAttendanceData(processedAttendance);
      
      // Process internships
      const internshipList = internshipsRes.data || [];
      setInternships(internshipList);
      
      // Process students
      const studentList = studentsRes.data || [];
      setStudents(studentList);

    } catch (err) {
      console.error('Error fetching data:', err);
      setError(err.response?.data?.message || 'Failed to load internship attendance');
      setAttendanceData([]);
    } finally {
      setLoading(false);
    }
  };

  // Filter and search logic
  const filterData = useCallback(() => {
    let filtered = [...attendanceData];

    // Filter by internship
    if (selectedInternship !== 'all') {
      filtered = filtered.filter(record => 
        record.internshipId === selectedInternship || 
        record.internship === selectedInternship
      );
    }

    // Filter by student
    if (selectedStudent !== 'all') {
      filtered = filtered.filter(record => 
        record.studentId === selectedStudent || 
        record.studentName === selectedStudent
      );
    }

    // Filter by status
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(record => 
        record.status === selectedStatus.toLowerCase()
      );
    }

    // Filter by date range
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    
    if (dateRange === 'today') {
      filtered = filtered.filter(record => record.date === todayStr);
    } else if (dateRange === 'week') {
      const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
      filtered = filtered.filter(record => new Date(record.date) >= weekAgo);
    } else if (dateRange === 'month') {
      const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
      filtered = filtered.filter(record => new Date(record.date) >= monthAgo);
    }

    // Search by student name or ID
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(record =>
        record.studentName?.toLowerCase().includes(query) ||
        record.studentId?.toLowerCase().includes(query) ||
        record.email?.toLowerCase().includes(query)
      );
    }

    setFilteredData(filtered);
    setCurrentPage(1); // Reset to first page on filter
  }, [attendanceData, selectedInternship, selectedStudent, selectedStatus, dateRange, searchQuery]);

  useEffect(() => {
    filterData();
  }, [filterData]);

  // Calculate KPI metrics
  const kpiData = useMemo(() => {
    const totalStudents = new Set(filteredData.map(r => r.studentId)).size;
    const presentToday = filteredData.filter(r => r.status === 'present').length;
    const absentToday = filteredData.filter(r => r.status === 'absent').length;
    const attendancePercentage = totalStudents > 0 
      ? Math.round((presentToday / totalStudents) * 100) 
      : 0;

    return {
      totalStudents,
      presentToday,
      absentToday,
      attendancePercentage
    };
  }, [filteredData]);

  // Pagination logic
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredData, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Chart data
  const weeklyTrendData = useMemo(() => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return days.map(day => ({
      day,
      present: Math.floor(Math.random() * 50) + 20,
      absent: Math.floor(Math.random() * 20) + 5
    }));
  }, []);

  const pieChartData = useMemo(() => [
    { name: 'Present', value: kpiData.presentToday, color: '#10B981' },
    { name: 'Absent', value: kpiData.absentToday, color: '#EF4444' },
    { name: 'Late', value: Math.floor(Math.random() * 10) + 2, color: '#F59E0B' }
  ], [kpiData.presentToday, kpiData.absentToday]);

  // Status badge component
  const StatusBadge = ({ status }) => {
    const statusConfig = {
      present: { bg: 'bg-green-100', text: 'text-green-800', label: 'Present' },
      absent: { bg: 'bg-red-100', text: 'text-red-800', label: 'Absent' },
      late: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Late' }
    };

    const config = statusConfig[status?.toLowerCase()] || statusConfig.present;

    return (
      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    );
  };

  // KPI Card component
  const KPICard = ({ title, value, icon: Icon, color, trend, trendValue }) => (
    <div className={`${color} rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-200`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
          {trend && (
            <div className={`flex items-center mt-2 text-sm ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
              {trend === 'up' ? <ArrowTrendingUpIcon className="w-4 h-4 mr-1" /> : <ArrowTrendingDownIcon className="w-4 h-4 mr-1" />}
              {trendValue}
            </div>
          )}
        </div>
        <div className={`p-3 rounded-full ${color.replace('bg-', 'bg-opacity-20 bg-')}`}>
          <Icon className="w-8 h-8 text-gray-700" />
        </div>
      </div>
    </div>
  );

  // Loading skeleton
  const LoadingSkeleton = () => (
    <div className="animate-pulse">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-gray-200 rounded-xl h-32"></div>
        ))}
      </div>
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="h-8 bg-gray-200 rounded w-64 mb-6"></div>
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-12 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    </div>
  );

  // Error state component
  const ErrorState = () => (
    <div className="bg-white rounded-xl shadow-md p-8 text-center">
      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <ExclamationTriangleIcon className="w-8 h-8 text-red-600" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">Unable to load attendance data</h3>
      <p className="text-gray-600 mb-6">
        {error || 'There was an error loading the attendance data. Please check your connection and try again.'}
      </p>
      <button
        onClick={() => setRetryCount(prev => prev + 1)}
        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        <ArrowPathIcon className="h-4 w-4 mr-2" />
        Retry
      </button>
    </div>
  );

  // Empty state component
  const EmptyState = () => (
    <div className="bg-white rounded-xl shadow-md p-12 text-center">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <UserGroupIcon className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">No attendance records found</h3>
      <p className="text-gray-600">
        {searchQuery || selectedInternship !== 'all' || selectedStudent !== 'all' || selectedStatus !== 'all'
          ? 'Try adjusting your filters or search criteria.'
          : 'Attendance records will appear here once students start checking in.'}
      </p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* <Navbar /> */}
      <div className="flex flex-1">
        <CommonSidebar role="faculty" />
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Attendance Monitoring</h1>
              <p className="text-gray-600">Track and manage student internship attendance</p>
            </div>

            {/* Filters Section */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
              <div className="flex flex-wrap gap-4 items-end">
                <div className="flex-1 min-w-[200px]">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Internship</label>
                  <select
                    value={selectedInternship}
                    onChange={(e) => setSelectedInternship(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="all">All Internships</option>
                    {internships.map(internship => (
                      <option key={internship._id} value={internship._id}>
                        {internship.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex-1 min-w-[200px]">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Student</label>
                  <select
                    value={selectedStudent}
                    onChange={(e) => setSelectedStudent(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="all">All Students</option>
                    {students.map(student => (
                      <option key={student._id} value={student._id}>
                        {student.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex-1 min-w-[200px]">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
                  <select
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="today">Today</option>
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                  </select>
                </div>

                <div className="flex-1 min-w-[200px]">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="all">All Status</option>
                    <option value="present">Present</option>
                    <option value="absent">Absent</option>
                    <option value="late">Late</option>
                  </select>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setRetryCount(prev => prev + 1)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                  >
                    <ArrowPathIcon className="w-4 h-4 mr-2" />
                    Refresh
                  </button>
                </div>
              </div>

              {/* Search Bar */}
              <div className="mt-4 relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by student name or ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {loading ? (
              <LoadingSkeleton />
            ) : error ? (
              <ErrorState />
            ) : (
              <>
                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <KPICard
                    title="Total Students"
                    value={kpiData.totalStudents}
                    icon={UserGroupIcon}
                    color="bg-blue-50"
                    trend="up"
                    trendValue="12% from last week"
                  />
                  <KPICard
                    title="Attendance %"
                    value={`${kpiData.attendancePercentage}%`}
                    icon={ChartBarIcon}
                    color="bg-green-50"
                    trend="up"
                    trendValue="5% from yesterday"
                  />
                  <KPICard
                    title="Present Today"
                    value={kpiData.presentToday}
                    icon={CheckCircleIcon}
                    color="bg-emerald-50"
                  />
                  <KPICard
                    title="Absent Today"
                    value={kpiData.absentToday}
                    icon={XCircleIcon}
                    color="bg-red-50"
                  />
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                  <div className="bg-white rounded-xl shadow-md p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Attendance Trend</h3>
                    <ResponsiveContainer width="100%" height={200}>
                      <LineChart data={weeklyTrendData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="present" stroke="#10B981" strokeWidth={2} />
                        <Line type="monotone" dataKey="absent" stroke="#EF4444" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="bg-white rounded-xl shadow-md p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Attendance Distribution</h3>
                    <ResponsiveContainer width="100%" height={200}>
                      <PieChart>
                        <Pie
                          data={pieChartData}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label
                        >
                          {pieChartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Attendance Table */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900">
                        Attendance Records ({filteredData.length})
                      </h3>
                      <div className="relative">
                        <button
                          onClick={() => setShowExportMenu(!showExportMenu)}
                          className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                        >
                          <ArrowDownTrayIcon className="w-4 h-4 mr-2" />
                          Export
                        </button>
                        {showExportMenu && (
                          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10">
                            <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                              Export as CSV
                            </button>
                            <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                              Export as PDF
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {filteredData.length === 0 ? (
                    <EmptyState />
                  ) : (
                    <>
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Student Name
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Internship
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
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {paginatedData.map((record, index) => (
                              <tr key={index} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="flex items-center">
                                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                                      <UserIcon className="w-4 h-4 text-blue-600" />
                                    </div>
                                    <div>
                                      <div className="text-sm font-medium text-gray-900">
                                        {record.studentName || 'Unknown Student'}
                                      </div>
                                      <div className="text-xs text-gray-500">
                                        {record.studentId || 'N/A'}
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-900">
                                    {record.internship || 'N/A'}
                                  </div>
                                  <div className="text-xs text-gray-500">
                                    {record.department || 'N/A'}
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                  {record.date || 'N/A'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <StatusBadge status={record.status} />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                  <div className="flex items-center">
                                    <ClockIcon className="w-4 h-4 mr-1 text-gray-400" />
                                    {record.checkIn || 'N/A'}
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                  <div className="flex items-center">
                                    <ClockIcon className="w-4 h-4 mr-1 text-gray-400" />
                                    {record.checkOut || 'N/A'}
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                  <button
                                    onClick={() => {
                                      setSelectedRecord(record);
                                      setShowDetailsModal(true);
                                    }}
                                    className="text-blue-600 hover:text-blue-900 flex items-center"
                                  >
                                    <EyeIcon className="w-4 h-4 mr-1" />
                                    View
                                  </button>
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
                              Showing {((currentPage - 1) * itemsPerPage) + 1} to{' '}
                              {Math.min(currentPage * itemsPerPage, filteredData.length)} of{' '}
                              {filteredData.length} results
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className="px-3 py-1 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                              >
                                <ChevronLeftIcon className="w-5 h-5" />
                              </button>
                              <span className="px-3 py-1 text-sm">
                                Page {currentPage} of {totalPages}
                              </span>
                              <button
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className="px-3 py-1 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                              >
                                <ChevronRightIcon className="w-5 h-5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </>
            )}

            {/* Details Modal */}
            {showDetailsModal && selectedRecord && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-semibold text-gray-900">Attendance Details</h3>
                      <button
                        onClick={() => setShowDetailsModal(false)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <XCircleIcon className="w-6 h-6" />
                      </button>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                          <UserIcon className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="text-lg font-medium text-gray-900">
                            {selectedRecord.studentName}
                          </h4>
                          <p className="text-sm text-gray-500">
                            ID: {selectedRecord.studentId}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                          <p className="text-gray-900">{selectedRecord.date}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                          <StatusBadge status={selectedRecord.status} />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Check-in Time</label>
                          <p className="text-gray-900">{selectedRecord.checkIn}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Check-out Time</label>
                          <p className="text-gray-900">{selectedRecord.checkOut}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Internship</label>
                          <p className="text-gray-900">{selectedRecord.internship}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                          <p className="text-gray-900">{selectedRecord.department}</p>
                        </div>
                      </div>

                      {selectedRecord.email && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                          <p className="text-gray-900">{selectedRecord.email}</p>
                        </div>
                      )}

                      {selectedRecord.notes && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                          <p className="text-gray-900">{selectedRecord.notes}</p>
                        </div>
                      )}
                    </div>

                    <div className="mt-6 flex justify-end">
                      <button
                        onClick={() => setShowDetailsModal(false)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Close
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

export default AttendanceMonitoring;
