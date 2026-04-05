import type { HarmonySection } from "@/types";

// Gospel Harmony: Jesus' life in chronological order
// Each section contains parallel references across the four Gospels
export const HARMONY_SECTIONS: HarmonySection[] = [
  {
    id: 1,
    title: "예수의 탄생",
    refs: {
      matthew: { book: 40, chapter: 1, startVerse: 18, endVerse: 25 },
      luke:    { book: 42, chapter: 1, startVerse: 26, endVerse: 38 },
      john:    { book: 43, chapter: 1, startVerse: 1,  endVerse: 14 },
    },
  },
  {
    id: 2,
    title: "세례 요한의 전파",
    refs: {
      matthew: { book: 40, chapter: 3, startVerse: 1,  endVerse: 12 },
      mark:    { book: 41, chapter: 1, startVerse: 1,  endVerse: 8  },
      luke:    { book: 42, chapter: 3, startVerse: 1,  endVerse: 18 },
      john:    { book: 43, chapter: 1, startVerse: 19, endVerse: 34 },
    },
  },
  {
    id: 3,
    title: "예수의 세례",
    refs: {
      matthew: { book: 40, chapter: 3, startVerse: 13, endVerse: 17 },
      mark:    { book: 41, chapter: 1, startVerse: 9,  endVerse: 11 },
      luke:    { book: 42, chapter: 3, startVerse: 21, endVerse: 22 },
    },
  },
  {
    id: 4,
    title: "광야의 시험",
    refs: {
      matthew: { book: 40, chapter: 4, startVerse: 1,  endVerse: 11 },
      mark:    { book: 41, chapter: 1, startVerse: 12, endVerse: 13 },
      luke:    { book: 42, chapter: 4, startVerse: 1,  endVerse: 13 },
    },
  },
  {
    id: 5,
    title: "갈릴리 사역의 시작",
    refs: {
      matthew: { book: 40, chapter: 4, startVerse: 12, endVerse: 17 },
      mark:    { book: 41, chapter: 1, startVerse: 14, endVerse: 15 },
      luke:    { book: 42, chapter: 4, startVerse: 14, endVerse: 15 },
    },
  },
  {
    id: 6,
    title: "첫 제자들을 부르심",
    refs: {
      matthew: { book: 40, chapter: 4, startVerse: 18, endVerse: 22 },
      mark:    { book: 41, chapter: 1, startVerse: 16, endVerse: 20 },
      luke:    { book: 42, chapter: 5, startVerse: 1,  endVerse: 11 },
      john:    { book: 43, chapter: 1, startVerse: 35, endVerse: 51 },
    },
  },
  {
    id: 7,
    title: "산상수훈",
    refs: {
      matthew: { book: 40, chapter: 5, startVerse: 1,  endVerse: 12 },
      luke:    { book: 42, chapter: 6, startVerse: 20, endVerse: 26 },
    },
  },
  {
    id: 8,
    title: "나병 환자를 고치심",
    refs: {
      matthew: { book: 40, chapter: 8, startVerse: 1,  endVerse: 4  },
      mark:    { book: 41, chapter: 1, startVerse: 40, endVerse: 45 },
      luke:    { book: 42, chapter: 5, startVerse: 12, endVerse: 16 },
    },
  },
  {
    id: 9,
    title: "백부장의 하인",
    refs: {
      matthew: { book: 40, chapter: 8, startVerse: 5,  endVerse: 13 },
      luke:    { book: 42, chapter: 7, startVerse: 1,  endVerse: 10 },
    },
  },
  {
    id: 10,
    title: "풍랑을 잔잔케 하심",
    refs: {
      matthew: { book: 40, chapter: 8, startVerse: 23, endVerse: 27 },
      mark:    { book: 41, chapter: 4, startVerse: 35, endVerse: 41 },
      luke:    { book: 42, chapter: 8, startVerse: 22, endVerse: 25 },
    },
  },
  {
    id: 11,
    title: "오병이어의 기적",
    refs: {
      matthew: { book: 40, chapter: 14, startVerse: 13, endVerse: 21 },
      mark:    { book: 41, chapter: 6,  startVerse: 30, endVerse: 44 },
      luke:    { book: 42, chapter: 9,  startVerse: 10, endVerse: 17 },
      john:    { book: 43, chapter: 6,  startVerse: 1,  endVerse: 15 },
    },
  },
  {
    id: 12,
    title: "물 위를 걸으심",
    refs: {
      matthew: { book: 40, chapter: 14, startVerse: 22, endVerse: 33 },
      mark:    { book: 41, chapter: 6,  startVerse: 45, endVerse: 52 },
      john:    { book: 43, chapter: 6,  startVerse: 16, endVerse: 21 },
    },
  },
  {
    id: 13,
    title: "변화산",
    refs: {
      matthew: { book: 40, chapter: 17, startVerse: 1,  endVerse: 9  },
      mark:    { book: 41, chapter: 9,  startVerse: 2,  endVerse: 10 },
      luke:    { book: 42, chapter: 9,  startVerse: 28, endVerse: 36 },
    },
  },
  {
    id: 14,
    title: "예루살렘 입성",
    refs: {
      matthew: { book: 40, chapter: 21, startVerse: 1,  endVerse: 11 },
      mark:    { book: 41, chapter: 11, startVerse: 1,  endVerse: 11 },
      luke:    { book: 42, chapter: 19, startVerse: 28, endVerse: 44 },
      john:    { book: 43, chapter: 12, startVerse: 12, endVerse: 19 },
    },
  },
  {
    id: 15,
    title: "최후의 만찬",
    refs: {
      matthew: { book: 40, chapter: 26, startVerse: 17, endVerse: 30 },
      mark:    { book: 41, chapter: 14, startVerse: 12, endVerse: 26 },
      luke:    { book: 42, chapter: 22, startVerse: 7,  endVerse: 23 },
      john:    { book: 43, chapter: 13, startVerse: 1,  endVerse: 17 },
    },
  },
  {
    id: 16,
    title: "빈 무덤",
    refs: {
      matthew: { book: 40, chapter: 28, startVerse: 1,  endVerse: 10 },
      mark:    { book: 41, chapter: 16, startVerse: 1,  endVerse: 8  },
      luke:    { book: 42, chapter: 24, startVerse: 1,  endVerse: 12 },
      john:    { book: 43, chapter: 20, startVerse: 1,  endVerse: 10 },
    },
  },
  {
    id: 17,
    title: "부활하신 예수님",
    refs: {
      matthew: { book: 40, chapter: 28, startVerse: 16, endVerse: 20 },
      mark:    { book: 41, chapter: 16, startVerse: 14, endVerse: 20 },
      luke:    { book: 42, chapter: 24, startVerse: 36, endVerse: 53 },
      john:    { book: 43, chapter: 20, startVerse: 19, endVerse: 31 },
    },
  },
];
