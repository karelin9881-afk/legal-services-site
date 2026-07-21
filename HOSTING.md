# Размещение на обычном PHP-хостинге

Пакет `dist/` рассчитан на Apache-хостинг с PHP 8.1+ и HTTPS. Frontend экспортируется в статические HTML-файлы, форма работает через `/api/contact.php`.

## 1. Production-переменные frontend

Скопируйте `.env.production.example` в `.env.production` и замените домен, контакты и реквизиты реальными значениями.

```powershell
Copy-Item .env.production.example .env.production
```

## 2. PHP-зависимости

Выполните в `backend-php/`:

```bash
composer install --no-dev --optimize-autoloader
```

## 3. Создание пакета

Из корня проекта:

```bash
npm install
npm run build:hosting
```

Готовый пакет появится в `dist/`.

## 4. SMTP-конфигурация

В готовом пакете переименуйте:

```text
dist/_backend/config/config.local.php.example
```

в:

```text
dist/_backend/config/config.local.php
```

Заполните SMTP host, port, username, password, адрес отправителя и получателя. В `security.allowed_origins` укажите только реальные HTTPS-домены сайта.

`config.local.php` содержит секреты и не должен попадать в Git.

## 5. Загрузка

Загрузите **содержимое** `dist/` в корневую директорию сайта (`public_html`, `www` или `htdocs`), сохраняя скрытые файлы `.htaccess`.

После загрузки проверьте:

- главную страницу и страницы услуг;
- `/privacy/` и `/personal-data-consent/`;
- POST-запрос формы на `/api/contact.php`;
- доставку письма;
- HTTPS;
- недоступность `/_backend/` извне.

На уровне панели хостинга, Cloudflare или Apache обязательно настройте rate limiting для `/api/contact.php`. Для почтового домена настройте SPF, DKIM и DMARC.
