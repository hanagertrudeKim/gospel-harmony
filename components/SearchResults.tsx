"use client";

import { searchSections } from "@/lib/searchIndex";
import { HARMONY_SECTIONS } from "@/lib/harmonyData";

interface Props {
  searchTerm: string;
  onResultClick: (sectionId: number) => void;
}

interface SectionData {
  title: string;
  parentId?: number;
}

export default function SearchResults({ searchTerm, onResultClick }: Props) {
  // Don't render if no search term
  if (!searchTerm.trim()) {
    return null;
  }

  // Build section data map from HARMONY_SECTIONS
  const sectionDataMap = new Map<number, SectionData>();
  HARMONY_SECTIONS.forEach((section) => {
    sectionDataMap.set(section.id, {
      title: section.title,
      parentId: section.parentId,
    });
  });

  // Perform search
  const results = searchSections(searchTerm, sectionDataMap);

  return (
    <div
      className="border-b max-h-64 overflow-y-auto"
      style={{
        backgroundColor: "var(--bg-primary)",
        borderColor: "var(--border-color)",
      }}
    >
      {results.length === 0 ? (
        <div
          className="px-4 py-6 text-center text-sm"
          style={{ color: "var(--text-secondary)" }}
        >
          <p>"{searchTerm}"에 대한 검색 결과가 없습니다.</p>
        </div>
      ) : (
        <>
          <div className="divide-y" style={{ borderColor: "var(--border-color)" }}>
            {results.map((result) => {
              const parentSection = HARMONY_SECTIONS.find(
                (s) => s.id === result.parentId
              );

              return (
                <button
                  key={result.sectionId}
                  onClick={() => onResultClick(result.sectionId)}
                  className="w-full text-left px-4 py-3 hover:opacity-80 transition-opacity"
                  style={{
                    backgroundColor: "rgba(124, 58, 237, 0.05)",
                  }}
                >
                  {parentSection && (
                    <div
                      className="text-xs mb-1"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {parentSection.title}
                    </div>
                  )}

                  <div
                    className="text-sm font-medium mb-1"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {result.sectionTitle}
                  </div>

                  <div
                    className="text-xs flex flex-wrap gap-1"
                    style={{ color: "var(--accent-color)" }}
                  >
                    {result.matches.map((match, idx) => (
                      <span
                        key={idx}
                        className="inline-block px-2 py-0.5 rounded"
                        style={{
                          backgroundColor: "rgba(124, 58, 237, 0.1)",
                          color: "var(--accent-color)",
                        }}
                      >
                        {match.text}
                      </span>
                    ))}
                  </div>
                </button>
              );
            })}
          </div>
          <div
            className="px-4 py-2 text-xs text-center border-t"
            style={{ color: "var(--text-secondary)", borderColor: "var(--border-color)" }}
          >
            {results.length}개의 결과 찾음
          </div>
        </>
      )}
    </div>
  );
}
