import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md border-2 border-ink px-2.5 py-0.5 font-display text-xs font-semibold",
  {
    variants: {
      variant: {
        brand: "bg-brand text-brand-ink",
        muted: "bg-paper-muted text-ink",
        outline: "bg-paper text-ink",
      },
    },
    defaultVariants: {
      variant: "brand",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}
