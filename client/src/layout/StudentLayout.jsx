import React from "react";
// import Sidebar from "./SidebarNew";   // use your SidebarNew
import Navbar from "./Navbar";
import CommonSidebar from "./CommonSidebar";



const StudentLayout = ({ children }) => {
  return (
    <div className="flex h-screen">
      
      {/* Sidebar */}
      <CommonSidebar role="student" />

      {/* Main Section */}
      <div className="flex-1 flex flex-col">

        {/* Header */}
        <Navbar />

        {/* Page Content */}
        <div className="p-6 overflow-y-auto">
          {children}
        </div>

      </div>
    </div>
  );
};

export default StudentLayout;