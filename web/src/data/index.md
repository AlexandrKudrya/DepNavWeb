# Data

JSON данные карт и маркеров.

## Источник данных

Данные конвертируются из Android-версии:
- Исходные JSON: `../../data/jsons/`
- SQLite база: `../../app/src/main/assets/maps.db`

## Файлы

| Файл | Содержимое |
|------|------------|
| `maps.json` | Список карт (id, размеры, кол-во этажей) |
| `markers.json` | Все маркеры всех карт |
| `spbu-mm.json` | Данные МатМеха (копия из data/jsons/) |
| `spbu-pf.json` | Данные Физфака (копия из data/jsons/) |

## Формат maps.json

```json
[
  {
    "id": "spbu-mm",
    "floorsNum": 4,
    "floorWidth": 2048,
    "floorHeight": 1536,
    "title": {
      "RU": "МатМех СПбГУ",
      "EN": "SPbU Math & Mechanics"
    }
  }
]
```

## Формат markers.json

```json
[
  {
    "id": 1,
    "mapId": "spbu-mm",
    "type": "ROOM",
    "floor": 1,
    "x": 512,
    "y": 384,
    "title": "Аудитория 101",
    "description": "Лекционная аудитория"
  }
]
```

## Загрузка в приложении

```typescript
// Статический импорт (включается в бандл)
import maps from '$lib/data/maps.json';
import markers from '$lib/data/markers.json';

// Или динамическая загрузка
const maps = await fetch('/data/maps.json').then(r => r.json());
```
