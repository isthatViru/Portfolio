const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");
const verifyRoles = require("../middleware/verifyRoles");

const { addUser, getuser,getOneUser ,updateUser, deleteUser } = require("../controllers/userControllers");
const upload = require("../middleware/upload");


router.get("/getUser", verifyToken, verifyRoles("admin"), getuser);
router.get("/getUser/:id", verifyToken, getOneUser);

router.post(
  "/addUser",
  verifyToken,
  verifyRoles("admin"),
  upload.fields([
    { name: "resume", maxCount: 1 },
    { name: "profilePic", maxCount: 1 }
  ]),
  addUser
);


router.put(
  "/updateUser/:id",
  verifyToken,
  upload.fields([
    { name: "resume", maxCount: 1 },
    { name: "profilePic", maxCount: 1 }
  ]),
  updateUser
);


router.delete(
  "/deleteUser/:id",
  verifyToken,
  verifyRoles("admin"),
  deleteUser
);

module.exports = router;