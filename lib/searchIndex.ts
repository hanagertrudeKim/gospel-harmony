import { HARMONY_SECTIONS } from './harmonyData';
import type { HarmonySection } from '@/types';

/**
 * SearchIndex: Build and search through harmony sections
 * Enables efficient keyword searching across all Gospel passages
 */

interface SearchResult {
  sectionId: number;
  parentId: number;
  sectionTitle: string;
  matches: {
    book: string;
    startVerse: number;
    endVerse: number;
    text: string;
  }[];
}

/**
 * Search through sections by keyword
 * Simple direct search through section titles
 */
export function searchSections(
  searchTerm: string,
  sectionData: Map<number, { title: string; parentId?: number }>
): SearchResult[] {
  if (!searchTerm.trim()) return [];

  const results: SearchResult[] = [];
  const searchLower = searchTerm.toLowerCase();

  // Find all sections that match the search term
  sectionData.forEach((data, sectionId) => {
    const titleLower = data.title.toLowerCase();

    // Check if search term is contained in title (case-insensitive)
    if (titleLower.includes(searchLower)) {
      const section = HARMONY_SECTIONS.find((s) => s.id === sectionId);
      if (section && section.refs && typeof section.refs === 'object') {
        const matches = Object.entries(section.refs).map(([book, ref]: [string, any]) => ({
          book,
          startVerse: ref.startVerse || 0,
          endVerse: ref.endVerse || 0,
          text: `${book} ${ref.chapter}:${ref.startVerse}${
            ref.endVerse && ref.endVerse !== ref.startVerse ? `-${ref.endVerse}` : ''
          }`,
        }));

        if (matches.length > 0) {
          results.push({
            sectionId,
            parentId: data.parentId || Math.floor(sectionId / 10) * 10,
            sectionTitle: section.title,
            matches,
          });
        }
      }
    }
  });

  return results;
}

/**
 * Highlight matching text in a string
 * Returns HTML with matches wrapped in <mark> tags
 */
export function highlightMatches(text: string, searchTerm: string): string {
  if (!searchTerm.trim()) return text;

  const regex = new RegExp(`(${searchTerm})`, 'gi');
  return text.replace(
    regex,
    '<mark style="background-color: rgba(124, 58, 237, 0.2); font-weight: 500;">$1</mark>'
  );
}
