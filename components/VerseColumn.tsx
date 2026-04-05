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
      <div className="px-6 pt-6 pb-4 border-b border-black/[0.07]">
        <h2 className="gospel-title">{title}</h2>
        {subtitle && (
          <p className="mt-1 text-[0.8rem] text-black/40 font-medium tracking-wide">
            {subtitle}
          </p>
        )}
      </div>

      {/* Verse list */}
      <div className="flex-1 px-6 py-4 overflow-y-auto">
        {loading ? (
          <SkeletonVerses />
        ) : verses === null || verses.length === 0 ? (
          <div className="empty-verse">— 기록 없음 —</div>
        ) : (
          <div className="space-y-0">
            {verses.map((v) => (
              <div key={v.verse} className="verse-row flex gap-3 py-2.5">
                <span className="font-bold text-sm w-6 shrink-0 text-right text-black/70 pt-0.5">
                  {v.verse}
                </span>
                <p className="text-[0.9375rem] leading-relaxed text-black/85 flex-1">
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
