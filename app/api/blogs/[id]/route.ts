import { connectDB } from "@/lib/mongodb";
import { uploadImage } from "@/lib/uploadFiles";
import Blog from "@/models/Blog";
import { NextResponse } from "next/server";

// The `context` type is a bit different in App Router
interface Context {
  params: { id: string } | Promise<{ id: string }>;
}

function parseJsonField<T>(value: FormDataEntryValue | null, fallback: T): T {
  if (typeof value !== "string" || !value.trim()) {
    return fallback;
  }

  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

export async function GET(req: Request, context: Context) {
  // unwrap params if it's a promise
  const params = await context.params;
  const { id } = params;

  // Validate ObjectId format
  if (!/^[0-9a-fA-F]{24}$/.test(id)) {
    return NextResponse.json({ message: "Invalid blog ID" }, { status: 400 });
  }

  try {
    await connectDB();

    const blog = await Blog.findById(id);

    if (!blog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({ blog });
  } catch (error) {
    console.error("GET ERROR:", error);
    return NextResponse.json(
      { message: "Server error", error },
      { status: 500 }
    );
  }
}

interface Context {
  params: { id: string } | Promise<{ id: string }>;
}

export async function PUT(req: Request, context: Context) {
  try {
    const params = await context.params;
    const { id } = params;

    // Validate ObjectId
    if (!/^[0-9a-fA-F]{24}$/.test(id)) {
      return NextResponse.json({ message: "Invalid blog ID" }, { status: 400 });
    }

    await connectDB();
    const formData = await req.formData();

    const detailHeading =
      (formData.get("detailsHeading") as string) || (formData.get("heading") as string);
    const author = formData.get("author") as string;
    const date = formData.get("date") as string;
    const tagsProvided = formData.has("tags");
    const contentProvided = formData.has("content");
    const tags = parseJsonField<string[]>(formData.get("tags"), []);
    const content = parseJsonField<any[]>(formData.get("content"), []);
    const imageFile = formData.get("image") as File | null;

    const blog = await Blog.findById(id);
    if (!blog) return NextResponse.json({ message: "Blog not found" }, { status: 404 });

    // Upload main blog image if new file provided
    if (imageFile instanceof File && imageFile.size > 0) {
      blog.image = await uploadImage(imageFile);
    }

    const updatedDetails: any = {
      ...(blog.details?.toObject?.() ?? blog.details ?? {}),
    };

    if (detailHeading?.trim()) {
      updatedDetails.heading = detailHeading.trim();
    }

    if (author?.trim()) {
      updatedDetails.author = author.trim();
    }

    if (date) {
      updatedDetails.date = new Date(date);
    }

    if (tagsProvided) {
      updatedDetails.tags = Array.isArray(tags)
        ? tags.map((tag) => tag?.trim()).filter(Boolean)
        : [];
    }

    if (contentProvided) {
      updatedDetails.content = await Promise.all(
        content.map(async (item: any, index: number) => {
          if (item.identity === "imageLink") {
            const fileKey =
              typeof item.fileKey === "string" && item.fileKey.trim()
                ? item.fileKey
                : `contentFile_${index}`;
            const file = formData.get(fileKey);

            if (file instanceof File && file.size > 0) {
              return {
                identity: "imageLink",
                imageLink: await uploadImage(file),
                text: "",
              };
            }

            return {
              identity: "imageLink",
              imageLink: item.imageLink || "",
              text: "",
            };
          }

          return {
            identity: item.identity,
            text: item.text || "",
            imageLink: "",
          };
        })
      );
    }

    blog.details = updatedDetails;

    await blog.save();

    return NextResponse.json({ message: "Blog details updated", blog });
  } catch (error) {
    console.error("PUT ERROR:", error);
    return NextResponse.json({ message: "Server error", error }, { status: 500 });
  }
}
