import Image from "next/image";
import type { CSSProperties } from "react";
import { Button } from "@/components/Button/Button";
import { ArrowRightIcon, PhoneIcon } from "@/components/ButtonIcon/ButtonIcon";
import { siteConfig } from "@/content/siteConfig";
import { services } from "@/content/services";
import { ContactForm } from "@/components/forms/contact-form";
import { FaqAccordion } from "@/components/sections/faq-accordion";

type AboutIconType = "person" | "shield" | "pen" | "document";
type BenefitIconType = "person" | "shield" | "result";

const aboutIcons: AboutIconType[] = ["person", "shield", "pen"];
const benefitIcons: BenefitIconType[] = ["person", "shield", "shield", "result"];

function AboutIcon({ type }: { type: AboutIconType }) {
  switch (type) {
    case "person":
      return (
        <svg viewBox="0 0 24 24" role="img" aria-label="Разбор ситуации">
          <path d="M9.5 11.2a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4Z" />
          <path d="M3.8 19.2c.5-3.1 2.4-5 5.7-5s5.2 1.9 5.7 5" />
          <path d="M17.8 8.1v5.2" />
          <path d="M20.4 10.7h-5.2" />
        </svg>
      );
    case "shield":
      return (
        <svg viewBox="0 0 24 24" role="img" aria-label="Защита интересов">
          <path d="M12 3.5 18.2 6v5.1c0 4-2.4 7.6-6.2 9.4-3.8-1.8-6.2-5.4-6.2-9.4V6L12 3.5Z" />
          <path d="m9.1 12 2 2 4-4.5" />
        </svg>
      );
    case "pen":
      return (
        <svg viewBox="0 0 24 24" role="img" aria-label="Правовая стратегия">
          <path d="m4.6 16.9 1.2 2.9 3-.9L18.9 8.8l-4.1-4.1L4.6 16.9Z" />
          <path d="m13.6 6 4.1 4.1" />
          <path d="m4.8 19.7 3.8-3.8" />
        </svg>
      );
    case "document":
      return (
        <svg viewBox="0 0 24 24" role="img" aria-label="Документы и риски">
          <path d="M6.5 3.8h8.1l3 3v13.4H6.5V3.8Z" />
          <path d="M14.5 3.8v3.1h3.1" />
          <path d="M9.4 11h5.2" />
          <path d="M9.4 14.2h5.2" />
          <path d="M9.4 17.4h3.2" />
        </svg>
      );
  }
}

function BenefitIcon({ type }: { type: BenefitIconType }) {
  switch (type) {
    case "person":
      return (
        <svg viewBox="0 0 24 24" role="img" aria-label="Индивидуальный подход">
          <path d="M12 11.1a3.4 3.4 0 1 0 0-6.8 3.4 3.4 0 0 0 0 6.8Z" />
          <path d="M5.4 20c.6-4 2.8-6.2 6.6-6.2s6 2.2 6.6 6.2" />
          <path d="M4 12.5v3.2" />
          <path d="M20 12.5v3.2" />
        </svg>
      );
    case "shield":
      return (
        <svg viewBox="0 0 24 24" role="img" aria-label="Честный план">
          <path d="M12 3.2 18.8 6v5.2c0 4.3-2.7 7.8-6.8 9.6-4.1-1.8-6.8-5.3-6.8-9.6V6L12 3.2Z" />
          <path d="m8.8 12 2.2 2.2 4.5-4.8" />
        </svg>
      );
    case "result":
      return (
        <svg viewBox="0 0 24 24" role="img" aria-label="Работа на результат">
          <path d="M12 11.2a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4Z" />
          <path d="M6.3 19.6c.6-3.6 2.5-5.4 5.7-5.4s5.1 1.8 5.7 5.4" />
          <path d="M3.5 11.3h1.8" />
          <path d="M18.7 11.3h1.8" />
          <path d="M5.2 7.3 3.9 6" />
          <path d="m18.8 7.3 1.3-1.3" />
        </svg>
      );
  }
}

