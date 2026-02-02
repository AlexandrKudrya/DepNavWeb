<script lang="ts">
  import { onMount } from 'svelte';
  import { LeafletMap, FloorSwitch, SearchBar, MarkerPopup } from './lib';
  import { mapData, showUI, searchExpanded } from './lib/stores';
  import type { MapInfo } from './lib/types';

  let loading = true;
  let error: string | null = null;

  onMount(async () => {
    try {
      // Load map data
      const response = await fetch(`${import.meta.env.BASE_URL}data/spbu-mm.json`);
      if (!response.ok) throw new Error('Failed to load map data');

      const data: MapInfo = await response.json();

      // Add unique IDs to markers if missing
      let markerId = 0;
      for (const floor of data.floors) {
        for (const marker of floor.markers) {
          if (!('id' in marker)) {
            (marker as any).id = `marker-${markerId++}`;
          }
          (marker as any).floor = floor.floor;
        }
      }

      mapData.set(data);
      loading = false;
    } catch (e) {
      console.error('Failed to load map:', e);
      error = e instanceof Error ? e.message : 'Unknown error';
      loading = false;
    }
  });

  // Hide UI when interacting with map
  function handleMapInteraction() {
    if ($searchExpanded) return;
    // Could implement UI auto-hide here
  }
</script>

<main class="app">
  {#if loading}
    <div class="loading">
      <div class="spinner"></div>
      <p>Загрузка карты...</p>
    </div>
  {:else if error}
    <div class="error">
      <p>Не удалось загрузить карту</p>
      <p class="error-details">{error}</p>
      <button onclick={() => location.reload()}>Попробовать снова</button>
    </div>
  {:else}
    <div class="map-wrapper" onclick={handleMapInteraction}>
      <LeafletMap />
    </div>

    {#if $showUI}
      <header class="header safe-area-top">
        <SearchBar />
      </header>

      <aside class="floor-controls">
        <FloorSwitch />
      </aside>
    {/if}

    <MarkerPopup />
  {/if}
</main>

<style>
  .app {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .map-wrapper {
    position: absolute;
    inset: 0;
    z-index: var(--z-map);
  }

  .header {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    padding: var(--default-padding);
    z-index: var(--z-ui);
    display: flex;
    justify-content: center;
    pointer-events: none;
  }

  .header > :global(*) {
    pointer-events: auto;
  }

  .floor-controls {
    position: absolute;
    top: 80px;
    right: var(--default-padding);
    z-index: var(--z-ui);
  }

  @supports (padding: env(safe-area-inset-top)) {
    .header {
      padding-top: calc(var(--default-padding) + env(safe-area-inset-top));
    }
    .floor-controls {
      top: calc(80px + env(safe-area-inset-top));
      right: calc(var(--default-padding) + env(safe-area-inset-right));
    }
  }

  /* Loading state */
  .loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    gap: 16px;
    color: var(--on-surface-variant);
  }

  .spinner {
    width: 40px;
    height: 40px;
    border: 3px solid var(--outline-variant);
    border-top-color: var(--primary);
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  /* Error state */
  .error {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    gap: 8px;
    padding: var(--default-padding);
    text-align: center;
  }

  .error p {
    color: var(--on-surface);
  }

  .error-details {
    font-size: var(--font-size-sm);
    color: var(--error) !important;
  }

  .error button {
    margin-top: 16px;
    padding: 12px 24px;
    background: var(--primary);
    color: var(--on-primary);
    border-radius: var(--border-radius);
    font-weight: 500;
  }

  .error button:hover {
    opacity: 0.9;
  }
</style>
