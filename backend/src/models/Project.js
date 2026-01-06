import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    desc: { type: String, required: true },
    img: String,
    imgType: { type: String, enum: ["upload", "url"], default: "url" },
    tech: [String],
    demo: String,
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);
