import type { Metadata } from "next";
import Link from "next/link";
import { legalConfig } from "@/content/legalConfig";

const consentConfig = legalConfig.documents.personalDataConsent;
const operator = legalConfig.operator;
const processing = legalConfig.processing;

export const metadata: Metadata = {
  title: consentConfig.title,
  description:
    "Согласие пользователя на обработку имени, номера телефона и текста обращения при отправке заявки через сайт.",
  alternates: {
    canonical: new URL(consentConfig.canonicalPath, legalConfig.siteUrl).toString(),
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PersonalDataConsentPage() {
  return (
    <section className="legal-document">
      <div className="legal-page__container">
        <div className="legal-document__nav">
          <Link href="/" className="legal-document__back-link">
            Вернуться на главную
          </Link>
        </div>

        <div className="legal-document__header">
          <p className="legal-document__eyebrow">Согласие пользователя</p>
          <h1>{consentConfig.title}</h1>
          <p>
            Настоящее согласие относится только к данным, которые пользователь
            отправляет через форму заявки на сайте: имя, номер телефона и текст
            обращения.
          </p>
        </div>

        <div className="legal-document__body">
          <section>
            <h2>1. Версия и дата вступления в силу</h2>
            <p>Версия согласия: {consentConfig.version}.</p>
            <p>Дата вступления в силу: {consentConfig.effectiveDate}.</p>
          </section>

          <section>
            <h2>2. Оператор персональных данных</h2>
            <p>
              Согласие предоставляется оператору персональных данных:
              {" "}
              {operator.name}.
            </p>
            <dl className="legal-document__fields">
              <div>
                <dt>Наименование / ФИО оператора</dt>
                <dd>{operator.name}</dd>
              </div>
              <div>
                <dt>Адрес оператора</dt>
                <dd>{operator.legalAddress}</dd>
              </div>
              <div>
                <dt>ИНН</dt>
                <dd>{operator.inn}</dd>
              </div>
              <div>
                <dt>ОГРН / ОГРНИП</dt>
                <dd>{operator.ogrn}</dd>
              </div>
              <div>
                <dt>Email для отзыва согласия</dt>
                <dd>
                  <a href={`mailto:${operator.contactEmail}`}>
                    {operator.contactEmail}
                  </a>
                </dd>
              </div>
            </dl>
          </section>

          <section>
            <h2>3. Цель обработки</h2>
            <p>
              Цель обработки персональных данных: {processing.purpose}.
            </p>
          </section>

          <section>
            <h2>4. Перечень персональных данных</h2>
            <p>
              Согласие распространяется только на следующие персональные данные:
            </p>
            <ul className="legal-document__list">
              {processing.dataCategories.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p>
              Согласие не распространяется на рекламные рассылки, передачу
              рекламным партнерам, профилирование, биометрические данные и
              паспортные данные.
            </p>
          </section>

          <section>
            <h2>5. Операции с персональными данными</h2>
            <p>
              Оператор вправе выполнять с указанными данными следующие действия:
              сбор, получение, проверку, валидацию, использование для связи,
              передачу через SMTP для доставки email, хранение в почтовом ящике
              владельца сайта на срок обработки обращения, удаление и уничтожение.
            </p>
          </section>

          <section>
            <h2>6. Отправка заявки владельцу сайта</h2>
            <p>
              Пользователь соглашается, что после отправки формы данные проходят
              серверную проверку и выполняется {processing.ownerEmailDelivery}.
            </p>
          </section>

          <section>
            <h2>7. Срок действия согласия</h2>
            <p>
              Согласие действует {processing.consentTerm}.
            </p>
          </section>

          <section>
            <h2>8. Отзыв согласия</h2>
            <p>
              Способ отзыва согласия: {processing.withdrawalMethod}.
            </p>
            <p>
              Email для отзыва согласия:{" "}
              <a href={`mailto:${operator.contactEmail}`}>
                {operator.contactEmail}
              </a>.
            </p>
          </section>
        </div>
      </div>
    </section>
  );
}
