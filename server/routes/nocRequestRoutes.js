const express = require("express");
const router = express.Router();
const upload = require("../config/upload");
const {
  create: createNOC,
  getPending,
  getMyRequests,
  approve,
  facultyApprove,
  reject,
  getAll,
  updateStatus,
} = require("../controllers/nocRequestController");
const { protect, adminOnly, facultyOnly, studentOnly } = require("../middleware/authMiddleware");

router.post("/", protect, studentOnly, upload.single("offerLetter"), createNOC);
router.get("/my", protect, studentOnly, getMyRequests);
router.get("/pending", protect, facultyOnly, getPending);
router.get("/", protect, getAll); // Let faculty and admin see all.
router.put("/faculty-approve/:id", protect, facultyOnly, facultyApprove);
router.put("/admin-approve/:id", protect, facultyOnly, approve);
router.put("/reject/:id", protect, reject); // Allow both admin and faculty to reject
// Keep the old ones just in case the frontend relies on them elsewhere temporarily
router.put("/:id/approve", protect, facultyOnly, approve);
router.put("/:id/reject", protect, facultyOnly, reject);
router.patch("/:id/status", protect, facultyOnly, updateStatus);

module.exports = router;
