<script lang="ts">
  import { searchQuery, searchExpanded, mapTitle, mapData, language, currentFloor, selectedMarker } from '../stores';
  import { searchMarkers, getAllMarkers } from '../utils';
  import type { Marker, SearchResult } from '../types';

  let inputElement: HTMLInputElement;

  $: allMarkers = $mapData ? getAllMarkers($mapData.floors) : [];
  $: results = searchMarkers(allMarkers, $searchQuery, $language);

  function handleExpand() {
    searchExpanded.set(true);
    setTimeout(() => inputElement?.focus(), 100);
  }

  function handleCollapse() {
    searchExpanded.set(false);
    searchQuery.set('');
  }

  function handleClear() {
    searchQuery.set('');
    inputElement?.focus();
  }

  function handleResultClick(marker: Marker) {
    currentFloor.set(marker.floor);
    selectedMarker.set(marker);
    handleCollapse();
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      handleCollapse();
    }
  }

  $: placeholder = $language === 'ru'
    ? `Поиск на карте ${$mapTitle}`
    : `Search on ${$mapTitle}`;
</script>

<div class="search-container" class:expanded={$searchExpanded}>
  <div class="search-bar">
    {#if $searchExpanded}
      <button class="icon-btn" onclick={handleCollapse} aria-label="Назад">
        <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
          <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
        </svg>
      </button>
    {/if}

    <input
      bind:this={inputElement}
      type="text"
      class="search-input"
      {placeholder}
      bind:value={$searchQuery}
      onfocus={handleExpand}
      onkeydown={handleKeydown}
    />

    {#if $searchExpanded && $searchQuery}
      <button class="icon-btn" onclick={handleClear} aria-label="Очистить">
        <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
        </svg>
      </button>
    {:else if !$searchExpanded}
      <div class="search-icon">
        <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
          <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
        </svg>
      </div>
    {/if}
  </div>

  {#if $searchExpanded}
    <div class="search-results">
      {#if results.length > 0}
        <ul class="results-list">
          {#each results as { marker } (marker.id)}
            <li>
              <button class="result-item" onclick={() => handleResultClick(marker)}>
                <span class="result-title">
                  {marker[$language].title || ($language === 'ru' ? 'Без названия' : 'No title')}
                </span>
                {#if marker[$language].location}
                  <span class="result-location">{marker[$language].location}</span>
                {/if}
                <span class="result-floor">
                  {$language === 'ru' ? 'Этаж' : 'Floor'} {marker.floor}
                </span>
              </button>
            </li>
          {/each}
        </ul>
      {:else if $searchQuery}
        <div class="no-results">
          {$language === 'ru' ? 'Ничего не найдено' : 'No results found'}
        </div>
      {:else}
        <div class="search-hint">
          {$language === 'ru' ? 'Введите номер аудитории или название' : 'Enter room number or name'}
        </div>
      {/if}
    </div>
  {/if}
</div>

{#if $searchExpanded}
  <button class="backdrop" onclick={handleCollapse} aria-label="Закрыть поиск"></button>
{/if}

<style>
  .search-container {
    position: relative;
    width: 100%;
    max-width: 600px;
    z-index: var(--z-search);
  }

  .search-bar {
    display: flex;
    align-items: center;
    gap: 8px;
    background: rgba(220, 228, 232, var(--on-map-surface-alpha));
    border-radius: var(--border-radius);
    padding: 8px 16px;
    box-shadow: var(--shadow-md);
    transition: background-color 0.3s, border-radius 0.3s;
  }

  .expanded .search-bar {
    background: var(--surface);
    border-radius: var(--border-radius) var(--border-radius) 0 0;
  }

  @media (prefers-color-scheme: dark) {
    .search-bar {
      background: rgba(64, 72, 76, var(--on-map-surface-alpha));
    }
    .expanded .search-bar {
      background: var(--surface-variant);
    }
  }

  .search-input {
    flex: 1;
    height: 40px;
    font-size: var(--font-size-base);
    color: var(--on-surface);
    outline: none;
  }

  .search-input::placeholder {
    color: var(--on-surface-variant);
  }

  .icon-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: var(--on-surface-variant);
    flex-shrink: 0;
  }

  .icon-btn:hover {
    background: var(--outline-variant);
  }

  .search-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    color: var(--on-surface-variant);
    flex-shrink: 0;
  }

  .search-results {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: var(--surface);
    border-radius: 0 0 var(--border-radius-small) var(--border-radius-small);
    box-shadow: var(--shadow-lg);
    max-height: 60vh;
    overflow-y: auto;
  }

  @media (prefers-color-scheme: dark) {
    .search-results {
      background: var(--surface-variant);
    }
  }

  .results-list {
    list-style: none;
    padding: 8px 0;
  }

  .result-item {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    padding: 12px 24px;
    text-align: left;
    transition: background-color 0.15s;
  }

  .result-item:hover {
    background: var(--outline-variant);
  }

  .result-title {
    font-size: var(--font-size-base);
    font-weight: 500;
    color: var(--on-surface);
  }

  .result-location {
    font-size: var(--font-size-sm);
    color: var(--on-surface-variant);
    margin-top: 2px;
  }

  .result-floor {
    font-size: var(--font-size-xs);
    color: var(--outline);
    margin-top: 4px;
  }

  .no-results,
  .search-hint {
    padding: 24px;
    text-align: center;
    color: var(--on-surface-variant);
  }

  .backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.3);
    z-index: calc(var(--z-search) - 1);
  }
</style>
