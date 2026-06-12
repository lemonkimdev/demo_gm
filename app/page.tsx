"use client";

import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const isDark = theme === "dark";
  const pageClass = isDark
    ? "bg-neutral-950 text-white"
    : "bg-neutral-100 text-neutral-950";
  const mutedClass = isDark ? "text-neutral-300" : "text-neutral-600";
  const badgeClass = isDark
    ? "border-white/15 text-neutral-300"
    : "border-neutral-300 text-neutral-600";
  const irlButtonClass = isDark
    ? "bg-white text-black hover:bg-neutral-200"
    : "bg-neutral-950 text-white hover:bg-neutral-800";

  return (
    <main className={`min-h-screen px-5 py-5 transition-colors ${pageClass}`}>
      <div className="mx-auto mb-4 flex h-14 w-full max-w-md items-center justify-between">
        <Link href="/" className="text-lg font-black tracking-[-0.02em]">
          gmgm
        </Link>
        <button
          type="button"
          onClick={() => setTheme(isDark ? "light" : "dark")}
          className={`flex h-10 shrink-0 items-center rounded-full border p-1 ${
            isDark
              ? "border-white/15 bg-black/30"
              : "border-neutral-300 bg-neutral-100"
          }`}
          aria-label="테마 전환"
          title="테마 전환"
        >
          <span
            className={`flex h-8 w-8 items-center justify-center rounded-full text-sm transition ${
              !isDark ? "bg-neutral-950 text-white shadow-sm" : "text-neutral-400"
            }`}
          >
            ☀
          </span>
          <span
            className={`flex h-8 w-8 items-center justify-center rounded-full text-sm transition ${
              isDark ? "bg-white text-black shadow-sm" : "text-neutral-500"
            }`}
          >
            ☾
          </span>
        </button>
      </div>
      <section className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-md flex-col">
        <div>
          <p className={`w-fit rounded-full border px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] ${badgeClass}`}>
            Digital Passport & Journey Demo
          </p>
          <h1 className="mt-8 text-4xl font-semibold leading-tight">
            디지털 라이프 경험
          </h1>
          <p className={`mt-5 text-base leading-7 ${mutedClass}`}>
            함께 제시하는 NFC 칩/카드를 통해, 전체 흐름을 체험하실 수 있습니다.
          </p>
        </div>

        <div className="mt-10 space-y-4">
          <div className="grid grid-cols-4 gap-3">
            <Link
              href="/nfc/gm-001"
              className={`col-span-1 flex h-14 items-center justify-center rounded-md text-sm font-semibold transition ${irlButtonClass}`}
            >
              IRL BX1
            </Link>
            <Link
              href="/nfc/gm-002"
              className={`col-span-1 flex h-14 items-center justify-center rounded-md text-sm font-semibold transition ${irlButtonClass}`}
            >
              IRL BX2
            </Link>
            <Link
              href="/iic"
              className="col-span-2 flex h-14 items-center justify-center rounded-md bg-[#B8922A] text-sm font-semibold text-black transition hover:bg-[#D4AC52]"
            >
              ON BX
            </Link>
          </div>
          <div className={`space-y-2 text-xs leading-5 ${isDark ? "text-neutral-400" : "text-neutral-600"}`}>
            <p>#설명 1. IRL : In real life, BX : Brand experience</p>
            <p>
              #설명 2. IRL BX 경우, 특히 별도의 NFC 칩을 통해 더 직관적으로 경험하실 수 있습니다.
            </p>
            <p>
              #설명 3. 데모only 용도이며, 6/16(화) 23:59까지 공개 뒤, 페이지 종료 예정입니다.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
