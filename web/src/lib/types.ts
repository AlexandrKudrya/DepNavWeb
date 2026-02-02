/** Marker types matching Android app */
export type MarkerType =
  | 'ROOM'
  | 'ENTRANCE'
  | 'STAIRS_UP'
  | 'STAIRS_DOWN'
  | 'STAIRS_BOTH'
  | 'ELEVATOR'
  | 'WC_MAN'
  | 'WC_WOMAN'
  | 'WC'
  | 'OTHER';

/** Localized text for a marker */
export interface MarkerText {
  title: string | null;
  location: string | null;
  description: string | null;
}

/** A marker on the map */
export interface Marker {
  id: string;
  type: MarkerType;
  x: number;
  y: number;
  floor: number;
  ru: MarkerText;
  en: MarkerText;
}

/** Floor data with markers */
export interface Floor {
  floor: number;
  markers: Marker[];
}

/** Map metadata */
export interface MapInfo {
  id: number;
  internalName: string;
  title: {
    ru: string;
    en: string;
  };
  floorWidth: number;
  floorHeight: number;
  tileSize: number;
  zoomLevelsNum: number;
  floors: Floor[];
}

/** Search result item */
export interface SearchResult {
  marker: Marker;
  matchScore: number;
}

/** Supported languages */
export type Language = 'ru' | 'en';
