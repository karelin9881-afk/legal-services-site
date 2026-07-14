import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import "@/styles/legal-landing.scss";
import "@/components/ButtonIcon/ButtonIcon.scss";
import "@/components/Button/Button.scss";
import "@/components/ButtonShowcase/ButtonShowcase.scss";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { RevealController } from "@/components/sections/reveal-controller";
import { siteConfig } from "@/content/siteConfig";

const manrope = Manrope({
  subsets: ["cyrillic", "latin"],
  variable: "--font-manrope",
  display: "swap",
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["cyrillic", "latin"],
  variable: "--font-cormorant",
  display: "swap",
  weight: ["500", "600", "700"],
});

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={`${manrope.variable} ${cormorantGaramond.variable}`}>
      <body className="legal-body">
        <a
          href="#main"
          className="skip-link"
        >
          Перейти к содержимому
        </a>
        <Header />
        <main id="main" className="legal-main">
          {children}
        </main>
        <Footer />
        <RevealController />
      </body>
    </html>
  );
}

