import type * as React from "react";
import { cn } from "@/lib/utils";

type ButtonIconProps = React.SVGProps<SVGSVGElement> & {
  title?: string;
};

function iconProps(className?: string) {
  return {
    className: cn("button-icon", className),
    viewBox: "0 0 24 24",
    fill: "none",
    focusable: "false",
    "aria-hidden": true,
  } as const;
}

export function ArrowRightIcon({ className, ...props }: ButtonIconProps) {
  return (
    <svg {...iconProps(className)} {...props}>
      <path d="M5 12h13" />
      <path d="m13.4 6.8 5.2 5.2-5.2 5.2" />
    </svg>
  );
}

export function PhoneIcon({ className, ...props }: ButtonIconProps) {
  return (
    <svg {...iconProps(className)} {...props}>
      <path d="M8.1 4.7 9.7 8c.3.6.1 1.2-.4 1.6l-1.1.8c1 2.1 2.7 3.8 4.8 4.8l.8-1.1c.4-.5 1-.7 1.6-.4l3.3 1.6c.6.3.9.9.8 1.6-.2 1.4-1.4 2.4-2.8 2.4C10.2 19.3 4.7 13.8 4.7 7.3c0-1.4 1-2.6 2.4-2.8.7-.1 1.3.2 1.6.8Z" />
    </svg>
  );
}

export function ConsultationIcon({ className, ...props }: ButtonIconProps) {
  return (
    <svg {...iconProps(className)} {...props}>
      <path d="M6.6 5.8h10.8c.8 0 1.4.6 1.4 1.4v6.1c0 .8-.6 1.4-1.4 1.4h-4.7l-3.8 3.1v-3.1H6.6c-.8 0-1.4-.6-1.4-1.4V7.2c0-.8.6-1.4 1.4-1.4Z" />
      <path d="M8.6 9.1h6.8" />
      <path d="M8.6 11.8h4.7" />
    </svg>
  );
}

export function SendIcon({ className, ...props }: ButtonIconProps) {
  return (
    <svg {...iconProps(className)} {...props}>
      <path d="M4.3 11.6 19.5 4.7l-4.6 14.6-3.1-5.2-4.9 3.1 1.4-4.7-4-1Z" />
      <path d="m8.4 12.5 6.3-4.1" />
    </svg>
  );
}
