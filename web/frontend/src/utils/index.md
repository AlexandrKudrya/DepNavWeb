# Utils

Вспомогательные функции и утилиты.

## Планируемые утилиты

| Файл | Назначение |
|------|------------|
| `coordinates.ts` | Конвертация координат, расчёт расстояний |
| `format.ts` | Форматирование текста (названия комнат и т.д.) |
| `debounce.ts` | Debounce/throttle функции |
| `cn.ts` | Утилита для классов (clsx/classnames) |
| `constants.ts` | Константы приложения |

## Пример

```typescript
// coordinates.ts
export function pixelToLatLng(x: number, y: number, bounds: Bounds): LatLng {
  // конвертация пиксельных координат в географические
}

export function calculateDistance(a: LatLng, b: LatLng): number {
  // расчёт расстояния между точками
}
```
