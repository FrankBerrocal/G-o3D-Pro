export type ShapeType = 
  | 'cube' 
  | 'sphere' 
  | 'cylinder' 
  | 'cone' 
  | 'pyramid' 
  | 'prism' 
  | 'triangular_pyramid'
  | 'triangular_prism'
  | 'triangular_prism_right'
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
    params: [{ label: 'Côté (C)', key: 'C', min: 0.1, max: 10, step: 0.1, default: 2 }],
    formulas: {
      base: 'C²',
      lateral: '4 × C²',
      total: '6 × C²',
      volume: 'C³',
    },
    calculateBaseArea: (p) => Math.pow(p.C, 2),
    calculateLateralArea: (p) => 4 * Math.pow(p.C, 2),
    calculateTotalArea: (p) => 6 * Math.pow(p.C, 2),
    calculateVolume: (p) => Math.pow(p.C, 3),
  },
  {
    id: 'sphere',
    name: 'Sphère',
    params: [{ label: 'Rayon (R)', key: 'R', min: 0.1, max: 10, step: 0.1, default: 2 }],
    formulas: {
      base: 'N/A',
      lateral: '4 × π × R²',
      total: '4 × π × R²',
      volume: '(4/3) × π × R³',
    },
    calculateBaseArea: () => 0,
    calculateLateralArea: (p) => 4 * Math.PI * Math.pow(p.R, 2),
    calculateTotalArea: (p) => 4 * Math.PI * Math.pow(p.R, 2),
    calculateVolume: (p) => (4 / 3) * Math.PI * Math.pow(p.R, 3),
  },
  {
    id: 'cylinder',
    name: 'Cylindre',
    params: [
      { label: 'Rayon (R)', key: 'R', min: 0.1, max: 10, step: 0.1, default: 2 },
      { label: 'Hauteur (H)', key: 'H', min: 0.1, max: 10, step: 0.1, default: 4 },
    ],
    formulas: {
      base: 'π × R²',
      lateral: '2 × π × R × H',
      total: '2 × π × R × (R + H)',
      volume: 'π × R² × H',
    },
    calculateBaseArea: (p) => Math.PI * Math.pow(p.R, 2),
    calculateLateralArea: (p) => 2 * Math.PI * p.R * p.H,
    calculateTotalArea: (p) => 2 * Math.PI * p.R * (p.R + p.H),
    calculateVolume: (p) => Math.PI * Math.pow(p.R, 2) * p.H,
  },
  {
    id: 'cone',
    name: 'Cône',
    params: [
      { label: 'Rayon (R)', key: 'R', min: 0.1, max: 10, step: 0.1, default: 2 },
      { label: 'Hauteur (H)', key: 'H', min: 0.1, max: 10, step: 0.1, default: 4 },
    ],
    formulas: {
      base: 'π × R²',
      lateral: 'π × R × Gén\n(Gén = √(R² + H²))',
      total: 'π × R × (R + Gén)',
      volume: '(1/3) × π × R² × H',
    },
    calculateBaseArea: (p) => Math.PI * Math.pow(p.R, 2),
    calculateLateralArea: (p) => {
      const Gén = Math.sqrt(Math.pow(p.R, 2) + Math.pow(p.H, 2));
      return Math.PI * p.R * Gén;
    },
    calculateTotalArea: (p) => {
      const Gén = Math.sqrt(Math.pow(p.R, 2) + Math.pow(p.H, 2));
      return Math.PI * p.R * (p.R + Gén);
    },
    calculateVolume: (p) => (1 / 3) * Math.PI * Math.pow(p.R, 2) * p.H,
  },
  {
    id: 'pyramid',
    name: 'Pyramide (Base Carrée)',
    params: [
      { label: 'Côté base (C)', key: 'C', min: 0.1, max: 10, step: 0.1, default: 4 },
      { label: 'Hauteur (H)', key: 'H', min: 0.1, max: 10, step: 0.1, default: 4 },
    ],
    formulas: {
      base: 'C²',
      lateral: '2 × C × Apo\n(Apo = √((C/2)² + H²))',
      total: 'Abas + Alat',
      volume: '(1/3) × Abas × H',
    },
    calculateBaseArea: (p) => Math.pow(p.C, 2),
    calculateLateralArea: (p) => {
      const Apo = Math.sqrt(Math.pow(p.C / 2, 2) + Math.pow(p.H, 2));
      return 2 * p.C * Apo;
    },
    calculateTotalArea: (p) => {
      const Apo = Math.sqrt(Math.pow(p.C / 2, 2) + Math.pow(p.H, 2));
      return Math.pow(p.C, 2) + 2 * p.C * Apo;
    },
    calculateVolume: (p) => (1 / 3) * Math.pow(p.C, 2) * p.H,
  },
  {
    id: 'triangular_pyramid',
    name: 'Pyramide (Base Triangulaire)',
    params: [
      { label: 'Côté base (C)', key: 'C', min: 0.1, max: 10, step: 0.1, default: 4 },
      { label: 'Hauteur (H)', key: 'H', min: 0.1, max: 10, step: 0.1, default: 4 },
    ],
    formulas: {
      base: '(√3/4) × C²',
      lateral: '3 × (1/2) × C × Apo\n(Apo = √(H² + (C√3/6)²))',
      total: 'Abas + Alat',
      volume: '(1/3) × Abas × H',
    },
    calculateBaseArea: (p) => (Math.sqrt(3) / 4) * Math.pow(p.C, 2),
    calculateLateralArea: (p) => {
      const Apo = Math.sqrt(Math.pow(p.H, 2) + Math.pow((p.C * Math.sqrt(3)) / 6, 2));
      return 3 * 0.5 * p.C * Apo;
    },
    calculateTotalArea: (p) => {
      const Abas = (Math.sqrt(3) / 4) * Math.pow(p.C, 2);
      const Apo = Math.sqrt(Math.pow(p.H, 2) + Math.pow((p.C * Math.sqrt(3)) / 6, 2));
      const Alat = 3 * 0.5 * p.C * Apo;
      return Abas + Alat;
    },
    calculateVolume: (p) => (1 / 3) * ((Math.sqrt(3) / 4) * Math.pow(p.C, 2)) * p.H,
  },
  {
    id: 'prism',
    name: 'Prisme Rectangulaire',
    params: [
      { label: 'Longueur (Lon)', key: 'Lon', min: 0.1, max: 10, step: 0.1, default: 4 },
      { label: 'Largeur (lar)', key: 'lar', min: 0.1, max: 10, step: 0.1, default: 3 },
      { label: 'Hauteur (H)', key: 'H', min: 0.1, max: 10, step: 0.1, default: 2 },
    ],
    formulas: {
      base: 'Lon × lar',
      lateral: '2 × H × (Lon + lar)',
      total: '2 × (Lon×lar + lar×H + Lon×H)',
      volume: 'Lon × lar × H',
    },
    calculateBaseArea: (p) => p.Lon * p.lar,
    calculateLateralArea: (p) => 2 * p.H * (p.Lon + p.lar),
    calculateTotalArea: (p) => 2 * (p.Lon * p.lar + p.lar * p.H + p.Lon * p.H),
    calculateVolume: (p) => p.Lon * p.lar * p.H,
  },
  {
    id: 'triangular_prism',
    name: 'Prisme Triangulaire (Base Équilatérale)',
    params: [
      { label: 'Côté base (C)', key: 'C', min: 0.1, max: 10, step: 0.1, default: 4 },
      { label: 'Hauteur prisme (H)', key: 'H', min: 0.1, max: 10, step: 0.1, default: 5 },
    ],
    formulas: {
      base: '(√3/4) × C²',
      lateral: '(C + C + C) × H',
      total: '(2 × Abas) + Alat',
      volume: 'Abas × H',
    },
    calculateBaseArea: (p) => (Math.sqrt(3) / 4) * Math.pow(p.C, 2),
    calculateLateralArea: (p) => 3 * p.C * p.H,
    calculateTotalArea: (p) => {
      const Abas = (Math.sqrt(3) / 4) * Math.pow(p.C, 2);
      const Alat = 3 * p.C * p.H;
      return 2 * Abas + Alat;
    },
    calculateVolume: (p) => ((Math.sqrt(3) / 4) * Math.pow(p.C, 2)) * p.H,
  },
  {
    id: 'triangular_prism_right',
    name: 'Prisme Triangulaire (Base Isocèle)',
    params: [
      { label: 'Base triangle (b)', key: 'b', min: 0.1, max: 10, step: 0.1, default: 4 },
      { label: 'Hauteur triangle (h_tri)', key: 'h_tri', min: 0.1, max: 10, step: 0.1, default: 3.46 },
      { label: 'Longueur (Lon)', key: 'Lon', min: 0.1, max: 10, step: 0.1, default: 10 },
    ],
    formulas: {
      base: '(b × h_tri) / 2',
      lateral: 'Pb × Lon\n(Pb = b + 2 × √((b/2)² + h_tri²))',
      total: '(2 × Abas) + Alat',
      volume: 'Abas × Lon',
    },
    calculateBaseArea: (p) => (p.b * p.h_tri) / 2,
    calculateLateralArea: (p) => {
      const side = Math.sqrt(Math.pow(p.b / 2, 2) + Math.pow(p.h_tri, 2));
      const Pb = p.b + 2 * side;
      return Pb * p.Lon;
    },
    calculateTotalArea: (p) => {
      const Abas = (p.b * p.h_tri) / 2;
      const side = Math.sqrt(Math.pow(p.b / 2, 2) + Math.pow(p.h_tri, 2));
      const Pb = p.b + 2 * side;
      const Alat = Pb * p.Lon;
      return 2 * Abas + Alat;
    },
    calculateVolume: (p) => ((p.b * p.h_tri) / 2) * p.Lon,
  },
  {
    id: 'pentagonal_prism',
    name: 'Prisme Pentagonal',
    params: [
      { label: 'Côté base (C)', key: 'C', min: 0.1, max: 10, step: 0.1, default: 4 },
      { label: 'Hauteur (H)', key: 'H', min: 0.1, max: 10, step: 0.1, default: 4 },
    ],
    formulas: {
      base: '(1/4) × √(5(5+2√5)) × C²',
      lateral: '5 × C × H',
      total: '(2 × Abas) + Alat',
      volume: 'Abas × H',
    },
    calculateBaseArea: (p) => 0.25 * Math.sqrt(5 * (5 + 2 * Math.sqrt(5))) * Math.pow(p.C, 2),
    calculateLateralArea: (p) => 5 * p.C * p.H,
    calculateTotalArea: (p) => 2 * (0.25 * Math.sqrt(5 * (5 + 2 * Math.sqrt(5))) * Math.pow(p.C, 2)) + 5 * p.C * p.H,
    calculateVolume: (p) => (0.25 * Math.sqrt(5 * (5 + 2 * Math.sqrt(5))) * Math.pow(p.C, 2)) * p.H,
  },
  {
    id: 'hexagonal_prism',
    name: 'Prisme Hexagonal',
    params: [
      { label: 'Côté base (C)', key: 'C', min: 0.1, max: 10, step: 0.1, default: 4 },
      { label: 'Hauteur (H)', key: 'H', min: 0.1, max: 10, step: 0.1, default: 4 },
    ],
    formulas: {
      base: '(3√3/2) × C²',
      lateral: '6 × C × H',
      total: '(2 × Abas) + Alat',
      volume: 'Abas × H',
    },
    calculateBaseArea: (p) => (3 * Math.sqrt(3) / 2) * Math.pow(p.C, 2),
    calculateLateralArea: (p) => 6 * p.C * p.H,
    calculateTotalArea: (p) => 2 * ((3 * Math.sqrt(3) / 2) * Math.pow(p.C, 2)) + 6 * p.C * p.H,
    calculateVolume: (p) => ((3 * Math.sqrt(3) / 2) * Math.pow(p.C, 2)) * p.H,
  },
  {
    id: 'octagonal_prism',
    name: 'Prisme Octagonal',
    params: [
      { label: 'Côté base (C)', key: 'C', min: 0.1, max: 10, step: 0.1, default: 4 },
      { label: 'Hauteur (H)', key: 'H', min: 0.1, max: 10, step: 0.1, default: 4 },
    ],
    formulas: {
      base: '2(1+√2) × C²',
      lateral: '8 × C × H',
      total: '(2 × Abas) + Alat',
      volume: 'Abas × H',
    },
    calculateBaseArea: (p) => 2 * (1 + Math.sqrt(2)) * Math.pow(p.C, 2),
    calculateLateralArea: (p) => 8 * p.C * p.H,
    calculateTotalArea: (p) => 2 * (2 * (1 + Math.sqrt(2)) * Math.pow(p.C, 2)) + 8 * p.C * p.H,
    calculateVolume: (p) => (2 * (1 + Math.sqrt(2)) * Math.pow(p.C, 2)) * p.H,
  },
];
