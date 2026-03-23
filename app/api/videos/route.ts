import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Video from "@/models/Video";

function getDefaultThumbnail(youtubeId: string) {
  return `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;
}

// ---------------- GET ----------------
export async function GET() {
  try {
    await connectDB();
    const videos = await Video.find().sort({ createdAt: -1 });

    return NextResponse.json({ data: videos });
  } catch (error) {
    console.error("GET VIDEOS ERROR:", error);
    return NextResponse.json({ message: "Server error", error }, { status: 500 });
  }
}

// ---------------- CREATE ----------------
export async function POST(req: Request) {
  try {
    await connectDB();
    const formData = await req.formData();

    const title = (formData.get("title") as string)?.trim();
    const youtubeId = (formData.get("youtubeId") as string)?.trim();
    const thumbnail = (formData.get("thumbnail") as string)?.trim();
    const duration = (formData.get("duration") as string)?.trim();
    const description = (formData.get("description") as string)?.trim();
    const isActive = (formData.get("isActive") as string) === "true";

    if (!title || !youtubeId) {
      return NextResponse.json(
        { message: "Title and YouTube ID are required" },
        { status: 400 }
      );
    }

    const video = await Video.create({
      title,
      youtubeId,
      thumbnail: thumbnail || getDefaultThumbnail(youtubeId),
      duration: duration || "",
      description: description || "",
      isActive,
    });

    return NextResponse.json({ message: "Video created successfully", data: video });
  } catch (error) {
    console.error("POST VIDEOS ERROR:", error);
    return NextResponse.json({ message: "Server error", error }, { status: 500 });
  }
}

// ---------------- UPDATE ----------------
export async function PUT(req: Request) {
  try {
    await connectDB();
    const formData = await req.formData();

    const id = formData.get("id") as string;
    const title = (formData.get("title") as string)?.trim();
    const youtubeId = (formData.get("youtubeId") as string)?.trim();
    const thumbnail = (formData.get("thumbnail") as string)?.trim();
    const duration = (formData.get("duration") as string)?.trim();
    const description = (formData.get("description") as string)?.trim();
    const isActiveValue = formData.get("isActive") as string | null;

    if (!id) {
      return NextResponse.json({ message: "ID is required" }, { status: 400 });
    }

    const video = await Video.findById(id);
    if (!video) {
      return NextResponse.json({ message: "Video not found" }, { status: 404 });
    }

    if (title) video.title = title;
    if (youtubeId) {
      video.youtubeId = youtubeId;
      if (!thumbnail && (!video.thumbnail || video.thumbnail.includes("img.youtube.com/vi/"))) {
        video.thumbnail = getDefaultThumbnail(youtubeId);
      }
    }

    video.thumbnail = thumbnail || getDefaultThumbnail(video.youtubeId);
    video.duration = duration || "";
    video.description = description || "";

    if (isActiveValue !== null) {
      video.isActive = isActiveValue === "true";
    }

    await video.save();

    return NextResponse.json({ message: "Video updated successfully", data: video });
  } catch (error) {
    console.error("PUT VIDEOS ERROR:", error);
    return NextResponse.json({ message: "Server error", error }, { status: 500 });
  }
}

// ---------------- DELETE ----------------
export async function DELETE(req: Request) {
  try {
    await connectDB();
    const formData = await req.formData();
    const id = formData.get("id") as string;

    if (!id) {
      return NextResponse.json({ message: "ID is required" }, { status: 400 });
    }

    await Video.findByIdAndDelete(id);

    return NextResponse.json({ message: "Video deleted successfully" });
  } catch (error) {
    console.error("DELETE VIDEOS ERROR:", error);
    return NextResponse.json({ message: "Server error", error }, { status: 500 });
  }
}
