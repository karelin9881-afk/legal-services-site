import Link from "next/link";
import { siteConfig } from "@/content/siteConfig";
import { services } from "@/content/services";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ContactForm } from "@/components/forms/contact-form";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function HomePage() {
  function whyDescription(item: string) {
    switch (item) {
      case "Индивидуальный подход":
        return "Разбираем вашу ситуацию по фактам и документам, подбираем стратегию под цель.";
      case "Большой опыт":
        return "Работаем с типовыми и сложными кейсами в жилищных спорах и ЖКХ.";
      case "Честность":
        return "Без обещаний «гарантированного результата»: объясняем риски и варианты.";
      case "Работа на результат":
        return "Фиксируем план, готовим документы и ведем дело до итогового результата.";
      default:
        return "Мы работаем аккуратно, быстро и по существу.";
    }
  }

  return (
    <div className="bg-white">
      {/* 1. Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 pb-14 pt-10 sm:px-6 lg:grid-cols-[1.05fr_0.75fr] lg:px-8 lg:pb-20 lg:pt-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center rounded-full border border-black/10 bg-white px-4 py-2 text-xs text-black/70">
              Юридическая поддержка в жилищных спорах
            </div>
            <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-tight text-black sm:text-5xl">
              {siteConfig.hero.title}
            </h1>
            <p className="mt-4 text-base leading-relaxed text-black/70 sm:text-lg">
              {siteConfig.hero.subtitle}
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link href="#contacts" className="inline-flex">
                <Button size="md">Получить консультацию</Button>
              </Link>
              <a href={`tel:${siteConfig.contacts.phoneHref}`} className="inline-flex">
                <Button variant="outline" size="md">
                  Позвонить
                </Button>
              </a>
            </div>

            <div className="mt-8 text-sm text-black/60">
              Мы ответим быстро и по делу. Без скрытых условий.
            </div>
          </div>

          <div className="relative rounded-[2rem] border border-black/10 bg-white p-6 shadow-soft lg:p-8">
            <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-brand/40 to-transparent" />
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
              Практика
            </div>
            <div className="mt-4 text-2xl font-semibold leading-tight text-black">
              Жилищные споры, ЖКХ, взыскание ущерба
            </div>
            <p className="mt-4 text-sm leading-relaxed text-black/68">
              Берём на себя правовую позицию, документы, переговоры и представительство.
              Вы понимаете риски, сроки и следующий шаг.
            </p>

            <div className="mt-8 grid gap-3">
              {["Первичный разбор документов", "Досудебная позиция", "Представительство в суде"].map((item) => (
                <div key={item} className="rounded-2xl bg-brand/5 px-4 py-3 text-sm text-black/78">
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-8 border-t border-black/10 pt-5 text-sm text-black/60">
              Конфиденциально. По договору. Без навязанных услуг.
            </div>
          </div>

          <div className="pointer-events-none absolute -right-20 top-10 hidden h-56 w-56 rounded-full bg-brand/5 blur-2xl lg:block" />
          <div className="pointer-events-none absolute -left-24 top-60 hidden h-56 w-56 rounded-full bg-brand/5 blur-2xl lg:block" />
        </div>
      </section>

      {/* 2. О юристе */}
      <section id="about" className="border-t border-black/5">
        <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-10 md:grid-cols-2 md:items-start">
            <div>
              <h2 className="text-2xl font-semibold text-black">{siteConfig.about.title}</h2>
              <p className="mt-3 text-sm text-black/70">
                Консультация проходит структурно: разбор фактов, документов, рисков и вариантов решения.
              </p>
            </div>
            <ul className="space-y-3">
              {siteConfig.about.bullets.map((b) => (
                <li key={b} className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-brand" aria-hidden="true" />
                  <span className="text-sm text-black/75">{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 3. Услуги */}
      <section id="services" className="border-t border-black/5">
        <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-black">Услуги</h2>
              <p className="mt-2 text-sm text-black/70">
                Каждая услуга открывается отдельной страницей и может быть расширена по мере подготовки материалов.
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {services.map((s) => (
              <Card key={s.slug} className="transition-shadow hover:shadow-soft">
                <div className="flex h-full flex-col p-6">
                  <h3 className="text-lg font-semibold text-black">{s.title}</h3>
                  <p className="mt-2 text-sm text-black/70">{s.shortDescription}</p>

                  <ul className="mt-4 space-y-2">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex gap-3 text-sm text-black/75">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-brand" aria-hidden="true" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-6">
                    <Link href={`/services/${s.slug}`}>
                      <Button size="sm">Подробнее</Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Почему выбирают нас */}
      <section id="why" className="border-t border-black/5 bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-black">{siteConfig.why.title}</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-4">
            {siteConfig.why.items.map((item) => (
              <div key={item} className="rounded-2xl border border-black/10 bg-white p-5">
                <div className="text-sm font-semibold text-black">{item}</div>
                <div className="mt-2 text-sm text-black/65">
                  {whyDescription(item)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Этапы работы */}
      <section id="steps" className="border-t border-black/5">
        <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-black">{siteConfig.steps.title}</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-4">
            {siteConfig.steps.items.map((it, idx) => (
              <div
                key={it.title}
                className="rounded-2xl border border-black/10 bg-white p-5"
              >
                <div className="text-xs font-semibold tracking-wide text-black/55">
                  0{idx + 1}
                </div>
                <div className="mt-2 text-sm font-semibold text-black">{it.title}</div>
                <div className="mt-2 text-sm text-black/65">{it.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Частые вопросы */}
      <section id="faq" className="border-t border-black/5 bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold text-black">{siteConfig.faq.title}</h2>
              <p className="mt-2 text-sm text-black/70">
                Отвечаем на вопросы заранее, чтобы вы принимали решения увереннее.
              </p>
            </div>
          </div>

          <div className="mt-8 max-w-3xl">
            <Accordion>
              {siteConfig.faq.items.map((item, idx) => (
                <AccordionItem key={item.q}>
                  <AccordionTrigger>
                    <span className="text-sm">{item.q}</span>
                    <span className="ml-2 text-xs font-semibold text-brand">#{idx + 1}</span>
                  </AccordionTrigger>
                  <AccordionContent>{item.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* 7. Контакты + 8. Форма */}
      <section id="contacts" className="border-t border-black/5">
        <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-10 md:grid-cols-2 md:items-start">
            <div>
              <h2 className="text-2xl font-semibold text-black">Контакты</h2>
              <p className="mt-2 text-sm text-black/70">
                Опишите ситуацию в форме — мы вернемся с рекомендациями и списком документов.
              </p>

              <div className="mt-6 space-y-3 rounded-2xl border border-black/10 bg-white p-6">
                <div className="text-sm text-black/70">Телефон</div>
                <a className="block text-base font-semibold text-black" href={`tel:${siteConfig.contacts.phoneHref}`}>
                  {siteConfig.contacts.phoneDisplay}
                </a>
                <div className="pt-3 text-sm text-black/70">Email</div>
                <a className="block text-sm font-semibold text-black" href={`mailto:${siteConfig.contacts.email}`}>
                  {siteConfig.contacts.email}
                </a>
                <div className="pt-3 text-sm text-black/70">Адрес</div>
                <div className="text-sm font-semibold text-black">{siteConfig.contacts.address}</div>
              </div>

              <div className="mt-6 text-xs text-black/55">
                Онлайн и офлайн. Работаем по России, отвечаем по срокам и списку документов.
              </div>
            </div>

            <div className="rounded-2xl border border-black/10 bg-white p-6">
              <div className="text-sm font-semibold text-black">Получить консультацию</div>
              <div className="mt-1 text-sm text-black/70">
                Ответим после обработки заявки в ближайшее рабочее время.
              </div>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

