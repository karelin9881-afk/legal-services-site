import { cn } from "@/lib/utils";
import type { ButtonSize, ButtonVariant } from "./Button.types";

export function buttonClassName({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: ButtonVariant | "default" | "outline";
  size?: ButtonSize | "md" | "sm";
  className?: string;
} = {}) {
  const normalizedVariant =
    variant === "default" ? "primary" : variant === "outline" ? "secondary" : variant;
  const normalizedSize = size === "md" || size === "sm" || size === "lg" ? size : "md";

  return cn("btn", `btn--${normalizedVariant}`, `btn--${normalizedSize}`, className);
}
