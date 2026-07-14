"use client";

import Link from "next/link";
import { Button } from "@/components/Button/Button";
import { ConsultationIcon, PhoneIcon } from "@/components/ButtonIcon/ButtonIcon";
import { siteConfig } from "@/content/siteConfig";
import { cn } from "@/lib/utils";
import * as React from "react";

const navItems = [
  { href: "/#about", label: "О юристе" },
  { href: "/#services", label: "Услуги" },
  { href: "/#why", label: "Преимущества" },
  { href: "/#steps", label: "Этапы" },
  { href: "/#faq", label: "FAQ" },
  { href: "/#contacts", label: "Контакты" },
];

export function Header() {
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    if (!isOpen) {
      return;
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  return (
    <header className="legal-header">
      <div className="legal-header__inner">
        <Link
          href="/"
          className="legal-header__logo"
          aria-label="На главную"
          onClick={() => setIsOpen(false)}
        >
          <span className="legal-header__mark" aria-hidden="true">
            Ю
          </span>
          <span className="legal-header__brand">
            <span className="legal-header__name">{siteConfig.brand.name}</span>
            <span className="legal-header__tagline">Жилищные споры и ЖКХ</span>
          </span>
        </Link>

        <nav
          aria-label="Основная навигация"
          className="legal-header__nav"
        >
          {navItems.map((it) => (
            <Link
              key={it.href}
              href={it.href}
              className="legal-header__nav-link"
            >
              {it.label}
            </Link>
          ))}
        </nav>

        <div className="legal-header__actions">
          <a
            href={`tel:${siteConfig.contacts.phoneHref}`}
            className="legal-header__phone"
          >
            {siteConfig.contacts.phoneDisplay}
          </a>
          <Button
            asLink
            href="/#contacts"
            variant="compact"
            size="sm"
            icon={<ConsultationIcon />}
            className="legal-header__button"
          >
            Консультация
          </Button>
        </div>

        <button
          type="button"
          className="legal-header__burger"
          aria-label={isOpen ? "Закрыть меню" : "Открыть меню"}
          aria-controls="mobile-menu"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((value) => !value)}
        >
          <span className="legal-header__burger-label">{isOpen ? "Закрыть меню" : "Открыть меню"}</span>
          <span className="legal-header__burger-lines" aria-hidden="true">
            <span className={cn(isOpen && "is-open-top")} />
            <span className={cn(isOpen && "is-open-middle")} />
            <span className={cn(isOpen && "is-open-bottom")} />
          </span>
        </button>
      </div>

      {isOpen ? (
        <div id="mobile-menu" className="legal-header__mobile">
          <div className="legal-header__mobile-inner">
            <nav aria-label="Мобильная навигация" className="legal-header__mobile-nav">
              {navItems.map((it) => (
                <Link
                  key={it.href}
                  href={it.href}
                  className="legal-header__mobile-link"
                  onClick={() => setIsOpen(false)}
                >
                  {it.label}
                </Link>
              ))}
            </nav>

            <div className="legal-header__mobile-actions">
              <Button
                asLink
                href={`tel:${siteConfig.contacts.phoneHref}`}
                variant="secondary"
                size="md"
                icon={<PhoneIcon />}
                className="legal-header__mobile-phone"
                onClick={() => setIsOpen(false)}
              >
                {siteConfig.contacts.phoneDisplay}
              </Button>
              <Button
                asLink
                href="/#contacts"
                variant="primary"
                size="md"
                icon={<ConsultationIcon />}
                className="legal-header__mobile-button"
                onClick={() => setIsOpen(false)}
              >
                Получить консультацию
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}

