"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const initialCities = [
  {
    id: "seoul",
    name: "서울",
    date: "2024.09.06",
    visited: true,
    rotate: "-rotate-6",
  },
  {
    id: "shanghai",
    name: "상하이",
    date: "2024.10.15",
    visited: true,
    rotate: "rotate-3",
  },
  {
    id: "bangkok",
    name: "방콕",
    date: "2024.11.03",
    visited: true,
    rotate: "-rotate-2",
  },
  {
    id: "shenzhen",
    name: "뉴욕(coming soon)",
    date: "2024.12.18",
    visited: false,
    rotate: "rotate-6",
  },
];

const benefits = [
  ["Visitor", "1곳", "기본 SBT 발행"],
  ["Explorer", "3곳", "시즌 컬렉터블 에어드롭"],
  ["Global Citizen", "4곳", "전 브랜드 VIP + 신제품 48h 선공개"],
];

export default function Passport() {
  const [cities, setCities] = useState(initialCities);
  const [loading, setLoading] = useState(false);
  const [stampAnimating, setStampAnimating] = useState(false);
  const [celebrating, setCelebrating] = useState(false);

  const visitedCount = cities.filter((city) => city.visited).length;
  const grade = visitedCount >= 4 ? "Global Citizen" : visitedCount >= 3 ? "Explorer" : "Visitor";
  const isGlobalCitizen = grade === "Global Citizen";

  const shenzhen = useMemo(() => cities.find((city) => city.id === "shenzhen"), [cities]);

  function simulateShenzhenVisit() {
    if (loading || shenzhen?.visited) {
      return;
    }

    setLoading(true);
    window.setTimeout(() => {
      setCities((current) =>
        current.map((city) => (city.id === "shenzhen" ? { ...city, visited: true } : city)),
      );
      setLoading(false);
      setStampAnimating(true);
      setCelebrating(true);

      window.setTimeout(() => setStampAnimating(false), 900);
      window.setTimeout(() => setCelebrating(false), 1700);
    }, 1000);
  }

  return (
    <div className="relative mx-auto w-full max-w-3xl overflow-hidden text-[var(--iic-text)]">
      <style jsx>{`
        @keyframes iic-stamp-pop {
          0% {
            opacity: 0;
            transform: scale(2.2) rotate(-16deg);
          }
          55% {
            opacity: 1;
            transform: scale(0.92) rotate(8deg);
          }
          100% {
            opacity: 1;
            transform: scale(1) rotate(6deg);
          }
        }

        @keyframes iic-gold-flash {
          0%,
          100% {
            opacity: 0;
          }
          18% {
            opacity: 0.34;
          }
        }

        @keyframes iic-confetti {
          0% {
            opacity: 0;
            transform: translate3d(0, -20px, 0) rotate(0deg);
          }
          20% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translate3d(var(--x), 180px, 0) rotate(280deg);
          }
        }
      `}</style>

      {celebrating ? (
        <>
          <div
            className="pointer-events-none fixed inset-0 z-40 bg-[var(--iic-gold)]"
            style={{ animation: "iic-gold-flash 1.2s ease-out both" }}
          />
          <div className="pointer-events-none fixed inset-x-0 top-0 z-50 mx-auto h-52 max-w-3xl overflow-hidden">
            {Array.from({ length: 18 }).map((_, index) => (
              <span
                key={index}
                className="absolute top-3 h-2.5 w-3.5 rounded-[2px]"
                style={{
                  left: `${6 + index * 5}%`,
                  "--x": `${index % 2 === 0 ? 36 : -30}px`,
                  animation: `iic-confetti ${1.6 + (index % 5) * 0.12}s ease-in-out ${
                    index * 0.04
                  }s infinite`,
                  background: index % 3 === 0 ? "var(--iic-gold)" : index % 3 === 1 ? "#D4AC52" : "#F2EFE8",
                }}
              />
            ))}
          </div>
        </>
      ) : null}

      <section className="space-y-5">
        <div className="rounded-3xl border border-[var(--iic-gold)] bg-[radial-gradient(circle_at_18%_12%,rgba(184,146,42,0.28),transparent_34%),var(--iic-card)] p-5 shadow-2xl shadow-black/40">
          <p className="text-xs font-bold uppercase tracking-[0.26em] text-[var(--iic-gold)]">
            IIC GLOBAL PASSPORT
          </p>
          <div className="mt-5 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm text-[var(--iic-text-muted)]">현재 등급</p>
              <div className="mt-2 inline-flex min-h-11 items-center rounded-full bg-[var(--iic-gold)] px-4 text-sm font-black text-black">
                {grade}
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-[var(--iic-text-muted)]">방문 도시 수</p>
              <p className="mt-1 text-3xl font-black">{visitedCount} / 30</p>
              <p className="mt-1 text-sm font-black text-[var(--iic-text-muted)]">
                방문 매장 수 5/84
              </p>
            </div>
          </div>
        </div>

        {isGlobalCitizen ? (
          <div className="rounded-3xl border border-[var(--iic-gold)] bg-[rgba(184,146,42,0.12)] p-5 text-center">
            <p className="text-2xl font-black">🎉 Global Citizen 달성!</p>
            <p className="mt-2 text-sm text-[var(--iic-text-muted)]">
              HAUS NOWHERE 네 도시 방문 스탬프가 모두 완성되었습니다.
            </p>
          </div>
        ) : null}

        <div className="rounded-3xl border border-[var(--iic-border)] bg-black/35 p-4">
          <div className="grid grid-cols-2 gap-3">
            {cities.map((city) => {
              const isShenzhen = city.id === "shenzhen";
              const animateStamp = isShenzhen && stampAnimating;

              return (
                <div
                  key={city.id}
                  className={`rounded-3xl border p-4 ${
                    city.visited
                      ? "border-[var(--iic-border)] bg-[var(--iic-card)]"
                      : "iic-on-dark border-dashed border-[var(--iic-border)] bg-black/45"
                  }`}
                >
                  <div className="flex min-h-40 flex-col items-center justify-center text-center">
                    {city.visited ? (
                      <div
                        className={`flex h-24 w-24 items-center justify-center rounded-full border-4 border-[var(--iic-gold)] bg-[rgba(184,146,42,0.12)] text-sm font-black uppercase tracking-[0.12em] text-[var(--iic-gold)] ${city.rotate}`}
                        style={{ animation: animateStamp ? "iic-stamp-pop 0.82s ease-out both" : undefined }}
                      >
                        VISITED
                      </div>
                    ) : (
                      <div className="iic-on-dark flex h-24 w-24 items-center justify-center rounded-full border-2 border-dashed border-white text-xs font-black text-white">
                        미방문
                      </div>
                    )}
                    <h2 className="mt-4 text-xl font-black">{city.name}</h2>
                    {city.visited ? (
                      <div className="mt-2 space-y-1 text-xs text-[var(--iic-text-muted)]">
                        <p>방문일 {city.date}</p>
                        <p>✓ SBT 발행됨</p>
                      </div>
                    ) : (
                      <p className="iic-on-dark mt-2 text-xs text-[var(--iic-text-muted)]">미방문</p>
                    )}
                  </div>

                  {isShenzhen && !city.visited ? (
                    <button
                      type="button"
                      onClick={simulateShenzhenVisit}
                      disabled={loading}
                      className="mt-3 flex min-h-12 w-full items-center justify-center rounded-full bg-[var(--iic-gold)] px-4 py-3 text-xs font-black text-black transition hover:bg-[var(--iic-gold-light)] active:scale-95 disabled:opacity-70"
                    >
                      {loading ? (
                        <span className="h-5 w-5 animate-spin rounded-full border-2 border-black/20 border-t-black" />
                      ) : (
                        "뉴욕 방문 시뮬레이션 (데모)"
                      )}
                    </button>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-3xl border border-[var(--iic-border)] bg-[var(--iic-card)] p-5">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--iic-gold)]">
            Passport Benefits
          </p>
          <h2 className="mt-2 text-2xl font-black">등급별 혜택</h2>
          <div className="mt-5 grid gap-3">
            {benefits.map(([name, count, benefit]) => {
              const active = name === grade;

              return (
                <div
                  key={name}
                  className={`rounded-2xl border p-4 ${
                    active
                      ? "border-[var(--iic-gold)] bg-[rgba(184,146,42,0.12)]"
                      : "border-[var(--iic-border)] bg-black/35"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-lg font-black">{name}</p>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-black ${
                        active
                          ? "bg-[var(--iic-gold)] text-black"
                          : "bg-[var(--iic-border)] text-[var(--iic-text-muted)]"
                      }`}
                    >
                      {count}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-[var(--iic-text-muted)]">{benefit}</p>
                </div>
              );
            })}
          </div>
        </div>

        {isGlobalCitizen ? (
          <div className="rounded-3xl border border-[var(--iic-gold)] bg-[linear-gradient(145deg,rgba(184,146,42,0.22),rgba(20,20,20,1))] p-5">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--iic-gold)]">
              New Benefit Unlocked
            </p>
            <h2 className="mt-3 text-3xl font-black">전 브랜드 VIP + 신제품 48h 선공개</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--iic-text-muted)]">
              HAUS NOWHERE 글로벌 여권 완성 고객에게 IIC 전 브랜드 우선 접근권이 활성화되었습니다.
            </p>
          </div>
        ) : null}

        <div className="iic-light-soft-panel rounded-3xl border border-[var(--iic-border)] bg-black/35 p-5">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--iic-gold)]">
            SBT Info
          </p>
          <div className="mt-4 grid gap-3 text-sm">
            {[
              ["토큰 ID", "#GMT-2024-0892"],
              ["발행일", "2024.09.06"],
              ["이전 불가 배지", "Non-transferable"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="flex items-center justify-between gap-4 rounded-2xl border border-[var(--iic-border)] bg-[var(--iic-card)] p-3"
              >
                <span className="text-[var(--iic-text-muted)]">{label}</span>
                <span className="text-right font-black text-[var(--iic-text)]">{value}</span>
              </div>
            ))}
          </div>
          <a
            href="https://etherscan.io/"
            target="_blank"
            rel="noreferrer"
            className="mt-4 flex min-h-11 w-full items-center justify-center rounded-full border border-[var(--iic-border)] px-5 py-3 text-sm font-black text-[var(--iic-text)] transition hover:border-[var(--iic-gold)] active:scale-95"
          >
            온체인 확인
          </a>
        </div>

        <Link
          href="/iic/points"
          className="flex min-h-12 w-full items-center justify-center rounded-full bg-[var(--iic-gold)] px-5 py-3 text-sm font-black text-black transition hover:bg-[var(--iic-gold-light)] active:scale-95"
        >
          방문으로 쌓인 IIC 토큰 & 포인트 확인 →
        </Link>
      </section>
    </div>
  );
}
