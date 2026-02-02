# Styles

Глобальные стили и CSS переменные.

## Структура

| Файл | Назначение |
|------|------------|
| `globals.css` | Глобальные стили, reset |
| `variables.css` | CSS переменные (цвета, размеры) |
| `theme.css` | Тема приложения (light/dark) |
| `typography.css` | Типографика |
| `animations.css` | CSS анимации |

## CSS переменные (пример)

```css
:root {
  /* Цвета */
  --color-primary: #1976d2;
  --color-secondary: #424242;
  --color-background: #ffffff;
  --color-surface: #f5f5f5;

  /* Маркеры */
  --marker-room: #4caf50;
  --marker-wc: #2196f3;
  --marker-stairs: #ff9800;
  --marker-elevator: #9c27b0;

  /* Размеры */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
}
```
