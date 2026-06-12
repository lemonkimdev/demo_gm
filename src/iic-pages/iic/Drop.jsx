"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const initialCountdownSeconds = 2 * 24 * 60 * 60 + 6 * 60 * 60 + 32 * 60 + 14;

function getRemaining(totalSeconds) {
  const safeSeconds = Math.max(0, totalSeconds);
  const days = Math.floor(safeSeconds / (24 * 60 * 60));
  const hours = Math.floor((safeSeconds / (60 * 60)) % 24);
  const minutes = Math.floor((safeSeconds / 60) % 60);
  const seconds = Math.floor(safeSeconds % 60);

  return { days, hours, minutes, seconds };
}

export default function Drop() {
  const [step, setStep] = useState("waiting");
  const [remainingSeconds, setRemainingSeconds] = useState(initialCountdownSeconds);
  const [email, setEmail] = useState("");
  const [wallet, setWallet] = useState("0x1a2b3c4d5e6f789z");
  const [registered, setRegistered] = useState(false);
  const [minted, setMinted] = useState(2341);
  const [quantity, setQuantity] = useState(1);
  const [buying, setBuying] = useState(false);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setRemainingSeconds((current) => Math.max(0, current - 1));
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (step !== "live") {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setMinted((current) => Math.min(5000, current + 1));
    }, 1200);

    return () => window.clearInterval(timer);
  }, [step]);

  const totalPrice = useMemo(() => quantity * 300, [quantity]);
  const remaining = getRemaining(remainingSeconds);
  const progress = Math.min(100, (minted / 5000) * 100);

  function submitWhitelist(event) {
    event.preventDefault();
    setRegistered(true);
  }

  function buyNow() {
    setBuying(true);
    window.setTimeout(() => {
      setBuying(false);
      setStep("success");
    }, 2000);
  }

  return (
    <div className="mx-auto w-full max-w-3xl text-[var(--iic-text)]">
      {step === "waiting" ? (
        <section className="space-y-5">
          <div className="overflow-hidden rounded-3xl border border-[var(--iic-gold)] bg-[radial-gradient(circle_at_50%_35%,rgba(184,146,42,0.24),transparent_34%),#050505] p-6 shadow-2xl shadow-black/60">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-[rgba(184,146,42,0.45)] bg-white">
              <Image
                src="/iic-assets/frida-01.webp"
                alt="FRIDA reference sunglasses"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 720px"
                className="object-contain"
              />
            </div>
            <p className="mt-4 text-xs leading-5 text-[var(--iic-text-muted)]">
              이 사진은 참조용이며, 본 화면은 데모 화면으로, 상업적인 내용에 해당하지 않습니다.
            </p>
          </div>

          <div className="rounded-3xl border border-[var(--iic-border)] bg-[var(--iic-card)] p-5">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--iic-gold)]">
              Limited Eyewear Drop
            </p>
            <h1 className="mt-3 text-4xl font-black tracking-tight">
              FRIDA × Felix Edition
            </h1>
            <p className="mt-2 text-sm text-[var(--iic-text-muted)]">
              전 세계 5,000개 한정 · $300 USDC
            </p>

            <div className="mt-6">
              <p className="text-sm font-semibold text-[var(--iic-gold-light)]">
                드롭까지
              </p>
              <div className="mt-3 grid grid-cols-4 gap-2">
                {[
                  ["일", remaining.days],
                  ["시", remaining.hours],
                  ["분", remaining.minutes],
                  ["초", remaining.seconds],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="iic-on-dark rounded-2xl border border-[var(--iic-border)] bg-black p-3 text-center"
                  >
                    <p className="text-3xl font-black tabular-nums">
                      {String(value).padStart(2, "0")}
                    </p>
                    <p className="iic-on-dark-muted mt-1 text-xs text-[var(--iic-text-muted)]">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <form onSubmit={submitWhitelist} className="mt-6 space-y-3">
              <input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="email@example.com"
                className="iic-on-dark min-h-11 w-full rounded-2xl border border-[var(--iic-border)] bg-black px-4 text-sm text-[var(--iic-text)] outline-none transition placeholder:text-neutral-400 focus:border-[var(--iic-gold)]"
              />
              <input
                value={wallet}
                onChange={(event) => setWallet(event.target.value)}
                placeholder="Wallet address"
                className="iic-on-dark min-h-11 w-full rounded-2xl border border-[var(--iic-border)] bg-black px-4 text-sm text-[var(--iic-text)] outline-none transition placeholder:text-neutral-400 focus:border-[var(--iic-gold)]"
              />
              <button className="min-h-11 w-full rounded-full bg-[var(--iic-gold)] px-5 py-3 text-sm font-black text-black transition active:scale-95 hover:bg-[var(--iic-gold-light)]">
                알림 받기
              </button>
            </form>

            {registered ? (
              <p className="mt-4 rounded-2xl border border-[rgba(184,146,42,0.35)] bg-[rgba(184,146,42,0.12)] p-3 text-sm font-semibold text-[var(--iic-gold-light)]">
                등록 완료 ✓ 드롭 시작 시 알림드립니다
              </p>
            ) : null}

            <button
              onClick={() => setStep("live")}
              className="mt-5 min-h-11 w-full rounded-full border border-[var(--iic-border)] px-5 py-3 text-sm font-bold text-[var(--iic-text-muted)] transition active:scale-95 hover:border-[var(--iic-gold)] hover:text-[var(--iic-text)]"
            >
              지금 드롭 시작 (데모)
            </button>
          </div>
        </section>
      ) : null}

      {step === "live" ? (
        <section className="space-y-5">
          <div className="rounded-3xl border border-red-500/30 bg-red-500/10 p-5">
            <p className="flex items-center gap-2 text-sm font-black text-red-300">
              <span className="h-3 w-3 animate-pulse rounded-full bg-red-500" />
              🔴 LIVE NOW
            </p>
            <div className="mt-4 flex items-end justify-between gap-4">
              <div>
                <h1 className="text-3xl font-black">FRIDA × Felix Edition</h1>
                <p className="mt-1 text-sm text-[var(--iic-text-muted)]">
                  5,000 pieces · $300 USDC each
                </p>
              </div>
              <p className="text-right text-sm font-bold text-[var(--iic-gold-light)]">
                {minted.toLocaleString()} / 5,000
                <span className="block text-xs font-medium text-[var(--iic-text-muted)]">
                  민팅 완료
                </span>
              </p>
            </div>
            <div className="mt-4 h-3 overflow-hidden rounded-full bg-black">
              <div
                className="h-full rounded-full bg-[var(--iic-gold)] transition-all duration-700"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="rounded-3xl border border-[var(--iic-border)] bg-[var(--iic-card)] p-5">
            <p className="text-sm font-semibold text-[var(--iic-text-muted)]">
              수량 선택
            </p>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {[1, 2, 3].map((count) => (
                <button
                  key={count}
                  onClick={() => setQuantity(count)}
                  className={`min-h-11 rounded-2xl border px-4 py-3 text-sm font-black transition active:scale-95 ${
                    quantity === count
                      ? "border-[var(--iic-gold)] bg-[var(--iic-gold)] text-black"
                      : "border-[var(--iic-border)] bg-black text-[var(--iic-text)]"
                  }`}
                >
                  {count}
                </button>
              ))}
            </div>

            <div className="mt-5 rounded-2xl border border-[var(--iic-border)] bg-black p-4">
              <p className="text-sm text-[var(--iic-text-muted)]">합계</p>
              <p className="mt-1 text-3xl font-black">${totalPrice} USDC</p>
            </div>

            <button
              onClick={buyNow}
              disabled={buying}
              className="mt-5 flex min-h-12 w-full items-center justify-center rounded-full bg-[var(--iic-gold)] px-5 py-3 text-sm font-black text-black transition active:scale-95 hover:bg-[var(--iic-gold-light)] disabled:opacity-70"
            >
              {buying ? (
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-black/20 border-t-black" />
              ) : (
                "지금 구매하기"
              )}
            </button>
          </div>
        </section>
      ) : null}

      {step === "success" ? (
        <section className="space-y-5">
          <div className="rounded-3xl border border-[rgba(184,146,42,0.45)] bg-[var(--iic-card)] p-6 text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[var(--iic-gold)] text-4xl text-black">
              ✓
            </div>
            <h1 className="mt-5 text-3xl font-black">Purchase Complete</h1>
            <p className="mt-2 text-sm text-[var(--iic-text-muted)]">
              NFT warranty has been minted to your wallet.
            </p>
          </div>

          <div className="rounded-3xl border border-[var(--iic-gold)] bg-[linear-gradient(145deg,#17110a,#050505)] p-5">
            <div className="flex aspect-[1.45] items-center justify-center rounded-2xl border border-[rgba(184,146,42,0.35)] bg-black/70 text-7xl">
              🕶️
            </div>
            <p className="mt-5 text-xs font-bold uppercase tracking-[0.22em] text-[var(--iic-gold)]">
              NFT Card
            </p>
            <h2 className="mt-2 text-2xl font-black">FRIDA × Felix Edition</h2>
            <div className="mt-4 space-y-2 text-sm text-[var(--iic-text-muted)]">
              <p>#2341 / 5000</p>
              <p>Wallet 0x1a2b...9z</p>
              <p>Tx 0x9f21...a8c4</p>
            </div>
          </div>

          <p className="rounded-2xl border border-[var(--iic-border)] bg-black/35 p-4 text-sm leading-6 text-[var(--iic-text-muted)]">
            2차 거래 시 판매금의 5%가 젠틀몬스터에 자동 지급됩니다
          </p>

          <Link
            href="/iic/points"
            className="flex min-h-12 w-full items-center justify-center rounded-full bg-[var(--iic-gold)] px-5 py-3 text-sm font-black text-black transition active:scale-95 hover:bg-[var(--iic-gold-light)]"
          >
            내 IIC 포인트 확인 →
          </Link>
        </section>
      ) : null}
    </div>
  );
}
