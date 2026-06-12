"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const iicLinks = [
  ["/iic/drop", "Drop"],
  ["/iic/checkout", "Checkout"],
  ["/iic/points", "Points"],
  ["/iic/authenticate", "Authenticate"],
  ["/iic/gift", "Gift"],
  ["/iic/passport", "Passport"],
  ["/iic/subscription", "Subscription"],
  ["/iic/collectibles", "Collectibles"],
  ["/iic/genesis", "Genesis"],
  ["/iic/b2b", "B2b"],
];

const darkIicVars = {
  "--iic-bg": "#080808",
  "--iic-card": "#141414",
  "--iic-gold": "#B8922A",
  "--iic-gold-light": "#D4AC52",
  "--iic-text": "#F2EFE8",
  "--iic-text-muted": "#999999",
  "--iic-border": "#222222",
};

const lightIicVars = {
  "--iic-bg": "#f3f0e8",
  "--iic-card": "#fffaf0",
  "--iic-gold": "#B8922A",
  "--iic-gold-light": "#8f6c16",
  "--iic-text": "#14110b",
  "--iic-text-muted": "#6f6a5f",
  "--iic-border": "#d9d1bf",
};

export default function IICLayout({ children }) {
  const pathname = usePathname();
  const [theme, setTheme] = useState("dark");
  const isDark = theme === "dark";
  const iicVars = isDark ? darkIicVars : lightIicVars;
  const headerBg = isDark ? "rgba(8, 8, 8, 0.96)" : "rgba(243, 240, 232, 0.96)";

  return (
    <main
      style={{
        ...iicVars,
        minHeight: "100vh",
        background: "var(--iic-bg)",
        color: "var(--iic-text)",
      }}
    >
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 20,
          borderBottom: "1px solid var(--iic-border)",
          background: headerBg,
          backdropFilter: "blur(14px)",
        }}
      >
        <div
          style={{
            minHeight: 56,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
            padding: "0 18px",
          }}
        >
          <Link
            href="/"
            style={{
              color: "var(--iic-text)",
              fontSize: 18,
              fontWeight: 900,
              letterSpacing: "-0.02em",
              textDecoration: "none",
            }}
          >
            gmgm
          </Link>
          <Link
            href="/iic/points"
            style={{
              color: "var(--iic-gold)",
              fontWeight: 800,
              letterSpacing: "0.12em",
              textDecoration: "none",
              textTransform: "uppercase",
            }}
          >
            IIC DIGITAL
          </Link>
        </div>

        <nav
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: 8,
            padding: "0 18px 14px",
          }}
        >
          {iicLinks.map(([href, label]) => {
            const isActive = pathname === href;

            return (
              <Link
                key={href}
                href={href}
                style={{
                  minHeight: 36,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: isActive
                    ? "1px solid rgba(184,146,42,0.22)"
                    : "1px solid var(--iic-border)",
                  borderRadius: 999,
                  background: isActive
                    ? isDark
                      ? "rgba(184,146,42,0.08)"
                      : "rgba(184,146,42,0.12)"
                    : isDark
                      ? "rgba(255,255,255,0.03)"
                      : "rgba(255,255,255,0.55)",
                  color: isActive ? "var(--iic-text-muted)" : "var(--iic-text)",
                  fontSize: 13,
                  fontWeight: 700,
                  opacity: isActive ? 0.55 : 1,
                  padding: "0 13px",
                  textDecoration: "none",
                }}
                aria-current={isActive ? "page" : undefined}
              >
                {label}
              </Link>
            );
          })}
          <Link
            href="/"
            style={{
              minHeight: 36,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid var(--iic-border)",
              borderRadius: 999,
              color: "var(--iic-gold-light)",
              fontSize: 13,
              fontWeight: 800,
              padding: "0 13px",
              textDecoration: "none",
            }}
          >
            ← Back to main
          </Link>
          <div
            style={{
              minHeight: 36,
              display: "inline-flex",
              alignItems: "center",
              border: "1px solid var(--iic-border)",
              borderRadius: 999,
              padding: 3,
              background: isDark ? "rgba(0,0,0,0.35)" : "rgba(255,255,255,0.68)",
            }}
            aria-label="IIC 테마 선택"
          >
            <button
              type="button"
              aria-label="라이트 모드"
              title="라이트 모드"
              onClick={() => setTheme("light")}
              style={{
                width: 30,
                height: 30,
                border: 0,
                borderRadius: 999,
                background: !isDark ? "#ffffff" : "transparent",
                color: !isDark ? "#111111" : "var(--iic-text-muted)",
                fontSize: 14,
                cursor: "pointer",
              }}
            >
              ☀
            </button>
            <button
              type="button"
              aria-label="다크 모드"
              title="다크 모드"
              onClick={() => setTheme("dark")}
              style={{
                width: 30,
                height: 30,
                border: 0,
                borderRadius: 999,
                background: isDark ? "#ffffff" : "transparent",
                color: isDark ? "#111111" : "var(--iic-text-muted)",
                fontSize: 14,
                cursor: "pointer",
              }}
            >
              ☾
            </button>
          </div>
        </nav>
      </header>
      <section style={{ padding: "24px 24px 40px" }}>{children}</section>
    </main>
  );
}
