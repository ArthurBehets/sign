const multer = require("multer");
const path = require("path");
const ffmpeg = require("fluent-ffmpeg");

let storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'videos');
    },
    filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
    },
    fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".mp4") {
      return cb(res.status(400).end("only mp4 is allowed"), false);
    }
    cb(null, true);
    },
    });

    module.exports = multer({storage: storage}).single('file');