import React from 'react';
import Button from './Button';
import { BriefcaseIcon, PlusIcon } from '@heroicons/react/24/outline';

const ActiveListings = ({ internships = [], onPostInternship }) => {
  if (internships.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <BriefcaseIcon className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No internships posted yet</h3>
        <p className="text-gray-600 mb-6">Start by posting your first internship opportunity</p>
        <Button
          variant="primary"
          onClick={onPostInternship}
          className="inline-flex items-center"
        >
          <PlusIcon className="w-4 h-4 mr-2" />
          Post Internship
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Active Listings</h3>
        <Button
          variant="primary"
          size="sm"
          onClick={onPostInternship}
        >
          <PlusIcon className="w-4 h-4 mr-1" />
          Add New
        </Button>
      </div>

      <div className="space-y-4">
        {internships.map((internship) => (
          <div key={internship.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 mb-1">{internship.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{internship.company}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>📍 {internship.location || 'Remote'}</span>
                  <span>💰 ${internship.stipend || 'Competitive'}</span>
                  <span>⏰ {internship.duration || 'Flexible'}</span>
                </div>
              </div>
              <div className="flex flex-col items-end space-y-2">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  internship.status === 'active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {internship.status || 'Active'}
                </span>
                <div className="text-xs text-gray-500">
                  {internship.applicants || 0} applicants
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {internships.length > 0 && (
        <div className="mt-6 text-center">
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            View all internships →
          </button>
        </div>
      )}
    </div>
  );
};

export default ActiveListings;
