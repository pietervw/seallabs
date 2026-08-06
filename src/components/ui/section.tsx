import { cn } from "@/lib/utils";

export function Container({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("mx-auto w-full max-w-5xl px-4 sm:px-6", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function Section({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <section className={cn("py-16 md:py-24", className)} {...props}>
      {children}
    </section>
  );
}

export function SectionHeading({
  title,
  description,
  className,
  id,
}: {
  title: string;
  description?: string;
  className?: string;
  id?: string;
}) {
  return (
    <div className={cn("mx-auto mb-12 max-w-2xl text-center", className)}>
      <h2
        id={id}
        className="font-display text-3xl font-extrabold text-ink md:text-5xl"
      >
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-lg text-ink-muted md:text-xl">{description}</p>
      ) : null}
    </div>
  );
}

export function PageIntro({
  title,
  description,
  eyebrow,
  className,
}: {
  title: string;
  description?: string;
  eyebrow?: string;
  className?: string;
}) {
  return (
    <div className={cn("mb-10 max-w-2xl", className)}>
      {eyebrow ? (
        <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-ink-muted">
          {eyebrow}
        </p>
      ) : null}
      <h1 className="font-display text-4xl font-extrabold text-ink md:text-5xl">
        {title}
      </h1>
      {description ? (
        <p className="mt-4 text-lg text-ink-muted">{description}</p>
      ) : null}
    </div>
  );
}
