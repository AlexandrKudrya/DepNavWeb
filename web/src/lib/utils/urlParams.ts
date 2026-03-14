/** Map location encoded in the URL hash */
export interface MapLocation {
  floor?: number;
  zoom?: number;
  lat?: number;
  lng?: number;
}

/** Parses map location from the URL hash (e.g. #floor=2&zoom=3&lat=-12.5&lng=100.3) */
export function parseUrlLocation(): MapLocation {
  const hash = window.location.hash.slice(1);
  const params = new URLSearchParams(hash);
  const result: MapLocation = {};

  const floor = parseInt(params.get('floor') ?? '');
  if (!isNaN(floor)) result.floor = floor;

  const zoom = parseFloat(params.get('zoom') ?? '');
  if (!isNaN(zoom)) result.zoom = zoom;

  const lat = parseFloat(params.get('lat') ?? '');
  if (!isNaN(lat)) result.lat = lat;

  const lng = parseFloat(params.get('lng') ?? '');
  if (!isNaN(lng)) result.lng = lng;

  return result;
}

/** Updates the URL hash with the given map location without adding a browser history entry */
export function updateUrlLocation(location: MapLocation): void {
  const params = new URLSearchParams(window.location.hash.slice(1));

  if (location.floor !== undefined) params.set('floor', String(location.floor));
  if (location.zoom !== undefined) params.set('zoom', String(Math.round(location.zoom)));
  if (location.lat !== undefined) params.set('lat', location.lat.toFixed(4));
  if (location.lng !== undefined) params.set('lng', location.lng.toFixed(4));

  history.replaceState(null, '', '#' + params.toString());
}
