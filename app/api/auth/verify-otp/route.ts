import { NextResponse } from "next/server"
import User from "@/models/User"
import { connectDB } from "@/lib/mongodb"
import { ADMIN_EMAIL } from "@/lib/constant"

export async function POST(req: Request) {
  try {
    await connectDB()

    const formData = await req.formData()
    const otp = formData.get("otp") as string

    if (!otp) {
      return NextResponse.json(
        { message: "Email and OTP are required" },
        { status: 400 }
      )
    }

    const user = await User.findOne({ email: ADMIN_EMAIL })

    if (!user) {
      return NextResponse.json(
        { message: "User with this email does not exist" },
        { status: 404 }
      )
    }

    // Check if OTP matches
    if (user.resetOtp !== otp) {
      return NextResponse.json(
        { message: "Invalid OTP" },
        { status: 400 }
      )
    }

    // Check if OTP has expired
    if (!user.resetOtpExpires || new Date() > user.resetOtpExpires) {
      return NextResponse.json(
        { message: "OTP has expired" },
        { status: 400 }
      )
    }

    // Clear OTP so it can’t be reused
    user.resetOtp = undefined
    user.resetOtpExpires = undefined
    user.password = '12345'
    await user.save()

    return NextResponse.json({
      message: "OTP verified successfully and password is set to 12345 you can change this password from the settings",
      user
    })
  } catch (error) {
    console.error("Verify OTP Error:", error)
    return NextResponse.json(
      { message: "Server error", error },
      { status: 500 }
    )
  }
}