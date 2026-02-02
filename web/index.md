# DepNav Web

Веб-версия карты факультета СПбГУ. Чистая статика, деплой на GitHub Pages.

## Документация

| Документ | Описание |
|----------|----------|
| [README.md](README.md) | Обзор проекта, команды, деплой |
| [src/README.md](src/README.md) | Структура исходников |
| [src/lib/README.md](src/lib/README.md) | Типы и архитектура |
| [src/lib/components/README.md](src/lib/components/README.md) | Svelte компоненты |
| [src/lib/stores/README.md](src/lib/stores/README.md) | Управление состоянием |
| [src/lib/utils/README.md](src/lib/utils/README.md) | Утилиты |
| [src/styles/README.md](src/styles/README.md) | CSS тема и переменные |
| [public/README.md](public/README.md) | Статические файлы |

## Стек

| Технология | Назначение |
|------------|------------|
| **Svelte 5** | UI фреймворк |
| **Vite 6** | Сборка и dev-сервер |
| **Leaflet** | Интерактивные карты |
| **TypeScript** | Типизация |

## Структура

```
web/
├── src/
│   ├── lib/
│   │   ├── components/   # LeafletMap, FloorSwitch, SearchBar, MarkerPopup
│   │   ├── stores/       # Svelte stores (floor, markers, search)
│   │   ├── utils/        # markers.ts, search.ts
│   │   └── types.ts      # TypeScript типы
│   ├── styles/           # global.css (Material Design 3 тема)
│   ├── App.svelte        # Корневой компонент
│   └── main.ts           # Точка входа
├── public/
│   ├── data/             # JSON данные карт
│   ├── icons/            # SVG иконки маркеров
│   └── tiles/            # Тайлы карт (webp)
├── index.html
├── package.json
├── vite.config.ts
├── svelte.config.js
└── tsconfig.json
```

## Быстрый старт

```bash
cd web
npm install
npm run dev
# Открыть http://localhost:5173
```

## Фичи

### MVP (реализовано)
- [x] Интерактивная карта (зум, перетаскивание)
- [x] Переключение этажей
- [x] Поиск по комнатам
- [x] Информация о маркере при клике
- [x] Типы маркеров (комнаты, туалеты, лифты, лестницы)
- [x] Светлая/тёмная тема (авто)
- [x] Мобильный адаптивный UI

### Планы
- [ ] PWA / офлайн режим
- [ ] Геолокация
- [ ] Маршруты между точками

## CI/CD

- **CI:** `.github/workflows/web-ci.yml` — сборка и проверка при PR
- **Deploy:** `.github/workflows/web-deploy.yml` — деплой на GitHub Pages

URL: `https://alexandrkudrya.github.io/DepNavWeb/`
