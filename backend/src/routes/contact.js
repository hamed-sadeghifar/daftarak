import express from "express";
import Message from "../models/Messages.js";
import adminAuth from "../middleware/adminAuth.js";

const router = express.Router();

/* =====================
   POST - ارسال پیام
===================== */
router.post("/", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: "همه فیلدها الزامی هستند" });
    }

    const newMessage = await Message.create({
      name,
      email,
      subject,
      message,
    });

    res.status(201).json(newMessage);
  } catch (err) {
    res.status(500).json({ message: "خطا در ارسال پیام" });
  }
});

/* =====================
   GET - دریافت پیام‌ها (ادمین)
===================== */
router.get("/", adminAuth, async (req, res) => {
  const messages = await Message.find().sort({ createdAt: -1 });
  res.json(messages);
});

/* =====================
   PATCH - خوانده شده
===================== */
router.patch("/:id/read", adminAuth, async (req, res) => {
  await Message.findByIdAndUpdate(req.params.id, { isRead: true });
  res.json({ success: true });
});

/* =====================
   DELETE - حذف پیام
===================== */
router.delete("/:id", adminAuth, async (req, res) => {
  await Message.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

export default router;
