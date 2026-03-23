import mongoose from "mongoose"

const LeafletSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    icon: {
      type: String, // Should be handled as an image
    },

    pdfUrl: {
      type: String,
      required: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
)

export default mongoose.models.Leaflet ||
  mongoose.model("Leaflet", LeafletSchema)