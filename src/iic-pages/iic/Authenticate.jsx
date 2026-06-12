"use client";

import { useEffect, useState } from "react";

const timeline = [
  {
    label: "제조",
    date: "2026.05",
    wallet: "GM Factory",
  },
  {
    label: "1번째 소유자",
    date: "2026.05",
    wallet: "0x8f2a...91c0",
  },
  {
    label: "2번째 소유자",
    date: "2026.06",
    wallet: "0x41bd...7e22",
  },
  {
    label: "현재 소유자",
    date: "2026.06",
    wallet: "0x1a2b...9z",
  },
];

export default function Authenticate() {
  const [method, setMethod] = useState("qr");
  const [serial, setSerial] = useState("");
  const [step, setStep] = useState("start");
  const [scanning, setScanning] = useState(false);
  const [isAuthentic, setIsAuthentic] = useState(true);

  useEffect(() => {
    if (!scanning) {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      setScanning(false);
      setIsAuthentic(true);
      setStep("result");
    }, 2000);

    return () => window.clearTimeout(timer);
  }, [scanning]);

  function authenticate(event) {
    event.preventDefault();
    setIsAuthentic(true);
    setStep("result");
  }

  function startScan() {
    setMethod("qr");
    setScanning(true);
  }

  return (
    <div className="mx-auto w-full max-w-3xl text-[var(--iic-text)]">
      <style jsx>{`
        @keyframes iic-scan-line {
          0% {
            transform: translateY(0);
            opacity: 0.2;
          }
          12% {
            opacity: 1;
          }
          50% {
            transform: translateY(212px);
            opacity: 1;
          }
          100% {
            transform: translateY(0);
            opacity: 0.2;
          }
        }
      `}</style>

      <section className="space-y-5">
        <div className="rounded-3xl border border-[var(--iic-border)] bg-[var(--iic-card)] p-5">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--iic-gold)]">
            Product Authentication
          </p>
          <h1 className="mt-3 text-4xl font-black leading-tight tracking-tight">
            내 제품, 진품?
          </h1>
          <p className="mt-3 text-sm leading-6 text-[var(--iic-text-muted)]">
            QR 스캔 또는 시리얼 넘버 입력으로 제품 등록 기록과 소유 이력을 즉시 확인
          </p>
        </div>

        {step === "start" ? (
          <div className="rounded-3xl border border-[var(--iic-border)] bg-black/35 p-4">
            <div className="grid grid-cols-2 gap-2 rounded-full border border-[var(--iic-border)] bg-black p-1">
              {[
                ["qr", "QR 스캔"],
                ["serial", "시리얼 넘버 입력"],
              ].map(([value, label]) => (
                <button
                  key={value}
                  onClick={() => setMethod(value)}
                  className={`min-h-11 rounded-full px-3 text-sm font-black transition active:scale-95 ${
                    method === value
                      ? "bg-[var(--iic-gold)] text-black"
                      : "iic-on-dark-muted text-[var(--iic-text-muted)] hover:bg-neutral-800 hover:text-white"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {method === "qr" ? (
              <div className="mt-5">
                <button
                  onClick={startScan}
                  disabled={scanning}
                  className="relative flex h-64 w-full overflow-hidden rounded-3xl border border-[rgba(29,158,117,0.45)] bg-[radial-gradient(circle_at_50%_35%,rgba(29,158,117,0.18),transparent_38%),#050505] transition active:scale-[0.99] disabled:cursor-wait"
                >
                  <span className="absolute inset-5 rounded-2xl border border-[rgba(242,239,232,0.1)]" />
                  {scanning ? (
                    <span
                      className="absolute left-6 right-6 top-6 h-1 rounded-full bg-[#1D9E75] shadow-[0_0_24px_rgba(29,158,117,0.9)]"
                      style={{ animation: "iic-scan-line 1.35s ease-in-out infinite" }}
                    />
                  ) : null}
                  <span className="m-auto flex flex-col items-center gap-3 text-center">
                    <span className="text-6xl">▣</span>
                    <span className="text-sm font-bold text-[var(--iic-text)]">
                      {scanning ? "스캔 중..." : "카메라 박스를 눌러 QR 스캔"}
                    </span>
                  </span>
                </button>
              </div>
            ) : (
              <form onSubmit={authenticate} className="mt-5 space-y-3">
                <input
                  value={serial}
                  onChange={(event) => setSerial(event.target.value)}
                  placeholder="예) GM-2026-FR-0042"
                  className="iic-on-dark min-h-12 w-full rounded-2xl border border-[var(--iic-border)] bg-black px-4 text-sm text-[var(--iic-text)] outline-none transition placeholder:text-neutral-400 focus:border-[var(--iic-gold)]"
                />
                <button className="min-h-12 w-full rounded-full bg-[var(--iic-gold)] px-5 py-3 text-sm font-black text-black transition hover:bg-[var(--iic-gold-light)] active:scale-95">
                  인증하기
                </button>
              </form>
            )}
          </div>
        ) : null}

        {step === "result" ? (
          <div className="space-y-5">
            <div
              className={`rounded-3xl border p-5 ${
                isAuthentic
                  ? "border-[rgba(29,158,117,0.45)] bg-[rgba(29,158,117,0.1)]"
                  : "border-[rgba(216,90,48,0.55)] bg-[rgba(216,90,48,0.1)]"
              }`}
            >
              <div
                className={`inline-flex min-h-11 items-center rounded-full px-4 text-sm font-black ${
                  isAuthentic ? "bg-[#1D9E75] text-black" : "bg-[#D85A30] text-black"
                }`}
              >
                {isAuthentic ? "✓ 정품 확인" : "✗ 인증 실패"}
              </div>

              {isAuthentic ? (
                <div className="mt-5 rounded-3xl border border-[var(--iic-border)] bg-[var(--iic-card)] p-5">
                  <h2 className="text-2xl font-black">FRIDA · 2026 시즌</h2>
                  <div className="mt-4 grid gap-3 text-sm">
                    {[
                      ["출시 소비자가", "$320"],
                      ["제조일", "2026년 5월"],
                      ["블록체인 기록", "0x7c2e...4a91"],
                    ].map(([label, value]) => (
                      <div
                        key={label}
                        className="iic-on-dark flex items-center justify-between gap-4 rounded-2xl border border-[var(--iic-border)] bg-black p-3"
                      >
                        <span className="iic-on-dark-muted text-[var(--iic-text-muted)]">{label}</span>
                        <span className="iic-on-dark text-right font-bold text-[var(--iic-text)]">
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="mt-4 rounded-2xl border border-[rgba(216,90,48,0.35)] bg-black/35 p-4 text-sm leading-6 text-[var(--iic-text)]">
                  이 제품은 공식 등록 기록이 없습니다. 젠틀몬스터 고객센터로 문의하세요.
                </p>
              )}

              <button
                onClick={() => setIsAuthentic((current) => !current)}
                className="mt-5 min-h-11 w-full rounded-full border border-[var(--iic-border)] px-5 py-3 text-sm font-black text-[var(--iic-text-muted)] transition hover:border-[#D85A30] hover:text-[var(--iic-text)] active:scale-95"
              >
                가품 결과 미리보기 (데모)
              </button>
            </div>

            {isAuthentic ? (
              <>
                <div className="rounded-3xl border border-[var(--iic-border)] bg-[var(--iic-card)] p-5">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--iic-gold)]">
                        Ownership History
                      </p>
                      <h2 className="mt-2 text-2xl font-black">소유 이력</h2>
                    </div>
                    <a
                      href="https://etherscan.io/"
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full border border-[var(--iic-border)] px-3 py-2 text-xs font-bold text-[var(--iic-text-muted)] transition hover:border-[var(--iic-gold)] hover:text-[var(--iic-text)] active:scale-95"
                    >
                      Etherscan에서 확인
                    </a>
                  </div>

                  <div className="mt-6 space-y-0">
                    {timeline.map((item, index) => (
                      <div key={item.label} className="grid grid-cols-[28px_1fr] gap-3">
                        <div className="relative flex justify-center">
                          <span className="mt-1 h-4 w-4 rounded-full border-2 border-[#1D9E75] bg-black shadow-[0_0_18px_rgba(29,158,117,0.45)]" />
                          {index < timeline.length - 1 ? (
                            <span className="absolute top-6 h-[calc(100%-4px)] w-px bg-[var(--iic-border)]" />
                          ) : null}
                        </div>
                        <div className="pb-5">
                          <p className="text-sm font-black text-[var(--iic-text)]">
                            {item.label}
                          </p>
                          <p className="mt-1 text-xs text-[var(--iic-text-muted)]">
                            {item.date} · {item.wallet}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="iic-light-soft-panel rounded-3xl border border-[var(--iic-border)] bg-black/35 p-5">
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--iic-gold)]">
                    Resale Guide
                  </p>
                  <div className="mt-4 flex items-end justify-between gap-4">
                    <div>
                      <p className="text-sm text-[var(--iic-text-muted)]">현재 시세</p>
                      <p className="mt-1 text-3xl font-black">$280 ~ $340</p>
                    </div>
                    <button
                      disabled
                      className="min-h-11 rounded-full border border-[var(--iic-border)] px-4 py-3 text-xs font-black text-[var(--iic-text-muted)] opacity-60"
                    >
                      리셀 등록하기
                    </button>
                  </div>
                  <p className="mt-4 rounded-2xl border border-[rgba(184,146,42,0.25)] bg-[rgba(184,146,42,0.08)] p-3 text-sm leading-6 text-[var(--iic-text-muted)]">
                    판매 시 젠틀몬스터에 5%가 자동으로 지급됩니다
                  </p>
                </div>
              </>
            ) : null}
          </div>
        ) : null}
      </section>
    </div>
  );
}
