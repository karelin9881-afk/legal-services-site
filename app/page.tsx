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
      <section className="luxury-surface fine-grid relative overflow-hidden border-b border-black/5">
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 pb-12 pt-8 sm:px-6 lg:grid-cols-[1.05fr_0.75fr] lg:px-8 lg:pb-20 lg:pt-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center rounded-full border border-brand/15 bg-white/80 px-4 py-2 text-xs font-medium text-brand shadow-[0_1px_0_rgba(11,45,92,0.08)]">
              Юридическая поддержка в жилищных спорах
            </div>
            <h1 className="mt-5 text-3xl font-semibold leading-tight tracking-tight text-black sm:text-5xl">
              {siteConfig.hero.title}
            </h1>
            <p className="mt-4 text-base leading-relaxed text-black/70 sm:text-lg">
              {siteConfig.hero.subtitle}
            </p>

            <div className="mt-7 grid gap-3 sm:flex sm:flex-row sm:items-center">
              <Link href="#contacts" className="inline-flex w-full sm:w-auto">
                <Button size="md" className="w-full sm:w-auto">Получить консультацию</Button>
              </Link>
              <a href={`tel:${siteConfig.contacts.phoneHref}`} className="inline-flex w-full sm:w-auto">
                <Button variant="outline" size="md" className="w-full sm:w-auto">
                  Позвонить
                </Button>
              </a>
            </div>

            <div className="mt-8 grid gap-2 text-sm text-black/65 sm:grid-cols-3">
              {["Конфиденциально", "По договору", "Без навязанных услуг"].map((item) => (
                <div key={item} className="rounded-2xl border border-black/10 bg-white/80 px-4 py-3">
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-3 text-sm text-black/60">
              Мы ответим быстро и по делу. Без скрытых условий.
            </div>
          </div>

          <div className="relative min-h-[430px] overflow-hidden rounded-2xl border border-brand/15 bg-white shadow-soft sm:rounded-[2rem]">
            <div className="legal-hero-art absolute inset-0" />
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-white/85" />

            <div className="absolute left-5 right-5 top-5 rounded-2xl border border-white/70 bg-white/85 p-4 shadow-soft backdrop-blur sm:left-6 sm:right-auto sm:w-72">
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
                Практика
              </div>
              <div className="mt-2 text-lg font-semibold leading-tight text-black">
                Жилищные споры, ЖКХ, взыскание ущерба
              </div>
              <p className="mt-2 text-sm leading-relaxed text-black/65">
                Документы, переговоры и представительство в суде.
              </p>
            </div>

            <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-black/10 bg-white p-5 shadow-soft">
              <div className="text-sm font-semibold text-black">После консультации вы получите</div>
              <div className="mt-4 grid gap-2 sm:grid-cols-3">
                {["оценку рисков", "список документов", "план действий"].map((item) => (
                  <div key={item} className="rounded-xl bg-brand/5 px-3 py-2 text-sm text-black/75">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pointer-events-none absolute -right-20 top-10 hidden h-56 w-56 rounded-full bg-brand/5 blur-2xl lg:block" />
          <div className="pointer-events-none absolute -left-24 top-60 hidden h-56 w-56 rounded-full bg-brand/5 blur-2xl lg:block" />
        </div>
      </section>

      <section aria-label="Ключевые преимущества" className="border-b border-black/5 bg-white">
        <div className="mx-auto grid w-full max-w-6xl gap-3 px-4 py-4 sm:grid-cols-3 sm:px-6 sm:py-5 lg:px-8">
          {[
            ["Документы", "Проверяем доказательства до подачи позиции"],
            ["Переговоры", "Снижаем риск лишних судебных расходов"],
            ["Суд", "Ведём дело до решения и исполнения"],
          ].map(([title, desc]) => (
            <div key={title} className="rounded-2xl border border-black/10 bg-white px-5 py-4 shadow-[0_10px_24px_rgba(15,23,42,0.04)]">
              <div className="text-sm font-semibold text-black">{title}</div>
              <div className="mt-1 text-sm text-black/60">{desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. О юристе */}
      <section id="about" className="border-b border-black/5">
        <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
          <div className="grid gap-10 md:grid-cols-2 md:items-start">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">О подходе</div>
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
      <section id="services" className="fine-grid border-b border-black/5 bg-slate-50/70">
        <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Практика</div>
              <h2 className="text-2xl font-semibold text-black">Услуги</h2>
              <p className="mt-2 text-sm text-black/70">
                Каждая услуга открывается отдельной страницей и может быть расширена по мере подготовки материалов.
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {services.map((s, idx) => (
              <Card key={s.slug} className="border-brand/10 transition hover:-translate-y-0.5 hover:shadow-soft">
                <div className="flex h-full flex-col p-5 sm:p-6">
                  <div className="mb-5 h-10 w-10 rounded-2xl bg-brand text-center text-sm font-semibold leading-10 text-white shadow-[0_10px_20px_rgba(11,45,92,0.18)]">
                    {idx + 1}
                  </div>
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

                  <div className="mt-5 rounded-2xl bg-slate-50 p-4">
                    <div className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
                      Результат
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-black/70">{s.clientResult}</p>
                  </div>

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

      <section className="border-b border-black/5 bg-white">
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-12 sm:px-6 sm:py-14 md:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
              Что получает клиент
            </div>
            <h2 className="mt-2 text-2xl font-semibold text-black">
              Не просто консультацию, а понятный план действий
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-black/70">
              После разбора вы понимаете, какие документы нужны, какие риски есть
              и какой порядок действий даст лучший шанс на результат.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              ["Правовая оценка", "Проверяем факты, сроки, документы и слабые места позиции."],
              ["Доказательства", "Формируем список документов и запросов, которые усиливают дело."],
              ["Переговоры", "Готовим претензионную позицию без лишнего давления и ошибок."],
              ["Судебная защита", "Выстраиваем аргументацию, требования и процессуальные шаги."],
            ].map(([title, desc]) => (
              <div key={title} className="rounded-2xl border border-black/10 bg-white p-5 shadow-[0_1px_0_rgba(0,0,0,0.03)]">
                <div className="text-sm font-semibold text-black">{title}</div>
                <div className="mt-2 text-sm leading-relaxed text-black/65">{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-black/5 bg-slate-950 text-white">
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-14 sm:px-6 md:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-white/55">
              Ситуации
            </div>
            <h2 className="mt-2 text-2xl font-semibold leading-tight">
              Когда лучше обратиться до суда, а не после ошибки
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/65">
              Чем раньше собраны доказательства и сформирована позиция, тем меньше риск
              потерять сроки, деньги и сильные аргументы.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              ["После залива", "Нужно зафиксировать повреждения, причину и виновника до спора о сумме."],
              ["При спорной задолженности", "Важно проверить период, расчет, основания начисления и сроки."],
              ["Перед судом", "Готовим позицию, требования, доказательства и процессуальные документы."],
              ["На стадии взыскания", "Сопровождаем исполнительное производство и контролируем действия сторон."],
            ].map(([title, desc]) => (
              <div key={title} className="rounded-2xl border border-white/10 bg-white/[0.06] p-5">
                <div className="text-sm font-semibold">{title}</div>
                <div className="mt-2 text-sm leading-relaxed text-white/60">{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Почему выбирают нас */}
      <section id="why" className="border-b border-black/5 bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Доверие</div>
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
      <section id="steps" className="border-b border-black/5 bg-slate-50/50">
        <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Процесс</div>
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
      <section id="faq" className="border-b border-black/5 bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Вопросы</div>
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
      <section id="contacts" className="luxury-surface">
        <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
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

            <div className="rounded-2xl border border-black/10 bg-white p-5 sm:p-6">
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

