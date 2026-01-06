import express from "express";
import About from "../models/About.js";
import adminAuth from "../middleware/adminAuth.js";

const router = express.Router();

/* =====================
   GET about
===================== */
router.get("/", async (req, res) => {
  try {
    const about = await About.findOne();
    res.json(about);
  } catch (err) {
    res.status(500).json({ message: "خطا در دریافت اطلاعات" });
  }
});

/* =====================
   UPDATE about
===================== */
router.patch("/", adminAuth, async (req, res) => {
  try {
    const { paragraph1, paragraph2, paragraph3 } = req.body;

    let about = await About.findOne();

    if (!about) {
      // اولین بار → بساز
      about = await About.create({
        paragraph1,
        paragraph2,
        paragraph3,
      });
    } else {
      // بروزرسانی
      about.paragraph1 = paragraph1;
      about.paragraph2 = paragraph2;
      about.paragraph3 = paragraph3;
      await about.save();
    }

    res.json(about);
  } catch (err) {
    res.status(500).json({ message: "خطا در ذخیره اطلاعات" });
  }
});

export default router;
