const mongoose = require("mongoose");

const internshipRecordSchema = new mongoose.Schema(
  {
    student_name: String,
    roll_number: Number,
    program: String,
    semester: String,

    name_of_the_organization_from_where_internship_is_done: String,
    internship_duration: String,

    placement_internshi_p_ppo: String,

    noc: String,
    offer_letter: String,
    undertaking: String,

    attend_ance_jan: String,
    attend_ance_feb: String,

    salary_proof: String,
    remarks: String,
  },
  {
    timestamps: true,
    collection: "internshipRecords",
  }
);

module.exports = mongoose.model("InternshipRecord", internshipRecordSchema);