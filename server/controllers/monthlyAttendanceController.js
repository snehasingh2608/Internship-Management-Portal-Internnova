const User = require("../models/User");
const AttendanceLog = require("../models/AttendanceLog");

exports.getAllAttendance = async (req, res) => {
  try {
    // 1. Fetch all true students from the User collection
    const students = await User.find({ role: "student" }).sort({ createdAt: -1 });

    // 2. Fetch recent attendance logs to determine status
    const logs = await AttendanceLog.find();

    // Group logs by studentId to check if they have submitted something recently
    const submittedStudentIds = new Set(logs.map(log => log.studentId.toString()));

    const currentMonth = new Date().toLocaleString('default', { month: 'short' }); // e.g. "Apr"

    // 3. Map students into the format the dashboard expects
    const records = students.map(student => {
      // Determine status based on actual log existence
      const isSubmitted = submittedStudentIds.has(student._id.toString());
      
      return {
        studentId: student._id.toString().substring(0, 6).toUpperCase(), // Short visual ID
        studentName: student.name,
        department: student.department || "General",
        status: isSubmitted ? "Submitted" : "Not Submitted",
        month: currentMonth
      };
    });

    res.status(200).json(records);
  } catch (error) {
    console.error("Error in getAllAttendance:", error);
    res.status(500).json({ message: "Failed to fetch attendance records.", error: error.message });
  }
};
