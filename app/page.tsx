"use client";
import { useState } from "react";
import type { Translation } from "@/types";
import { HARMONY_SECTIONS } from "@/lib/harmonyData";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import GospelHarmony from "@/components/GospelHarmony";
import ChapterVerseCompare from "@/components/ChapterVerseCompare";
import VersionCompare from "@/components/VersionCompare";

type Mode = "harmony" | "chapter" | "version";

export default function Home() {
  const [mode, setMode]               = useState<Mode>("harmony");
  const [translation, setTranslation] = useState<Translation>("korean");
  const [sectionId, setSectionId]     = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const maxId  = HARMONY_SECTIONS.length;
  const canPrev = sectionId > 1;
  const canNext = sectionId < maxId;

  const handleModeChange = (m: Mode) => {
    setMode(m);
    setSidebarOpen(false);
  };

  return (
    <div className="flex h-full overflow-hidden bg-[#EFEAE3]">
      {/* Sidebar — only shown in harmony mode */}
      {mode === "harmony" && (
        <Sidebar
          selectedId={sectionId}
          onSelect={setSectionId}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
      )}

      {/* Main column */}
      <div className="flex flex-col flex-1 min-w-0 h-full overflow-hidden">
        <TopBar
          mode={mode}
          onModeChange={handleModeChange}
          translation={translation}
          onTranslationChange={setTranslation}
          onPrev={() => setSectionId((id) => Math.max(1, id - 1))}
          onNext={() => setSectionId((id) => Math.min(maxId, id + 1))}
          canPrev={canPrev}
          canNext={canNext}
          onMenuOpen={() => setSidebarOpen(true)}
        />

        {/* Content area */}
        <main className="flex-1 overflow-hidden">
          {mode === "harmony" && (
            <GospelHarmony sectionId={sectionId} translation={translation} />
          )}
          {mode === "chapter" && (
            <ChapterVerseCompare translation={translation} />
          )}
          {mode === "version" && (
            <VersionCompare />
          )}
        </main>
      </div>
    </div>
  );
}
