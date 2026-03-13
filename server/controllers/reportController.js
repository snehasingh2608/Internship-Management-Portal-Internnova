const InternshipRecord = require("../models/InternshipRecord");

exports.getInternshipAnalytics = async (req, res) => {
  try {
    const totalRecords = await InternshipRecord.countDocuments();
    const placements = await InternshipRecord.countDocuments({
      placement_internshi_p_ppo: "Placement",
    });
    const internships = await InternshipRecord.countDocuments({
      placement_internshi_p_ppo: "Internship",
    });
    const internshipPPO = await InternshipRecord.countDocuments({
      placement_internshi_p_ppo: "Internship+PPO",
    });

    const placementRate =
      totalRecords === 0 ? 0 : ((placements + internshipPPO) / totalRecords) * 100;

    return res.json({
      totalRecords,
      placements,
      internships,
      internshipPPO,
      placementRate,
    });
  } catch (err) {
    console.error("Error computing internship analytics:", err);
    res.status(500).json({ message: "Failed to load internship analytics" });
  }
};

