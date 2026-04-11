import React from 'react';

const Card = ({ children, className = '', padding = 'p-6', shadow = 'shadow-sm', hover = false }) => {
  return (
    <div 
      className={`bg-white rounded-2xl ${shadow} ${padding} ${hover ? 'hover:shadow-md hover:scale-[1.02] transition-all duration-200' : ''} ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
