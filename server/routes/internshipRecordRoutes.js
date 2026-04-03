const express = require("express");
const router = express.Router();
const {
  getAnalytics,
  getAllStudents,
  searchStudents
} = require("../controllers/internshipRecordController");

// Important: Put /options & /search type routes BEFORE generic ones like /group or /:id
router.get("/internship-analytics", getAnalytics);
router.get("/students/search", searchStudents);
router.get("/students", getAllStudents);

module.exports = router;
