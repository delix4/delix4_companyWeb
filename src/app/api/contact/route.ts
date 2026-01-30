import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

type Body = {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Body;

    const firstName = (body.firstName || "").trim();
    const lastName = (body.lastName || "").trim();
    const email = (body.email || "").trim();
    const message = (body.message || "").trim();

    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 },
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 },
      );
    }

    const filePath = path.join(process.cwd(), "data", "contact-messages.json");

    // Ensure file exists
    if (!fs.existsSync(filePath)) {
      fs.mkdirSync(path.dirname(filePath), { recursive: true });
      fs.writeFileSync(filePath, "[]", "utf8");
    }

    const raw = fs.readFileSync(filePath, "utf8");
    const existing = raw ? JSON.parse(raw) : [];

    const newEntry = {
      id: crypto.randomUUID(),
      firstName,
      lastName,
      email,
      message,
      createdAt: new Date().toISOString(),
    };

    existing.unshift(newEntry);
    fs.writeFileSync(filePath, JSON.stringify(existing, null, 2), "utf8");

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      { error: "Failed to save message. Please try again." },
      { status: 500 },
    );
  }
}
