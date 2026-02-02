# Icons

SVG иконки маркеров.

## Иконки

| Файл | Тип маркера | Цвет |
|------|-------------|------|
| `room.svg` | ROOM | #4CAF50 (зелёный) |
| `entrance.svg` | ENTRANCE | #2196F3 (синий) |
| `elevator.svg` | ELEVATOR | #9C27B0 (фиолетовый) |
| `stairs.svg` | STAIRS_BOTH | #FF9800 (оранжевый) |
| `stairs-up.svg` | STAIRS_UP | #FF9800 |
| `stairs-down.svg` | STAIRS_DOWN | #FF9800 |
| `wc.svg` | WC | #00BCD4 (голубой) |
| `wc-man.svg` | WC_MAN | #00BCD4 |
| `wc-woman.svg` | WC_WOMAN | #E91E63 (розовый) |
| `other.svg` | OTHER | #9E9E9E (серый) |

## Требования к иконкам

- Формат: SVG
- Размер: 24x24 viewBox
- Цвет: `currentColor` (для кастомизации через CSS)
- Оптимизированы через SVGO

## Пример SVG

```svg
<!-- room.svg -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
</svg>
```

## Использование в Leaflet

```typescript
const icon = L.divIcon({
  className: 'marker-icon',
  html: `<img src="/icons/room.svg" alt="Room" />`,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});
```
