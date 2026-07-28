"use client";

export const AnalyticsEvents = {
  VISIT: "visit",
  SIGNUP_STARTED: "signup_started",
  SIGNUP_COMPLETED: "signup_completed",
  ACTIVATION_COMPLETED: "activation_completed",
  CHECKOUT_STARTED: "checkout_started",
  PURCHASE: "purchase",
  SUBSCRIPTION_STARTED: "subscription_started",
  SUBSCRIPTION_CANCELLED: "subscription_cancelled",
  VALUE_DELIVERED: "qualified_enquiry_submitted",
} as const;

type EventData = Record<string, string | number | boolean>;

declare global {
  interface Window {
    umami?: { track: (name: string, data?: EventData) => void };
  }
}

export function trackEvent(name: string, data?: EventData, retries = 12): void {
  if (typeof window === "undefined") return;
  if (window.umami) {
    window.umami.track(name, data);
    return;
  }
  if (retries > 0) {
    window.setTimeout(() => trackEvent(name, data, retries - 1), 250);
  }
}

export function trackActivationOnce(data?: EventData): void {
  const key = "umami:activation-completed";
  try {
    if (window.localStorage.getItem(key)) return;
  } catch {
    // Storage may be unavailable; the event can still be sent.
  }

  const tryTrack = (retries = 12): void => {
    if (window.umami) {
      window.umami.track(AnalyticsEvents.ACTIVATION_COMPLETED, data);
      try {
        window.localStorage.setItem(key, "1");
      } catch {
        // Storage may be unavailable after a successful send.
      }
      return;
    }
    if (retries > 0) window.setTimeout(() => tryTrack(retries - 1), 250);
  };

  tryTrack();
}
