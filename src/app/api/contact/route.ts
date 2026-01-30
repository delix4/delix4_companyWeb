import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { firstName, lastName, email, message } = await request.json();

    // Validate required fields
    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 },
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 },
      );
    }

    // Log the contact message (in production, send email or save to database)
    console.log("New contact form submission:", {
      firstName,
      lastName,
      email,
      message,
      timestamp: new Date().toISOString(),
    });

    // TODO: In production, integrate with:
    // - EmailJS for automated emails
    // - SendGrid / Resend for transactional emails
    // - Database to store inquiries
    // - Slack notification

    return NextResponse.json(
      { message: "Contact message received successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to process contact request" },
      { status: 500 },
    );
  }
}
