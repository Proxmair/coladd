import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import User from '@/models/User'
import { ADMIN_EMAIL } from '@/lib/constant'
import { uploadPDF } from '@/lib/uploadFiles'
export async function GET(req: Request) {
  try {
    await connectDB()
    const user = await User.findOne(
      {},
      'name designation description pdfLink facebookLink youtubeLink twitterLink instagramLink linkedinLink'
    )
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

    if (formData.has("name")) {
      user.name = ((formData.get("name") as string) || "").trim()
    }

    if (formData.has("designation")) {
      user.designation = ((formData.get("designation") as string) || "").trim()
    }

    if (formData.has("description")) {
      user.description = (formData.get("description") as string) || ""
    }

    await user.save()

    return NextResponse.json({ message: "Profile updated", data: user })
  } catch (err: any) {
    console.error(err)
    return NextResponse.json({ message: "Server error", error: err.message }, { status: 500 })
  }
}
