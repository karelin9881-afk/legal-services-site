"use client";

import { usePathname } from "next/navigation";
import * as React from "react";

export function RevealController() {
  const pathname = usePathname();

  React.useEffect(() => {
    let observer: IntersectionObserver | null = null;

    const frameId = window.requestAnimationFrame(() => {
      const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));

      if (!("IntersectionObserver" in window)) {
        elements.forEach((element) => element.classList.add("is-visible"));
        return;
      }

      const currentObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              currentObserver.unobserve(entry.target);
            }
          });
        },
        {
          rootMargin: "0px 0px -12% 0px",
          threshold: 0.12,
        },
      );
      observer = currentObserver;

      elements.forEach((element) => {
        if (element.classList.contains("is-visible")) {
          return;
        }

        currentObserver.observe(element);
      });
    });

    return () => {
      window.cancelAnimationFrame(frameId);
      observer?.disconnect();
    };
  }, [pathname]);

  return null;
}
