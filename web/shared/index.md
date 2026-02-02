# Shared

Общий код между frontend и backend.

## Структура

| Папка | Назначение |
|-------|------------|
| `types/` | TypeScript типы (модели данных) |
| `constants/` | Общие константы |

## Использование

```typescript
// В frontend
import { MapInfo, Marker } from '@depnav/shared/types';

// В backend
import { MarkerType, Language } from '@depnav/shared/constants';
```

## Настройка монорепо

Для работы shared между проектами используйте:
- **npm/pnpm workspaces**
- **Turborepo** (опционально)

```json
// package.json в корне web/
{
  "workspaces": ["frontend", "backend", "shared"]
}
```
