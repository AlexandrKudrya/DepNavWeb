<script lang="ts">
  import { selectedMarker, language } from '../stores';
  import { getMarkerTypeInfo, getMarkerTypeLabel } from '../utils';

  const basePath = import.meta.env.BASE_URL || '/';

  function close() {
    selectedMarker.set(null);
  }

  $: marker = $selectedMarker;
  $: text = marker?.[$language];
  $: typeInfo = marker ? getMarkerTypeInfo(marker.type) : null;
  $: typeLabel = marker ? getMarkerTypeLabel(marker.type, $language) : '';
  $: title = text?.title || ($language === 'ru' ? 'Без названия' : 'No title');
</script>

{#if marker}
  <div class="popup-container">
    <div class="popup">
      <div class="popup-header">
        <div class="marker-icon" style="color: {typeInfo?.color}">
          <img src="{basePath}icons/{typeInfo?.icon}.svg" alt={typeLabel} width="24" height="24" />
        </div>
        <div class="popup-title-wrap">
          <h2 class="popup-title">{title}</h2>
          {#if text?.location}
            <p class="popup-location">{text.location}</p>
          {/if}
        </div>
      </div>

      {#if text?.description}
        <p class="popup-description">{text.description}</p>
      {/if}

      <div class="popup-meta">
        <span class="popup-type">{typeLabel}</span>
        <span class="popup-floor">
          {$language === 'ru' ? 'Этаж' : 'Floor'} {marker.floor}
        </span>
      </div>

      <button class="close-btn" onclick={close} aria-label="Закрыть">
        <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
        </svg>
      </button>
    </div>
  </div>
{/if}

<style>
  .popup-container {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    padding: 0 var(--default-padding);
    padding-bottom: env(safe-area-inset-bottom, 0);
    z-index: var(--z-popup);
    pointer-events: none;
  }

  .popup {
    position: relative;
    width: 100%;
    max-width: 640px;
    background: rgba(220, 228, 232, var(--on-map-surface-alpha));
    border-radius: var(--border-radius) var(--border-radius) 0 0;
    padding: var(--default-padding);
    box-shadow: var(--shadow-lg);
    pointer-events: auto;
    animation: slideUp 0.3s ease-out;
  }

  @media (prefers-color-scheme: dark) {
    .popup {
      background: rgba(64, 72, 76, var(--on-map-surface-alpha));
    }
  }

  @keyframes slideUp {
    from {
      transform: translateY(100%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  .popup-header {
    display: flex;
    align-items: flex-start;
    gap: 12px;
  }

  .marker-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: var(--surface);
    flex-shrink: 0;
  }

  .marker-icon img {
    filter: none;
  }

  .popup-title-wrap {
    flex: 1;
    min-width: 0;
  }

  .popup-title {
    font-size: var(--font-size-lg);
    font-weight: 500;
    color: var(--on-surface);
    margin: 0;
    word-wrap: break-word;
  }

  .popup-location {
    font-size: var(--font-size-sm);
    color: var(--on-surface-variant);
    margin: 4px 0 0;
  }

  .popup-description {
    font-size: var(--font-size-sm);
    color: var(--on-surface-variant);
    margin: 12px 0 0;
    line-height: 1.5;
  }

  .popup-meta {
    display: flex;
    gap: 16px;
    margin-top: 12px;
    font-size: var(--font-size-xs);
    color: var(--outline);
  }

  .close-btn {
    position: absolute;
    top: 8px;
    right: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: var(--on-surface-variant);
  }

  .close-btn:hover {
    background: var(--outline-variant);
  }
</style>
