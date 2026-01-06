import jwt from "jsonwebtoken";

export default function adminAuth(req, res, next) {
  const auth = req.headers.authorization;

  // ❌ توکن اصلاً وجود ندارد
  if (!auth || !auth.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = auth.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ❌ نقش ادمین نیست
    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Forbidden" });
    }

    next();
  } catch (err) {
    // ❌ توکن نامعتبر یا منقضی
    return res.status(401).json({ message: "Unauthorized" });
  }
}