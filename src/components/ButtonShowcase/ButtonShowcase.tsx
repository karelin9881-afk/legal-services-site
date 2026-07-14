import type * as React from "react";
import { Button } from "@/components/Button/Button";
import {
  ArrowRightIcon,
  ConsultationIcon,
  PhoneIcon,
  SendIcon,
} from "@/components/ButtonIcon/ButtonIcon";
import type { ButtonSize, ButtonVariant } from "@/components/Button/Button.types";

const rows: Array<{
  title: string;
  variant: ButtonVariant;
  size: ButtonSize;
  icon: React.ReactNode;
  label: string;
}> = [
  {
    title: "Primary",
    variant: "primary",
    size: "lg",
    icon: <ArrowRightIcon />,
    label: "Получить консультацию",
  },
  {
    title: "Secondary",
    variant: "secondary",
    size: "lg",
    icon: <PhoneIcon />,
    label: "Позвонить",
  },
  {
    title: "Soft",
    variant: "soft",
    size: "sm",
    icon: <ArrowRightIcon />,
    label: "Подробнее",
  },
  {
    title: "Compact",
    variant: "compact",
    size: "sm",
    icon: <ConsultationIcon />,
    label: "Консультация",
  },
  {
    title: "Submit",
    variant: "primary",
    size: "lg",
    icon: <SendIcon />,
    label: "Отправить заявку",
  },
];

const states = [
  { title: "default", className: "" },
  { title: "hover", className: "is-hover" },
  { title: "active", className: "is-active" },
  { title: "focus", className: "is-focus" },
] as const;

export function ButtonShowcase() {
  return (
    <section className="button-showcase">
      <div className="button-showcase__inner">
        <div className="button-showcase__head">
          <span className="button-showcase__eyebrow">Button system</span>
          <h1>Премиальные кнопки лендинга</h1>
          <p>
            Варианты и состояния кнопок, перенесенные в живые React/SCSS-компоненты.
          </p>
        </div>

        <div className="button-showcase__matrix">
          <div className="button-showcase__row button-showcase__row--header">
            <div>Тип</div>
            {states.map((state) => (
              <div key={state.title}>{state.title}</div>
            ))}
          </div>

          {rows.map((row) => (
            <div className="button-showcase__row" key={row.title}>
              <div className="button-showcase__type">{row.title}</div>
              {states.map((state) => (
                <div className="button-showcase__cell" key={state.title}>
                  <Button
                    variant={row.variant}
                    size={row.size}
                    icon={row.icon}
                    className={state.className}
                  >
                    {row.label}
                  </Button>
                </div>
              ))}
            </div>
          ))}

          <div className="button-showcase__row">
            <div className="button-showcase__type">Disabled</div>
            <div className="button-showcase__cell">
              <Button variant="primary" size="lg" icon={<SendIcon />} disabled>
                Отправить заявку
              </Button>
            </div>
            <div className="button-showcase__cell">
              <Button variant="secondary" size="lg" icon={<PhoneIcon />} disabled>
                Позвонить
              </Button>
            </div>
            <div className="button-showcase__cell">
              <Button variant="soft" size="sm" icon={<ArrowRightIcon />} disabled>
                Подробнее
              </Button>
            </div>
            <div className="button-showcase__cell">
              <Button variant="compact" size="sm" icon={<ConsultationIcon />} disabled>
                Консультация
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
