"use client";
import { TRANSLATIONS } from "@/types";
import type { Translation } from "@/types";

type Mode = "harmony" | "chapter" | "version";

interface Props {
  mode: Mode;
  onModeChange: (m: Mode) => void;
  translation: Translation;
  onTranslationChange: (t: Translation) => void;
  // Harmony mode navigation
  onPrev?: () => void;
  onNext?: () => void;
  canPrev?: boolean;
  canNext?: boolean;
  onMenuOpen?: () => void;
}

const MODES: { id: Mode; label: string }[] = [
  { id: "harmony", label: "사복음서 대조" },
  { id: "chapter", label: "장절 대조"    },
  { id: "version", label: "역본 대조"    },
];

export default function TopBar({
  mode, onModeChange,
  translation, onTranslationChange,
  onPrev, onNext, canPrev, canNext,
  onMenuOpen,
}: Props) {
  return (
    <header className="bg-[#EFEAE3] border-b border-black/10 sticky top-0 z-10">
      <div className="accent-bar" />

      {/* Mode tabs */}
      <div className="flex items-center px-4 border-b border-black/[0.07] overflow-x-auto">
        <button
          className="lg:hidden mr-3 p-1.5 rounded-md hover:bg-black/5 shrink-0"
          onClick={onMenuOpen}
          aria-label="메뉴 열기"
        >
          <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
            <rect width="18" height="2" rx="1" fill="#1A1A1A"/>
            <rect y="6"  width="18" height="2" rx="1" fill="#1A1A1A"/>
            <rect y="12" width="18" height="2" rx="1" fill="#1A1A1A"/>
          </svg>
        </button>
        {MODES.map((m) => (
          <button
            key={m.id}
            className={`mode-tab ${mode === m.id ? "active" : ""}`}
            onClick={() => onModeChange(m.id)}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* Controls row */}
      <div className="flex items-center justify-between px-4 py-2.5 gap-3 overflow-x-auto">
        {/* Version pills */}
        <div className="flex items-center gap-2 shrink-0">
          {TRANSLATIONS.map((t) => (
            <button
              key={t.id}
              className={`version-pill ${translation === t.id ? "active" : ""}`}
              onClick={() => onTranslationChange(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* PREV / NEXT (harmony mode only) */}
        {mode === "harmony" && (
          <div className="flex items-center gap-2 shrink-0">
            <button className="nav-pill" onClick={onPrev} disabled={!canPrev}>PREV</button>
            <button className="nav-pill" onClick={onNext} disabled={!canNext}>NEXT</button>
          </div>
        )}
      </div>
    </header>
  );
}
