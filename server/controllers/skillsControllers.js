const Skills = require("../models/skillSchema");

const addSkills = async (req, res) => {
  try {

    const { name, category, level } = req.body;
    if (!name || !category || !level) {
      return res.status(400).json({
        success: false,
        message: "All Fields are required",
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
      message: "Error adding project",
      error: error.message,
    });
  }
};

const getAllSkills=async(req,res)=>{
      try {
        const skills = await Skills.find()
          .populate("user", "name category")
          .sort({ order: 1, createdAt: -1 });
    
        return res.status(200).json({
          success: true,
          count: skills.length,
          data: skills,
        });
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: "Error fetching projects",
          error: error.message,
        });
      }
}

module.exports={addSkills,getAllSkills}