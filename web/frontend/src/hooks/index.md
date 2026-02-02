# Hooks

Кастомные React хуки / Vue composables.

## Планируемые хуки

| Хук | Назначение |
|-----|------------|
| `useMap` | Управление состоянием карты |
| `useMarkers` | Загрузка и фильтрация маркеров |
| `useSearch` | Логика поиска с debounce |
| `useFloor` | Переключение этажей |
| `useLocalStorage` | Персистентное хранилище |
| `useMediaQuery` | Адаптивность (mobile/desktop) |

## Пример

```typescript
// useSearch.ts
export function useSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Marker[]>([]);
  const [loading, setLoading] = useState(false);

  // debounced search logic...

  return { query, setQuery, results, loading };
}
```
