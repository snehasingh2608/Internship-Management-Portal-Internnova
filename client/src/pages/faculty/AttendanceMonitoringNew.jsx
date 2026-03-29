import React, { useState, useEffect } from 'react';
import Navbar from '../../layout/Navbar';
import Sidebar from '../../layout/Sidebar';
import { attendanceAPI } from '../../api/api';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import SearchBar from '../../components/ui/SearchBar';
import FilterDropdown from '../../components/ui/FilterDropdown';
import Table from '../../components/ui/Table';
import { RefreshIcon } from '../../components/icons';

const AttendanceMonitoringNew = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [monthFilter, setMonthFilter] = useState('all');

  const monthOptions = [
    { value: 'all', label: 'All Months' },
    { value: 'January', label: 'January' },
    { value: 'February', label: 'February' },
    { value: 'March', label: 'March' },
    { value: 'April', label: 'April' },
    { value: 'May', label: 'May' },
    { value: 'June', label: 'June' },
  ];

  useEffect(() => {
    fetchAttendanceData();
  }, []);

  useEffect(() => {
    filterData();
  }, [attendanceData, searchTerm, monthFilter]);

  const fetchAttendanceData = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await attendanceAPI.getAllAttendanceLogs();
      setAttendanceData(res.data || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load attendance data');
      setAttendanceData([]);
    } finally {
      setLoading(false);
    }
  };

  const filterData = () => {
    let filtered = attendanceData;

    if (searchTerm) {
      filtered = filtered.filter(record => 
        record.studentName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.internship?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (monthFilter !== 'all') {
      filtered = filtered.filter(record => record.month === monthFilter);
    }

    setFilteredData(filtered);
  };

  const getTableData = () => {
    return filteredData.map(record => [
      record.studentName || '-',
      record.internship || '-',
      record.month || '-',
      `${record.attendance}%`,
      <Badge 
        key={record._id} 
        variant={
          record.status === 'Approved' ? 'success' :
          record.status === 'Pending' ? 'warning' : 'danger'
        }
      >
        {record.status || 'Pending'}
      </Badge>,
      <div key={record._id} className="flex space-x-2">
        <Button
          variant="outline"
          size="sm"
        >
          View Details
        </Button>
        {record.status === 'Pending' && (
          <Button
            variant="success"
            size="sm"
          >
            Approve
          </Button>
        )}
      </div>
    ]);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar role="faculty" />
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Attendance Monitoring</h1>
              <Button
                variant="outline"
                onClick={fetchAttendanceData}
                loading={loading}
              >
                <RefreshIcon className="mr-2" />
                Refresh
              </Button>
            </div>

            {/* Filters */}
            <Card className="mb-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <SearchBar
                    placeholder="Search by student name or internship..."
                    onSearch={setSearchTerm}
                  />
                </div>
                <FilterDropdown
                  options={monthOptions}
                  selectedValue={monthFilter}
                  onChange={setMonthFilter}
                  placeholder="Filter by month"
                  className="w-full sm:w-48"
                />
              </div>
            </Card>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Records</p>
                    <p className="text-2xl font-bold text-gray-900">{attendanceData.length}</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                </div>
              </Card>

              <Card>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Pending Approval</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {attendanceData.filter(r => r.status === 'Pending').length}
                    </p>
                  </div>
                  <div className="p-3 bg-yellow-50 rounded-lg">
                    <svg className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </Card>

              <Card>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Approved</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {attendanceData.filter(r => r.status === 'Approved').length}
                    </p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </Card>
            </div>

            {/* Table */}
            <Table
              headers={['Student Name', 'Internship Title', 'Month', 'Attendance %', 'Status', 'Actions']}
              data={getTableData()}
              loading={loading}
              error={error}
              emptyMessage="No attendance records found"
              onRetry={fetchAttendanceData}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AttendanceMonitoringNew;
