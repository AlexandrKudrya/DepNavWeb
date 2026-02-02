# Models

Модели и схемы данных.

## Планируемые модели

Импортируются из `shared/types/`, здесь только backend-специфичные:

| Файл | Назначение |
|------|------------|
| `schemas.ts` | Zod схемы для валидации |
| `queries.ts` | Типы для SQL запросов |

## Схемы валидации

```typescript
// schemas.ts
import { z } from 'zod';

export const searchQuerySchema = z.object({
  q: z.string().min(1).max(100),
  map: z.string().optional(),
  floor: z.coerce.number().int().optional(),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

export const mapParamsSchema = z.object({
  id: z.string().min(1),
});
```

## Связь с Android моделями

Модели основаны на таблицах из `maps.db`:
- `map_info` → `MapInfo`
- `marker` → `Marker`
- `marker_text` → `MarkerText`
