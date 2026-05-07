const express = require("express");
const router = express.Router();

const { addProject, getAllProjects, getSingleProject, getMyProjects, updateProject, deleteProject } = require("../controllers/projectControllers");
const verifyToken = require("../middleware/authMiddleware");
const verifyRoles = require("../middleware/verifyRoles");
const upload = require("../middleware/upload"); // if using multer

router.post(
  "/addProject",
  verifyToken,

  upload.single("image"), // optional
  addProject
);

router.get(
  "/project",
  getAllProjects
)

router.get(
  "/project/:id",
  getSingleProject
)

router.get(
  "/myProjects",
  verifyToken,
  getMyProjects
)

router.put(
  "/updateProject/:id",
  verifyToken,
  updateProject
)

router.delete(
  "/deleteProject/:id",
  verifyToken,
  deleteProject
);

module.exports = router;