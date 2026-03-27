const express = require("express");
const router = express.Router();
const { getAnalytics } = require("../controllers/analyticsController");
// const { protect, facultyOnly } = require("../middleware/authMiddleware");

// GET /api/internship-analytics
// In production, you would protect this route, e.g., router.get("/internship-analytics", protect, facultyOnly, getAnalytics);
// For the sake of the user's example, we'll expose it or assume middleware is added later if they want it.
router.get("/internship-analytics", getAnalytics);

module.exports = router;
