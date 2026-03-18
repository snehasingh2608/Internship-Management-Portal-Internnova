const mongoose = require("mongoose");

const nocRequestSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // denormalized student info for reporting
    studentName: { type: String, default: "" },
    rollNumber: { type: String, default: "" },
    companyName: { type: String, required: true },
    companyType: { type: String, default: "" },
    domain: { type: String, default: "" },
    location: { type: String, default: "" },
    stipendType: { type: String, default: "" },
    stipend: { type: String, default: "" },
    duration: { type: String, required: true },
    hrName: { type: String, default: "" },
    hrEmail: { type: String, default: "" },
    hrPhone: { type: String, default: "" },
    offerLetterUrl: { type: String, default: "" },
    approvalStatus: {
      type: String,
      enum: ["pending", "faculty_approved", "approved", "rejected"],
      default: "pending",
    },
    approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    approvedAt: { type: Date },
    remarks: { type: String, default: "" },
  },
  { timestamps: true }
);

const NOCRequest = mongoose.model("NOCRequest", nocRequestSchema);

module.exports = NOCRequest;
