import mongoose from "mongoose"

const ScheduleSchema = new mongoose.Schema(
  {
    location: [String],
    contact: [String],
    timings: {
      Monday: [String],
      Tuesday: [String],
      Wednesday: [String],
      Thursday: [String],
      Friday: [String],
      Saturday: [String],
      Sunday: [String],
    },
  },
  { timestamps: true }
)

export default mongoose.models.Schedule ||
  mongoose.model("Schedule", ScheduleSchema)