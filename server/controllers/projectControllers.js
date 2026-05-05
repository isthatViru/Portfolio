const Project = require("../models/projectSchema");

const addProject = async (req, res) => {
  try {
    const {
      title,
      description,
      techStack,
      githubLink,
      liveLink,
      featured,
      order
    } = req.body;

    // ✅ Basic validation
    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Title and description are required"
      });
    }

    // ✅ Get logged-in user from token middleware
    const userId = req.user.id;

    // ✅ Create project
    const newProject = await Project.create({
      title,
      description,
      techStack,
      githubLink,
      liveLink,
      featured,
      order,
      image: req.file ? req.file.path : "", // if using multer
      user: userId
    });

    return res.status(201).json({
      success: true,
      message: "Project added successfully",
      data: newProject
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error adding project",
      error: error.message
    });
  }
};

module.exports = { addProject };