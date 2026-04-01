export type ShapeType = 
  | 'cube' 
  | 'sphere' 
  | 'cylinder' 
  | 'cone' 
  | 'pyramid' 
  | 'prism' 
  | 'triangular_pyramid'
  | 'triangular_prism'
  | 'pentagonal_prism'
  | 'hexagonal_prism'
  | 'octagonal_prism';

export interface ShapeData {
  id: ShapeType;
  name: string;
  params: {
    label: string;
    key: string;
    min: number;
    max: number;
    step: number;
    default: number;
  }[];
  formulas: {
    base: string;
    lateral: string;
    total: string;
    volume: string;
  };
  calculateBaseArea: (params: Record<string, number>) => number;
  calculateLateralArea: (params: Record<string, number>) => number;
  calculateTotalArea: (params: Record<string, number>) => number;
  calculateVolume: (params: Record<string, number>) => number;
}

export const SHAPES: ShapeData[] = [
  {
    id: 'cube',
    name: 'Cube',
    params: [{ label: 'Côté (a)', key: 'a', min: 0.1, max: 10, step: 0.1, default: 2 }],
    formulas: {
      base: 'a²',
      lateral: '4 × a²',
      total: '6 × a²',
      volume: 'a³',
    },
    calculateBaseArea: (p) => Math.pow(p.a, 2),
    calculateLateralArea: (p) => 4 * Math.pow(p.a, 2),
    calculateTotalArea: (p) => 6 * Math.pow(p.a, 2),
    calculateVolume: (p) => Math.pow(p.a, 3),
  },
  {
    id: 'sphere',
    name: 'Sphère',
    params: [{ label: 'Rayon (r)', key: 'r', min: 0.1, max: 10, step: 0.1, default: 2 }],
    formulas: {
      base: 'N/A',
      lateral: '4 × π × r²',
      total: '4 × π × r²',
      volume: '(4/3) × π × r³',
    },
    calculateBaseArea: () => 0,
    calculateLateralArea: (p) => 4 * Math.PI * Math.pow(p.r, 2),
    calculateTotalArea: (p) => 4 * Math.PI * Math.pow(p.r, 2),
    calculateVolume: (p) => (4 / 3) * Math.PI * Math.pow(p.r, 3),
  },
  {
    id: 'cylinder',
    name: 'Cylindre',
    params: [
      { label: 'Rayon (r)', key: 'r', min: 0.1, max: 10, step: 0.1, default: 2 },
      { label: 'Hauteur (h)', key: 'h', min: 0.1, max: 10, step: 0.1, default: 4 },
    ],
    formulas: {
      base: 'π × r²',
      lateral: '2 × π × r × h',
      total: '2 × π × r × (r + h)',
      volume: 'π × r² × h',
    },
    calculateBaseArea: (p) => Math.PI * Math.pow(p.r, 2),
    calculateLateralArea: (p) => 2 * Math.PI * p.r * p.h,
    calculateTotalArea: (p) => 2 * Math.PI * p.r * (p.r + p.h),
    calculateVolume: (p) => Math.PI * Math.pow(p.r, 2) * p.h,
  },
  {
    id: 'cone',
    name: 'Cône',
    params: [
      { label: 'Rayon (r)', key: 'r', min: 0.1, max: 10, step: 0.1, default: 2 },
      { label: 'Hauteur (h)', key: 'h', min: 0.1, max: 10, step: 0.1, default: 4 },
    ],
    formulas: {
      base: 'π × r²',
      lateral: 'π × r × s (s = √(r² + h²))',
      total: 'π × r × (r + s)',
      volume: '(1/3) × π × r² × h',
    },
    calculateBaseArea: (p) => Math.PI * Math.pow(p.r, 2),
    calculateLateralArea: (p) => {
      const s = Math.sqrt(Math.pow(p.r, 2) + Math.pow(p.h, 2));
      return Math.PI * p.r * s;
    },
    calculateTotalArea: (p) => {
      const s = Math.sqrt(Math.pow(p.r, 2) + Math.pow(p.h, 2));
      return Math.PI * p.r * (p.r + s);
    },
    calculateVolume: (p) => (1 / 3) * Math.PI * Math.pow(p.r, 2) * p.h,
  },
  {
    id: 'pyramid',
    name: 'Pyramide (Base Carrée)',
    params: [
      { label: 'Côté base (a)', key: 'a', min: 0.1, max: 10, step: 0.1, default: 4 },
      { label: 'Hauteur (h)', key: 'h', min: 0.1, max: 10, step: 0.1, default: 4 },
    ],
    formulas: {
      base: 'a²',
      lateral: '2 × a × s (s = √((a/2)² + h²))',
      total: 'a² + 2 × a × s',
      volume: '(1/3) × a² × h',
    },
    calculateBaseArea: (p) => Math.pow(p.a, 2),
    calculateLateralArea: (p) => {
      const s = Math.sqrt(Math.pow(p.a / 2, 2) + Math.pow(p.h, 2));
      return 2 * p.a * s;
    },
    calculateTotalArea: (p) => {
      const s = Math.sqrt(Math.pow(p.a / 2, 2) + Math.pow(p.h, 2));
      return Math.pow(p.a, 2) + 2 * p.a * s;
    },
    calculateVolume: (p) => (1 / 3) * Math.pow(p.a, 2) * p.h,
  },
  {
    id: 'triangular_pyramid',
    name: 'Pyramide (Base Triangulaire)',
    params: [
      { label: 'Côté base (a)', key: 'a', min: 0.1, max: 10, step: 0.1, default: 4 },
      { label: 'Hauteur (h)', key: 'h', min: 0.1, max: 10, step: 0.1, default: 4 },
    ],
    formulas: {
      base: '(√3/4) × a²',
      lateral: '3 × (1/2) × a × s (s = √(h² + (a√3/6)²))',
      total: 'Base + Latérale',
      volume: '(1/3) × Base × h',
    },
    calculateBaseArea: (p) => (Math.sqrt(3) / 4) * Math.pow(p.a, 2),
    calculateLateralArea: (p) => {
      const s = Math.sqrt(Math.pow(p.h, 2) + Math.pow((p.a * Math.sqrt(3)) / 6, 2));
      return 3 * 0.5 * p.a * s;
    },
    calculateTotalArea: (p) => {
      const base = (Math.sqrt(3) / 4) * Math.pow(p.a, 2);
      const s = Math.sqrt(Math.pow(p.h, 2) + Math.pow((p.a * Math.sqrt(3)) / 6, 2));
      const lateral = 3 * 0.5 * p.a * s;
      return base + lateral;
    },
    calculateVolume: (p) => (1 / 3) * ((Math.sqrt(3) / 4) * Math.pow(p.a, 2)) * p.h,
  },
  {
    id: 'prism',
    name: 'Prisme Rectangulaire',
    params: [
      { label: 'Longueur (L)', key: 'l', min: 0.1, max: 10, step: 0.1, default: 4 },
      { label: 'Largeur (w)', key: 'w', min: 0.1, max: 10, step: 0.1, default: 3 },
      { label: 'Hauteur (h)', key: 'h', min: 0.1, max: 10, step: 0.1, default: 2 },
    ],
    formulas: {
      base: 'L × w',
      lateral: '2 × h × (L + w)',
      total: '2 × (Lw + wh + Lh)',
      volume: 'L × w × h',
    },
    calculateBaseArea: (p) => p.l * p.w,
    calculateLateralArea: (p) => 2 * p.h * (p.l + p.w),
    calculateTotalArea: (p) => 2 * (p.l * p.w + p.w * p.h + p.l * p.h),
    calculateVolume: (p) => p.l * p.w * p.h,
  },
  {
    id: 'triangular_prism',
    name: 'Prisme Triangulaire',
    params: [
      { label: 'Base triangle (b)', key: 'b', min: 0.1, max: 10, step: 0.1, default: 4 },
      { label: 'Hauteur triangle (hb)', key: 'hb', min: 0.1, max: 10, step: 0.1, default: 3 },
      { label: 'Hauteur prisme (h)', key: 'h', min: 0.1, max: 10, step: 0.1, default: 5 },
    ],
    formulas: {
      base: '(b × hb) / 2',
      lateral: '(b + hb + √(b² + hb²)) × h',
      total: '2 × Base + Latérale',
      volume: 'Base × h',
    },
    calculateBaseArea: (p) => (p.b * p.hb) / 2,
    calculateLateralArea: (p) => {
      const hyp = Math.sqrt(Math.pow(p.b, 2) + Math.pow(p.hb, 2));
      return (p.b + p.hb + hyp) * p.h;
    },
    calculateTotalArea: (p) => {
      const base = (p.b * p.hb) / 2;
      const hyp = Math.sqrt(Math.pow(p.b, 2) + Math.pow(p.hb, 2));
      const lateral = (p.b + p.hb + hyp) * p.h;
      return 2 * base + lateral;
    },
    calculateVolume: (p) => ((p.b * p.hb) / 2) * p.h,
  },
  {
    id: 'pentagonal_prism',
    name: 'Prisme Pentagonal',
    params: [
      { label: 'Côté base (a)', key: 'a', min: 0.1, max: 10, step: 0.1, default: 4 },
      { label: 'Hauteur (h)', key: 'h', min: 0.1, max: 10, step: 0.1, default: 4 },
    ],
    formulas: {
      base: '(1/4) × √(5(5+2√5)) × a²',
      lateral: '5 × a × h',
      total: '2 × Base + Latérale',
      volume: 'Base × h',
    },
    calculateBaseArea: (p) => 0.25 * Math.sqrt(5 * (5 + 2 * Math.sqrt(5))) * Math.pow(p.a, 2),
    calculateLateralArea: (p) => 5 * p.a * p.h,
    calculateTotalArea: (p) => 2 * (0.25 * Math.sqrt(5 * (5 + 2 * Math.sqrt(5))) * Math.pow(p.a, 2)) + 5 * p.a * p.h,
    calculateVolume: (p) => (0.25 * Math.sqrt(5 * (5 + 2 * Math.sqrt(5))) * Math.pow(p.a, 2)) * p.h,
  },
  {
    id: 'hexagonal_prism',
    name: 'Prisme Hexagonal',
    params: [
      { label: 'Côté base (a)', key: 'a', min: 0.1, max: 10, step: 0.1, default: 4 },
      { label: 'Hauteur (h)', key: 'h', min: 0.1, max: 10, step: 0.1, default: 4 },
    ],
    formulas: {
      base: '(3√3/2) × a²',
      lateral: '6 × a × h',
      total: '2 × Base + Latérale',
      volume: 'Base × h',
    },
    calculateBaseArea: (p) => (3 * Math.sqrt(3) / 2) * Math.pow(p.a, 2),
    calculateLateralArea: (p) => 6 * p.a * p.h,
    calculateTotalArea: (p) => 2 * ((3 * Math.sqrt(3) / 2) * Math.pow(p.a, 2)) + 6 * p.a * p.h,
    calculateVolume: (p) => ((3 * Math.sqrt(3) / 2) * Math.pow(p.a, 2)) * p.h,
  },
  {
    id: 'octagonal_prism',
    name: 'Prisme Octagonal',
    params: [
      { label: 'Côté base (a)', key: 'a', min: 0.1, max: 10, step: 0.1, default: 4 },
      { label: 'Hauteur (h)', key: 'h', min: 0.1, max: 10, step: 0.1, default: 4 },
    ],
    formulas: {
      base: '2(1+√2) × a²',
      lateral: '8 × a × h',
      total: '2 × Base + Latérale',
      volume: 'Base × h',
    },
    calculateBaseArea: (p) => 2 * (1 + Math.sqrt(2)) * Math.pow(p.a, 2),
    calculateLateralArea: (p) => 8 * p.a * p.h,
    calculateTotalArea: (p) => 2 * (2 * (1 + Math.sqrt(2)) * Math.pow(p.a, 2)) + 8 * p.a * p.h,
    calculateVolume: (p) => (2 * (1 + Math.sqrt(2)) * Math.pow(p.a, 2)) * p.h,
  },
];
