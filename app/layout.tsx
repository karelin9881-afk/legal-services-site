import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { siteConfig } from "@/content/siteConfig";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: "Юридические услуги | Профессиональная помощь",
    template: "%s | Юридические услуги",
  },
  description:
    "Юридическая помощь в жилищных спорах и взыскании ущерба. Досудебное урегулирование и представительство в суде.",
  alternates: {
    canonical: siteConfig.siteUrl.replace(/\/$/, "") + "/",
  },
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: siteConfig.siteUrl.replace(/\/$/, "") + "/",
    title: "Юридические услуги | Профессиональная помощь",
    description:
      "Юридическая помощь в жилищных спорах и взыскании ущерба. Досудебное урегулирование и представительство в суде.",
    siteName: "Юридические услуги",
  },
  twitter: {
    card: "summary_large_image",
    title: "Юридические услуги | Профессиональная помощь",
    description:
      "Юридическая помощь в жилищных спорах и взыскании ущерба. Досудебное урегулирование и представительство в суде.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "LegalService",
  name: siteConfig.brand.name,
  url: siteConfig.siteUrl,
  areaServed: "Россия",
  serviceType: [
    "Жилищные споры",
    "Залив жилых помещений",
    "Споры по долгам за ЖКУ",
    "Досудебное урегулирование",
    "Представительство в суде",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className="bg-white text-black antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-white focus:px-3 focus:py-2 focus:text-black"
        >
          Перейти к содержимому
        </a>
        <Header />
        <main id="main" className="min-h-[60vh]">
          {children}
        </main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}

