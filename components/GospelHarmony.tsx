"use client";
import { useEffect, useState } from "react";
import type { Translation, Verse, Gospel } from "@/types";
import { GOSPEL_LABELS } from "@/types";
import { HARMONY_SECTIONS } from "@/lib/harmonyData";
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

  const section = HARMONY_SECTIONS.find((s) => s.id === sectionId)!;

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
      <div className="px-6 py-4 border-b border-black/10 shrink-0">
        <h1 className="text-lg font-bold">
          {String(section.id).padStart(2, "0")}. {section.title}
        </h1>
        <p className="text-xs text-black/40 mt-0.5">
          {GOSPELS.filter((g) => section.refs[g]).map((g) => GOSPEL_LABELS[g].ko).join(" · ")}
        </p>
      </div>

      {/* 2×2 Gospel grid */}
      <div className="flex-1 overflow-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 h-full divide-y md:divide-y-0 divide-black/10">
          {GOSPELS.map((gospel) => {
            const ref = section.refs[gospel];
            const subtitle = ref
              ? refLabel(GOSPEL_BOOK_NAMES[gospel], ref.chapter, ref.startVerse, ref.endVerse)
              : undefined;

            return (
              <div
                key={gospel}
                className="border-black/10 [&:nth-child(odd)]:border-r md:border-r"
                style={{
                  backgroundColor:
                    gospel === "matthew" ? "#F0EBE4" :
                    gospel === "mark"    ? "#EDE8E1" :
                    gospel === "luke"    ? "#F2EDE6" :
                                          "#ECE7DF",
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
