import Link from "next/link";
import { siteConfig } from "@/content/siteConfig";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "#about", label: "О юристе" },
  { href: "#services", label: "Услуги" },
  { href: "#why", label: "Почему выбирают нас" },
  { href: "#steps", label: "Этапы работы" },
  { href: "#faq", label: "FAQ" },
  { href: "#contacts", label: "Контакты" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-white/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <Link href="/" className="text-sm font-semibold tracking-wide text-black">
            {siteConfig.brand.name}
          </Link>
          <span className="hidden h-6 w-px bg-black/10 sm:block" />
          <div className="hidden text-xs text-black/70 sm:block">
            Минимум воды. Максимум результата.
          </div>
        </div>

        <nav className="hidden flex-wrap items-center gap-x-4 gap-y-2 md:flex">
          {navItems.map((it) => (
            <a
              key={it.href}
              href={it.href}
              className="text-sm text-black/80 transition hover:text-black"
            >
              {it.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a href={`tel:${siteConfig.contacts.phoneHref}`} className="hidden md:inline">
            <Button variant="outline" size="sm">
              Позвонить
            </Button>
          </a>
          <Link href="#contacts" className="inline">
            <Button size="sm">Получить консультацию</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}

