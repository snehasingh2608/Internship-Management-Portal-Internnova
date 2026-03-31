import React from 'react';
import AttendanceDistribution from './AttendanceDistribution';

// Demo data showing different attendance scenarios
const demoData = [
  { name: "Alice Johnson", attendance: 92 },
  { name: "Bob Smith", attendance: 78 },
  { name: "Charlie Brown", attendance: 65 },
  { name: "Diana Prince", attendance: 45 },
  { name: "Edward Norton", attendance: 88 },
  { name: "Fiona Apple", attendance: 52 },
  { name: "George Miller", attendance: 71 },
  { name: "Helen Troy", attendance: 38 },
  { name: "Ian McKellen", attendance: 95 },
  { name: "Julia Roberts", attendance: 67 },
  { name: "Kevin Hart", attendance: 42 },
  { name: "Laura Palmer", attendance: 83 },
  { name: "Michael Jordan", attendance: 76 },
  { name: "Nina Williams", attendance: 58 },
  { name: "Oscar Wilde", attendance: 91 }
];

const AttendanceDistributionDemo = () => {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Attendance Distribution Demo</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Example 1: Full dataset */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Example 1: Full Dataset</h3>
          <AttendanceDistribution 
            students={demoData}
            title="Class Attendance Overview"
          />
        </div>

        {/* Example 2: Poor attendance dataset */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Example 2: Needs Attention</h3>
          <AttendanceDistribution 
            students={[
              { name: "Student A", attendance: 45 },
              { name: "Student B", attendance: 38 },
              { name: "Student C", attendance: 52 },
              { name: "Student D", attendance: 41 },
              { name: "Student E", attendance: 48 }
            ]}
            title="At-Risk Students"
          />
        </div>

        {/* Example 3: Excellent attendance */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Example 3: Excellent Performance</h3>
          <AttendanceDistribution 
            students={[
              { name: "Student A", attendance: 95 },
              { name: "Student B", attendance: 88 },
              { name: "Student C", attendance: 92 },
              { name: "Student D", attendance: 87 },
              { name: "Student E", attendance: 91 }
            ]}
            title="High Performers"
          />
        </div>

        {/* Example 4: Empty state */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Example 4: Empty State</h3>
          <AttendanceDistribution 
            students={[]}
            title="No Data Available"
          />
        </div>
      </div>

      {/* Usage Instructions */}
      <div className="mt-8 p-6 bg-blue-50 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-900 mb-4">How to Use</h3>
        <div className="bg-blue-900 text-blue-100 p-4 rounded-lg overflow-x-auto">
          <pre>{`import AttendanceDistribution from './components/charts/AttendanceDistribution';

// Basic usage
<AttendanceDistribution students={studentsData} />

// With custom title
<AttendanceDistribution 
  students={studentsData} 
  title="Class Attendance Overview" 
/>

// Data format expected:
const studentsData = [
  { name: "Student Name", attendance: 82 },
  { name: "Another Student", attendance: 45 },
  // ... more students
];`}</pre>
        </div>
      </div>
    </div>
  );
};

export default AttendanceDistributionDemo;
