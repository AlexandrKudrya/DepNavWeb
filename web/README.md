# DepNav Web

Веб-версия приложения навигации по зданиям СПбГУ.

## Технологии

| Технология | Версия | Назначение |
|------------|--------|------------|
| Svelte | 5.x | UI фреймворк |
| Vite | 6.x | Сборка и dev-сервер |
| Leaflet | 1.9.x | Интерактивные карты |
| TypeScript | 5.x | Типизация |

## Структура

```
web/
├── src/                 # Исходный код
│   ├── lib/             # Библиотека компонентов и логики
│   │   ├── components/  # Svelte компоненты
│   │   ├── stores/      # Svelte stores (состояние)
│   │   └── utils/       # Утилиты
│   ├── styles/          # CSS стили
│   ├── App.svelte       # Корневой компонент
│   └── main.ts          # Точка входа
├── public/              # Статические файлы
│   ├── data/            # JSON данные карт
│   ├── icons/           # SVG иконки маркеров
│   └── tiles/           # Тайлы карт (webp)
└── [configs]            # Конфиги (vite, svelte, ts)
```

## Команды

```bash
npm install      # Установить зависимости
npm run dev      # Запустить dev-сервер (http://localhost:5173)
npm run build    # Собрать для продакшена
npm run preview  # Превью продакшен-сборки
npm run check    # Проверка типов
```

## Фичи

- [x] Интерактивная карта с зумом и перетаскиванием
- [x] Переключение этажей
- [x] Поиск по комнатам/аудиториям
- [x] Информация о маркере при клике
- [x] Разные типы маркеров (комнаты, туалеты, лифты, лестницы)
- [x] Адаптивный мобильный UI
- [x] Светлая/тёмная тема (авто)
- [ ] PWA / офлайн режим
- [ ] Определение местоположения
- [ ] Маршруты между точками

## Деплой

### Production (GitHub Pages)

Автоматический деплой при пуше в `main`:
- Workflow: `.github/workflows/web-deploy.yml`
- URL: `https://alexandrkudrya.github.io/DepNavWeb/`

**Требуется:** Включить Pages в Settings → Pages → Source: GitHub Actions

### PR Preview (surge.sh)

Автоматический preview для каждого PR:
- Workflow: `.github/workflows/web-preview.yml`
- URL: `https://depnav-pr-{номер}.surge.sh`

**Настройка SURGE_TOKEN:**
```bash
# Установить surge CLI
npm install -g surge

# Получить токен
surge token

# Добавить в GitHub Secrets:
# Settings → Secrets → Actions → New repository secret
# Name: SURGE_TOKEN
# Value: <токен из команды выше>
```

## Связь с Android

Веб-версия использует те же данные:
- JSON: `../data/jsons/` → `public/data/`
- Тайлы: `../app/src/main/assets/tiles/` → `public/tiles/`
- Иконки: конвертированы из `../app/src/main/res/drawable/mrk_*.xml`
