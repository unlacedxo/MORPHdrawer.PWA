export type Motif = {
  id: string;
  name: string;
  svgPath: string; // SVG path data
};

export const MOTIF_POOL: Motif[] = [
  { id: 'eye', name: 'The Watching Eye', svgPath: 'M12 5 C6 5 2 12 2 12 C2 12 6 19 12 19 C18 19 22 12 22 12 C22 12 18 5 12 5 Z M12 15 A3 3 0 1 1 12 9 A3 3 0 1 1 12 15 Z' },
  { id: 'star', name: 'Wandering Star', svgPath: 'M12 2 L13.8 8.2 L20 8.2 L15 12 L16.8 18.2 L12 14.8 L7.2 18.2 L9 12 L4 8.2 L10.2 8.2 Z' },
  { id: 'spiral', name: 'The Coil', svgPath: 'M12 12 C12 10 14 8 16 10 C18 12 16 16 12 16 C8 16 6 12 8 9 C10 6 15 7 16 10' },
  { id: 'crescent', name: 'Moon Fragment', svgPath: 'M12 3 A9 9 0 1 0 12 21 A6 6 0 1 1 12 3 Z' },
  { id: 'moth', name: 'Moth Wing', svgPath: 'M12 12 C10 8 4 6 3 10 C2 14 8 16 12 12 M12 12 C14 8 20 6 21 10 C22 14 16 16 12 12' },
  { id: 'sigil', name: 'The Binding Sigil', svgPath: 'M12 3 L12 21 M3 12 L21 12 M5.6 5.6 L18.4 18.4 M18.4 5.6 L5.6 18.4' },
  { id: 'teeth', name: 'Tooth Pattern', svgPath: 'M2 8 L4 4 L6 8 L8 4 L10 8 L12 4 L14 8 L16 4 L18 8 L20 4 L22 8' },
  { id: 'stitch', name: 'Old Stitch', svgPath: 'M3 6 L7 6 M10 6 L14 6 M17 6 L21 6 M3 12 L7 12 M10 12 L14 12 M17 12 L21 12' },
];

export function assignMotif(): string {
  return MOTIF_POOL[Math.floor(Math.random() * MOTIF_POOL.length)].id;
}
