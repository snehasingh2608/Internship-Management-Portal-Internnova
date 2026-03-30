import React from 'react';
import Button from './Button';
import Badge from './Badge';
import { CheckCircleIcon, XCircleIcon, ClockIcon } from '@heroicons/react/24/outline';

const PendingActions = ({ pendingNOCs = [], onApprove, onReject }) => {
  if (pendingNOCs.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-l-green-500">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <CheckCircleIcon className="w-6 h-6 text-green-600" />
            <h3 className="text-lg font-semibold text-gray-900">All Clear!</h3>
          </div>
          <Badge variant="success">0 Pending</Badge>
        </div>
        <p className="text-gray-600">No pending NOC requests at the moment.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-l-yellow-500">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <ClockIcon className="w-6 h-6 text-yellow-600" />
          <h3 className="text-lg font-semibold text-gray-900">Pending Actions</h3>
        </div>
        <Badge variant="warning">{pendingNOCs.length} Pending</Badge>
      </div>

      <div className="space-y-4">
        {pendingNOCs.slice(0, 5).map((noc, index) => (
          <div key={noc.id || index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm">
                  {noc.studentName?.charAt(0) || 'S'}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{noc.studentName}</p>
                  <p className="text-sm text-gray-600">{noc.company}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 text-sm">
                <span className="text-gray-600">
                  ${noc.stipend || 0}/month
                </span>
                <Badge variant="warning" size="sm">
                  {noc.status || 'Pending'}
                </Badge>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 ml-4">
              <Button
                variant="success"
                size="sm"
                onClick={() => onApprove && onApprove(noc)}
              >
                <CheckCircleIcon className="w-4 h-4 mr-1" />
                Approve
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={() => onReject && onReject(noc)}
              >
                <XCircleIcon className="w-4 h-4 mr-1" />
                Reject
              </Button>
            </div>
          </div>
        ))}
      </div>

      {pendingNOCs.length > 5 && (
        <div className="mt-4 text-center">
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            View all {pendingNOCs.length} pending requests →
          </button>
        </div>
      )}
    </div>
  );
};

export default PendingActions;
