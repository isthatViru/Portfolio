const express = require("express");
const router = express.Router();

const {
  addSkills,
  getAllSkills,
  getSingleSkill,
  getMySkills,
  getMySingleSkill,
  updateSkill,
  deleteSkill
} = require("../controllers/skillsControllers");

const verifyToken = require("../middleware/authMiddleware");


// ✅ Create Skill
router.post(
  "/",
  verifyToken,
  addSkills
);


// ✅ Get All Skills
router.get(
  "/",
  getAllSkills
);


// ✅ Get Logged-in User Skills
router.get(
  "/me",
  verifyToken,
  getMySkills
);


// ✅ Get Single Logged-in User Skill
router.get(
  "/me/:id",
  verifyToken,
  getMySingleSkill
);


// ✅ Get Single Skill
router.get(
  "/:id",
  getSingleSkill
);
// ✅ Update Skill
router.put(
  "/:id",
  verifyToken,
  updateSkill
);


// ✅ Delete Skill
router.delete(
  "/:id",
  verifyToken,
  deleteSkill
);
module.exports = router;