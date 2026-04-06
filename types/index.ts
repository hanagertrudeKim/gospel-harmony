// CTM Bible API codes: hev, hrv, hnv, heb, kjv, niv
export type Translation = "hev" | "hrv" | "hnv" | "heb" | "kjv" | "niv";

export interface TranslationMeta {
  id: Translation;
  label: string;        // UI label
  lang: "ko" | "en";
  ctmCode: string;      // CTM Bible API code
}

export const TRANSLATIONS: TranslationMeta[] = [
  { id: "hev",  label: "한영혼용",  lang: "ko", ctmCode: "hev" },
  { id: "hrv",  label: "개역",      lang: "ko", ctmCode: "hrv" },
  { id: "hnv",  label: "신번역",    lang: "ko", ctmCode: "hnv" },
  { id: "heb",  label: "히브리어",  lang: "en", ctmCode: "heb" },
  { id: "kjv",  label: "KJV",       lang: "en", ctmCode: "kjv" },
  { id: "niv",  label: "NIV",       lang: "en", ctmCode: "niv" },
];

// Bible book numbers (getbible.net convention)
export type Gospel = "matthew" | "mark" | "luke" | "john";
export const GOSPEL_BOOK_NUM: Record<Gospel, number> = {
  matthew: 40,
  mark:    41,
  luke:    42,
  john:    43,
};

export const GOSPEL_LABELS: Record<Gospel, { ko: string; en: string }> = {
  matthew: { ko: "마태복음", en: "MATTHEW" },
  mark:    { ko: "마가복음", en: "MARK"    },
  luke:    { ko: "누가복음", en: "LUKE"    },
  john:    { ko: "요한복음", en: "JOHN"    },
};

export interface VerseRef {
  book: number;     // getbible book number
  chapter: number;
  startVerse: number;
  endVerse: number;
}

export interface HarmonySection {
  id: number;
  title: string;
  refs: Partial<Record<Gospel, VerseRef>>;
  parentId?: number;  // For subsections
  children?: number[]; // For parent sections
}

export interface Verse {
  verse: number;
  text: string;
}

export interface BibleBook {
  id: number;
  name: string;       // English name
  nameKo: string;     // Korean name
  chapters: number;   // total chapters
}

export const NT_BOOKS: BibleBook[] = [
  { id: 40, name: "Matthew",        nameKo: "마태복음",    chapters: 28 },
  { id: 41, name: "Mark",           nameKo: "마가복음",    chapters: 16 },
  { id: 42, name: "Luke",           nameKo: "누가복음",    chapters: 24 },
  { id: 43, name: "John",           nameKo: "요한복음",    chapters: 21 },
  { id: 44, name: "Acts",           nameKo: "사도행전",    chapters: 28 },
  { id: 45, name: "Romans",         nameKo: "로마서",      chapters: 16 },
  { id: 46, name: "1 Corinthians",  nameKo: "고린도전서",  chapters: 16 },
  { id: 47, name: "2 Corinthians",  nameKo: "고린도후서",  chapters: 13 },
  { id: 48, name: "Galatians",      nameKo: "갈라디아서",  chapters: 6  },
  { id: 49, name: "Ephesians",      nameKo: "에베소서",    chapters: 6  },
  { id: 50, name: "Philippians",    nameKo: "빌립보서",    chapters: 4  },
  { id: 51, name: "Colossians",     nameKo: "골로새서",    chapters: 4  },
  { id: 52, name: "1 Thessalonians",nameKo: "데살로니가전서", chapters: 5 },
  { id: 53, name: "2 Thessalonians",nameKo: "데살로니가후서", chapters: 3 },
  { id: 54, name: "1 Timothy",      nameKo: "디모데전서",  chapters: 6  },
  { id: 55, name: "2 Timothy",      nameKo: "디모데후서",  chapters: 4  },
  { id: 56, name: "Titus",          nameKo: "디도서",      chapters: 3  },
  { id: 57, name: "Philemon",       nameKo: "빌레몬서",    chapters: 1  },
  { id: 58, name: "Hebrews",        nameKo: "히브리서",    chapters: 13 },
  { id: 59, name: "James",          nameKo: "야고보서",    chapters: 5  },
  { id: 60, name: "1 Peter",        nameKo: "베드로전서",  chapters: 5  },
  { id: 61, name: "2 Peter",        nameKo: "베드로후서",  chapters: 3  },
  { id: 62, name: "1 John",         nameKo: "요한일서",    chapters: 5  },
  { id: 63, name: "2 John",         nameKo: "요한이서",    chapters: 1  },
  { id: 64, name: "3 John",         nameKo: "요한삼서",    chapters: 1  },
  { id: 65, name: "Jude",           nameKo: "유다서",      chapters: 1  },
  { id: 66, name: "Revelation",     nameKo: "요한계시록",  chapters: 22 },
];

export const OT_BOOKS: BibleBook[] = [
  { id: 1,  name: "Genesis",       nameKo: "창세기",     chapters: 50 },
  { id: 2,  name: "Exodus",        nameKo: "출애굽기",   chapters: 40 },
  { id: 3,  name: "Leviticus",     nameKo: "레위기",     chapters: 27 },
  { id: 4,  name: "Numbers",       nameKo: "민수기",     chapters: 36 },
  { id: 5,  name: "Deuteronomy",   nameKo: "신명기",     chapters: 34 },
  { id: 19, name: "Psalms",        nameKo: "시편",       chapters: 150},
  { id: 20, name: "Proverbs",      nameKo: "잠언",       chapters: 31 },
  { id: 23, name: "Isaiah",        nameKo: "이사야",     chapters: 66 },
  { id: 24, name: "Jeremiah",      nameKo: "예레미야",   chapters: 52 },
  { id: 26, name: "Ezekiel",       nameKo: "에스겔",     chapters: 48 },
  { id: 27, name: "Daniel",        nameKo: "다니엘",     chapters: 12 },
];

export const ALL_BOOKS = [...OT_BOOKS, ...NT_BOOKS];
