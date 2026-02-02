# Web Application — DepNav Web

Веб-версия приложения для навигации по зданиям СПбГУ.

## Структура

| Папка | Назначение |
|-------|------------|
| `frontend/` | Веб-интерфейс (SPA) — React/Vue/Svelte + карты |
| `backend/` | REST API сервер для работы с данными |
| `shared/` | Общие типы и константы между frontend и backend |
| `docs/` | Документация проекта |

## Связь с Android-версией

Веб-версия использует те же данные что и Android:
- JSON конфиги из `../data/jsons/`
- SQLite база `../app/src/main/assets/maps.db`
- Тайлы карт из `../app/src/main/assets/tiles/`

## Запуск

```bash
# Frontend
cd frontend && npm install && npm run dev

# Backend
cd backend && npm install && npm run dev
```

## CI/CD

Пайплайны настроены отдельно от Android — см. `../.github/workflows/`
