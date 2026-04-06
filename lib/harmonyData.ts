import type { HarmonySection } from "@/types";

// Gospel Harmony: Jesus' life in chronological order
// Structured with parent sections and child subsections (matching CTM Bible)
export const HARMONY_SECTIONS: HarmonySection[] = [
  // ========== PARENT SECTIONS ==========
  {
    id: 10,
    title: "예수님의 탄생~소년시절",
    children: [101, 102, 103],
    refs: {},
  },
  {
    id: 20,
    title: "예수님의 공생애 준비 기간",
    children: [201, 202, 203],
    refs: {},
  },
  {
    id: 30,
    title: "그리스도의 사역 (제1년)",
    children: [301, 302, 303, 304, 305, 306, 307, 308, 309],
    refs: {},
  },
  {
    id: 40,
    title: "그리스도의 사역 (제2년)",
    children: [401, 402, 403, 404, 405, 406],
    refs: {},
  },
  {
    id: 50,
    title: "그리스도의 사역 (제3년)",
    children: [501, 502, 503, 504, 505],
    refs: {},
  },
  {
    id: 60,
    title: "마지막 주간까지의 사역",
    children: [601, 602, 603],
    refs: {},
  },
  {
    id: 70,
    title: "마지막 주간",
    children: [701, 702, 703, 704],
    refs: {},
  },
  {
    id: 80,
    title: "부활하신 예수님(일요일)",
    children: [801],
    refs: {},
  },

  // ========== 예수님의 탄생~소년시절 (10) ==========
  {
    id: 101,
    parentId: 10,
    title: "예수의 탄생 예고",
    refs: {
      matthew: { book: 40, chapter: 1, startVerse: 18, endVerse: 25 },
      luke: { book: 42, chapter: 1, startVerse: 26, endVerse: 38 },
      john: { book: 43, chapter: 1, startVerse: 1, endVerse: 14 },
    },
  },
  {
    id: 102,
    parentId: 10,
    title: "예수님의 탄생",
    refs: {
      matthew: { book: 40, chapter: 2, startVerse: 1, endVerse: 12 },
      luke: { book: 42, chapter: 2, startVerse: 1, endVerse: 20 },
    },
  },
  {
    id: 103,
    parentId: 10,
    title: "박사들의 방문",
    refs: {
      matthew: { book: 40, chapter: 2, startVerse: 1, endVerse: 12 },
    },
  },

  // ========== 예수님의 공생애 준비 기간 (20) ==========
  {
    id: 201,
    parentId: 20,
    title: "세례 요한의 전파",
    refs: {
      matthew: { book: 40, chapter: 3, startVerse: 1, endVerse: 12 },
      mark: { book: 41, chapter: 1, startVerse: 1, endVerse: 8 },
      luke: { book: 42, chapter: 3, startVerse: 1, endVerse: 18 },
      john: { book: 43, chapter: 1, startVerse: 19, endVerse: 34 },
    },
  },
  {
    id: 202,
    parentId: 20,
    title: "예수의 세례",
    refs: {
      matthew: { book: 40, chapter: 3, startVerse: 13, endVerse: 17 },
      mark: { book: 41, chapter: 1, startVerse: 9, endVerse: 11 },
      luke: { book: 42, chapter: 3, startVerse: 21, endVerse: 22 },
    },
  },
  {
    id: 203,
    parentId: 20,
    title: "광야의 시험",
    refs: {
      matthew: { book: 40, chapter: 4, startVerse: 1, endVerse: 11 },
      mark: { book: 41, chapter: 1, startVerse: 12, endVerse: 13 },
      luke: { book: 42, chapter: 4, startVerse: 1, endVerse: 13 },
    },
  },

  // ========== 그리스도의 사역 (제1년) (30) ==========
  {
    id: 301,
    parentId: 30,
    title: "첫 유월절에 예루살렘에 가심",
    refs: {
      john: { book: 43, chapter: 2, startVerse: 13, endVerse: 25 },
    },
  },
  {
    id: 302,
    parentId: 30,
    title: "니고데모와의 대화",
    refs: {
      john: { book: 43, chapter: 3, startVerse: 1, endVerse: 21 },
    },
  },
  {
    id: 303,
    parentId: 30,
    title: "초기의 유대 전도",
    refs: {
      john: { book: 43, chapter: 3, startVerse: 22, endVerse: 36 },
    },
  },
  {
    id: 304,
    parentId: 30,
    title: "세례 요한의 증거",
    refs: {
      john: { book: 43, chapter: 3, startVerse: 22, endVerse: 36 },
    },
  },
  {
    id: 305,
    parentId: 30,
    title: "요한의 감금",
    refs: {
      matthew: { book: 40, chapter: 14, startVerse: 3, endVerse: 12 },
      mark: { book: 41, chapter: 6, startVerse: 14, endVerse: 29 },
      luke: { book: 42, chapter: 3, startVerse: 19, endVerse: 20 },
    },
  },
  {
    id: 306,
    parentId: 30,
    title: "예수께서 갈릴리로 가심",
    refs: {
      matthew: { book: 40, chapter: 4, startVerse: 12, endVerse: 17 },
      mark: { book: 41, chapter: 1, startVerse: 14, endVerse: 15 },
      luke: { book: 42, chapter: 4, startVerse: 14, endVerse: 15 },
      john: { book: 43, chapter: 4, startVerse: 1, endVerse: 45 },
    },
  },
  {
    id: 307,
    parentId: 30,
    title: "사마리아에서의 전도",
    refs: {
      john: { book: 43, chapter: 4, startVerse: 1, endVerse: 45 },
    },
  },
  {
    id: 308,
    parentId: 30,
    title: "갈릴리 전도의 시작",
    refs: {
      matthew: { book: 40, chapter: 4, startVerse: 12, endVerse: 22 },
      mark: { book: 41, chapter: 1, startVerse: 14, endVerse: 20 },
      luke: { book: 42, chapter: 4, startVerse: 14, endVerse: 30 },
    },
  },
  {
    id: 309,
    parentId: 30,
    title: "다시 가나로 가심",
    refs: {
      john: { book: 43, chapter: 4, startVerse: 43, endVerse: 54 },
    },
  },

  // ========== 그리스도의 사역 (제2년) (40) ==========
  {
    id: 401,
    parentId: 40,
    title: "나병 환자를 고치심",
    refs: {
      matthew: { book: 40, chapter: 8, startVerse: 1, endVerse: 4 },
      mark: { book: 41, chapter: 1, startVerse: 40, endVerse: 45 },
      luke: { book: 42, chapter: 5, startVerse: 12, endVerse: 16 },
    },
  },
  {
    id: 402,
    parentId: 40,
    title: "백부장의 하인",
    refs: {
      matthew: { book: 40, chapter: 8, startVerse: 5, endVerse: 13 },
      luke: { book: 42, chapter: 7, startVerse: 1, endVerse: 10 },
    },
  },
  {
    id: 403,
    parentId: 40,
    title: "산상수훈",
    refs: {
      matthew: { book: 40, chapter: 5, startVerse: 1, endVerse: 7 },
      luke: { book: 42, chapter: 6, startVerse: 20, endVerse: 49 },
    },
  },
  {
    id: 404,
    parentId: 40,
    title: "풍랑을 잔잔케 하심",
    refs: {
      matthew: { book: 40, chapter: 8, startVerse: 23, endVerse: 27 },
      mark: { book: 41, chapter: 4, startVerse: 35, endVerse: 41 },
      luke: { book: 42, chapter: 8, startVerse: 22, endVerse: 25 },
    },
  },
  {
    id: 405,
    parentId: 40,
    title: "오병이어의 기적",
    refs: {
      matthew: { book: 40, chapter: 14, startVerse: 13, endVerse: 21 },
      mark: { book: 41, chapter: 6, startVerse: 30, endVerse: 44 },
      luke: { book: 42, chapter: 9, startVerse: 10, endVerse: 17 },
      john: { book: 43, chapter: 6, startVerse: 1, endVerse: 15 },
    },
  },
  {
    id: 406,
    parentId: 40,
    title: "물 위를 걸으심",
    refs: {
      matthew: { book: 40, chapter: 14, startVerse: 22, endVerse: 33 },
      mark: { book: 41, chapter: 6, startVerse: 45, endVerse: 52 },
      john: { book: 43, chapter: 6, startVerse: 16, endVerse: 21 },
    },
  },

  // ========== 그리스도의 사역 (제3년) (50) ==========
  {
    id: 501,
    parentId: 50,
    title: "변화산",
    refs: {
      matthew: { book: 40, chapter: 17, startVerse: 1, endVerse: 9 },
      mark: { book: 41, chapter: 9, startVerse: 2, endVerse: 10 },
      luke: { book: 42, chapter: 9, startVerse: 28, endVerse: 36 },
    },
  },
  {
    id: 502,
    parentId: 50,
    title: "악귀 들린 아이",
    refs: {
      matthew: { book: 40, chapter: 17, startVerse: 14, endVerse: 21 },
      mark: { book: 41, chapter: 9, startVerse: 14, endVerse: 29 },
      luke: { book: 42, chapter: 9, startVerse: 37, endVerse: 43 },
    },
  },
  {
    id: 503,
    parentId: 50,
    title: "제자들을 위한 기도",
    refs: {
      john: { book: 43, chapter: 17, startVerse: 1, endVerse: 26 },
    },
  },
  {
    id: 504,
    parentId: 50,
    title: "배운지 다만 칠십인을 보내심",
    refs: {
      luke: { book: 42, chapter: 10, startVerse: 1, endVerse: 24 },
    },
  },
  {
    id: 505,
    parentId: 50,
    title: "죽은 나사로를 살리심",
    refs: {
      john: { book: 43, chapter: 11, startVerse: 1, endVerse: 54 },
    },
  },

  // ========== 마지막 주간까지의 사역 (60) ==========
  {
    id: 601,
    parentId: 60,
    title: "여리고 맹인",
    refs: {
      matthew: { book: 40, chapter: 20, startVerse: 29, endVerse: 34 },
      mark: { book: 41, chapter: 10, startVerse: 46, endVerse: 52 },
      luke: { book: 42, chapter: 18, startVerse: 35, endVerse: 43 },
    },
  },
  {
    id: 602,
    parentId: 60,
    title: "잭개오",
    refs: {
      luke: { book: 42, chapter: 19, startVerse: 1, endVerse: 27 },
    },
  },
  {
    id: 603,
    parentId: 60,
    title: "베다니에서의 향유 부음",
    refs: {
      matthew: { book: 40, chapter: 26, startVerse: 1, endVerse: 13 },
      mark: { book: 41, chapter: 14, startVerse: 1, endVerse: 11 },
      luke: { book: 42, chapter: 7, startVerse: 36, endVerse: 50 },
      john: { book: 43, chapter: 12, startVerse: 1, endVerse: 11 },
    },
  },

  // ========== 마지막 주간 (70) ==========
  {
    id: 701,
    parentId: 70,
    title: "예루살렘 입성",
    refs: {
      matthew: { book: 40, chapter: 21, startVerse: 1, endVerse: 11 },
      mark: { book: 41, chapter: 11, startVerse: 1, endVerse: 11 },
      luke: { book: 42, chapter: 19, startVerse: 28, endVerse: 44 },
      john: { book: 43, chapter: 12, startVerse: 12, endVerse: 19 },
    },
  },
  {
    id: 702,
    parentId: 70,
    title: "성전 정결",
    refs: {
      matthew: { book: 40, chapter: 21, startVerse: 12, endVerse: 17 },
      mark: { book: 41, chapter: 11, startVerse: 15, endVerse: 18 },
      luke: { book: 42, chapter: 19, startVerse: 45, endVerse: 48 },
      john: { book: 43, chapter: 2, startVerse: 13, endVerse: 22 },
    },
  },
  {
    id: 703,
    parentId: 70,
    title: "최후의 만찬",
    refs: {
      matthew: { book: 40, chapter: 26, startVerse: 17, endVerse: 30 },
      mark: { book: 41, chapter: 14, startVerse: 12, endVerse: 26 },
      luke: { book: 42, chapter: 22, startVerse: 7, endVerse: 38 },
      john: { book: 43, chapter: 13, startVerse: 1, endVerse: 38 },
    },
  },
  {
    id: 704,
    parentId: 70,
    title: "십자가 죽음",
    refs: {
      matthew: { book: 40, chapter: 27, startVerse: 26, endVerse: 61 },
      mark: { book: 41, chapter: 15, startVerse: 15, endVerse: 47 },
      luke: { book: 42, chapter: 23, startVerse: 24, endVerse: 56 },
      john: { book: 43, chapter: 19, startVerse: 1, endVerse: 42 },
    },
  },

  // ========== 부활하신 예수님(일요일) (80) ==========
  {
    id: 801,
    parentId: 80,
    title: "부활과 초기 사건",
    refs: {
      matthew: { book: 40, chapter: 28, startVerse: 1, endVerse: 20 },
      mark: { book: 41, chapter: 16, startVerse: 1, endVerse: 20 },
      luke: { book: 42, chapter: 24, startVerse: 1, endVerse: 53 },
      john: { book: 43, chapter: 20, startVerse: 1, endVerse: 31 },
    },
  },
];

