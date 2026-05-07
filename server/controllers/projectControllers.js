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

    // ✅ Basic validation
    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Title and description are required",
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
      user: userId,
    });

    return res.status(201).json({
      success: true,
      message: "Project added successfully",
      data: newProject,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error adding project",
      error: error.message,
    });
  }
};

const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find()
      .populate("user", "name email")
      .sort({ order: 1, createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: Project.length,
      data: projects,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching projects",
      error: error.message,
    });
  }
};

const getSingleProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate(
      "user",
      "name email",
    );
    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Project found",
      data: project,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching project",
      error: error.message,
    });
  }
};
const getMyProjects = async (req, res) => {
  try {
    const userId = req.user.id;

    const projects = await Project.find({ user: userId }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      count: projects.length,
      data: projects,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching user projects",
      error: error.message,
    });
  }
};

const updateProject = async (req, res) => {
  try {
    const id = req.params.id;

    const {
      title,
      description,
      techStack,
      githubLink,
      liveLink,
      featured,
      order,
    } = req.body;

    // ✅ Find existing project
    const existingProject = await Project.findById(id);

    if (!existingProject) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    if (
      existingProject.user.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    // ✅ Update project
    const updatedProject = await Project.findByIdAndUpdate(
      id,
      {
        title,
        description,
        techStack,
        githubLink,
        liveLink,
        featured,
        order,

        // keep old image if new one not uploaded
        image: req.file ? req.file.path : existingProject.image,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    return res.status(200).json({
      success: true,
      message: "Project updated successfully",
      data: updatedProject,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error updating project",
      error: error.message,
    });
  }
};

const deleteProject = async (req, res) => {
  try {
    const id = req.params.id;
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    if (project.user.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }
  await Project.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Project deleted successfully",
      data: project,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error updating project",
      error: error.message,
    });
  }
};

module.exports = {
  addProject,
  getAllProjects,
  getSingleProject,
  getMyProjects,
  updateProject,
  deleteProject
};
