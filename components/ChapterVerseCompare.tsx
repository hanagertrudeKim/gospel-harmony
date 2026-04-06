"use client";
import { useEffect, useState } from "react";
import type { Translation, Verse } from "@/types";
import { NT_BOOKS, OT_BOOKS } from "@/types";
import { fetchChapterVerses } from "@/lib/bibleApi";
import VerseColumn from "./VerseColumn";

interface Props {
  translation: Translation;
}

const ALL_BOOKS = [...OT_BOOKS, ...NT_BOOKS];

export default function ChapterVerseCompare({ translation }: Props) {
  const [bookId, setBookId]     = useState(43);    // John by default
  const [chapter, setChapter]   = useState(3);
  const [verses, setVerses]     = useState<Verse[] | null>(null);
  const [loading, setLoading]   = useState(false);

  const selectedBook = ALL_BOOKS.find((b) => b.id === bookId)!;
  const maxChapters  = selectedBook.chapters;

  // Fetch whenever book / chapter / translation changes
  useEffect(() => {
    setLoading(true);
    setVerses(null);
    fetchChapterVerses(translation, bookId, chapter).then((v) => {
      setVerses(v);
      setLoading(false);
    });
  }, [bookId, chapter, translation]);

  const safeChapter = (n: number) => Math.max(1, Math.min(n, maxChapters));

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Controls */}
      <div className="px-3 sm:px-5 py-2 sm:py-3 border-b shrink-0" style={{ borderColor: 'var(--border-color)' }}>
        <h1 className="text-sm sm:text-base font-bold mb-1.5 sm:mb-2" style={{ color: 'var(--text-primary)' }}>장절 대조</h1>
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {/* Book selector */}
          <div className="flex flex-col gap-0.5">
            <label className="text-[0.7rem] sm:text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>성경</label>
            <select
              className="border rounded px-2 py-1 text-xs sm:text-sm focus:outline-none"
              style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}
              value={bookId}
              onChange={(e) => {
                const b = ALL_BOOKS.find((bk) => bk.id === Number(e.target.value))!;
                setBookId(b.id);
                setChapter(1);
              }}
            >
              <optgroup label="구약">
                {OT_BOOKS.map((b) => (
                  <option key={b.id} value={b.id}>{b.nameKo}</option>
                ))}
              </optgroup>
              <optgroup label="신약">
                {NT_BOOKS.map((b) => (
                  <option key={b.id} value={b.id}>{b.nameKo}</option>
                ))}
              </optgroup>
            </select>
          </div>

          {/* Chapter selector */}
          <div className="flex flex-col gap-0.5">
            <label className="text-[0.7rem] sm:text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>장</label>
            <div className="flex items-center gap-1">
              <button
                className="nav-pill px-2 py-0.5"
                onClick={() => setChapter((c) => safeChapter(c - 1))}
                disabled={chapter <= 1}
              >
                ‹
              </button>
              <span className="text-xs sm:text-sm font-semibold min-w-[2.5rem] text-center" style={{ color: 'var(--text-primary)' }}>
                {chapter}/{maxChapters}
              </span>
              <button
                className="nav-pill px-2 py-0.5"
                onClick={() => setChapter((c) => safeChapter(c + 1))}
                disabled={chapter >= maxChapters}
              >
                ›
              </button>
            </div>
          </div>

          {/* Quick chapter input */}
          <div className="flex flex-col gap-0.5">
            <label className="text-[0.7rem] sm:text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>입력</label>
            <input
              type="number"
              min={1}
              max={maxChapters}
              value={chapter}
              onChange={(e) => setChapter(safeChapter(Number(e.target.value)))}
              className="border rounded px-2 py-1 text-xs w-16 focus:outline-none"
              style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}
            />
          </div>
        </div>
      </div>

      {/* Verse content — single column, full width */}
      <div className="flex-1 overflow-auto">
        <VerseColumn
          title={`${selectedBook.nameKo} ${chapter}장`}
          subtitle={`${selectedBook.name} Chapter ${chapter}`}
          verses={loading ? null : verses}
          loading={loading}
        />
      </div>
    </div>
  );
}
