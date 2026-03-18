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
} = require("../controllers/nocRequestController");
const { protect, adminOnly, facultyOnly, studentOnly } = require("../middleware/authMiddleware");

router.post("/", protect, studentOnly, upload.single("offerLetter"), createNOC);
router.get("/my", protect, studentOnly, getMyRequests);
router.get("/pending", protect, adminOnly, getPending);
router.get("/", protect, getAll); // Let faculty and admin see all.
router.put("/faculty-approve/:id", protect, facultyOnly, facultyApprove);
router.put("/admin-approve/:id", protect, adminOnly, approve);
router.put("/reject/:id", protect, reject); // Allow both admin and faculty to reject
// Keep the old ones just in case the frontend relies on them elsewhere temporarily
router.put("/:id/approve", protect, adminOnly, approve);
router.put("/:id/reject", protect, adminOnly, reject);

module.exports = router;
