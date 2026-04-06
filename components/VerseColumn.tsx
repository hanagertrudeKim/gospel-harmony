"use client";
import type { Verse } from "@/types";

interface Props {
  title: string;        // e.g. "MATTHEW"
  subtitle?: string;    // e.g. "마태복음 1:18-25"
  verses: Verse[] | null;  // null = loading, [] = no parallel passage
  loading?: boolean;
}

export default function VerseColumn({ title, subtitle, verses, loading }: Props) {
  return (
    <div className="flex flex-col h-full">
      {/* Gospel header */}
      <div className="px-2 sm:px-3 pt-1 sm:pt-1.5 pb-1 sm:pb-1.5 border-b" style={{ borderColor: 'var(--border-color-light)' }}>
        <h2 className="gospel-title text-xs sm:text-sm">{title}</h2>
        {subtitle && (
          <p className="mt-0.25 text-[0.6rem] sm:text-[0.65rem] font-medium tracking-wide" style={{ color: 'var(--text-secondary)' }}>
            {subtitle}
          </p>
        )}
      </div>

      {/* Verse list */}
      <div className="flex-1 px-2.5 sm:px-3.5 py-1 sm:py-1.5 overflow-y-auto">
        {loading ? (
          <SkeletonVerses />
        ) : verses === null || verses.length === 0 ? (
          <div className="empty-verse text-xs" style={{ color: 'var(--text-secondary)' }}>— 기록 없음 —</div>
        ) : (
          <div className="space-y-0">
            {verses.map((v) => (
              <div key={v.verse} className="verse-row flex gap-2 sm:gap-2.5 py-0.75 sm:py-1">
                <span className="font-black text-[0.65rem] sm:text-xs w-5 sm:w-6 shrink-0 text-right pt-0.5" style={{ color: 'var(--text-primary)' }}>
                  {v.verse}
                </span>
                <p className="text-[0.8rem] sm:text-[0.875rem] leading-relaxed font-light flex-1" style={{ color: 'var(--text-secondary)' }}>
                  {v.text}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function SkeletonVerses() {
  return (
    <div className="space-y-3 pt-1">
      {[100, 80, 95, 70, 88, 75].map((w, i) => (
        <div key={i} className="flex gap-3 py-1.5">
          <div className="skeleton w-5 h-4 shrink-0 mt-0.5" />
          <div className="flex-1 space-y-1.5">
            <div className={`skeleton h-4`} style={{ width: `${w}%` }} />
            {w > 85 && <div className="skeleton h-4" style={{ width: `${w - 20}%` }} />}
          </div>
        </div>
      ))}
    </div>
  );
}
