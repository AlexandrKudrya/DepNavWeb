# Services

Бизнес-логика приложения.

## Планируемые сервисы

| Файл | Назначение |
|------|------------|
| `mapsService.ts` | Работа с картами |
| `markersService.ts` | Работа с маркерами |
| `searchService.ts` | Full-text поиск |
| `tilesService.ts` | Работа с тайлами карт |

## Ответственность

Сервисы:
- Содержат бизнес-логику
- Работают с БД через модели
- Не знают о HTTP (Request/Response)
- Возвращают данные или бросают ошибки

## Пример

```typescript
// mapsService.ts
export const mapsService = {
  async getAllMaps(): Promise<MapInfo[]> {
    return db.query('SELECT * FROM map_info');
  },

  async getMapById(id: string): Promise<MapInfo | null> {
    return db.queryOne('SELECT * FROM map_info WHERE id = ?', [id]);
  },

  async getMapMarkers(mapId: string, floor?: number): Promise<Marker[]> {
    let query = 'SELECT * FROM marker WHERE map_id = ?';
    const params = [mapId];

    if (floor !== undefined) {
      query += ' AND floor = ?';
      params.push(floor);
    }

    return db.query(query, params);
  }
};
```
