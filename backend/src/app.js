import express from "express";
import cors from "cors";
import path from "path";

import adminRoutes from "./routes/admin.js";
import projectRoutes from "./routes/projects.js";
import aboutRoutes from "./routes/about.js";
import blogRoutes from "./routes/blog.js";
import skillRoutes from "./routes/skill.js";
import contactRoutes from "./routes/contact.js";
import SidebarRoutes from "./routes/sidebar.js";
import { adminLimiter } from "./middleware/adminLimiter.js";
import { loginLimiter } from "./middleware/loginLimiter.js";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// routes
app.use("/api/projects", adminLimiter, projectRoutes);
app.use("/api/about", adminLimiter, aboutRoutes);
app.use("/api/sidebar", adminLimiter, SidebarRoutes);
app.use("/api/blogs", adminLimiter, blogRoutes);
app.use("/api/skills", adminLimiter, skillRoutes);
app.use("/api/contact", adminLimiter, contactRoutes);
app.use("/api/admin", adminLimiter, adminRoutes);
app.use("/api/admin/login", loginLimiter);

export default app;
