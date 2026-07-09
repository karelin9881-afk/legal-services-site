import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ServiceNotFound() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="rounded-2xl border border-black/10 bg-white p-8">
        <div className="text-2xl font-semibold text-black">Услуга не найдена</div>
        <div className="mt-3 text-sm text-black/70">
          Возможно, ссылка устарела. Вы можете вернуться на главную.
        </div>
        <div className="mt-6">
          <Link href="/">
            <Button>На главную</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

