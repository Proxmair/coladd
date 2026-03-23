import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";
import { uploadImage } from "@/lib/uploadFiles";

// ---------------- GET ----------------
export async function GET() {
  try {
    await connectDB();
    const blogs = await Blog.find().sort({ createdAt: -1 });

    return NextResponse.json({ data: blogs });
  } catch (error) {
    console.error("GET ERROR:", error);
    return NextResponse.json({ message: "Server error", error }, { status: 500 });
  }
}

// ---------------- CREATE ----------------
export async function POST(req: Request) {
  try {
    await connectDB();
    const formData = await req.formData();

    const heading = formData.get("heading") as string;
    const description = formData.get("description") as string;
    const imageFile = formData.get("image") as File | null;

    if (!heading || !description) {
      return NextResponse.json({ message: "Heading and description are required" }, { status: 400 });
    }

    let imageUrl = "";
    if (imageFile) {
      imageUrl = await uploadImage(imageFile); // Upload image to Vercel Blob
    }

    const blog = await Blog.create({
      heading,
      description,
      image: imageUrl,
      details: {}, // ignoring details for now
    });

    return NextResponse.json({ message: "Blog created successfully", data: blog });
  } catch (error) {
    console.error("POST ERROR:", error);
    return NextResponse.json({ message: "Server error", error }, { status: 500 });
  }
}

// ---------------- UPDATE ----------------
export async function PUT(req: Request) {
  try {
    await connectDB();
    const formData = await req.formData();

    const id = formData.get("id") as string;
    const heading = formData.get("heading") as string;
    const description = formData.get("description") as string;
    const imageFile = formData.get("image") as File | null;

    if (!id) return NextResponse.json({ message: "ID is required" }, { status: 400 });

    const blog = await Blog.findById(id);
    if (!blog) return NextResponse.json({ message: "Blog not found" }, { status: 404 });

    if (heading) blog.heading = heading;
    if (description) blog.description = description;
    if (imageFile) blog.image = await uploadImage(imageFile);

    await blog.save();

    return NextResponse.json({ message: "Blog updated successfully", data: blog });
  } catch (error) {
    console.error("PUT ERROR:", error);
    return NextResponse.json({ message: "Server error", error }, { status: 500 });
  }
}

// ---------------- DELETE ----------------
export async function DELETE(req: Request) {
  try {
    await connectDB();
    const formData = await req.formData();
    const id = formData.get("id") as string;

    if (!id) return NextResponse.json({ message: "ID is required" }, { status: 400 });

    await Blog.findByIdAndDelete(id);

    return NextResponse.json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error("DELETE ERROR:", error);
    return NextResponse.json({ message: "Server error", error }, { status: 500 });
  }
}