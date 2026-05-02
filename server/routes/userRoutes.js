const express = require("express");
const router = express.Router();

const { addUser, getuser,updateUser } = require("../controllers/userControllers");
const upload = require("../middleware/upload");

// Get users
router.get("/getUser", getuser);

// Add user with files
router.post(
  "/addUser",
  upload.fields([
    { name: "resume", maxCount: 1 },
    { name: "profilePic", maxCount: 1 }
  ]),
  addUser
);

router.put(
  "/updateUser/:id",
  upload.fields([
    { name: "resume", maxCount: 1 },
    { name: "profilePic", maxCount: 1 }
  ]),
  updateUser
);

module.exports = router;