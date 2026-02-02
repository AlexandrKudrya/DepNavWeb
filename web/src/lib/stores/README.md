# stores/

Svelte stores для управления состоянием приложения.

## map.ts

### Основные stores

| Store | Тип | Описание |
|-------|-----|----------|
| `mapData` | `Writable<MapInfo \| null>` | Данные карты (JSON) |
| `currentFloor` | `Writable<number>` | Текущий этаж (1-based) |
| `selectedMarker` | `Writable<Marker \| null>` | Выбранный маркер |
| `language` | `Writable<Language>` | Язык интерфейса (`'ru'` / `'en'`) |
| `searchQuery` | `Writable<string>` | Текст поискового запроса |
| `searchExpanded` | `Writable<boolean>` | Развёрнут ли поиск |
| `showUI` | `Writable<boolean>` | Показывать ли UI поверх карты |

### Derived stores (вычисляемые)

| Store | Тип | Описание |
|-------|-----|----------|
| `floorsCount` | `Readable<number>` | Количество этажей |
| `maxFloor` | `Readable<number>` | Максимальный номер этажа |
| `mapTitle` | `Readable<string>` | Название карты на текущем языке |
| `currentFloorMarkers` | `Readable<Marker[]>` | Маркеры текущего этажа |

## Использование

```svelte
<script>
  import { currentFloor, maxFloor, selectedMarker } from '$lib/stores';

  // Чтение значения (реактивное)
  $: floor = $currentFloor;

  // Запись значения
  function goUp() {
    if ($currentFloor < $maxFloor) {
      currentFloor.update(f => f + 1);
    }
  }

  // Сброс
  function clearSelection() {
    selectedMarker.set(null);
  }
</script>

<p>Этаж: {$currentFloor} / {$maxFloor}</p>
```

## Диаграмма зависимостей

```
mapData ─────────────────────────────┐
    │                                │
    ├──► floorsCount                 │
    │        │                       │
    │        └──► maxFloor           │
    │                                │
    ├──► mapTitle ◄── language       │
    │                                │
    └──► currentFloorMarkers ◄───────┤
              │                      │
              └──── currentFloor ◄───┘

selectedMarker (независимый)
searchQuery (независимый)
searchExpanded (независимый)
showUI (независимый)
```

## Инициализация

Stores инициализируются в `App.svelte` после загрузки JSON:

```typescript
const response = await fetch('/data/spbu-mm.json');
const data = await response.json();
mapData.set(data);
```
