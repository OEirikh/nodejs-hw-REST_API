const multer = require("multer");
const path = require("path");

const FILE_DIR = path.resolve("./tmp");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, FILE_DIR);
  },

  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
  limits: {
    fileSize: 2048,
  },
});
const uploadMiddleware = multer({ storage: storage });

module.exports = { uploadMiddleware };
