const express = require("express");
const router = express.Router();

const { addProject, getAllProjects, getSingleProject, getMyProjects } = require("../controllers/projectControllers");
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

module.exports = router;