const express = require("express");
const { addSkills, getAllSkills } = require("../controllers/skillsControllers");
const verifyToken = require("../middleware/authMiddleware");
const router = express.Router();

router.post('/addSkill',verifyToken,addSkills)
router.get('/getSkills',getAllSkills)

module.exports=router