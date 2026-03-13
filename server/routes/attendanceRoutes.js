const express = require("express");
const router = express.Router();
const {
  getStudentsWithInternships,
  getLogsByStudent,
  approve,
  getAllLogs,
  getInternshipAttendance,
} = require("../controllers/attendanceController");
const { protect, facultyOnly } = require("../middleware/authMiddleware");

router.get("/students", protect, facultyOnly, getStudentsWithInternships);
router.get("/", protect, facultyOnly, getAllLogs);
router.get("/logs/:studentId", protect, facultyOnly, getLogsByStudent);
router.put("/approve/:id", protect, facultyOnly, approve);
router.get("/internship-attendance", protect, facultyOnly, getInternshipAttendance);

module.exports = router;
