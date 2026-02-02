# Tiles

Тайлы карт для Leaflet.

## Источник

Копируются из Android-версии:
```bash
cp -r ../app/src/main/assets/tiles/* ./static/tiles/
```

## Структура

```
tiles/
├── spbu-mm/           # ID карты
│   ├── 1/             # Этаж
│   │   ├── 0/         # Zoom level
│   │   │   ├── 0_0.png
│   │   │   └── 0_1.png
│   │   ├── 1/
│   │   │   ├── 0_0.png
│   │   │   ├── 0_1.png
│   │   │   ├── 1_0.png
│   │   │   └── 1_1.png
│   │   └── ...
│   ├── 2/
│   └── ...
└── spbu-pf/
    └── ...
```

## URL паттерн

```
/tiles/{mapId}/{floor}/{z}/{x}_{y}.png
```

## Leaflet TileLayer

```typescript
L.tileLayer('/tiles/spbu-mm/1/{z}/{x}_{y}.png', {
  minZoom: 0,
  maxZoom: 4,
  noWrap: true,
  bounds: [[0, 0], [height, width]],
});
```
