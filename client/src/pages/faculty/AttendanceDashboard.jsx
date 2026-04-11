import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { FiCheckCircle, FiAlertCircle, FiUsers, FiSearch, FiDownload, FiEye } from "react-icons/fi";
import CommonSidebar from "../../layout/CommonSidebar"; 
import api from "../../api/api"; 

const AttendanceDashboard = () => {
  const [records, setRecords] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // 1. Fetch Backend Data
  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const response = await api.get("/api/monthly-attendance");
        setRecords(response.data);
      } catch (error) {
        console.error("Error fetching attendance data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAttendance();
  }, []);

  // 2. Computed Values
  const totalStudents = records.length;
  const submittedCount = records.filter((r) => r.status === "Submitted").length;
  const pendingCount = totalStudents - submittedCount;
  const submittedPercentage = totalStudents ? Math.round((submittedCount / totalStudents) * 100) : 0;
  const pendingPercentage = totalStudents ? Math.round((pendingCount / totalStudents) * 100) : 0;

  // 3. Search Filter
  const filteredRecords = records.filter(
    (r) =>
      r.studentName?.toLowerCase().includes(search.toLowerCase()) ||
      r.studentId?.includes(search)
  );

  // 4. Chart Data Generation
  const pieData = [
    { name: "Submitted", value: submittedCount || 1, color: "#10b981" }, // Emerald 500
    { name: "Not Submitted", value: pendingCount || 1, color: "#f43f5e" } // Rose 500
  ];

  const monthlyMap = records.reduce((acc, curr) => {
    if (curr.status === "Submitted") {
      acc[curr.month] = (acc[curr.month] || 0) + 1;
    }
    return acc;
  }, {});

  const monthList = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const barData = monthList
    .filter(m => (monthlyMap[m] !== undefined || m==="Apr")) 
    .map(month => ({ name: month, Submissions: monthlyMap[month] || 0 }));

  if (loading) {
     return (
       <div className="min-h-screen bg-gray-50 flex">
         <CommonSidebar role="faculty" />
         <main className="flex-1 p-6 md:p-8 flex items-center justify-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
         </main>
       </div>
     );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <CommonSidebar role="faculty" />
      <main className="flex-1 p-6 md:p-8 overflow-y-auto font-sans">
        
        {/* Header Options */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
           <div>
             <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Overview</h1>
             <p className="text-sm text-gray-500 mt-1">Track and manage student monthly submissions.</p>
           </div>
           <button className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition shadow-sm">
              <FiDownload size={16} /> Export Report
           </button>
        </div>

        {/* 1. Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center gap-5 transition hover:shadow-md">
            <div className="p-3.5 bg-indigo-50 text-indigo-600 rounded-xl"><FiUsers size={24} /></div>
            <div>
              <p className="text-sm text-gray-500 font-semibold mb-1 tracking-wide uppercase">Total Students</p>
              <h3 className="text-2xl font-extrabold text-gray-900">{totalStudents}</h3>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center gap-5 transition hover:shadow-md">
            <div className="p-3.5 bg-emerald-50 text-emerald-600 rounded-xl"><FiCheckCircle size={24} /></div>
            <div>
              <p className="text-sm text-gray-500 font-semibold mb-1 tracking-wide uppercase">Submitted</p>
              <div className="flex items-baseline gap-2">
                <h3 className="text-2xl font-extrabold text-gray-900">{submittedCount}</h3>
                <span className="text-xs text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full">{submittedPercentage}% completed</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center gap-5 transition hover:shadow-md">
            <div className="p-3.5 bg-rose-50 text-rose-600 rounded-xl"><FiAlertCircle size={24} /></div>
            <div>
              <p className="text-sm text-gray-500 font-semibold mb-1 tracking-wide uppercase">Pending</p>
              <div className="flex items-baseline gap-2">
                <h3 className="text-2xl font-extrabold text-gray-900">{pendingCount}</h3>
                <span className="text-xs text-rose-600 font-semibold bg-rose-50 px-2 py-0.5 rounded-full">{pendingPercentage}% incomplete</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* 2. Left Side: Data Table */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
            <div className="p-6 border-b border-gray-100">
                <h2 className="text-lg font-bold text-gray-900 mb-6 tracking-tight">Submission Tracking</h2>
                
                {/* Search Bar */}
                <div className="flex gap-2">
                <div className="relative flex-1">
                    <FiSearch className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                    type="text"
                    placeholder="Enter Name or Student ID..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm bg-gray-50/50 outline-none focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100 transition"
                    />
                </div>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto flex-1">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="bg-gray-50/80 text-gray-500 text-xs uppercase tracking-wider">
                    <th className="px-6 py-4 font-semibold w-24">ID</th>
                    <th className="px-6 py-4 font-semibold">Student Name</th>
                    <th className="px-6 py-4 font-semibold">Class</th>
                    <th className="px-6 py-4 font-semibold">Status</th>
                    <th className="px-6 py-4 font-semibold text-center w-28">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {filteredRecords.length > 0 ? filteredRecords.map((record, index) => (
                    <tr key={index} className="border-t border-gray-100 hover:bg-gray-50/50 transition">
                      <td className="px-6 py-4 font-bold text-gray-900">{record.studentId}</td>
                      <td className="px-6 py-4 text-gray-700 font-medium">{record.studentName}</td>
                      <td className="px-6 py-4 text-gray-500">{record.department}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-md text-xs font-bold inline-flex ${
                          record.status === "Submitted" ? "bg-emerald-100 text-emerald-700 border border-emerald-200" : "bg-rose-100 text-rose-700 border border-rose-200"
                        }`}>
                          {record.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button className="text-white hover:text-white bg-indigo-500 hover:bg-indigo-600 px-3 py-1.5 rounded-md text-xs font-bold flex items-center justify-center mx-auto transition">
                           View
                        </button>
                      </td>
                    </tr>
                  )) : (
                     <tr>
                        <td colSpan="5" className="text-center py-10 text-gray-500 font-medium tracking-wide">No records found matching your search.</td>
                     </tr>
                  )}
                </tbody>
              </table>
            </div>
            {/* Pagination Placeholder */}
            <div className="p-4 border-t border-gray-100 bg-gray-50/50 text-xs text-gray-500 flex justify-between items-center">
                <span>Showing 1 to {filteredRecords.length} of {filteredRecords.length} results</span>
            </div>
          </div>

          {/* 3. Right Side: Analytics Charts */}
          <div className="flex flex-col gap-8">
            
            {/* Pie Chart */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col min-h-[300px]">
              <h2 className="text-lg font-bold text-gray-900 mb-6 tracking-tight">Submission Overview</h2>
              <div className="flex-1 flex items-center justify-center relative">
                <ResponsiveContainer width="100%" height="100%" minHeight={180}>
                  <PieChart>
                    <Pie data={pieData} innerRadius={50} outerRadius={80} dataKey="value" stroke="none">
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              {/* Custom Legend */}
              <div className="flex justify-center gap-6 text-sm font-semibold text-gray-700 mt-4">
                 <div className="flex items-center gap-2"><div className="w-3.5 h-3.5 rounded-full bg-emerald-500 shadow-sm"></div> Submitted ({submittedPercentage}%)</div>
                 <div className="flex items-center gap-2"><div className="w-3.5 h-3.5 rounded-full bg-rose-500 shadow-sm"></div> Pending ({pendingPercentage}%)</div>
              </div>
            </div>

            {/* Bar Chart */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col min-h-[320px]">
              <h2 className="text-lg font-bold text-gray-900 mb-6 tracking-tight">Monthly Submissions</h2>
              <div className="flex-1">
                <ResponsiveContainer width="100%" height="100%" minHeight={200}>
                  <BarChart data={barData} margin={{ top: 10, right: 0, left: -25, bottom: 0 }}>
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: '#6b7280', fontWeight: 500 }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: '#6b7280', fontWeight: 500 }} />
                    <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)' }} />
                    <Bar dataKey="Submissions" fill="#6366f1" radius={[6, 6, 0, 0]} barSize={20} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default AttendanceDashboard;
