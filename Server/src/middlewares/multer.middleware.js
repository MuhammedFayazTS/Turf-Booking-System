import multer from "multer";
import path from "path";
import fs from "fs";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Determine upload directory based on file mimetype
    let uploadDir = "./Public/temp";

    if (file.mimetype.startsWith("image")) {
      uploadDir = "./Public/images";
    } else if (file.mimetype === "application/pdf") {
      uploadDir = "./Public/documents";
    }

    // Create directory if it doesn't exist
    fs.mkdirSync(uploadDir, { recursive: true });

    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
  },
});

// File filter for images and PDFs
const fileFilter = function (req, file, cb) {
  if (file.mimetype.startsWith("image") || file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only images and PDFs are allowed!"), false);
  }
};

// Configure Multer with storage and file filter
export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 10,
  },
});
