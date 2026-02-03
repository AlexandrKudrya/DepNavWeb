<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import L from 'leaflet';
  import { mapData, currentFloor, currentFloorMarkers, selectedMarker, language } from '../stores';
  import { getMarkerTypeInfo } from '../utils';
  import type { Marker } from '../types';

  let mapContainer: HTMLDivElement;
  let map: L.Map | null = null;
  let markersLayer: L.LayerGroup | null = null;
  let currentMarkers: Map<string, L.Marker> = new Map();

  // Base path for tiles (will be set from mapData)
  $: basePath = import.meta.env.BASE_URL || '/';
  $: tilesPath = $mapData ? `${basePath}tiles/${$mapData.internalName}` : '';

  onMount(() => {
    initMap();
  });

  onDestroy(() => {
    if (map) {
      map.remove();
      map = null;
    }
  });

  function initMap() {
    if (!mapContainer || map) return;

    map = L.map(mapContainer, {
      crs: L.CRS.Simple,
      minZoom: 0,
      maxZoom: 4,
      zoomControl: false,
      attributionControl: false,
    });

    // Add zoom control to bottom-left
    L.control.zoom({ position: 'bottomleft' }).addTo(map);

    markersLayer = L.layerGroup().addTo(map);

    // Set initial view
    map.setView([0, 0], 1);
  }

  // Update map when data changes
  $: if (map && $mapData) {
    updateMapBounds();
  }

  // Update tile layer when floor changes
  $: if (map && $mapData && $currentFloor) {
    updateTileLayer();
  }

  // Update markers when floor markers change
  $: if (map && markersLayer) {
    updateMarkers($currentFloorMarkers);
  }

  // Pan to selected marker
  $: if (map && $selectedMarker) {
    panToMarker($selectedMarker);
  }

  function updateMapBounds() {
    if (!map || !$mapData) return;

    const { floorWidth, floorHeight } = $mapData;

    // Convert pixel coordinates to LatLng
    // Leaflet Simple CRS: y is inverted
    const southWest = map.unproject([0, floorHeight], $mapData.zoomLevelsNum - 1);
    const northEast = map.unproject([floorWidth, 0], $mapData.zoomLevelsNum - 1);
    const bounds = new L.LatLngBounds(southWest, northEast);

    map.setMaxBounds(bounds);
    map.fitBounds(bounds);
  }

  function updateTileLayer() {
    if (!map || !$mapData) return;

    // Remove existing tile layers
    map.eachLayer(layer => {
      if (layer instanceof L.TileLayer) {
        map!.removeLayer(layer);
      }
    });

    // Add new tile layer for current floor
    // Format: tiles/spbu-mm/floor1/{z}/{x}/{y}.webp
    const tileUrl = `${tilesPath}/floor${$currentFloor}/{z}/{x}/{y}.webp`;

    const southWest = map.unproject([0, $mapData.floorHeight], $mapData.zoomLevelsNum - 1);
    const northEast = map.unproject([$mapData.floorWidth, 0], $mapData.zoomLevelsNum - 1);

    L.tileLayer(tileUrl, {
      minZoom: 0,
      maxZoom: $mapData.zoomLevelsNum - 1,
      tileSize: $mapData.tileSize,
      noWrap: true,
      bounds: L.latLngBounds(southWest, northEast),
    }).addTo(map);
  }

  function updateMarkers(markers: Marker[]) {
    if (!map || !markersLayer || !$mapData) return;

    // Clear existing markers
    markersLayer.clearLayers();
    currentMarkers.clear();

    const maxZoom = $mapData.zoomLevelsNum - 1;

    for (const marker of markers) {
      // Skip markers without title for ROOM type (they're just labels)
      if (marker.type === 'ROOM' && !marker[$language].title) continue;

      const latLng = map.unproject([marker.x, marker.y], maxZoom);
      const typeInfo = getMarkerTypeInfo(marker.type);

      let leafletMarker: L.Marker;

      if (marker.type === 'ROOM' && marker[$language].title) {
        // Room markers show text label
        const icon = L.divIcon({
          className: 'room-marker',
          html: `<span class="room-label">${marker[$language].title}</span>`,
          iconSize: [0, 0],
          iconAnchor: [0, 0],
        });
        leafletMarker = L.marker(latLng, { icon });
      } else {
        // Other markers show icons
        const icon = L.divIcon({
          className: 'marker-icon-container',
          html: `<img src="${basePath}icons/${typeInfo.icon}.svg" alt="${typeInfo.label[$language]}" style="color: ${typeInfo.color}" />`,
          iconSize: [24, 24],
          iconAnchor: [12, 12],
        });
        leafletMarker = L.marker(latLng, { icon });
      }

      leafletMarker.on('click', () => {
        selectedMarker.set(marker);
      });

      leafletMarker.addTo(markersLayer);
      currentMarkers.set(marker.id, leafletMarker);
    }
  }

  function panToMarker(marker: Marker) {
    if (!map || !$mapData) return;

    const maxZoom = $mapData.zoomLevelsNum - 1;
    const latLng = map.unproject([marker.x, marker.y], maxZoom);

    map.setView(latLng, Math.max(map.getZoom(), 2), {
      animate: true,
      duration: 0.5,
    });
  }
</script>

<div class="map-container" bind:this={mapContainer}></div>

<style>
  .map-container {
    width: 100%;
    height: 100%;
    background: var(--background);
  }

  :global(.room-marker) {
    background: none !important;
    border: none !important;
  }

  :global(.room-label) {
    display: block;
    font-size: 12px;
    font-weight: 500;
    color: var(--on-surface);
    text-shadow:
      -1px -1px 0 var(--background),
      1px -1px 0 var(--background),
      -1px 1px 0 var(--background),
      1px 1px 0 var(--background),
      0 0 4px var(--background);
    white-space: nowrap;
    pointer-events: auto;
    cursor: pointer;
  }

  :global(.marker-icon-container) {
    display: flex !important;
    align-items: center;
    justify-content: center;
    background: none !important;
    border: none !important;
  }

  :global(.marker-icon-container img) {
    width: 24px;
    height: 24px;
    filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3));
    cursor: pointer;
  }

  /* Leaflet overrides */
  :global(.leaflet-control-zoom) {
    border: none !important;
    box-shadow: var(--shadow-md) !important;
  }

  :global(.leaflet-control-zoom a) {
    background: rgba(220, 228, 232, var(--on-map-surface-alpha)) !important;
    color: var(--on-surface) !important;
    border: none !important;
    width: 40px !important;
    height: 40px !important;
    line-height: 40px !important;
    font-size: 18px !important;
  }

  :global(.leaflet-control-zoom a:hover) {
    background: var(--surface-variant) !important;
  }

  :global(.leaflet-control-zoom-in) {
    border-radius: var(--border-radius-small) var(--border-radius-small) 0 0 !important;
  }

  :global(.leaflet-control-zoom-out) {
    border-radius: 0 0 var(--border-radius-small) var(--border-radius-small) !important;
  }

  @media (prefers-color-scheme: dark) {
    :global(.leaflet-control-zoom a) {
      background: rgba(64, 72, 76, var(--on-map-surface-alpha)) !important;
    }

    :global(.room-label) {
      color: var(--on-surface);
      text-shadow:
        -1px -1px 0 var(--background),
        1px -1px 0 var(--background),
        -1px 1px 0 var(--background),
        1px 1px 0 var(--background),
        0 0 6px var(--background);
    }
  }
</style>
