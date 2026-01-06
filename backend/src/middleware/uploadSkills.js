import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/skills");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = file.fieldname + "-" + Date.now() + ext;
    cb(null, name);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/svg+xml") {
    cb(null, true);
  } else {
    cb(new Error("فقط فایل SVG مجاز است"), false);
  }
};

export const uploadSkillLogo = multer({
  storage,
  fileFilter,
});
