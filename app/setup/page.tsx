import Link from "next/link";

const steps = [
  "NFC Tools 앱에서 Write > Add Record > URL 선택",
  "배포 링크 입력",
  "NTAG215 스티커에 Write",
  "스마트폰을 태그하면 데모 페이지가 열린다",
];

export default function SetupPage() {
  return (
    <main className="min-h-screen bg-neutral-950 px-5 py-8 text-white">
      <section className="mx-auto w-full max-w-md">
        <p className="w-fit rounded-full border border-white/15 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-neutral-300">
          ANN [AI+NFT+NFC] Passport Demo
        </p>
        <h1 className="mt-8 text-3xl font-semibold leading-tight">
          NFC 스티커 설정 방법
        </h1>
        <div className="mt-7 space-y-3">
          {steps.map((step, index) => (
            <div
              key={step}
              className="rounded-md border border-white/10 bg-white/[0.03] p-4"
            >
              <p className="text-xs font-semibold text-neutral-500">
                STEP {index + 1}
              </p>
              <p className="mt-2 text-base leading-7 text-neutral-100">{step}</p>
            </div>
          ))}
        </div>
        <div className="mt-7 rounded-md bg-white p-4 text-black">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">
            URL Examples
          </p>
          <div className="mt-3 space-y-2 font-mono text-sm">
            <p>https://your-vercel-app.vercel.app/nfc/gm-001</p>
            <p>https://your-vercel-app.vercel.app/nfc/gm-002</p>
            <p>https://your-vercel-app.vercel.app/nfc/gm-003</p>
          </div>
        </div>
        <Link
          href="/nfc/gm-001"
          className="mt-7 flex h-14 w-full items-center justify-center rounded-md bg-white text-base font-semibold text-black transition hover:bg-neutral-200"
        >
          gm-001 데모 보기
        </Link>
      </section>
    </main>
  );
}
