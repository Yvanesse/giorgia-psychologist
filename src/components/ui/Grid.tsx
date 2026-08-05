import type { ComponentPropsWithoutRef, ElementType } from "react";

import { cn } from "./utils";

type GridColumns = 1 | 2 | 3;
type GridGap = "sm" | "md" | "lg";

type GridProps<T extends ElementType = "div"> = {
  as?: T;
  columns?: GridColumns;
  gap?: GridGap;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className">;

const columns: Record<GridColumns, string> = {
  1: "grid-cols-1",
  2: "grid-cols-1 md:grid-cols-2",
  3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
};

const gaps: Record<GridGap, string> = {
  sm: "gap-4 sm:gap-5",
  md: "gap-6 sm:gap-8",
  lg: "gap-8 sm:gap-10",
};

export function Grid<T extends ElementType = "div">({
  as,
  columns: columnCount = 3,
  gap = "md",
  className,
  ...props
}: GridProps<T>) {
  const Component = as ?? "div";

  return <Component className={cn("grid", columns[columnCount], gaps[gap], className)} {...props} />;
}
