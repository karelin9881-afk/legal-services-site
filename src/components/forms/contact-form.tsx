"use client";

import Link from "next/link";
import * as React from "react";
import { Button } from "@/components/Button/Button";
import { SendIcon } from "@/components/ButtonIcon/ButtonIcon";
import { legalConfig } from "@/content/legalConfig";

type ContactFormSource = "home-contact-form" | "service-contact-form";

type ContactFormProps = {
  initialMessage?: string;
  formSource?: ContactFormSource;
  serviceSlug?: string;
  serviceTitle?: string;
};

const contactEndpoint =
  process.env.NEXT_PUBLIC_CONTACT_ENDPOINT?.trim() || "/api/contact.php";

async function readJsonSafe(res: Response) {
  try {
    return await res.json();
  } catch {
    return null;
  }
}

export function ContactForm({
  initialMessage,
  formSource = "home-contact-form",
  serviceSlug,
  serviceTitle,
}: ContactFormProps) {
  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [message, setMessage] = React.useState(initialMessage ?? "");
  const [website, setWebsite] = React.useState("");
  const [personalDataConsent, setPersonalDataConsent] = React.useState(false);
  const [consentTouched, setConsentTouched] = React.useState(false);
  const [status, setStatus] = React.useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorText, setErrorText] = React.useState<string | null>(null);

  const isLoading = status === "loading";
  const consentError = consentTouched && !personalDataConsent;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorText(null);

    if (!personalDataConsent) {
      setConsentTouched(true);
      setStatus("error");
      setErrorText("Подтвердите согласие на обработку персональных данных.");
      return;
    }

    setStatus("loading");

    try {
      const payload = {
        name,
        phone,
        message,
        consent: personalDataConsent,
        consentVersion: legalConfig.documents.personalDataConsent.version,
        privacyPolicyVersion: legalConfig.documents.privacyPolicy.version,
        formSource,
        serviceSlug,
        serviceTitle,
        website,
      };

      const res = await fetch(contactEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await readJsonSafe(res);

      if (!res.ok || !data?.ok) {
        setStatus("error");
        setErrorText(data?.error ?? "Не удалось отправить заявку. Проверьте поля и попробуйте еще раз.");
        return;
      }

      setName("");
      setPhone("");
      setMessage(initialMessage ?? "");
      setWebsite("");
      setPersonalDataConsent(false);
      setConsentTouched(false);
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorText("Ошибка сети. Проверьте подключение и попробуйте еще раз.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="contact-form" aria-busy={isLoading}>
      <div className="contact-form__hidden" aria-hidden="true">
        <label htmlFor="website">Сайт</label>
        <input
          id="website"
          type="text"
          name="website"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          autoComplete="off"
          tabIndex={-1}
          disabled={isLoading}
        />
      </div>

      <div className="contact-form__grid">
        <div className="contact-form__field">
          <label htmlFor="contact-name" className="contact-form__label">
            Имя
          </label>
          <input
            id="contact-name"
            className="contact-form__control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Как к вам обращаться"
            required
            autoComplete="name"
            maxLength={100}
            disabled={isLoading}
          />
        </div>
        <div className="contact-form__field">
          <label htmlFor="contact-phone" className="contact-form__label">
            Телефон
          </label>
          <input
            id="contact-phone"
            className="contact-form__control"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+7 ..."
            required
            autoComplete="tel"
            inputMode="tel"
            maxLength={30}
            disabled={isLoading}
          />
        </div>
      </div>

      <div className="contact-form__field">
        <label htmlFor="contact-message" className="contact-form__label">
          Сообщение
        </label>
        <textarea
          id="contact-message"
          className="contact-form__textarea"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Коротко опишите ситуацию"
          required
          maxLength={3000}
          disabled={isLoading}
        />
        <p className="contact-form__hint" id="contact-message-hint">
          Не указывайте в сообщении паспортные данные, банковские реквизиты и другую избыточную конфиденциальную информацию.
        </p>
      </div>

      <div className="contact-form__consent" data-invalid={consentError ? "true" : "false"}>
        <input
          id="contact-personal-data-consent"
          className="contact-form__checkbox"
          type="checkbox"
          checked={personalDataConsent}
          onChange={(e) => {
            setPersonalDataConsent(e.target.checked);
            setConsentTouched(true);
          }}
          onBlur={() => setConsentTouched(true)}
          required
          disabled={isLoading}
          aria-invalid={consentError}
          aria-describedby="contact-consent-text contact-form-status"
        />
        <label
          id="contact-consent-text"
          htmlFor="contact-personal-data-consent"
          className="contact-form__consent-text"
        >
          Я даю согласие на обработку персональных данных и подтверждаю, что ознакомлен с{" "}
          <Link href="/personal-data-consent" onClick={(e) => e.stopPropagation()}>
            согласием на обработку персональных данных
          </Link>{" "}
          и{" "}
          <Link href="/privacy" onClick={(e) => e.stopPropagation()}>
            Политикой обработки персональных данных
          </Link>.
        </label>
      </div>

      <div className="contact-form__submit-row">
        <Button
          className="contact-form__button"
          variant="primary"
          size="lg"
          icon={<SendIcon />}
          type="submit"
          disabled={isLoading}
          ariaLabel={isLoading ? "Заявка отправляется" : undefined}
        >
          {isLoading ? "Отправляем..." : "Отправить заявку"}
        </Button>
        <div
          id="contact-form-status"
          className="contact-form__status"
          aria-live="polite"
          aria-atomic="true"
        >
          {status === "success" ? (
            <div className="contact-form__success">Спасибо, заявка принята.</div>
          ) : null}
          {status === "error" ? (
            <div className="contact-form__error">{errorText ?? "Проверьте данные и попробуйте еще раз."}</div>
          ) : null}
        </div>
      </div>

      <div className="contact-form__note">
        Данные используются только для связи по заявке и передаются в PHP endpoint для отправки письма владельцу сайта.
      </div>
      <div className="contact-form__note">
        Отправка заявки не является заключением договора. Стоимость, сроки и условия оказания услуг согласовываются отдельно.
      </div>
    </form>
  );
}
