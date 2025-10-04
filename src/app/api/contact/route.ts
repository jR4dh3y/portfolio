import { NextRequest } from 'next/server';
export const runtime = 'nodejs';
import nodemailer from 'nodemailer';
import { contactSchema } from '@/lib/schemas/contact';
import { ratelimit } from '@/lib/rate-limit';

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export async function POST(req: NextRequest) {
  try {
    // Rate limiting per IP
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
               req.headers.get('x-real-ip') || 
               'unknown';
    
    const { success, remaining } = await ratelimit.limit(`contact:${ip}`);
    if (!success) {
      return new Response(JSON.stringify({ error: 'Too many requests. Please try again later.' }), {
        status: 429,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const body = await req.json();
    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      return new Response(JSON.stringify({ error: parsed.error.flatten() }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const { name, email, message, hp } = parsed.data;

    // Honeypot check - if filled, pretend success but don't send
    if (hp) {
      return new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

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
      secure: Number(SMTP_PORT) === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    const fromAddress = CONTACT_FROM || SMTP_USER;
    
    // Escape HTML to prevent injection
    const safeName = escapeHtml(name);
    const safeMessage = escapeHtml(message).replace(/\n/g, '<br/>');

    await transporter.sendMail({
      from: fromAddress,
      to: CONTACT_TO,
      replyTo: email,
      subject: `New portfolio contact from ${safeName}`,
      text: `From: ${name} <${email}>\n\n${message}`,
      html: `<p><strong>From:</strong> ${safeName} &lt;${email}&gt;</p><p>${safeMessage}</p>`,
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
