import Image from "next/image";
import Link from "next/link";

import logoMascot from "../../public/logo-mascot.png";
import { cn } from "@/lib/utils";

const TEXT_SIZES = {
  sm: "text-lg",
  hero: "text-4xl sm:text-5xl md:text-6xl",
} as const;

const MASCOT = {
  className: "h-8 w-8 sm:h-9 sm:w-9",
  sizes: "36px",
} as const;

export function BrandMark({
  className,
  size = "sm",
  href = "/",
  onClick,
  priority = false,
  showMascot = true,
  linked = true,
}: {
  className?: string;
  size?: keyof typeof TEXT_SIZES;
  href?: string;
  onClick?: () => void;
  priority?: boolean;
  showMascot?: boolean;
  linked?: boolean;
}) {
  const content = (
    <>
      {showMascot ? (
        <Image
          src={logoMascot}
          alt=""
          className={cn("shrink-0 object-contain", MASCOT.className)}
          sizes={MASCOT.sizes}
          priority={priority}
        />
      ) : null}
      <span
        className={cn(
          "inline-flex items-baseline gap-0.5 font-display font-extrabold text-ink",
          TEXT_SIZES[size],
        )}
      >
        Seal
        <span className="rounded-md border-2 border-ink bg-brand px-1.5 text-ink">
          Labs
        </span>
      </span>
    </>
  );

  const classes = cn("inline-flex items-center gap-2", className);

  if (!linked) {
    return <span className={classes}>{content}</span>;
  }

  return (
    <Link
      href={href}
      aria-label="Seal Labs home"
      onClick={onClick}
      className={classes}
    >
      {content}
    </Link>
  );
}
