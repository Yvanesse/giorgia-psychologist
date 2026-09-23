import type { ComponentPropsWithoutRef, ElementType } from "react";

import { cn } from "./utils";

type SectionSpacing = "default" | "compact" | "spacious";

type SectionProps<T extends ElementType = "section"> = {
  as?: T;
  spacing?: SectionSpacing;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className">;

const spacing: Record<SectionSpacing, string> = {
  compact: "py-10 sm:py-14 lg:py-16",
  default: "py-14 sm:py-20 lg:py-24",
  spacious: "py-16 sm:py-24 lg:py-28",
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
