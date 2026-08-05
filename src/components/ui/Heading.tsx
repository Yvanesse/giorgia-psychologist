import type { ComponentPropsWithoutRef, ElementType } from "react";

import { cn } from "./utils";

type HeadingVariant = "display" | "h1" | "h2" | "h3" | "h4";
type HeadingLevel = "h1" | "h2" | "h3" | "h4";

type HeadingProps<T extends ElementType = HeadingLevel> = {
  as?: T;
  variant?: HeadingVariant;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className">;

const variants: Record<HeadingVariant, string> = {
  display: "font-serif text-5xl font-medium leading-[0.95] tracking-[-0.045em] text-ink sm:text-7xl lg:text-8xl",
  h1: "font-serif text-4xl font-medium leading-tight tracking-[-0.035em] text-ink sm:text-6xl",
  h2: "font-serif text-3xl font-medium leading-tight tracking-[-0.03em] text-ink sm:text-5xl",
  h3: "font-sans text-2xl font-semibold leading-tight tracking-[-0.025em] text-ink sm:text-3xl",
  h4: "font-sans text-xl font-semibold leading-snug tracking-[-0.02em] text-ink sm:text-2xl",
};

export function Heading<T extends ElementType = "h2">({
  as,
  variant = "h2",
  className,
  ...props
}: HeadingProps<T>) {
  const Component = as ?? "h2";

  return <Component className={cn(variants[variant], className)} {...props} />;
}
