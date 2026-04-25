import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[\d\s\-\+\(\)]{7,20}$/;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body as Record<string, string>;

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
    }
    if (!EMAIL_RE.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }
    if (phone?.trim() && !PHONE_RE.test(phone)) {
      return NextResponse.json({ error: "Invalid phone number." }, { status: 400 });
    }

    const gmailUser = process.env.GMAIL_USER;
    const gmailPass = process.env.GMAIL_APP_PASSWORD;

    if (!gmailUser || !gmailPass) {
      console.error("[contact] GMAIL_USER or GMAIL_APP_PASSWORD not set");
      return NextResponse.json({ error: "Email service is not configured. Please contact us directly at thegujaratidesigner@gmail.com" }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: gmailUser, pass: gmailPass },
    });

    const subjectLine = subject?.trim()
      ? `[Contact] ${subject.trim()}`
      : `[Contact] New message from ${name.trim()}`;

    await transporter.sendMail({
      from: `"${name.trim()}" <${gmailUser}>`,
      to: "thegujaratidesigner@gmail.com",
      replyTo: email.trim(),
      subject: subjectLine,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #7c3aed;">New Contact Form Submission</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #666; width: 100px;"><strong>Name</strong></td><td>${name.trim()}</td></tr>
            <tr><td style="padding: 8px 0; color: #666;"><strong>Email</strong></td><td>${email.trim()}</td></tr>
            ${phone?.trim() ? `<tr><td style="padding: 8px 0; color: #666;"><strong>Phone</strong></td><td>${phone.trim()}</td></tr>` : ""}
            ${subject?.trim() ? `<tr><td style="padding: 8px 0; color: #666;"><strong>Subject</strong></td><td>${subject.trim()}</td></tr>` : ""}
          </table>
          <hr style="margin: 16px 0; border: none; border-top: 1px solid #eee;" />
          <p style="color: #333; line-height: 1.6;">${message.trim().replace(/\n/g, "<br/>")}</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[contact] send error:", err);
    return NextResponse.json({ error: "Failed to send your message. Please try again or email us directly." }, { status: 500 });
  }
}
