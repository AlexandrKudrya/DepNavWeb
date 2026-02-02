# Documentation

Документация веб-проекта.

## Содержимое

| Документ | Описание |
|----------|----------|
| `architecture.md` | Архитектура приложения |
| `api.md` | Документация REST API |
| `deployment.md` | Инструкции по деплою |
| `development.md` | Гайд для разработчиков |
| `data-migration.md` | Миграция данных из Android |

## Быстрый старт

1. Установите зависимости:
   ```bash
   cd web && npm install
   ```

2. Скопируйте базу данных:
   ```bash
   cp ../app/src/main/assets/maps.db backend/data/
   ```

3. Запустите backend:
   ```bash
   cd backend && npm run dev
   ```

4. Запустите frontend:
   ```bash
   cd frontend && npm run dev
   ```

5. Откройте http://localhost:5173

## Связанная документация

- Android README: `../README.md`
- JSON схема данных: `../data/jsons/map-info-schema.json`
