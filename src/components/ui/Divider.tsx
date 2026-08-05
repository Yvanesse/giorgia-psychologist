import type { ComponentPropsWithoutRef } from "react";

import { cn } from "./utils";

type DividerProps = ComponentPropsWithoutRef<"hr">;

export function Divider({ className, ...props }: DividerProps) {
  return <hr className={cn("border-0 border-t border-border", className)} {...props} />;
}
