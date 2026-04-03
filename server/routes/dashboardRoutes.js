const express = require("express");
const router = express.Router();
const { getMetrics, getRecentActivity } = require("../controllers/dashboardController");
const { protect, facultyOnly } = require("../middleware/authMiddleware");

router.get("/metrics", protect, facultyOnly, getMetrics);
router.get("/recent-activity", protect, facultyOnly, getRecentActivity);

module.exports = router;
