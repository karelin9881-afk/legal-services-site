"use client";

import * as React from "react";

type FaqItem = {
  q: string;
  a: string;
};

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  return (
    <div className="legal-faq__accordion">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const panelId = `faq-panel-${index}`;
        const buttonId = `faq-button-${index}`;

        return (
          <div key={item.q} className="legal-faq__item" data-open={isOpen ? "true" : "false"}>
            <button
              id={buttonId}
              className="legal-faq__question"
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpenIndex(isOpen ? null : index)}
            >
              <span>{item.q}</span>
              <span className="legal-faq__plus" aria-hidden="true" />
            </button>

            <div
              id={panelId}
              className="legal-faq__answer"
              role="region"
              aria-labelledby={buttonId}
              inert={!isOpen}
            >
              <div className="legal-faq__answer-inner">
                <p>{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
