"use client";

import { useEffect } from "react";

/** Shared Escape + body class lock for menus/modals. */
export function useOverlayLock(
  open: boolean,
  onClose: () => void,
  bodyClass: string,
) {
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.classList.add(bodyClass);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.classList.remove(bodyClass);
    };
  }, [open, onClose, bodyClass]);
}
