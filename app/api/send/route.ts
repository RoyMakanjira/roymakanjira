// app/api/send/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, message, honeypot } = await req.json();

    // Block spam via honeypot
    if (honeypot) {
      return NextResponse.json({ success: true });
    }

    const data = await resend.emails.send({
      from: "Roy's Portfolio <onboarding@resend.dev>", // Can be anything verified
      to: ["roymakanjira@gmail.com"],
      subject: `New Message from ${name}`,
      replyTo: email,
      html: `
  <div style="font-family: 'Segoe UI', sans-serif; color: #1a1a1a; padding: 24px; border-radius: 10px; background: #f9f9f9; max-width: 600px; margin: auto; box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);">
    <h2 style="color: #0070f3; margin-bottom: 12px;">📩 New Message from Your Portfolio</h2>
    
    <div style="margin-bottom: 16px;">
      <p style="margin: 4px 0;"><strong>Name:</strong> ${name}</p>
      <p style="margin: 4px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #0070f3;">${email}</a></p>
    </div>

    <div style="margin-bottom: 24px;">
      <p style="margin: 0 0 8px;"><strong>Message:</strong></p>
      <div style="padding: 16px; background: #fff; border: 1px solid #e0e0e0; border-radius: 6px; white-space: pre-line;">
        ${message}
      </div>
    </div>

    <a href="mailto:${email}" style="display: inline-block; background: #0070f3; color: #fff; padding: 10px 18px; border-radius: 6px; text-decoration: none; font-weight: 500;">
      Reply to ${name}
    </a>

    <p style="margin-top: 32px; font-size: 12px; color: #888;">You received this message via your portfolio contact form.</p>
  </div>
`,

    });

    if (data.error) {
      return NextResponse.json({ error: data.error }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
