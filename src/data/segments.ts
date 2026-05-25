// ⬇ Edit values here to change Plan / Fact / title / color of any column.
//    `featured: true` makes a column larger and brought visually forward.
export type SegmentColor = 'blue' | 'orange' | 'purple';

export interface Segment {
  id: string;
  title: string;
  color: SegmentColor;
  plan: number;   // billion ₽
  fact: number;   // billion ₽
  featured?: boolean;
}

export const segments: Segment[] = [
  { id: 'pp',    title: 'ПО ПП',          color: 'blue',   plan: 56.8, fact: 42.35 },
  { id: 'total', title: 'ОБЩЕЕ ЗАДАНИЕ',  color: 'orange', plan: 56.8, fact: 42.35, featured: true },
  { id: 'vts',   title: 'ПО ВТС',         color: 'purple', plan: 56.8, fact: 42.35 },
];

// ⬇ Sand palette per column. `light` is the top of the gradient, `deep` the bottom.
//    `glow` controls the soft halo around the stream.
export const palettes: Record<SegmentColor, {
  light: string; deep: string; glow: string; ring: string; chip: string;
}> = {
  blue: {
    light: '#54C4FF',
    deep:  '#1478FF',
    glow:  'rgba(20, 120, 255, 0.45)',
    ring:  '#3FA9FF',
    chip:  '#1478FF',
  },
  orange: {
    light: '#FFBA5A',
    deep:  '#FF7A17',
    glow:  'rgba(255, 122, 23, 0.50)',
    ring:  '#FF9433',
    chip:  '#FF7A17',
  },
  purple: {
    light: '#C578FF',
    deep:  '#8F38FF',
    glow:  'rgba(143, 56, 255, 0.45)',
    ring:  '#A864FF',
    chip:  '#8F38FF',
  },
};

// Plan progress as a fraction in [0, 1].
export const progressOf = (s: Segment) => s.fact / s.plan;

// Format like "56,80" (Russian decimal comma, two decimals).
export const ru = (n: number) => n.toFixed(2).replace('.', ',');
