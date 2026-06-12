"use client";

import { useEffect, useMemo, useState } from "react";

const brandMeta = {
  GM: {
    name: "Gentle Monster",
    short: "GM",
    color: "#1A3A8A",
    initial: 240,
    offer: "−100 pts → $1 off sunglasses",
    redeemCost: 100,
    confirm: "Redeem 100 pts for $1 off?",
  },
  TB: {
    name: "Tamburins",
    short: "TB",
    color: "#7A5AAA",
    initial: 180,
    offer: "−200 pts → Free SYLPH sample",
    redeemCost: 200,
    confirm: "Redeem 200 pts for Free SYLPH sample?",
  },
  ND: {
    name: "Nudake",
    short: "ND",
    color: "#D85A30",
    initial: 60,
    offer: "−60 pts → Nudake pop-up priority",
    redeemCost: 60,
    confirm: "Redeem 60 pts for Nudake pop-up priority?",
  },
  HAUS: {
    name: "HAUS NOWHERE",
    short: "HAUS",
    color: "#1D6A3A",
    initial: 40,
    offer: "−40 pts → HAUS early entry",
    redeemCost: 40,
    confirm: "Redeem 40 pts for HAUS early entry?",
  },
};

const historyRows = [
  ["GM", "Gentle Monster · Drop purchase", "+240 pts", "Nov 14"],
  ["TB", "Tamburins · Subscription bonus", "+180 pts", "Nov 10"],
  ["ND", "Nudake · Pop-up visit", "+60 pts", "Nov 8"],
  ["HAUS", "HAUS NOWHERE · Seoul + Shanghai visit", "+40 pts", "Nov 3"],
  ["GM", "Gentle Monster · Sunglasses reward viewed", "0 pts", "Today"],
];

