import Link from "next/link";
import { siteConfig } from "@/content/siteConfig";

const footerLegalLinks = [
  ["Политика обработки персональных данных", "/privacy"],
  ["Согласие на обработку персональных данных", "/personal-data-consent"],
];

export function Footer() {
  return (
    <footer className="legal-footer">
      <div className="legal-footer__inner">
        <div className="legal-footer__grid">
          <div className="legal-footer__brand">
            <div className="legal-footer__title">{siteConfig.brand.name}</div>
            <div className="legal-footer__text">
              Помогаем в жилищных спорах и вопросах ЖКХ: консультации, досудебное урегулирование и представительство в суде.
            </div>
            <div className="legal-footer__text">Адрес: {siteConfig.contacts.address}</div>
          </div>

          <div className="legal-footer__column">
            <div className="legal-footer__title">Контакты</div>
            <a
              className="legal-footer__link"
              href={`tel:${siteConfig.contacts.phoneHref}`}
            >
              {siteConfig.contacts.phoneDisplay}
            </a>
            <a
              className="legal-footer__link"
              href={`mailto:${siteConfig.contacts.email}`}
            >
              {siteConfig.contacts.email}
            </a>
          </div>

          <div className="legal-footer__column">
            <div className="legal-footer__title">Разделы</div>
            <div className="legal-footer__nav">
              {[
                ["О юристе", "/#about"],
                ["Услуги", "/#services"],
                ["FAQ", "/#faq"],
                ["Контакты", "/#contacts"],
              ].map(([label, href]) => (
                <Link key={href} href={href} className="legal-footer__link">
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="legal-footer__bottom">
          <span>Документы и реквизиты.</span>
          <div className="legal-footer__bottom-links">
            {footerLegalLinks.map(([label, href]) => (
              <Link key={href} className="legal-footer__legal-link" href={href}>
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
