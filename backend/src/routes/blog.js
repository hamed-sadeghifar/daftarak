import express from "express";
import fs from "fs";
import path from "path";
import Blog from "../models/Blog.js";
import adminAuth from "../middleware/adminAuth.js";
import { uploadBlogCover } from "../middleware/uploadBlogs.js";

const router = express.Router();

/* =====================
   GET all blogs (public)
===================== */
router.get("/", async (req, res) => {
  const blogs = await Blog.find().sort({ createdAt: -1 });
  res.json(blogs);
});

/* =====================
   GET single blog (public)
===================== */
router.get("/:slug", async (req, res) => {
  const blog = await Blog.findOne({ slug: req.params.slug });
  if (!blog) return res.status(404).json({ message: "پست پیدا نشد" });
  res.json(blog);
});

/* =====================
   CREATE / UPDATE (admin)
===================== */
router.post(
  "/",
  adminAuth,
  uploadBlogCover.single("cover"),
  async (req, res) => {
    const { id, title, source, content, coverUrl } = req.body;

    let blog = id ? await Blog.findById(id) : null;

    let slug = title.trim().replace(/\s+/g, "-").toLowerCase();

    if (!blog) {
      slug += "-" + Date.now(); // فقط وقتی بلاگ جدیده
    } else {
      slug = blog.slug; // بلاگ موجود: slug رو تغییر نده
    }

    // حذف کاور قبلی در صورت آپلود جدید
    if (blog && req.file && blog.coverType === "upload") {
      fs.existsSync(blog.cover) && fs.unlinkSync(blog.cover);
    }

    // مشخص کردن کاور
    let cover;
    let coverType;

    if (req.file) {
      cover = `/uploads/blog/${req.file.filename}`;
      coverType = "upload";
    } else if (coverUrl) {
      cover = coverUrl;
      coverType = "url";
    } else if (req.body.oldCover) {
      // 👈 عکس قبلی
      cover = req.body.oldCover;
      coverType = blog.coverType; // همان نوع قبلی حفظ شود
    }

    if (!blog) {
      blog = await Blog.create({
        title,
        slug,
        source,
        content,
        cover,
        coverType,
      });
    } else {
      Object.assign(blog, {
        title,
        slug,
        source,
        content,
        cover,
        coverType,
      });
      await blog.save();
    }

    res.json(blog);
  }
);

/* =====================
   DELETE blog (admin)
===================== */
router.delete("/:id", adminAuth, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.sendStatus(404);

    // اگر کاور آپلودی بوده → فایل رو حذف کن
    if (blog.coverType === "upload" && blog.cover) {
      const filePath = path.join(process.cwd(), blog.cover);

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
    await blog.deleteOne();
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "خطا در حذف بلاگ" });
  }
});

export default router;
