import Link from "next/link";

const linkStyle = {
  minHeight: 40,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  border: "1px solid var(--iic-border)",
  borderRadius: 999,
  background: "rgba(184,146,42,0.1)",
  color: "var(--iic-text)",
  fontSize: 14,
  fontWeight: 800,
  padding: "0 15px",
  textDecoration: "none",
};

const tagStyle = {
  color: "var(--iic-gold)",
  fontSize: 12,
  fontWeight: 800,
  letterSpacing: "0.16em",
  textTransform: "uppercase",
};

function FlowBox({ title, children }) {
  return (
    <section
      style={{
        border: "1px solid var(--iic-border)",
        borderRadius: 28,
        background: "var(--iic-card)",
        padding: 18,
      }}
    >
      <h2 style={{ fontSize: 26, fontWeight: 900 }}>{title}</h2>
      <div style={{ display: "grid", gap: 12, marginTop: 16 }}>{children}</div>
    </section>
  );
}

function FlowRow({ title, tag, children }) {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: 10,
        border: "1px solid var(--iic-border)",
        borderRadius: 22,
        background: "rgba(255,255,255,0.03)",
        padding: 12,
      }}
    >
      <h3 style={{ fontSize: 20, fontWeight: 900 }}>{title}</h3>
      {tag ? <span style={tagStyle}>{tag}</span> : null}
      {children}
    </div>
  );
}

function Arrow() {
  return (
    <div
      aria-hidden="true"
      style={{
        color: "var(--iic-gold-light)",
        fontSize: 24,
        fontWeight: 900,
        lineHeight: "20px",
        paddingLeft: 12,
      }}
    >
      ↓
    </div>
  );
}

export default function Page() {
  return (
    <div style={{ margin: "0 auto", maxWidth: 820 }}>
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
            fontSize: 42,
            fontWeight: 900,
            lineHeight: 1.04,
          }}
        >
          User Flow
        </h1>
      </section>

      <div style={{ display: "grid", gap: 18, marginTop: 18 }}>
        <FlowBox title="B2C">
          <FlowRow title="구매" tag="로그인 임의">
            <Link href="/iic/drop" style={linkStyle}>
              Drop
            </Link>
            <Link href="/iic/checkout" style={linkStyle}>
              Checkout
            </Link>
          </FlowRow>

          <Arrow />

          <FlowRow title="로그인/회원가입" tag="Account">
            <span
              style={{
                ...linkStyle,
                background: "rgba(255,255,255,0.04)",
                color: "var(--iic-text-muted)",
              }}
            >
              Login/Signup
            </span>
          </FlowRow>

          <Arrow />

          <FlowRow title="내 자산">
            <Link href="/iic/points" style={linkStyle}>
              Points
            </Link>
            <Link href="/iic/authenticate" style={linkStyle}>
              Authenticate
            </Link>
            <Link href="/iic/gift" style={linkStyle}>
              Gift
            </Link>
          </FlowRow>

          <Arrow />

          <FlowRow title="디지털 라이프" tag="로그인 필요">
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
          </FlowRow>
        </FlowBox>

        <FlowBox title="B2B">
          <FlowRow title="대시보드">
            <Link href="/iic/b2b" style={linkStyle}>
              B2B
            </Link>
          </FlowRow>
        </FlowBox>
      </div>
    </div>
  );
}
