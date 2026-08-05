import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "./utils";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

type ButtonBaseProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  className?: string;
};

type ButtonAsButton = ButtonBaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
  };

type ButtonAsLink = ButtonBaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
    disabled?: boolean;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

const variants: Record<ButtonVariant, string> = {
  primary:
    "border-primary bg-primary text-white hover:bg-primary-strong focus-visible:outline-primary disabled:border-zinc-300 disabled:bg-zinc-300 disabled:text-zinc-500 aria-disabled:border-zinc-300 aria-disabled:bg-zinc-300 aria-disabled:text-zinc-500",
  secondary:
    "border-ink bg-ink text-white hover:bg-zinc-700 focus-visible:outline-ink disabled:border-zinc-300 disabled:bg-zinc-300 disabled:text-zinc-500 aria-disabled:border-zinc-300 aria-disabled:bg-zinc-300 aria-disabled:text-zinc-500",
  outline:
    "border-border bg-transparent text-ink hover:border-primary hover:text-primary focus-visible:outline-primary disabled:border-zinc-200 disabled:text-zinc-400 aria-disabled:border-zinc-200 aria-disabled:text-zinc-400",
  ghost:
    "border-transparent bg-transparent text-ink hover:bg-surface-muted hover:text-primary focus-visible:outline-primary disabled:text-zinc-400 aria-disabled:text-zinc-400",
};

const sizes: Record<ButtonSize, string> = {
  sm: "min-h-10 px-4 text-sm",
  md: "min-h-12 px-6 text-base",
  lg: "min-h-14 px-8 text-lg",
};

const spinner = (
  <span
    aria-hidden="true"
    className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent motion-reduce:animate-none"
  />
);

export function Button({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  className,
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-full border font-medium tracking-tight transition-colors duration-200 motion-reduce:transition-none",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4",
    "disabled:cursor-not-allowed disabled:opacity-100 aria-disabled:pointer-events-none aria-disabled:cursor-not-allowed",
    variants[variant],
    sizes[size],
    className,
  );

  if ("href" in props && props.href) {
    const { disabled, href, ...anchorProps } = props;

    return (
      <a
        aria-disabled={disabled || loading ? true : undefined}
        className={classes}
        href={disabled || loading ? undefined : href}
        {...anchorProps}
      >
        {loading ? spinner : null}
        {children}
      </a>
    );
  }

  const { disabled, type, ...buttonProps } = props as ButtonAsButton;

  return (
    <button
      className={classes}
      disabled={disabled || loading}
      type={type ?? "button"}
      {...buttonProps}
    >
      {loading ? spinner : null}
      {children}
    </button>
  );
}
