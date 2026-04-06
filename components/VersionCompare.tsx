"use client";
import { useState } from "react";
import type { Verse } from "@/types";
import { TRANSLATIONS } from "@/types";
import type { Translation } from "@/types";
import { NT_BOOKS, OT_BOOKS } from "@/types";
import { fetchVerses } from "@/lib/bibleApi";

const ALL_BOOKS = [...OT_BOOKS, ...NT_BOOKS];

interface VersionResult {
  translation: Translation;
  label: string;
  verses: Verse[];
  error?: boolean;
}

export default function VersionCompare() {
  const [bookId, setBookId]     = useState(43);
  const [chapter, setChapter]   = useState(3);
  const [startV, setStartV]     = useState(16);
  const [endV, setEndV]         = useState(21);
  const [results, setResults]   = useState<VersionResult[]>([]);
  const [loading, setLoading]   = useState(false);
  const [searched, setSearched] = useState(false);

  const selectedBook = ALL_BOOKS.find((b) => b.id === bookId)!;

  const handleSearch = async () => {
    setLoading(true);
    setSearched(true);
    setResults([]);

    const all = await Promise.all(
      TRANSLATIONS.map(async (t): Promise<VersionResult> => {
        try {
          const verses = await fetchVerses(t.id, bookId, chapter, startV, endV);
          return { translation: t.id, label: t.label, verses, error: verses.length === 0 };
        } catch {
          return { translation: t.id, label: t.label, verses: [], error: true };
        }
      })
    );

    setResults(all);
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Controls */}
      <div className="px-3 sm:px-6 py-2.5 sm:py-3 border-b shrink-0" style={{ borderColor: 'var(--border-color)' }}>
        <h1 className="text-sm sm:text-base font-bold mb-1.5 sm:mb-2" style={{ color: 'var(--text-primary)' }}>역본 대조</h1>
        <p className="text-[0.65rem] sm:text-xs mb-2.5 sm:mb-3" style={{ color: 'var(--text-secondary)' }}>같은 구절을 여러 번역본으로 나란히 비교합니다.</p>

        <div className="flex flex-wrap items-end gap-2 sm:gap-3">
          {/* Book */}
          <div className="flex flex-col gap-1 min-w-0">
            <label className="text-[0.7rem] sm:text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>성경</label>
            <select
              className="border rounded-md px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm focus:outline-none transition-colors"
              style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}
              value={bookId}
              onChange={(e) => setBookId(Number(e.target.value))}
            >
              <optgroup label="구약">
                {OT_BOOKS.map((b) => <option key={b.id} value={b.id}>{b.nameKo}</option>)}
              </optgroup>
              <optgroup label="신약">
                {NT_BOOKS.map((b) => <option key={b.id} value={b.id}>{b.nameKo}</option>)}
              </optgroup>
            </select>
          </div>

          {/* Chapter */}
          <div className="flex flex-col gap-1">
            <label className="text-[0.7rem] sm:text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>장</label>
            <input
              type="number" min={1} max={selectedBook.chapters} value={chapter}
              onChange={(e) => setChapter(Math.max(1, Math.min(Number(e.target.value), selectedBook.chapters)))}
              className="border rounded-md px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm w-16 sm:w-20 focus:outline-none transition-colors"
              style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}
            />
          </div>

          {/* Verse range */}
          <div className="flex flex-col gap-1">
            <label className="text-[0.7rem] sm:text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>절 (시작)</label>
            <input
              type="number" min={1} value={startV}
              onChange={(e) => setStartV(Math.max(1, Number(e.target.value)))}
              className="border rounded-md px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm w-16 sm:w-20 focus:outline-none transition-colors"
              style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[0.7rem] sm:text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>절 (끝)</label>
            <input
              type="number" min={startV} value={endV}
              onChange={(e) => setEndV(Math.max(startV, Number(e.target.value)))}
              className="border rounded-md px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm w-16 sm:w-20 focus:outline-none transition-colors"
              style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}
            />
          </div>

          <button
            onClick={handleSearch}
            disabled={loading}
            className="version-pill active self-end disabled:opacity-50 px-5 sm:px-6"
          >
            {loading ? "불러오는 중…" : "비교하기"}
          </button>
        </div>
      </div>

      {/* Results */}
      <div className="flex-1 overflow-auto px-3 sm:px-6 py-3 sm:py-4">
        {!searched && !loading && (
          <div className="text-center text-sm pt-12" style={{ color: 'var(--text-muted)' }}>
            성경 구절을 선택하고 <strong>비교하기</strong>를 눌러주세요
          </div>
        )}

        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {TRANSLATIONS.map((t) => (
              <div key={t.id} className="rounded-xl border p-5" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-secondary)' }}>
                <div className="skeleton h-5 w-24 mb-4" />
                {[90, 75, 85, 70].map((w, i) => (
                  <div key={i} className="skeleton h-3.5 mb-2" style={{ width: `${w}%` }} />
                ))}
              </div>
            ))}
          </div>
        )}

        {!loading && results.length > 0 && (
          <div>
            {/* Title */}
            <div className="mb-4 sm:mb-6 text-xs sm:text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>
              {selectedBook.nameKo} {chapter}:{startV}
              {startV !== endV ? `–${endV}` : ""}
            </div>

            {/* Box layout per translation */}
            <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {results.map((r) => (
                  <div key={r.translation} className="border rounded-md p-3 sm:p-4" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-secondary)' }}>
                    {/* Translation header */}
                    <div className="mb-3 pb-2.5 border-b" style={{ borderColor: 'var(--border-color)' }}>
                      <h3 className="font-medium text-sm" style={{ color: 'var(--text-primary)' }}>{r.label}</h3>
                    </div>

                    {/* Verses */}
                    <div className="space-y-2.5">
                      {Array.from({ length: endV - startV + 1 }, (_, i) => startV + i).map((vNum) => {
                        const v = r.verses.find((x) => x.verse === vNum);
                        return (
                          <div key={vNum} className="text-[0.75rem] sm:text-[0.8rem] leading-relaxed">
                            <span className="font-black mr-2" style={{ color: 'var(--text-primary)' }}>{vNum}</span>
                            <span className="font-light" style={{ color: 'var(--text-secondary)' }}>
                              {v ? (
                                v.text
                              ) : r.error ? (
                                <span className="italic text-xs">API 오류</span>
                              ) : (
                                <span className="italic text-xs">— 없음 —</span>
                              )}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
          </div>
        )}
      </div>
    </div>
  );
}
