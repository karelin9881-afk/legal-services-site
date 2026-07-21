<?php

declare(strict_types=1);

use App\ContactMailer;
use App\ContactRequestValidator;
use App\JsonResponse;

$backendRoot = dirname(__DIR__);

if (is_dir($backendRoot . '/_backend')) {
    $backendRoot .= '/_backend';
}

require $backendRoot . '/vendor/autoload.php';

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');

$configPath = $backendRoot . '/config/config.local.php';

if (!file_exists($configPath)) {
    error_log('CONTACT_CONFIG_MISSING');
    JsonResponse::send(['ok' => false, 'error' => 'Сервис временно недоступен'], 503);
    exit;
}

$config = require $configPath;

/**
 * @param array<string, mixed> $config
 */
function applyCors(array $config): bool
{
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';

    if ($origin === '') {
        return true;
    }

    $allowedOrigins = $config['security']['allowed_origins'] ?? [];

    if (!is_array($allowedOrigins) || !in_array($origin, $allowedOrigins, true)) {
        return false;
    }

    header('Access-Control-Allow-Origin: ' . $origin);
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    header('Access-Control-Max-Age: 600');
    header('Vary: Origin', false);

    return true;
}

if (!applyCors($config)) {
    JsonResponse::send(['ok' => false, 'error' => 'Некорректный запрос'], 400);
    exit;
}

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

if ($method === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($method !== 'POST') {
    header('Allow: POST, OPTIONS');
    JsonResponse::send(['ok' => false, 'error' => 'Метод не поддерживается'], 405);
    exit;
}

$contentType = strtolower((string)($_SERVER['CONTENT_TYPE'] ?? ''));

if (!str_contains($contentType, 'application/json')) {
    JsonResponse::send(['ok' => false, 'error' => 'Некорректный запрос'], 415);
    exit;
}

$maxBodyBytes = (int)($config['security']['max_body_bytes'] ?? 16384);
$contentLength = (int)($_SERVER['CONTENT_LENGTH'] ?? 0);

if ($contentLength > $maxBodyBytes) {
    JsonResponse::send(['ok' => false, 'error' => 'Некорректный запрос'], 413);
    exit;
}

$stream = fopen('php://input', 'rb');
$rawBody = $stream === false ? false : stream_get_contents($stream, $maxBodyBytes + 1);

if ($rawBody === false || strlen($rawBody) > $maxBodyBytes) {
    JsonResponse::send(['ok' => false, 'error' => 'Некорректный запрос'], 413);
    exit;
}

try {
    $payload = json_decode($rawBody, true, 64, JSON_THROW_ON_ERROR);
} catch (Throwable) {
    JsonResponse::send(['ok' => false, 'error' => 'Проверьте правильность заполнения формы'], 400);
    exit;
}

if (!is_array($payload)) {
    JsonResponse::send(['ok' => false, 'error' => 'Проверьте правильность заполнения формы'], 400);
    exit;
}

$validator = new ContactRequestValidator();
$validation = $validator->validate($payload, $config);

if (($validation['spam'] ?? false) === true) {
    JsonResponse::send(['ok' => true], 200);
    exit;
}

if (($validation['ok'] ?? false) !== true || !isset($validation['data']) || !is_array($validation['data'])) {
    JsonResponse::send(['ok' => false, 'error' => 'Проверьте правильность заполнения формы'], 400);
    exit;
}

try {
    $timezone = new DateTimeZone((string)($config['app']['timezone'] ?? 'Europe/Moscow'));
    $submittedAt = (new DateTimeImmutable('now', $timezone))->format('d.m.Y H:i:s T');

    $mailer = new ContactMailer($config);
    $mailer->send($validation['data'], $submittedAt);

    JsonResponse::send(['ok' => true], 200);
} catch (Throwable) {
    $requestId = bin2hex(random_bytes(8));
    error_log('CONTACT_EMAIL_SEND_FAILED ' . $requestId);

    JsonResponse::send(
        [
            'ok' => false,
            'error' => 'Не удалось отправить заявку. Попробуйте ещё раз позднее или свяжитесь с нами по телефону.',
        ],
        500
    );
}
