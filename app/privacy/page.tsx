import type { Metadata } from "next";
import Link from "next/link";
import { legalConfig } from "@/content/legalConfig";

const policyConfig = legalConfig.documents.privacyPolicy;
const operator = legalConfig.operator;

export const metadata: Metadata = {
  title: policyConfig.title,
  description:
    "Политика обработки персональных данных при отправке заявки через PHP endpoint и SMTP.",
  alternates: {
    canonical: new URL(policyConfig.canonicalPath, legalConfig.siteUrl).toString(),
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPage() {
  return (
    <section className="legal-document">
      <div className="legal-page__container">
        <div className="legal-document__nav">
          <Link href="/" className="legal-document__back-link">
            Вернуться на главную
          </Link>
        </div>

        <div className="legal-document__header">
          <p className="legal-document__eyebrow">Правовая информация</p>
          <h1>{policyConfig.title}</h1>
          <p>
            Документ описывает фактическую схему обработки заявки: пользователь
            вводит имя, телефон и сообщение, данные передаются в PHP endpoint,
            PHP отправляет письмо владельцу сайта через PHPMailer и SMTP.
          </p>
        </div>

        <div className="legal-document__notice" role="note">
          <h2>Перед публикацией необходимо заполнить</h2>
          <p>
            Реквизиты оператора, используемый хостинг, почтовый сервис, срок
            хранения писем и порядок удаления писем. Тексты юридических
            документов являются техническими шаблонами и должны быть проверены
            профильным юристом.
          </p>
        </div>

        <div className="legal-document__body">
          <section>
            <h2>1. Версия и дата вступления в силу</h2>
            <p>Версия документа: {policyConfig.version}.</p>
            <p>Дата вступления в силу: {policyConfig.effectiveDate}.</p>
          </section>

          <section>
            <h2>2. Оператор персональных данных</h2>
            <dl className="legal-document__fields">
              <div>
                <dt>Оператор</dt>
                <dd>{operator.name}</dd>
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
                <dt>Адрес</dt>
                <dd>{operator.legalAddress}</dd>
              </div>
              <div>
                <dt>Email для обращений</dt>
                <dd>
                  <a href={`mailto:${operator.contactEmail}`}>{operator.contactEmail}</a>
                </dd>
              </div>
            </dl>
          </section>

          <section>
            <h2>3. Фактический сценарий обработки</h2>
            <p>
              Пользователь заполняет форму на сайте, указывает имя, номер
              телефона и текст обращения, после чего браузер отправляет JSON в
              PHP endpoint. PHP endpoint валидирует данные, проверяет согласие,
              honeypot-поле и версии документов, затем формирует email и
              отправляет его владельцу сайта через PHPMailer и SMTP.
            </p>
            <p>
              Отдельная база данных не используется. Заявка хранится в почтовом
              ящике владельца сайта. Данные не публикуются и не используются для
              рекламных рассылок.
            </p>
          </section>

          <section>
            <h2>4. Категории обрабатываемых данных</h2>
            <p>
              Обрабатываются только данные, которые пользователь самостоятельно
              отправляет через форму: имя, номер телефона, текст обращения,
              версия согласия, версия политики, источник формы и, если заявка
              отправлена со страницы услуги, название и slug услуги.
            </p>
          </section>

          <section>
            <h2>5. Цель и правовое основание</h2>
            <p>
              Цель обработки: прием и рассмотрение обращения, обратная связь с
              пользователем и подготовка ответа по указанной ситуации. Правовое
              основание: согласие пользователя на обработку персональных данных,
              подтверждаемое обязательным checkbox в форме.
            </p>
          </section>

          <section>
            <h2>6. Операции с данными</h2>
            <p>
              Выполняются сбор, получение, проверка, валидация, использование
              для связи, формирование HTML и plain-text письма, передача через
              SMTP, хранение письма в почтовом ящике владельца сайта, удаление и
              уничтожение.
            </p>
          </section>

          <section>
            <h2>7. Хостинг, почтовый провайдер и хранение писем</h2>
            <dl className="legal-document__fields">
              <div>
                <dt>Хостинг</dt>
                <dd>[УКАЖИТЕ ХОСТИНГ]</dd>
              </div>
              <div>
                <dt>Почтовый провайдер</dt>
                <dd>[УКАЖИТЕ ПОЧТОВОГО ПРОВАЙДЕРА]</dd>
              </div>
              <div>
                <dt>Срок хранения писем</dt>
                <dd>[УКАЖИТЕ СРОК ХРАНЕНИЯ ПИСЕМ]</dd>
              </div>
              <div>
                <dt>Порядок удаления писем</dt>
                <dd>[УКАЖИТЕ ПОРЯДОК УДАЛЕНИЯ ПИСЕМ]</dd>
              </div>
            </dl>
            <p>
              До заполнения этих полей политика не утверждает страну хранения
              данных или конкретного провайдера.
            </p>
          </section>

          <section>
            <h2>8. Отзыв согласия</h2>
            <p>
              Пользователь может отозвать согласие, направив запрос на email{" "}
              <a href={`mailto:${operator.contactEmail}`}>{operator.contactEmail}</a>.
              После получения запроса оператор прекращает обработку данных, если
              отсутствуют иные законные основания для обработки, и удаляет письма
              в установленном порядке.
            </p>
          </section>

          <section>
            <h2>9. Меры защиты</h2>
            <p>
              Используются проверка Origin, ограничение размера запроса, проверка
              Content-Type, серверная валидация полей, обязательная проверка
              согласия, honeypot, HTML escaping пользовательских данных в письме,
              хранение SMTP-пароля вне публичной директории и запрет логирования
              персональных данных.
            </p>
          </section>
        </div>
      </div>
    </section>
  );
}
