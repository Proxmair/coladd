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