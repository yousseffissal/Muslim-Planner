const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "muslim-planner/avatars",

    allowed_formats: ["jpg", "png", "jpeg"],

    transformation: [
      {
        width: 300,
        height: 300,
        crop: "fill",
        gravity: "face"
      }
    ]
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 } // 2MB
});

module.exports = upload;