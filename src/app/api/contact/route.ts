import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();

    // Basic validation with comprehensive checks
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, and message are required.' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format.' },
        { status: 400 }
      );
    }

    // Validate input lengths
    if (name.trim().length < 2 || name.trim().length > 100) {
      return NextResponse.json(
        { error: 'Name must be between 2 and 100 characters.' },
        { status: 400 }
      );
    }

    if (message.trim().length < 10 || message.trim().length > 5000) {
      return NextResponse.json(
        { error: 'Message must be between 10 and 5000 characters.' },
        { status: 400 }
      );
    }

    // Check for environment variables
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error('Error: EMAIL_USER or EMAIL_PASS environment variables are missing.');
      return NextResponse.json(
        { error: 'Server configuration error. Please try again later.' },
        { status: 500 }
      );
    }

    // Configure transporter with better error handling
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'mail.delix4.com',
      port: parseInt(process.env.EMAIL_PORT || '465'),
      secure: true, // Use SSL/TLS
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email options with improved formatting
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'hello@delix4.com',
      replyTo: email,
      subject: `New Contact Form Submission: ${subject || 'No Subject'}`,
      text: `
Name: ${name}
Email: ${email}
Subject: ${subject || 'Not provided'}

Message:
${message}

---
Submitted from: Delix4 Contact Form
      `,
      html: `
        <html>
          <body style="font-family: Arial, sans-serif; color: #333;">
            <div style="max-width: 600px; margin: 0 auto;">
              <h2 style="color: #ffd700; border-bottom: 2px solid #ffd700; padding-bottom: 10px;">New Contact Form Submission</h2>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
              <p><strong>Subject:</strong> ${subject || 'Not provided'}</p>
              <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
              <h3 style="color: #333;">Message:</h3>
              <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; white-space: pre-wrap;">
                ${message.replace(/</g, '&lt;').replace(/>/g, '&gt;')}
              </div>
              <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
              <p style="font-size: 12px; color: #999;">This email was sent from the Delix4 contact form. Reply directly to ${email} to respond.</p>
            </div>
          </body>
        </html>
      `,
    };

    // Send email with timeout
    await Promise.race([
      transporter.sendMail(mailOptions),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Email send timeout')), 10000)
      ),
    ]);

    return NextResponse.json(
      { success: true, message: 'Email sent successfully. We will get back to you soon.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { 
        error: 'Failed to send email. Please try again later or contact us directly.',
        details: process.env.NODE_ENV === 'development' ? String(error) : undefined,
      },
      { status: 500 }
    );
  }
}
