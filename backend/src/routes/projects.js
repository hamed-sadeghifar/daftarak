import express from "express";
import fs from "fs";
import path from "path";
import Project from "../models/Project.js";
import adminAuth from "../middleware/adminAuth.js";
import { uploadProjectImage } from "../middleware/uploadProjects.js";

const router = express.Router();

/* ======================
   PUBLIC
====================== */
router.get("/", async (req, res) => {
  const projects = await Project.find().sort({ createdAt: -1 });
  res.json(projects);
});

/* ======================
   CREATE / UPDATE
====================== */
router.post(
  "/",
  adminAuth,
  uploadProjectImage.single("img"),
  async (req, res) => {
    const { id, title, desc, tech, demo, imgUrl, oldImg } = req.body;

    let project = id ? await Project.findById(id) : null;

    // حذف عکس قبلی در صورت آپلود جدید
    if (project && req.file && project.imgType === "upload") {
      const oldPath = path.join(process.cwd(), project.img);
      fs.existsSync(oldPath) && fs.unlinkSync(oldPath);
    }

    let img;
    let imgType;

    if (req.file) {
      img = `/uploads/projects/${req.file.filename}`;
      imgType = "upload";
    } else if (imgUrl) {
      img = imgUrl;
      imgType = "url";
    } else if (oldImg) {
      // 👈 حفظ عکس قبلی
      img = oldImg;
      imgType = project ? project.imgType : "url";
    }

    const data = {
      title,
      desc,
      demo,
      img,
      imgType,
      tech: tech ? tech.split(",").map((t) => t.trim()) : [],
    };

    project
      ? Object.assign(project, data) && (await project.save())
      : (project = await Project.create(data));

    res.json(project);
  }
);

/* ======================
   DELETE
====================== */
router.delete("/:id", adminAuth, async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) return res.sendStatus(404);

  if (project.imgType === "upload") {
    const filePath = path.join(process.cwd(), project.img);
    fs.existsSync(filePath) && fs.unlinkSync(filePath);
  }

  await project.deleteOne();
  res.json({ success: true });
});

export default router;
