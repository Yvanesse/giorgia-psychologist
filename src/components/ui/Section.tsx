import type { ComponentPropsWithoutRef, ElementType } from "react";

import { cn } from "./utils";

type SectionSpacing = "default" | "compact" | "spacious";

type SectionProps<T extends ElementType = "section"> = {
  as?: T;
  spacing?: SectionSpacing;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className">;

const spacing: Record<SectionSpacing, string> = {
  compact: "py-12 sm:py-16 lg:py-20",
  default: "py-16 sm:py-24 lg:py-28",
  spacious: "py-20 sm:py-28 lg:py-36",
};

export function Section<T extends ElementType = "section">({
  as,
  spacing: spacingKey = "default",
  className,
  ...props
}: SectionProps<T>) {
  const Component = as ?? "section";

  return <Component className={cn(spacing[spacingKey], className)} {...props} />;
}
