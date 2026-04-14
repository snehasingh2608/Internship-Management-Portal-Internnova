import React, { useState, useEffect } from "react";
import { nocAPI } from "../../api/api";
import Navbar from '../../layout/Navbar';
import Sidebar from '../../layout/Sidebar';

const BASE_URL = process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL.replace('/api', '') : 'https://internnova-backend.onrender.com';

const NOCApprovalAdmin = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const res = await nocAPI.getAll();
      // Filter for only faculty_approved requests as per requirements
      const facultyApprovedRequests = res.data.filter(req => req.approvalStatus === "faculty_approved");
      setRequests(facultyApprovedRequests);
    } catch (err) {
      setError("Failed to fetch NOC requests.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleFinalApprove = async (id) => {
    if (!window.confirm("Grant final approval for this NOC request?")) return;
    try {
      await nocAPI.adminApprove(id);
      fetchRequests();
    } catch (err) {
      alert("Failed to grant final approval");
      console.error(err);
    }
  };

  const handleReject = async (id) => {
    const remarks = window.prompt("Enter rejection remarks (optional):");
    if (remarks === null) return;
    try {
      await nocAPI.reject(id, remarks);
      fetchRequests();
    } catch (err) {
      alert("Failed to reject NOC request");
      console.error(err);
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      pending: "bg-yellow-100 text-yellow-800",
      faculty_approved: "bg-blue-100 text-blue-800",
      approved: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800",
    };
    return (
      <span className={`px-2 py-1 rounded text-xs font-medium uppercase ${styles[status] || "bg-gray-100 text-gray-800"}`}>
        {status.replace("_", " ")}
      </span>
    );
  };

  if (loading) return <div className="p-6">Loading NOC Requests...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar role="admin" />
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Admin NOC Final Approval</h1>
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Details</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company & Domain</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stipend & Duration</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">HR Info</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Offer Letter</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {requests.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center text-gray-500">No pending faculty approved NOC requests found.</td>
                </tr>
              ) : (
                requests.map((req) => (
                  <tr key={req._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{req.studentId?.name || req.studentName}</div>
                      <div className="text-sm text-gray-500">{req.rollNumber}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{req.companyName}</div>
                      <div className="text-sm text-gray-500">{req.domain}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{req.stipendType !== "unpaid" ? `₹${req.stipend}` : "Unpaid"}</div>
                      <div className="text-sm text-gray-500">{req.duration}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{req.hrName}</div>
                      <div className="text-sm text-gray-500 text-xs">Ph: {req.hrPhone || 'N/A'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {req.offerLetterUrl ? (
                         <a href={`${BASE_URL}${req.offerLetterUrl}`} target="_blank" rel="noreferrer" className="text-indigo-600 hover:text-indigo-900 text-sm">
                           View Offer Letter
                         </a>
                      ) : (
                        <span className="text-gray-400 text-sm">No Letter</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(req.approvalStatus)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                      {req.approvalStatus === "faculty_approved" && (
                        <div className="flex justify-center space-x-2">
                          <button
                            onClick={() => handleFinalApprove(req._id)}
                            className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-xs"
                            title="Final Approve"
                          >
                            Final Approve
                          </button>
                          <button
                            onClick={() => handleReject(req._id)}
                            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-xs"
                            title="Reject"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default NOCApprovalAdmin;
