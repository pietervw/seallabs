import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

import { SUPPORT_EMAIL, TURNSTILE_SECRET_KEY } from "@/lib/config";

export const runtime = "nodejs";

const FETCH_TIMEOUT_MS = 10_000;

type ContactBody = {
  name?: string;
  email?: string;
  company?: string;
  message?: string;
  website?: string;
  turnstileToken?: string;
};

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function fromAddress(from: string): string {
  return from.includes("<") ? from.replace(/^.*<([^>]+)>.*$/, "$1") : from;
}

async function verifyTurnstile(token: string, ip: string | null): Promise<boolean> {
  // Only enforce when both keys are present — avoids secret-only (breaks form)
  // and treats incomplete Turnstile config as disabled.
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim() || "";
  if (!TURNSTILE_SECRET_KEY || !siteKey) return true;
  if (!token) return false;

  const body = new URLSearchParams({
    secret: TURNSTILE_SECRET_KEY,
    response: token,
  });
  if (ip) body.set("remoteip", ip);

  const response = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    },
  );

  if (!response.ok) return false;
  const result = (await response.json()) as { success?: boolean };
  return result.success === true;
}

async function sendViaSendGrid(payload: {
  to: string;
  from: string;
  subject: string;
  text: string;
  replyTo: string;
}): Promise<boolean> {
  const apiKey = process.env.SENDGRID_API_KEY?.trim();
  if (!apiKey) return false;

  const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      personalizations: [{ to: [{ email: payload.to }] }],
      from: { email: fromAddress(payload.from), name: "Seal Labs" },
      reply_to: { email: payload.replyTo },
      subject: payload.subject,
      content: [{ type: "text/plain", value: payload.text }],
    }),
    signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
  });

  return response.ok || response.status === 202;
}

async function sendViaSmtp(payload: {
  to: string;
  from: string;
  subject: string;
  text: string;
  replyTo: string;
}): Promise<boolean> {
  const host = process.env.SMTP_HOST?.trim();
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.trim();
  if (!host || !user || !pass) return false;

  const transporter = nodemailer.createTransport({
    host,
    port: Number(process.env.SMTP_PORT || "587"),
    secure: process.env.SMTP_SECURE === "true",
    auth: { user, pass },
    connectionTimeout: FETCH_TIMEOUT_MS,
    socketTimeout: FETCH_TIMEOUT_MS,
  });

  await transporter.sendMail({
    to: payload.to,
    from: payload.from,
    replyTo: payload.replyTo,
    subject: payload.subject,
    text: payload.text,
  });
  return true;
}

export async function POST(request: Request) {
  let body: ContactBody;
  try {
    body = (await request.json()) as ContactBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (body.website?.trim()) {
    return NextResponse.json({ ok: true });
  }

  const name = body.name?.trim() || "";
  const email = body.email?.trim() || "";
  const company = body.company?.trim() || "";
  const message = body.message?.trim() || "";

  if (!name || name.length > 120) {
    return NextResponse.json({ error: "Please provide your name." }, { status: 400 });
  }
  if (!email || !isValidEmail(email) || email.length > 200) {
    return NextResponse.json({ error: "Please provide a valid email." }, { status: 400 });
  }
  if (!message || message.length < 10 || message.length > 5000) {
    return NextResponse.json(
      { error: "Please include a message (at least 10 characters)." },
      { status: 400 },
    );
  }

  const ip =
    request.headers.get("cf-connecting-ip") ||
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    null;

  const turnstileOk = await verifyTurnstile(body.turnstileToken || "", ip);
  if (!turnstileOk) {
    return NextResponse.json(
      { error: "Security check failed. Please try again." },
      { status: 400 },
    );
  }

  const to = process.env.CONTACT_TO_EMAIL?.trim() || SUPPORT_EMAIL;
  const from =
    process.env.CONTACT_FROM_EMAIL?.trim() || `Seal Labs <noreply@seallabs.io>`;
  const subject = `Seal Labs enquiry from ${name}`;
  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    company ? `Company: ${company}` : null,
    "",
    message,
  ]
    .filter(Boolean)
    .join("\n");

  let sent = false;
  try {
    sent =
      (await sendViaSendGrid({ to, from, subject, text, replyTo: email })) ||
      (await sendViaSmtp({ to, from, subject, text, replyTo: email }));
  } catch (err) {
    console.error("[contact] send failed", err);
  }

  if (!sent) {
    console.error("[contact] No email transport configured or send failed");
    return NextResponse.json(
      {
        error: `Contact delivery is not configured yet. Please email ${SUPPORT_EMAIL} directly.`,
      },
      { status: 503 },
    );
  }

  return NextResponse.json({ ok: true });
}
