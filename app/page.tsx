import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-950 px-5 py-5 text-white">
      <div className="mx-auto mb-4 flex h-14 w-full max-w-md items-center justify-between">
        <Link href="/" className="text-lg font-black tracking-[-0.02em]">
          gmgm
        </Link>
      </div>
      <section className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-md flex-col">
        <div>
          <p className="w-fit rounded-full border border-white/15 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-neutral-300">
            Digital Passport & Journey Demo
          </p>
          <h1 className="mt-8 text-4xl font-semibold leading-tight">
            디지털 라이프 경험
          </h1>
          <p className="mt-5 text-base leading-7 text-neutral-300">
            함께 제시하는 NFC 칩/카드를 통해, 전체 흐름을 체험하실 수 있습니다.
          </p>
        </div>

        <div className="mt-10 space-y-4">
          <div className="grid grid-cols-4 gap-3">
            <Link
              href="/nfc/gm-001"
              className="col-span-1 flex h-14 items-center justify-center rounded-md bg-white text-sm font-semibold text-black transition hover:bg-neutral-200"
            >
              IRL BX1
            </Link>
            <Link
              href="/nfc/gm-002"
              className="col-span-1 flex h-14 items-center justify-center rounded-md bg-white text-sm font-semibold text-black transition hover:bg-neutral-200"
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
          <div className="space-y-2 text-xs leading-5 text-neutral-400">
            <p>#설명 1. IRL : In real life, BX : Brand experience</p>
            <p>
              #설명 2. IRL BX 경우, 특히 별도의 NFC 칩을 통해 더 직관적으로 경험하실 수 있습니다.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
