import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { siteConfig } from "@/content/siteConfig";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: "Судебная помощь | Юрист по жилищным спорам и ЖКХ",
    template: "%s | Судебная помощь",
  },
  description:
    "Юридическая помощь по жилищным спорам, заливам квартир и долгам за ЖКУ. Досудебное урегулирование, документы и представительство в суде.",
  keywords: [
    "юрист по жилищным спорам",
    "залив квартиры",
    "долги за ЖКУ",
    "представительство в суде",
    "досудебное урегулирование",
  ],
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
    title: "Судебная помощь | Юрист по жилищным спорам и ЖКХ",
    description:
      "Юридическая помощь по жилищным спорам, заливам квартир и долгам за ЖКУ. Досудебное урегулирование, документы и представительство в суде.",
    siteName: siteConfig.brand.name,
  },
  twitter: {
    card: "summary_large_image",
    title: "Судебная помощь | Юрист по жилищным спорам и ЖКХ",
    description:
      "Юридическая помощь по жилищным спорам, заливам квартир и долгам за ЖКУ.",
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

