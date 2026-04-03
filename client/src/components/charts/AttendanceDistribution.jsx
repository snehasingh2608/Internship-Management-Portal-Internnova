import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { UserGroupIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

const AttendanceDistribution = ({ students = [], chartData, title = "Attendance Distribution" }) => {
  // Calculate attendance distribution
  const distributionData = useMemo(() => {
    if (!students || students.length === 0) {
      return [];
    }

    if (chartData) {
      const total = (chartData.present || 0) + (chartData.partial || 0) + (chartData.absent || 0) || 1;
      return [
        { name: 'Present (Both Months)', value: chartData.present || 0, percentage: Math.round(((chartData.present||0)/total)*100), color: '#10B981' },
        { name: 'Partial (One Month)', value: chartData.partial || 0, percentage: Math.round(((chartData.partial||0)/total)*100), color: '#F59E0B' },
        { name: 'Absent (Neither)', value: chartData.absent || 0, percentage: Math.round(((chartData.absent||0)/total)*100), color: '#EF4444' }
      ].filter(c => c.value > 0);
    }

    // Categorize students based on attendance percentage
    const categories = {
      high: { count: 0, label: 'High Attendance (>75%)', color: '#22c55e' },
      medium: { count: 0, label: 'Medium Attendance (50-75%)', color: '#facc15' },
      low: { count: 0, label: 'Low Attendance (<50%)', color: '#ef4444' }
    };

    students.forEach(student => {
      const attendance = student.attendance || 0;
      
      if (attendance > 75) {
        categories.high.count++;
      } else if (attendance >= 50) {
        categories.medium.count++;
      } else {
        categories.low.count++;
      }
    });

    // Convert to chart data format
    return Object.values(categories)
      .filter(category => category.count > 0)
      .map(category => ({
        name: category.label,
        value: category.count,
        percentage: Math.round((category.count / students.length) * 100),
        color: category.color
      }));
  }, [students, chartData]);

  // Custom label for pie chart
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percentage }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    if (percentage < 5) return null; // Don't show label for very small segments

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        className="text-sm font-semibold"
      >
        {`${percentage}%`}
      </text>
    );
  };

  // Custom tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
          <p className="font-medium text-gray-900">{data.name}</p>
          <p className="text-sm text-gray-600">Students: {data.value}</p>
          <p className="text-sm text-gray-600">Percentage: {data.percentage}%</p>
        </div>
      );
    }
    return null;
  };

  // Custom legend
  const renderLegend = (props) => {
    const { payload } = props;
    
    return (
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {payload.map((entry, index) => (
          <div key={`item-${index}`} className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sm text-gray-700">
              {entry.value} {entry.payload.name}
            </span>
          </div>
        ))}
      </div>
    );
  };

  // Empty state
  if (!students || students.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
        <div className="flex flex-col items-center justify-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <ExclamationTriangleIcon className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-gray-500 text-center">No attendance data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <div className="flex items-center text-sm text-gray-500">
          <UserGroupIcon className="w-4 h-4 mr-1" />
          {students.length} Students
        </div>
      </div>

      {/* Chart Container */}
      <div className="relative">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={distributionData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {distributionData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend content={renderLegend} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Summary Statistics */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="grid grid-cols-3 gap-4">
          {distributionData.map((category, index) => (
            <div key={index} className="text-center">
              <div 
                className="w-4 h-4 rounded-full mx-auto mb-2"
                style={{ backgroundColor: category.color }}
              />
              <p className="text-2xl font-bold text-gray-900">{category.value}</p>
              <p className="text-xs text-gray-500">{category.name.split('(')[0].trim()}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Insights */}
      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Key Insights</h4>
        <div className="space-y-1">
          {distributionData.find(d => d.name.includes('Low')) && (
            <p className="text-xs text-gray-600">
              🚨 {distributionData.find(d => d.name.includes('Low')).value} students need attention 
              ({distributionData.find(d => d.name.includes('Low')).percentage}%)
            </p>
          )}
          {distributionData.find(d => d.name.includes('High')) && (
            <p className="text-xs text-gray-600">
              ✅ {distributionData.find(d => d.name.includes('High')).value} students performing well 
              ({distributionData.find(d => d.name.includes('High')).percentage}%)
            </p>
          )}
          {distributionData.length === 1 && distributionData[0].name.includes('High') && (
            <p className="text-xs text-green-600">
              🎉 Excellent! All students have high attendance
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AttendanceDistribution;
