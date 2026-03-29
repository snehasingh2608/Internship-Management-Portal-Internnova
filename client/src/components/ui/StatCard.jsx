import React from 'react';
import Card from './Card';

const StatCard = ({ 
  title, 
  value, 
  icon, 
  trend, 
  trendDirection = 'up',
  color = 'blue',
  onClick 
}) => {
  const colorClasses = {
    blue: 'text-blue-600 bg-blue-50',
    green: 'text-green-600 bg-green-50',
    yellow: 'text-yellow-600 bg-yellow-50',
    red: 'text-red-600 bg-red-50',
    purple: 'text-purple-600 bg-purple-50',
  };

  const trendColors = {
    up: 'text-green-600',
    down: 'text-red-600',
    neutral: 'text-gray-600',
  };

  return (
    <Card 
      className={`cursor-pointer hover:shadow-md transition-shadow duration-200 ${onClick ? 'hover:bg-gray-50' : ''}`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {trend && (
            <div className="flex items-center mt-2">
              <span className={`text-sm font-medium ${trendColors[trendDirection]}`}>
                {trendDirection === 'up' && '↑'}
                {trendDirection === 'down' && '↓'}
                {trendDirection === 'neutral' && '→'}
                {' '}{trend}
              </span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          {icon}
        </div>
      </div>
    </Card>
  );
};

export default StatCard;
