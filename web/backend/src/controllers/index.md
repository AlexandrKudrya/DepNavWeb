# Controllers

Обработчики HTTP запросов.

## Планируемые контроллеры

| Файл | Назначение |
|------|------------|
| `mapsController.ts` | Обработка запросов к картам |
| `markersController.ts` | Обработка запросов к маркерам |
| `searchController.ts` | Обработка поисковых запросов |
| `tilesController.ts` | Раздача тайлов |

## Ответственность

Контроллеры:
- Парсят входящие данные (query, params, body)
- Валидируют входные данные
- Вызывают сервисы
- Формируют HTTP ответ

## Пример

```typescript
// mapsController.ts
export const mapsController = {
  async getAll(req: Request, res: Response) {
    const maps = await mapsService.getAllMaps();
    res.json(maps);
  },

  async getById(req: Request, res: Response) {
    const map = await mapsService.getMapById(req.params.id);
    if (!map) {
      return res.status(404).json({ error: 'Map not found' });
    }
    res.json(map);
  }
};
```
