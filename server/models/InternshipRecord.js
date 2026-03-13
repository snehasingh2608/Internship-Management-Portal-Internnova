const mongoose = require("mongoose");

// Minimal schema for analytics on the internshipRecords collection.
// The collection name is fixed to match the existing MongoDB collection.
const internshipRecordSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    internship: { type: mongoose.Schema.Types.ObjectId, ref: "Internship" },
    // Field used by Faculty Reports analytics (matches existing collection)
    placement_internshi_p_ppo: {
      type: String,
      enum: ["Placement", "Internship", "Internship+PPO"],
    },
    status: {
      type: String,
      enum: ["Applied", "In Progress", "Completed", "Placed", "Rejected"],
      default: "In Progress",
    },
    ppo: {
      type: Boolean,
      default: false,
    },
    nocStatus: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
    collection: "internshipRecords",
  }
);

const InternshipRecord = mongoose.model("InternshipRecord", internshipRecordSchema);

module.exports = InternshipRecord;

