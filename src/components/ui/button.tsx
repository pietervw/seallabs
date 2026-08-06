import { cva, type VariantProps } from "class-variance-authority";
import Link from "next/link";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex cursor-pointer items-center justify-center gap-2 border-2 border-ink font-display font-bold transition-[transform,background-color] duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none",
  {
    variants: {
      variant: {
        primary:
          "bg-brand text-brand-ink shadow-brutal hover:bg-brand-hover hover:shadow-brutal-lg hover:-translate-x-px hover:-translate-y-px",
        secondary:
          "bg-paper text-ink shadow-brutal hover:bg-paper-muted hover:shadow-brutal-lg hover:-translate-x-px hover:-translate-y-px",
      },
      size: {
        sm: "h-10 rounded-lg px-4 text-sm",
        md: "h-12 rounded-xl px-6 text-base",
        lg: "h-14 rounded-xl px-8 text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

type ButtonVariantProps = VariantProps<typeof buttonVariants>;

type ButtonAsButton = ButtonVariantProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsLink = ButtonVariantProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button({
  className,
  variant,
  size,
  href,
  ...props
}: ButtonProps) {
  const classes = cn(buttonVariants({ variant, size }), className);

  if (href) {
    return (
      <Link
        href={href}
        className={classes}
        {...(props as Omit<
          React.AnchorHTMLAttributes<HTMLAnchorElement>,
          "href" | "className"
        >)}
      />
    );
  }

  return (
    <button
      className={classes}
      {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    />
  );
}
