import type { ComponentPropsWithoutRef, ElementType } from "react";

import { cn } from "./utils";

type BadgeProps<T extends ElementType = "span"> = {
  as?: T;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className">;

export function Badge<T extends ElementType = "span">({ as, className, ...props }: BadgeProps<T>) {
  const Component = as ?? "span";

  return (
    <Component
      className={cn(
        "inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary",
        className,
      )}
      {...props}
    />
  );
}
