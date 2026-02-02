# Utils

Вспомогательные функции.

## Файлы

| Файл | Назначение |
|------|------------|
| `tiles.ts` | Работа с тайлами карт |
| `markers.ts` | Хелперы для маркеров |
| `search.ts` | Логика поиска |
| `format.ts` | Форматирование текста |
| `types.ts` | TypeScript типы |

## tiles.ts

```typescript
// Генерация URL тайла для Leaflet
export function getTileUrl(mapId: string, floor: number) {
  return (coords: { x: number; y: number; z: number }) =>
    `/tiles/${mapId}/${floor}/${coords.z}/${coords.x}_${coords.y}.png`;
}

// Bounds карты из размеров
export function getMapBounds(width: number, height: number): L.LatLngBounds {
  return L.latLngBounds([0, 0], [height, width]);
}
```

## markers.ts

```typescript
import type { MarkerType } from './types';

// Иконка по типу маркера
export function getMarkerIcon(type: MarkerType): string {
  const icons: Record<MarkerType, string> = {
    ROOM: '/icons/room.svg',
    ENTRANCE: '/icons/entrance.svg',
    ELEVATOR: '/icons/elevator.svg',
    STAIRS_UP: '/icons/stairs-up.svg',
    STAIRS_DOWN: '/icons/stairs-down.svg',
    STAIRS_BOTH: '/icons/stairs.svg',
    WC: '/icons/wc.svg',
    WC_MAN: '/icons/wc-man.svg',
    WC_WOMAN: '/icons/wc-woman.svg',
    OTHER: '/icons/other.svg',
  };
  return icons[type] || icons.OTHER;
}

// Цвет маркера
export function getMarkerColor(type: MarkerType): string {
  const colors: Record<MarkerType, string> = {
    ROOM: '#4CAF50',
    ENTRANCE: '#2196F3',
    ELEVATOR: '#9C27B0',
    STAIRS_UP: '#FF9800',
    STAIRS_DOWN: '#FF9800',
    STAIRS_BOTH: '#FF9800',
    WC: '#00BCD4',
    WC_MAN: '#00BCD4',
    WC_WOMAN: '#E91E63',
    OTHER: '#9E9E9E',
  };
  return colors[type] || colors.OTHER;
}
```

## types.ts

```typescript
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

export interface MapInfo {
  id: string;
  floorsNum: number;
  floorWidth: number;
  floorHeight: number;
  title: Record<Language, string>;
}

export interface Marker {
  id: number;
  mapId: string;
  type: MarkerType;
  floor: number;
  x: number;
  y: number;
  title: string | null;
  description: string | null;
}
```
