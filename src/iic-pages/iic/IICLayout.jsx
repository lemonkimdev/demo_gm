import Link from "next/link";

const iicLinks = [
  ["/iic/points", "points"],
  ["/iic/drop", "drop"],
  ["/iic/passport", "passport"],
  ["/iic/subscription", "subscription"],
  ["/iic/checkout", "checkout"],
  ["/iic/collectibles", "collectibles"],
  ["/iic/b2b", "b2b"],
  ["/iic/authenticate", "authenticate"],
  ["/iic/gift", "gift"],
  ["/iic/genesis", "genesis"],
];

const iicVars = {
  "--iic-bg": "#080808",
  "--iic-card": "#141414",
  "--iic-gold": "#B8922A",
  "--iic-gold-light": "#D4AC52",
  "--iic-text": "#F2EFE8",
  "--iic-text-muted": "#999999",
  "--iic-border": "#222222",
};

export default function IICLayout({ children }) {
  return (
    <main
      style={{
        ...iicVars,
        minHeight: "100vh",
        background: "var(--iic-bg)",
        color: "var(--iic-text)",
      }}
    >
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 20,
          display: "flex",
          alignItems: "center",
          gap: 18,
          overflowX: "auto",
          borderBottom: "1px solid var(--iic-border)",
          background: "rgba(8, 8, 8, 0.94)",
          padding: "14px 18px",
          backdropFilter: "blur(14px)",
        }}
      >
        <Link
          href="/iic/points"
          style={{
            flexShrink: 0,
            color: "var(--iic-gold)",
            fontWeight: 800,
            letterSpacing: "0.12em",
            textDecoration: "none",
          }}
        >
          IIC DIGITAL
        </Link>
        {iicLinks.map(([href, label]) => (
          <Link
            key={href}
            href={href}
            style={{
              flexShrink: 0,
              color: "var(--iic-text-muted)",
              fontSize: 13,
              textDecoration: "none",
            }}
          >
            {label}
          </Link>
        ))}
        <Link
          href="/"
          style={{
            marginLeft: "auto",
            flexShrink: 0,
            color: "var(--iic-gold-light)",
            fontSize: 13,
            textDecoration: "none",
          }}
        >
          ← Back to main
        </Link>
      </nav>
      <section style={{ padding: "96px 24px 40px" }}>{children}</section>
    </main>
  );
}
