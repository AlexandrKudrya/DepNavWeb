# Shared Constants

Общие константы для frontend и backend.

## Планируемые константы

```typescript
// markerTypes.ts
export const MARKER_TYPES = {
  ENTRANCE: 'ENTRANCE',
  ROOM: 'ROOM',
  STAIRS_UP: 'STAIRS_UP',
  STAIRS_DOWN: 'STAIRS_DOWN',
  STAIRS_BOTH: 'STAIRS_BOTH',
  ELEVATOR: 'ELEVATOR',
  WC_MAN: 'WC_MAN',
  WC_WOMAN: 'WC_WOMAN',
  WC: 'WC',
  OTHER: 'OTHER',
} as const;

// languages.ts
export const LANGUAGES = {
  RU: 'RU',
  EN: 'EN',
} as const;

export const DEFAULT_LANGUAGE = LANGUAGES.RU;

// api.ts
export const API_VERSION = 'v1';
export const API_BASE_PATH = `/api/${API_VERSION}`;

// maps.ts
export const TILE_SIZE = 256;
export const MIN_ZOOM = 0;
export const MAX_ZOOM = 4;
```

## Иконки маркеров

```typescript
// markerIcons.ts
export const MARKER_ICONS: Record<MarkerType, string> = {
  ENTRANCE: '/assets/icons/marker-entrance.svg',
  ROOM: '/assets/icons/marker-room.svg',
  STAIRS_UP: '/assets/icons/marker-stairs-up.svg',
  // ...
};
```
