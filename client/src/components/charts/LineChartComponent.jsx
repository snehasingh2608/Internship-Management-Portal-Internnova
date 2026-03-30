import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const LineChartComponent = ({ 
  data, 
  color = '#3B82F6',
  gradientColors = ['#3B82F6', '#1D4ED8'],
  strokeWidth = 3,
  showGrid = true,
  showTooltip = true,
  showDots = true,
  curveType = 'monotone'
}) => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
          <p className="text-sm font-medium text-gray-900">{label}</p>
          <p className="text-sm text-gray-600">{payload[0].value}</p>
        </div>
      );
    }
    return null;
  };

  const Gradient = ({ id, colors }) => (
    <defs>
      <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={colors[0]} stopOpacity={0.8} />
        <stop offset="100%" stopColor={colors[1]} stopOpacity={0.2} />
      </linearGradient>
    </defs>
  );

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <Gradient id="lineGradient" colors={gradientColors} />
        {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />}
        <XAxis 
          dataKey="name" 
          tick={{ fill: '#6B7280', fontSize: 12 }}
          axisLine={{ stroke: '#E5E7EB' }}
        />
        <YAxis 
          tick={{ fill: '#6B7280', fontSize: 12 }}
          axisLine={{ stroke: '#E5E7EB' }}
        />
        {showTooltip && <Tooltip content={<CustomTooltip />} />}
        <Line 
          type={curveType}
          dataKey="value" 
          stroke="url(#lineGradient)"
          strokeWidth={strokeWidth}
          dot={showDots ? { fill: color, strokeWidth: 2, r: 4 } : false}
          activeDot={{ r: 6, fill: color }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineChartComponent;
