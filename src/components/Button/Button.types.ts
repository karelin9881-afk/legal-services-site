import type * as React from "react";

export type ButtonVariant = "primary" | "secondary" | "soft" | "compact";
export type ButtonSize = "lg" | "md" | "sm";

export type ButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  asLink?: boolean;
  href?: string;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  target?: string;
  rel?: string;
  ariaLabel?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
};
