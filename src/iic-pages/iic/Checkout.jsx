"use client";

import Link from "next/link";
import { useState } from "react";

const legacySteps = [
  "브랜드 웹사이트 이동",
  "로그인",
  "장바구니 담기",
  "결제 정보 입력",
  "평균 3분, 이탈률 60%",
];

const ucpSteps = ["Gemini에서 바로", "원클릭 결제", "평균 8초, 이탈률 ~0%"];

export default function Checkout() {
  const [purchasing, setPurchasing] = useState(false);
  const [complete, setComplete] = useState(false);
  const [minting, setMinting] = useState(false);
  const [nftIssued, setNftIssued] = useState(false);

  function buyNow() {
    setPurchasing(true);
    window.setTimeout(() => {
      setPurchasing(false);
      setComplete(true);
      setMinting(true);

      window.setTimeout(() => {
        setMinting(false);
        setNftIssued(true);
      }, 1600);
    }, 1500);
  }

  return (
    <div className="mx-auto w-full max-w-3xl text-[var(--iic-text)]">
      <style jsx>{`
        @keyframes iic-ready-blink {
          0%,
          100% {
            opacity: 0.55;
            box-shadow: 0 0 0 0 rgba(184, 146, 42, 0.42);
          }
          50% {
            opacity: 1;
            box-shadow: 0 0 0 8px rgba(184, 146, 42, 0);
          }
        }

        @keyframes iic-check-pop {
          0% {
            transform: scale(0.55);
            opacity: 0;
          }
          65% {
            transform: scale(1.08);
            opacity: 1;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>

      <section className="space-y-5">
        <div className="rounded-3xl border border-[var(--iic-border)] bg-[var(--iic-card)] p-5">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--iic-gold)]">
            UCP Checkout Simulation
          </p>
          <h1 className="mt-3 text-4xl font-black leading-tight tracking-tight">
            검색 후 바로 구매
          </h1>
          <p className="mt-3 text-sm leading-6 text-[var(--iic-text-muted)]">
            Gemini에서 상품을 찾고, 웹사이트 이동 없이 재고 확인과 결제, NFT 발행까지 한번에 이어지는 흐름
          </p>
        </div>

        <div className="rounded-[28px] bg-white p-3 text-black shadow-2xl shadow-black/40">
          <div className="flex min-h-12 items-center gap-3 rounded-full border border-neutral-200 bg-neutral-50 px-4">
            <span className="text-lg font-black text-blue-500">G</span>
            <input
              value="gentle monster new drop FRIDA"
              readOnly
              aria-label="Gemini search display"
              className="w-full bg-transparent text-sm font-medium text-neutral-800 outline-none"
            />
            <span className="text-sm text-neutral-400">Gemini</span>
          </div>
        </div>

        {!complete ? (
          <div className="rounded-3xl border border-[var(--iic-border)] bg-[var(--iic-card)] p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--iic-gold)]">
                  AI Answer
                </p>
                <h2 className="mt-3 text-3xl font-black">FRIDA × Felix Edition</h2>
              </div>
              <span className="rounded-full bg-[#1D9E75] px-3 py-2 text-xs font-black text-black">
                재고 있음 · 1,203개 남음
              </span>
            </div>

            <div className="iic-on-dark mt-5 rounded-3xl border border-[var(--iic-border)] bg-black p-5">
              <p className="iic-on-dark-muted text-sm text-[var(--iic-text-muted)]">가격</p>
              <p className="mt-1 text-4xl font-black">$300 USDC</p>
            </div>

            <div className="mt-6 space-y-4">
              {[
                ["①", "✓ 상품 확인 완료", "done"],
                ["②", "✓ 재고·가격 확정", "done"],
                ["③", "→ 결제 준비 완료", "ready"],
              ].map(([number, label, status]) => (
                <div key={label} className="grid grid-cols-[42px_1fr] gap-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-black ${
                      status === "done"
                        ? "bg-[#1D9E75] text-black"
                        : "bg-[var(--iic-gold)] text-black"
                    }`}
                    style={status === "ready" ? { animation: "iic-ready-blink 1.15s ease-in-out infinite" } : undefined}
                  >
                    {number}
                  </div>
                  <div className="rounded-2xl border border-[var(--iic-border)] bg-black/35 p-3">
                    <p
                      className={`text-sm font-black ${
                        status === "done" ? "text-[#1D9E75]" : "text-[var(--iic-gold-light)]"
                      }`}
                    >
                      {label}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={buyNow}
              disabled={purchasing}
              className="mt-6 flex min-h-14 w-full items-center justify-center rounded-full bg-[var(--iic-gold)] px-5 py-4 text-base font-black text-black transition hover:bg-[var(--iic-gold-light)] active:scale-95 disabled:opacity-70"
            >
              {purchasing ? (
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-black/20 border-t-black" />
              ) : (
                "Google Pay로 지금 구매"
              )}
            </button>
            <p className="mt-3 text-center text-xs text-[var(--iic-text-muted)]">
              웹사이트 이동 없이 여기서 바로 완료됩니다
            </p>
          </div>
        ) : (
          <div className="rounded-3xl border border-[rgba(29,158,117,0.45)] bg-[var(--iic-card)] p-5 text-center">
            <div
              className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#1D9E75] text-4xl font-black text-black"
              style={{ animation: "iic-check-pop 0.48s ease-out both" }}
            >
              ✓
            </div>
            <h2 className="mt-5 text-3xl font-black">구매 완료 ✓</h2>

            <div className="mt-5 rounded-3xl border border-[var(--iic-border)] bg-black/45 p-5 text-left">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--iic-gold)]">
                Receipt
              </p>
              <div className="mt-4 grid gap-3 text-sm">
                {[
                  ["상품", "FRIDA × Felix Edition"],
                  ["결제", "$300 USDC"],
                  ["트랜잭션 해시", "0x9f21...a8c4"],
                  ["시간", "방금 전"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="flex items-center justify-between gap-4 rounded-2xl border border-[var(--iic-border)] bg-[var(--iic-card)] p-3"
                  >
                    <span className="text-[var(--iic-text-muted)]">{label}</span>
                    <span className="text-right font-black">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 rounded-2xl border border-[var(--iic-border)] bg-black/35 p-4">
              {minting ? (
                <div className="flex items-center justify-center gap-3 text-sm font-black text-[var(--iic-text)]">
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-[var(--iic-gold)]/30 border-t-[var(--iic-gold)]" />
                  NFT #2341 지갑에 발행 중...
                </div>
              ) : (
                <p className="text-sm font-black text-[#1D9E75]">
                  {nftIssued ? "NFT #2341 발행 완료 ✓" : "NFT #2341 지갑에 발행 중..."}
                </p>
              )}
            </div>

            <Link
              href="/iic/drop"
              className="mt-5 flex min-h-12 w-full items-center justify-center rounded-full bg-[var(--iic-gold)] px-5 py-3 text-sm font-black text-black transition hover:bg-[var(--iic-gold-light)] active:scale-95"
            >
              내 NFT 확인 →
            </Link>
          </div>
        )}

        <div className="iic-light-soft-panel rounded-3xl border border-[var(--iic-border)] bg-black/35 p-5">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--iic-gold)]">
            Checkout Comparison
          </p>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-3xl border border-[rgba(216,90,48,0.45)] bg-[rgba(216,90,48,0.08)] p-4">
              <h3 className="text-lg font-black">기존 방식</h3>
              <div className="mt-4 space-y-3">
                {legacySteps.map((item) => (
                  <p key={item} className="text-sm leading-5 text-[var(--iic-text-muted)]">
                    <span className="font-black text-[#D85A30]">✗</span> {item}
                  </p>
                ))}
              </div>
            </div>
            <div className="rounded-3xl border border-[rgba(29,158,117,0.45)] bg-[rgba(29,158,117,0.08)] p-4">
              <h3 className="text-lg font-black">UCP 방식</h3>
              <div className="mt-4 space-y-3">
                {ucpSteps.map((item) => (
                  <p key={item} className="text-sm leading-5 text-[var(--iic-text-muted)]">
                    <span className="font-black text-[#1D9E75]">✓</span> {item}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
