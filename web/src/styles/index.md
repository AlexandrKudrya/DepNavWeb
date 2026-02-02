# Styles

CSS стили приложения.

## Файлы

| Файл | Назначение |
|------|------------|
| `variables.css` | CSS переменные (цвета, размеры) |
| `reset.css` | Сброс стандартных стилей |
| `leaflet-custom.css` | Кастомизация Leaflet |

## variables.css

```css
:root {
  /* Цвета */
  --color-primary: #1976d2;
  --color-primary-dark: #1565c0;
  --color-background: #ffffff;
  --color-surface: #f5f5f5;
  --color-text: #212121;
  --color-text-secondary: #757575;

  /* Маркеры */
  --marker-room: #4CAF50;
  --marker-wc: #00BCD4;
  --marker-stairs: #FF9800;
  --marker-elevator: #9C27B0;
  --marker-entrance: #2196F3;

  /* Размеры */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;

  /* Тени */
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.12);
  --shadow-md: 0 4px 6px rgba(0,0,0,0.1);

  /* Радиусы */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 16px;

  /* Z-index */
  --z-map: 1;
  --z-controls: 100;
  --z-search: 200;
  --z-popup: 300;
}

/* Тёмная тема (nice-to-have) */
@media (prefers-color-scheme: dark) {
  :root {
    --color-background: #121212;
    --color-surface: #1e1e1e;
    --color-text: #ffffff;
    --color-text-secondary: #b0b0b0;
  }
}
```

## Мобильная адаптация

```css
/* Базовые стили для мобильных */
* {
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
}

/* Безопасные отступы для iPhone */
.controls {
  padding-bottom: env(safe-area-inset-bottom);
}
```
