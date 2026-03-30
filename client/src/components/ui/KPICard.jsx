import React from 'react';
import { TrendingUpIcon, TrendingDownIcon, MinusIcon } from '@heroicons/react/24/outline';

const KPICard = ({ 
  title, 
  value, 
  icon, 
  trend, 
  trendDirection = 'up',
  color = 'blue',
  subtitle,
  className = ''
}) => {
  const colorSchemes = {
    blue: {
      bg: 'bg-blue-50',
      icon: 'text-blue-600',
      border: 'border-blue-200',
      gradient: 'from-blue-500 to-blue-600'
    },
    green: {
      bg: 'bg-green-50',
      icon: 'text-green-600',
      border: 'border-green-200',
      gradient: 'from-green-500 to-green-600'
    },
    purple: {
      bg: 'bg-purple-50',
      icon: 'text-purple-600',
      border: 'border-purple-200',
      gradient: 'from-purple-500 to-purple-600'
    },
    orange: {
      bg: 'bg-orange-50',
      icon: 'text-orange-600',
      border: 'border-orange-200',
      gradient: 'from-orange-500 to-orange-600'
    },
    pink: {
      bg: 'bg-pink-50',
      icon: 'text-pink-600',
      border: 'border-pink-200',
      gradient: 'from-pink-500 to-pink-600'
    }
  };

  const colors = colorSchemes[color] || colorSchemes.blue;

  const getTrendIcon = () => {
    if (trendDirection === 'up') return <TrendingUpIcon className="w-4 h-4" />;
    if (trendDirection === 'down') return <TrendingDownIcon className="w-4 h-4" />;
    return <MinusIcon className="w-4 h-4" />;
  };

  const getTrendColor = () => {
    if (trendDirection === 'up') return 'text-green-600 bg-green-50';
    if (trendDirection === 'down') return 'text-red-600 bg-red-50';
    return 'text-gray-600 bg-gray-50';
  };

  return (
    <div className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border ${colors.border} ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-xl ${colors.bg}`}>
          <div className={`w-6 h-6 ${colors.icon}`}>
            {icon}
          </div>
        </div>
        {trend && (
          <div className={`flex items-center space-x-1 px-2 py-1 rounded-lg text-xs font-medium ${getTrendColor()}`}>
            {getTrendIcon()}
            <span>{trend}</span>
          </div>
        )}
      </div>
      
      <div>
        <p className="text-2xl font-bold text-gray-900 mb-1">{value}</p>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        {subtitle && (
          <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
        )}
      </div>
    </div>
  );
};

export default KPICard;
