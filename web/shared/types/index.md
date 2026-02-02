# Shared Types

Общие TypeScript типы для frontend и backend.

## Типы (на основе Android моделей)

```typescript
// maps.ts
export interface MapInfo {
  id: string;
  floorsNum: number;
  floorWidth: number;
  floorHeight: number;
}

export interface MapTitle {
  mapId: string;
  language: Language;
  title: string;
}

// markers.ts
export interface Marker {
  id: number;
  mapId: string;
  type: MarkerType;
  floor: number;
  x: number;
  y: number;
}

export interface MarkerText {
  markerId: number;
  language: Language;
  title: string | null;
  description: string | null;
}

// enums.ts
export type MarkerType =
  | 'ENTRANCE'
  | 'ROOM'
  | 'STAIRS_UP'
  | 'STAIRS_DOWN'
  | 'STAIRS_BOTH'
  | 'ELEVATOR'
  | 'WC_MAN'
  | 'WC_WOMAN'
  | 'WC'
  | 'OTHER';

export type Language = 'RU' | 'EN';
```

## Соответствие Android моделям

| Android (Kotlin) | Web (TypeScript) |
|------------------|------------------|
| `MapInfo` | `MapInfo` |
| `MapTitle` | `MapTitle` |
| `Marker` | `Marker` |
| `MarkerText` | `MarkerText` |
| `MarkerType` enum | `MarkerType` union |
| `Language` enum | `Language` union |
