import Link from "next/link";

export default function Home() {
  const showDemoLinks = false;

  return (
    <main className="min-h-screen bg-neutral-950 px-5 py-10 text-white">
      <section className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-md flex-col">
        <div>
          <p className="w-fit rounded-full border border-white/15 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-neutral-300">
            Digital Passport & Journey Demo
          </p>
          <h1 className="mt-8 text-4xl font-semibold leading-tight">
            디지털 라이프 경험
          </h1>
          <p className="mt-5 text-base leading-7 text-neutral-300">
            제공/전달하는 NFC 칩을 통해, 전체 흐름을 체험하실 수 있습니다.
          </p>
        </div>

        {showDemoLinks ? (
          // Temporarily hidden so visitors without NFC/direct links cannot enter demos.
          <div className="mt-16 space-y-3">
            <Link
              href="/nfc/gm-001"
              className="flex h-14 items-center justify-center rounded-md bg-white text-base font-semibold text-black transition hover:bg-neutral-200"
            >
              데모 열기
            </Link>
            <Link
              href="/setup"
              className="flex h-14 items-center justify-center rounded-md border border-white/15 text-base font-semibold text-white transition hover:bg-white/10"
            >
              NFC 설정 방법
            </Link>
          </div>
        ) : null}
      </section>
    </main>
  );
}
