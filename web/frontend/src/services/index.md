# Services

Сервисы для работы с данными и API.

## Планируемые сервисы

| Сервис | Назначение |
|--------|------------|
| `api.ts` | Базовый HTTP клиент (fetch/axios) |
| `mapService.ts` | Получение данных о картах |
| `markerService.ts` | Работа с маркерами |
| `searchService.ts` | Поиск по маркерам и комнатам |
| `storageService.ts` | Работа с localStorage (история поиска) |
| `tileService.ts` | Загрузка тайлов карт |

## Пример

```typescript
// mapService.ts
export const mapService = {
  async getMaps(): Promise<MapInfo[]> {
    return api.get('/maps');
  },

  async getMapById(id: string): Promise<MapInfo> {
    return api.get(`/maps/${id}`);
  }
};
```
