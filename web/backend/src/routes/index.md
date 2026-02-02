# Routes

Определение API эндпоинтов.

## Планируемые роуты

| Файл | Базовый путь | Назначение |
|------|--------------|------------|
| `maps.ts` | `/api/maps` | CRUD для карт |
| `markers.ts` | `/api/markers` | Работа с маркерами |
| `search.ts` | `/api/search` | Поиск |
| `tiles.ts` | `/api/tiles` | Раздача тайлов карт |
| `health.ts` | `/api/health` | Health check |

## Пример

```typescript
// maps.ts
import { Router } from 'express';
import { mapsController } from '../controllers/maps';

const router = Router();

router.get('/', mapsController.getAll);
router.get('/:id', mapsController.getById);
router.get('/:id/markers', mapsController.getMarkers);

export default router;
```
