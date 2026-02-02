<script lang="ts">
  import { currentFloor, maxFloor } from '../stores';

  const MIN_FLOOR = 1;

  function goUp() {
    if ($currentFloor < $maxFloor) {
      currentFloor.update(f => f + 1);
    }
  }

  function goDown() {
    if ($currentFloor > MIN_FLOOR) {
      currentFloor.update(f => f - 1);
    }
  }
</script>

<div class="floor-switch">
  <button
    class="floor-btn"
    onclick={goUp}
    disabled={$currentFloor >= $maxFloor}
    aria-label="Этаж выше"
  >
    <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
      <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/>
    </svg>
  </button>

  <span class="floor-number" aria-live="polite">
    {$currentFloor}
  </span>

  <button
    class="floor-btn"
    onclick={goDown}
    disabled={$currentFloor <= MIN_FLOOR}
    aria-label="Этаж ниже"
  >
    <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
      <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z"/>
    </svg>
  </button>
</div>

<style>
  .floor-switch {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: rgba(220, 228, 232, var(--on-map-surface-alpha));
    border-radius: 50px;
    padding: 4px;
    box-shadow: var(--shadow-md);
    user-select: none;
  }

  @media (prefers-color-scheme: dark) {
    .floor-switch {
      background: rgba(64, 72, 76, var(--on-map-surface-alpha));
    }
  }

  .floor-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    color: var(--on-surface-variant);
    transition: background-color 0.2s, color 0.2s;
  }

  .floor-btn:not(:disabled):hover {
    background: var(--outline-variant);
  }

  .floor-btn:not(:disabled):active {
    background: var(--outline);
  }

  .floor-btn:disabled {
    color: var(--outline-variant);
  }

  .floor-number {
    font-size: var(--font-size-lg);
    font-weight: 500;
    color: var(--on-surface);
    padding: 4px 0;
    min-width: 24px;
    text-align: center;
  }
</style>
