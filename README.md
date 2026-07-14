# Legal Services Site

Лендинг юридических услуг на Next.js с отдельным PHP endpoint для отправки заявок на email.

## Архитектура отправки формы

```text
Пользователь заполняет ContactForm в Next.js
        ↓
Frontend отправляет JSON POST на NEXT_PUBLIC_CONTACT_ENDPOINT
        ↓
PHP endpoint валидирует данные, Origin, Content-Type, согласие и honeypot
        ↓
PHPMailer отправляет письмо через SMTP
        ↓
Заявка приходит на почту владельца сайта
```

База данных не используется. Заявки не сохраняются в браузере, localStorage, sessionStorage, cookies, JSON-файлах или текстовых файлах проекта. Письмо с заявкой хранится в почтовом ящике владельца сайта.

## Frontend настройка

Создайте `.env.local` по примеру `.env.example`:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_CONTACT_ENDPOINT=http://localhost:8081/contact.php

NEXT_PUBLIC_SITE_BRAND_NAME="Юридические услуги"
NEXT_PUBLIC_SITE_OWNER_NAME="[УКАЖИТЕ ФИО ОПЕРАТОРА]"
NEXT_PUBLIC_SITE_OWNER_ADDRESS="[УКАЖИТЕ АДРЕС ОПЕРАТОРА]"

NEXT_PUBLIC_CONTACT_PHONE_DISPLAY="+7 (000) 000-00-00"
NEXT_PUBLIC_CONTACT_PHONE_HREF="+70000000000"
NEXT_PUBLIC_CONTACT_EMAIL=owner@example.com
NEXT_PUBLIC_CONTACT_ADDRESS="[УКАЖИТЕ АДРЕС ДЛЯ КОНТАКТОВ]"

NEXT_PUBLIC_OPERATOR_NAME="[УКАЖИТЕ ФИО ОПЕРАТОРА]"
NEXT_PUBLIC_OPERATOR_ADDRESS="[УКАЖИТЕ АДРЕС ОПЕРАТОРА]"
NEXT_PUBLIC_OPERATOR_INN="[УКАЖИТЕ ИНН]"
NEXT_PUBLIC_OPERATOR_OGRN="[УКАЖИТЕ ОГРН/ОГРНИП]"
NEXT_PUBLIC_OPERATOR_EMAIL=owner@example.com
```

Не передавайте SMTP host, SMTP user, SMTP password, email получателя или приватные PHP-настройки через `NEXT_PUBLIC_*`.

## PHP backend

PHP-код находится отдельно:

```text
backend-php/
├── composer.json
├── public/contact.php
├── src/
└── config/
```

Установка Composer-зависимостей:

```bash
cd backend-php
composer install
composer dump-autoload
```

PHPMailer подключается через Composer, библиотека не копируется вручную.

## PHP конфигурация

Скопируйте пример:

```bash
cd backend-php
cp config/config.example.php config/config.local.php
```

В `config/config.local.php` заполните:

- SMTP host;
- SMTP port;
- тип шифрования `ssl` или `tls`;
- SMTP username;
- SMTP password;
- `from_email`;
- `from_name`;
- `to_email`;
- список `security.allowed_origins`;
- версии документов;
- часовой пояс.

Файл `backend-php/config/config.local.php` не должен попадать в Git. Он находится вне директории `public`.

## Локальный запуск

Frontend:

```bash
npm install
npm run dev
```

PHP backend:

```bash
cd backend-php
composer install
php -S localhost:8081 -t public
```

Адреса:

```text
Frontend: http://localhost:3000
PHP endpoint: http://localhost:8081/contact.php
```

В `.env.local` frontend:

```env
NEXT_PUBLIC_CONTACT_ENDPOINT=http://localhost:8081/contact.php
```

В `backend-php/config/config.local.php` разрешите origin:

```php
'allowed_origins' => [
    'http://localhost:3000',
],
```

## Production deployment

Production должен работать только через HTTPS.

### Вариант 1. Один домен

```text
Frontend: https://example.com
PHP endpoint: https://example.com/api/contact.php
```

Это предпочтительный вариант. В frontend:

```env
NEXT_PUBLIC_CONTACT_ENDPOINT=https://example.com/api/contact.php
```

### Вариант 2. Отдельный PHP-поддомен

```text
Frontend: https://example.com
PHP endpoint: https://api.example.com/contact.php
```

В этом случае настройте точный CORS allowlist:

```php
'allowed_origins' => [
    'https://example.com',
    'https://www.example.com',
],
```

Не используйте wildcard `*` для персональных данных.

## SMTP и доставляемость

Для отправки писем настройте в PHP-конфигурации SMTP-доступы почтового ящика владельца сайта.

Дополнительно настройте DNS домена:

- SPF;
- DKIM;
- DMARC.

Без SPF/DKIM/DMARC письма могут попадать в спам или отклоняться почтовыми сервисами.

## CORS

PHP endpoint проверяет `Origin` и отвечает только доменам из `security.allowed_origins`.

Для same-origin production-запросов CORS может быть не нужен, но endpoint все равно не должен отвечать `Access-Control-Allow-Origin: *`.

## Защита и rate limiting

В приложении реализовано:

- honeypot;
- строгая серверная валидация;
- проверка Origin;
- проверка Content-Type;
- ограничение размера запроса;
- запрет повторной отправки на frontend во время запроса;
- HTML escaping пользовательских данных в письме;
- нейтральные ошибки без раскрытия SMTP-деталей.

Не добавляйте базу данных или файловое хранилище заявок только ради rate limit. Ограничение частоты запросов необходимо дополнительно настроить на уровне:

- Nginx;
- Apache;
- Cloudflare/WAF;
- панели хостинга;
- reverse proxy.

## Логирование и секреты

Запрещено логировать персональные данные: имя, телефон, сообщение, тело запроса, SMTP-пароль, полную конфигурацию или полный объект исключения PHPMailer.

Разрешен только безопасный технический лог без персональных данных, например:

```text
CONTACT_EMAIL_SEND_FAILED
```

SMTP-пароли не должны попадать:

- во frontend;
- в `NEXT_PUBLIC_*`;
- в Git;
- в публичную директорию PHP;
- в API-ответы.

## Юридические документы

Добавлены страницы:

- `/privacy`;
- `/personal-data-consent`.

Тексты юридических документов являются техническими шаблонами. Перед публикацией необходимо указать реальные данные владельца сайта, используемый хостинг, почтовый сервис и проверить документы с профильным юристом.

Обязательно замените placeholders:

- `[УКАЖИТЕ ФИО ОПЕРАТОРА]`;
- `[УКАЖИТЕ ИНН]`;
- `[УКАЖИТЕ EMAIL]`;
- `[УКАЖИТЕ ХОСТИНГ]`;
- `[УКАЖИТЕ ПОЧТОВОГО ПРОВАЙДЕРА]`;
- `[УКАЖИТЕ СРОК ХРАНЕНИЯ ПИСЕМ]`.

Публичная оферта не добавляется, потому что на сайте нет онлайн-оплаты и автоматического заключения договора.

## Проверки

Frontend:

```bash
npm install
npm run typecheck
npm run lint
npm run build
```

PHP:

```bash
cd backend-php
composer install
composer dump-autoload
php -l public/contact.php
php -l src/ContactMailer.php
php -l src/ContactRequestValidator.php
php -l src/JsonResponse.php
php -l src/HtmlEscaper.php
```
