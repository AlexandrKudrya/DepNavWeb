# Lib

Переиспользуемый код приложения.

## Структура

| Папка | Назначение |
|-------|------------|
| `components/` | Svelte компоненты |
| `stores/` | Svelte stores (глобальное состояние) |
| `utils/` | Вспомогательные функции |

## Импорты

Svelte поддерживает алиас `$lib`:

```svelte
<script>
  import Map from '$lib/components/Map.svelte';
  import { mapStore } from '$lib/stores/map';
  import { formatRoom } from '$lib/utils/format';
</script>
```
