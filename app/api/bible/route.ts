import { NextRequest, NextResponse } from "next/server";

const BASE = "https://getbible.net/v2";
const ESV_API = "https://api.esv.org/v3/passage/text/";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const translation = searchParams.get("translation");
  const book        = searchParams.get("book");
  const chapter     = searchParams.get("chapter");
  const verse       = searchParams.get("verse"); // optional, for ESV

  if (!translation || !book || !chapter) {
    return NextResponse.json({ error: "Missing params" }, { status: 400 });
  }

  // Validate inputs to prevent SSRF
  if (!/^[a-z0-9]+$/.test(translation) || !/^\d+$/.test(book) || !/^\d+$/.test(chapter)) {
    return NextResponse.json({ error: "Invalid params" }, { status: 400 });
  }

  // NLT API 분기
  if (translation === "nlt") {
    const NLT_API_KEY = "ee2aa427-dac8-4a09-9ccf-77d4bc54652e";
    // book 번호를 number로 변환 후 매핑
    const bookMap = {
      40: "Matthew", 41: "Mark", 42: "Luke", 43: "John", 44: "Acts", 45: "Romans", 46: "1 Corinthians", 47: "2 Corinthians", 48: "Galatians", 49: "Ephesians", 50: "Philippians", 51: "Colossians", 52: "1 Thessalonians", 53: "2 Thessalonians", 54: "1 Timothy", 55: "2 Timothy", 56: "Titus", 57: "Philemon", 58: "Hebrews", 59: "James", 60: "1 Peter", 61: "2 Peter", 62: "1 John", 63: "2 John", 64: "3 John", 65: "Jude", 66: "Revelation",
      1: "Genesis", 2: "Exodus", 3: "Leviticus", 4: "Numbers", 5: "Deuteronomy", 19: "Psalms", 20: "Proverbs", 23: "Isaiah", 24: "Jeremiah", 26: "Ezekiel", 27: "Daniel"
    };
    const bookNum = Number(book);
    const bookName = bookMap[bookNum as keyof typeof bookMap];
    if (!bookName) {
      return NextResponse.json({ error: "Invalid book for NLT" }, { status: 400 });
    }
    // 절 범위 지원: verse=16 or verse=16-18
    const verseParam = verse ? `${chapter}:${verse}` : `${chapter}`;
    // NLT API는 key 파라미터로 API Key를 전달해야 함
    const url = `https://api.nlt.to/api/passages?ref=${encodeURIComponent(`${bookName}+${verseParam}`)}&key=${NLT_API_KEY}`;
    try {
      const res = await fetch(url, {
        next: { revalidate: 86400 },
      });
      if (!res.ok) {
        return NextResponse.json({ error: "NLT Upstream error", status: res.status }, { status: 502 });
      }
      const html = await res.text();
      // 본문 텍스트만 추출 (간단한 정규식, 실제로는 더 정교하게 필요할 수 있음)
      const match = html.match(/<div class="passage-text">([\s\S]*?)<\/div>/);
      const passage = match ? match[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim() : html;
      return NextResponse.json({ passage }, {
        headers: { "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=3600" },
      });
    } catch (err) {
      return NextResponse.json({ error: "NLT Fetch failed", detail: String(err) }, { status: 502 });
    }
  }

  try {
    const res = await fetch(`${BASE}/${translation}/${book}/${chapter}.json`, {
      next: { revalidate: 86400 },
    });

    if (!res.ok) {
      return NextResponse.json({ error: "Upstream error", status: res.status }, { status: 502 });
    }

    const data = await res.json();
    return NextResponse.json(data, {
      headers: { "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=3600" },
    });
  } catch (err) {
    return NextResponse.json({ error: "Fetch failed", detail: String(err) }, { status: 502 });
  }
}
