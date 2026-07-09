import * as React from "react";
import { cn } from "@/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline";
  size?: "sm" | "md";
};

export function Button({
  className,
  variant = "default",
  size = "md",
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-md font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60 disabled:pointer-events-none disabled:opacity-50";

  const sizes =
    size === "sm"
      ? "h-9 px-3 text-sm"
      : "h-11 px-5 text-sm";

  const variants =
    variant === "outline"
      ? "border border-black/20 bg-white text-black hover:bg-black/5"
      : "bg-brand text-white hover:bg-brand/90";

  return <button className={cn(base, sizes, variants, className)} {...props} />;
}

