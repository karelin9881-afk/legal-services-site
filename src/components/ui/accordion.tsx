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
        "group rounded-2xl border border-black/10 bg-white",
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
        "cursor-pointer list-none px-5 py-4 text-left text-sm font-semibold text-black",
        className
      )}
    >
      {children}
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
    <div className={cn("px-5 pb-5 text-sm text-black/75", className)}>
      {children}
    </div>
  );
}

