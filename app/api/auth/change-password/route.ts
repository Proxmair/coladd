import { NextResponse } from "next/server"
import User from "@/models/User"
import { connectDB } from "@/lib/mongodb"

export async function POST(req: Request) {
  try {
    await connectDB()

    const formData = await req.formData()
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      )
    }

    const user = await User.findOne({ email, password })

    if (!user) {
      return NextResponse.json(
        { message: "User with this email does not exist" },
        { status: 404 }
      )
    }

    user.resetOtp = undefined
    user.resetOtpExpires = undefined

    await user.save()

    return NextResponse.json({
      message: "Password changed successfully",
    })
  } catch (error) {
    console.error("Change password error:", error)
    return NextResponse.json(
      { message: "Server error", error },
      { status: 500 }
    )
  }
}