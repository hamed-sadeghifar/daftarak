import multer from "multer";
import path from "path";
import fs from "fs";

const uploadDir = "uploads/projects";

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = "project-" + Date.now() + ext;
    cb(null, name);
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = ["image/jpeg", "image/png", "image/webp", "image/svg+xml"];
  allowed.includes(file.mimetype)
    ? cb(null, true)
    : cb(new Error("فرمت تصویر مجاز نیست"), false);
};

export const uploadProjectImage = multer({
  storage,
  fileFilter,
});
