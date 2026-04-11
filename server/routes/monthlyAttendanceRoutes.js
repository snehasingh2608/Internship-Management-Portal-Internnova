const express = require("express");
const router = express.Router();
const { getAllAttendance } = require("../controllers/monthlyAttendanceController");

router.get("/", getAllAttendance);

module.exports = router;
