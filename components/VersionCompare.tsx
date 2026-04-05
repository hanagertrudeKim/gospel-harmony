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
      <div className="px-6 py-4 border-b border-black/10 shrink-0">
        <h1 className="text-base font-bold mb-3">역본 대조</h1>
        <p className="text-xs text-black/40 mb-4">같은 구절을 4가지 번역본으로 나란히 비교합니다.</p>

        <div className="flex flex-wrap items-end gap-3">
          {/* Book */}
          <div className="flex flex-col gap-1">
            <label className="text-xs text-black/40 font-medium">성경</label>
            <select
              className="border border-black/15 rounded-lg px-3 py-2 text-sm bg-[#EFEAE3] focus:outline-none focus:border-black/40"
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
            <label className="text-xs text-black/40 font-medium">장</label>
            <input
              type="number" min={1} max={selectedBook.chapters} value={chapter}
              onChange={(e) => setChapter(Math.max(1, Math.min(Number(e.target.value), selectedBook.chapters)))}
              className="border border-black/15 rounded-lg px-3 py-2 text-sm w-20 bg-[#EFEAE3] focus:outline-none focus:border-black/40"
            />
          </div>

          {/* Verse range */}
          <div className="flex flex-col gap-1">
            <label className="text-xs text-black/40 font-medium">절 (시작)</label>
            <input
              type="number" min={1} value={startV}
              onChange={(e) => setStartV(Math.max(1, Number(e.target.value)))}
              className="border border-black/15 rounded-lg px-3 py-2 text-sm w-20 bg-[#EFEAE3] focus:outline-none focus:border-black/40"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs text-black/40 font-medium">절 (끝)</label>
            <input
              type="number" min={startV} value={endV}
              onChange={(e) => setEndV(Math.max(startV, Number(e.target.value)))}
              className="border border-black/15 rounded-lg px-3 py-2 text-sm w-20 bg-[#EFEAE3] focus:outline-none focus:border-black/40"
            />
          </div>

          <button
            onClick={handleSearch}
            disabled={loading}
            className="version-pill active px-6 py-2 self-end disabled:opacity-50"
          >
            {loading ? "불러오는 중…" : "비교하기"}
          </button>
        </div>
      </div>

      {/* Results */}
      <div className="flex-1 overflow-auto px-6 py-4">
        {!searched && !loading && (
          <div className="text-center text-black/30 text-sm pt-12">
            성경 구절을 선택하고 <strong>비교하기</strong>를 눌러주세요
          </div>
        )}

        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {TRANSLATIONS.map((t) => (
              <div key={t.id} className="rounded-xl border border-black/10 p-5 bg-[#F5F1EB]">
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
            {/* Verse-by-verse table */}
            <div className="mb-4 text-sm font-semibold text-black/60">
              {selectedBook.nameKo} {chapter}:{startV}
              {startV !== endV ? `–${endV}` : ""}
            </div>

            {/* Row per verse, column per translation */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr>
                    <th className="text-left p-2 w-8 text-black/30 font-medium text-xs">절</th>
                    {results.map((r) => (
                      <th key={r.translation} className="text-left p-3 font-bold text-sm border-l border-black/10 min-w-[200px]">
                        {r.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: endV - startV + 1 }, (_, i) => startV + i).map((vNum) => (
                    <tr key={vNum} className="verse-row border-t border-black/[0.07]">
                      <td className="p-2 font-bold text-black/50 align-top pt-3">{vNum}</td>
                      {results.map((r) => {
                        const v = r.verses.find((x) => x.verse === vNum);
                        return (
                          <td key={r.translation} className="p-3 align-top leading-relaxed border-l border-black/10 text-[0.9rem]">
                            {v ? (
                              v.text
                            ) : r.error ? (
                              <span className="text-black/25 italic text-xs">API 오류</span>
                            ) : (
                              <span className="text-black/25 italic text-xs">— 없음 —</span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
