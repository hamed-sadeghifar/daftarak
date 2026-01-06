import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { loginLimiter } from "../middleware/loginLimiter.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email !== process.env.ADMIN_EMAIL) {
      console.warn("Admin login failed: wrong email", {
        ip: req.ip,
        time: new Date().toISOString(),
      });
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isValid = await bcrypt.compare(
      password,
      process.env.ADMIN_PASSWORD_HASH
    );

    if (!isValid) {
      console.warn("Admin login failed: wrong password", {
        ip: req.ip,
        time: new Date().toISOString(),
      });
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    console.info("Admin login success", {
      ip: req.ip,
      time: new Date().toISOString(),
    });

    res.json({ token });
  } catch (err) {
    console.error("Admin login error", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
