import * as React from "react";
import { cn } from "@/lib/utils";

type AccordionProps = {
  className?: string;
  children: React.ReactNode;
};

export function Accordion({ className, children }: AccordionProps) {
  return <div className={cn("space-y-3", className)}>{children}</div>;
}

export function AccordionItem({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <details
      className={cn(
        "group rounded-lg border border-black/10 bg-white transition hover:border-black/20 open:border-brand/30 open:shadow-soft",
        className
      )}
    >
      {children}
    </details>
  );
}

export function AccordionTrigger({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <summary
      className={cn(
        "flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold text-black marker:hidden",
        className
      )}
    >
      <span className="min-w-0">{children}</span>
      <span
        aria-hidden="true"
        className="relative h-5 w-5 shrink-0 rounded-full border border-black/15 transition group-open:rotate-45 group-open:border-brand/40"
      >
        <span className="absolute left-1/2 top-1/2 h-0.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/70" />
        <span className="absolute left-1/2 top-1/2 h-2.5 w-0.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/70" />
      </span>
    </summary>
  );
}

export function AccordionContent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("px-5 pb-5 text-sm leading-relaxed text-black/75", className)}>
      {children}
    </div>
  );
}

