const express = require("express");
const router = express.Router();

const { addProject } = require("../controllers/projectControllers");
const verifyToken = require("../middleware/authMiddleware");
const verifyRoles = require("../middleware/verifyRoles");
const upload = require("../middleware/upload"); // if using multer

router.post(
  "/addProject",
  verifyToken,

  upload.single("image"), // optional
  addProject
);

module.exports = router;