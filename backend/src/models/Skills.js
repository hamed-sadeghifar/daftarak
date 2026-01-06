import mongoose from "mongoose";

const skillSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    type: {
      type: String,
      enum: ["technical", "soft"],
      required: true,
    },

    // فقط برای technical
    logo: String, // مسیر فایل یا URL
    logoType: {
      type: String,
      enum: ["url", "svg"],
      default: "url",
    },

    link: String,
  },
  { timestamps: true }
);

export default mongoose.model("Skill", skillSchema);
