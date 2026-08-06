import Image from "next/image";
import Link from "next/link";

import logoMascot from "../../public/logo-mascot.png";
import { SITE_NAME } from "@/lib/config";
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
}: {
  className?: string;
  size?: keyof typeof TEXT_SIZES;
  href?: string;
  onClick?: () => void;
  priority?: boolean;
  showMascot?: boolean;
}) {
  return (
    <Link
      href={href}
      aria-label={`${SITE_NAME} home`}
      onClick={onClick}
      className={cn("inline-flex items-center gap-2", className)}
    >
      {showMascot ? (
        <Image
          src={logoMascot}
          alt=""
          className={cn("shrink-0 object-contain", MASCOT.className)}
          sizes={MASCOT.sizes}
          priority={priority}
          quality={90}
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
    </Link>
  );
}
