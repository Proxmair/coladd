// lib/uploadPDF.ts
import { put } from "@vercel/blob";

export async function uploadPDF(
  file: File | Blob,
  folder = "khurram"
): Promise<string> {
  try {
    const fileName =
      file instanceof File
        ? file.name
        : `file-${Date.now()}.pdf`;

    const blob = await put(`${folder}/${Date.now()}-${fileName}`, file, {
      access: "public",
    });

    console.log(blob)

    return blob.url;
  } catch (error) {
    console.error("Vercel Blob upload error:", error);
    throw new Error("Failed to upload PDF");
  }
}


export async function uploadImage(file: File | Blob, folder = "blogs"): Promise<string> {
  try {
    const fileName = file instanceof File ? file.name : `image-${Date.now()}.png`;

    const blob = await put(`${folder}/${Date.now()}-${fileName}`, file, {
      access: "public",
    });

    return blob.url;
  } catch (error) {
    console.error("Vercel Blob upload error (Image):", error);
    throw new Error("Failed to upload image");
  }
}