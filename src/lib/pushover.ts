/**
 * Pushover ops alerts. Missing config / API errors never throw.
 * Env: PUSHOVER_API_TOKEN + PUSHOVER_USER_KEY (both required to enable).
 */

import {
  PUSHOVER_API_TOKEN,
  PUSHOVER_USER_KEY,
  SITE_NAME,
} from "@/lib/config";

const PUSHOVER_URL = "https://api.pushover.net/1/messages.json";
/** Shorter than contact email timeouts — fire-and-forget ops path. */
const PUSHOVER_TIMEOUT_MS = 5_000;

function maskEmail(email: string): string {
  const [local, domain] = email.split("@");
  if (!domain) return "****";
  const maskedLocal =
    local.length > 1
      ? local[0] + "*".repeat(Math.min(local.length - 1, 7))
      : "*";
  return `${maskedLocal}@${domain}`;
}

function perthTimestamp(): string {
  return new Date().toLocaleString("en-AU", { timeZone: "Australia/Perth" });
}

/** Never throws — returns false on any failure. */
export async function sendPushoverNotification(options: {
  title: string;
  message: string;
  sound?: string;
}): Promise<boolean> {
  try {
    if (!PUSHOVER_API_TOKEN || !PUSHOVER_USER_KEY) {
      console.warn(
        "[pushover] skipped — set PUSHOVER_API_TOKEN and PUSHOVER_USER_KEY to enable",
      );
      return false;
    }

    const payload = new URLSearchParams({
      token: PUSHOVER_API_TOKEN,
      user: PUSHOVER_USER_KEY,
      title: options.title,
      message: options.message,
      priority: "0",
    });
    if (options.sound) payload.set("sound", options.sound);

    const response = await fetch(PUSHOVER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: payload.toString(),
      signal: AbortSignal.timeout(PUSHOVER_TIMEOUT_MS),
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => "");
      console.error("[pushover] API error", {
        status: response.status,
        error: errorText,
        title: options.title,
      });
      return false;
    }

    console.log("[pushover] sent", { title: options.title });
    return true;
  } catch (error) {
    console.error("[pushover] failed", {
      error: error instanceof Error ? error.message : "Unknown error",
      title: options.title,
    });
    return false;
  }
}

export async function sendContactNotification(input: {
  name: string;
  email: string;
  company: string;
  message: string;
}): Promise<boolean> {
  return sendPushoverNotification({
    title: `✉️ ${SITE_NAME} contact`,
    message: [
      `New contact form on ${SITE_NAME}.`,
      "",
      `Name: ${input.name}`,
      `Email: ${maskEmail(input.email)}`,
      input.company ? `Company: ${input.company}` : null,
      `Message: ${input.message.slice(0, 200)}`,
      `Time: ${perthTimestamp()}`,
    ]
      .filter(Boolean)
      .join("\n"),
    sound: "incoming",
  });
}
