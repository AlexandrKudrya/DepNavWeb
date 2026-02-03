# lib/

Библиотека компонентов, состояния и утилит.

## Структура

```
lib/
├── components/     # Svelte компоненты UI
├── stores/         # Svelte stores (реактивное состояние)
├── utils/          # Вспомогательные функции
├── types.ts        # TypeScript типы
└── index.ts        # Реэкспорт всего
```

## types.ts

Основные типы данных:

```typescript
// Языки интерфейса
type Language = 'ru' | 'en';

// Типы маркеров (из Android)
type MarkerType =
  | 'ROOM'        // Комната/аудитория
  | 'ENTRANCE'    // Вход
  | 'STAIRS_UP'   // Лестница вверх
  | 'STAIRS_DOWN' // Лестница вниз
  | 'STAIRS_BOTH' // Лестница в обе стороны
  | 'ELEVATOR'    // Лифт
  | 'WC'          // Туалет
  | 'WC_MAN'      // Мужской туалет
  | 'WC_WOMAN'    // Женский туалет
  | 'OTHER';      // Прочее

// Маркер на карте
interface Marker {
  id: string;
  type: MarkerType;
  floor: number;
  x: number;        // Координата X в пикселях
  y: number;        // Координата Y в пикселях
  ru: MarkerText;   // Русский текст
  en: MarkerText;   // Английский текст
}

// Текст маркера
interface MarkerText {
  title?: string;       // Название (напр. "3343")
  location?: string;    // Расположение
  description?: string; // Описание
}

// Информация о карте
interface MapInfo {
  internalName: string;  // ID карты (напр. "spbu-mm")
  floorWidth: number;    // Ширина этажа в пикселях
  floorHeight: number;   // Высота этажа в пикселях
  tileSize: number;      // Размер тайла (256)
  zoomLevelsNum: number; // Количество уровней зума
  floors: FloorInfo[];   // Информация об этажах
}
```

## Импорт

```typescript
// Импорт всего
import { LeafletMap, currentFloor, searchMarkers } from '$lib';

// Или по отдельности
import { LeafletMap } from '$lib/components';
import { currentFloor } from '$lib/stores';
import { searchMarkers } from '$lib/utils';
```
