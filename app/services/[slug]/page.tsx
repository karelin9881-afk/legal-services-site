import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getServiceBySlug, services } from "@/content/services";
import { siteConfig } from "@/content/siteConfig";
import { buttonClassName } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ContactForm } from "@/components/forms/contact-form";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
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
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return (
    <div className="bg-white">
      <section className="border-b border-black/5">
        <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: "Главная", href: "/" },
              { label: "Услуги", href: "/#services" },
              { label: service.title },
            ]}
          />

          <div className="mt-6 grid gap-8 md:grid-cols-2 md:items-start">
            <div>
              <h1 className="text-3xl font-semibold leading-tight tracking-tight text-black sm:text-4xl">
                {service.title}
              </h1>
              <p className="mt-3 text-sm leading-relaxed text-black/70 sm:text-base">
                {service.shortDescription}
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link href="#contacts" className={buttonClassName({ size: "md" })}>
                  Получить консультацию
                </Link>
                <a
                  href={`tel:${siteConfig.contacts.phoneHref}`}
                  className={buttonClassName({ variant: "outline", size: "md" })}
                >
                  Позвонить
                </a>
              </div>

              <div className="mt-6 text-xs text-black/55">
                {service.detailNote}
              </div>
            </div>

            <Card className="bg-white">
              <div className="p-6">
                <div className="text-sm font-semibold text-black">Что входит в услугу</div>
                <ul className="mt-4 space-y-2">
                  {service.bullets.map((b) => (
                    <li key={b} className="flex gap-3 text-sm text-black/75">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-brand" aria-hidden="true" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 rounded-lg bg-brand/5 p-4">
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

      <section id="contacts" className="border-b border-black/5">
        <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 md:items-start">
            <div>
              <h2 className="text-2xl font-semibold text-black">Заявка на консультацию</h2>
              <p className="mt-2 text-sm text-black/70">
                Опишите ситуацию. Мы вернемся с рекомендациями и списком документов.
              </p>

              <div className="mt-6 space-y-3 rounded-lg border border-black/10 bg-white p-6">
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
              <div className="p-6">
                <div className="text-sm font-semibold text-black">Кратко о задаче</div>
                <div className="mt-1 text-sm text-black/65">
                  Автоподстановка темы: <span className="font-semibold">{service.title}</span>
                </div>
                <div className="mt-5">
                  <ContactForm
                    formSource="service-contact-form"
                    serviceSlug={service.slug}
                    serviceTitle={service.title}
                    initialMessage={`Тема: ${service.title}\n\nСитуация:\n`}
                  />
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-lg border border-black/10 bg-white p-6">
          <div className="text-sm font-semibold text-black">FAQ по услуге</div>
          <div className="mt-2 text-sm text-black/70">
            Коротко отвечаем на самые частые вопросы про <span className="font-semibold">{service.title}</span>.
          </div>

          <div className="mt-6">
            <Accordion>
              {service.faq.map((item) => (
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

