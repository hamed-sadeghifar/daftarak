import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema(
  {
    paragraph1: {
      type: String,
      required: true,
    },
    paragraph2: {
      type: String,
      required: true,
    },
    paragraph3: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("About", aboutSchema);
