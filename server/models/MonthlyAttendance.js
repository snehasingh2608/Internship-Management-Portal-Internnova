const mongoose = require("mongoose");

const monthlyAttendanceSchema = new mongoose.Schema(
  {
    studentName: { type: String, required: true },
    studentId: { type: String, required: true }, // e.g., "22103"
    department: { type: String, required: true }, // e.g., "CSE"
    status: {
      type: String,
      enum: ["Submitted", "Not Submitted"],
      default: "Not Submitted",
    },
    month: { type: String, required: true }, // e.g., "Apr", "May"
  },
  { timestamps: true }
);

module.exports = mongoose.model("MonthlyAttendance", monthlyAttendanceSchema);
