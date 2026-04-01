"use client";

import { useState, useEffect, useRef } from "react";
import ThemeToggle from "./ThemeToggle";
import LangToggle from "./LangToggle";
import { t, type Lang } from "@/lib/translations";

const CAREERS_URL = "https://careers.thulunga.com";

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible] as const;
}

function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const [ref, visible] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.7s cubic-bezier(.22,1,.36,1) ${delay}s, transform 0.7s cubic-bezier(.22,1,.36,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function WeavePattern({ opacity = 0.04 }: { opacity?: number }) {
  return (
    <svg
      width="60"
      height="60"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        opacity,
        pointerEvents: "none",
      }}
    >
      <defs>
        <pattern id="weave" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M0 30h60M30 0v60" stroke="currentColor" strokeWidth="0.5" fill="none" />
          <path
            d="M15 0v60M45 0v60M0 15h60M0 45h60"
            stroke="currentColor"
            strokeWidth="0.25"
            fill="none"
          />
          <rect x="10" y="10" width="10" height="10" fill="currentColor" opacity="0.08" />
          <rect x="40" y="40" width="10" height="10" fill="currentColor" opacity="0.08" />
          <rect x="40" y="10" width="10" height="10" fill="currentColor" opacity="0.04" />
          <rect x="10" y="40" width="10" height="10" fill="currentColor" opacity="0.04" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#weave)" />
    </svg>
  );
}

