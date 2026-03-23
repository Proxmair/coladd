import mongoose from "mongoose"

const VideoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    youtubeId: {
      type: String,
      required: true,
      trim: true,
    },

    thumbnail: {
      type: String,
    },
    duration: {
      type: String, // e.g. "10:45"
    },
    description: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
)

export default mongoose.models.Video ||
  mongoose.model("Video", VideoSchema)