import express from "express";
import Skill from "../models/Skills.js";
import adminAuth from "../middleware/adminAuth.js";
import { uploadSkillLogo } from "../middleware/uploadSkills.js";
import fs from "fs/promises";
import path from "path";

const router = express.Router();

/* =====================
   GET all skills
===================== */
router.get("/", async (req, res) => {
  const skills = await Skill.find().sort({ createdAt: -1 });
  res.json(skills);
});

/* =====================
   ADD skill
===================== */
router.post(
  "/",
  adminAuth,
  uploadSkillLogo.single("logo"),
  async (req, res) => {
    const { name, type, link, logoType } = req.body;

    const skill = await Skill.create({
      name,
      type,
      link,
      logoType,
      logo:
        logoType === "svg"
          ? `/uploads/skills/${req.file.filename}`
          : req.body.logo,
    });

    res.json(skill);
  }
);

/* =====================
   UPDATE skill
===================== */
router.patch(
  "/:id",
  adminAuth,
  uploadSkillLogo.single("logo"),
  async (req, res) => {
    const skill = await Skill.findById(req.params.id);
    if (!skill) return res.status(404).json({ message: "پیدا نشد" });

    skill.name = req.body.name;
    skill.link = req.body.link;
    skill.type = req.body.type;

    if (req.body.logoType === "svg" && req.file) {
      skill.logo = `/uploads/skills/${req.file.filename};`;
      skill.logoType = "svg";
    }

    if (req.body.logoType === "url") {
      skill.logo = req.body.logo;
      skill.logoType = "url";
    }

    await skill.save();
    res.json(skill);
  }
);

/* =====================
   DELETE skill
===================== */
// router.delete("/:id", adminAuth, async (req, res) => {
//   await Skill.findByIdAndDelete(req.params.id);
//   res.json({ success: true });
// });
router.delete("/:id", adminAuth, async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) return res.sendStatus(404);

    // حذف فایل SVG اگر آپلود شده باشد
    if (skill.logoType === "svg" && skill.logo) {
      const filePath = path.join(
        process.cwd(),
        "uploads",
        "skills",
        path.basename(skill.logo)
      );
      try {
        await fs.unlink(filePath);
        console.log("فایل حذف شد:", filePath);
      } catch (err) {
        console.error("حذف فایل شکست خورد:", filePath, err.message);
      }
    }

    // حذف خود مهارت از دیتابیس
    await skill.deleteOne();
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "خطا در حذف مهارت" });
  }
});
export default router;
