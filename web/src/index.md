# Source

Исходный код приложения.

## Файлы

| Файл | Назначение |
|------|------------|
| `main.ts` | Точка входа, монтирование Svelte |
| `App.svelte` | Корневой компонент |
| `app.css` | Глобальные стили |
| `vite-env.d.ts` | TypeScript типы для Vite |

## Папки

| Папка | Назначение |
|-------|------------|
| `lib/` | Переиспользуемый код (компоненты, stores, utils) |
| `data/` | JSON данные карт и маркеров |
| `styles/` | CSS файлы |

## Точка входа (main.ts)

```typescript
import App from './App.svelte';
import './app.css';

const app = new App({
  target: document.getElementById('app')!,
});

export default app;
```
