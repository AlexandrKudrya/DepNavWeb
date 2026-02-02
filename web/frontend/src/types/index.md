# Types

TypeScript типы для frontend.

## Планируемые типы

Большинство типов импортируются из `shared/types/`, здесь только frontend-специфичные:

| Файл | Назначение |
|------|------------|
| `components.ts` | Props типы для компонентов |
| `state.ts` | Типы состояния (stores) |
| `events.ts` | Типы событий карты |

## Пример

```typescript
// components.ts
export interface MapProps {
  buildingId: string;
  initialFloor?: number;
  onMarkerClick?: (marker: Marker) => void;
}

// state.ts
export interface MapState {
  currentMap: MapInfo | null;
  currentFloor: number;
  selectedMarker: Marker | null;
  isLoading: boolean;
}
```
