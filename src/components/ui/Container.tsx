import type { ComponentPropsWithoutRef, ElementType } from "react";

import { cn } from "./utils";

type ContainerVariant = "narrow" | "default" | "wide";

type ContainerProps<T extends ElementType = "div"> = {
  as?: T;
  variant?: ContainerVariant;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className">;

const variants: Record<ContainerVariant, string> = {
  narrow: "max-w-4xl",
  default: "max-w-[1600px]",
  wide: "max-w-[1680px]",
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
      className={cn("mx-auto w-full px-4 sm:px-6 lg:px-8", variants[variant], className)}
      {...props}
    />
  );
}
