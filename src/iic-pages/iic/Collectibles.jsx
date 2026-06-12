"use client";

import { useMemo, useState } from "react";

const filters = ["전체", "보유 중", "구매 가능", "출시 예정"];

const initialCollectibles = [
  {
    id: "spring-26",
    title: "Spring '26",
    status: "구매 가능",
    edition: "5,000개",
    price: "$15",
    badge: "구매 가능",
    action: "민팅하기",
    minted: 2341,
    total: 5000,
    color: "#D85A30",
    accent: "#f08562",
    description: "K-pop 아티스트의 무대 의상에서 영감을 받은 시즌 케이크 디자인입니다.",
    story: "팬들이 수집하고 교환할 수 있는 디지털 아트워크로 발행됩니다.",
  },
  {
    id: "winter-25",
    title: "Winter '25",
    status: "완판",
    edition: "3,000개",
    price: "$28",
    badge: "완판",
    action: "리셀 보기",
    minted: 3000,
    total: 3000,
    color: "#777777",
    accent: "#bbbbbb",
    description: "겨울 팝업에서 가장 빠르게 완판된 케이크 컬렉터블입니다.",
    story: "현재 리셀가 $28로 거래되는 시즌 한정 에디션입니다.",
  },
  {
    id: "summer-26",
    title: "Summer '26",
    status: "출시 예정",
    edition: "6,000개",
    price: "TBA",
    badge: "3일 후 드롭",
    action: "알림 받기",
    minted: 0,
    total: 6000,
    color: "#D85A30",
    accent: "#ffad91",
    description: "여름 투어 콘셉트와 연결되는 실루엣 공개 전 컬렉터블입니다.",
    story: "방문 인증 SBT 보유자는 드롭 우선권을 받습니다.",
  },
  {
    id: "fall-25",
    title: "Fall '25",
    status: "보유 중",
    edition: "4,000개",
    price: "$22",
    badge: "보유 중 ✓",
    action: "리셀하기",
    minted: 4000,
    total: 4000,
    color: "#9a3d23",
    accent: "#D85A30",
    description: "가을 팝업 방문자에게 먼저 공개된 케이크 카드입니다.",
    story: "소유자는 다음 누데이크 팝업 입장 슬롯을 먼저 선택할 수 있습니다.",
  },
];

