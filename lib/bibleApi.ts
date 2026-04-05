import type { Translation, Verse } from "@/types";

interface GetBibleVerse {
  book_nr: number;
  chapter: number;
  verse:   number;
  name:    string;
  text:    string;
}

interface GetBibleChapter {
  book_nr:   number;
  book_name: string;
  chapter:   number;
  verses:    Record<string, GetBibleVerse>;
}

// In-memory cache (per client session)
const cache = new Map<string, GetBibleChapter>();

async function fetchChapter(
  translation: Translation,
  bookNum: number,
  chapter: number
): Promise<GetBibleChapter | null> {
  const key = `${translation}:${bookNum}:${chapter}`;
  if (cache.has(key)) return cache.get(key)!;

  try {
    // Route through our own API proxy to avoid CORS
    const params = new URLSearchParams({
      translation,
      book:    String(bookNum),
      chapter: String(chapter),
    });
    const res = await fetch(`/api/bible?${params}`);
    if (!res.ok) return null;
    const data: GetBibleChapter = await res.json();
    cache.set(key, data);
    return data;
  } catch {
    return null;
  }
}

export async function fetchVerses(
  translation: Translation,
  bookNum: number,
  chapter: number,
  startVerse: number,
  endVerse: number
): Promise<Verse[]> {
  const chapterData = await fetchChapter(translation, bookNum, chapter);
  if (!chapterData) return [];

  const result: Verse[] = [];
  for (let v = startVerse; v <= endVerse; v++) {
    const verseData = chapterData.verses[String(v)];
    if (verseData) {
      result.push({ verse: v, text: verseData.text.trim() });
    }
  }
  return result;
}

export async function fetchChapterVerses(
  translation: Translation,
  bookNum: number,
  chapter: number
): Promise<Verse[]> {
  const chapterData = await fetchChapter(translation, bookNum, chapter);
  if (!chapterData) return [];

  return Object.values(chapterData.verses)
    .sort((a, b) => a.verse - b.verse)
    .map((v) => ({ verse: v.verse, text: v.text.trim() }));
}

export function refLabel(bookName: string, chapter: number, start: number, end: number): string {
  if (start === end) return `${bookName} ${chapter}:${start}`;
  return `${bookName} ${chapter}:${start}–${end}`;
}