// Helper function: Get all parent sections
export function getParentSections(): HarmonySection[] {
  return HARMONY_SECTIONS.filter((s) => s.children && s.children.length > 0);
}

// Helper function: Get child sections by parent ID
export function getChildSections(parentId: number): HarmonySection[] {
  const parent = HARMONY_SECTIONS.find((s) => s.id === parentId);
  if (!parent || !parent.children) return [];
  return parent.children
    .map((id) => HARMONY_SECTIONS.find((s) => s.id === id))
    .filter(Boolean) as HarmonySection[];
}

// Helper function: Get a section and its parent info
export function getSectionInfo(id: number): {
  section: HarmonySection;
  parent?: HarmonySection;
} | null {
  const section = HARMONY_SECTIONS.find((s) => s.id === id);
  if (!section) return null;

  const parent = section.parentId
    ? HARMONY_SECTIONS.find((s) => s.id === section.parentId)
    : undefined;

  return { section, parent };
}

// Helper function: Get all child sections in order (for PREV/NEXT navigation)
export function getAllChildSections(): HarmonySection[] {
  return HARMONY_SECTIONS.filter((s) => s.parentId !== undefined);
}

// Helper function: Get next child section ID
export function getNextSectionId(currentId: number): number | null {
  const children = getAllChildSections();
  const currentIndex = children.findIndex((s) => s.id === currentId);
  if (currentIndex === -1 || currentIndex === children.length - 1) return null;
  return children[currentIndex + 1]!.id;
}

// Helper function: Get previous child section ID
export function getPrevSectionId(currentId: number): number | null {
  const children = getAllChildSections();
  const currentIndex = children.findIndex((s) => s.id === currentId);
  if (currentIndex <= 0) return null;
  return children[currentIndex - 1]!.id;
}
