# styles/

Глобальные CSS стили.

## global.css

### Цветовая схема

Тема на основе Material Design 3, совместимая с Android-приложением.

**Light theme:**
```css
--primary: #006781;
--on-primary: #ffffff;
--surface: #fbfcfe;
--on-surface: #191c1d;
--surface-variant: #dce4e8;
--on-surface-variant: #40484c;
--outline: #70787c;
```

**Dark theme** (автоматически через `prefers-color-scheme`):
```css
--primary: #5fd4fd;
--on-primary: #003544;
--surface: #191c1d;
--on-surface: #e1e3e4;
--surface-variant: #40484c;
--on-surface-variant: #c0c8cc;
--outline: #8a9296;
```

### UI константы

```css
--on-map-surface-alpha: 0.9;  /* Прозрачность UI поверх карты */
--disabled-alpha: 0.38;        /* Прозрачность disabled элементов */
--default-padding: 16px;       /* Стандартный отступ */
--border-radius: 28px;         /* Скругление (Material) */
--border-radius-small: 12px;   /* Малое скругление */
```

### Тени

```css
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.1);
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
```

### Типографика

```css
--font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, ...;
--font-size-xs: 12px;
--font-size-sm: 14px;
--font-size-base: 16px;
--font-size-lg: 18px;
--font-size-xl: 20px;
```

### Z-index слои

```css
--z-map: 0;        /* Карта */
--z-markers: 100;  /* Маркеры на карте */
--z-ui: 400;       /* UI элементы (кнопки этажей) */
--z-search: 500;   /* Поиск */
--z-popup: 600;    /* Popup маркера */
```

### Safe area

Поддержка вырезов экрана (notch, dynamic island):

```css
@supports (padding: env(safe-area-inset-top)) {
  .safe-area-top {
    padding-top: env(safe-area-inset-top);
  }
  .safe-area-bottom {
    padding-bottom: env(safe-area-inset-bottom);
  }
}
```

### Reset

- Box-sizing: border-box
- Убраны margin/padding по умолчанию
- Кастомный scrollbar
- Стили для focus-visible
- Сброс стилей button и input
