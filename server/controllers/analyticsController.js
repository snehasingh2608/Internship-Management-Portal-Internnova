const User = require("../models/User");
const Internship = require("../models/Internship");
const Application = require("../models/Application");
const NOCRequest = require("../models/NOCRequest");

exports.getAnalytics = async (req, res) => {
  try {
    // 1. Total Students
    const totalStudents = await User.countDocuments({ role: "student" });

    // 2. Total Internships
    const totalInternships = await Internship.countDocuments();

    // 3. Approved Internships (NOC Requests marked as 'approved')
    // We also could count accepted Applications, but NOC represents faculty/admin approval
    const approvedInternships = await NOCRequest.countDocuments({
      approvalStatus: "approved",
    });

    // 4. Pending Internships (NOC Requests marked as 'pending' or 'faculty_approved')
    const pendingInternships = await NOCRequest.countDocuments({
      approvalStatus: { $in: ["pending", "faculty_approved"] },
    });

    // 5. Monthly internship trends (Group internships by creation month)
    const monthlyTrends = await Internship.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // Map month numbers to month names
    const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    
    const formattedTrends = monthlyTrends.map((trend) => ({
      month: monthNames[trend._id - 1] || "Unknown",
      count: trend.count,
    }));

    return res.status(200).json({
      success: true,
      data: {
        totalStudents,
        totalInternships,
        approvedInternships,
        pendingInternships,
        monthlyTrends: formattedTrends,
      },
      message: "Analytics data fetched successfully",
    });
  } catch (err) {
    console.error("Error in getAnalytics:", err);
    res.status(500).json({ success: false, message: "Server error while fetching analytics" });
  }
};
