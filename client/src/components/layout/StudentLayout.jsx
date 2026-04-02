import React from 'react';
import CommonSidebar from '../../layout/CommonSidebar';
import Header from '../ui/Header';

const StudentLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <CommonSidebar role="student" />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-6 md:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentLayout;
