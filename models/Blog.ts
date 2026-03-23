// models/Blog.ts
import mongoose from "mongoose";

const ContentSchema = new mongoose.Schema(
  {
    identity: {
      type: String,
      enum: ["heading", "subheading", "text", "imageLink"],
      required: true,
    },
    text: { type: String },
    imageLink: { type: String },
  },
  { _id: false } // prevent separate _id for each content item
);

const DetailsSchema = new mongoose.Schema(
  {
    tags: { type: [String], default: [] },
    heading: { type: String },
    author: { type: String },
    date: { type: Date, default: Date.now },
    content: { type: [ContentSchema], default: [] },
  },
  { _id: false }
);

const BlogSchema = new mongoose.Schema(
  {
    image: { type: String, required: false }, // Vercel Blob URL
    heading: { type: String, required: true },
    description: { type: String, required: true },
    details: { type: DetailsSchema, default: {} },
  },
  { timestamps: true }
);

export default mongoose.models.Blog || mongoose.model("Blog", BlogSchema);