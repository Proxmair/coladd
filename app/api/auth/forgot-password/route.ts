import { NextResponse } from "next/server"
import User from "@/models/User"
import { connectDB } from "@/lib/mongodb"
import { sendVerificationEmail } from "@/lib/sendEmail"
import { generateOTP } from "@/lib/utils"

export async function POST(req: Request) {
  try {
    await connectDB()

    const formData = await req.formData()
    const email = formData.get("email") as string
    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      )
    }

    const user = await User.findOne({ email })

    if (!user) {
      return NextResponse.json(
        { message: "User with this email does not exist" },
        { status: 404 }
      )
    }

    const { otp, otpExpires } = generateOTP()

    user.resetOtp = otp
    user.resetOtpExpires = otpExpires
    await user.save()

    await sendVerificationEmail('umair.xmair@gmail.com', otp)

    return NextResponse.json({
      message: "OTP sent successfully",
    })
  } catch (error) {
    console.log('Myerror', error)
    return NextResponse.json(
      { message: "Server error", error },
      { status: 500 }
    )
  }
}