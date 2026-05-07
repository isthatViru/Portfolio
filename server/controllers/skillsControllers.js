const Skills = require("../models/skillSchema");


// ✅ Add Skill
const addSkills = async (req, res) => {
  try {
    const { name, category, level } = req.body;

    if (!name || !category || !level) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const userId = req.user.id;

    const newSkill = await Skills.create({
      name,
      category,
      level,
      user: userId,
    });

    return res.status(201).json({
      success: true,
      message: "Skill added successfully",
      data: newSkill,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error adding skill",
      error: error.message,
    });
  }
};


// ✅ Get All Skills
const getAllSkills = async (req, res) => {
  try {
    const skills = await Skills.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: skills.length,
      data: skills,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching skills",
      error: error.message,
    });
  }
};


// ✅ Get Single Skill
const getSingleSkill = async (req, res) => {
  try {
    const skill = await Skills.findById(req.params.id)
      .populate("user", "name email");

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: "Skill not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: skill,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching skill",
      error: error.message,
    });
  }
};


// ✅ Get Logged-in User Skills
const getMySkills = async (req, res) => {
  try {
    const userId = req.user.id;

    const skill = await Skills.find({ user: userId })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: skill.length,
      data: skill,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching user skills",
      error: error.message,
    });
  }
};


// ✅ Get One Skill of Logged-in User
const getMySingleSkill = async (req, res) => {
  try {
    const userId = req.user.id;

    const skill = await Skills.findOne({ user: userId });

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: "Skill not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: skill,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching user skill",
      error: error.message,
    });
  }
};


// ✅ Update Skill
const updateSkill = async (req, res) => {
  try {
    const id = req.params.id;

    const { name, category, level } = req.body;

    // ✅ Find existing skill
    const skill = await Skills.findById(id);

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: "Skill not found",
      });
    }

    // ✅ Ownership check
    if (
      skill.user.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    // ✅ Update skill
    const updatedSkill = await Skills.findByIdAndUpdate(
      id,
      {
        name,
        category,
        level,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    return res.status(200).json({
      success: true,
      message: "Skill updated successfully",
      data: updatedSkill,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error updating skill",
      error: error.message,
    });
  }
};



// ✅ Delete Skill
const deleteSkill = async (req, res) => {
  try {
    const id = req.params.id;

    // ✅ Find skill
    const skill = await Skills.findById(id);

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: "Skill not found",
      });
    }

    // ✅ Ownership/Admin check
    if (
      skill.user.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    // ✅ Delete skill
    await skill.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Skill deleted successfully",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error deleting skill",
      error: error.message,
    });
  }
};

module.exports = {
  addSkills,
  getAllSkills,
  getSingleSkill,
  getMySkills,
  getMySingleSkill,
  updateSkill,
  deleteSkill,
};