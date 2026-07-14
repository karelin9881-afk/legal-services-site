"use client";

import type * as React from "react";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/ButtonIcon/ButtonIcon";
import { buttonClassName } from "./buttonClassName";
import type { ButtonProps } from "./Button.types";

const externalHrefPattern = /^(https?:|mailto:|tel:)/;

export function Button({
  variant = "primary",
  size = "md",
  icon,
  asLink,
  href,
  children,
  className,
  disabled,
  type = "button",
  target,
  rel,
  ariaLabel,
  onClick,
}: ButtonProps) {
  const content = (
    <>
      <span className="btn__text">{children}</span>
      <span className="btn__icon-wrap" aria-hidden="true">
        <span className="btn__icon">{icon ?? <ArrowRightIcon />}</span>
      </span>
    </>
  );
  const classes = buttonClassName({ variant, size, className });

  if ((asLink || href) && href) {
    const linkRel = target === "_blank" && !rel ? "noreferrer" : rel;

    if (externalHrefPattern.test(href)) {
      return (
        <a
          href={href}
          className={classes}
          target={target}
          rel={linkRel}
          aria-label={ariaLabel}
          aria-disabled={disabled || undefined}
          onClick={disabled ? undefined : onClick}
        >
          {content}
        </a>
      );
    }

    return (
      <Link
        href={href}
        className={classes}
        aria-label={ariaLabel}
        aria-disabled={disabled || undefined}
        onClick={disabled ? undefined : onClick}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      className={classes}
      type={type}
      disabled={disabled}
      aria-label={ariaLabel}
      onClick={onClick as React.MouseEventHandler<HTMLButtonElement>}
    >
      {content}
    </button>
  );
}
