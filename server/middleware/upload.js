const multer = require("multer");

// Storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === "resume") {
      cb(null, "uploads/resumes");
    } else if (file.fieldname === "profilePic") {
      cb(null, "uploads/profilePics");
    }
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

// File filter
const fileFilter = (req, file, cb) => {
  if (file.fieldname === "resume") {
    const resumeTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (resumeTypes.includes(file.mimetype)) return cb(null, true);
  }

  if (file.fieldname === "profilePic") {
    const imageTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (imageTypes.includes(file.mimetype)) return cb(null, true);
  }

  cb(new Error("Invalid file type"), false);
};

// Export middleware
module.exports = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});