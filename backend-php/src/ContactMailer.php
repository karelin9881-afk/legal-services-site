<?php

declare(strict_types=1);

namespace App;

use PHPMailer\PHPMailer\Exception as MailException;
use PHPMailer\PHPMailer\PHPMailer;

final class ContactMailer
{
    /**
     * @param array<string, mixed> $config
     */
    public function __construct(private readonly array $config)
    {
    }

    /**
     * @param array<string, string|bool> $data
     *
     * @throws MailException
     */
    public function send(array $data, string $submittedAt): void
    {
        $smtp = $this->config['smtp'] ?? [];
        $serviceTitle = (string)($data['serviceTitle'] ?? '');
        $subject = $serviceTitle !== '' ? 'Новая заявка: ' . $this->headerValue($serviceTitle) : 'Новая заявка с сайта';

        $mail = new PHPMailer(true);
        $mail->isSMTP();
        $mail->Host = (string)($smtp['host'] ?? '');
        $mail->SMTPAuth = true;
        $mail->Username = (string)($smtp['username'] ?? '');
        $mail->Password = (string)($smtp['password'] ?? '');
        $mail->Port = (int)($smtp['port'] ?? 587);
        $mail->SMTPSecure = $this->encryption((string)($smtp['secure'] ?? 'tls'));
        $mail->Timeout = (int)($smtp['timeout'] ?? 10);
        $mail->SMTPDebug = 0;
        $mail->CharSet = 'UTF-8';

        $mail->setFrom((string)($smtp['from_email'] ?? ''), (string)($smtp['from_name'] ?? ''));
        $mail->addAddress((string)($smtp['to_email'] ?? ''));

        $mail->Subject = $subject;
        $mail->isHTML(true);
        $mail->Body = $this->htmlBody($data, $submittedAt);
        $mail->AltBody = $this->textBody($data, $submittedAt);

        $mail->send();
    }

    private function encryption(string $secure): string
    {
        return match ($secure) {
            'ssl', 'smtps' => PHPMailer::ENCRYPTION_SMTPS,
            'tls', 'starttls' => PHPMailer::ENCRYPTION_STARTTLS,
            default => '',
        };
    }

    private function headerValue(string $value): string
    {
        $value = preg_replace('/[\r\n]+/', ' ', $value) ?? '';

        return trim($value);
    }

    /**
     * @param array<string, string|bool> $data
     */
    private function htmlBody(array $data, string $submittedAt): string
    {
        $rows = [
            'Имя' => (string)$data['name'],
            'Телефон' => (string)$data['phone'],
            'Сообщение' => (string)$data['message'],
            'Источник формы' => (string)$data['formSource'],
            'Услуга' => (string)$data['serviceTitle'],
            'Slug услуги' => (string)$data['serviceSlug'],
            'Дата и время отправки' => $submittedAt,
            'Версия согласия' => (string)$data['consentVersion'],
            'Версия политики' => (string)$data['privacyPolicyVersion'],
        ];

        $htmlRows = '';

        foreach ($rows as $label => $value) {
            $formattedValue = $label === 'Сообщение'
                ? HtmlEscaper::multiline($value)
                : HtmlEscaper::escape($value !== '' ? $value : '—');

            $htmlRows .= sprintf(
                '<tr><th style="text-align:left;vertical-align:top;padding:8px 12px;border:1px solid #dfe8df;color:#5f6b61;width:190px;">%s:</th><td style="padding:8px 12px;border:1px solid #dfe8df;">%s</td></tr>',
                HtmlEscaper::escape($label),
                $formattedValue
            );
        }

        return '<div style="font-family:Arial,sans-serif;color:#1b241b;line-height:1.5;">'
            . '<h2 style="margin:0 0 16px;">Новая заявка с сайта</h2>'
            . '<table style="border-collapse:collapse;width:100%;max-width:760px;"><tbody>'
            . $htmlRows
            . '</tbody></table></div>';
    }

    /**
     * @param array<string, string|bool> $data
     */
    private function textBody(array $data, string $submittedAt): string
    {
        return implode("\n", [
            'Новая заявка с сайта',
            '',
            'Имя:',
            (string)$data['name'],
            '',
            'Телефон:',
            (string)$data['phone'],
            '',
            'Сообщение:',
            (string)$data['message'],
            '',
            'Источник формы:',
            (string)$data['formSource'],
            '',
            'Услуга:',
            (string)($data['serviceTitle'] ?: '—'),
            '',
            'Slug услуги:',
            (string)($data['serviceSlug'] ?: '—'),
            '',
            'Дата и время отправки:',
            $submittedAt,
            '',
            'Версия согласия:',
            (string)$data['consentVersion'],
            '',
            'Версия политики:',
            (string)$data['privacyPolicyVersion'],
        ]);
    }
}
