import React from 'react';

const FilterButton = ({ 
  label, 
  isActive = false, 
  onClick, 
  icon,
  variant = 'default'
}) => {
  const baseClasses = 'px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 flex items-center space-x-2';
  
  const variants = {
    default: isActive 
      ? 'bg-blue-600 text-white shadow-lg transform scale-105' 
      : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
    outline: isActive 
      ? 'border-2 border-blue-600 text-blue-600 bg-blue-50' 
      : 'border-2 border-gray-300 text-gray-600 hover:border-gray-400',
    ghost: isActive 
      ? 'text-blue-600 bg-blue-50' 
      : 'text-gray-600 hover:bg-gray-100'
  };

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variants[variant]}`}
    >
      {icon && <span className="w-4 h-4">{icon}</span>}
      <span>{label}</span>
    </button>
  );
};

export default FilterButton;
