import type { Marker, SearchResult, Language } from '../types';

/**
 * Search markers by query
 * Uses simple substring matching with ranking
 */
export function searchMarkers(
  markers: Marker[],
  query: string,
  lang: Language,
  limit = 20
): SearchResult[] {
  if (!query.trim()) return [];

  const normalizedQuery = query.toLowerCase().trim();
  const results: SearchResult[] = [];

  for (const marker of markers) {
    const text = marker[lang];
    const title = text.title?.toLowerCase() ?? '';
    const location = text.location?.toLowerCase() ?? '';
    const description = text.description?.toLowerCase() ?? '';

    let matchScore = 0;

    // Exact title match - highest priority
    if (title === normalizedQuery) {
      matchScore = 100;
    }
    // Title starts with query
    else if (title.startsWith(normalizedQuery)) {
      matchScore = 80;
    }
    // Title contains query
    else if (title.includes(normalizedQuery)) {
      matchScore = 60;
    }
    // Location contains query
    else if (location.includes(normalizedQuery)) {
      matchScore = 40;
    }
    // Description contains query
    else if (description.includes(normalizedQuery)) {
      matchScore = 20;
    }

    if (matchScore > 0) {
      results.push({ marker, matchScore });
    }
  }

  // Sort by score (descending) then by title
  return results
    .sort((a, b) => {
      if (b.matchScore !== a.matchScore) {
        return b.matchScore - a.matchScore;
      }
      const titleA = a.marker[lang].title ?? '';
      const titleB = b.marker[lang].title ?? '';
      return titleA.localeCompare(titleB);
    })
    .slice(0, limit);
}

/**
 * Get all markers from all floors
 */
export function getAllMarkers(floors: { floor: number; markers: Marker[] }[]): Marker[] {
  return floors.flatMap(f => f.markers);
}
