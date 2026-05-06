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

const getAllProjects=async(req,res)=>{
 try {
  const projects=await Project.find()
  .populate("user", "name email")
  .sort({order:1,createdAt:-1})

  return res.status(200).json({
    success:true,
    count:Project.length,
    data:projects
  })

 } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching projects",
      error: error.message
    });
 }
}

const getSingleProject=async(req,res)=>{
  try {
    const project=await Project.findById(req.params.id)
    .populate("user","name email")
    if(!project){
      return res.status(404).json({
        success:false,
        message:"Project not found"
      })
    }
    return res.status(200).json({
      success:true,
      message:"Project found",
      data:project
    })
  } catch (error) {
      return res.status(500).json({
      success: false,
      message: "Error fetching project",
      error: error.message
    });
  }
}
const getMyProjects = async (req, res) => {
  try {
    const userId = req.user.id;

    const projects = await Project.find({ user: userId })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: projects.length,
      data: projects
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching user projects",
      error: error.message
    });
  }
};
module.exports = { addProject ,getAllProjects,getSingleProject,getMyProjects };