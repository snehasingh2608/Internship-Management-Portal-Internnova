import React from 'react';
import CommonSidebar from '../../layout/CommonSidebar';

const FacultyLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <CommonSidebar role="faculty" />
      <main className="flex-1 p-6 md:p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default FacultyLayout;
