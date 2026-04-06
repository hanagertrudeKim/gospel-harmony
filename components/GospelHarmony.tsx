"use client";
import { useEffect, useState } from "react";
import type { Translation, Verse, Gospel } from "@/types";
import { GOSPEL_LABELS } from "@/types";
import { HARMONY_SECTIONS, getSectionInfo, getChildSections } from "@/lib/harmonyData";
import { fetchVerses, refLabel } from "@/lib/bibleApi";
import VerseColumn from "./VerseColumn";

interface Props {
  sectionId: number;
  translation: Translation;
}

type GospelVerses = Partial<Record<Gospel, Verse[] | null>>;

const GOSPELS: Gospel[] = ["matthew", "mark", "luke", "john"];

const GOSPEL_BOOK_NAMES: Record<Gospel, string> = {
  matthew: "Matthew",
  mark:    "Mark",
  luke:    "Luke",
  john:    "John",
};

export default function GospelHarmony({ sectionId, translation }: Props) {
  const [verses, setVerses] = useState<GospelVerses>({});
  const [loading, setLoading] = useState(true);

  // If sectionId is a parent section, use the first child
  let section = HARMONY_SECTIONS.find((s) => s.id === sectionId);
  if (!section) {
    section = HARMONY_SECTIONS[0]!;
  }
  if (section.children && section.children.length > 0) {
    // Parent section - use first child
    section = HARMONY_SECTIONS.find((s) => s.id === section.children![0])!;
  }

  useEffect(() => {
    setLoading(true);
    setVerses({});

    const fetchAll = async () => {
      const results: GospelVerses = {};

      await Promise.all(
        GOSPELS.map(async (gospel) => {
          const ref = section.refs[gospel];
          if (!ref) {
            results[gospel] = [];
            return;
          }
          const data = await fetchVerses(
            translation,
            ref.book,
            ref.chapter,
            ref.startVerse,
            ref.endVerse
          );
          results[gospel] = data;
        })
      );

      setVerses(results);
      setLoading(false);
    };

    fetchAll();
  }, [sectionId, translation, section]);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Section title */}
      <div className="px-3 sm:px-5 py-1 sm:py-1.5 shrink-0 border-b" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)' }}>
        <h1 className="text-[0.75rem] sm:text-xs font-bold leading-tight" style={{ color: 'var(--text-primary)' }}>
          {String(section.id).padStart(2, "0")}. {section.title}
        </h1>
        <p className="text-[0.55rem] sm:text-[0.65rem] mt-0" style={{ color: 'var(--text-secondary)' }}>
          {GOSPELS.filter((g) => section.refs[g]).map((g) => GOSPEL_LABELS[g].ko).join(" · ")}
        </p>
      </div>

      {/* 2×2 Gospel grid - fit all 4 on one page */}
      <div className="flex-1 overflow-auto" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="grid grid-cols-1 md:grid-cols-2 w-full divide-y md:divide-y-0 md:divide-x auto-rows-max md:auto-rows-fr md:h-full" style={{ borderColor: 'var(--border-color)' }}>
          {GOSPELS.map((gospel) => {
            const ref = section.refs[gospel];
            const subtitle = ref
              ? refLabel(GOSPEL_BOOK_NAMES[gospel], ref.chapter, ref.startVerse, ref.endVerse)
              : undefined;

            return (
              <div
                key={gospel}
                className="[&:nth-child(odd)]:border-r md:border-r min-h-64 md:min-h-0"
                style={{
                  borderColor: 'var(--border-color)',
                  backgroundColor:
                    gospel === "matthew" ? "var(--gospel-matthew)" :
                    gospel === "mark"    ? "var(--gospel-mark)" :
                    gospel === "luke"    ? "var(--gospel-luke)" :
                                          "var(--gospel-john)",
                }}
              >
                <VerseColumn
                  title={GOSPEL_LABELS[gospel].en}
                  subtitle={subtitle}
                  verses={loading ? null : (verses[gospel] ?? null)}
                  loading={loading}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
