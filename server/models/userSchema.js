const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email"]
    },

    password: {
      type: String,
      required: true,
      minlength: 6
    },

    role: {
      type: String,
      enum: ["admin", "user"],
      default: "admin"
    },

    bio: {
      type: String,
      default: ""
    },

    // ✅ Resume file URL
    resumeUrl: {
      type: String,
      default: ""
    },

    // ✅ Profile picture URL (NEW)
    profilePic: {
      type: String,
      default: ""
    },

    // ✅ Social links (improved)
    socialLinks: {
      github: { type: String, default: "" },
      linkedin: { type: String, default: "" }
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("User", userSchema);