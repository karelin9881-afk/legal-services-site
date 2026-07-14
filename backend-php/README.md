# PHP Contact Backend

Отдельный PHP endpoint для приема формы обратной связи и отправки письма через PHPMailer + SMTP.

## Установка

```bash
cd backend-php
composer install
```

## Конфигурация

Скопируйте пример:

```bash
cp config/config.example.php config/config.local.php
```

Заполните в `config/config.local.php`:

- `smtp.host`
- `smtp.port`
- `smtp.secure`: `ssl`, `tls` или пустая строка
- `smtp.username`
- `smtp.password`
- `smtp.from_email`
- `smtp.from_name`
- `smtp.to_email`
- `security.allowed_origins`
- `documents.consent_version`
- `documents.privacy_policy_version`
- `app.timezone`

`config/config.local.php` не должен попадать в Git.

## Локальный запуск

```bash
cd backend-php
php -S localhost:8081 -t public
```

Endpoint:

```text
http://localhost:8081/contact.php
```

Для Next.js frontend укажите:

```env
NEXT_PUBLIC_CONTACT_ENDPOINT=http://localhost:8081/contact.php
```

## Безопасность

- Endpoint принимает только `POST` и `OPTIONS`.
- CORS разрешается только для origin из `security.allowed_origins`.
- `Access-Control-Allow-Origin: *` не используется.
- Максимальный размер JSON-запроса ограничен.
- SMTP debug выключен.
- Персональные данные и SMTP-секреты не логируются.
- Реальная конфигурация хранится вне `public`.
