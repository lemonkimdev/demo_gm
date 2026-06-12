"use client";

import { useState } from "react";

const tabs = [
  { id: "overview", label: "개요" },
  { id: "program", label: "향 프로그램" },
  { id: "recipes", label: "레시피" },
  { id: "billing", label: "결제" },
  { id: "strategy", label: "AI전략" },
];

const metrics = [
  ["운영 거점", "12곳"],
  ["이번 달 결제", "$6,200 USDC"],
  ["평균 만족도", "★ 4.8"],
  ["다음 납품", "3일 후"],
];

const activities = [
  "납품 완료 · 로비 · SYLPH 2L · 2026/6/15",
  "향 변경 · 스파룸 · MUSK → FEY9 · 2026/6/12",
  "결제 완료 · $500 USDC · 2026/6/1",
  "충전 완료 · $500 USDC, 스왑 완료 · 500 IIC · 2026/5/29",
  "레시피 갱신 · SOLACE Winter · 2026/5/25",
  "만족도 리포트 · 레스토랑 ★ 4.9 · 2026/5/18",
];

const recipes = [
  ["SYLPH Recipe v2", "0x3f2a...", "2026.12"],
  ["MUSK Classic", "0x8b1c...", "2026.06"],
  ["SOLACE Winter", "0x5e9d...", "2027.03"],
];

const payments = [
  ["2026/6/1", "$500 USDC", "완료"],
  ["2026/5/1", "$500 USDC", "완료"],
  ["2026/4/1", "$500 USDC", "완료"],
];

const initialLocations = [
  {
    id: "lobby",
    name: "로비",
    current: "SYLPH",
    recommendation: "SOLACE",
    note: "AI 추천 SOLACE",
    intensity: 3,
  },
  {
    id: "spa",
    name: "스파 트리트먼트룸",
    current: "MUSK",
    recommendation: null,
    note: "유지 권장",
    intensity: 2,
  },
  {
    id: "fitness",
    name: "피트니스",
    current: "FEY9",
    recommendation: null,
    note: "AI 추천 없음",
    intensity: 4,
  },
  {
    id: "restaurant",
    name: "레스토랑",
    current: "SOLACE",
    recommendation: "SYLPH",
    note: "AI 추천 SYLPH",
    intensity: 3,
  },
];

