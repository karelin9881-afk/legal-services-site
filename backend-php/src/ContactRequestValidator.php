<?php

declare(strict_types=1);

namespace App;

final class ContactRequestValidator
{
    private const MIN_NAME_LENGTH = 2;
    private const MAX_NAME_LENGTH = 100;
    private const MIN_PHONE_LENGTH = 7;
    private const MAX_PHONE_LENGTH = 30;
    private const MIN_MESSAGE_LENGTH = 10;
    private const MAX_MESSAGE_LENGTH = 3000;
    private const MAX_SERVICE_SLUG_LENGTH = 150;
    private const MAX_SERVICE_TITLE_LENGTH = 200;
    private const FORM_SOURCES = ['home-contact-form', 'service-contact-form'];

    /**
     * @param array<string, mixed> $payload
     * @param array<string, mixed> $config
     * @return array{ok: bool, spam: bool, data?: array<string, string|bool>, error?: string}
     */
    public function validate(array $payload, array $config): array
    {
        $website = $payload['website'] ?? '';

        if (!is_string($website) || trim($website) !== '') {
            return ['ok' => true, 'spam' => true];
        }

        if (!$this->isString($payload, 'name')) {
            return $this->invalid();
        }

        $name = $this->singleLine($payload['name']);

        if ($this->length($name) < self::MIN_NAME_LENGTH || $this->length($name) > self::MAX_NAME_LENGTH) {
            return $this->invalid();
        }

        if (!$this->isString($payload, 'phone')) {
            return $this->invalid();
        }

        $phone = $this->singleLine($payload['phone']);

        if (
            $this->length($phone) < self::MIN_PHONE_LENGTH ||
            $this->length($phone) > self::MAX_PHONE_LENGTH ||
            !preg_match('/^[+\d\s()\-]+$/u', $phone)
        ) {
            return $this->invalid();
        }

        if (!$this->isString($payload, 'message')) {
            return $this->invalid();
        }

        $message = $this->message($payload['message']);

        if ($this->length($message) < self::MIN_MESSAGE_LENGTH || $this->length($message) > self::MAX_MESSAGE_LENGTH) {
            return $this->invalid();
        }

        if (($payload['consent'] ?? null) !== true) {
            return $this->invalid();
        }

        if (!$this->isString($payload, 'consentVersion')) {
            return $this->invalid();
        }

        $consentVersion = $this->singleLine($payload['consentVersion']);
        $expectedConsentVersion = (string)($config['documents']['consent_version'] ?? '');

        if ($consentVersion === '' || $consentVersion !== $expectedConsentVersion) {
            return $this->invalid();
        }

        if (!$this->isString($payload, 'privacyPolicyVersion')) {
            return $this->invalid();
        }

        $privacyPolicyVersion = $this->singleLine($payload['privacyPolicyVersion']);
        $expectedPrivacyPolicyVersion = (string)($config['documents']['privacy_policy_version'] ?? '');

        if ($privacyPolicyVersion === '' || $privacyPolicyVersion !== $expectedPrivacyPolicyVersion) {
            return $this->invalid();
        }

        if (!$this->isString($payload, 'formSource')) {
            return $this->invalid();
        }

        $formSource = $this->singleLine($payload['formSource']);

        if (!in_array($formSource, self::FORM_SOURCES, true)) {
            return $this->invalid();
        }

        $serviceSlug = '';

        if (array_key_exists('serviceSlug', $payload) && $payload['serviceSlug'] !== null && $payload['serviceSlug'] !== '') {
            if (!is_string($payload['serviceSlug'])) {
                return $this->invalid();
            }

            $serviceSlug = $this->singleLine($payload['serviceSlug']);

            if ($this->length($serviceSlug) > self::MAX_SERVICE_SLUG_LENGTH || !preg_match('/^[A-Za-z0-9-]+$/', $serviceSlug)) {
                return $this->invalid();
            }
        }

        $serviceTitle = '';

        if (array_key_exists('serviceTitle', $payload) && $payload['serviceTitle'] !== null && $payload['serviceTitle'] !== '') {
            if (!is_string($payload['serviceTitle'])) {
                return $this->invalid();
            }

            $serviceTitle = $this->singleLine($payload['serviceTitle']);

            if ($this->length($serviceTitle) > self::MAX_SERVICE_TITLE_LENGTH) {
                return $this->invalid();
            }
        }

        return [
            'ok' => true,
            'spam' => false,
            'data' => [
                'name' => $name,
                'phone' => $phone,
                'message' => $message,
                'consent' => true,
                'consentVersion' => $consentVersion,
                'privacyPolicyVersion' => $privacyPolicyVersion,
                'formSource' => $formSource,
                'serviceSlug' => $serviceSlug,
                'serviceTitle' => $serviceTitle,
            ],
        ];
    }

    /**
     * @return array{ok: false, spam: false, error: string}
     */
    private function invalid(): array
    {
        return [
            'ok' => false,
            'spam' => false,
            'error' => 'Проверьте правильность заполнения формы',
        ];
    }

    /**
     * @param array<string, mixed> $payload
     */
    private function isString(array $payload, string $key): bool
    {
        return array_key_exists($key, $payload) && is_string($payload[$key]);
    }

    private function singleLine(string $value): string
    {
        $value = preg_replace('/[\x00-\x1F\x7F]/', ' ', $value) ?? '';
        $value = preg_replace('/\s+/u', ' ', $value) ?? '';

        return trim($value);
    }

    private function message(string $value): string
    {
        $value = str_replace(["\r\n", "\r"], "\n", $value);
        $value = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/', ' ', $value) ?? '';
        $value = preg_replace('/[ \t]+/u', ' ', $value) ?? '';
        $value = preg_replace("/\n{4,}/", "\n\n\n", $value) ?? '';

        return trim($value);
    }

    private function length(string $value): int
    {
        if (function_exists('mb_strlen')) {
            return mb_strlen($value, 'UTF-8');
        }

        return strlen($value);
    }
}
