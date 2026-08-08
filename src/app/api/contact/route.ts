import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// In-memory rate limiter (per IP, max 5 requests per 15 minutes)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 15 * 60 * 1000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }

  if (entry.count >= RATE_LIMIT) return true;

  entry.count += 1;
  return false;
}

// Escape all HTML special characters to prevent XSS in email body
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

// Strip newlines and carriage returns to prevent email header injection
function sanitizeHeader(str: string): string {
  return str.replace(/[\r\n]/g, '');
}

// RFC 5322-compliant email regex
const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;

const SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
};

export async function POST(request: Request) {
  // Enforce JSON content type
  const contentType = request.headers.get('content-type') || '';
  if (!contentType.includes('application/json')) {
    return NextResponse.json(
      { error: 'Content-Type must be application/json.' },
      { status: 415, headers: SECURITY_HEADERS }
    );
  }

  // Rate limiting by IP
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    request.headers.get('x-real-ip') ??
    'unknown';

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429, headers: { ...SECURITY_HEADERS, 'Retry-After': '900' } }
    );
  }

  try {
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: 'Invalid JSON body.' },
        { status: 400, headers: SECURITY_HEADERS }
      );
    }

    if (typeof body !== 'object' || body === null) {
      return NextResponse.json(
        { error: 'Invalid request body.' },
        { status: 400, headers: SECURITY_HEADERS }
      );
    }

    const { name, email, subject, message } = body as Record<string, unknown>;

    // Type checks
    if (
      typeof name !== 'string' ||
      typeof email !== 'string' ||
      typeof message !== 'string'
    ) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, and message are required.' },
        { status: 400, headers: SECURITY_HEADERS }
      );
    }

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();
    const trimmedSubject = typeof subject === 'string' ? subject.trim() : '';

    // Field validations
    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, and message are required.' },
        { status: 400, headers: SECURITY_HEADERS }
      );
    }

    if (!EMAIL_REGEX.test(trimmedEmail)) {
      return NextResponse.json(
        { error: 'Invalid email format.' },
        { status: 400, headers: SECURITY_HEADERS }
      );
    }

    if (trimmedName.length < 2 || trimmedName.length > 100) {
      return NextResponse.json(
        { error: 'Name must be between 2 and 100 characters.' },
        { status: 400, headers: SECURITY_HEADERS }
      );
    }

    if (trimmedSubject.length > 200) {
      return NextResponse.json(
        { error: 'Subject must be 200 characters or fewer.' },
        { status: 400, headers: SECURITY_HEADERS }
      );
    }

    if (trimmedMessage.length < 10 || trimmedMessage.length > 5000) {
      return NextResponse.json(
        { error: 'Message must be between 10 and 5000 characters.' },
        { status: 400, headers: SECURITY_HEADERS }
      );
    }

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error('EMAIL_USER or EMAIL_PASS environment variables are missing.');
      return NextResponse.json(
        { error: 'Server configuration error. Please try again later.' },
        { status: 500, headers: SECURITY_HEADERS }
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'mail.delix4.com',
      port: parseInt(process.env.EMAIL_PORT || '465'),
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Sanitize all fields used in headers (prevent header injection)
    const safeEmail = sanitizeHeader(trimmedEmail);
    const safeName = sanitizeHeader(trimmedName);
    const safeSubject = sanitizeHeader(trimmedSubject);

    // Escape all fields used in HTML (prevent XSS)
    const htmlName = escapeHtml(safeName);
    const htmlEmail = escapeHtml(safeEmail);
    const htmlSubject = escapeHtml(safeSubject);
    const htmlMessage = escapeHtml(trimmedMessage);

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'hello@delix4.com',
      replyTo: safeEmail,
      subject: `New Contact Form Submission: ${safeSubject || 'No Subject'}`,
      text: `Name: ${safeName}\nEmail: ${safeEmail}\nSubject: ${safeSubject || 'Not provided'}\n\nMessage:\n${trimmedMessage}\n\n---\nSubmitted from: Delix4 Contact Form`,
      html: `
        <html>
          <body style="font-family: Arial, sans-serif; color: #333;">
            <div style="max-width: 600px; margin: 0 auto;">
              <h2 style="color: #ffd700; border-bottom: 2px solid #ffd700; padding-bottom: 10px;">New Contact Form Submission</h2>
              <p><strong>Name:</strong> ${htmlName}</p>
              <p><strong>Email:</strong> ${htmlEmail}</p>
              <p><strong>Subject:</strong> ${htmlSubject || 'Not provided'}</p>
              <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
              <h3 style="color: #333;">Message:</h3>
              <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; white-space: pre-wrap;">${htmlMessage}</div>
              <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
              <p style="font-size: 12px; color: #999;">Sent from the Delix4 contact form. Reply to ${htmlEmail} to respond.</p>
            </div>
          </body>
        </html>
      `,
    };

    await Promise.race([
      transporter.sendMail(mailOptions),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Email send timeout')), 10000)
      ),
    ]);

    return NextResponse.json(
      { success: true, message: 'Email sent successfully. We will get back to you soon.' },
      { status: 200, headers: SECURITY_HEADERS }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      {
        error: 'Failed to send email. Please try again later or contact us directly.',
        details: process.env.NODE_ENV === 'development' ? String(error) : undefined,
      },
      { status: 500, headers: SECURITY_HEADERS }
    );
  }
}
