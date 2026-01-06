import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true },
    source: String,

    cover: String, // مسیر فایل یا URL
    coverType: {
      type: String,
      enum: ["upload", "url"],
      default: "upload",
    },

    content: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Blog", blogSchema);
