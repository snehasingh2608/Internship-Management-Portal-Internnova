const Internship = require("../models/Internship");
const Application = require("../models/Application");
const NOCRequest = require("../models/NOCRequest");
const User = require("../models/User");

exports.getMetrics = async (req, res) => {
  try {
    const [
      activeInternships,
      totalApplicants,
      pendingNOCs,
      approvedInternships,
      activeStudents
    ] = await Promise.all([
      Internship.countDocuments({ status: "active" }),
      Application.countDocuments({}),
      NOCRequest.countDocuments({ approvalStatus: "pending" }),
      NOCRequest.countDocuments({ approvalStatus: "approved" }),
      User.countDocuments({ role: "student" })
    ]);

    res.json({
      activeInternships,
      totalApplicants,
      pendingNOCs,
      approvedInternships,
      activeStudents
    });
  } catch (error) {
    console.error("Dashboard metrics error:", error);
    res.status(500).json({ message: "Server error fetching dashboard metrics" });
  }
};

exports.getRecentActivity = async (req, res) => {
  try {
    const nocs = await NOCRequest.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("studentId", "name");

    const apps = await Application.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("studentId", "name")
      .populate("internshipId", "title");

    const combined = [];
    
    for (const noc of nocs) {
      if (!noc.studentId) continue;
      combined.push({
        type: "approval",
        message: `NOC request (${noc.approvalStatus}) by ${noc.studentId.name}`,
        time: noc.createdAt
      });
    }

    for (const app of apps) {
      if (!app.studentId || !app.internshipId) continue;
      combined.push({
        type: "application",
        message: `${app.studentId.name} applied for ${app.internshipId.title}`,
        time: app.createdAt
      });
    }

    combined.sort((a, b) => new Date(b.time) - new Date(a.time));

    res.json(combined.slice(0, 5));
  } catch (err) {
    console.error("Dashboard recent activity error:", err);
    res.status(500).json({ message: "Server error fetching recent activity" });
  }
};
