"use client";
import { useState, useEffect } from "react";
import type { Translation } from "@/types";
import { HARMONY_SECTIONS, getNextSectionId, getPrevSectionId } from "@/lib/harmonyData";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import GospelHarmony from "@/components/GospelHarmony";
import ChapterVerseCompare from "@/components/ChapterVerseCompare";
import VersionCompare from "@/components/VersionCompare";

type Mode = "harmony" | "chapter" | "version";

export default function Home() {
  const [mode, setMode]               = useState<Mode>("harmony");
  const [translation, setTranslation] = useState<Translation>("hev");
  const [sectionId, setSectionId]     = useState(101);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode]   = useState(false);
  const [fontSizeScale, setFontSizeScale] = useState(1);
  const [mounted, setMounted] = useState(false);

  // Load preferences from localStorage on mount
  useEffect(() => {
    const savedDarkMode = localStorage.getItem("gospel-harmony-dark-mode");
    const savedFontSize = localStorage.getItem("gospel-harmony-font-size");

    if (savedDarkMode !== null) {
      setIsDarkMode(JSON.parse(savedDarkMode));
    }
    if (savedFontSize !== null) {
      setFontSizeScale(parseFloat(savedFontSize));
    }
    setMounted(true);
  }, []);

  // Save dark mode preference
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("gospel-harmony-dark-mode", JSON.stringify(isDarkMode));
    }
  }, [isDarkMode, mounted]);

  // Save font size preference
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("gospel-harmony-font-size", fontSizeScale.toString());
    }
  }, [fontSizeScale, mounted]);

  // Apply theme and font scale to document
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", isDarkMode ? "dark" : "light");
    document.documentElement.style.setProperty("--verse-font-scale", fontSizeScale.toString());
  }, [isDarkMode, fontSizeScale]);

  const prevSectionId = getPrevSectionId(sectionId);
  const nextSectionId = getNextSectionId(sectionId);
  const canPrev = prevSectionId !== null;
  const canNext = nextSectionId !== null;

  const handleModeChange = (m: Mode) => {
    setMode(m);
    setSidebarOpen(false);
  };

  return (
    <div
      className="flex h-full overflow-hidden"
    >
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
      <div className="flex flex-col flex-1 min-w-0 h-full overflow-hidden max-w-[1920px] mx-auto w-full">
        <TopBar
          mode={mode}
          onModeChange={handleModeChange}
          translation={translation}
          onTranslationChange={setTranslation}
          isDarkMode={isDarkMode}
          onDarkModeChange={setIsDarkMode}
          fontSize={fontSizeScale}
          onFontSizeChange={setFontSizeScale}
          onPrev={() => {
            const prev = getPrevSectionId(sectionId);
            if (prev !== null) setSectionId(prev);
          }}
          onNext={() => {
            const next = getNextSectionId(sectionId);
            if (next !== null) setSectionId(next);
          }}
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
