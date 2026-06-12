"use client";

import Image from "next/image";
import Link from "next/link";

const benefits = [
  ["👑", "평생 VIP", "IIC 전 브랜드 최우선 접근"],
  ["🕐", "48시간 선공개", "모든 젠틀몬스터 드롭"],
  ["🏛️", "Global Citizen 즉시 획득", "HAUS NOWHERE 4개 도시"],
  ["🔗", "온체인 ID 연동", "글래스 착용 이력 자동 기록"],
];

const activities = [
  "HAUS NOWHERE 서울 방문 · SBT 발행 · 11.12",
  "FRIDA 컬렉션 열람 · 응시 3분 · 11.13",
  "SYLPH 향수 UCP 결제 · $80 USDC · 11.14",
];

const details = [
  ["컨트랙트", "0x4f7a... (Ethereum L2)"],
  ["토큰 ID", "42"],
  ["민팅일", "2026.11.10"],
  ["구매가", "$500 USDC"],
];

export default function Genesis() {
  return (
    <div className="mx-auto w-full max-w-3xl text-[var(--iic-text)]">
      <style jsx>{`
        @keyframes iic-genesis-shimmer {
          0% {
            transform: translateX(-140%) rotate(18deg);
          }
          52%,
          100% {
            transform: translateX(170%) rotate(18deg);
          }
        }

        @keyframes iic-gold-breathe {
          0%,
          100% {
            box-shadow: 0 0 0 rgba(184, 146, 42, 0);
          }
          50% {
            box-shadow: 0 0 38px rgba(184, 146, 42, 0.32);
          }
        }
      `}</style>

      <section className="space-y-5">
        <div className="relative min-h-[52vh] overflow-hidden rounded-[32px] border border-[var(--iic-gold)] bg-[radial-gradient(circle_at_50%_18%,rgba(184,146,42,0.22),transparent_34%),linear-gradient(145deg,#17120a,#050505_58%,#111)] p-5 shadow-2xl shadow-black/70">
          <div
            className="pointer-events-none absolute -inset-y-24 left-0 w-20 bg-[linear-gradient(90deg,transparent,rgba(212,172,82,0.02),rgba(212,172,82,0.55),rgba(255,244,200,0.62),rgba(212,172,82,0.05),transparent)] blur-[1px]"
            style={{ animation: "iic-genesis-shimmer 3.6s ease-in-out infinite" }}
          />
          <div className="relative z-10 flex min-h-[48vh] flex-col justify-between rounded-[24px] border border-[rgba(184,146,42,0.36)] bg-black/35 p-5">
            <div className="flex items-start justify-between gap-4">
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-[var(--iic-gold)]">
                Genesis Owner Certificate
              </p>
              <span className="rounded-full border border-[var(--iic-gold)] bg-[rgba(184,146,42,0.12)] px-3 py-1 text-xs font-black text-[var(--iic-gold-light)]">
                1 of 5,000
              </span>
            </div>

            <div className="py-8 text-center">
              <div
                className="relative mx-auto h-40 w-64 max-w-full overflow-hidden rounded-[36px] border border-[rgba(184,146,42,0.45)] bg-white"
                style={{ animation: "iic-gold-breathe 3s ease-in-out infinite" }}
              >
                <Image
                  src="/iic-assets/genesis-ai-glasses.jpg"
                  alt="GENTLE MONSTER AI Glasses reference"
                  fill
                  priority
                  sizes="(max-width: 768px) 256px, 256px"
                  className="object-cover"
                />
              </div>
              <p className="iic-on-dark-muted mx-auto mt-4 max-w-xs text-xs leading-5 text-[var(--iic-text-muted)]">
                이 사진은 참조용이며, 본 화면은 데모 화면으로, 상업적인 내용에 해당하지 않습니다.
              </p>
              <h1 className="iic-on-dark mt-8 text-4xl font-black leading-tight tracking-tight">
                GENTLE MONSTER AI Glasses
              </h1>
              <p className="iic-keep-gold mt-3 text-2xl font-black text-[var(--iic-gold-light)]">
                Genesis #0042 / 5000
              </p>
            </div>

            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="iic-keep-gold text-xs text-[var(--iic-gold-light)]">Wallet</p>
                <p className="iic-on-dark mt-1 text-sm font-black">0x1a2b...9f8e</p>
              </div>
              <p className="text-right text-xs font-bold text-[var(--iic-text-muted)]">
                다시는 발행되지 않습니다
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {benefits.map(([icon, title, description]) => (
            <div
              key={title}
              className="rounded-3xl border border-[var(--iic-gold)] bg-[var(--iic-card)] p-4 shadow-lg shadow-black/30"
            >
              <div className="flex items-center gap-2">
                <p className="text-lg leading-none">{icon}</p>
                <h2 className="text-lg font-black leading-tight">{title}</h2>
              </div>
              <p className="mt-2 text-xs leading-5 text-[var(--iic-text-muted)]">
                {description}
              </p>
            </div>
          ))}
        </div>

        <div className="iic-light-soft-panel rounded-3xl border border-[var(--iic-border)] bg-black/35 p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--iic-gold)]">
                On-chain Activity
              </p>
              <h2 className="mt-2 text-2xl font-black">글래스 착용 기록 (온체인)</h2>
            </div>
            <span className="rounded-full border border-[#1D9E75]/40 bg-[#1D9E75]/10 px-3 py-2 text-xs font-black text-[#1D9E75]">
              글래스 연결됨 🟢
            </span>
          </div>

          <div className="mt-6 space-y-0">
            {activities.map((activity, index) => (
              <div key={activity} className="grid grid-cols-[26px_1fr] gap-3">
                <div className="relative flex justify-center">
                  <span className="mt-1 h-3.5 w-3.5 rounded-full border-2 border-[var(--iic-gold)] bg-black" />
                  {index < activities.length - 1 ? (
                    <span className="absolute top-6 h-[calc(100%-2px)] w-px bg-[var(--iic-border)]" />
                  ) : null}
                </div>
                <p className="pb-5 text-sm leading-6 text-[var(--iic-text-muted)]">
                  {activity}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-[var(--iic-border)] bg-[var(--iic-card)] p-5">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--iic-gold)]">
            NFT Details
          </p>
          <div className="mt-5 grid gap-3 text-sm">
            {details.map(([label, value]) => (
              <div
                key={label}
                className="iic-on-dark-muted flex items-center justify-between gap-4 rounded-2xl border border-[var(--iic-border)] bg-black p-3"
              >
                <span className="iic-on-dark-muted text-[var(--iic-text-muted)]">{label}</span>
                <span className="iic-on-dark-muted text-right font-black">{value}</span>
              </div>
            ))}
            <div className="rounded-2xl border border-[var(--iic-gold)] bg-[rgba(184,146,42,0.12)] p-4">
              <p className="text-xs text-[var(--iic-text-muted)]">현재 추정 시세</p>
              <p className="mt-1 text-3xl font-black text-[var(--iic-gold-light)]">$1,200</p>
            </div>
          </div>
        </div>

        <div className="iic-light-soft-panel rounded-3xl border border-[var(--iic-border)] bg-black/35 p-5">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--iic-gold)]">
            Resale Status
          </p>
          <div className="mt-4 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-black">리셀</h2>
              <p className="mt-2 text-sm text-[var(--iic-text-muted)]">
                42개 판매 중 / 4,958개 보유 중
              </p>
            </div>
            <div className="group relative">
              <button
                type="button"
                disabled
                className="min-h-11 rounded-full border border-[var(--iic-border)] px-4 py-3 text-xs font-black text-[var(--iic-text-muted)] opacity-70"
              >
                판매 등록
              </button>
              <div className="pointer-events-none absolute bottom-full right-0 mb-3 w-56 rounded-2xl border border-[var(--iic-gold)] bg-[var(--iic-card)] p-3 text-xs leading-5 text-[var(--iic-text)] opacity-0 shadow-2xl shadow-black/60 transition group-hover:opacity-100 group-active:opacity-100">
                Genesis 보유자는 판매될 경우, Genesis 고유의 평생 혜택을 잃게 됩니다. 정말로 선택하시겠습니까?
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-2 sm:grid-cols-2">
          <Link
            href="/iic/drop"
            className="flex min-h-12 w-full items-center justify-center rounded-full bg-[var(--iic-gold)] px-5 py-3 text-sm font-black text-black transition hover:bg-[var(--iic-gold-light)] active:scale-95"
          >
            VIP 전용 드롭 보러 가기 →
          </Link>
          <Link
            href="/iic/points"
            className="flex min-h-12 w-full items-center justify-center rounded-full border border-[var(--iic-gold)] px-5 py-3 text-sm font-black text-[var(--iic-gold-light)] transition hover:bg-[rgba(184,146,42,0.12)] active:scale-95"
          >
            내 IIC 포인트 확인 →
          </Link>
        </div>
      </section>
    </div>
  );
}