export default function Collectibles() {
  const [activeFilter, setActiveFilter] = useState("전체");
  const [selected, setSelected] = useState(null);
  const [minting, setMinting] = useState(false);
  const [mintedIds, setMintedIds] = useState([]);
  const [visitCertified, setVisitCertified] = useState(false);

  const collectibles = useMemo(
    () =>
      initialCollectibles.map((item) =>
        mintedIds.includes(item.id)
          ? {
              ...item,
              status: "보유 중",
              badge: "보유 중 ✓",
              action: "리셀하기",
            }
          : item,
      ),
    [mintedIds],
  );

  const visibleCollectibles = collectibles.filter((item) => {
    if (activeFilter === "전체") {
      return true;
    }

    return item.status === activeFilter;
  });

  function openCollectible(item) {
    setSelected(item);
    setMinting(false);
  }

  function mintCollectible() {
    if (!selected || selected.status !== "구매 가능") {
      return;
    }

    setMinting(true);
    window.setTimeout(() => {
      setMintedIds((current) => (current.includes(selected.id) ? current : [...current, selected.id]));
      setSelected((current) =>
        current
          ? {
              ...current,
              status: "보유 중",
              badge: "보유 중 ✓",
              action: "리셀하기",
            }
          : current,
      );
      setMinting(false);
    }, 1500);
  }

  return (
    <div className="mx-auto w-full max-w-3xl text-[var(--iic-text)]">
      <style jsx>{`
        @keyframes iic-sheet-up {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes iic-sbt-pop {
          0% {
            opacity: 0;
            transform: scale(0.72) rotate(-8deg);
          }
          70% {
            opacity: 1;
            transform: scale(1.06) rotate(2deg);
          }
          100% {
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
        }

        @keyframes iic-success-pulse {
          0%,
          100% {
            box-shadow: 0 0 0 0 rgba(216, 90, 48, 0.45);
          }
          50% {
            box-shadow: 0 0 0 14px rgba(216, 90, 48, 0);
          }
        }
      `}</style>

      <section className="space-y-5">
        <div className="rounded-3xl border border-[var(--iic-border)] bg-[radial-gradient(circle_at_18%_18%,rgba(216,90,48,0.28),transparent_34%),var(--iic-card)] p-5">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--iic-gold)]">
            NUDAKE Digital Collectibles
          </p>
          <h1 className="mt-3 text-4xl font-black leading-tight tracking-tight">
            시즌별 케이크를 카드로 수집
          </h1>
          <p className="mt-3 text-sm leading-6 text-[var(--iic-text-muted)]">
            누데이크 컬렉터블을 보유 시, 다음 팝업 우선 입장권과 시즌별 디지털 혜택을 겟
          </p>
        </div>

        <div className="rounded-3xl border border-[rgba(216,90,48,0.45)] bg-[var(--iic-card)] p-5">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#D85A30]">
            Pop-up Visit SBT
          </p>
          <h2 className="mt-3 text-2xl font-black">누데이크 팝업 방문하셨나요?</h2>
          <p className="mt-2 text-sm leading-6 text-[var(--iic-text-muted)]">
            현장 방문 인증을 완료하면 다음 드롭 우선권이 담긴 SBT 배지가 발행됩니다.
          </p>

          {visitCertified ? (
            <div
              className="mt-5 rounded-3xl border border-[var(--iic-gold)] bg-black/45 p-5 text-center"
              style={{ animation: "iic-sbt-pop 0.55s ease-out both" }}
            >
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-[#D85A30] text-4xl shadow-[0_0_28px_rgba(216,90,48,0.45)]">
                SBT
              </div>
              <p className="mt-4 text-sm font-black text-[var(--iic-text)]">
                방문 인증 SBT 발행 완료. Summer &apos;26 드롭 우선권 획득
              </p>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setVisitCertified(true)}
              className="mt-5 min-h-12 w-full rounded-full bg-[#D85A30] px-5 py-3 text-sm font-black text-black transition hover:bg-[#ef734a] active:scale-95"
            >
              방문 인증하기
            </button>
          )}
        </div>

        <div className="flex gap-2 overflow-x-auto rounded-full border border-[var(--iic-border)] bg-black p-1">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={`min-h-11 shrink-0 rounded-full px-4 text-sm font-black transition active:scale-95 ${
                activeFilter === filter
                  ? "iic-active-filter bg-[#D85A30] text-black"
                  : "iic-light-filter-button text-[var(--iic-text-muted)] hover:bg-neutral-800 hover:text-white"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3">
          {visibleCollectibles.map((item) => {
            const owned = item.status === "보유 중";
            const soldOut = item.status === "완판";
            const upcoming = item.status === "출시 예정";

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => openCollectible(item)}
                className={`min-h-72 rounded-3xl border p-3 text-left transition hover:-translate-y-1 active:scale-[0.98] ${
                  owned
                    ? "border-[var(--iic-gold)] shadow-[0_0_0_1px_rgba(184,146,42,0.35)]"
                    : "border-[var(--iic-border)]"
                } ${soldOut ? "opacity-50 grayscale" : ""}`}
              >
                <div
                  className={`relative flex aspect-[3/4] overflow-hidden rounded-2xl p-3 ${
                    upcoming ? "blur-[1px]" : ""
                  }`}
                  style={{ backgroundColor: item.color }}
                >
                  <span className="absolute right-3 top-3 rounded-full bg-black/45 px-2 py-1 text-[10px] font-black text-white">
                    {item.badge}
                  </span>
                  {upcoming ? (
                    <span className="m-auto h-28 w-20 rounded-full bg-black/30 shadow-[0_0_32px_rgba(0,0,0,0.45)]" />
                  ) : (
                    <div className="m-auto flex h-28 w-28 items-center justify-center rounded-[34%] border border-white/35 bg-white/12 text-5xl shadow-2xl shadow-black/25">
                      🍰
                    </div>
                  )}
                </div>
                <div className="mt-3">
                  <h2 className="text-lg font-black leading-tight">{item.title}</h2>
                  <p className="mt-1 text-xs text-[var(--iic-text-muted)]">
                    Edition {item.edition}
                  </p>
                  <p className="mt-2 text-sm font-black text-[var(--iic-text)]">
                    {soldOut ? "현재 리셀가 $28" : item.price}
                  </p>
                  <span
                    className={`mt-3 inline-flex min-h-9 items-center rounded-full px-3 text-xs font-black ${
                      owned
                        ? "bg-[var(--iic-gold)] text-black"
                        : "iic-on-dark-muted bg-black/45 text-[var(--iic-text)]"
                    }`}
                  >
                    {item.action}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

      </section>

      {selected ? (
        <div className="fixed inset-0 z-50 flex items-end bg-black/70 p-0 sm:items-center sm:justify-center sm:p-4">
          <button
            type="button"
            aria-label="Close collectible detail"
            onClick={() => setSelected(null)}
            className="absolute inset-0 cursor-default"
          />
          <div
            className="relative w-full max-w-2xl rounded-t-[28px] border border-[var(--iic-border)] bg-[var(--iic-card)] p-5 shadow-2xl shadow-black/80 sm:rounded-3xl"
            style={{ animation: "iic-sheet-up 0.28s ease-out both" }}
          >
            <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-[var(--iic-border)] sm:hidden" />
            <div
              className="flex aspect-[16/10] items-center justify-center rounded-3xl border border-black/20 text-7xl"
              style={{ backgroundColor: selected.color }}
            >
              {selected.status === "출시 예정" ? (
                <span className="h-36 w-24 rounded-full bg-black/30 blur-[2px]" />
              ) : (
                "🍰"
              )}
            </div>

            <div className="mt-5 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#D85A30]">
                  Collectible Detail
                </p>
                <h2 className="mt-2 text-3xl font-black">{selected.title}</h2>
              </div>
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="min-h-10 rounded-full border border-[var(--iic-border)] px-4 text-xs font-black text-[var(--iic-text-muted)] transition hover:border-[var(--iic-gold)] hover:text-[var(--iic-text)] active:scale-95"
              >
                닫기
              </button>
            </div>

            <div className="mt-4 space-y-2 text-sm leading-6 text-[var(--iic-text-muted)]">
              <p>{selected.description}</p>
              <p>{selected.story}</p>
            </div>

            <div className="mt-5 rounded-2xl border border-[var(--iic-border)] bg-black p-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-[var(--iic-text-muted)]">에디션 진행 바</span>
                <span className="font-black text-[var(--iic-text)]">
                  {selected.minted.toLocaleString()} / {selected.total.toLocaleString()}
                </span>
              </div>
              <div className="mt-3 h-3 overflow-hidden rounded-full bg-[var(--iic-border)]">
                <div
                  className="h-full rounded-full bg-[#D85A30] transition-all duration-700"
                  style={{ width: `${Math.min(100, (selected.minted / selected.total) * 100)}%` }}
                />
              </div>
            </div>

            {selected.status === "보유 중" ? (
              <div
                className="mt-5 rounded-2xl border border-[var(--iic-gold)] bg-[rgba(184,146,42,0.1)] p-4 text-sm font-black text-[var(--iic-gold-light)]"
                style={{ animation: mintedIds.includes(selected.id) ? "iic-success-pulse 1.2s ease-in-out 2" : undefined }}
              >
                내 컬렉션에 추가됨 ✓
                <span className="mt-2 block text-[var(--iic-text)]">
                  다음 누데이크 팝업 우선 입장권 획득
                </span>
              </div>
            ) : (
              <button
                type="button"
                onClick={mintCollectible}
                disabled={minting || selected.status !== "구매 가능"}
                className="mt-5 flex min-h-12 w-full items-center justify-center rounded-full bg-[#D85A30] px-5 py-3 text-sm font-black text-black transition hover:bg-[#ef734a] active:scale-95 disabled:cursor-not-allowed disabled:opacity-55"
              >
                {minting ? (
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-black/20 border-t-black" />
                ) : selected.status === "구매 가능" ? (
                  "민팅하기"
                ) : selected.status === "출시 예정" ? (
                  "알림 받기"
                ) : (
                  "리셀 보기"
                )}
              </button>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
