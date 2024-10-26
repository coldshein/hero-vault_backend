const express = require("express");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const uploadImages = require("../controllers/upload.controller");

const uploadRouter = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname);
    const uniqueName = `${uuidv4()}${extension}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

uploadRouter.post("/upload", upload.array("images"), uploadImages);

module.exports = uploadRouter;
