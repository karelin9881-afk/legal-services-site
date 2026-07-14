import { siteConfig } from "@/content/siteConfig";

function legalEnv(name: string, fallback: string) {
  const value = process.env[name]?.trim();

  if (!value || /^(undefined|null)$/i.test(value)) {
    return fallback;
  }

  return value;
}

// TODO перед публикацией: владелец обязан указать реальные реквизиты оператора.
export const legalConfig = {
  siteUrl: siteConfig.siteUrl,
  operator: {
    name: legalEnv("NEXT_PUBLIC_OPERATOR_NAME", siteConfig.owner.name),
    legalAddress: legalEnv("NEXT_PUBLIC_OPERATOR_ADDRESS", siteConfig.owner.address),
    inn: legalEnv("NEXT_PUBLIC_OPERATOR_INN", "[УКАЖИТЕ ИНН]"),
    ogrn: legalEnv("NEXT_PUBLIC_OPERATOR_OGRN", "[УКАЖИТЕ ОГРН/ОГРНИП]"),
    contactEmail: legalEnv("NEXT_PUBLIC_OPERATOR_EMAIL", "[УКАЖИТЕ EMAIL]"),
  },
  documents: {
    privacyPolicy: {
      version: "1.0",
      effectiveDate: "14 июля 2026 года",
      title: "Политика обработки персональных данных",
      canonicalPath: "/privacy",
    },
    personalDataConsent: {
      version: "1.0",
      effectiveDate: "14 июля 2026 года",
      title: "Согласие на обработку персональных данных",
      canonicalPath: "/personal-data-consent",
    },
  },
  processing: {
    purpose:
      "прием и рассмотрение обращения, обратная связь с пользователем и подготовка ответа по указанной ситуации",
    dataCategories: ["имя", "номер телефона", "текст обращения"],
    ownerEmailDelivery:
      "отправка заявки владельцу сайта по email через PHP endpoint, PHPMailer и SMTP",
    consentTerm:
      "до достижения цели обработки персональных данных или до отзыва согласия пользователем",
    withdrawalMethod:
      "направить запрос на email оператора с указанием, что согласие на обработку персональных данных отзывается",
  },
} as const;
