import React, { useState, useEffect } from 'react';
import Navbar from '../../layout/Navbar';
import Sidebar from '../../layout/Sidebar';
import { nocAPI, internshipAPI } from '../../api/api';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import { 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { DownloadIcon } from '../../components/icons';

const ReportsNew = () => {
  const [nocData, setNocData] = useState([]);
  const [internshipData, setInternshipData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchReportData();
  }, []);

  const fetchReportData = async () => {
    try {
      const [nocRes, internshipRes] = await Promise.all([
        nocAPI.getMyRequests(),
        internshipAPI.getAll()
      ]);

      setNocData(nocRes.data || []);
      setInternshipData(internshipRes.data || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load report data');
    } finally {
      setLoading(false);
    }
  };

  const getNocStatusData = () => {
    const statusCount = {
      pending: nocData.filter(n => n.status === 'pending').length,
      approved: nocData.filter(n => n.status === 'approved').length,
      rejected: nocData.filter(n => n.status === 'rejected').length,
    };

    return [
      { name: 'Pending', value: statusCount.pending, color: '#FCD34D' },
      { name: 'Approved', value: statusCount.approved, color: '#34D399' },
      { name: 'Rejected', value: statusCount.rejected, color: '#F87171' },
    ];
  };

  const getMonthlyInternshipData = () => {
    const monthlyData = {};
    
    internshipData.forEach(internship => {
      const month = new Date(internship.createdAt).toLocaleDateString('en-US', { month: 'short' });
      monthlyData[month] = (monthlyData[month] || 0) + 1;
    });

    return Object.entries(monthlyData).map(([month, count]) => ({
      month,
      internships: count,
    }));
  };

  const exportToPDF = () => {
    // Implementation for PDF export
    console.log('Exporting to PDF...');
  };

  const exportToCSV = () => {
    // Implementation for CSV export
    const csvContent = 'data:text/csv;charset=utf-8,' + 
      'Student Name,Company,Status,Applied Date\n' +
      nocData.map(n => `${n.studentName},${n.company},${n.status},${n.appliedDate}`).join('\n');
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'noc_report.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToExcel = () => {
    // Implementation for Excel export
    console.log('Exporting to Excel...');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <div className="flex flex-1">
          <Sidebar role="faculty" />
          <main className="flex-1 p-6 md:p-8 overflow-y-auto">
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar role="faculty" />
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
              <div className="flex space-x-3">
                <Button variant="outline" onClick={exportToPDF}>
                  <DownloadIcon className="mr-2" />
                  Export PDF
                </Button>
                <Button variant="outline" onClick={exportToCSV}>
                  <DownloadIcon className="mr-2" />
                  Export CSV
                </Button>
                <Button variant="outline" onClick={exportToExcel}>
                  <DownloadIcon className="mr-2" />
                  Export Excel
                </Button>
              </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card>
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-600">Total NOCs</p>
                  <p className="text-3xl font-bold text-gray-900">{nocData.length}</p>
                </div>
              </Card>
              <Card>
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-3xl font-bold text-yellow-600">
                    {nocData.filter(n => n.status === 'pending').length}
                  </p>
                </div>
              </Card>
              <Card>
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-600">Approved</p>
                  <p className="text-3xl font-bold text-green-600">
                    {nocData.filter(n => n.status === 'approved').length}
                  </p>
                </div>
              </Card>
              <Card>
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-600">Total Internships</p>
                  <p className="text-3xl font-bold text-blue-600">{internshipData.length}</p>
                </div>
              </Card>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* NOC Status Pie Chart */}
              <Card>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">NOC Status Distribution</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={getNocStatusData()}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {getNocStatusData().map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Card>

              {/* Monthly Internships Bar Chart */}
              <Card>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Internship Postings</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={getMonthlyInternshipData()}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="internships" fill="#3B82F6" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </div>

            {/* Recent Activity Table */}
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent NOC Applications</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Student Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Company
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Applied Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {nocData.slice(0, 10).map((noc) => (
                      <tr key={noc._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {noc.studentName || '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {noc.company || '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge 
                            variant={
                              noc.status === 'approved' ? 'success' :
                              noc.status === 'rejected' ? 'danger' : 'warning'
                            }
                          >
                            {noc.status || 'Pending'}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {noc.appliedDate ? new Date(noc.appliedDate).toLocaleDateString() : '-'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ReportsNew;
