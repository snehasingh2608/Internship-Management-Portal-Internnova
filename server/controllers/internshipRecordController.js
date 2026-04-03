const InternshipRecord = require("../models/InternshipRecord");

// 1. GET /api/internship-analytics
exports.getAnalytics = async (req, res) => {
  try {
    const records = await InternshipRecord.find({});

    // Calculate basic stats
    const uniqueRollNumbers = new Set(records.map(record => record.roll_number));
    const totalStudents = uniqueRollNumbers.size;
    const completedInternships = records.length; // Per requirements (total records)
    
    let activeInternships = 0;
    let present = 0;
    let partial = 0;
    let absent = 0;

    records.forEach(record => {
      // Active internships logic
      if (record.noc === "Y") {
        activeInternships++;
      }

      // Attendance logic
      const jan = record.attend_ance_jan;
      const feb = record.attend_ance_feb;

      if (jan === "Y" && feb === "Y") {
        present++;
      } else if (jan !== "Y" && feb !== "Y") {
        absent++;
      } else {
        partial++;
      }
    });

    const lowAttendance = absent; // By requirement: both months not "Y"
    const inactiveInternships = completedInternships - activeInternships;

    res.status(200).json({
      success: true,
      data: {
        totalStudents,
        activeInternships,
        completedInternships,
        lowAttendance,
        attendanceChart: {
          present,
          partial,
          absent
        },
        internshipChart: {
          active: activeInternships,
          completed: completedInternships,
          inactive: inactiveInternships
        }
      }
    });
  } catch (error) {
    console.error("Error fetching analytics:", error);
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

// 2. GET /api/students
exports.getAllStudents = async (req, res) => {
  try {
    const students = await InternshipRecord.find().sort({ createdAt: -1 });
    
    res.status(200).json({ 
      success: true, 
      count: students.length, 
      data: students 
    });
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

// 3. GET /api/students/search?query=
exports.searchStudents = async (req, res) => {
  try {
    const { query } = req.query;
    
    if (!query) {
      return res.status(400).json({ success: false, message: "Search query is required" });
    }

    const students = await InternshipRecord.find({
      $or: [
        { student_name: { $regex: query, $options: "i" } },
        // Safely partial-match Number field by temporarily evaluating as string in the engine
        {
          $expr: {
            $regexMatch: {
              input: { $toString: "$roll_number" },
              regex: query,
              options: "i",
            },
          },
        },
      ],
    });

    res.status(200).json({ 
      success: true, 
      count: students.length, 
      data: students 
    });
  } catch (error) {
    console.error("Error searching students:", error);
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};
