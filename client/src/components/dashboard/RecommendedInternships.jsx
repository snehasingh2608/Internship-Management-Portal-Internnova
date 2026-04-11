import React from 'react';
import { BuildingOfficeIcon, MapPinIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';

const RecommendedInternships = ({ internships }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
      <div className="p-6 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900">Recommended Internships</h3>
        <p className="text-sm text-gray-600 mt-1">Based on your profile and preferences</p>
      </div>
      
      <div className="p-6 space-y-4">
        {internships.map((internship, index) => (
          <div 
            key={index}
            className="border border-gray-100 rounded-xl p-4 hover:border-blue-200 hover:shadow-sm transition-all duration-200"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 mb-1">{internship.role}</h4>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <BuildingOfficeIcon className="w-4 h-4" />
                  <span>{internship.company}</span>
                </div>
              </div>
              <span className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-full">
                {internship.type}
              </span>
            </div>
            
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
              {internship.description}
            </p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <MapPinIcon className="w-3 h-3" />
                  <span>{internship.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <CurrencyDollarIcon className="w-3 h-3" />
                  <span>{internship.stipend}</span>
                </div>
              </div>
              
              <button className="text-sm font-medium text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1 rounded-lg transition-colors duration-150">
                Apply Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedInternships;
