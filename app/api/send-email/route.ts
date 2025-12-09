import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { emails, subject, message } = (await req.json()) as {
      emails: string;
      subject: string;
      message: string;
    };

    if (!emails || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const recipients = emails
      .split(",")
      .map((e) => e.trim())
      .filter((e) => e.length > 0);

    if (recipients.length === 0) {
      return NextResponse.json(
        { error: "Please provide at least one valid email" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    for (const email of recipients) {
      if (!emailRegex.test(email)) {
        return NextResponse.json(
          { error: `Invalid email format: ${email}` },
          { status: 400 }
        );
      }
    }

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Email Notification App" <${process.env.EMAIL_USER}>`,
      to: recipients.join(", "),
      subject,
      text: message,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        message: error?.message || "No message",
        code: (error as any)?.code || null,
      },
      { status: 500 }
    );
  }
}

