# Backend

REST API сервер для веб-приложения.

## Технологии (рекомендуемые)

- **Runtime**: Node.js / Deno / Bun
- **Framework**: Express / Fastify / Hono
- **База данных**: SQLite (из Android) / PostgreSQL
- **ORM**: Prisma / Drizzle / better-sqlite3
- **Валидация**: Zod / Joi
- **Документация**: OpenAPI / Swagger

## Структура

| Папка | Назначение |
|-------|------------|
| `src/routes/` | Определение API эндпоинтов |
| `src/controllers/` | Обработчики запросов |
| `src/services/` | Бизнес-логика |
| `src/models/` | Модели данных |
| `src/db/` | Подключение к БД, миграции |
| `src/middleware/` | Middleware (CORS, auth, logging) |
| `tests/` | Тесты API |

## API эндпоинты (план)

```
GET  /api/maps              — список всех карт
GET  /api/maps/:id          — информация о карте
GET  /api/maps/:id/markers  — маркеры карты
GET  /api/markers/:id       — информация о маркере
GET  /api/search?q=...      — поиск по маркерам
GET  /api/tiles/:map/:z/:x/:y.png — тайлы карт
```

## Точка входа

- `src/index.ts` — запуск сервера
- `src/app.ts` — конфигурация Express/Fastify
