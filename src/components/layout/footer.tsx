import Link from "next/link";
import { siteConfig } from "@/content/siteConfig";

export function Footer() {
  return (
    <footer className="border-t border-black/5 bg-white">
      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="space-y-3">
            <div className="text-sm font-semibold">{siteConfig.brand.name}</div>
            <div className="text-sm text-black/70">
              Помогаем в жилищных спорах и вопросах ЖКХ: консультации, досудебное урегулирование и представительство в суде.
            </div>
            <div className="text-sm text-black/70">Адрес: {siteConfig.contacts.address}</div>
          </div>

          <div className="space-y-2">
            <div className="text-sm font-semibold">Контакты</div>
            <a
              className="block text-sm text-black/80 hover:text-black"
              href={`tel:${siteConfig.contacts.phoneHref}`}
            >
              {siteConfig.contacts.phoneDisplay}
            </a>
            <a
              className="block text-sm text-black/80 hover:text-black"
              href={`mailto:${siteConfig.contacts.email}`}
            >
              {siteConfig.contacts.email}
            </a>
          </div>

          <div className="space-y-2">
            <div className="text-sm font-semibold">Разделы</div>
            <div className="text-sm">
              {[
                ["О юристе", "#about"],
                ["Услуги", "#services"],
                ["FAQ", "#faq"],
                ["Контакты", "#contacts"],
              ].map(([label, href]) => (
                <Link key={href} href={href} className="mr-3 text-black/80 hover:text-black">
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-black/5 pt-6 text-xs text-black/60">
          Политика конфиденциальности и юридические реквизиты.
        </div>
      </div>
    </footer>
  );
}

