import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import Schedule from "@/models/Schedule"

// ---------------- GET ----------------
export async function GET() {
  try {
    await connectDB()

    const schedules = await Schedule.find().sort({ createdAt: -1 })

    return NextResponse.json({
      data: schedules,
    })
  } catch (error) {
    return NextResponse.json(
      { message: "Server error", error },
      { status: 500 }
    )
  }
}

// ---------------- CREATE ----------------
export async function POST(req: Request) {
  try {
    await connectDB()

    const formData = await req.formData()

    const location = JSON.parse(formData.get("location") as string || "[]")
    const contact = JSON.parse(formData.get("contact") as string || "[]")
    const timings = JSON.parse(formData.get("timings") as string || "{}")

    if (!location.length) {
      return NextResponse.json(
        { message: "Location is required" },
        { status: 400 }
      )
    }

    const schedule = await Schedule.create({
      location,
      contact,
      timings,
    })

    return NextResponse.json({
      message: "Schedule created successfully",
      data: schedule,
    })
  } catch (error) {
    console.log("POST ERROR:", error)
    return NextResponse.json(
      { message: "Server error", error },
      { status: 500 }
    )
  }
}

// ---------------- UPDATE ----------------
export async function PUT(req: Request) {
  try {
    await connectDB()

    const formData = await req.formData()

    const id = formData.get("id") as string
    const location = JSON.parse(formData.get("location") as string || "[]")
    const contact = JSON.parse(formData.get("contact") as string || "[]")
    const timings = JSON.parse(formData.get("timings") as string || "{}")

    if (!id) {
      return NextResponse.json(
        { message: "ID is required" },
        { status: 400 }
      )
    }

    const updated = await Schedule.findByIdAndUpdate(
      id,
      {
        location,
        contact,
        timings,
      },
      { new: true }
    )

    return NextResponse.json({
      message: "Schedule updated successfully",
      data: updated,
    })
  } catch (error) {
    console.log("PUT ERROR:", error)
    return NextResponse.json(
      { message: "Server error", error },
      { status: 500 }
    )
  }
}

// ---------------- DELETE ----------------
export async function DELETE(req: Request) {
  try {
    await connectDB()

    const formData = await req.formData()
    const id = formData.get("id") as string

    if (!id) {
      return NextResponse.json(
        { message: "ID is required" },
        { status: 400 }
      )
    }

    await Schedule.findByIdAndDelete(id)

    return NextResponse.json({
      message: "Schedule deleted successfully",
    })
  } catch (error) {
    console.log("DELETE ERROR:", error)
    return NextResponse.json(
      { message: "Server error", error },
      { status: 500 }
    )
  }
}