import mongoose, { Schema } from 'mongoose'

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
    facebookLink: {
      type: String,
    },
    youtubeLink: {
      type: String,
    },
    twitterLink: {
      type: String,
    },
    instagramLink: {
      type: String,
    },
    linkedinLink: {
      type: String,
    }
  },
  { timestamps: true }
)

if (
  process.env.NODE_ENV !== 'production' &&
  mongoose.models.User &&
  !mongoose.models.User.schema.path('facebookLink')
) {
  delete mongoose.models.User
}

const User = mongoose.models.User || mongoose.model('User', UserSchema)

export default User