export default function B2BDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [locations, setLocations] = useState(initialLocations);
  const [recommendationApplied, setRecommendationApplied] = useState(false);
  const [modal, setModal] = useState(null);
  const [paying, setPaying] = useState(false);
  const [paid, setPaid] = useState(false);

  function applyLobbyRecommendation() {
    setLocations((current) =>
      current.map((location) =>
        location.id === "lobby"
          ? { ...location, current: "SOLACE", note: "변경 완료 ✓" }
          : location,
      ),
    );
    setRecommendationApplied(true);
  }

  function applyLocationRecommendation(id) {
    setLocations((current) =>
      current.map((location) =>
        location.id === id && location.recommendation
          ? {
              ...location,
              current: location.recommendation,
              note: "변경 완료 ✓",
            }
          : location,
      ),
    );
  }

  function updateIntensity(id, value) {
    setLocations((current) =>
      current.map((location) =>
        location.id === id ? { ...location, intensity: Number(value) } : location,
      ),
    );
  }

  function applyAllRecommendations() {
    setLocations((current) =>
      current.map((location) =>
        location.recommendation
          ? {
              ...location,
              current: location.recommendation,
              note: "변경 완료 ✓",
            }
          : location,
      ),
    );
    setModal(null);
  }

  function payWithUsdc() {
    setPaying(true);
    window.setTimeout(() => {
      setPaying(false);
      setPaid(true);
    }, 1200);
  }

  return (
    <div className="mx-auto w-full max-w-6xl text-[var(--iic-text)]">
      <style jsx>{`
        @keyframes iic-fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .iic-fade {
          animation: iic-fade-in 0.25s ease-out both;
        }
      `}</style>

      <div className="grid gap-5 md:grid-cols-[220px_1fr]">
        <section className="rounded-3xl border border-[var(--iic-border)] bg-[var(--iic-card)] p-4 md:hidden">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--iic-gold)]">
            Park Hyatt Tokyo
          </p>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
            <h1 className="text-2xl font-black leading-tight">Scent Ops Dashboard</h1>
          </div>
          <nav className="mt-4 flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`min-h-10 rounded-full border px-4 text-sm font-black transition active:scale-95 ${
                  activeTab === tab.id
                    ? "border-[#7A5AAA] bg-[#7A5AAA] text-white"
                    : "iic-light-hover-readable border-[var(--iic-border)] text-[var(--iic-text-muted)] hover:bg-neutral-800 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </section>

        <aside className="hidden rounded-3xl border border-[var(--iic-border)] bg-[var(--iic-card)] p-4 md:block">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--iic-gold)]">
            Park Hyatt Tokyo
          </p>
          <h1 className="mt-3 text-2xl font-black leading-tight">
            Scent Ops
            <br />
            Dashboard
          </h1>
          <nav className="mt-6 grid gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`min-h-11 rounded-2xl px-4 text-left text-sm font-black transition active:scale-95 ${
                  activeTab === tab.id
                    ? "bg-[#7A5AAA] text-white"
                    : "iic-light-hover-readable text-[var(--iic-text-muted)] hover:bg-neutral-800 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </aside>

        <main className="space-y-5">
          <div className="rounded-3xl border border-[var(--iic-border)] bg-[radial-gradient(circle_at_18%_18%,rgba(122,90,170,0.28),transparent_34%),var(--iic-card)] p-5">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--iic-gold)]">
              B2B Fragrance Concierge
            </p>
            <h2 className="mt-3 text-4xl font-black leading-tight tracking-tight">
              우리공간
              <span className="align-middle text-xl">(탬버린즈 파트너사)</span> 향 구독을 AI 운영
            </h2>
            <p className="mt-3 text-sm leading-6 text-[var(--iic-text-muted)]">
              로비, 스파, 피트니스, 레스토랑의 향 프로그램과 온체인 레시피, USDC 결제를 대시보드로 관리
            </p>
          </div>

          {activeTab === "overview" ? (
            <section className="iic-fade space-y-5">
              <div className="grid grid-cols-2 gap-3">
                {metrics.map(([label, value]) => (
                  <div
                    key={label}
                    className="rounded-3xl border border-[var(--iic-border)] bg-[var(--iic-card)] p-4"
                  >
                    <p className="text-xs text-[var(--iic-text-muted)]">{label}</p>
                    {label === "이번 달 결제" ? (
                      <div className="mt-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="text-2xl font-black">{value}</p>
                          <button
                            type="button"
                            className="min-h-10 rounded-full border border-[#7A5AAA] px-4 text-xl font-black text-[#7A5AAA] transition hover:bg-[#7A5AAA] hover:text-white active:scale-95"
                          >
                            IIC 스왑 후 결제
                          </button>
                        </div>
                        <p className="mt-1 text-right text-[11px] text-[var(--iic-text-muted)]">
                          (스왑에 따른 할인 적용은 이벤트 기간에 따라 차이가 있으며, 스왑 시 수수료가 소요됩니다.)
                        </p>
                      </div>
                    ) : label === "운영 거점" ? (
                      <div className="mt-2 flex items-center gap-2">
                        <p className="text-2xl font-black">{value}</p>
                        <a
                          href="https://map.google.com/"
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex min-h-9 items-center rounded-full border border-[#7A5AAA] px-3 text-2xl font-black text-[#7A5AAA] transition hover:bg-[#7A5AAA] hover:text-white"
                        >
                          Map
                        </a>
                      </div>
                    ) : (
                      <p className="mt-2 text-2xl font-black">{value}</p>
                    )}
                  </div>
                ))}
              </div>

              <div className="rounded-3xl border border-[var(--iic-gold)] bg-[rgba(184,146,42,0.08)] p-5">
                <p className="text-lg font-black leading-7">
                  💡 12월 추천: 로비 향을 SYLPH → SOLACE로 변경하세요
                </p>
                <p className="mt-2 text-sm text-[var(--iic-text-muted)]">
                  이유: 겨울 시즌 만족도 +23% 예상
                </p>
                {recommendationApplied ? (
                  <p className="mt-4 rounded-2xl border border-[#7A5AAA] bg-[rgba(122,90,170,0.18)] p-3 text-sm font-black text-white">
                    적용 완료 ✓ 로비 향이 SOLACE로 변경되었습니다
                  </p>
                ) : (
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={applyLobbyRecommendation}
                      className="min-h-11 rounded-full bg-[var(--iic-gold)] px-4 py-3 text-sm font-black text-black transition hover:bg-[var(--iic-gold-light)] active:scale-95"
                    >
                      적용하기
                    </button>
                    <button
                      type="button"
                      className="min-h-11 rounded-full border border-[var(--iic-border)] px-4 py-3 text-sm font-black text-[var(--iic-text-muted)] transition hover:border-[var(--iic-gold)] hover:text-[var(--iic-text)] active:scale-95"
                    >
                      나중에
                    </button>
                  </div>
                )}
              </div>

              <div className="iic-light-soft-panel rounded-3xl border border-[var(--iic-border)] bg-black/35 p-5">
                <h3 className="text-xl font-black">최근 활동</h3>
                <div className="mt-4 grid gap-3">
                  {activities.map((activity) => (
                    <div
                      key={activity}
                      className="rounded-2xl border border-[var(--iic-border)] bg-[var(--iic-card)] p-4 text-sm text-[var(--iic-text-muted)]"
                    >
                      {activity}
                    </div>
                  ))}
                </div>
              </div>
            </section>
          ) : null}

          {activeTab === "program" ? (
            <section className="iic-fade space-y-5">
              <div className="iic-light-soft-panel rounded-3xl border border-[var(--iic-border)] bg-black/35 p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#7A5AAA]">
                      Scent Program
                    </p>
                    <h3 className="mt-2 text-3xl font-black">거점별 향 관리</h3>
                  </div>
                </div>

                <div className="mt-5 grid gap-3">
                  {locations.map((location) => (
                    <div
                      key={location.id}
                      className="rounded-3xl border border-[var(--iic-border)] bg-[var(--iic-card)] p-4"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-lg font-black">{location.name}</p>
                          <p className="mt-1 text-sm text-[var(--iic-text-muted)]">
                            현재 {location.current} · {location.note}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => applyLocationRecommendation(location.id)}
                          disabled={!location.recommendation}
                          className="min-h-10 rounded-full bg-[#7A5AAA] px-3 text-xs font-black text-white transition active:scale-95 disabled:bg-black disabled:text-[var(--iic-text-muted)] disabled:opacity-60"
                        >
                          변경
                        </button>
                      </div>
                      <label className="mt-4 block text-xs font-bold text-[var(--iic-text-muted)]">
                        강도 {location.intensity}/5
                      </label>
                      <input
                        type="range"
                        min="1"
                        max="5"
                        value={location.intensity}
                        onChange={(event) => updateIntensity(location.id, event.target.value)}
                        className="mt-3 w-full accent-[#7A5AAA]"
                      />
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setModal({
                      title: "전체 AI 추천 적용",
                      body: "로비와 레스토랑의 추천 향을 즉시 적용할까요?",
                      action: applyAllRecommendations,
                    })
                  }
                  className="mt-5 min-h-12 w-full rounded-full bg-[var(--iic-gold)] px-5 py-3 text-sm font-black text-black transition hover:bg-[var(--iic-gold-light)] active:scale-95"
                >
                  전체 AI 추천 적용
                </button>
              </div>
            </section>
          ) : null}

          {activeTab === "recipes" ? (
            <section className="iic-fade space-y-5">
              <div className="rounded-3xl border border-[var(--iic-gold)] bg-[rgba(184,146,42,0.08)] p-5">
                <p className="text-lg font-black">
                  레시피는 블록체인에 등록되어 무단 복제가 불가합니다
                </p>
              </div>

              <div className="grid gap-3">
                {recipes.map(([name, hash, expiry]) => (
                  <div
                    key={name}
                    className="rounded-3xl border border-[var(--iic-border)] bg-[var(--iic-card)] p-5"
                  >
                    <p className="text-xl font-black">{name}</p>
                    <div className="mt-3 grid gap-2 text-sm text-[var(--iic-text-muted)]">
                      <p>온체인 해시 {hash}</p>
                      <p>만료 {expiry}</p>
                    </div>
                    <a
                      href="https://etherscan.io/"
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 inline-flex min-h-11 items-center rounded-full border border-[var(--iic-border)] px-4 text-sm font-black text-[var(--iic-text)] transition hover:border-[#7A5AAA] active:scale-95"
                    >
                      블록체인 확인
                    </a>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {activeTab === "billing" ? (
            <section className="iic-fade space-y-5">
              <div className="rounded-3xl border border-[var(--iic-border)] bg-[var(--iic-card)] p-5">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--iic-gold)]">
                  Current Plan
                </p>
                <h3 className="mt-3 text-3xl font-black">$500/월 USDC 구독</h3>
                {paid ? (
                  <p className="mt-4 rounded-2xl border border-[#7A5AAA] bg-[rgba(122,90,170,0.16)] p-3 text-sm font-black text-white">
                    결제 완료 ✓
                  </p>
                ) : null}
                <div className="mt-5 grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={payWithUsdc}
                    disabled={paying || paid}
                    className="flex min-h-12 w-full items-center justify-center rounded-full bg-[#7A5AAA] px-3 py-3 text-xs font-black text-white transition hover:bg-[#8d6cc0] active:scale-95 disabled:opacity-60 sm:text-sm"
                  >
                    {paying ? (
                      <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/25 border-t-white" />
                    ) : paid ? (
                      "결제 완료 ✓"
                    ) : (
                      "USDC로 결제하기"
                    )}
                  </button>
                  <button
                    type="button"
                    className="min-h-12 w-full rounded-full bg-[#7A5AAA] px-3 py-3 text-xs font-black text-white transition hover:bg-[#8d6cc0] active:scale-95 sm:text-sm"
                  >
                    IIC로 결제하기
                  </button>
                </div>
              </div>

              <div className="rounded-3xl border border-[var(--iic-border)] bg-[var(--iic-card)] p-5">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--iic-gold)]">
                  Additional plan
                </p>
                <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="text-3xl font-black">$500/월 IIC 구독</h3>
                  <button
                    type="button"
                    className="min-h-12 rounded-full bg-[var(--iic-gold)] px-5 py-3 text-sm font-black text-black transition hover:bg-[var(--iic-gold-light)] active:scale-95"
                  >
                    IIC 구독 신청
                  </button>
                </div>
              </div>

              <div className="iic-light-soft-panel rounded-3xl border border-[var(--iic-border)] bg-black/35 p-5">
                <h3 className="text-xl font-black">결제 이력</h3>
                <div className="mt-4 hidden overflow-hidden rounded-2xl border border-[var(--iic-border)] md:block">
                  <table className="w-full text-left text-sm">
                    <tbody>
                      {payments.map(([date, amount, status]) => (
                        <tr key={date} className="border-b border-[var(--iic-border)] last:border-0">
                          <td className="p-4 text-[var(--iic-text-muted)]">{date}</td>
                          <td className="p-4 font-black">{amount}</td>
                          <td className="p-4 text-[#7A5AAA]">{status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 grid gap-3 md:hidden">
                  {payments.map(([date, amount, status]) => (
                    <div
                      key={date}
                      className="rounded-2xl border border-[var(--iic-border)] bg-[var(--iic-card)] p-4"
                    >
                      <p className="text-sm text-[var(--iic-text-muted)]">{date}</p>
                      <p className="mt-2 text-lg font-black">{amount}</p>
                      <p className="mt-1 text-sm font-bold text-[#7A5AAA]">{status}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          ) : null}

          {activeTab === "strategy" ? (
            <section className="iic-fade space-y-5">
              <div className="rounded-3xl border border-[var(--iic-gold)] bg-[rgba(184,146,42,0.08)] p-5">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--iic-gold)]">
                  Gemini Strategy Memo
                </p>
                <h3 className="mt-3 text-3xl font-black">
                  AI 전략 <span className="align-middle text-base">(2026/5/31 기준)</span>
                </h3>
                <div className="mt-5 space-y-3 text-sm leading-6 text-[var(--iic-text-muted)]">
                  <p className="rounded-2xl border border-[var(--iic-border)] bg-[var(--iic-card)] p-4">
                    현재 대시보드 기준으로 로비는 겨울 시즌 체류 시간이 길어지는 구간입니다. SYLPH보다 SOLACE의 안정적인 우디 잔향을 적용하면 만족도 상승 가능성이 큽니다.
                  </p>
                  <p className="rounded-2xl border border-[var(--iic-border)] bg-[var(--iic-card)] p-4">
                    스파룸은 MUSK 유지가 적합하며, 피트니스는 강도를 4에서 3으로 낮춰 재방문 고객 피로도를 줄이는 주문 변경을 권장합니다.
                  </p>
                  <p className="rounded-2xl border border-[var(--iic-border)] bg-[var(--iic-card)] p-4">
                    다음 주문은 SOLACE 2L를 로비용으로 증량하고, SYLPH는 레스토랑 소용량 테스트로 전환하는 구성이 효율적입니다.
                  </p>
                </div>
              </div>
            </section>
          ) : null}
        </main>
      </div>

      {modal ? (
        <div className="fixed inset-0 z-50 flex items-end bg-black/70 p-4 sm:items-center sm:justify-center">
          <div className="iic-fade w-full max-w-md rounded-3xl border border-[var(--iic-border)] bg-[var(--iic-card)] p-5 shadow-2xl shadow-black/80">
            <h3 className="text-2xl font-black">{modal.title}</h3>
            <p className="mt-3 text-sm leading-6 text-[var(--iic-text-muted)]">
              {modal.body}
            </p>
            <div className="mt-5 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setModal(null)}
                className="min-h-11 rounded-full border border-[var(--iic-border)] px-4 text-sm font-black text-[var(--iic-text)] transition active:scale-95"
              >
                취소
              </button>
              <button
                type="button"
                onClick={modal.action}
                className="min-h-11 rounded-full bg-[var(--iic-gold)] px-4 text-sm font-black text-black transition hover:bg-[var(--iic-gold-light)] active:scale-95"
              >
                적용
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
