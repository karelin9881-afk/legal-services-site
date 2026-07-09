import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getServiceBySlug } from "@/content/services";
import { siteConfig } from "@/content/siteConfig";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ContactForm } from "@/components/forms/contact-form";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {
      title: "Услуга | Юридические услуги",
      description: "Юридическая помощь",
    };
  }

  const title = `${service.title}`;
  const canonical = `${siteConfig.siteUrl.replace(/\/$/, "")}/services/${service.slug}`;

  return {
    title,
    description: service.metaDescription,
    alternates: { canonical },
    openGraph: {
      title,
      description: service.metaDescription,
      type: "article",
      url: canonical,
      locale: "ru_RU",
      siteName: siteConfig.brand.name,
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const serviceFaq: Array<{ q: string; a: string }> =
    slug === "zaliv-zhilyh-pomeshcheniy-v-mkd"
      ? [
          {
            q: "Что делать сразу после залива?",
            a: "Зафиксируйте повреждения (акт/фото/видео), обеспечьте доступ к осмотру и соберите документы по обращению в управляющую организацию. Дальше мы поможем собрать доказательную базу для установления виновника.",
          },
          {
            q: "Как устанавливается виновник залива?",
            a: "Обычно это зависит от источника протечки и причин. Собираются документы от УК/ТСЖ, проводятся осмотры, при необходимости — экспертиза. Мы подбираем доказательства под вашу ситуацию.",
          },
          {
            q: "Можно ли взыскать моральный вред?",
            a: "В отдельных случаях суд учитывает моральные последствия и обстоятельства. Мы оценим перспективы и сформируем позицию так, чтобы аргументы были в связке с доказательствами.",
          },
          {
            q: "Сколько длится процесс?",
            a: "Срок зависит от стадии и объема доказательств. Дадим реалистичные ориентиры после первичной оценки документов и подскажем, что ускоряет дело.",
          },
        ]
      : [
          {
            q: "Можно ли оспорить задолженность за ЖКУ?",
            a: "Да. Мы проверяем основания начислений, документы, период и корректность расчета. Если есть нарушения — формируем правовую позицию для оспаривания.",
          },
          {
            q: "Что делать с судебным решением или приказом?",
            a: "В зависимости от ситуации подбираем процессуальные шаги: возражения, обжалование, восстановление сроков и дальнейшая защита ваших интересов.",
          },
          {
            q: "Сопровождаете ли исполнительное производство?",
            a: "Да. Помогаем на стадии взыскания: анализируем материалы, контролируем действия приставов/банков, готовим заявления и жалобы при необходимости.",
          },
          {
            q: "Какие документы нужны в первую очередь?",
            a: "Обычно это квитанции/расчеты, документы по лицевому счету, судебные акты (если уже есть) и письма/переписка. Составим список после консультации.",
          },
        ];

  return (
    <div className="bg-white">
      <section className="relative overflow-hidden border-b border-black/5">
        <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
          <Breadcrumbs
            items={[
              { label: "Главная", href: "/" },
              { label: "Услуги", href: "/#services" },
              { label: service.title },
            ]}
          />

          <div className="mt-6 grid gap-8 md:grid-cols-2 md:items-start">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
                Услуга
              </div>
              <h1 className="text-3xl font-semibold leading-tight tracking-tight text-black sm:text-4xl">
                {service.title}
              </h1>
              <p className="mt-3 text-sm leading-relaxed text-black/70 sm:text-base">
                {service.shortDescription}
              </p>

              <div className="mt-7 grid gap-3 sm:flex sm:flex-row">
                <Link href="#contacts" className="inline-flex w-full sm:w-auto">
                  <Button size="md" className="w-full sm:w-auto">Получить консультацию</Button>
                </Link>
                <a href={`tel:${siteConfig.contacts.phoneHref}`} className="inline-flex w-full sm:w-auto">
                  <Button variant="outline" size="md" className="w-full sm:w-auto">
                    Позвонить
                  </Button>
                </a>
              </div>

              <div className="mt-6 rounded-2xl border border-brand/10 bg-brand/5 p-4 text-sm text-black/70">
                {slug === "zaliv-zhilyh-pomeshcheniy-v-mkd"
                  ? "Подходит, если нужна правовая позиция по факту залива: доказательства, виновник, ущерб, штрафы/неустойка."
                  : "Подходит, если вам начислили задолженность за ЖКУ и нужно проверить расчеты, оспорить основания и защититься в суде."}
              </div>
            </div>

            <Card className="bg-white shadow-soft">
              <div className="p-5 sm:p-6">
                <div className="text-sm font-semibold text-black">Что входит в услугу</div>
                <ul className="mt-4 space-y-2">
                  {service.bullets.map((b) => (
                    <li key={b} className="flex gap-3 text-sm text-black/75">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-brand" aria-hidden="true" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 rounded-xl bg-brand/5 p-4">
                  <div className="text-sm font-semibold text-black">Дальше — по ситуации</div>
                  <div className="mt-1 text-sm text-black/65">
                    Мы подскажем, какие документы запрашивать, что лучше подготовить до подачи и как ускорить рассмотрение.
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="border-b border-black/5 bg-slate-50/50">
        <div className="mx-auto grid w-full max-w-6xl gap-4 px-4 py-8 sm:grid-cols-3 sm:px-6 lg:px-8">
          {[
            ["Оценка позиции", "Проверяем документы, сроки и доказательства."],
            ["План действий", "Объясняем риски и выбираем рабочий сценарий."],
            ["Сопровождение", "Готовим документы и ведем коммуникацию."],
          ].map(([title, desc]) => (
            <div key={title} className="rounded-2xl border border-black/10 bg-white p-5">
              <div className="text-sm font-semibold text-black">{title}</div>
              <div className="mt-2 text-sm text-black/65">{desc}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-b border-black/5 bg-white">
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 sm:px-6 sm:py-12 md:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
              Подготовка
            </div>
            <h2 className="mt-2 text-2xl font-semibold text-black">
              Что желательно собрать заранее
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-black/70">
              Полный пакет документов не обязателен для первой консультации, но эти материалы
              помогают быстрее оценить перспективы и выбрать стратегию.
            </p>

            <div className="mt-6 rounded-2xl border border-brand/10 bg-brand/5 p-5">
              <div className="text-sm font-semibold text-black">Итог для клиента</div>
              <p className="mt-2 text-sm leading-relaxed text-black/70">{service.clientResult}</p>
            </div>
          </div>

          <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-soft sm:p-6">
            <ul className="space-y-3">
              {service.documents.map((item) => (
                <li key={item} className="flex gap-3 text-sm text-black/75">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="contacts" className="border-b border-black/5">
        <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 md:items-start">
            <div>
              <h2 className="text-2xl font-semibold text-black">Заявка на консультацию</h2>
              <p className="mt-2 text-sm text-black/70">
                Опишите ситуацию. Мы вернемся с рекомендациями и списком документов.
              </p>

              <div className="mt-6 space-y-3 rounded-2xl border border-black/10 bg-white p-5 sm:p-6">
                <div className="text-sm text-black/70">Телефон</div>
                <a
                  className="block text-base font-semibold text-black"
                  href={`tel:${siteConfig.contacts.phoneHref}`}
                >
                  {siteConfig.contacts.phoneDisplay}
                </a>
                <div className="pt-3 text-sm text-black/70">Email</div>
                <a
                  className="block text-sm font-semibold text-black"
                  href={`mailto:${siteConfig.contacts.email}`}
                >
                  {siteConfig.contacts.email}
                </a>
                <div className="pt-3 text-sm text-black/70">Адрес</div>
                <div className="text-sm font-semibold text-black">{siteConfig.contacts.address}</div>
              </div>
            </div>

            <Card>
              <div className="p-5 sm:p-6">
                <div className="text-sm font-semibold text-black">Кратко о задаче</div>
                <div className="mt-1 text-sm text-black/65">
                  Автоподстановка темы: <span className="font-semibold">{service.title}</span>
                </div>
                <div className="mt-5">
                  <ContactForm initialMessage={`Тема: ${service.title}\n\nСитуация:\n`} />
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <div className="rounded-2xl border border-black/10 bg-white p-5 sm:p-6">
          <div className="text-sm font-semibold text-black">FAQ по услуге</div>
          <div className="mt-2 text-sm text-black/70">
            Коротко отвечаем на самые частые вопросы про <span className="font-semibold">{service.title}</span>.
          </div>

          <div className="mt-6">
            <Accordion>
              {serviceFaq.map((item) => (
                <AccordionItem key={item.q}>
                  <AccordionTrigger>
                    <span className="text-sm">{item.q}</span>
                  </AccordionTrigger>
                  <AccordionContent>{item.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    </div>
  );
}

