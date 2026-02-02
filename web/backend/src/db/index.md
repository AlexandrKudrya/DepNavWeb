# Database

Работа с базой данных.

## Файлы

| Файл | Назначение |
|------|------------|
| `connection.ts` | Подключение к SQLite/PostgreSQL |
| `migrations/` | SQL миграции (если нужны) |
| `seed.ts` | Заполнение начальными данными |

## Источник данных

Используем SQLite базу из Android:
```
../../app/src/main/assets/maps.db
```

Или копируем её в `backend/data/maps.db`.

## Пример подключения

```typescript
// connection.ts
import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(__dirname, '../../data/maps.db');
export const db = new Database(dbPath, { readonly: true });

// Включаем FTS для поиска
db.pragma('journal_mode = WAL');
```

## Таблицы

| Таблица | Назначение |
|---------|------------|
| `map_info` | Информация о картах |
| `map_title` | Названия карт (i18n) |
| `marker` | Маркеры (комнаты, лифты и т.д.) |
| `marker_text` | Текст маркеров (i18n) |
| `marker_text_fts` | FTS индекс для поиска |
