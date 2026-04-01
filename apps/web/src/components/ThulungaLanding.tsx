"use client";

import { useState, useEffect, useRef } from "react";
import ThemeToggle from "./ThemeToggle";
import LangToggle from "./LangToggle";
import { useLocalize } from "@/lib/LanguageContext";

const NAV_INITIATIVES = "NAV_INITIATIVES";
const NAV_PHILOSOPHY = "NAV_PHILOSOPHY";
const NAV_CAREERS_BTN = "NAV_CAREERS_BTN";
const HERO_EYEBROW = "HERO_EYEBROW";
const HERO_HEADING_LINE1 = "HERO_HEADING_LINE1";
const HERO_HEADING_LINE2 = "HERO_HEADING_LINE2";
const HERO_BODY = "HERO_BODY";
const HERO_CTA_PRIMARY = "HERO_CTA_PRIMARY";
const HERO_CTA_SECONDARY = "HERO_CTA_SECONDARY";
const HERO_SCROLL_HINT = "HERO_SCROLL_HINT";
const MEANING_PART_OF_SPEECH = "MEANING_PART_OF_SPEECH";
const MEANING_DEFINITION = "MEANING_DEFINITION";
const INITIATIVES_EYEBROW = "INITIATIVES_EYEBROW";
const INITIATIVES_HEADING_LINE1 = "INITIATIVES_HEADING_LINE1";
const INITIATIVES_HEADING_LINE2 = "INITIATIVES_HEADING_LINE2";
const INITIATIVES_BODY = "INITIATIVES_BODY";
const CAREERS_CARD_TITLE = "CAREERS_CARD_TITLE";
const CAREERS_CARD_DESC = "CAREERS_CARD_DESC";
const CAREERS_CARD_CTA = "CAREERS_CARD_CTA";
const CONNECT_CARD_TITLE = "CONNECT_CARD_TITLE";
const CONNECT_CARD_DESC = "CONNECT_CARD_DESC";
const LEARN_CARD_TITLE = "LEARN_CARD_TITLE";
const LEARN_CARD_DESC = "LEARN_CARD_DESC";
const BAZAAR_CARD_TITLE = "BAZAAR_CARD_TITLE";
const BAZAAR_CARD_DESC = "BAZAAR_CARD_DESC";
const BADGE_LIVE = "BADGE_LIVE";
const BADGE_SOON = "BADGE_SOON";
const PROBLEM_EYEBROW = "PROBLEM_EYEBROW";
const PROBLEM_HEADING = "PROBLEM_HEADING";
const PROBLEM_BODY_1 = "PROBLEM_BODY_1";
const PROBLEM_BODY_2 = "PROBLEM_BODY_2";
const PHILOSOPHY_EYEBROW = "PHILOSOPHY_EYEBROW";
const PHILOSOPHY_HEADING = "PHILOSOPHY_HEADING";
const VALUE_1_TITLE = "VALUE_1_TITLE";
const VALUE_1_TEXT = "VALUE_1_TEXT";
const VALUE_2_TITLE = "VALUE_2_TITLE";
const VALUE_2_TEXT = "VALUE_2_TEXT";
const VALUE_3_TITLE = "VALUE_3_TITLE";
const VALUE_3_TEXT = "VALUE_3_TEXT";
const VALUE_4_TITLE = "VALUE_4_TITLE";
const VALUE_4_TEXT = "VALUE_4_TEXT";
const CTA_HEADING = "CTA_HEADING";
const CTA_BODY = "CTA_BODY";
const CTA_BTN = "CTA_BTN";
const FOOTER_TAGLINE = "FOOTER_TAGLINE";
const FOOTER_PLATFORM_LABEL = "FOOTER_PLATFORM_LABEL";
const FOOTER_CONNECT_SOON = "FOOTER_CONNECT_SOON";
const FOOTER_LEARN_SOON = "FOOTER_LEARN_SOON";
const FOOTER_BAZAAR_SOON = "FOOTER_BAZAAR_SOON";
const FOOTER_ABOUT_LABEL = "FOOTER_ABOUT_LABEL";
const FOOTER_MISSION_LINK = "FOOTER_MISSION_LINK";
const FOOTER_CONTACT_LINK = "FOOTER_CONTACT_LINK";
const FOOTER_COPYRIGHT = "FOOTER_COPYRIGHT";

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

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const [ref, visible] = useInView();
  return (
    <div
      ref={ref}
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
      style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", opacity, pointerEvents: "none" }}
    >
      <defs>
        <pattern id="weave" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M0 30h60M30 0v60" stroke="currentColor" strokeWidth="0.5" fill="none" />
          <path d="M15 0v60M45 0v60M0 15h60M0 45h60" stroke="currentColor" strokeWidth="0.25" fill="none" />
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
  const { localize } = useLocalize();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navOpacity = Math.min(scrollY / 200, 1);

  const INITIATIVES = [
    {
      key: "careers",
      title: localize(CAREERS_CARD_TITLE),
      description: localize(CAREERS_CARD_DESC),
      cta: localize(CAREERS_CARD_CTA),
      status: "live",
      href: CAREERS_URL,
      color: "var(--gold)",
      icon: (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <path d="M4 21V10l10-6 10 6v11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M10 21v-6h8v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="14" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      ),
    },
    {
      key: "connect",
      title: localize(CONNECT_CARD_TITLE),
      description: localize(CONNECT_CARD_DESC),
      cta: "",
      status: "coming",
      href: null,
      color: "var(--green)",
      icon: (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="20" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
          <path d="M4 22c0-3.3 2.7-6 6-6 1.2 0 2.3.4 3.2 1M16 22c0-3.3 1.8-5 4-5s4 1.7 4 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      key: "learn",
      title: localize(LEARN_CARD_TITLE),
      description: localize(LEARN_CARD_DESC),
      cta: "",
      status: "coming",
      href: null,
      color: "var(--text-secondary)",
      icon: (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <path d="M5 6h7a3 3 0 013 3v13a2 2 0 00-2-2H5V6zM23 6h-7a3 3 0 00-3 3v13a2 2 0 012-2h8V6z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      key: "bazaar",
      title: localize(BAZAAR_CARD_TITLE),
      description: localize(BAZAAR_CARD_DESC),
      cta: "",
      status: "coming",
      href: null,
      color: "#956026",
      icon: (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <path d="M4 10h20l-2 12H6L4 10z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M10 10V7a4 4 0 018 0v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
    },
  ];

  const VALUES = [
    { title: localize(VALUE_1_TITLE), text: localize(VALUE_1_TEXT) },
    { title: localize(VALUE_2_TITLE), text: localize(VALUE_2_TEXT) },
    { title: localize(VALUE_3_TITLE), text: localize(VALUE_3_TEXT) },
    { title: localize(VALUE_4_TITLE), text: localize(VALUE_4_TEXT) },
  ];

  return (
    <div style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif", color: "var(--text-primary)", background: "var(--bg-page)", transition: "background 0.3s, color 0.3s" }}>
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
        <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 2 }}>
            <span style={{ fontFamily: "'Fraunces', serif", fontWeight: 800, fontSize: 22, color: "var(--gold)", letterSpacing: "-0.02em" }}>Thu</span>
            <span style={{ fontFamily: "'Fraunces', serif", fontWeight: 800, fontSize: 22, color: "var(--green)", letterSpacing: "-0.02em" }}>lunga</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <a href="#initiatives" style={{ fontSize: 14, color: "var(--text-secondary)", textDecoration: "none", fontWeight: 500 }}>{localize(NAV_INITIATIVES)}</a>
            <a href="#philosophy" style={{ fontSize: 14, color: "var(--text-secondary)", textDecoration: "none", fontWeight: 500 }}>{localize(NAV_PHILOSOPHY)}</a>
            <LangToggle />
            <ThemeToggle />
            <a href={CAREERS_URL} style={{ fontSize: 13, fontWeight: 600, color: "#fff", background: "var(--gold)", padding: "8px 18px", borderRadius: 8, textDecoration: "none", transition: "background 0.2s" }} onMouseEnter={(e) => (e.currentTarget.style.background = "var(--gold-dark)")} onMouseLeave={(e) => (e.currentTarget.style.background = "var(--gold)")}>
              {localize(NAV_CAREERS_BTN)}
            </a>
          </div>
        </div>
      </nav>

      <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, color: "var(--weave-color)" }}><WeavePattern opacity={0.035} /></div>
        <div style={{ position: "absolute", top: -120, right: -80, width: 600, height: 600, background: "radial-gradient(circle, var(--orb-gold) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -100, left: -60, width: 500, height: 500, background: "radial-gradient(circle, var(--orb-green) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />

        <div style={{ maxWidth: 1120, margin: "0 auto", padding: "140px 24px 100px", position: "relative", zIndex: 1, width: "100%" }}>
          <FadeIn><p style={{ fontSize: 13, fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 20 }}>{localize(HERO_EYEBROW)}</p></FadeIn>
          <FadeIn delay={0.1}><h1 style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(40px, 6.5vw, 76px)", fontWeight: 700, lineHeight: 1.08, letterSpacing: "-0.03em", maxWidth: 800, color: "var(--text-primary)" }}>{localize(HERO_HEADING_LINE1)}<br /><span style={{ color: "var(--green)" }}>{localize(HERO_HEADING_LINE2)}</span></h1></FadeIn>
          <FadeIn delay={0.25}><p style={{ fontSize: 18, lineHeight: 1.7, color: "var(--text-secondary)", maxWidth: 560, marginTop: 28 }}><span style={{ fontFamily: "'Fraunces', serif", fontStyle: "italic", color: "var(--gold)" }}>Thulunga</span>{" "}{localize(HERO_BODY)}</p></FadeIn>
          <FadeIn delay={0.4}>
            <div style={{ display: "flex", gap: 14, marginTop: 40, flexWrap: "wrap" }}>
              <a href={CAREERS_URL} style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 15, fontWeight: 600, color: "#fff", background: "var(--gold)", padding: "14px 28px", borderRadius: 10, textDecoration: "none", transition: "all 0.2s", boxShadow: "0 2px 12px rgba(184,122,46,0.25)" }} onMouseEnter={(e) => { e.currentTarget.style.background = "var(--gold-dark)"; e.currentTarget.style.transform = "translateY(-1px)"; }} onMouseLeave={(e) => { e.currentTarget.style.background = "var(--gold)"; e.currentTarget.style.transform = "translateY(0)"; }}>
                {localize(HERO_CTA_PRIMARY)}
              </a>
              <a href="#philosophy" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 15, fontWeight: 500, color: "var(--text-secondary)", padding: "14px 28px", borderRadius: 10, textDecoration: "none", border: "1px solid var(--border-default)", background: "transparent", transition: "all 0.2s" }} onMouseEnter={(e) => { e.currentTarget.style.background = "var(--bg-section-alt)"; }} onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}>
                {localize(HERO_CTA_SECONDARY)}
              </a>
            </div>
          </FadeIn>
          <FadeIn delay={0.7}><div style={{ marginTop: 80, display: "flex", alignItems: "center", gap: 10 }}><div style={{ width: 1, height: 40, background: "linear-gradient(to bottom, var(--gold), transparent)" }} /><span style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)" }}>{localize(HERO_SCROLL_HINT)}</span></div></FadeIn>
        </div>
      </section>

      <section style={{ background: "var(--meaning-strip)", padding: "48px 24px", position: "relative", overflow: "hidden" }}><div style={{ position: "absolute", inset: 0, color: "var(--weave-color)" }}><WeavePattern opacity={0.06} /></div><div style={{ maxWidth: 1120, margin: "0 auto", position: "relative", zIndex: 1 }}><FadeIn><div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: "16px 48px" }}><span style={{ fontFamily: "'Fraunces', serif", fontSize: 28, fontWeight: 700, color: "var(--gold-cta)" }}>Thulunga</span><span style={{ fontSize: 14, color: "var(--text-on-dark-muted)", letterSpacing: "0.05em" }}>/thuː.lʊŋ.ɡa/</span><span style={{ width: 40, height: 1, background: "var(--weave-color)", display: "inline-block" }} /><span style={{ fontFamily: "'Fraunces', serif", fontStyle: "italic", fontSize: 18, color: "var(--text-on-dark-muted)" }}>{localize(MEANING_PART_OF_SPEECH)}</span><span style={{ width: 40, height: 1, background: "var(--weave-color)", display: "inline-block" }} /><span style={{ fontSize: 16, color: "var(--text-on-dark)", fontWeight: 500 }}>{localize(MEANING_DEFINITION)}</span></div></FadeIn></div></section>

      <section id="initiatives" style={{ padding: "100px 24px", background: "var(--bg-page)" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <FadeIn>
            <p style={{ fontSize: 12, fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 12 }}>{localize(INITIATIVES_EYEBROW)}</p>
            <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(30px, 4vw, 44px)", fontWeight: 700, lineHeight: 1.15, color: "var(--text-primary)", maxWidth: 500 }}>{localize(INITIATIVES_HEADING_LINE1)}<br />{localize(INITIATIVES_HEADING_LINE2)}</h2>
            <p style={{ fontSize: 16, color: "var(--text-secondary)", maxWidth: 480, marginTop: 16, lineHeight: 1.7 }}>{localize(INITIATIVES_BODY)}</p>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20, marginTop: 52 }}>
            {INITIATIVES.map((item, i) => (
              <FadeIn key={item.key} delay={i * 0.1}>
                <div style={{ background: "var(--bg-card)", borderRadius: 16, padding: 32, border: "1px solid var(--border-default)", transition: "transform 0.25s, box-shadow 0.25s", cursor: item.status === "live" ? "pointer" : "default", minHeight: 240, display: "flex", flexDirection: "column" }} onMouseEnter={(e) => { if (item.status === "live") { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(45,28,14,0.12)"; } }} onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }} onClick={() => item.status === "live" && item.href && window.open(item.href, "_blank")}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
                    <div style={{ color: item.color }}>{item.icon}</div>
                    {item.status === "live" ? <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.05em", color: "var(--green)", background: "rgba(45,112,71,0.12)", padding: "4px 10px", borderRadius: 20 }}>{localize(BADGE_LIVE)}</span> : <span style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.05em", color: "var(--text-muted)", background: "var(--border-default)", padding: "4px 10px", borderRadius: 20 }}>{localize(BADGE_SOON)}</span>}
                  </div>
                  <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 22, fontWeight: 700, color: "var(--text-primary)", marginBottom: 10 }}>{item.title}</h3>
                  <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.65, flex: 1 }}>{item.description}</p>
                  {item.status === "live" && <div style={{ marginTop: 20 }}><span style={{ fontSize: 13, fontWeight: 600, color: item.color, display: "inline-flex", alignItems: "center", gap: 6 }}>{item.cta}</span></div>}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: "var(--bg-section-alt)", padding: "100px 24px", position: "relative" }}><div style={{ position: "absolute", inset: 0, color: "var(--weave-color)" }}><WeavePattern opacity={0.025} /></div><div style={{ maxWidth: 1120, margin: "0 auto", position: "relative", zIndex: 1 }}><div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}><FadeIn><p style={{ fontSize: 12, fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 12 }}>{localize(PROBLEM_EYEBROW)}</p><h2 style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(26px, 3.5vw, 38px)", fontWeight: 700, lineHeight: 1.2, color: "var(--text-primary)" }}>{localize(PROBLEM_HEADING)}</h2></FadeIn><FadeIn delay={0.15}><p style={{ fontSize: 16, lineHeight: 1.8, color: "var(--text-secondary)" }}>{localize(PROBLEM_BODY_1)}</p><p style={{ fontSize: 16, lineHeight: 1.8, color: "var(--text-secondary)", marginTop: 16 }}>{localize(PROBLEM_BODY_2)}</p></FadeIn></div></div></section>

      <section id="philosophy" style={{ padding: "100px 24px", background: "var(--bg-page)" }}><div style={{ maxWidth: 1120, margin: "0 auto" }}><FadeIn><p style={{ fontSize: 12, fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--green)", marginBottom: 12 }}>{localize(PHILOSOPHY_EYEBROW)}</p><h2 style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 700, lineHeight: 1.15, color: "var(--text-primary)", maxWidth: 420 }}>{localize(PHILOSOPHY_HEADING)}</h2></FadeIn><div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 20, marginTop: 48 }}>{VALUES.map((v, i) => (<FadeIn key={v.title} delay={i * 0.08}><div style={{ padding: "32px 28px", borderRadius: 14, border: "1px solid var(--border-default)", background: "var(--bg-card)", transition: "border-color 0.2s" }} onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--border-hover)")} onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border-default)")}><div style={{ width: 32, height: 3, borderRadius: 2, background: i % 2 === 0 ? "var(--gold)" : "var(--green)", marginBottom: 20 }} /><h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 18, fontWeight: 700, color: "var(--text-primary)", marginBottom: 10 }}>{v.title}</h3><p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.7 }}>{v.text}</p></div></FadeIn>))}</div></div></section>

      <section style={{ position: "relative", overflow: "hidden", background: "var(--cta-section)", padding: "80px 24px" }}><div style={{ position: "absolute", inset: 0, color: "var(--weave-color)" }}><WeavePattern opacity={0.06} /></div><div style={{ maxWidth: 680, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}><FadeIn><h2 style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 700, lineHeight: 1.2, color: "var(--text-on-dark)" }}>{localize(CTA_HEADING)}</h2><p style={{ fontSize: 16, color: "var(--text-on-dark-muted)", marginTop: 16, lineHeight: 1.7 }}>{localize(CTA_BODY)}</p><a href={CAREERS_URL} style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 15, fontWeight: 600, color: "#2D1C0E", background: "var(--gold-cta)", padding: "14px 32px", borderRadius: 10, textDecoration: "none", marginTop: 32 }}>{localize(CTA_BTN)}</a></FadeIn></div></section>

      <footer style={{ padding: "60px 24px 40px", background: "var(--bg-page)", borderTop: "1px solid var(--border-default)" }}><div style={{ maxWidth: 1120, margin: "0 auto" }}><div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 40 }}><div style={{ maxWidth: 280 }}><div style={{ display: "flex", alignItems: "baseline", gap: 2, marginBottom: 12 }}><span style={{ fontFamily: "'Fraunces', serif", fontWeight: 800, fontSize: 20, color: "var(--gold)" }}>Thu</span><span style={{ fontFamily: "'Fraunces', serif", fontWeight: 800, fontSize: 20, color: "var(--green)" }}>lunga</span></div><p style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.6 }}>{localize(FOOTER_TAGLINE)}</p></div><div style={{ display: "flex", gap: 56, flexWrap: "wrap" }}><div><h4 style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-secondary)", marginBottom: 14 }}>{localize(FOOTER_PLATFORM_LABEL)}</h4><div style={{ display: "flex", flexDirection: "column", gap: 10 }}><a href={CAREERS_URL} style={{ fontSize: 14, color: "var(--text-secondary)", textDecoration: "none" }}>{localize(CAREERS_CARD_TITLE)}</a><span style={{ fontSize: 14, color: "var(--text-muted)" }}>{localize(FOOTER_CONNECT_SOON)}</span><span style={{ fontSize: 14, color: "var(--text-muted)" }}>{localize(FOOTER_LEARN_SOON)}</span><span style={{ fontSize: 14, color: "var(--text-muted)" }}>{localize(FOOTER_BAZAAR_SOON)}</span></div></div><div><h4 style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-secondary)", marginBottom: 14 }}>{localize(FOOTER_ABOUT_LABEL)}</h4><div style={{ display: "flex", flexDirection: "column", gap: 10 }}><a href="#philosophy" style={{ fontSize: 14, color: "var(--text-secondary)", textDecoration: "none" }}>{localize(FOOTER_MISSION_LINK)}</a><a href="mailto:hello@thulunga.com" style={{ fontSize: 14, color: "var(--text-secondary)", textDecoration: "none" }}>{localize(FOOTER_CONTACT_LINK)}</a></div></div></div></div><div style={{ marginTop: 48, paddingTop: 24, borderTop: "1px solid var(--border-default)", textAlign: "center" }}><p style={{ fontSize: 12, color: "var(--text-muted)" }}>&copy; {new Date().getFullYear()} {localize(FOOTER_COPYRIGHT)}</p></div></div></footer>
    </div>
  );
}
