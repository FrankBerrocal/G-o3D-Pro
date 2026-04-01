export type ShapeType = 'cube' | 'sphere' | 'cylinder' | 'cone' | 'pyramid' | 'prism';

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
    id: 'prism',
    name: 'Prisme Rectangulaire',
    params: [
      { label: 'Largeur (w)', key: 'w', min: 0.1, max: 10, step: 0.1, default: 4 },
      { label: 'Hauteur (h)', key: 'h', min: 0.1, max: 10, step: 0.1, default: 2 },
      { label: 'Profondeur (d)', key: 'd', min: 0.1, max: 10, step: 0.1, default: 3 },
    ],
    formulas: {
      base: 'w × d',
      lateral: '2 × h × (w + d)',
      total: '2 × (wh + hd + wd)',
      volume: 'w × h × d',
    },
    calculateBaseArea: (p) => p.w * p.d,
    calculateLateralArea: (p) => 2 * p.h * (p.w + p.d),
    calculateTotalArea: (p) => 2 * (p.w * p.h + p.h * p.d + p.w * p.d),
    calculateVolume: (p) => p.w * p.h * p.d,
  },
];