export default function Points() {
  const [countedPoints, setCountedPoints] = useState(0);
  const [journeyStep, setJourneyStep] = useState("entry");
  const [tab, setTab] = useState("points");
  const [balances, setBalances] = useState({
    GM: brandMeta.GM.initial,
    TB: brandMeta.TB.initial,
    ND: brandMeta.ND.initial,
    HAUS: brandMeta.HAUS.initial,
  });
  const [confirmBrand, setConfirmBrand] = useState(null);
  const [toast, setToast] = useState("");
  const [flashBrand, setFlashBrand] = useState(null);
  const [fromBrand, setFromBrand] = useState("GM");
  const [toBrand, setToBrand] = useState("TB");
  const [amount, setAmount] = useState(50);
  const [isTransferring, setIsTransferring] = useState(false);

  useEffect(() => {
    let current = 0;
    const timer = window.setInterval(() => {
      current += 8;
      setCountedPoints(Math.min(240, current));
      if (current >= 240) {
        window.clearInterval(timer);
      }
    }, 22);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!toast) {
      return undefined;
    }

    const timer = window.setTimeout(() => setToast(""), 1800);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const totalPoints = useMemo(
    () => Object.values(balances).reduce((sum, value) => sum + value, 0),
    [balances],
  );

  function confirmRedeem(code) {
    setConfirmBrand(code);
  }

  function redeemPoints() {
    if (!confirmBrand) {
      return;
    }

    const cost = brandMeta[confirmBrand].redeemCost;
    setBalances((current) => ({
      ...current,
      [confirmBrand]: Math.max(0, current[confirmBrand] - cost),
    }));
    setFlashBrand(confirmBrand);
    setConfirmBrand(null);
    setToast("Redeemed ✓");
    window.setTimeout(() => setFlashBrand(null), 500);
  }

  function exchangePoints() {
    if (fromBrand === toBrand) {
      setToast("Choose a different brand");
      return;
    }

    const safeAmount = Math.min(amount, balances[fromBrand]);
    if (safeAmount <= 0) {
      setToast("No points available");
      return;
    }

    setIsTransferring(true);
    window.setTimeout(() => {
      setBalances((current) => ({
        ...current,
        [fromBrand]: current[fromBrand] - safeAmount,
        [toBrand]: current[toBrand] + safeAmount,
      }));
      setIsTransferring(false);
      setToast("Exchange complete ✓");
    }, 900);
  }

  return (
    <div className="mx-auto w-full max-w-5xl text-[var(--iic-text)]">
      {toast ? (
        <div className="fixed left-1/2 top-20 z-40 -translate-x-1/2 rounded-full bg-[var(--iic-gold)] px-5 py-3 text-sm font-bold text-black shadow-xl shadow-black/40">
          {toast}
        </div>
      ) : null}

      <section className="rounded-3xl border border-[var(--iic-border)] bg-[var(--iic-card)] p-4">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--iic-gold)]">
          Points & Tokens
        </p>
        <div className="mt-4 rounded-2xl border border-[rgba(184,146,42,0.35)] bg-[linear-gradient(135deg,#3a2c0b,#111_48%,#080808)] p-5 shadow-2xl shadow-black/50">
          <p className="iic-keep-gold text-sm font-semibold text-[var(--iic-gold-light)]">
            FRIDA × Felix Edition purchased
          </p>
          <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="iic-on-dark text-xs uppercase tracking-[0.18em] text-[var(--iic-text-muted)]">
                You just earned
              </p>
              <p className="iic-keep-gold mt-1 text-5xl font-black tracking-tight text-[var(--iic-gold-light)]">
                {(countedPoints / 100).toFixed(2)} IIC
              </p>
              <p className="iic-on-dark mt-1 text-sm text-[var(--iic-text-muted)]">
                {countedPoints} Points (pts) earned
              </p>
            </div>
            <div className="rounded-2xl border border-[var(--iic-border)] bg-[var(--iic-card)] p-5 sm:min-w-64">
              <p className="text-xs uppercase tracking-[0.18em] text-[var(--iic-text-muted)]">
                Total balance
              </p>
              <p className="mt-2 text-4xl font-bold">{totalPoints} pts</p>
              <p className="mt-1 text-sm text-[var(--iic-text-muted)]">
                ${(totalPoints / 100).toFixed(2)} USDC value
              </p>
              <button
                onClick={() => setJourneyStep("wallet")}
                className="mt-4 min-h-11 w-full rounded-full bg-[var(--iic-gold)] px-5 py-3 text-sm font-bold text-black transition active:scale-95 hover:bg-[var(--iic-gold-light)]"
              >
                Use my points →
              </button>
            </div>
          </div>
        </div>

        <div className="mt-4 space-y-3">
          {historyRows.map(([code, action, pts, date]) => (
            <div
              key={`${code}-${action}-${date}`}
              className="flex min-h-11 items-center gap-3 rounded-2xl bg-black/30 px-3 py-3 text-sm"
            >
              <span
                className="h-3 w-3 shrink-0 rounded-full"
                style={{ background: brandMeta[code].color }}
              />
              <span className="min-w-0 flex-1 text-[var(--iic-text)]">
                {action}
              </span>
              <span className="shrink-0 font-bold text-[var(--iic-gold-light)]">
                {pts}
              </span>
              <span className="shrink-0 text-xs text-[var(--iic-text-muted)]">
                {date}
              </span>
            </div>
          ))}
        </div>
      </section>

      {journeyStep === "wallet" ? (
        <section className="mt-5 rounded-3xl border border-[var(--iic-border)] bg-[var(--iic-card)] p-4">
          <div className="grid grid-cols-2 gap-2 rounded-2xl bg-black/40 p-1">
            {["points", "exchange"].map((mode) => (
              <button
                key={mode}
                onClick={() => setTab(mode)}
                className={`min-h-11 rounded-xl px-4 text-sm font-bold transition active:scale-95 ${
                  tab === mode
                    ? "bg-[var(--iic-gold)] text-black"
                    : "text-[var(--iic-text-muted)] hover:text-[var(--iic-text)]"
                }`}
              >
                {mode === "points" ? "My Points" : "Exchange"}
              </button>
            ))}
          </div>

          {tab === "points" ? (
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {Object.entries(brandMeta).map(([code, brand]) => (
                <article
                  key={code}
                  className={`rounded-2xl border border-[var(--iic-border)] bg-black/35 p-4 transition ${
                    flashBrand === code ? "scale-[1.02] ring-2 ring-[var(--iic-gold)]" : ""
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span
                          className="h-3 w-3 rounded-full"
                          style={{ background: brand.color }}
                        />
                        <p className="text-sm font-bold uppercase tracking-[0.08em]">
                          {brand.name}
                        </p>
                      </div>
                      <p className="mt-4 text-3xl font-black">
                        {balances[code]} pts
                      </p>
                    </div>
                    <span
                      className="rounded-full px-3 py-1 text-xs font-bold text-white"
                      style={{ background: brand.color }}
                    >
                      {brand.short}
                    </span>
                  </div>

                  <button
                    onClick={() => confirmRedeem(code)}
                    className="mt-5 min-h-11 w-full rounded-full border border-[var(--iic-border)] bg-[var(--iic-card)] px-4 py-3 text-left text-sm font-bold text-[var(--iic-text)] transition active:scale-95 hover:border-[var(--iic-gold)]"
                  >
                    {brand.offer}
                  </button>

                  {confirmBrand === code ? (
                    <div className="mt-3 rounded-2xl border border-[rgba(184,146,42,0.35)] bg-[rgba(184,146,42,0.10)] p-3">
                      <p className="text-sm font-semibold">{brand.confirm}</p>
                      <div className="mt-3 grid grid-cols-2 gap-2">
                        <button
                          onClick={redeemPoints}
                          className="min-h-11 rounded-full bg-[var(--iic-gold)] text-sm font-bold text-black transition active:scale-95"
                        >
                          YES
                        </button>
                        <button
                          onClick={() => setConfirmBrand(null)}
                          className="min-h-11 rounded-full border border-[var(--iic-border)] text-sm font-bold transition active:scale-95"
                        >
                          CANCEL
                        </button>
                      </div>
                    </div>
                  ) : null}
                </article>
              ))}
            </div>
          ) : (
            <div className="mt-4 rounded-2xl border border-[var(--iic-border)] bg-black/30 p-4">
              <div className="grid gap-3 sm:grid-cols-2">
                <label>
                  <span className="text-xs text-[var(--iic-text-muted)]">
                    FROM brand
                  </span>
                  <select
                    value={fromBrand}
                    onChange={(event) => setFromBrand(event.target.value)}
                    className="mt-2 min-h-11 w-full rounded-xl border border-[var(--iic-border)] bg-black px-3 text-sm text-[var(--iic-text)]"
                  >
                    {Object.entries(brandMeta).map(([code, brand]) => (
                      <option key={code} value={code}>
                        {brand.short} · {brand.name}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  <span className="text-xs text-[var(--iic-text-muted)]">
                    TO brand
                  </span>
                  <select
                    value={toBrand}
                    onChange={(event) => setToBrand(event.target.value)}
                    className="mt-2 min-h-11 w-full rounded-xl border border-[var(--iic-border)] bg-black px-3 text-sm text-[var(--iic-text)]"
                  >
                    {Object.entries(brandMeta).map(([code, brand]) => (
                      <option key={code} value={code}>
                        {brand.short} · {brand.name}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <label className="mt-5 block">
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--iic-text-muted)]">Amount</span>
                  <span className="font-bold">{amount} pts</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={amount}
                  onChange={(event) => setAmount(Number(event.target.value))}
                  className="mt-3 w-full accent-[var(--iic-gold)]"
                />
              </label>

              <div className="mt-5 rounded-2xl border border-[var(--iic-border)] bg-[var(--iic-card)] p-4">
                <p className="text-center text-sm font-bold">
                  {amount} {brandMeta[fromBrand].short} pts = {amount}{" "}
                  {brandMeta[toBrand].short} pts
                </p>
                <div className="mt-4 grid grid-cols-[1fr_80px_1fr] items-center gap-3">
                  <div
                    className="rounded-2xl p-4 text-center text-sm font-bold text-white"
                    style={{ background: brandMeta[fromBrand].color }}
                  >
                    {brandMeta[fromBrand].short}
                  </div>
                  <div className="flex justify-center gap-1">
                    {[0, 1, 2].map((dot) => (
                      <span
                        key={dot}
                        className={`h-2 w-2 rounded-full bg-[var(--iic-gold)] ${
                          isTransferring ? "animate-bounce" : ""
                        }`}
                        style={{ animationDelay: `${dot * 120}ms` }}
                      />
                    ))}
                  </div>
                  <div
                    className="rounded-2xl p-4 text-center text-sm font-bold text-white"
                    style={{ background: brandMeta[toBrand].color }}
                  >
                    {brandMeta[toBrand].short}
                  </div>
                </div>
              </div>

              <button
                onClick={exchangePoints}
                className="mt-5 min-h-11 w-full rounded-full bg-[var(--iic-gold)] px-5 py-3 text-sm font-bold text-black transition active:scale-95 hover:bg-[var(--iic-gold-light)]"
              >
                Exchange
              </button>
            </div>
          )}
        </section>
      ) : null}

    </div>
  );
}
