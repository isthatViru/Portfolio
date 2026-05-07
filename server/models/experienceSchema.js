const mongoose = require("mongoose");
const experienceSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["job", "education"],
      required: true
    },

    title: {
      type: String,
      required: true
    },

    company: {
      type: String,
      required: true
    },

    startDate: {
      type: Date,
      required: true
    },

    endDate: {
      type: Date
    },

    description: {
      type: String
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Experience", experienceSchema);