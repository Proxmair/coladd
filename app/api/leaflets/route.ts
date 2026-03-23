import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Leaflet from "@/models/Leaflet";
import { uploadImage, uploadPDF } from "@/lib/uploadFiles";

export async function GET() {
  try {
    await connectDB();
    const leaflets = await Leaflet.find().sort({ createdAt: -1 });
    return NextResponse.json({ data: leaflets });
  } catch (error) {
    console.error("GET LEAFLETS ERROR:", error);
    return NextResponse.json({ message: "Server error", error }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const formData = await req.formData();

    const title = (formData.get("title") as string)?.trim();
    const description = (formData.get("description") as string)?.trim();
    const isActive = (formData.get("isActive") as string) === "true";
    const iconFile = formData.get("icon") as File | null;
    const pdfFile = formData.get("pdf") as File | null;

    if (!title || !(pdfFile instanceof File) || pdfFile.size === 0) {
      return NextResponse.json({ message: "Title and PDF are required" }, { status: 400 });
    }

    let iconUrl = "";
    if (iconFile instanceof File && iconFile.size > 0) {
      iconUrl = await uploadImage(iconFile, "leaflets");
    }

    const pdfUrl = await uploadPDF(pdfFile, "leaflets");

    const leaflet = await Leaflet.create({
      title,
      description: description || "",
      icon: iconUrl,
      pdfUrl,
      isActive,
    });

    return NextResponse.json({ message: "Leaflet created successfully", data: leaflet });
  } catch (error) {
    console.error("POST LEAFLETS ERROR:", error);
    return NextResponse.json({ message: "Server error", error }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    await connectDB();
    const formData = await req.formData();

    const id = formData.get("id") as string;
    const title = (formData.get("title") as string)?.trim();
    const description = (formData.get("description") as string)?.trim();
    const isActiveValue = formData.get("isActive") as string | null;
    const iconFile = formData.get("icon") as File | null;
    const pdfFile = formData.get("pdf") as File | null;

    if (!id) {
      return NextResponse.json({ message: "ID is required" }, { status: 400 });
    }

    const leaflet = await Leaflet.findById(id);
    if (!leaflet) {
      return NextResponse.json({ message: "Leaflet not found" }, { status: 404 });
    }

    if (title) leaflet.title = title;
    leaflet.description = description || "";

    if (iconFile instanceof File && iconFile.size > 0) {
      leaflet.icon = await uploadImage(iconFile, "leaflets");
    }

    if (pdfFile instanceof File && pdfFile.size > 0) {
      leaflet.pdfUrl = await uploadPDF(pdfFile, "leaflets");
    }

    if (isActiveValue !== null) {
      leaflet.isActive = isActiveValue === "true";
    }

    await leaflet.save();

    return NextResponse.json({ message: "Leaflet updated successfully", data: leaflet });
  } catch (error) {
    console.error("PUT LEAFLETS ERROR:", error);
    return NextResponse.json({ message: "Server error", error }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    await connectDB();
    const formData = await req.formData();
    const id = formData.get("id") as string;

    if (!id) {
      return NextResponse.json({ message: "ID is required" }, { status: 400 });
    }

    await Leaflet.findByIdAndDelete(id);

    return NextResponse.json({ message: "Leaflet deleted successfully" });
  } catch (error) {
    console.error("DELETE LEAFLETS ERROR:", error);
    return NextResponse.json({ message: "Server error", error }, { status: 500 });
  }
}
