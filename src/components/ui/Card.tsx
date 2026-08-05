import type { ComponentPropsWithoutRef, ElementType } from "react";

import { cn } from "./utils";

type CardVariant = "default" | "bordered" | "interactive";

type CardProps<T extends ElementType = "article"> = {
  as?: T;
  variant?: CardVariant;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className">;

const variants: Record<CardVariant, string> = {
  default: "bg-surface",
  bordered: "border border-border bg-surface",
  interactive:
    "border border-border bg-surface transition-colors duration-200 hover:border-primary/40 hover:bg-surface-muted focus-within:border-primary motion-reduce:transition-none",
};

export function Card<T extends ElementType = "article">({
  as,
  variant = "default",
  className,
  ...props
}: CardProps<T>) {
  const Component = as ?? "article";

  return <Component className={cn("rounded-3xl p-6 sm:p-8", variants[variant], className)} {...props} />;
}
