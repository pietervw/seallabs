import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const textLinkClass =
  "font-semibold text-ink underline decoration-brand decoration-2 underline-offset-4 hover:text-ink-muted";
