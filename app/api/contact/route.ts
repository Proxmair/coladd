// app/api/contact/route.ts
import { sendContactInformationEmail } from "@/lib/sendEmail";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { fullName, email, contactNumber, message } = body;

    if (!fullName || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // send to YOUR email (admin inbox)
    await sendContactInformationEmail('umair.xmair@gmail.com', {
      fullName,
      email,
      contactNumber,
      message,
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error(err);

    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}