const express = require("express");
const router = express.Router();

const {
  addProject,
  getAllProjects,
  getSingleProject,
  getMyProjects,
  updateProject,
  deleteProject,
  getMySingleProject,
} = require("../controllers/projectControllers");

const verifyToken = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");


// ✅ Create Project
router.post(
  "/",
  verifyToken,
  upload.single("image"),
  addProject
);


// ✅ Get All Projects
router.get(
  "/",
  getAllProjects
);


// ✅ Get Logged-in User Projects
router.get(
  "/me",
  verifyToken,
  getMyProjects
);


// ✅ Get Single Logged-in User Project
router.get(
  "/me/:id",
  verifyToken,
  getMySingleProject
);


// ✅ Get Single Project
router.get(
  "/:id",
  getSingleProject
);


// ✅ Update Project
router.put(
  "/:id",
  verifyToken,
  upload.single("image"),
  updateProject
);


// ✅ Delete Project
router.delete(
  "/:id",
  verifyToken,
  deleteProject
);

module.exports = router;