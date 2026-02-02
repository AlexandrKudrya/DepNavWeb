# Components

Svelte компоненты приложения.

## Компоненты

| Компонент | Назначение |
|-----------|------------|
| `Map.svelte` | Основная карта (обёртка над Leaflet) |
| `FloorSelector.svelte` | Переключатель этажей |
| `SearchBar.svelte` | Поле поиска |
| `SearchResults.svelte` | Выпадающий список результатов |
| `MarkerPopup.svelte` | Попап с информацией о маркере |
| `MarkerIcon.svelte` | SVG иконки маркеров по типу |
| `Spinner.svelte` | Индикатор загрузки |

## Структура компонента

```svelte
<!-- Map.svelte -->
<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import L from 'leaflet';
  import { currentFloor, markers } from '$lib/stores/map';

  let mapContainer: HTMLDivElement;
  let map: L.Map;

  onMount(() => {
    map = L.map(mapContainer, {
      crs: L.CRS.Simple,
      minZoom: -2,
      maxZoom: 2,
    });
    // ...
  });

  onDestroy(() => {
    map?.remove();
  });
</script>

<div bind:this={mapContainer} class="map"></div>

<style>
  .map {
    width: 100%;
    height: 100%;
  }
</style>
```

## Props и события

```svelte
<!-- Пример компонента с props -->
<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let floor: number;
  export let maxFloor: number;

  const dispatch = createEventDispatcher<{
    change: number;
  }>();
</script>
```
