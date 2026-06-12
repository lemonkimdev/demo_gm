import Link from "next/link";

const linkStyle = {
  minHeight: 44,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  border: "1px solid var(--iic-border)",
  borderRadius: 999,
  background: "rgba(184,146,42,0.1)",
  color: "var(--iic-text)",
  fontSize: 14,
  fontWeight: 800,
  padding: "0 16px",
  textDecoration: "none",
};

function FlowGroup({ title, subtitle, children }) {
  return (
    <section
      style={{
        border: "1px solid var(--iic-border)",
        borderRadius: 24,
        background: "var(--iic-card)",
        padding: 18,
      }}
    >
      <p
        style={{
          color: "var(--iic-gold)",
          fontSize: 12,
          fontWeight: 800,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
        }}
      >
        {subtitle}
      </p>
      <h2 style={{ marginTop: 8, fontSize: 22, fontWeight: 900 }}>{title}</h2>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 10,
          marginTop: 16,
        }}
      >
        {children}
      </div>
    </section>
  );
}

function Arrow() {
  return (
    <div
      aria-hidden="true"
      style={{
        color: "var(--iic-gold-light)",
        fontSize: 28,
        fontWeight: 900,
        lineHeight: "28px",
        textAlign: "center",
      }}
    >
      ↓
    </div>
  );
}

export default function Page() {
  return (
    <div style={{ margin: "0 auto", maxWidth: 760 }}>
      <section
        style={{
          border: "1px solid var(--iic-border)",
          borderRadius: 28,
          background:
            "radial-gradient(circle at 16% 16%, rgba(184,146,42,0.22), transparent 32%), var(--iic-card)",
          padding: 22,
        }}
      >
        <p
          style={{
            color: "var(--iic-gold)",
            fontSize: 12,
            fontWeight: 900,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
          }}
        >
          IIC Experience Map
        </p>
        <h1
          style={{
            marginTop: 12,
            fontSize: 38,
            fontWeight: 900,
            lineHeight: 1.08,
          }}
        >
          B2C와 B2B 흐름을
          <br />
          한눈에 보기
        </h1>
      </section>

      <div style={{ marginTop: 18 }}>
        <h2 style={{ fontSize: 24, fontWeight: 900 }}>B2C</h2>
        <div style={{ display: "grid", gap: 12, marginTop: 12 }}>
          <FlowGroup title="구매" subtitle="로그인 불필요">
            <Link href="/iic/drop" style={linkStyle}>
              Drop
            </Link>
            <Link href="/iic/checkout" style={linkStyle}>
              Checkout
            </Link>
          </FlowGroup>

          <Arrow />

          <FlowGroup title="로그인 / 회원가입" subtitle="Account">
            <span
              style={{
                ...linkStyle,
                background: "rgba(255,255,255,0.04)",
                color: "var(--iic-text-muted)",
              }}
            >
              Login / Signup
            </span>
          </FlowGroup>

          <Arrow />

          <FlowGroup title="내 자산" subtitle="로그인 필요">
            <Link href="/iic/points" style={linkStyle}>
              Points
            </Link>
            <Link href="/iic/authenticate" style={linkStyle}>
              Authenticate
            </Link>
            <Link href="/iic/gift" style={linkStyle}>
              Gift
            </Link>
          </FlowGroup>

          <Arrow />

          <FlowGroup title="디지털 라이프" subtitle="Lifecycle">
            <Link href="/iic/passport" style={linkStyle}>
              Passport
            </Link>
            <Link href="/iic/subscription" style={linkStyle}>
              Subscription
            </Link>
            <Link href="/iic/collectibles" style={linkStyle}>
              Collectibles
            </Link>
            <Link href="/iic/genesis" style={linkStyle}>
              Genesis
            </Link>
          </FlowGroup>
        </div>
      </div>

      <div
        style={{
          height: 1,
          margin: "26px 0",
          background: "var(--iic-border)",
        }}
      />

      <div>
        <h2 style={{ fontSize: 24, fontWeight: 900 }}>B2B</h2>
        <div style={{ marginTop: 12 }}>
          <FlowGroup title="대시보드" subtitle="Business">
            <Link href="/iic/b2b" style={linkStyle}>
              B2b
            </Link>
          </FlowGroup>
        </div>
      </div>
    </div>
  );
}