export default function HomePage() {
  return (
    <div className="legal-page">
      <section className="legal-hero">
        <div className="legal-page__container legal-hero__inner">
          <div className="legal-hero__content">
            <div className="legal-hero__label">Юридическая поддержка в жилищных спорах</div>
            <h1 className="legal-hero__title">{siteConfig.hero.title}</h1>
            <p className="legal-hero__text">{siteConfig.hero.subtitle}</p>

            <div className="legal-hero__actions">
              <Button asLink href="#contacts" variant="primary" size="lg" icon={<ArrowRightIcon />}>
                Получить консультацию
              </Button>
              <Button
                asLink
                href={`tel:${siteConfig.contacts.phoneHref}`}
                variant="secondary"
                size="lg"
                icon={<PhoneIcon />}
              >
                Позвонить
              </Button>
            </div>

          </div>

          <div className="legal-hero__visual" aria-hidden="true">
            <div className="legal-hero__image-wrap">
              <Image
                className="legal-hero__image"
                src="/images/hero-housing-law.png"
                alt=""
                width={650}
                height={488}
                priority
                sizes="(max-width: 900px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="about-lawyer" data-reveal>
        <div className="legal-page__container">
          <div className="about-lawyer__panel">
            <div className="about-lawyer__intro">
              <h2 className="about-lawyer__title">{siteConfig.about.title}</h2>
              <p className="about-lawyer__text">
                Консультация проходит структурно: разбор фактов, документов, рисков и вариантов решения.
              </p>
            </div>

            <div className="about-lawyer__items">
              {siteConfig.about.bullets.map((item, index) => (
                <div key={item} className="about-lawyer__item">
                  <span className="about-lawyer__icon">
                    <AboutIcon type={aboutIcons[index] ?? "document"} />
                  </span>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="legal-services" data-reveal>
        <div className="legal-page__container legal-services__inner">
          <div className="legal-services__head">
            <h2 className="legal-services__title">Услуги</h2>
            <p className="legal-services__text">
              Каждая услуга открывается отдельной страницей и может быть расширена по мере подготовки материалов.
            </p>
          </div>

          <div className="legal-services__grid">
            {services.map((service, index) => (
              <article
                key={service.slug}
                className={`service-card ${index === 0 ? "service-card--flood" : "service-card--debt"}`}
                data-reveal
                style={{ "--reveal-delay": `${index * 90}ms` } as CSSProperties}
              >
                <div className="service-card__content">
                  <span className="service-card__icon-mini" aria-hidden="true">
                    {index === 0 ? (
                      <svg viewBox="0 0 24 24">
                        <path d="M12 3.4 18.3 6v5.1c0 4-2.5 7.5-6.3 9.2-3.8-1.7-6.3-5.2-6.3-9.2V6L12 3.4Z" />
                        <path d="m8.8 12 3.2-3 3.2 3" />
                        <path d="M10 11.1v4h4v-4" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24">
                        <path d="M6.5 4.2h8.3l2.7 2.8v12.8h-11V4.2Z" />
                        <path d="M14.7 4.2V7h2.8" />
                        <path d="M9.4 10.6h5.2" />
                        <path d="M9.4 13.5h4" />
                        <path d="M12 17.4h4" />
                      </svg>
                    )}
                  </span>
                  <h3 className="service-card__title">{service.title}</h3>
                  <div className="service-card__accent-line" />
                  <p className="service-card__text">{service.shortDescription}</p>

                  <ul className="service-card__list">
                    {service.bullets.map((item) => (
                      <li key={item} className="service-card__item">
                        <span className="service-card__check" aria-hidden="true">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="service-card__visual" aria-hidden="true">
                  {index === 0 ? (
                    <Image
                      className="service-card__image"
                      src="/images/service-zaliv-shield.png"
                      alt=""
                      width={228}
                      height={228}
                      sizes="220px"
                      unoptimized
                    />
                  ) : index === 1 ? (
                    <Image
                      className="service-card__image service-card__image--document"
                      src="/images/service-dolg-zhku.png"
                      alt=""
                      width={220}
                      height={220}
                      sizes="220px"
                      unoptimized
                    />
                  ) : (
                    <div className="service-card__document">
                      <span />
                      <span />
                      <span />
                    </div>
                  )}
                </div>

                <Button
                  asLink
                  href={`/services/${service.slug}`}
                  variant="primary"
                  size="md"
                  icon={<ArrowRightIcon />}
                  className="service-card__button"
                >
                  Подробнее
                </Button>
                <div className="service-card__decor" aria-hidden="true" />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="why" className="legal-benefits" data-reveal>
        <div className="legal-page__container">
          <h2 className="legal-benefits__title">{siteConfig.why.title}</h2>
          <div className="legal-benefits__grid">
            {siteConfig.why.items.map((item, index) => (
              <article
                key={item.title}
                className="legal-benefits__card benefit-card"
                data-reveal
                style={{ "--reveal-delay": `${index * 80}ms` } as CSSProperties}
              >
                <span className="legal-benefits__icon">
                  <BenefitIcon type={benefitIcons[index] ?? "shield"} />
                </span>
                <div className="legal-benefits__content">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="steps" className="legal-steps" data-reveal>
        <div className="legal-page__container">
          <h2 className="legal-steps__title">{siteConfig.steps.title}</h2>
          <div className="legal-steps__timeline">
            {siteConfig.steps.items.map((step, index) => (
              <article
                key={step.title}
                className="legal-steps__item"
                data-reveal
                style={{ "--reveal-delay": `${index * 90}ms` } as CSSProperties}
              >
                <div className="legal-steps__number">{String(index + 1).padStart(2, "0")}</div>
                <div className="legal-steps__body">
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="legal-faq" data-reveal>
        <div className="legal-page__container">
          <div className="legal-faq__layout">
            <div className="legal-faq__intro">
              <h2>{siteConfig.faq.title}</h2>
              <p>Отвечаем на вопросы заранее, чтобы вы принимали решения увереннее.</p>
              <div className="legal-faq__help">
                <span aria-hidden="true">✓</span>
                <h3>Не нашли свой вопрос?</h3>
                <p>Опишите ситуацию в форме. Подскажем, какие документы нужны и с чего лучше начать.</p>
              </div>
            </div>

            <FaqAccordion items={siteConfig.faq.items} />
          </div>
        </div>
      </section>

      <section id="contacts" className="legal-contacts" data-reveal>
        <div className="legal-page__container">
          <div className="legal-contacts__grid">
            <div className="legal-contacts__info">
              <h2>Контакты</h2>
              <p>Опишите ситуацию в форме — мы вернемся с рекомендациями и списком документов.</p>

              <div className="legal-contacts__card">
                <div>
                  <span>Телефон</span>
                  <a href={`tel:${siteConfig.contacts.phoneHref}`}>{siteConfig.contacts.phoneDisplay}</a>
                </div>
                <div>
                  <span>Email</span>
                  <a href={`mailto:${siteConfig.contacts.email}`}>{siteConfig.contacts.email}</a>
                </div>
                <div>
                  <span>Адрес</span>
                  <strong>{siteConfig.contacts.address}</strong>
                </div>
              </div>

              <p className="legal-contacts__note">
                Онлайн и офлайн. Работаем по России, отвечаем по срокам и списку документов.
              </p>
            </div>

            <div className="legal-contacts__form">
              <h2>Получить консультацию</h2>
              <p>Ответим после обработки заявки в ближайшее рабочее время.</p>
              <ContactForm formSource="home-contact-form" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
