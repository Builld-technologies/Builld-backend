import { NextResponse } from 'next/server';
import { Pool } from 'pg';
import nodemailer from 'nodemailer';
import { getAdminEmailHTML, getUserEmailHTML } from '@/lib/emailTemplates';

// PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// POST handler
export async function POST(req) {
  try {
    const body = await req.json();
    const { email, phoneNumber, businessStage, challenge } = body;

    if (!email || !phoneNumber || !businessStage || !challenge) {
      return NextResponse.json(
        { error: 'All fields are required.' },
        { status: 400 }
      );
    }

    // Save to database
    try {
      const client = await pool.connect();
      const query = 'INSERT INTO contact (email, phoneNumber, businessStage, challenge) VALUES ($1, $2, $3, $4)';
      await client.query(query, [email, phoneNumber, businessStage, challenge]);
      client.release();
    } catch (dbError) {
      console.error('Database error:', dbError);
      return NextResponse.json(
        { error: 'Failed to save your message. Please try again later.' },
        { status: 500 }
      );
    }

    // Send notification and confirmation emails
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Email to admin
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.CONTACT_ADMIN_EMAIL,
      subject: 'New Contact Form Submission',
      html: getAdminEmailHTML({ email, phoneNumber, businessStage, challenge }), // Add phone and plan if available
    });

    // Email to user
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: 'Confirmation: We Received Your Contact Message',
      html: getUserEmailHTML({ email, phoneNumber, businessStage, challenge }),
    });

    return NextResponse.json({
      message: 'Your message has been received and saved. A confirmation email has been sent.',
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}

// OPTIONS handler for CORS (for preflight requests)
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': process.env.CORS_ORIGINS || 'http://localhost:3000',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
    },
  });
}
