<?php

declare(strict_types=1);

namespace App;

final class HtmlEscaper
{
    public static function escape(string $value): string
    {
        return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
    }

    public static function multiline(string $value): string
    {
        return nl2br(self::escape($value), false);
    }
}
