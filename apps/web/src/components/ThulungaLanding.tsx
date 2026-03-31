"use client";

import { useState, useEffect, useRef } from "react";

const CAREERS_URL = "https://careers.thulunga.com";

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible] as const;
}

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
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
    <svg width="60" height="60" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", opacity, pointerEvents: "none" }}>
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

const INITIATIVES = [
  {
    key: "careers",
    title: "Careers",
    description: "Curated government exams, scholarships, remote jobs, and step-by-step career paths — designed for students and young people from Northeast India.",
    status: "live",
    color: "#B87A2E",
    bg: "#FDF8F0",
    href: CAREERS_URL,
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M4 21V10l10-6 10 6v11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M10 21v-6h8v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="14" cy="12" r="2" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    key: "connect",
    title: "Connect",
    description: "A living network of mentors, role models, and real stories from people who grew up in Bodoland and built meaningful lives.",
    status: "coming",
    color: "#2D7047",
    bg: "#F0F7F2",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="20" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M4 22c0-3.3 2.7-6 6-6 1.2 0 2.3.4 3.2 1M16 22c0-3.3 1.8-5 4-5s4 1.7 4 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    key: "learn",
    title: "Learn",
    description: "Practical, no-fluff skill guides — from interview prep and resume writing to freelancing and English communication.",
    status: "coming",
    color: "#5F5147",
    bg: "#F5F3F0",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M5 6h7a3 3 0 013 3v13a2 2 0 00-2-2H5V6zM23 6h-7a3 3 0 00-3 3v13a2 2 0 012-2h8V6z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    key: "bazaar",
    title: "Bazaar",
    description: "A marketplace for handloom textiles, local products, and skilled services from Bodoland — connecting makers to buyers across India.",
    status: "coming",
    color: "#956026",
    bg: "#FAF0DE",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M4 10h20l-2 12H6L4 10z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M10 10V7a4 4 0 018 0v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
];

const VALUES = [
  { title: "Rooted in identity", text: "We don't ask anyone to leave behind who they are. Progress and pride go together." },
  { title: "Real usefulness", text: "Not features for the sake of features. Everything we build should solve a real problem someone faces today." },
  { title: "Bridge, don't gate", text: "Information should flow freely. We help people access what already exists but is hard to find." },
  { title: "Community-first scale", text: "We start with Bodoland, go deep, earn trust — then grow outward. Depth before breadth." },
];

export default function ThulungaLanding() {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navOpacity = Math.min(scrollY / 200, 1);

  return (
    <div style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif", color: "#2D1C0E", background: "#FDFBF7" }}>
      {/* ═══ NAVIGATION ═══ */}
      <nav
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          background: `rgba(253,251,247,${navOpacity * 0.92})`,
          backdropFilter: navOpacity > 0.1 ? "blur(12px)" : "none",
          borderBottom: navOpacity > 0.3 ? "1px solid rgba(45,28,14,0.08)" : "1px solid transparent",
          transition: "border-color 0.3s",
        }}
      >
        <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 2 }}>
            <span style={{ fontFamily: "'Fraunces', serif", fontWeight: 800, fontSize: 22, color: "#B87A2E", letterSpacing: "-0.02em" }}>Thu</span>
            <span style={{ fontFamily: "'Fraunces', serif", fontWeight: 800, fontSize: 22, color: "#2D7047", letterSpacing: "-0.02em" }}>lunga</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
            <a href="#initiatives" style={{ fontSize: 14, color: "#5F5147", textDecoration: "none", fontWeight: 500 }}>Initiatives</a>
            <a href="#philosophy" style={{ fontSize: 14, color: "#5F5147", textDecoration: "none", fontWeight: 500 }}>Philosophy</a>
            <a
              href={CAREERS_URL}
              style={{
                fontSize: 13, fontWeight: 600, color: "#fff", background: "#B87A2E",
                padding: "8px 18px", borderRadius: 8, textDecoration: "none",
                transition: "background 0.2s",
              }}
              onMouseEnter={e => (e.currentTarget.style.background = "#956026")}
              onMouseLeave={e => (e.currentTarget.style.background = "#B87A2E")}
            >
              Explore Careers
            </a>
          </div>
        </div>
      </nav>

      {/* ═══ HERO ═══ */}
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, color: "#8A7965" }}>
          <WeavePattern opacity={0.035} />
        </div>
        <div style={{
          position: "absolute", top: -120, right: -80, width: 600, height: 600,
          background: "radial-gradient(circle, rgba(212,148,58,0.12) 0%, transparent 70%)",
          borderRadius: "50%", pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", bottom: -100, left: -60, width: 500, height: 500,
          background: "radial-gradient(circle, rgba(61,139,90,0.08) 0%, transparent 70%)",
          borderRadius: "50%", pointerEvents: "none",
        }} />

        <div style={{ maxWidth: 1120, margin: "0 auto", padding: "140px 24px 100px", position: "relative", zIndex: 1, width: "100%" }}>
          <FadeIn>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", color: "#B87A2E", marginBottom: 20 }}>
              From Bodoland · For everyone
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(40px, 6.5vw, 76px)", fontWeight: 700, lineHeight: 1.08, letterSpacing: "-0.03em", maxWidth: 800, color: "#2D1C0E" }}>
              Find your direction.
              <br />
              <span style={{ color: "#2D7047" }}>Build your future.</span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.25}>
            <p style={{ fontSize: 18, lineHeight: 1.7, color: "#756556", maxWidth: 560, marginTop: 28 }}>
              <span style={{ fontFamily: "'Fraunces', serif", fontStyle: "italic", color: "#B87A2E" }}>Thulunga</span> means
              inspiration in Bodo. We&apos;re building a place where people — especially from
              Bodoland and similar backgrounds — come when they need guidance, motivation,
              or a way to move forward in life.
            </p>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div style={{ display: "flex", gap: 14, marginTop: 40, flexWrap: "wrap" }}>
              <a
                href={CAREERS_URL}
                style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 15, fontWeight: 600, color: "#fff", background: "#B87A2E", padding: "14px 28px", borderRadius: 10, textDecoration: "none", transition: "all 0.2s", boxShadow: "0 2px 12px rgba(184,122,46,0.25)" }}
                onMouseEnter={e => { e.currentTarget.style.background = "#956026"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "#B87A2E"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                Explore opportunities
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
              <a
                href="#philosophy"
                style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 15, fontWeight: 500, color: "#5F5147", padding: "14px 28px", borderRadius: 10, textDecoration: "none", border: "1px solid rgba(45,28,14,0.12)", background: "transparent", transition: "all 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.background = "#F5F3F0"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
              >
                Our mission
              </a>
            </div>
          </FadeIn>

          <FadeIn delay={0.7}>
            <div style={{ marginTop: 80, display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 1, height: 40, background: "linear-gradient(to bottom, #B87A2E, transparent)" }} />
              <span style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "#9E8E7A" }}>Scroll to explore</span>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ MEANING STRIP ═══ */}
      <section style={{ background: "#2D1C0E", padding: "48px 24px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, color: "#5F5147" }}>
          <WeavePattern opacity={0.06} />
        </div>
        <div style={{ maxWidth: 1120, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <FadeIn>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: "16px 48px" }}>
              <span style={{ fontFamily: "'Fraunces', serif", fontSize: 28, fontWeight: 700, color: "#E3B060" }}>Thulunga</span>
              <span style={{ fontSize: 14, color: "#B8AD9C", letterSpacing: "0.05em" }}>/thuː.lʊŋ.ɡa/</span>
              <span style={{ width: 40, height: 1, background: "#5F5147", display: "inline-block" }} />
              <span style={{ fontFamily: "'Fraunces', serif", fontStyle: "italic", fontSize: 18, color: "#D3CCBF" }}>noun, Bodo language</span>
              <span style={{ width: 40, height: 1, background: "#5F5147", display: "inline-block" }} />
              <span style={{ fontSize: 16, color: "#FAF0DE", fontWeight: 500 }}>inspiration · motivation · the spark that moves you forward</span>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ INITIATIVES ═══ */}
      <section id="initiatives" style={{ padding: "100px 24px", position: "relative" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <FadeIn>
            <p style={{ fontSize: 12, fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", color: "#B87A2E", marginBottom: 12 }}>The ecosystem</p>
            <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(30px, 4vw, 44px)", fontWeight: 700, lineHeight: 1.15, color: "#2D1C0E", maxWidth: 500 }}>
              One identity.<br />Many paths forward.
            </h2>
            <p style={{ fontSize: 16, color: "#756556", maxWidth: 480, marginTop: 16, lineHeight: 1.7 }}>
              Each initiative solves a specific problem. Together, they form a support
              system for anyone trying to grow from a small-town background.
            </p>
          </FadeIn>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20, marginTop: 52 }}>
            {INITIATIVES.map((item, i) => (
              <FadeIn key={item.key} delay={i * 0.1}>
                <div
                  style={{ background: item.bg, borderRadius: 16, padding: 32, border: "1px solid rgba(45,28,14,0.06)", transition: "transform 0.25s, box-shadow 0.25s", cursor: item.status === "live" ? "pointer" : "default", position: "relative", overflow: "hidden", minHeight: 240, display: "flex", flexDirection: "column" }}
                  onMouseEnter={e => { if (item.status === "live") { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(45,28,14,0.08)"; } }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
                  onClick={() => item.status === "live" && item.href && window.open(item.href, "_blank")}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
                    <div style={{ color: item.color }}>{item.icon}</div>
                    {item.status === "live" ? (
                      <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.05em", color: "#2D7047", background: "#DCEEE1", padding: "4px 10px", borderRadius: 20 }}>LIVE</span>
                    ) : (
                      <span style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.05em", color: "#9E8E7A", background: "rgba(45,28,14,0.05)", padding: "4px 10px", borderRadius: 20 }}>SOON</span>
                    )}
                  </div>
                  <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 22, fontWeight: 700, color: "#2D1C0E", marginBottom: 10 }}>{item.title}</h3>
                  <p style={{ fontSize: 14, color: "#756556", lineHeight: 1.65, flex: 1 }}>{item.description}</p>
                  {item.status === "live" && (
                    <div style={{ marginTop: 20 }}>
                      <span style={{ fontSize: 13, fontWeight: 600, color: item.color, display: "inline-flex", alignItems: "center", gap: 6 }}>
                        Explore now
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </span>
                    </div>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ THE PROBLEM ═══ */}
      <section style={{ background: "#F5F3F0", padding: "100px 24px", position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, color: "#B8AD9C" }}>
          <WeavePattern opacity={0.025} />
        </div>
        <div style={{ maxWidth: 1120, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
            <FadeIn>
              <div>
                <p style={{ fontSize: 12, fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", color: "#B87A2E", marginBottom: 12 }}>The gap</p>
                <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(26px, 3.5vw, 38px)", fontWeight: 700, lineHeight: 1.2, color: "#2D1C0E" }}>
                  Ambition doesn&apos;t lack in Bodoland. Navigation does.
                </h2>
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div>
                <p style={{ fontSize: 16, lineHeight: 1.8, color: "#5F5147" }}>
                  Students in Kokrajhar have the same dreams as students in Delhi or Bangalore.
                  What they don&apos;t have is someone to tell them which exams to prepare for, which
                  scholarships exist, which companies hire remotely, or how to write a resume that
                  actually works.
                </p>
                <p style={{ fontSize: 16, lineHeight: 1.8, color: "#5F5147", marginTop: 16 }}>
                  The information exists — scattered across dozens of government sites, in formats
                  that aren&apos;t friendly, in languages that aren&apos;t accessible. Thulunga brings it
                  together in one trusted place.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══ PHILOSOPHY ═══ */}
      <section id="philosophy" style={{ padding: "100px 24px" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <FadeIn>
            <p style={{ fontSize: 12, fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", color: "#2D7047", marginBottom: 12 }}>What we believe</p>
            <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 700, lineHeight: 1.15, color: "#2D1C0E", maxWidth: 420 }}>
              Built on four commitments.
            </h2>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 20, marginTop: 48 }}>
            {VALUES.map((v, i) => (
              <FadeIn key={v.title} delay={i * 0.08}>
                <div
                  style={{ padding: "32px 28px", borderRadius: 14, border: "1px solid rgba(45,28,14,0.08)", background: "#fff", transition: "border-color 0.2s" }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(45,112,71,0.2)")}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(45,28,14,0.08)")}
                >
                  <div style={{ width: 32, height: 3, borderRadius: 2, background: i % 2 === 0 ? "#B87A2E" : "#2D7047", marginBottom: 20 }} />
                  <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 18, fontWeight: 700, color: "#2D1C0E", marginBottom: 10 }}>{v.title}</h3>
                  <p style={{ fontSize: 14, color: "#756556", lineHeight: 1.7 }}>{v.text}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section style={{ position: "relative", overflow: "hidden", background: "#2D1C0E", padding: "80px 24px" }}>
        <div style={{ position: "absolute", inset: 0, color: "#5F5147" }}>
          <WeavePattern opacity={0.06} />
        </div>
        <div style={{ position: "absolute", top: -100, right: -100, width: 400, height: 400, background: "radial-gradient(circle, rgba(212,148,58,0.15) 0%, transparent 65%)", borderRadius: "50%", pointerEvents: "none" }} />
        <div style={{ maxWidth: 680, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
          <FadeIn>
            <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 700, lineHeight: 1.2, color: "#FAF0DE" }}>
              This is just the beginning.
            </h2>
            <p style={{ fontSize: 16, color: "#B8AD9C", marginTop: 16, lineHeight: 1.7 }}>
              Thulunga is being built one step at a time — by someone from Bodoland, for
              people from Bodoland and beyond. If this resonates, start with Careers.
            </p>
            <a
              href={CAREERS_URL}
              style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 15, fontWeight: 600, color: "#2D1C0E", background: "#E3B060", padding: "14px 32px", borderRadius: 10, textDecoration: "none", marginTop: 32, transition: "all 0.2s", boxShadow: "0 2px 16px rgba(227,176,96,0.3)" }}
              onMouseEnter={e => { e.currentTarget.style.background = "#D4943A"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "#E3B060"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              Explore opportunities
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
          </FadeIn>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer style={{ padding: "60px 24px 40px", background: "#FDFBF7", borderTop: "1px solid rgba(45,28,14,0.06)" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 40 }}>
            <div style={{ maxWidth: 280 }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 2, marginBottom: 12 }}>
                <span style={{ fontFamily: "'Fraunces', serif", fontWeight: 800, fontSize: 20, color: "#B87A2E" }}>Thu</span>
                <span style={{ fontFamily: "'Fraunces', serif", fontWeight: 800, fontSize: 20, color: "#2D7047" }}>lunga</span>
              </div>
              <p style={{ fontSize: 13, color: "#9E8E7A", lineHeight: 1.6 }}>
                Inspiration and motivation for the Bodo community and beyond.
                Built with pride from Bodoland, Assam.
              </p>
            </div>
            <div style={{ display: "flex", gap: 56, flexWrap: "wrap" }}>
              <div>
                <h4 style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#5F5147", marginBottom: 14 }}>Platform</h4>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <a href={CAREERS_URL} style={{ fontSize: 14, color: "#756556", textDecoration: "none" }}>Careers</a>
                  <span style={{ fontSize: 14, color: "#B8AD9C" }}>Connect (soon)</span>
                  <span style={{ fontSize: 14, color: "#B8AD9C" }}>Learn (soon)</span>
                  <span style={{ fontSize: 14, color: "#B8AD9C" }}>Bazaar (soon)</span>
                </div>
              </div>
              <div>
                <h4 style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#5F5147", marginBottom: 14 }}>About</h4>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <a href="#philosophy" style={{ fontSize: 14, color: "#756556", textDecoration: "none" }}>Our mission</a>
                  <a href="mailto:hello@thulunga.com" style={{ fontSize: 14, color: "#756556", textDecoration: "none" }}>Contact</a>
                </div>
              </div>
            </div>
          </div>
          <div style={{ marginTop: 48, paddingTop: 24, borderTop: "1px solid rgba(45,28,14,0.06)", textAlign: "center" }}>
            <p style={{ fontSize: 12, color: "#B8AD9C" }}>
              &copy; {new Date().getFullYear()} Thulunga. Built with love from Bodoland.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
