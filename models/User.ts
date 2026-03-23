import { Schema, models, model } from 'mongoose'

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    resetOtp: String,
    resetOtpExpires: Date,

    // New fields for profile CRUD
    name: {
      type: String,
      default: 'Dr. Khurram Baqai',
    },
    designation: {
      type: String,
      default: 'Medical Professional',
    },
    description: {
      type: String,
      default: '',
    },
    pdfLink: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
)

export default models.User || model('User', UserSchema)