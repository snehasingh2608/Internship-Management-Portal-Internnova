import React from 'react';

const LoadingSkeleton = ({ className = '', lines = 3 }) => {
  return (
    <div className={`animate-pulse ${className}`}>
      {[...Array(lines)].map((_, index) => (
        <div
          key={index}
          className="bg-gray-200 rounded-lg h-4 mb-2 last:mb-0"
          style={{
            width: index === lines - 1 ? '60%' : '100%',
          }}
        />
      ))}
    </div>
  );
};

export const CardSkeleton = ({ height = 'h-32' }) => (
  <div className={`animate-pulse bg-gray-200 rounded-2xl ${height}`} />
);

export const TableSkeleton = ({ rows = 5, columns = 4 }) => (
  <div className="animate-pulse">
    <div className="bg-gray-200 rounded-t-lg h-12 mb-2"></div>
    {[...Array(rows)].map((_, index) => (
      <div key={index} className="bg-gray-200 h-10 mb-2 last:mb-0"></div>
    ))}
  </div>
);

export const ChartSkeleton = ({ height = 'h-80' }) => (
  <div className={`animate-pulse bg-gray-200 rounded-2xl ${height}`} />
);

export default LoadingSkeleton;
