"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const themeStorageKey = "gmgm-theme";

const iicLinks = [
  ["/iic", "Home"],
  ["/iic/drop", "Drop"],
  ["/iic/checkout", "C.O"],
  ["/iic/points", "Po&To"],
  ["/iic/authenticate", "Auth"],
  ["/iic/gift", "Gift"],
  ["/iic/passport", "Pass"],
  ["/iic/subscription", "Subsc"],
  ["/iic/collectibles", "Collec"],
  ["/iic/genesis", "Gen"],
  ["/iic/b2b", "B2B"],
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
  "--iic-bg": "#f4f4f4",
  "--iic-card": "#ffffff",
  "--iic-gold": "#B8922A",
  "--iic-gold-light": "#5f5f5f",
  "--iic-text": "#101010",
  "--iic-text-muted": "#666666",
  "--iic-border": "#d8d8d8",
};

export default function IICLayout({ children }) {
  const pathname = usePathname();
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") {
      return "dark";
    }

    const savedTheme = window.localStorage.getItem(themeStorageKey);
    return savedTheme === "dark" || savedTheme === "light" ? savedTheme : "dark";
  });
  const isDark = theme === "dark";
  const iicVars = isDark ? darkIicVars : lightIicVars;
  const headerBg = isDark ? "rgba(8, 8, 8, 0.96)" : "rgba(244, 244, 244, 0.96)";

  function toggleTheme() {
    const nextTheme = isDark ? "light" : "dark";
    setTheme(nextTheme);
    window.localStorage.setItem(themeStorageKey, nextTheme);
  }

  return (
    <main
      className="iic-app"
      data-iic-theme={theme}
      style={{
        ...iicVars,
        minHeight: "100vh",
        background: "var(--iic-bg)",
        color: "var(--iic-text)",
      }}
    >
      <style jsx global>{`
        .iic-app[data-iic-theme="light"] .iic-on-dark {
          color: #f7f7f7 !important;
        }

        .iic-app[data-iic-theme="light"] .iic-on-dark-muted {
          color: #d6d6d6 !important;
        }

        .iic-app[data-iic-theme="light"] .iic-keep-gold {
          color: #d4ac52 !important;
        }

        .iic-app[data-iic-theme="light"] .iic-light-soft-panel {
          background: rgba(255, 255, 255, 0.78) !important;
        }

        .iic-app[data-iic-theme="light"] .iic-light-hover-readable:hover {
          background: #e8e8e8 !important;
          color: #111111 !important;
        }

        .iic-app[data-iic-theme="light"] .iic-light-filter-button:not(.iic-active-filter) {
          color: #d8d8d8 !important;
        }

        .iic-app[data-iic-theme="light"] .iic-light-filter-button:not(.iic-active-filter):hover {
          background: #5a5a5a !important;
          color: #ffffff !important;
        }
      `}</style>
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
            href="/iic"
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
            go to Top
          </Link>
          <button
            type="button"
            onClick={toggleTheme}
            style={{
              minHeight: 36,
              display: "inline-flex",
              alignItems: "center",
              border: "1px solid var(--iic-border)",
              borderRadius: 999,
              padding: 3,
              background: isDark ? "rgba(0,0,0,0.35)" : "rgba(255,255,255,0.68)",
              cursor: "pointer",
            }}
            aria-label="IIC 테마 전환"
            title="IIC 테마 전환"
          >
            <span
              style={{
                width: 30,
                height: 30,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 999,
                background: !isDark ? "#111111" : "transparent",
                color: !isDark ? "#ffffff" : "var(--iic-text-muted)",
                fontSize: 14,
              }}
            >
              ☀
            </span>
            <span
              style={{
                width: 30,
                height: 30,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 999,
                background: isDark ? "#ffffff" : "transparent",
                color: isDark ? "#111111" : "var(--iic-text-muted)",
                fontSize: 14,
              }}
            >
              ☾
            </span>
          </button>
        </nav>
      </header>
      <section style={{ padding: "24px 24px 40px" }}>{children}</section>
    </main>
  );
}
