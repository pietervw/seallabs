"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import {
  AnalyticsEvents,
  trackActivationOnce,
  trackEvent,
} from "@/lib/analytics";
import { TURNSTILE_SITE_KEY } from "@/lib/public-config";
import { cn } from "@/lib/utils";

declare global {
  interface Window {
    turnstile?: {
      render: (
        el: string | HTMLElement,
        options: {
          sitekey: string;
          callback?: (token: string) => void;
          "error-callback"?: () => void;
          "expired-callback"?: () => void;
        },
      ) => string;
      reset: (widgetId?: string) => void;
    };
  }
}

type Status = "idle" | "submitting" | "success" | "error";

const TURNSTILE_UNAVAILABLE =
  "Security check unavailable. Please refresh or email us directly.";

const fieldClass =
  "w-full rounded-xl border-2 border-ink bg-paper px-4 py-3 font-medium text-ink shadow-brutal outline-none transition-shadow placeholder:text-ink-muted focus:shadow-brutal-brand-lg disabled:opacity-50";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const turnstileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!TURNSTILE_SITE_KEY || !turnstileRef.current) return;

    const node = turnstileRef.current;
    let cancelled = false;

    const render = () => {
      if (cancelled || !window.turnstile || node.dataset.rendered === "1") return;
      window.turnstile.render(node, {
        sitekey: TURNSTILE_SITE_KEY,
        callback: setTurnstileToken,
        "error-callback": () => setTurnstileToken(""),
        "expired-callback": () => setTurnstileToken(""),
      });
      node.dataset.rendered = "1";
    };

    const onScriptError = () => {
      if (cancelled) return;
      setStatus("error");
      setMessage(TURNSTILE_UNAVAILABLE);
    };

    if (window.turnstile) {
      render();
      return () => {
        cancelled = true;
      };
    }

    const scriptId = "cf-turnstile-script";
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.src =
        "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      script.async = true;
      document.head.appendChild(script);
    }

    script.addEventListener("load", render);
    script.addEventListener("error", onScriptError);
    const retry = window.setTimeout(() => {
      if (window.turnstile) render();
    }, 0);

    return () => {
      cancelled = true;
      window.clearTimeout(retry);
      script?.removeEventListener("load", render);
      script?.removeEventListener("error", onScriptError);
    };
  }, []);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setMessage("");

    const form = event.currentTarget;
    const data = new FormData(form);

    if (TURNSTILE_SITE_KEY && !turnstileToken) {
      setStatus("error");
      setMessage("Please complete the security check.");
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(data.get("name") || ""),
          email: String(data.get("email") || ""),
          company: String(data.get("company") || ""),
          message: String(data.get("message") || ""),
          website: String(data.get("website") || ""),
          turnstileToken,
        }),
      });

      let payload: { error?: string } = {};
      try {
        payload = (await response.json()) as { error?: string };
      } catch {
        payload = {};
      }

      if (!response.ok) {
        setStatus("error");
        setMessage(payload.error || "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      const honeypot = String(data.get("website") || "").trim();
      if (!honeypot) {
        trackActivationOnce({ source: "contact_form" });
        trackEvent(AnalyticsEvents.VALUE_DELIVERED, { source: "contact_form" });
      }
      setMessage("Thanks — we will reply within one business day.");
      form.reset();
      setTurnstileToken("");
      window.turnstile?.reset();
    } catch {
      setStatus("error");
      setMessage("Network error. Please email us directly.");
    }
  }

  return (
    <form
      className="flex flex-col gap-5 rounded-2xl border-2 border-ink bg-paper p-6 shadow-brutal"
      onSubmit={onSubmit}
      noValidate
    >
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="sr-only"
        aria-hidden="true"
      />

      <div>
        <label
          htmlFor="name"
          className="mb-1.5 block text-sm font-semibold text-ink"
        >
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          maxLength={120}
          className={fieldClass}
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="mb-1.5 block text-sm font-semibold text-ink"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          maxLength={200}
          className={fieldClass}
        />
      </div>

      <div>
        <label
          htmlFor="company"
          className="mb-1.5 block text-sm font-semibold text-ink"
        >
          Company (optional)
        </label>
        <input
          id="company"
          name="company"
          type="text"
          maxLength={160}
          className={fieldClass}
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="mb-1.5 block text-sm font-semibold text-ink"
        >
          How can we help?
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          maxLength={5000}
          className={cn(fieldClass, "resize-y")}
        />
      </div>

      {TURNSTILE_SITE_KEY ? (
        <div className="cf-turnstile" ref={turnstileRef} />
      ) : null}

      <Button
        type="submit"
        disabled={
          status === "submitting" ||
          Boolean(TURNSTILE_SITE_KEY && !turnstileToken)
        }
      >
        {status === "submitting" ? "Sending…" : "Send"}
      </Button>

      {message ? (
        <p
          className={cn(
            "text-sm font-semibold",
            status === "error" ? "text-red-600" : "text-ink",
          )}
          role="status"
          aria-live="polite"
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}
