import React from "react";
import CommonSidebar from "./CommonSidebar";

const StudentLayout = ({ children }) => {
  return (
    <div className="flex h-screen">
      
      {/* Sidebar */}
      <CommonSidebar role="student" />

      {/* Main Section */}
      <div className="flex-1 overflow-y-auto">
        {/* Page Content */}
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default StudentLayout;