"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function ContactForm({
  initialMessage,
}: {
  initialMessage?: string;
}) {
  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [message, setMessage] = React.useState(initialMessage ?? "");
  const [status, setStatus] = React.useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorText, setErrorText] = React.useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorText(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, message }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.ok) {
        setStatus("error");
        setErrorText(data?.error ?? "Не удалось отправить заявку");
        return;
      }
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorText("Ошибка сети");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-black/85">Имя</label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Как к вам обращаться"
            required
            autoComplete="name"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-black/85">Телефон</label>
          <Input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+7 ..."
            required
            autoComplete="tel"
            inputMode="tel"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-black/85">Сообщение</label>
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Коротко опишите ситуацию (например: адрес, что произошло, документы)"
          required
        />
      </div>

      <div className="flex items-center gap-3">
        <Button type="submit" disabled={status === "loading"}>
          {status === "loading" ? "Отправляем..." : status === "success" ? "Заявка отправлена" : "Отправить заявку"}
        </Button>
        {status === "error" && (
          <div className="text-sm text-red-700">{errorText ?? "Ошибка"}</div>
        )}
      </div>
      <div className="text-xs text-black/55">
        Нажимая кнопку, вы соглашаетесь с обработкой персональных данных.
      </div>
    </form>
  );
}