export default function ThulungaLanding() {
  const [scrollY, setScrollY] = useState(0);
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navOpacity = Math.min(scrollY / 200, 1);
  const tr = (key: string) => t[lang][key] ?? t.en[key] ?? key;

  const INITIATIVES = [
    {
      key: "careers",
      title: tr("careers_title"),
      description: tr("careers_desc"),
      status: "live",
      color: "var(--gold)",
      bg: "var(--bg-card)",
      href: CAREERS_URL,
      cta: tr("careers_cta"),
      icon: (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <path
            d="M4 21V10l10-6 10 6v11"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10 21v-6h8v6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="14" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      ),
    },
    {
      key: "connect",
      title: tr("connect_title"),
      description: tr("connect_desc"),
      status: "coming",
      color: "var(--green)",
      bg: "var(--bg-card)",
      href: null,
      cta: "",
      icon: (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="20" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
          <path
            d="M4 22c0-3.3 2.7-6 6-6 1.2 0 2.3.4 3.2 1M16 22c0-3.3 1.8-5 4-5s4 1.7 4 5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    {
      key: "learn",
      title: tr("learn_title"),
      description: tr("learn_desc"),
      status: "coming",
      color: "var(--text-secondary)",
      bg: "var(--bg-card)",
      href: null,
      cta: "",
      icon: (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <path
            d="M5 6h7a3 3 0 013 3v13a2 2 0 00-2-2H5V6zM23 6h-7a3 3 0 00-3 3v13a2 2 0 012-2h8V6z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      key: "bazaar",
      title: tr("bazaar_title"),
      description: tr("bazaar_desc"),
      status: "coming",
      color: "#956026",
      bg: "var(--bg-card)",
      href: null,
      cta: "",
      icon: (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <path d="M4 10h20l-2 12H6L4 10z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M10 10V7a4 4 0 018 0v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
    },
  ];

  const VALUES = [
    { title: tr("val1_title"), text: tr("val1_text") },
    { title: tr("val2_title"), text: tr("val2_text") },
    { title: tr("val3_title"), text: tr("val3_text") },
    { title: tr("val4_title"), text: tr("val4_text") },
  ];

  return (
    <div
      style={{
        fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
        color: "var(--text-primary)",
        background: "var(--bg-page)",
        transition: "background 0.3s, color 0.3s",
      }}
    >
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: `color-mix(in srgb, var(--bg-page) ${Math.round(navOpacity * 92)}%, transparent)`,
          backdropFilter: navOpacity > 0.1 ? "blur(12px)" : "none",
          borderBottom: navOpacity > 0.3 ? "1px solid var(--border-default)" : "1px solid transparent",
          transition: "border-color 0.3s, background 0.3s",
        }}
      >
        <div
          style={{
            maxWidth: 1120,
            margin: "0 auto",
            padding: "0 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: 64,
          }}
        >
          <div style={{ display: "flex", alignItems: "baseline", gap: 2 }}>
            <span
              style={{
                fontFamily: "'Fraunces', serif",
                fontWeight: 800,
                fontSize: 22,
                color: "var(--gold)",
                letterSpacing: "-0.02em",
              }}
            >
              Thu
            </span>
            <span
              style={{
                fontFamily: "'Fraunces', serif",
                fontWeight: 800,
                fontSize: 22,
                color: "var(--green)",
                letterSpacing: "-0.02em",
              }}
            >
              lunga
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <a
              href="#initiatives"
              style={{ fontSize: 14, color: "var(--text-secondary)", textDecoration: "none", fontWeight: 500 }}
            >
              {tr("nav_initiatives")}
            </a>
            <a
              href="#philosophy"
              style={{ fontSize: 14, color: "var(--text-secondary)", textDecoration: "none", fontWeight: 500 }}
            >
              {tr("nav_philosophy")}
            </a>
            <LangToggle lang={lang} onToggle={() => setLang((l) => (l === "en" ? "brx" : "en"))} />
            <ThemeToggle />
            <a
              href={CAREERS_URL}
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: "#fff",
                background: "var(--gold)",
                padding: "8px 18px",
                borderRadius: 8,
                textDecoration: "none",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "var(--gold-dark)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "var(--gold)")}
            >
              {tr("nav_careers_btn")}
            </a>
          </div>
        </div>
      </nav>

      <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, color: "var(--weave-color)" }}>
          <WeavePattern opacity={0.035} />
        </div>
        <div
          style={{
            position: "absolute",
            top: -120,
            right: -80,
            width: 600,
            height: 600,
            background: "radial-gradient(circle, var(--orb-gold) 0%, transparent 70%)",
            borderRadius: "50%",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -100,
            left: -60,
            width: 500,
            height: 500,
            background: "radial-gradient(circle, var(--orb-green) 0%, transparent 70%)",
            borderRadius: "50%",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            maxWidth: 1120,
            margin: "0 auto",
            padding: "140px 24px 100px",
            position: "relative",
            zIndex: 1,
            width: "100%",
          }}
        >
          <FadeIn>
            <p
              style={{
                fontSize: 13,
                fontWeight: 500,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--gold)",
                marginBottom: 20,
              }}
            >
              {tr("hero_eyebrow")}
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1
              style={{
                fontFamily: "'Fraunces', serif",
                fontSize: "clamp(40px, 6.5vw, 76px)",
                fontWeight: 700,
                lineHeight: 1.08,
                letterSpacing: "-0.03em",
                maxWidth: 800,
                color: "var(--text-primary)",
              }}
            >
              {tr("hero_h1_line1")}
              <br />
              <span style={{ color: "var(--green)" }}>{tr("hero_h1_line2")}</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.25}>
            <p style={{ fontSize: 18, lineHeight: 1.7, color: "var(--text-secondary)", maxWidth: 560, marginTop: 28 }}>
              <span style={{ fontFamily: "'Fraunces', serif", fontStyle: "italic", color: "var(--gold)" }}>
                Thulunga
              </span>{" "}
              {tr("hero_body")}
            </p>
          </FadeIn>
          <FadeIn delay={0.4}>
            <div style={{ display: "flex", gap: 14, marginTop: 40, flexWrap: "wrap" }}>
              <a
                href={CAREERS_URL}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  fontSize: 15,
                  fontWeight: 600,
                  color: "#fff",
                  background: "var(--gold)",
                  padding: "14px 28px",
                  borderRadius: 10,
                  textDecoration: "none",
                  transition: "all 0.2s",
                  boxShadow: "0 2px 12px rgba(184,122,46,0.25)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "var(--gold-dark)";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "var(--gold)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                {tr("hero_cta_primary")}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M3 8h10M9 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
              <a
                href="#philosophy"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  fontSize: 15,
                  fontWeight: 500,
                  color: "var(--text-secondary)",
                  padding: "14px 28px",
                  borderRadius: 10,
                  textDecoration: "none",
                  border: "1px solid var(--border-default)",
                  background: "transparent",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "var(--bg-section-alt)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                }}
              >
                {tr("hero_cta_secondary")}
              </a>
            </div>
          </FadeIn>
          <FadeIn delay={0.7}>
            <div style={{ marginTop: 80, display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 1, height: 40, background: "linear-gradient(to bottom, var(--gold), transparent)" }} />
              <span style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)" }}>
                {tr("hero_scroll")}
              </span>
            </div>
          </FadeIn>
        </div>
      </section>

      <section style={{ background: "var(--meaning-strip)", padding: "48px 24px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, color: "var(--weave-color)" }}>
          <WeavePattern opacity={0.06} />
        </div>
        <div style={{ maxWidth: 1120, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <FadeIn>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: "16px 48px" }}>
              <span style={{ fontFamily: "'Fraunces', serif", fontSize: 28, fontWeight: 700, color: "var(--gold-cta)" }}>
                Thulunga
              </span>
              <span style={{ fontSize: 14, color: "var(--text-on-dark-muted)", letterSpacing: "0.05em" }}>/thuː.lʊŋ.ɡa/</span>
              <span style={{ width: 40, height: 1, background: "var(--weave-color)", display: "inline-block" }} />
              <span
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontStyle: "italic",
                  fontSize: 18,
                  color: "var(--text-on-dark-muted)",
                }}
              >
                {tr("meaning_pos")}
              </span>
              <span style={{ width: 40, height: 1, background: "var(--weave-color)", display: "inline-block" }} />
              <span style={{ fontSize: 16, color: "var(--text-on-dark)", fontWeight: 500 }}>{tr("meaning_def")}</span>
            </div>
          </FadeIn>
        </div>
      </section>

      <section id="initiatives" style={{ padding: "100px 24px", position: "relative", background: "var(--bg-page)" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <FadeIn>
            <p
              style={{
                fontSize: 12,
                fontWeight: 500,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--gold)",
                marginBottom: 12,
              }}
            >
              {tr("initiatives_eyebrow")}
            </p>
            <h2
              style={{
                fontFamily: "'Fraunces', serif",
                fontSize: "clamp(30px, 4vw, 44px)",
                fontWeight: 700,
                lineHeight: 1.15,
                color: "var(--text-primary)",
                maxWidth: 500,
              }}
            >
              {tr("initiatives_h2_line1")}
              <br />
              {tr("initiatives_h2_line2")}
            </h2>
            <p style={{ fontSize: 16, color: "var(--text-secondary)", maxWidth: 480, marginTop: 16, lineHeight: 1.7 }}>
              {tr("initiatives_body")}
            </p>
          </FadeIn>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: 20,
              marginTop: 52,
            }}
          >
            {INITIATIVES.map((item, i) => (
              <FadeIn key={item.key} delay={i * 0.1}>
                <div
                  style={{
                    background: "var(--bg-card)",
                    borderRadius: 16,
                    padding: 32,
                    border: "1px solid var(--border-default)",
                    transition: "transform 0.25s, box-shadow 0.25s, border-color 0.2s",
                    cursor: item.status === "live" ? "pointer" : "default",
                    position: "relative",
                    overflow: "hidden",
                    minHeight: 240,
                    display: "flex",
                    flexDirection: "column",
                  }}
                  onMouseEnter={(e) => {
                    if (item.status === "live") {
                      e.currentTarget.style.transform = "translateY(-4px)";
                      e.currentTarget.style.boxShadow = "0 8px 32px rgba(45,28,14,0.12)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                  onClick={() => item.status === "live" && item.href && window.open(item.href, "_blank")}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
                    <div style={{ color: item.color }}>{item.icon}</div>
                    {item.status === "live" ? (
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 600,
                          letterSpacing: "0.05em",
                          color: "var(--green)",
                          background: "rgba(45,112,71,0.12)",
                          padding: "4px 10px",
                          borderRadius: 20,
                        }}
                      >
                        {tr("badge_live")}
                      </span>
                    ) : (
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 500,
                          letterSpacing: "0.05em",
                          color: "var(--text-muted)",
                          background: "var(--border-default)",
                          padding: "4px 10px",
                          borderRadius: 20,
                        }}
                      >
                        {tr("badge_soon")}
                      </span>
                    )}
                  </div>
                  <h3
                    style={{
                      fontFamily: "'Fraunces', serif",
                      fontSize: 22,
                      fontWeight: 700,
                      color: "var(--text-primary)",
                      marginBottom: 10,
                    }}
                  >
                    {item.title}
                  </h3>
                  <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.65, flex: 1 }}>{item.description}</p>
                  {item.status === "live" && (
                    <div style={{ marginTop: 20 }}>
                      <span style={{ fontSize: 13, fontWeight: 600, color: item.color, display: "inline-flex", alignItems: "center", gap: 6 }}>
                        {item.cta}
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path
                            d="M3 7h8M8 4l3 3-3 3"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </div>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: "var(--bg-section-alt)", padding: "100px 24px", position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, color: "var(--weave-color)" }}>
          <WeavePattern opacity={0.025} />
        </div>
        <div style={{ maxWidth: 1120, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
            <FadeIn>
              <div>
                <p
                  style={{
                    fontSize: 12,
                    fontWeight: 500,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "var(--gold)",
                    marginBottom: 12,
                  }}
                >
                  {tr("problem_eyebrow")}
                </p>
                <h2
                  style={{
                    fontFamily: "'Fraunces', serif",
                    fontSize: "clamp(26px, 3.5vw, 38px)",
                    fontWeight: 700,
                    lineHeight: 1.2,
                    color: "var(--text-primary)",
                  }}
                >
                  {tr("problem_h2")}
                </h2>
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div>
                <p style={{ fontSize: 16, lineHeight: 1.8, color: "var(--text-secondary)" }}>{tr("problem_p1")}</p>
                <p style={{ fontSize: 16, lineHeight: 1.8, color: "var(--text-secondary)", marginTop: 16 }}>
                  {tr("problem_p2")}
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section id="philosophy" style={{ padding: "100px 24px", background: "var(--bg-page)" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <FadeIn>
            <p
              style={{
                fontSize: 12,
                fontWeight: 500,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--green)",
                marginBottom: 12,
              }}
            >
              {tr("philosophy_eyebrow")}
            </p>
            <h2
              style={{
                fontFamily: "'Fraunces', serif",
                fontSize: "clamp(28px, 4vw, 42px)",
                fontWeight: 700,
                lineHeight: 1.15,
                color: "var(--text-primary)",
                maxWidth: 420,
              }}
            >
              {tr("philosophy_h2")}
            </h2>
          </FadeIn>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: 20,
              marginTop: 48,
            }}
          >
            {VALUES.map((v, i) => (
              <FadeIn key={v.title} delay={i * 0.08}>
                <div
                  style={{
                    padding: "32px 28px",
                    borderRadius: 14,
                    border: "1px solid var(--border-default)",
                    background: "var(--bg-card)",
                    transition: "border-color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--border-hover)")}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border-default)")}
                >
                  <div
                    style={{
                      width: 32,
                      height: 3,
                      borderRadius: 2,
                      background: i % 2 === 0 ? "var(--gold)" : "var(--green)",
                      marginBottom: 20,
                    }}
                  />
                  <h3
                    style={{
                      fontFamily: "'Fraunces', serif",
                      fontSize: 18,
                      fontWeight: 700,
                      color: "var(--text-primary)",
                      marginBottom: 10,
                    }}
                  >
                    {v.title}
                  </h3>
                  <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.7 }}>{v.text}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section
        style={{
          position: "relative",
          overflow: "hidden",
          background: "var(--cta-section)",
          padding: "80px 24px",
        }}
      >
        <div style={{ position: "absolute", inset: 0, color: "var(--weave-color)" }}>
          <WeavePattern opacity={0.06} />
        </div>
        <div
          style={{
            position: "absolute",
            top: -100,
            right: -100,
            width: 400,
            height: 400,
            background: "radial-gradient(circle, var(--orb-gold) 0%, transparent 65%)",
            borderRadius: "50%",
            pointerEvents: "none",
          }}
        />
        <div style={{ maxWidth: 680, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
          <FadeIn>
            <h2
              style={{
                fontFamily: "'Fraunces', serif",
                fontSize: "clamp(26px, 4vw, 40px)",
                fontWeight: 700,
                lineHeight: 1.2,
                color: "var(--text-on-dark)",
              }}
            >
              {tr("cta_h2")}
            </h2>
            <p style={{ fontSize: 16, color: "var(--text-on-dark-muted)", marginTop: 16, lineHeight: 1.7 }}>
              {tr("cta_body")}
            </p>
            <a
              href={CAREERS_URL}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                fontSize: 15,
                fontWeight: 600,
                color: "#2D1C0E",
                background: "var(--gold-cta)",
                padding: "14px 32px",
                borderRadius: 10,
                textDecoration: "none",
                marginTop: 32,
                transition: "all 0.2s",
                boxShadow: "0 2px 16px rgba(227,176,96,0.3)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--gold-cta-hover)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "var(--gold-cta)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {tr("cta_btn")}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </FadeIn>
        </div>
      </section>

      <footer
        style={{
          padding: "60px 24px 40px",
          background: "var(--bg-page)",
          borderTop: "1px solid var(--border-default)",
        }}
      >
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 40 }}>
            <div style={{ maxWidth: 280 }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 2, marginBottom: 12 }}>
                <span
                  style={{
                    fontFamily: "'Fraunces', serif",
                    fontWeight: 800,
                    fontSize: 20,
                    color: "var(--gold)",
                  }}
                >
                  Thu
                </span>
                <span
                  style={{
                    fontFamily: "'Fraunces', serif",
                    fontWeight: 800,
                    fontSize: 20,
                    color: "var(--green)",
                  }}
                >
                  lunga
                </span>
              </div>
              <p style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.6 }}>{tr("footer_tagline")}</p>
            </div>
            <div style={{ display: "flex", gap: 56, flexWrap: "wrap" }}>
              <div>
                <h4
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--text-secondary)",
                    marginBottom: 14,
                  }}
                >
                  {tr("footer_platform")}
                </h4>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <a href={CAREERS_URL} style={{ fontSize: 14, color: "var(--text-secondary)", textDecoration: "none" }}>
                    {tr("careers_title")}
                  </a>
                  <span style={{ fontSize: 14, color: "var(--text-muted)" }}>{tr("footer_connect_soon")}</span>
                  <span style={{ fontSize: 14, color: "var(--text-muted)" }}>{tr("footer_learn_soon")}</span>
                  <span style={{ fontSize: 14, color: "var(--text-muted)" }}>{tr("footer_bazaar_soon")}</span>
                </div>
              </div>
              <div>
                <h4
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--text-secondary)",
                    marginBottom: 14,
                  }}
                >
                  {tr("footer_about")}
                </h4>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <a href="#philosophy" style={{ fontSize: 14, color: "var(--text-secondary)", textDecoration: "none" }}>
                    {tr("footer_mission")}
                  </a>
                  <a href="mailto:hello@thulunga.com" style={{ fontSize: 14, color: "var(--text-secondary)", textDecoration: "none" }}>
                    {tr("footer_contact")}
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div style={{ marginTop: 48, paddingTop: 24, borderTop: "1px solid var(--border-default)", textAlign: "center" }}>
            <p style={{ fontSize: 12, color: "var(--text-muted)" }}>
              &copy; {new Date().getFullYear()} {tr("footer_copy")}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
