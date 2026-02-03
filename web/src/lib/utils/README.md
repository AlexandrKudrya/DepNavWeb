# utils/

Вспомогательные функции.

## markers.ts

Информация о типах маркеров.

### MARKER_TYPES

Константа с метаданными для каждого типа маркера:

```typescript
const MARKER_TYPES = {
  ROOM: {
    icon: 'room',
    color: '#4CAF50',
    label: { ru: 'Комната', en: 'Room' }
  },
  ENTRANCE: {
    icon: 'entrance',
    color: '#2196F3',
    label: { ru: 'Вход', en: 'Entrance' }
  },
  ELEVATOR: {
    icon: 'elevator',
    color: '#9C27B0',
    label: { ru: 'Лифт', en: 'Elevator' }
  },
  // ... и т.д.
};
```

### Функции

```typescript
// Получить информацию о типе маркера
getMarkerTypeInfo(type: MarkerType): MarkerTypeInfo

// Получить локализованную метку типа
getMarkerTypeLabel(type: MarkerType, lang: Language): string

// Получить путь к иконке
getMarkerIconPath(type: MarkerType): string
```

---

## search.ts

Логика поиска по маркерам.

### searchMarkers

Поиск маркеров по запросу:

```typescript
function searchMarkers(
  markers: Marker[],
  query: string,
  language: Language
): SearchResult[]
```

**Алгоритм:**
1. Нормализация запроса (lowercase, trim)
2. Поиск по `title`, `location`, `description`
3. Сортировка по релевантности:
   - Точное совпадение title → высший приоритет
   - Начинается с запроса → средний приоритет
   - Содержит запрос → низший приоритет

**Пример:**
```typescript
const results = searchMarkers(allMarkers, '334', 'ru');
// [
//   { marker: { title: '3343', ... }, score: 2 },
//   { marker: { title: '3340', ... }, score: 2 },
//   { marker: { description: '...334...', ... }, score: 1 }
// ]
```

### getAllMarkers

Собрать все маркеры со всех этажей в плоский массив:

```typescript
function getAllMarkers(floors: FloorInfo[]): Marker[]
```

---

## Использование

```typescript
import { searchMarkers, getMarkerTypeInfo } from '$lib/utils';

// Поиск
const results = searchMarkers(markers, query, 'ru');

// Информация о типе
const info = getMarkerTypeInfo('ELEVATOR');
// { icon: 'elevator', color: '#9C27B0', label: { ru: 'Лифт', en: 'Elevator' } }
```
