# Frontend

Веб-интерфейс приложения навигации. SPA с интерактивными картами.

## Технологии (рекомендуемые)

- **Framework**: React / Vue 3 / Svelte
- **Карты**: Leaflet / OpenLayers / MapLibre GL
- **State**: Zustand / Pinia / Svelte stores
- **Стили**: Tailwind CSS / CSS Modules
- **Сборка**: Vite

## Структура

| Папка | Назначение |
|-------|------------|
| `src/components/` | UI компоненты (кнопки, карточки, модалки) |
| `src/pages/` | Страницы приложения (роуты) |
| `src/services/` | API клиенты, работа с данными |
| `src/hooks/` | Кастомные хуки (React) / composables (Vue) |
| `src/utils/` | Утилиты и хелперы |
| `src/styles/` | Глобальные стили, переменные, темы |
| `src/types/` | TypeScript типы для frontend |
| `public/` | Статические файлы (favicon, assets) |

## Точка входа

- `src/main.ts` — инициализация приложения
- `src/App.tsx` / `App.vue` — корневой компонент
