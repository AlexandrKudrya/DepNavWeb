# public/

Статические файлы, копируемые в билд без обработки.

## Структура

```
public/
├── data/           # JSON данные карт
│   └── spbu-mm.json
├── icons/          # SVG иконки маркеров
│   ├── entrance.svg
│   ├── elevator.svg
│   ├── stairs.svg
│   ├── stairs-up.svg
│   ├── stairs-down.svg
│   ├── wc.svg
│   ├── wc-man.svg
│   ├── wc-woman.svg
│   ├── room.svg
│   ├── other.svg
│   └── logo.svg
└── tiles/          # Тайлы карт
    ├── spbu-mm/    # Математико-механический факультет
    │   ├── floor1/
    │   ├── floor2/
    │   ├── floor3/
    │   └── floor4/
    └── spbu-pf/    # Физический факультет
        └── ...
```

## data/

JSON файлы с данными карт. Формат:

```json
{
  "internalName": "spbu-mm",
  "title": { "ru": "Матмех", "en": "Math&Mech" },
  "floorWidth": 4096,
  "floorHeight": 2048,
  "tileSize": 256,
  "zoomLevelsNum": 5,
  "floors": [
    {
      "floor": 1,
      "markers": [
        {
          "type": "ROOM",
          "x": 1234,
          "y": 567,
          "ru": { "title": "3343", "location": "Главный корпус" },
          "en": { "title": "3343", "location": "Main building" }
        }
      ]
    }
  ]
}
```

## icons/

SVG иконки маркеров. Конвертированы из Android vector drawables.

**Требования:**
- Размер: 24x24 viewBox
- Цвет: `currentColor` (для стилизации через CSS)
- Оптимизированы (без лишних атрибутов)

## tiles/

Тайлы карт в формате WebP.

**Структура:**
```
tiles/{mapId}/floor{n}/{z}/{x}/{y}.webp
```

- `mapId` — ID карты (напр. `spbu-mm`)
- `n` — номер этажа (1-based)
- `z` — уровень зума (0 = самый мелкий)
- `x`, `y` — координаты тайла

**Генерация тайлов:**
Используется скрипт `tools/create_tiles.sh` из корня репозитория.
