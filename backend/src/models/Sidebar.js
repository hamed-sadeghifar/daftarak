import mongoose from "mongoose";

const sidebarSchema = new mongoose.Schema(
  {
    name: String,
    title: String,
    bio: String,

    telegram: String,
    instagram: String,
    linkedin: String,
    github: String,
    email: String,
    phone: String,
  },
  { timestamps: true }
);

export default mongoose.model("Sidebar", sidebarSchema);
