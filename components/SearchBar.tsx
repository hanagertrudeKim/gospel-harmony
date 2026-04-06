"use client";

import { useState, useEffect } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (term: string) => void;
  placeholder?: string;
}

export default function SearchBar({
  isOpen,
  onClose,
  onSearch,
  placeholder = "구절 또는 단어 검색...",
}: Props) {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (isOpen) {
      // Focus input when search opens
      const input = document.querySelector('input[data-search-input]') as HTMLInputElement;
      input?.focus();
    }
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    onSearch(term);
  };

  const handleClear = () => {
    setSearchTerm("");
    onSearch("");
  };

  if (!isOpen) return null;

  return (
    <div
      className="border-b sticky top-[60px] sm:top-[80px] z-20 bg-white dark:bg-black"
      style={{
        backgroundColor: "var(--bg-primary)",
        borderColor: "var(--border-color)",
      }}
    >
      <div className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-3">
        {/* Search Icon */}
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          style={{ color: "var(--text-secondary)" }}
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>

        {/* Search Input */}
        <input
          type="text"
          data-search-input
          value={searchTerm}
          onChange={handleChange}
          placeholder={placeholder}
          className="flex-1 outline-none bg-transparent text-sm"
          style={{
            color: "var(--text-primary)",
          }}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              onClose();
            }
          }}
        />

        {/* Clear Button */}
        {searchTerm && (
          <button
            onClick={handleClear}
            className="p-1 hover:opacity-70 transition-opacity"
            title="검색어 지우기"
            style={{ color: "var(--text-secondary)" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
            </svg>
          </button>
        )}

        {/* Close Button */}
        <button
          onClick={onClose}
          className="p-1 hover:opacity-70 transition-opacity"
          title="검색 닫기"
          style={{ color: "var(--text-secondary)" }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
