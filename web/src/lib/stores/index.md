# Stores

Svelte stores для глобального состояния.

## Stores

| Store | Назначение |
|-------|------------|
| `map.ts` | Состояние карты (текущий этаж, выбранный маркер) |
| `search.ts` | Состояние поиска (запрос, результаты) |
| `data.ts` | Загруженные данные (карты, маркеры) |

## Пример: map.ts

```typescript
import { writable, derived } from 'svelte/store';
import type { Marker, MapInfo } from '$lib/types';

// Текущая карта
export const currentMap = writable<MapInfo | null>(null);

// Текущий этаж
export const currentFloor = writable<number>(1);

// Выбранный маркер (для попапа)
export const selectedMarker = writable<Marker | null>(null);

// Все маркеры
export const allMarkers = writable<Marker[]>([]);

// Маркеры текущего этажа (derived)
export const floorMarkers = derived(
  [allMarkers, currentFloor],
  ([$markers, $floor]) => $markers.filter(m => m.floor === $floor)
);
```

## Пример: search.ts

```typescript
import { writable, derived } from 'svelte/store';
import { allMarkers } from './map';

export const searchQuery = writable<string>('');

export const searchResults = derived(
  [searchQuery, allMarkers],
  ([$query, $markers]) => {
    if (!$query.trim()) return [];
    const q = $query.toLowerCase();
    return $markers
      .filter(m => m.title?.toLowerCase().includes(q))
      .slice(0, 10);
  }
);
```

## Использование в компонентах

```svelte
<script>
  import { currentFloor, floorMarkers } from '$lib/stores/map';

  // Читаем значение через $
  $: floor = $currentFloor;

  // Изменяем
  function nextFloor() {
    currentFloor.update(f => f + 1);
  }
</script>

<p>Этаж: {$currentFloor}</p>
<p>Маркеров: {$floorMarkers.length}</p>
```
