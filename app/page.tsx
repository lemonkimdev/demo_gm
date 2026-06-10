import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-950 px-5 py-10 text-white">
      <section className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-md flex-col justify-between">
        <div>
          <p className="w-fit rounded-full border border-white/15 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-neutral-300">
            ANN [AI+NFT+NFC] Passport Demo
          </p>
          <h1 className="mt-8 text-4xl font-semibold leading-tight">
            NFC 태그로 여는 구매 후속 경험
          </h1>
          <p className="mt-5 text-base leading-7 text-neutral-300">
            면접장에서 스마트폰으로 NFC 스티커를 태그하면 제품 여권,
            NFT Claim 데모, 3개월 뒤 AI 추천 흐름을 바로 시연할 수 있습니다.
          </p>
        </div>

        <div className="space-y-3 pb-4">
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
      </section>
    </main>
  );
}
