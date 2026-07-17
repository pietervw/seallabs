/**
 * Canonical public origin for Seal Labs — apex host, no www.
 * Prefer NEXT_PUBLIC_SITE_URL in deploy envs; fall back to production.
 */

const DEFAULT_SITE_URL = "https://seallabs.io";

function normalizeSiteUrl(value: string | undefined): string {
  if (!value) return DEFAULT_SITE_URL;

  try {
    const parsed = new URL(value);
    const host = parsed.hostname.toLowerCase();
    parsed.hostname = host.startsWith("www.") ? host.slice(4) : host;
    return parsed.origin;
  } catch {
    return DEFAULT_SITE_URL;
  }
}

export const SITE_URL = normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);
export const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME?.trim() || "Seal Labs";
export const SITE_LEGAL_NAME =
  process.env.NEXT_PUBLIC_SITE_LEGAL_NAME?.trim() || "Seal Labs";
export const SITE_TAGLINE =
  "Software studio building trustworthy SaaS, identity tools, and field operations platforms.";
export const SITE_DESCRIPTION =
  "Seal Labs designs and ships production SaaS — education tools, identity verification, applicant tracking, field audit workflows, and APIs — with calm craft and durable engineering.";
export const SITE_LOCALE = "en_AU";
export const SUPPORT_EMAIL =
  process.env.NEXT_PUBLIC_SUPPORT_EMAIL?.trim() || "hello@seallabs.io";

export const UMAMI_SRC = process.env.NEXT_PUBLIC_UMAMI_SRC?.trim() || "";
export const UMAMI_WEBSITE_ID = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID?.trim() || "";

const GA_MEASUREMENT_ID_PATTERN = /^G-[A-Z0-9]+$/;

export function resolveGaMeasurementId(raw?: string): string {
  const v = (raw ?? process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "").trim();
  if (!v) return "";
  return GA_MEASUREMENT_ID_PATTERN.test(v) ? v : "";
}

export const GA_MEASUREMENT_ID = resolveGaMeasurementId();

export const TURNSTILE_SECRET_KEY = process.env.TURNSTILE_SECRET_KEY?.trim() || "";

export function absoluteUrl(path: string = "/"): string {
  if (!path || path === "/") return `${SITE_URL}/`;
  return path.startsWith("/") ? `${SITE_URL}${path}` : `${SITE_URL}/${path}`;
}

export function getSocialSameAs(): string[] {
  return [
    process.env.NEXT_PUBLIC_SOCIAL_GITHUB,
    process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN,
    process.env.NEXT_PUBLIC_SOCIAL_X,
    process.env.NEXT_PUBLIC_SOCIAL_EMAIL,
  ]
    .map((v) => v?.trim())
    .filter((v): v is string => Boolean(v));
}
