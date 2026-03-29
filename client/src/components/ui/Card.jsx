import React from 'react';

const Card = ({ children, className = '', padding = 'p-6', shadow = 'shadow-sm' }) => {
  return (
    <div className={`bg-white rounded-lg ${shadow} ${padding} ${className}`}>
      {children}
    </div>
  );
};

export default Card;
