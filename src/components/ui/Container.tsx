import type { ComponentPropsWithoutRef, ElementType } from "react";

import { cn } from "./utils";

type ContainerVariant = "narrow" | "default" | "wide";

type ContainerProps<T extends ElementType = "div"> = {
  as?: T;
  variant?: ContainerVariant;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className">;

const variants: Record<ContainerVariant, string> = {
  narrow: "max-w-3xl",
  default: "max-w-6xl",
  wide: "max-w-7xl",
};

export function Container<T extends ElementType = "div">({
  as,
  variant = "default",
  className,
  ...props
}: ContainerProps<T>) {
  const Component = as ?? "div";

  return (
    <Component
      className={cn("mx-auto w-full px-6 sm:px-8 lg:px-10", variants[variant], className)}
      {...props}
    />
  );
}
