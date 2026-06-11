import Link from "next/link";

const brands = [
  {
    name: "GENTLE MONSTER",
    accent: "#7A7A7A",
    points: 240,
    month: 80,
    note: "earned from 2 purchases",
  },
  {
    name: "TAMBURINS",
    accent: "#CDBB9C",
    points: 180,
    month: 60,
    note: "subscription bonus",
  },
  {
    name: "NUDAKE",
    accent: "#D65F43",
    points: 60,
    month: 60,
    note: "pop-up visit SBT bonus",
  },
  {
    name: "HAUS NOWHERE",
    accent: "#6C8EA4",
    points: 40,
    month: 40,
    note: "Seoul + Shanghai visit",
  },
];

const transactions = [
  ["2026.06.08", "GENTLE MONSTER", "earned", "+120 pts"],
  ["2026.06.04", "TAMBURINS", "earned", "+80 pts"],
  ["2026.05.29", "NUDAKE", "earned", "+60 pts"],
  ["2026.05.21", "HAUS NOWHERE", "earned", "+40 pts"],
  ["2026.05.12", "GENTLE MONSTER", "redeemed", "-100 pts"],
];

const modelLinks = [
  ["/iic/drop", "Model 01", "Drop"],
  ["/iic/passport", "Model 02", "Passport"],
  ["/iic/subscription", "Model 03", "Subscription"],
];

