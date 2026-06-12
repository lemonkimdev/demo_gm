"use client";

import { useState } from "react";

const brands = [
  {
    id: "tamburins",
    name: "Tamburins",
    color: "#7A5AAA",
    gradient: "linear-gradient(135deg, rgba(122,90,170,0.95), rgba(28,18,42,0.95))",
  },
  {
    id: "gentle-monster",
    name: "Gentle monster",
    color: "#E78AB7",
    gradient: "linear-gradient(135deg, rgba(231,138,183,0.95), rgba(58,31,48,0.95))",
  },
];

const amounts = [5, 10, 15, 20];
const channels = ["카카오톡", "LINE", "WhatsApp"];

export default function Gift() {
  const [activeTab, setActiveTab] = useState("send");
  const [sendStep, setSendStep] = useState(1);
  const [selectedBrandId, setSelectedBrandId] = useState("tamburins");
  const [amount, setAmount] = useState(15);
  const [message, setMessage] = useState("생일 축하해! Tamburins에서 좋아하는 향 골라봐 🎁");
  const [channel, setChannel] = useState("카카오톡");
  const [flipped, setFlipped] = useState(false);
  const [giftCode, setGiftCode] = useState("");
  const [giftRevealed, setGiftRevealed] = useState(false);
  const [redeemed, setRedeemed] = useState(false);
  const selectedBrand = brands.find((brand) => brand.id === selectedBrandId) ?? brands[0];
  const mockUrl = "https://iic.example/gift/TB-15-FRIEND";

  function createGift(event) {
    event.preventDefault();
    setFlipped(false);
    setSendStep(2);
  }

  function sendGift() {
    setSendStep(3);
  }

  function revealGift(event) {
    event.preventDefault();
    setGiftRevealed(true);
    setRedeemed(false);
  }

  async function copyLink() {
    if (typeof navigator === "undefined" || !navigator.clipboard) {
      return;
    }

    await navigator.clipboard.writeText(mockUrl);
  }

  return (
    <div className="mx-auto w-full max-w-3xl text-[var(--iic-text)]">
      <style jsx>{`
        @keyframes iic-confetti-drop {
          0% {
            transform: translate3d(0, -18px, 0) rotate(0deg);
            opacity: 0;
          }
          18% {
            opacity: 1;
          }
          100% {
            transform: translate3d(var(--x), 170px, 0) rotate(260deg);
            opacity: 0;
          }
        }
      `}</style>

      <section className="space-y-5">
        <div className="rounded-3xl border border-[var(--iic-border)] bg-[var(--iic-card)] p-5">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--iic-gold)]">
            Cross-Border Gift Token
          </p>
          <h1 className="mt-3 text-4xl font-black leading-tight tracking-tight">
            마음을 링크로 글로벌하게
          </h1>
          <p className="mt-3 text-sm leading-6 text-[var(--iic-text-muted)]">
            해외 사는 친구, 글로벌 협업하는 파트너사 멤버에게 $15 기프트 토큰을 만들고, 메신저 링크로 바로 전달
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2 rounded-full border border-[var(--iic-border)] bg-black p-1">
          {[
            ["send", "선물 보내기"],
            ["receive", "선물 받기"],
          ].map(([value, label]) => (
            <button
              key={value}
              onClick={() => setActiveTab(value)}
              className={`min-h-11 rounded-full px-3 text-sm font-black transition active:scale-95 ${
                activeTab === value
                  ? "bg-[var(--iic-gold)] text-black"
                  : "text-[var(--iic-text-muted)] hover:text-[var(--iic-text)]"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {activeTab === "send" ? (
          <div className="space-y-5">
            {sendStep === 1 ? (
              <form
                onSubmit={createGift}
                className="space-y-5 rounded-3xl border border-[var(--iic-border)] bg-black/35 p-5"
              >
                <div>
                  <p className="text-sm font-black text-[var(--iic-text)]">브랜드 선택</p>
                  <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {brands.map((brand) => {
                      const selected = selectedBrandId === brand.id;

                      return (
                        <button
                          key={brand.id}
                          type="button"
                          onClick={() => setSelectedBrandId(brand.id)}
                          className={`min-h-28 rounded-3xl border p-4 text-left transition active:scale-[0.98] ${
                            selected
                              ? "border-[var(--iic-gold)] shadow-[0_0_0_1px_rgba(184,146,42,0.55)]"
                              : "border-[var(--iic-border)]"
                          }`}
                          style={{ background: brand.gradient }}
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/70">
                                Gift Brand
                              </p>
                              <p className="mt-3 text-2xl font-black text-white">
                                {brand.name}
                              </p>
                            </div>
                            {selected ? (
                              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--iic-gold)] text-sm font-black text-black">
                                ✓
                              </span>
                            ) : null}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-black text-[var(--iic-text)]">금액 선택</p>
                  <div className="mt-3 grid grid-cols-4 gap-2">
                    {amounts.map((value) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setAmount(value)}
                        className={`min-h-11 rounded-2xl border px-3 py-3 text-sm font-black transition active:scale-95 ${
                          amount === value
                            ? "border-[var(--iic-gold)] bg-[var(--iic-gold)] text-black"
                            : "border-[var(--iic-border)] bg-black text-[var(--iic-text)]"
                        }`}
                      >
                        ${value}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-black text-[var(--iic-text)]" htmlFor="gift-message">
                    친구에게 한마디 <span className="text-[var(--iic-text-muted)]">(100자)</span>
                  </label>
                  <textarea
                    id="gift-message"
                    value={message}
                    maxLength={100}
                    onChange={(event) => setMessage(event.target.value)}
                    placeholder="생일 축하해! Tamburins에서 좋아하는 향 골라봐 🎁"
                    className="mt-3 min-h-28 w-full resize-none rounded-3xl border border-[var(--iic-border)] bg-black px-4 py-4 text-sm leading-6 text-[var(--iic-text)] outline-none transition placeholder:text-[var(--iic-text-muted)] focus:border-[var(--iic-gold)]"
                  />
                  <p className="mt-2 text-right text-xs text-[var(--iic-text-muted)]">
                    {message.length}/100
                  </p>
                  <div className="mt-3 rounded-3xl border border-[var(--iic-border)] bg-black/45 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-black text-[var(--iic-text)]">자동번역</p>
                      <p className="text-xs text-[var(--iic-text-muted)]">Chrome auto translate</p>
                    </div>
                    <p className="mt-3 rounded-2xl border border-[var(--iic-border)] bg-black px-4 py-3 text-sm leading-6 text-[var(--iic-text-muted)]">
                      Happy birthday! Pick your favorite scent at Tamburins 🎁
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-black text-[var(--iic-text)]">전송 방법</p>
                  <div className="mt-3 grid grid-cols-3 gap-2">
                    {channels.map((value) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setChannel(value)}
                        className={`min-h-11 rounded-2xl border px-2 py-3 text-xs font-black transition active:scale-95 ${
                          channel === value
                            ? "border-[var(--iic-gold)] bg-[rgba(184,146,42,0.14)] text-[var(--iic-gold-light)]"
                            : "border-[var(--iic-border)] bg-black text-[var(--iic-text-muted)]"
                        }`}
                      >
                        {value}
                      </button>
                    ))}
                  </div>
                </div>

                <button className="min-h-12 w-full rounded-full bg-[var(--iic-gold)] px-5 py-3 text-sm font-black text-black transition hover:bg-[var(--iic-gold-light)] active:scale-95">
                  기프트 카드 만들기 →
                </button>
              </form>
            ) : null}

            {sendStep === 2 ? (
              <div className="space-y-5 rounded-3xl border border-[var(--iic-border)] bg-black/35 p-5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--iic-gold)]">
                      Gift Preview
                    </p>
                    <h2 className="mt-2 text-2xl font-black">기프트 카드 미리보기</h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => setFlipped((current) => !current)}
                    className="min-h-11 rounded-full border border-[var(--iic-border)] px-4 py-2 text-xs font-black text-[var(--iic-text-muted)] transition hover:border-[var(--iic-gold)] hover:text-[var(--iic-text)] active:scale-95"
                  >
                    앞/뒤 전환
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setFlipped((current) => !current)}
                  className="w-full text-left outline-none"
                  style={{ perspective: "1200px" }}
                >
                  <div
                    className="relative h-72 w-full transition-transform duration-700"
                    style={{
                      transformStyle: "preserve-3d",
                      transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
                    }}
                  >
                    <div
                      className="absolute inset-0 rounded-3xl border border-[rgba(242,239,232,0.18)] p-6 shadow-2xl shadow-black/50"
                      style={{
                        background: selectedBrand.gradient,
                        backfaceVisibility: "hidden",
                      }}
                    >
                      <div className="flex h-full flex-col justify-between text-white">
                        <div>
                          <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/65">
                            {selectedBrand.name}
                          </p>
                          <p className="mt-8 text-5xl font-black">${amount}</p>
                          <p className="mt-2 text-xl font-black">USDC</p>
                        </div>
                        <p className="text-lg font-black">A gift for you</p>
                      </div>
                    </div>
                    <div
                      className="absolute inset-0 rounded-3xl border border-[rgba(184,146,42,0.45)] bg-[var(--iic-card)] p-6 shadow-2xl shadow-black/50"
                      style={{
                        backfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                      }}
                    >
                      <div className="flex h-full flex-col justify-between">
                        <div>
                          <p className="text-sm leading-6 text-[var(--iic-text)]">
                            {message || "친구에게 보내는 메시지가 여기에 표시됩니다."}
                          </p>
                          <p className="mt-4 text-xs font-bold text-[var(--iic-text-muted)]">
                            From. ANN Friend · 유효기간 30일
                          </p>
                        </div>
                        <div className="flex items-end justify-between gap-4">
                          <div className="grid h-24 w-24 grid-cols-5 gap-1 rounded-2xl bg-white p-2">
                            {Array.from({ length: 25 }).map((_, index) => (
                              <span
                                key={index}
                                className={`rounded-[2px] ${
                                  [0, 1, 2, 5, 7, 10, 11, 14, 16, 18, 20, 21, 22, 24].includes(index)
                                    ? "bg-black"
                                    : "bg-white"
                                }`}
                              />
                            ))}
                          </div>
                          <p className="text-right text-xs leading-5 text-[var(--iic-text-muted)]">
                            {channel} 링크로 전송
                            <br />
                            Gift Token #{amount}-IIC
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setSendStep(1)}
                    className="min-h-12 rounded-full border border-[var(--iic-border)] px-5 py-3 text-sm font-black text-[var(--iic-text)] transition hover:border-[var(--iic-gold)] active:scale-95"
                  >
                    다시 편집
                  </button>
                  <button
                    type="button"
                    onClick={sendGift}
                    className="min-h-12 rounded-full bg-[var(--iic-gold)] px-5 py-3 text-sm font-black text-black transition hover:bg-[var(--iic-gold-light)] active:scale-95"
                  >
                    전송하기
                  </button>
                </div>
              </div>
            ) : null}

            {sendStep === 3 ? (
              <div className="relative overflow-hidden rounded-3xl border border-[rgba(184,146,42,0.45)] bg-[var(--iic-card)] p-6 text-center">
                {Array.from({ length: 16 }).map((_, index) => (
                  <span
                    key={index}
                    className="absolute top-3 h-2 w-3 rounded-[2px]"
                    style={{
                      left: `${8 + index * 6}%`,
                      "--x": `${index % 2 === 0 ? 28 : -24}px`,
                      animation: `iic-confetti-drop ${1.8 + (index % 5) * 0.16}s ease-in-out ${
                        index * 0.05
                      }s infinite`,
                      background: index % 3 === 0 ? "var(--iic-gold)" : index % 3 === 1 ? selectedBrand.color : "#F2EFE8",
                    }}
                  />
                ))}
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[var(--iic-gold)] text-4xl text-black">
                  ✓
                </div>
                <h2 className="mt-5 text-3xl font-black">전송 완료! 🎉</h2>
                <p className="mt-3 text-sm text-[var(--iic-text-muted)]">
                  {channel}로 보낼 수 있는 기프트 링크가 생성되었습니다.
                </p>
                <div className="mt-5 rounded-2xl border border-[var(--iic-border)] bg-black p-4 text-left">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--iic-gold)]">
                    Gift Link
                  </p>
                  <p className="mt-2 break-all text-sm font-bold text-[var(--iic-text)]">{mockUrl}</p>
                </div>
                <button
                  type="button"
                  onClick={copyLink}
                  className="mt-4 min-h-12 w-full rounded-full bg-[var(--iic-gold)] px-5 py-3 text-sm font-black text-black transition hover:bg-[var(--iic-gold-light)] active:scale-95"
                >
                  링크 복사
                </button>
                <p className="mt-4 rounded-2xl border border-[var(--iic-border)] bg-black/40 p-3 text-sm font-bold text-[var(--iic-text-muted)]">
                  이번 달 보낸 선물: 3건 · 합계 $45 USDC
                </p>
              </div>
            ) : null}
          </div>
        ) : null}

        {activeTab === "receive" ? (
          <div className="space-y-5 rounded-3xl border border-[var(--iic-border)] bg-black/35 p-5">
            <form onSubmit={revealGift} className="space-y-3">
              <label htmlFor="gift-code" className="text-sm font-black text-[var(--iic-text)]">
                받은 코드를 입력하세요
              </label>
              <input
                id="gift-code"
                value={giftCode}
                onChange={(event) => setGiftCode(event.target.value)}
                placeholder="예) TB-15-FRIEND"
                className="min-h-12 w-full rounded-2xl border border-[var(--iic-border)] bg-black px-4 text-sm text-[var(--iic-text)] outline-none transition placeholder:text-[var(--iic-text-muted)] focus:border-[var(--iic-gold)]"
              />
              <button className="min-h-12 w-full rounded-full bg-[var(--iic-gold)] px-5 py-3 text-sm font-black text-black transition hover:bg-[var(--iic-gold-light)] active:scale-95">
                선물 확인하기
              </button>
            </form>

            {giftRevealed ? (
              <div className="rounded-3xl border border-[rgba(122,90,170,0.5)] p-5" style={{ background: brands[0].gradient }}>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/70">
                  Received Gift
                </p>
                <h2 className="mt-3 text-3xl font-black text-white">Tamburins 기프트</h2>
                <div className="mt-5 grid gap-2 text-sm text-white">
                  {[
                    ["보낸 사람", "ANN Friend"],
                    ["금액", redeemed ? "$0" : "$15 USDC"],
                    ["브랜드", "Tamburins"],
                    ["유효기간", "30일"],
                  ].map(([label, value]) => (
                    <div key={label} className="flex items-center justify-between rounded-2xl bg-black/25 p-3">
                      <span className="text-white/65">{label}</span>
                      <span className="font-black">{value}</span>
                    </div>
                  ))}
                </div>
                {redeemed ? (
                  <p className="mt-4 rounded-2xl bg-black/30 p-4 text-center text-sm font-black text-white">
                    사용 완료 ✓ · 잔액 $0
                  </p>
                ) : (
                  <button
                    type="button"
                    onClick={() => setRedeemed(true)}
                    className="mt-5 min-h-12 w-full rounded-full bg-white px-5 py-3 text-sm font-black text-black transition hover:bg-[var(--iic-text)] active:scale-95"
                  >
                    Tamburins에서 사용하기
                  </button>
                )}
              </div>
            ) : null}
          </div>
        ) : null}
      </section>
    </div>
  );
}
