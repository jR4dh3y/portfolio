# Portfolio Website

A personal portfolio built with Next.js 15, TypeScript, Tailwind, and shadcn/ui.

## Prerequisites

- Node.js 18+ (recommended LTS)
- npm (comes with Node)

## Quick start (local)

1) Install deps
	- npm install

2) Configure environment
	- cp .env.example .env.local
	- Open .env.local and set SMTP_* and CONTACT_* values if you want the contact form to send emails locally.

3) Run the dev server
	- npm run dev
	- App runs on http://localhost:9002

## Email (contact form)

The contact form posts to `/api/contact` which uses SMTP via Nodemailer.

Required env vars:
- SMTP_HOST
- SMTP_PORT (465 for SSL, other ports for STARTTLS)
- SMTP_USER
- SMTP_PASS
- CONTACT_TO (destination inbox)
- CONTACT_FROM (optional; defaults to SMTP_USER)

If you don’t set these, the form will show an error when trying to send.

## Scripts

- npm run dev — start dev server
- npm run build — production build
- npm start — run production build
- npm run typecheck — TypeScript check
- npm run lint — ESLint

## Notes

