const express = require("express");
const router = express.Router();
const { getInternshipAnalytics } = require("../controllers/reportController");
const { protect, facultyOnly } = require("../middleware/authMiddleware");

// GET /api/reports/internship-analytics
router.get("/internship-analytics", protect, facultyOnly, getInternshipAnalytics);

module.exports = router;

