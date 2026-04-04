import React, { useState, useEffect } from 'react';
import CommonSidebar from '../../layout/CommonSidebar';
import KPICard from '../../components/ui/KPICard';
import ChartCard from '../../components/ui/ChartCard';
import FilterButton from '../../components/ui/FilterButton';
import TimeRangeDropdown from '../../components/ui/TimeRangeDropdown';
import PieChartComponent from '../../components/charts/PieChartComponent';
import BarChartComponent from '../../components/charts/BarChartComponent';
import LineChartComponent from '../../components/charts/LineChartComponent';
import { 
  UsersIcon,
  BriefcaseIcon,
  CheckCircleIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

const ReportsAnalytics = () => {
  const [data, setData] = useState({
    nocData: [],
    internshipData: [],
    stats: {
      totalStudents: 0,
      totalInternships: 0,
      approvedNOCs: 0,
      pendingNOCs: 0
    }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeRange, setTimeRange] = useState('30days');
  const [exportFormat, setExportFormat] = useState('all');

  useEffect(() => {
    fetchAnalyticsData();
  }, [timeRange]);

  const fetchAnalyticsData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call with dummy data for now
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const dummyData = {
        nocData: [
          { name: 'Approved', value: 45 },
          { name: 'Pending', value: 12 },
          { name: 'Rejected', value: 3 }
        ],
        internshipData: [
          { name: 'Jan', value: 8 },
          { name: 'Feb', value: 12 },
          { name: 'Mar', value: 15 },
          { name: 'Apr', value: 18 },
          { name: 'May', value: 22 },
          { name: 'Jun', value: 25 }
        ],
        growthData: [
          { name: 'Week 1', value: 5 },
          { name: 'Week 2', value: 8 },
          { name: 'Week 3', value: 12 },
          { name: 'Week 4', value: 15 },
          { name: 'Week 5', value: 18 },
          { name: 'Week 6', value: 22 }
        ],
        stats: {
          totalStudents: 156,
          totalInternships: 89,
          approvedNOCs: 45,
          pendingNOCs: 12
        }
      };
      
      setData(dummyData);
    } catch (err) {
      setError('Failed to load analytics data');
    } finally {
      setLoading(false);
    }
  };

  const handleExport = (format) => {
    console.log(`Exporting as ${format}`);
    // Implementation for export functionality
  };

  const LoadingSkeleton = () => (
    <div className="animate-pulse">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-gray-200 rounded-2xl h-32"></div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-gray-200 rounded-2xl h-80"></div>
        ))}
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex">
        <CommonSidebar role="faculty" />
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <LoadingSkeleton />
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex">
        <CommonSidebar role="faculty" />
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
              <div className="text-red-600 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-red-900 mb-2">Error Loading Analytics</h3>
              <p className="text-red-700 mb-4">{error}</p>
              <button
                onClick={fetchAnalyticsData}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <CommonSidebar role="faculty" />
      <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Reports & Analytics</h1>
                <p className="text-gray-600">Comprehensive insights into internship activities and student engagement</p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 mt-4 sm:mt-0">
                <TimeRangeDropdown
                  selectedRange={timeRange}
                  onChange={setTimeRange}
                />
                
                <div className="flex gap-2">
                  <FilterButton
                    label="All"
                    isActive={exportFormat === 'all'}
                    onClick={() => setExportFormat('all')}
                  />
                  <FilterButton
                    label="PDF"
                    isActive={exportFormat === 'pdf'}
                    onClick={() => setExportFormat('pdf')}
                  />
                  <FilterButton
                    label="Excel"
                    isActive={exportFormat === 'excel'}
                    onClick={() => setExportFormat('excel')}
                  />
                  <FilterButton
                    label="CSV"
                    isActive={exportFormat === 'csv'}
                    onClick={() => setExportFormat('csv')}
                  />
                </div>
              </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <KPICard
                title="Total Students"
                value={data.stats.totalStudents}
                icon={<UsersIcon />}
                trend="12%"
                trendDirection="up"
                color="blue"
                subtitle="Active this semester"
              />
              
              <KPICard
                title="Total Internships"
                value={data.stats.totalInternships}
                icon={<BriefcaseIcon />}
                trend="8%"
                trendDirection="up"
                color="purple"
                subtitle="Posted this year"
              />
              
              <KPICard
                title="Approved NOCs"
                value={data.stats.approvedNOCs}
                icon={<CheckCircleIcon />}
                trend="15%"
                trendDirection="up"
                color="green"
                subtitle="This month"
              />
              
              <KPICard
                title="Pending NOCs"
                value={data.stats.pendingNOCs}
                icon={<ClockIcon />}
                trend="3%"
                trendDirection="down"
                color="orange"
                subtitle="Awaiting review"
              />
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* NOC Status Pie Chart */}
              <ChartCard
                title="NOC Status Distribution"
                subtitle="Breakdown of NOC applications"
                gradient="blue"
                footerActions={[
                  { label: 'View Details', onClick: () => console.log('View details') },
                  { label: 'Download', onClick: () => handleExport('pdf'), primary: true }
                ]}
              >
                <PieChartComponent
                  data={data.nocData}
                  colors={['#10B981', '#F59E0B', '#EF4444']}
                  showLegend={true}
                  showTooltip={true}
                />
              </ChartCard>

              {/* Monthly Activity Bar Chart */}
              <ChartCard
                title="Monthly Internship Activity"
                subtitle="Internships posted per month"
                gradient="purple"
                footerActions={[
                  { label: 'View Details', onClick: () => console.log('View details') },
                  { label: 'Download', onClick: () => handleExport('excel'), primary: true }
                ]}
              >
                <BarChartComponent
                  data={data.internshipData}
                  gradientColors={['#8B5CF6', '#7C3AED']}
                  borderRadius={8}
                />
              </ChartCard>
            </div>

            {/* Growth Trend Line Chart */}
            <div className="mb-8">
              <ChartCard
                title="Internship Growth Trend"
                subtitle="Weekly internship posting trends"
                gradient="green"
                footerActions={[
                  { label: 'View Details', onClick: () => console.log('View details') },
                  { label: 'Download', onClick: () => handleExport('csv'), primary: true }
                ]}
              >
                <LineChartComponent
                  data={data.growthData}
                  gradientColors={['#10B981', '#059669']}
                  strokeWidth={3}
                  curveType="monotone"
                />
              </ChartCard>
            </div>

            {/* Recent Activity Table */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-4">
                <h3 className="text-lg font-semibold text-white">Recent NOC Applications</h3>
                <p className="text-sm text-white/80 mt-1">Latest student applications and their status</p>
              </div>
              
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
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {[
                      { name: 'John Doe', company: 'Tech Corp', status: 'Approved', date: '2024-03-15' },
                      { name: 'Jane Smith', company: 'StartupXYZ', status: 'Pending', date: '2024-03-14' },
                      { name: 'Mike Johnson', company: 'Innovation Labs', status: 'Approved', date: '2024-03-13' },
                    ].map((row, index) => (
                      <tr key={index} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {row.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {row.company}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            row.status === 'Approved' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {row.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {row.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          <button className="text-blue-600 hover:text-blue-900 font-medium">
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
    </div>
  );
};

export default ReportsAnalytics;
