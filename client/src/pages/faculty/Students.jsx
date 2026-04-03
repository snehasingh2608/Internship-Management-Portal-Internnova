import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Navbar from '../../layout/Navbar';
import CommonSidebar from '../../layout/CommonSidebar';
import api, { userAPI, internshipAPI, analyticsAPI } from '../../api/api';
import {
  UserGroupIcon,
  UserIcon,
  AcademicCapIcon,
  MagnifyingGlassIcon,
  ArrowPathIcon,
  ExclamationTriangleIcon,
  EyeIcon,
  DocumentTextIcon,
  FlagIcon,
  ArrowDownTrayIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  XMarkIcon,
  EnvelopeIcon,
  BriefcaseIcon
} from '@heroicons/react/24/outline';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import AttendanceDistribution from '../../components/charts/AttendanceDistribution';

const Students = () => {
  // State management
  // const [students, setStudents] = useState([]);
  const [students, setStudents] = useState([
  { name: "A", attendance: 80 },
  { name: "B", attendance: 60 },
  { name: "C", attendance: 40 },
  { name: "D", attendance: 90 },
]);
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [retryCount, setRetryCount] = useState(0);
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInternship, setSelectedInternship] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedAttendance, setSelectedAttendance] = useState('all');
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  
  // UI states
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  // Analytics State
  const [stats, setStats] = useState({
    totalStudents: 0,
    activeInternships: 0,
    completedInternships: 0,
    lowAttendance: 0,
    attendanceChart: { present: 0, partial: 0, absent: 0 },
    internshipChart: { active: 0, completed: 0, inactive: 0 },
  });

  // Fetch analytics data
  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await analyticsAPI.getInternshipAnalytics();
        if (response.data.success) {
          setStats(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching internship analytics:", error);
      }
    };
    fetchAnalytics();
  }, [retryCount]);

  // Fetch data on component mount
  useEffect(() => {
    fetchAllData();
  }, [retryCount]);

  const formatStudentData = (records) => {
    return records.map(record => {
      const isJanY = record.attend_ance_jan === 'Y';
      const isFebY = record.attend_ance_feb === 'Y';
      let att = 0;
      if (isJanY && isFebY) att = 100;
      else if (isJanY || isFebY) att = 50;

      return {
        _id: String(record.roll_number || record._id),
        name: record.student_name,
        department: record.program || 'N/A',
        email: 'student@internnova.com',
        attendance: att,
        internshipTitle: record.placement_internshi_p_ppo || 'Internship',
        internshipStatus: record.noc === 'Y' ? 'active' : 'inactive',
        nocStatus: record.noc === 'Y' ? 'approved' : 'pending',
        internshipCompany: record.name_of_the_organization_from_where_internship_is_done || 'Company',
        reportsSubmitted: record.noc === 'Y' ? 2 : 0,
        lastActive: record.createdAt || new Date().toISOString()
      };
    });
  };

  const fetchAllData = async () => {
    setLoading(true);
    setError('');
    
    try {
      const studentsRes = await api.get('/api/students').catch(() => ({ data: { success: false, data: [] } }));
      const records = studentsRes.data?.data || [];
      setStudents(formatStudentData(records));
      
      const internshipsRes = await internshipAPI.getAll().catch(() => ({ data: [] }));
      setInternships(internshipsRes.data || []);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to load students data');
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  // Search logic handler
  useEffect(() => {
    const handleSearch = async () => {
      if (!searchQuery.trim()) {
        fetchAllData();
        return;
      }
      setLoading(true);
      try {
        const res = await api.get(`/api/students/search?query=${searchQuery}`);
        if (res.data?.success) {
          setStudents(formatStudentData(res.data.data));
        }
      } catch (error) {
        console.error('Error searching:', error);
      } finally {
        setLoading(false);
      }
    };
    const timer = setTimeout(handleSearch, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Filter and search logic
  const filterData = useCallback(() => {
    let filtered = [...students];

    // Filter by internship
    if (selectedInternship !== 'all') {
      filtered = filtered.filter(student => 
        student.internshipId === selectedInternship || 
        student.internshipTitle === selectedInternship
      );
    }

    // Filter by status
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(student => 
        student.internshipStatus === selectedStatus
      );
    }

    // Filter by attendance
    if (selectedAttendance !== 'all') {
      if (selectedAttendance === 'low') {
        filtered = filtered.filter(student => student.attendance < 50);
      } else if (selectedAttendance === 'medium') {
        filtered = filtered.filter(student => student.attendance >= 50 && student.attendance < 75);
      } else if (selectedAttendance === 'high') {
        filtered = filtered.filter(student => student.attendance >= 75);
      }
    }

    // Sort data
    filtered.sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];
      
      if (sortBy === 'name') {
        aValue = aValue?.toLowerCase() || '';
        bValue = bValue?.toLowerCase() || '';
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [students, searchQuery, selectedInternship, selectedStatus, selectedAttendance, sortBy, sortOrder]);

  const filteredData = useMemo(() => filterData(), [filterData]);

  // Calculate KPI metrics
  const kpiData = useMemo(() => {
    const totalStudents = students.length;
    const activeStudents = students.filter(s => s.internshipStatus === 'active').length;
    const lowAttendanceStudents = students.filter(s => s.attendance < 50).length;
    const completedInternships = students.filter(s => s.internshipStatus === 'completed').length;

    return {
      totalStudents,
      activeStudents,
      lowAttendanceStudents,
      completedInternships
    };
  }, [students]);

  // Pagination logic
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredData, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Chart data
  const statusDistribution = useMemo(() => [
    { name: 'Active', value: stats.internshipChart?.active || 0, color: '#3B82F6' },
    { name: 'Completed', value: stats.internshipChart?.completed || 0, color: '#10B981' },
    { name: 'Inactive', value: stats.internshipChart?.inactive || 0, color: '#6B7280' }
  ], [stats]);

  // Status badge component
  const StatusBadge = ({ status, type = 'status' }) => {
    const statusConfig = {
      active: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Active' },
      completed: { bg: 'bg-green-100', text: 'text-green-800', label: 'Completed' },
      inactive: { bg: 'bg-gray-100', text: 'text-gray-800', label: 'Inactive' },
      pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Pending' },
      approved: { bg: 'bg-green-100', text: 'text-green-800', label: 'Approved' },
      rejected: { bg: 'bg-red-100', text: 'text-red-800', label: 'Rejected' }
    };

    const config = statusConfig[status?.toLowerCase()] || statusConfig.active;

    return (
      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    );
  };

  // Attendance badge component
  const AttendanceBadge = ({ attendance }) => {
    let color = 'bg-green-100 text-green-800';
    if (attendance < 50) color = 'bg-red-100 text-red-800';
    else if (attendance < 75) color = 'bg-yellow-100 text-yellow-800';

    return (
      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${color}`}>
        {attendance}%
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
      <h3 className="text-lg font-semibold text-gray-900 mb-2">Unable to load students data</h3>
      <p className="text-gray-600 mb-6">
        {error || 'There was an error loading the students data. Please check your connection and try again.'}
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
      <h3 className="text-lg font-semibold text-gray-900 mb-2">No students found</h3>
      <p className="text-gray-600">
        {searchQuery || selectedInternship !== 'all' || selectedStatus !== 'all' || selectedAttendance !== 'all'
          ? 'Try adjusting your filters or search criteria.'
          : 'No students are currently enrolled in the system.'}
      </p>
    </div>
  );

  // Handle sorting
  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* <Navbar /> */}
      <div className="flex flex-1">
        <CommonSidebar role="faculty" />
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Students</h1>
              <p className="text-gray-600">Manage and monitor all students</p>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <KPICard
                title="Total Students"
                value={stats.totalStudents}
                icon={UserGroupIcon}
                color="bg-blue-50"
                trend="up"
                trendValue="8% from last month"
              />
              <KPICard
                title="Active Students"
                value={stats.activeInternships}
                icon={UserIcon}
                color="bg-green-50"
                trend="up"
                trendValue="12% from last week"
              />
              <KPICard
                title="Low Attendance"
                value={stats.lowAttendance}
                icon={ExclamationTriangleIcon}
                color="bg-red-50"
                trend="down"
                trendValue="3% from last week"
              />
              <KPICard
                title="Completed Internships"
                value={stats.completedInternships}
                icon={AcademicCapIcon}
                color="bg-purple-50"
                trend="up"
                trendValue="5% from last month"
              />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <AttendanceDistribution 
                students={students}
                chartData={stats.attendanceChart}
                title="Attendance Distribution"
              />

              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Internship Status</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={statusDistribution}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#3B82F6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Search & Filters Section */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
              <div className="flex flex-wrap gap-4 items-end">
                <div className="flex-1 min-w-[200px]">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
                  <div className="relative">
                    <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search by name or ID..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="flex-1 min-w-[200px]">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Internship</label>
                  <select
                    value={selectedInternship}
                    onChange={(e) => setSelectedInternship(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="all">All Internships</option>
                    {internships.map(internship => (
                      <option key={internship._id} value={internship.title}>
                        {internship.title}
                      </option>
                    ))}
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
                    <option value="active">Active</option>
                    <option value="completed">Completed</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>

                <div className="flex-1 min-w-[200px]">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Attendance</label>
                  <select
                    value={selectedAttendance}
                    onChange={(e) => setSelectedAttendance(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="all">All Attendance</option>
                    <option value="low">Low (&lt;50%)</option>
                    <option value="medium">Medium (50-75%)</option>
                    <option value="high">High (&gt;75%)</option>
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
            </div>

            {loading ? (
              <LoadingSkeleton />
            ) : error ? (
              <ErrorState />
            ) : (
              <>
                {/* Students Table */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900">
                        Students ({filteredData.length})
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
                                <button
                                  onClick={() => handleSort('name')}
                                  className="flex items-center hover:text-gray-700"
                                >
                                  Student Name
                                  {sortBy === 'name' && (
                                    <span className="ml-1">
                                      {sortOrder === 'asc' ? '↑' : '↓'}
                                    </span>
                                  )}
                                </button>
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Email / ID
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Internship
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                <button
                                  onClick={() => handleSort('attendance')}
                                  className="flex items-center hover:text-gray-700"
                                >
                                  Attendance
                                  {sortBy === 'attendance' && (
                                    <span className="ml-1">
                                      {sortOrder === 'asc' ? '↑' : '↓'}
                                    </span>
                                  )}
                                </button>
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {paginatedData.map((student, index) => (
                              <tr key={student._id} className={`hover:bg-gray-50 transition-colors ${student.attendance < 50 ? 'bg-red-50' : ''}`}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="flex items-center">
                                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                                      <UserIcon className="w-4 h-4 text-blue-600" />
                                    </div>
                                    <div>
                                      <div className="text-sm font-medium text-gray-900">
                                        {student.name || 'Unknown Student'}
                                      </div>
                                      <div className="text-xs text-gray-500">
                                        {student.department || 'N/A'}
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-900">
                                    <div className="flex items-center">
                                      <EnvelopeIcon className="w-4 h-4 mr-1 text-gray-400" />
                                      {student.email || 'N/A'}
                                    </div>
                                  </div>
                                  <div className="text-xs text-gray-500">
                                    ID: {student._id?.slice(-8) || 'N/A'}
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-900">
                                    <div className="flex items-center">
                                      <BriefcaseIcon className="w-4 h-4 mr-1 text-gray-400" />
                                      {student.internshipTitle}
                                    </div>
                                  </div>
                                  <div className="text-xs text-gray-500">
                                    {student.internshipCompany || 'N/A'}
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <AttendanceBadge attendance={student.attendance} />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <StatusBadge status={student.internshipStatus} />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                  <div className="flex gap-2">
                                    <button
                                      onClick={() => {
                                        setSelectedStudent(student);
                                        setShowProfileModal(true);
                                      }}
                                      className="text-blue-600 hover:text-blue-900 flex items-center"
                                      title="View Profile"
                                    >
                                      <EyeIcon className="w-4 h-4" />
                                    </button>
                                    <button
                                      className="text-green-600 hover:text-green-900 flex items-center"
                                      title="View Reports"
                                    >
                                      <DocumentTextIcon className="w-4 h-4" />
                                    </button>
                                    <button
                                      className="text-yellow-600 hover:text-yellow-900 flex items-center"
                                      title="Flag Student"
                                    >
                                      <FlagIcon className="w-4 h-4" />
                                    </button>
                                  </div>
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

            {/* Student Profile Modal */}
            {showProfileModal && selectedStudent && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-semibold text-gray-900">Student Profile</h3>
                      <button
                        onClick={() => setShowProfileModal(false)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <XMarkIcon className="w-6 h-6" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      {/* Profile Info */}
                      <div className="lg:col-span-1">
                        <div className="bg-gray-50 rounded-lg p-6">
                          <div className="flex flex-col items-center">
                            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                              <UserIcon className="w-10 h-10 text-blue-600" />
                            </div>
                            <h4 className="text-lg font-medium text-gray-900 text-center">
                              {selectedStudent.name}
                            </h4>
                            <p className="text-sm text-gray-500 text-center">
                              {selectedStudent.email}
                            </p>
                            <div className="mt-4 w-full">
                              <StatusBadge status={selectedStudent.internshipStatus} />
                            </div>
                          </div>
                        </div>

                        {/* Quick Stats */}
                        <div className="mt-6 space-y-4">
                          <div className="bg-white border border-gray-200 rounded-lg p-4">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-600">Attendance</span>
                              <AttendanceBadge attendance={selectedStudent.attendance} />
                            </div>
                          </div>
                          <div className="bg-white border border-gray-200 rounded-lg p-4">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-600">Reports</span>
                              <span className="text-sm font-medium text-gray-900">
                                {selectedStudent.reportsSubmitted} submitted
                              </span>
                            </div>
                          </div>
                          <div className="bg-white border border-gray-200 rounded-lg p-4">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-600">NOC Status</span>
                              <StatusBadge status={selectedStudent.nocStatus} />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Detailed Info */}
                      <div className="lg:col-span-2">
                        <div className="space-y-6">
                          {/* Personal Information */}
                          <div>
                            <h5 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h5>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                <p className="text-gray-900">{selectedStudent.name}</p>
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <p className="text-gray-900">{selectedStudent.email}</p>
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Student ID</label>
                                <p className="text-gray-900">{selectedStudent._id}</p>
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                                <p className="text-gray-900">{selectedStudent.department || 'N/A'}</p>
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                                <p className="text-gray-900">{selectedStudent.phone || 'N/A'}</p>
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Last Active</label>
                                <p className="text-gray-900">
                                  {new Date(selectedStudent.lastActive).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Internship Details */}
                          <div>
                            <h5 className="text-lg font-medium text-gray-900 mb-4">Internship Details</h5>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Internship Title</label>
                                <p className="text-gray-900">{selectedStudent.internshipTitle}</p>
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                                <p className="text-gray-900">{selectedStudent.internshipCompany || 'N/A'}</p>
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                                <p className="text-gray-900">
                                  {selectedStudent.internshipStartDate 
                                    ? new Date(selectedStudent.internshipStartDate).toLocaleDateString()
                                    : 'N/A'}
                                </p>
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                                <p className="text-gray-900">
                                  {selectedStudent.internshipEndDate 
                                    ? new Date(selectedStudent.internshipEndDate).toLocaleDateString()
                                    : 'N/A'}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Attendance Summary */}
                          <div>
                            <h5 className="text-lg font-medium text-gray-900 mb-4">Attendance Summary</h5>
                            <div className="bg-gray-50 rounded-lg p-4">
                              <div className="flex items-center justify-between mb-4">
                                <span className="text-sm font-medium text-gray-700">Overall Attendance</span>
                                <AttendanceBadge attendance={selectedStudent.attendance} />
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                  className={`h-2 rounded-full ${
                                    selectedStudent.attendance >= 75 ? 'bg-green-500' :
                                    selectedStudent.attendance >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                                  }`}
                                  style={{ width: `${selectedStudent.attendance}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>

                          {/* Reports & NOC */}
                          <div>
                            <h5 className="text-lg font-medium text-gray-900 mb-4">Reports & NOC</h5>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="bg-white border border-gray-200 rounded-lg p-4">
                                <div className="flex items-center justify-between mb-2">
                                  <span className="text-sm font-medium text-gray-700">Reports Submitted</span>
                                  <span className="text-lg font-bold text-blue-600">
                                    {selectedStudent.reportsSubmitted}
                                  </span>
                                </div>
                                <div className="text-xs text-gray-500">
                                  Total reports expected: 5
                                </div>
                              </div>
                              <div className="bg-white border border-gray-200 rounded-lg p-4">
                                <div className="flex items-center justify-between mb-2">
                                  <span className="text-sm font-medium text-gray-700">NOC Status</span>
                                  <StatusBadge status={selectedStudent.nocStatus} />
                                </div>
                                <div className="text-xs text-gray-500">
                                  Requested on: {new Date().toLocaleDateString()}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 flex justify-end gap-3">
                      <button
                        onClick={() => setShowProfileModal(false)}
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                      >
                        Close
                      </button>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        View Full Profile
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

export default Students;
