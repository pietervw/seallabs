"use client";

import { useEffect, useState } from "react";

type TypeLineProps = {
  text: string;
  className?: string;
  startDelayMs?: number;
};

/** Progressive typewriter; full text kept in sr-only + static fallback for reduced motion. */
export function TypeLine({ text, className, startDelayMs = 200 }: TypeLineProps) {
  const [shown, setShown] = useState("");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let i = 0;
    let intervalId: number | undefined;
    const startId = window.setTimeout(() => {
      intervalId = window.setInterval(() => {
        i += 1;
        setShown(text.slice(0, i));
        if (i >= text.length && intervalId) {
          window.clearInterval(intervalId);
        }
      }, 28);
    }, startDelayMs);

    return () => {
      window.clearTimeout(startId);
      if (intervalId) window.clearInterval(intervalId);
    };
  }, [text, startDelayMs]);

  return (
    <p className={className}>
      <span className="sr-only">{text}</span>
      <span className="type-line__static" aria-hidden="true">
        {text}
      </span>
      <span className="type-line__live" aria-hidden="true">
        {shown || "\u00A0"}
        <span className="cursor" />
      </span>
    </p>
  );
}
