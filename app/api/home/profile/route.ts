import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import User from '@/models/User'
import { ADMIN_EMAIL } from '@/lib/constant'
import { v2 as cloudinary } from "cloudinary"
import { uploadPDF } from '@/lib/cloudinaryUpload'
export async function GET(req: Request) {
  try {
    await connectDB()
    const user = await User.findOne({}, 'name designation description pdfLink')
    return NextResponse.json({ data: user })
  } catch (err) {
    return NextResponse.json({ message: 'Server error', error: err }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    await connectDB()

    const formData = await req.formData()
    const pdfFile = formData.get("pdf") as File | null

    let user = await User.findOne({ email: ADMIN_EMAIL })
    if (!user) return NextResponse.json({ message: "Admin not found" }, { status: 404 })

    if (pdfFile) {
      user.pdfLink = await uploadPDF(pdfFile)
    }

    const name = formData.get("name") as string
    const designation = formData.get("designation") as string
    const description = formData.get("description") as string

    if (name?.trim()) user.name = name
    if (designation?.trim()) user.designation = designation
    if (description?.trim()) user.description = description

    await user.save()

    return NextResponse.json({ message: "Profile updated", data: user })
  } catch (err: any) {
    console.error(err)
    return NextResponse.json({ message: "Server error", error: err.message }, { status: 500 })
  }
}