import { writable, derived } from 'svelte/store';
import type { MapInfo, Marker, Language } from '../types';

/** Currently loaded map data */
export const mapData = writable<MapInfo | null>(null);

/** Current floor number */
export const currentFloor = writable<number>(1);

/** Currently selected/pinned marker */
export const selectedMarker = writable<Marker | null>(null);

/** Current UI language */
export const language = writable<Language>(
  (typeof navigator !== 'undefined' && navigator.language.startsWith('ru')) ? 'ru' : 'en'
);

/** Whether UI controls should be visible */
export const showUI = writable<boolean>(true);

/** Search query */
export const searchQuery = writable<string>('');

/** Whether search is expanded/active */
export const searchExpanded = writable<boolean>(false);

/** Markers for the current floor */
export const currentFloorMarkers = derived(
  [mapData, currentFloor],
  ([$mapData, $currentFloor]) => {
    if (!$mapData) return [];
    const floor = $mapData.floors.find(f => f.floor === $currentFloor);
    return floor?.markers ?? [];
  }
);

/** Total number of floors */
export const floorsCount = derived(mapData, $mapData => {
  if (!$mapData) return 0;
  return $mapData.floors.length;
});

/** Maximum floor number */
export const maxFloor = derived(mapData, $mapData => {
  if (!$mapData) return 1;
  return Math.max(...$mapData.floors.map(f => f.floor));
});

/** Map title in current language */
export const mapTitle = derived(
  [mapData, language],
  ([$mapData, $language]) => {
    if (!$mapData) return '';
    return $mapData.title[$language];
  }
);
