import { NextRequest, NextResponse } from "next/server";

const BASE = "https://getbible.net/v2";
const ESV_API = "https://api.esv.org/v3/passage/text/";
const CTM_BIBLE_API = "https://bible.ctm.kr/contrast/comp_Txt.asp";

// CTM Bible 성경 버전별 책 번호 매핑
const CTM_BOOK_NUMBERS: Record<number, number> = {
  40: 40, // Matthew
  41: 41, // Mark
  42: 42, // Luke
  43: 43, // John
};

interface GetBibleChapter {
  book_nr: number;
  book_name: string;
  chapter: number;
  verses: Record<
    string,
    {
      book_nr: number;
      chapter: number;
      verse: number;
      name: string;
      text: string;
    }
  >;
}

// Helper: Parse HTML from CTM Bible API
async function fetchFromCTMBible(
  bookNum: number,
  chapter: number,
  startVerse: number,
  endVerse: number,
  version: string
): Promise<GetBibleChapter | null> {
  try {
    const params = new URLSearchParams({
      Bnum: String(bookNum),
      Bjang: String(chapter),
      Bsjul: String(startVerse),
      Bejul: String(endVerse),
      Bkv: version,
    });

    const url = `${CTM_BIBLE_API}?${params}`;
    console.log(`Fetching: ${url}`);

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0'
      }
    });

    if (!response.ok) {
      console.error(`CTM API error: ${response.statusText}`);
      return null;
    }

    // Response는 euc-kr로 인코딩되어 있음
    const buffer = await response.arrayBuffer();

    // iconv-lite를 사용하여 euc-kr 디코딩
    let text: string;
    try {
      // @ts-ignore
      const iconv = require('iconv-lite');
      text = iconv.decode(Buffer.from(buffer), 'euc-kr');
    } catch (e) {
      // Fallback: 기본 TextDecoder 사용
      console.log("Using TextDecoder fallback");
      text = new TextDecoder("euc-kr").decode(buffer);
    }

    const verses: Record<string, any> = {};

    // 정규식으로 모든 [n:m] 패턴 찾기
    // 패턴: [n:m]</FONT></TD><TD...>text</FONT>
    const versePattern = /\[(\d+):(\d+)\]<\/[^>]*><\/[^>]*><[^>]*>([\s\S]*?)<\/[^>]*>/g;

    let match;
    while ((match = versePattern.exec(text)) !== null) {
      const chapterNum = parseInt(match[1], 10);
      const verseNum = parseInt(match[2], 10);
      let verseText = match[3];

      // 장이 맞지 않으면 건너뛰기
      if (chapterNum !== chapter) continue;

      // HTML 태그 제거 및 정리
      verseText = verseText
        .replace(/<[^>]+>/g, " ") // Remove HTML tags
        .replace(/&nbsp;/g, " ") // Replace nbsp with space
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&apos;/g, "'")
        .replace(/&amp;/g, "&")
        .replace(/\s+/g, " ")    // Collapse multiple spaces
        .trim();

      if (verseText && verseNum >= startVerse && verseNum <= endVerse) {
        verses[String(verseNum)] = {
          book_nr: bookNum,
          chapter: chapter,
          verse: verseNum,
          name: `Verse ${verseNum}`,
          text: verseText,
        };
        console.log(`Found: ${chapter}:${verseNum} = ${verseText.substring(0, 50)}`);
      }
    }

    if (Object.keys(verses).length === 0) {
      console.warn(`No verses found for ${bookNum}:${chapter}. HTML length: ${text.length}`);
      // HTML 샘플 출력 (디버깅용)
      const sampleMatch = text.match(/\[\d+:\d+\][^\[]{0,100}/);
      if (sampleMatch) {
        console.warn(`Sample verse found: ${sampleMatch[0]}`);
      }
      return null;
    }

    return {
      book_nr: bookNum,
      book_name: `Book ${bookNum}`,
      chapter: chapter,
      verses: verses,
    };
  } catch (error) {
    console.error("CTM Bible fetch error:", error);
    return null;
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const translation = searchParams.get("translation");
  const book = searchParams.get("book");
  const chapter = searchParams.get("chapter");
  const verse = searchParams.get("verse"); // optional, for ESV

  if (!translation || !book || !chapter) {
    return NextResponse.json({ error: "Missing params" }, { status: 400 });
  }

  // Validate inputs to prevent SSRF
  if (!/^[a-z0-9]+$/.test(translation) || !/^\d+$/.test(book) || !/^\d+$/.test(chapter)) {
    return NextResponse.json({ error: "Invalid params" }, { status: 400 });
  }

  const bookNum = parseInt(book, 10);
  const chapterNum = parseInt(chapter, 10);

  // Korean translations (CTM Bible)
  if (["hev", "hrv", "hnv", "heb", "kjv", "niv"].includes(translation)) {
    // Only support 4 Gospels for CTM Bible
    if (![40, 41, 42, 43].includes(bookNum)) {
      return NextResponse.json(
        { error: "CTM Bible only supports Gospels (Matthew-John)" },
        { status: 400 }
      );
    }

    const data = await fetchFromCTMBible(bookNum, chapterNum, 1, 999, translation);
    if (!data) {
      return NextResponse.json({ error: "CTM Bible data not found" }, { status: 404 });
    }

    return NextResponse.json(data, {
      headers: { "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=3600" },
    });
  }

  // NLT API 분기 (legacy)
  if (translation === "nlt") {
    const NLT_API_KEY = "ee2aa427-dac8-4a09-9ccf-77d4bc54652e";
    const bookMap = {
      40: "Matthew",
      41: "Mark",
      42: "Luke",
      43: "John",
      44: "Acts",
      45: "Romans",
      46: "1 Corinthians",
      47: "2 Corinthians",
      48: "Galatians",
      49: "Ephesians",
      50: "Philippians",
      51: "Colossians",
      52: "1 Thessalonians",
      53: "2 Thessalonians",
      54: "1 Timothy",
      55: "2 Timothy",
      56: "Titus",
      57: "Philemon",
      58: "Hebrews",
      59: "James",
      60: "1 Peter",
      61: "2 Peter",
      62: "1 John",
      63: "2 John",
      64: "3 John",
      65: "Jude",
      66: "Revelation",
      1: "Genesis",
      2: "Exodus",
      3: "Leviticus",
      4: "Numbers",
      5: "Deuteronomy",
      19: "Psalms",
      20: "Proverbs",
      23: "Isaiah",
      24: "Jeremiah",
      26: "Ezekiel",
      27: "Daniel",
    };
    const bookName = bookMap[bookNum as keyof typeof bookMap];
    if (!bookName) {
      return NextResponse.json({ error: "Invalid book for NLT" }, { status: 400 });
    }
    const verseParam = verse ? `${chapter}:${verse}` : `${chapter}`;
    const url = `https://api.nlt.to/api/passages?ref=${encodeURIComponent(
      `${bookName}+${verseParam}`
    )}&key=${NLT_API_KEY}`;
    try {
      const res = await fetch(url, {
        next: { revalidate: 86400 },
      });
      if (!res.ok) {
        return NextResponse.json(
          { error: "NLT Upstream error", status: res.status },
          { status: 502 }
        );
      }
      const html = await res.text();
      const match = html.match(/<div class="passage-text">([\s\S]*?)<\/div>/);
      const passage = match
        ? match[1]
            .replace(/<[^>]+>/g, "")
            .replace(/\s+/g, " ")
            .trim()
        : html;
      return NextResponse.json({ passage }, {
        headers: { "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=3600" },
      });
    } catch (err) {
      return NextResponse.json(
        { error: "NLT Fetch failed", detail: String(err) },
        { status: 502 }
      );
    }
  }

  // English translations (getbible.net)
  try {
    const res = await fetch(`${BASE}/${translation}/${book}/${chapter}.json`, {
      next: { revalidate: 86400 },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Upstream error", status: res.status },
        { status: 502 }
      );
    }

    const data = await res.json();
    return NextResponse.json(data, {
      headers: { "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=3600" },
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Fetch failed", detail: String(err) },
      { status: 502 }
    );
  }
}
