"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

import { TURNSTILE_SITE_KEY } from "@/lib/public-config";

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

    return () => {
      cancelled = true;
      script?.removeEventListener("load", render);
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
    <form className="contact-form" onSubmit={onSubmit} noValidate>
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hp"
        aria-hidden="true"
      />

      <div className="field">
        <label htmlFor="name">Name</label>
        <input id="name" name="name" type="text" required maxLength={120} />
      </div>

      <div className="field">
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" required maxLength={200} />
      </div>

      <div className="field">
        <label htmlFor="company">Company (optional)</label>
        <input id="company" name="company" type="text" maxLength={160} />
      </div>

      <div className="field">
        <label htmlFor="message">How can we help?</label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          maxLength={5000}
        />
      </div>

      {TURNSTILE_SITE_KEY ? (
        <div className="cf-turnstile" ref={turnstileRef} />
      ) : null}

      <button
        type="submit"
        className="btn btn--primary"
        disabled={status === "submitting"}
      >
        {status === "submitting" ? "Sending…" : "Send message"}
      </button>

      {message ? (
        <p
          className={`form-status form-status--${status}`}
          role="status"
          aria-live="polite"
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}
