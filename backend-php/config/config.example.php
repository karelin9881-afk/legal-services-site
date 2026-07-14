<?php

declare(strict_types=1);

return [
    'smtp' => [
        'host' => 'smtp.example.com',
        'port' => 465,
        'secure' => 'ssl',
        'username' => 'site@example.com',
        'password' => 'CHANGE_ME',
        'from_email' => 'site@example.com',
        'from_name' => 'Юридические услуги',
        'to_email' => 'owner@example.com',
        'timeout' => 10,
    ],

    'security' => [
        'allowed_origins' => [
            'http://localhost:3000',
            'https://example.com',
            'https://www.example.com',
        ],
        'max_body_bytes' => 16384,
    ],

    'documents' => [
        'consent_version' => '1.0',
        'privacy_policy_version' => '1.0',
    ],

    'app' => [
        'timezone' => 'Europe/Moscow',
    ],
];
