import express from "express";
import Sidebar from "../models/Sidebar.js";
import adminAuth from "../middleware/adminAuth.js";

const router = express.Router();

/* =====================
   GET sidebar (public)
===================== */
router.get("/", async (req, res) => {
  try {
    const sidebar = await Sidebar.findOne();
    res.json(sidebar);
  } catch (err) {
    res.status(500).json({ message: "خطا در دریافت اطلاعات سایدبار" });
  }
});

/* =====================
   UPDATE sidebar (admin)
===================== */
router.patch("/", adminAuth, async (req, res) => {
  try {
    let sidebar = await Sidebar.findOne();

    if (!sidebar) {
      sidebar = await Sidebar.create(req.body);
    } else {
      Object.assign(sidebar, req.body);
      await sidebar.save();
    }

    res.json(sidebar);
  } catch (err) {
    res.status(500).json({ message: "خطا در ذخیره تنظیمات" });
  }
});

export default router;
