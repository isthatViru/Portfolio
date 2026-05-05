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
      order,
    } = req.body;

    const image = req.file ? req.file.path : null;

    // ✅ Validation (correct way)
    if (!title || !description || !techStack || !githubLink || !liveLink) {
      return res.status(400).json({
        success: false,
        message: "Required fields are missing",
      });
    }

    // ✅ Check duplicate
    const isProjectExist = await Project.findOne({ githubLink });
    if (isProjectExist) {
      return res.status(409).json({
        success: false,
        message: "Project already exists",
      });
    }

    // ✅ Convert techStack safely
    const parsedTechStack = Array.isArray(techStack)
      ? techStack
      : techStack.split(",").map((t) => t.trim());

    // ✅ Create project
    const newProject = await Project.create({
      title,
      description,
      techStack: parsedTechStack,
      image,
      githubLink,
      liveLink,
      featured: featured ?? false,
      order: order ?? 0,
      user: req.user?._id, // requires auth middleware
    });

    return res.status(201).json({
      success: true,
      message: "Project created successfully",
      data: newProject,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { addProject };