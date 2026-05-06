const User = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const connection = require("../config/db");
connection();
const HOST = process.env.HOST || "127.0.0.1";
const PORT = process.env.PORT || 3000;

// Get users
const getuser = async (req, res) => {
  try {
    const users = await User.find();

    if (!users.length) {
      return res.status(404).json({
        success: false,
        message: "No users found",
      });
    }

    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getOneUser = async (req, res) => {
  try {
    const id = req.params.id;

    // ✅ Check id exists
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    // ✅ Find user
    const user = await User.findById(id).select("-password");

    // ✅ User not found
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // ✅ Success response
    return res.status(200).json({
      success: true,
      data: user,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Add user
const addUser = async (req, res) => {
  try {
    const { name, email, password, role, bio } = req.body;

    let socialLinks = {};
    if (req.body.socialLinks) {
      try {
        socialLinks = JSON.parse(req.body.socialLinks);
      } catch {
        socialLinks = {};
      }
    }

    if (!name || !email || !password || !role || !bio) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be filled",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const resumeFile = req.files?.resume?.[0];
    const profilePicFile = req.files?.profilePic?.[0];

    const resumeUrl = resumeFile
      ? `http://${HOST}:${PORT}/uploads/resumes/${resumeFile.filename}`
      : "";

    const profilePic = profilePicFile
      ? `http://${HOST}:${PORT}/uploads/profilePics/${profilePicFile.filename}`
      : "";

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
      bio,
      resumeUrl,
      profilePic,
      socialLinks,
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: newUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, email, password, role, bio } = req.body;

    // Parse socialLinks
    let socialLinks = {};
    if (req.body.socialLinks) {
      try {
        socialLinks = JSON.parse(req.body.socialLinks);
      } catch {
        socialLinks = {};
      }
    }

    // Prepare update object
    const updateData = {
      name,
      email,
      role,
      bio,
      socialLinks,
    };

    // Hash password only if provided
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    // Handle files
    const resumeFile = req.files?.resume?.[0];
    const profilePicFile = req.files?.profilePic?.[0];

    if (resumeFile) {
      updateData.resumeUrl = `http://${HOST}:${PORT}/uploads/resumes/${resumeFile.filename}`;
    }

    if (profilePicFile) {
      updateData.profilePic = `http://${HOST}:${PORT}/uploads/profilePics/${profilePicFile.filename}`;
    }

    // Update user
    const updatedUser = await User.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;

    // Validate ID
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    // Delete user directly
    const deletedUser = await User.findByIdAndDelete(id);

    // If user not found
    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Success response
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: deletedUser,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { getuser,getOneUser, addUser ,updateUser,deleteUser};