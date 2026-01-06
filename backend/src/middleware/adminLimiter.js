import rateLimit from "express-rate-limit";

export const adminLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 دقیقه
  max: 60,
  standardHeaders: true,
  legacyHeaders: false,
});
