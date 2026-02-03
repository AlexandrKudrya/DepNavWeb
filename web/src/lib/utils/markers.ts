import type { MarkerType, Language } from '../types';

/** Marker type display info */
interface MarkerTypeInfo {
  icon: string;
  color: string;
  label: {
    ru: string;
    en: string;
  };
}

/** Marker type configuration */
export const MARKER_TYPES: Record<MarkerType, MarkerTypeInfo> = {
  ROOM: {
    icon: 'room',
    color: '#006781', // primary
    label: { ru: 'Комната', en: 'Room' },
  },
  ENTRANCE: {
    icon: 'entrance',
    color: '#2196F3',
    label: { ru: 'Вход', en: 'Entrance' },
  },
  STAIRS_UP: {
    icon: 'stairs-up',
    color: '#FF9800',
    label: { ru: 'Лестница вверх', en: 'Stairs up' },
  },
  STAIRS_DOWN: {
    icon: 'stairs-down',
    color: '#FF9800',
    label: { ru: 'Лестница вниз', en: 'Stairs down' },
  },
  STAIRS_BOTH: {
    icon: 'stairs',
    color: '#FF9800',
    label: { ru: 'Лестница', en: 'Stairs' },
  },
  ELEVATOR: {
    icon: 'elevator',
    color: '#9C27B0',
    label: { ru: 'Лифт', en: 'Elevator' },
  },
  WC_MAN: {
    icon: 'wc-man',
    color: '#00BCD4',
    label: { ru: 'М туалет', en: 'Men WC' },
  },
  WC_WOMAN: {
    icon: 'wc-woman',
    color: '#E91E63',
    label: { ru: 'Ж туалет', en: 'Women WC' },
  },
  WC: {
    icon: 'wc',
    color: '#00BCD4',
    label: { ru: 'Туалет', en: 'WC' },
  },
  OTHER: {
    icon: 'other',
    color: '#9E9E9E',
    label: { ru: 'Другое', en: 'Other' },
  },
};

/** Get marker type info */
export function getMarkerTypeInfo(type: MarkerType): MarkerTypeInfo {
  return MARKER_TYPES[type] ?? MARKER_TYPES.OTHER;
}

/** Get marker label in given language */
export function getMarkerTypeLabel(type: MarkerType, lang: Language): string {
  return getMarkerTypeInfo(type).label[lang];
}

/** Get marker icon path */
export function getMarkerIconPath(type: MarkerType): string {
  const info = getMarkerTypeInfo(type);
  return `/icons/${info.icon}.svg`;
}
