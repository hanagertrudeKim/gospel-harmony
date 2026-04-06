"use client";
import { TRANSLATIONS } from "@/types";
import type { Translation } from "@/types";

type Mode = "harmony" | "chapter" | "version";

interface Props {
  mode: Mode;
  onModeChange: (m: Mode) => void;
  translation: Translation;
  onTranslationChange: (t: Translation) => void;
  isDarkMode: boolean;
  onDarkModeChange: (isDark: boolean) => void;
  fontSize: number;
  onFontSizeChange: (scale: number) => void;
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
  isDarkMode, onDarkModeChange,
  fontSize, onFontSizeChange,
  onPrev, onNext, canPrev, canNext,
  onMenuOpen,
}: Props) {
  return (
    <header className="border-b sticky top-0 z-10" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)' }}>
      <div className="accent-bar" />

      {/* Mode tabs */}
      <div className="flex items-center px-3 sm:px-5 border-b overflow-x-auto" style={{ borderColor: 'var(--border-color-light)' }}>
        <button
          className="lg:hidden mr-2 sm:mr-3 p-1.5 rounded-md shrink-0 min-h-9 min-w-9 flex items-center justify-center"
          style={{ color: 'var(--text-primary)' }}
          onClick={onMenuOpen}
          aria-label="메뉴 열기"
        >
          <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
            <rect width="18" height="2" rx="1" fill="currentColor"/>
            <rect y="6"  width="18" height="2" rx="1" fill="currentColor"/>
            <rect y="12" width="18" height="2" rx="1" fill="currentColor"/>
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
      <div className="flex items-center justify-between px-2 sm:px-4 py-1.5 sm:py-2 gap-1.5 sm:gap-2 overflow-x-auto">
        {/* Version pills + Theme/Font Controls */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0 overflow-x-auto">
          {/* Version pills */}
          <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
            {TRANSLATIONS.map((t) => {
              const isActive = translation === t.id;
              return (
                <button
                  key={t.id}
                  className={`${isActive ? "version-pill active" : "version-pill"} text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-1.5`}
                  onClick={() => onTranslationChange(t.id)}
                >
                  {t.label}
                </button>
              );
            })}
          </div>

          {/* Theme & Font Controls */}
          <div className="flex items-center gap-1 sm:gap-1.5 shrink-0 border-l opacity-40 pl-1.5 ml-1" style={{ borderColor: 'var(--text-primary)', color: 'var(--text-primary)' }}>
            {/* Dark Mode Toggle */}
            <button
              onClick={() => onDarkModeChange(!isDarkMode)}
              className="p-1 rounded hover:opacity-70 transition-opacity"
              title={isDarkMode ? "라이트 모드" : "다크 모드"}
              style={{ color: 'inherit' }}
            >
              {isDarkMode ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
              )}
            </button>

            {/* Font Size Slider */}
            <input
              type="range"
              min="0.8"
              max="1.2"
              step="0.05"
              value={fontSize}
              onChange={(e) => onFontSizeChange(parseFloat(e.target.value))}
              className="w-16 sm:w-20 h-1.5 rounded appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, var(--text-primary) 0%, var(--text-primary) ${(fontSize - 0.8) / 0.4 * 100}%, var(--border-color) ${(fontSize - 0.8) / 0.4 * 100}%, var(--border-color) 100%)`
              }}
              title={`글자 크기: ${Math.round(fontSize * 100)}%`}
            />
            <span className="text-xs sm:text-xs font-medium min-w-[2rem] text-right opacity-60" style={{ color: 'inherit' }}>
              {Math.round(fontSize * 100)}%
            </span>
          </div>
        </div>

        {/* PREV / NEXT (harmony mode only) */}
        {mode === "harmony" && (
          <div className="flex items-center gap-2 shrink-0">
            <button className="nav-pill" onClick={onPrev} disabled={canPrev === false}>PREV</button>
            <button className="nav-pill" onClick={onNext} disabled={canNext === false}>NEXT</button>
          </div>
        )}
      </div>
    </header>
  );
}
