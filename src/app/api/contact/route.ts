import { NextRequest } from 'next/server';
export const runtime = 'nodejs';
import { z } from 'zod';
import nodemailer from 'nodemailer';
import { contactSchema } from '@/lib/schemas/contact';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      return new Response(JSON.stringify({ error: parsed.error.flatten() }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const { name, email, message } = parsed.data;

    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO, CONTACT_FROM } = process.env;
    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !CONTACT_TO) {
      return new Response(JSON.stringify({ error: 'Email is not configured on the server.' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: Number(SMTP_PORT) === 465, // true for 465, false for other ports
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    const fromAddress = CONTACT_FROM || SMTP_USER;

    await transporter.sendMail({
      from: fromAddress,
      to: CONTACT_TO,
      replyTo: email,
      subject: `New portfolio contact from ${name}`,
      text: `From: ${name} <${email}>

${message}`,
      html: `
        <p><strong>From:</strong> ${name} &lt;${email}&gt;</p>
        <p>${message.replace(/\n/g, '<br/>')}</p>
      `,
    });

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Contact API error:', err);
    return new Response(JSON.stringify({ error: 'Failed to send message.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
