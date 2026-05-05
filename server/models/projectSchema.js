const mongoose = require("mongoose");
const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },

    description: {
      type: String,
      required: true
    },

    techStack: [
      {
        type: String
      }
    ],

    image: {
      type: String
    },

    githubLink: {
      type: String
    },

    liveLink: {
      type: String
    },

    featured: {
      type: Boolean,
      default: false
    },

    order: {
      type: Number,
      default: 0
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);