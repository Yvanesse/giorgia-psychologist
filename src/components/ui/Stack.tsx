import type { ComponentPropsWithoutRef, ElementType } from "react";

import { cn } from "./utils";

type StackGap = "xs" | "sm" | "md" | "lg" | "xl";
type StackDirection = "vertical" | "horizontal";

type StackProps<T extends ElementType = "div"> = {
  as?: T;
  gap?: StackGap;
  direction?: StackDirection;
  align?: "start" | "center" | "end" | "stretch";
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className">;

const gaps: Record<StackGap, string> = {
  xs: "gap-2",
  sm: "gap-3",
  md: "gap-5",
  lg: "gap-8",
  xl: "gap-12",
};

const directions: Record<StackDirection, string> = {
  vertical: "flex-col",
  horizontal: "flex-row flex-wrap",
};

const alignments = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
};

export function Stack<T extends ElementType = "div">({
  as,
  gap = "md",
  direction = "vertical",
  align = "stretch",
  className,
  ...props
}: StackProps<T>) {
  const Component = as ?? "div";

  return (
    <Component
      className={cn("flex", directions[direction], gaps[gap], alignments[align], className)}
      {...props}
    />
  );
}
