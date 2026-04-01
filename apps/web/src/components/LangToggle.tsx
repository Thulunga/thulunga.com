"use client";

import { useLocalize } from "@/lib/LanguageContext";

export default function LangToggle() {
  const { lang, setLang } = useLocalize();

  return (
    <button
      onClick={() => setLang(lang === "en" ? "brx" : "en")}
      aria-label="Switch language"
      title={lang === "en" ? "Switch to Bodo" : "Switch to English"}
      style={{
        height: 36,
        padding: "0 10px",
        borderRadius: 8,
        border: "1px solid var(--border-default)",
        background: "transparent",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: 5,
        color: "var(--text-secondary)",
        fontSize: 12,
        fontWeight: 600,
        fontFamily: "'DM Sans', sans-serif",
        letterSpacing: "0.04em",
        transition: "background 0.2s",
        flexShrink: 0,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "var(--bg-section-alt)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "transparent";
      }}
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.2" />
        <path
          d="M7 1c0 0-3 2-3 6s3 6 3 6M7 1c0 0 3 2 3 6s-3 6-3 6M1 7h12"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>
      {lang === "en" ? "BRX" : "EN"}
    </button>
  );
}