export default function Points() {
  return (
    <div className="mx-auto w-full max-w-6xl text-[var(--iic-text)]">
      <section className="rounded-2xl border border-[var(--iic-border)] bg-[var(--iic-card)] p-6 shadow-2xl shadow-black/40">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--iic-gold)]">
              IIC Cross-Brand Loyalty Token Hub
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight">
              520 pts
            </h1>
            <p className="mt-2 text-sm text-[var(--iic-text-muted)]">
              Wallet 0x7A4F...92C1 · $5.20 USDC value
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button className="h-11 rounded-full bg-[var(--iic-gold)] px-6 text-sm font-semibold text-black transition hover:bg-[var(--iic-gold-light)]">
              Redeem
            </button>
            <button className="h-11 rounded-full border border-[var(--iic-gold)] px-6 text-sm font-semibold text-[var(--iic-gold-light)] transition hover:bg-[var(--iic-gold)] hover:text-black">
              Transfer
            </button>
          </div>
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-3">
          {modelLinks.map(([href, model, label]) => (
            <Link
              key={href}
              href={href}
              className="rounded-xl border border-[var(--iic-border)] bg-black/30 p-4 text-sm transition hover:border-[var(--iic-gold)]"
            >
              <span className="text-[var(--iic-gold-light)]">{model}</span>
              <span className="ml-2 text-[var(--iic-text)]">{label}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {brands.map((brand) => (
          <article
            key={brand.name}
            className="rounded-2xl border border-[var(--iic-border)] bg-[var(--iic-card)] p-5"
            style={{ boxShadow: `inset 4px 0 0 ${brand.accent}` }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--iic-text-muted)]">
              {brand.name}
            </p>
            <p className="mt-4 text-3xl font-semibold">{brand.points} pts</p>
            <p className="mt-2 text-sm text-[var(--iic-text-muted)]">
              {brand.note}
            </p>
            <div className="mt-5">
              <div className="flex justify-between text-xs text-[var(--iic-text-muted)]">
                <span>This month</span>
                <span>{brand.month} / {brand.points} pts</span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-black">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${Math.min(100, (brand.month / brand.points) * 100)}%`,
                    background: brand.accent,
                  }}
                />
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="mt-6 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-2xl border border-[var(--iic-border)] bg-[var(--iic-card)] p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--iic-gold)]">
                Exchange Simulator
              </p>
              <h2 className="mt-2 text-2xl font-semibold">Move value across brands</h2>
            </div>
            <p className="rounded-full border border-[var(--iic-border)] px-3 py-1 text-xs text-[var(--iic-text-muted)]">
              1 GM pt = 1 TB pt
            </p>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-[1fr_120px_1fr]">
            <label className="block">
              <span className="text-xs text-[var(--iic-text-muted)]">From</span>
              <select className="mt-2 h-12 w-full rounded-xl border border-[var(--iic-border)] bg-black px-3 text-sm text-[var(--iic-text)]">
                {brands.map((brand) => (
                  <option key={brand.name}>{brand.name}</option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="text-xs text-[var(--iic-text-muted)]">Amount</span>
              <input
                defaultValue="100"
                className="mt-2 h-12 w-full rounded-xl border border-[var(--iic-border)] bg-black px-3 text-sm text-[var(--iic-text)]"
              />
            </label>
            <label className="block">
              <span className="text-xs text-[var(--iic-text-muted)]">To</span>
              <select className="mt-2 h-12 w-full rounded-xl border border-[var(--iic-border)] bg-black px-3 text-sm text-[var(--iic-text)]">
                <option>TAMBURINS</option>
                <option>GENTLE MONSTER</option>
                <option>NUDAKE</option>
                <option>HAUS NOWHERE</option>
              </select>
            </label>
          </div>

          <div className="mt-5 rounded-xl border border-[var(--iic-border)] bg-black/40 p-4">
            <div className="h-2 overflow-hidden rounded-full bg-black">
              <div className="h-full w-2/3 animate-pulse rounded-full bg-[var(--iic-gold)]" />
            </div>
            <p className="mt-3 text-sm text-[var(--iic-text-muted)]">
              Animated transfer preview: points settle instantly inside the IIC ecosystem.
            </p>
          </div>

          <button className="mt-5 h-12 w-full rounded-xl bg-[var(--iic-gold)] text-sm font-semibold text-black transition hover:bg-[var(--iic-gold-light)]">
            Exchange
          </button>
        </div>

        <div className="rounded-2xl border border-[var(--iic-border)] bg-[var(--iic-card)] p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--iic-gold)]">
            Redemption Options
          </p>
          <div className="mt-5 space-y-3">
            {[
              "100 pts = $1 off next Gentle Monster purchase",
              "200 pts = free TAMBURINS sample",
              "500 pts = NUDAKE seasonal collectible airdrop",
            ].map((option) => (
              <div
                key={option}
                className="rounded-xl border border-[var(--iic-border)] bg-black/30 p-4 text-sm"
              >
                {option}
              </div>
            ))}
          </div>
          <div className="mt-5">
            <div className="flex justify-between text-xs text-[var(--iic-text-muted)]">
              <span>520 pts</span>
              <span>Almost enough for the collectible airdrop!</span>
            </div>
            <div className="mt-2 h-3 overflow-hidden rounded-full bg-black">
              <div className="h-full w-full rounded-full bg-[var(--iic-gold)]" />
            </div>
          </div>
        </div>
      </section>

      <section className="mt-6 rounded-2xl border border-[var(--iic-border)] bg-[var(--iic-card)] p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--iic-gold)]">
          Transaction History
        </p>
        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[620px] text-left text-sm">
            <thead className="text-xs uppercase tracking-[0.14em] text-[var(--iic-text-muted)]">
              <tr>
                <th className="border-b border-[var(--iic-border)] py-3">Date</th>
                <th className="border-b border-[var(--iic-border)] py-3">Brand</th>
                <th className="border-b border-[var(--iic-border)] py-3">Action</th>
                <th className="border-b border-[var(--iic-border)] py-3 text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map(([date, brand, action, amount]) => (
                <tr key={`${date}-${brand}-${amount}`}>
                  <td className="border-b border-[var(--iic-border)] py-4 text-[var(--iic-text-muted)]">
                    {date}
                  </td>
                  <td className="border-b border-[var(--iic-border)] py-4">{brand}</td>
                  <td className="border-b border-[var(--iic-border)] py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs ${
                        action === "earned"
                          ? "bg-[var(--iic-gold)] text-black"
                          : "bg-black text-[var(--iic-text-muted)]"
                      }`}
                    >
                      {action}
                    </span>
                  </td>
                  <td className="border-b border-[var(--iic-border)] py-4 text-right font-semibold">
                    {amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
