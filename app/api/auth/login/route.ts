import { NextResponse } from "next/server"
import User from "@/models/User"
import { connectDB } from "@/lib/mongodb"

export async function POST(req: Request) {
  try {
    await connectDB()

    const formData = await req.formData()

    const email = process.env.ADMIN_EMAIL
    const password = formData.get("password") as string

    if (!email) {
      return NextResponse.json(
        { message: "Eamil not added on db" },
        { status: 400 }
      )
    }

    if (!password) {
      return NextResponse.json(
        { message: "Password required" },
        { status: 400 }
      )
    }

    const user = await User.findOne({ email, password })

    if (!user) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 400 }
      )
    }

    return NextResponse.json({
      message: "Login successful",
      userId: user._id,
      email: user.email,
    })
  } catch (error) {
    return NextResponse.json(
      { message: "Server error", error },
      { status: 500 }
    )
  }
}