import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    const name = String(body?.name ?? "").trim();
    const phone = String(body?.phone ?? "").trim();
    const message = String(body?.message ?? "").trim();

    if (!name || name.length < 2) {
      return NextResponse.json({ ok: false, error: "Имя указано неверно" }, { status: 400 });
    }
    if (!phone || phone.length < 7) {
      return NextResponse.json({ ok: false, error: "Телефон указан неверно" }, { status: 400 });
    }
    if (!message || message.length < 10) {
      return NextResponse.json({ ok: false, error: "Сообщение слишком короткое" }, { status: 400 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Ошибка запроса" }, { status: 500 });
  }
}

