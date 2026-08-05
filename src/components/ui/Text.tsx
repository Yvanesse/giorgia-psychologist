import type { ComponentPropsWithoutRef, ElementType } from "react";

import { cn } from "./utils";

type TextVariant = "lead" | "body" | "small" | "caption" | "muted";

type TextProps<T extends ElementType = "p"> = {
  as?: T;
  variant?: TextVariant;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className">;

const variants: Record<TextVariant, string> = {
  lead: "text-xl leading-8 text-ink-soft sm:text-2xl sm:leading-9",
  body: "text-lg leading-8 text-ink-soft sm:text-xl sm:leading-9",
  small: "text-base leading-7 text-ink-soft sm:text-lg sm:leading-8",
  caption: "text-sm font-medium uppercase leading-5 tracking-[0.16em] text-ink-muted",
  muted: "text-lg leading-8 text-ink-muted sm:text-xl sm:leading-9",
};

export function Text<T extends ElementType = "p">({
  as,
  variant = "body",
  className,
  ...props
}: TextProps<T>) {
  const Component = as ?? "p";

  return <Component className={cn(variants[variant], className)} {...props} />;
}
