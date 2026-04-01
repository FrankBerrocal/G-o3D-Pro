import React, { useState, useMemo, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, ContactShadows } from '@react-three/drei';
import { SHAPES, ShapeType } from './types';
import { ShapeViewer } from './components/ShapeViewer';
import { cn } from './lib/utils';
import { 
  Box, 
  Circle, 
  Cylinder, 
  Triangle, 
  Square, 
  Layers,
  Calculator,
  Info
} from 'lucide-react';

export default function App() {
  const [selectedShapeId, setSelectedShapeId] = useState<ShapeType>('cube');
  const [unit, setUnit] = useState<'m' | 'cm'>('m');
  
  useEffect(() => {
    document.title = "Géo3D Pro par Frank Berrocal © 2026";
  }, []);

  const [params, setParams] = useState<Record<string, number>>(() => {
    const initialParams: Record<string, number> = {};
    SHAPES.find(s => s.id === 'cube')?.params.forEach(p => {
      initialParams[p.key] = p.default;
    });
    return initialParams;
  });

  // Local state for inputs to allow easier typing (handling empty strings)
  const [inputValues, setInputValues] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    SHAPES.find(s => s.id === 'cube')?.params.forEach(p => {
      initial[p.key] = p.default.toString();
    });
    return initial;
  });

  const selectedShape = useMemo(() => 
    SHAPES.find(s => s.id === selectedShapeId)!, 
    [selectedShapeId]
  );

  const handleShapeChange = (id: ShapeType) => {
    setSelectedShapeId(id);
    const newShape = SHAPES.find(s => s.id === id)!;
    const newParams: Record<string, number> = {};
    const newInputValues: Record<string, string> = {};
    newShape.params.forEach(p => {
      newParams[p.key] = p.default;
      newInputValues[p.key] = p.default.toString();
    });
    setParams(newParams);
    setInputValues(newInputValues);
  };

  const handleParamChange = (key: string, valueStr: string) => {
    setInputValues(prev => ({ ...prev, [key]: valueStr }));
    
    const value = parseFloat(valueStr);
    if (!isNaN(value)) {
      setParams(prev => ({ ...prev, [key]: Math.max(0, value) }));
    }
  };

  const handleSliderChange = (key: string, value: number) => {
    setParams(prev => ({ ...prev, [key]: value }));
    setInputValues(prev => ({ ...prev, [key]: value.toString() }));
  };

  const baseArea = useMemo(() => selectedShape.calculateBaseArea(params), [selectedShape, params]);
  const lateralArea = useMemo(() => selectedShape.calculateLateralArea(params), [selectedShape, params]);
  const totalArea = useMemo(() => selectedShape.calculateTotalArea(params), [selectedShape, params]);
  const volume = useMemo(() => selectedShape.calculateVolume(params), [selectedShape, params]);

  const getIcon = (id: ShapeType) => {
    switch (id) {
      case 'cube': return <Box className="w-5 h-5" />;
      case 'sphere': return <Circle className="w-5 h-5" />;
      case 'cylinder': return <Cylinder className="w-5 h-5" />;
      case 'cone': return <Triangle className="w-5 h-5" />;
      case 'pyramid': return <Triangle className="w-5 h-5" />;
      case 'triangular_pyramid': return <Triangle className="w-5 h-5" />;
      case 'prism': return <Layers className="w-5 h-5" />;
      case 'triangular_prism': return <Layers className="w-5 h-5" />;
      case 'triangular_prism_right': return <Layers className="w-5 h-5" />;
      case 'pentagonal_prism': return <Layers className="w-5 h-5" />;
      case 'hexagonal_prism': return <Layers className="w-5 h-5" />;
      case 'octagonal_prism': return <Layers className="w-5 h-5" />;
      default: return <Box className="w-5 h-5" />;
    }
  };

  const sortedShapes = useMemo(() => 
    [...SHAPES].sort((a, b) => a.name.localeCompare(b.name)),
    []
  );

  const unitLabel = unit;
  const areaUnit = `${unit}²`;
  const volumeUnit = `${unit}³`;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-indigo-500/30">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <Calculator className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-semibold tracking-tight">Géo3D Pro</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex bg-white/5 rounded-lg p-1 border border-white/10">
              <button 
                onClick={() => setUnit('m')}
                className={cn(
                  "px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md transition-all",
                  unit === 'm' ? "bg-indigo-600 text-white" : "text-white/40 hover:text-white"
                )}
              >
                Mètres (m)
              </button>
              <button 
                onClick={() => setUnit('cm')}
                className={cn(
                  "px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md transition-all",
                  unit === 'cm' ? "bg-indigo-600 text-white" : "text-white/40 hover:text-white"
                )}
              >
                Centimètres (cm)
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar / Menu */}
        <div className="lg:col-span-3 space-y-6">
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4 px-2">
              Sélectionner une figure
            </h2>
            <div className="grid grid-cols-1 gap-2">
              {sortedShapes.map((shape) => (
                <button
                  key={shape.id}
                  onClick={() => handleShapeChange(shape.id)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group text-left",
                    selectedShapeId === shape.id 
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" 
                      : "hover:bg-white/5 text-white/60 hover:text-white"
                  )}
                >
                  <span className={cn(
                    "shrink-0 transition-transform duration-300",
                    selectedShapeId === shape.id ? "scale-110" : "group-hover:scale-110"
                  )}>
                    {getIcon(shape.id)}
                  </span>
                  <span className="font-medium text-sm leading-tight">{shape.name}</span>
                </button>
              ))}
            </div>
          </section>

          <section className="p-5 rounded-2xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-2 mb-4 text-indigo-400">
              <Info className="w-4 h-4" />
              <h3 className="text-xs font-bold uppercase tracking-widest">Aide</h3>
            </div>
            <p className="text-xs text-white/50 leading-relaxed">
              Entrez les valeurs manuellement dans les cases ou utilisez les curseurs. Les résultats s'affichent en <span className="text-indigo-400 font-bold">{unit === 'm' ? 'mètres' : 'centimètres'}</span>.
            </p>
          </section>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-6 space-y-8">
          {/* 3D Visualization */}
          <div className="relative aspect-square lg:aspect-video bg-gradient-to-b from-zinc-900 to-black rounded-3xl border border-white/10 overflow-hidden group">
            <div className="absolute inset-0 z-0">
              <Canvas shadows dpr={[1, 2]}>
                <PerspectiveCamera makeDefault position={[5, 5, 5]} fov={50} />
                <OrbitControls makeDefault minDistance={2} maxDistance={20} />
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
                <pointLight position={[-10, -10, -10]} intensity={0.5} />
                
                <ShapeViewer type={selectedShapeId} params={params} />
                
                <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={10} blur={2} far={4.5} />
                <Environment preset="city" />
              </Canvas>
            </div>
            
            <div className="absolute top-6 left-6 z-10">
              <div className="px-3 py-1 bg-black/40 backdrop-blur-md border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-wider text-white/80">
                Visualisation 3D ({unit})
              </div>
            </div>
          </div>

          {/* Parameters Controls */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
            <h2 className="text-lg font-semibold mb-8 flex items-center gap-2">
              Paramètres de {selectedShape.name} ({unit})
            </h2>
            <div className="space-y-8">
              {selectedShape.params.map((p) => (
                <div key={p.key} className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium text-white/70">{p.label} ({unit})</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={inputValues[p.key] || ''}
                        onChange={(e) => handleParamChange(p.key, e.target.value)}
                        className="w-24 text-sm font-mono text-indigo-400 bg-indigo-400/10 px-2 py-1 rounded border border-indigo-400/20 focus:outline-none focus:border-indigo-400 transition-colors text-right pr-6"
                      />
                      <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-white/20 font-mono pointer-events-none">{unit}</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min={p.min}
                    max={p.max}
                    step={p.step}
                    value={params[p.key]}
                    onChange={(e) => handleSliderChange(p.key, parseFloat(e.target.value))}
                    className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-500 hover:accent-indigo-400 transition-all"
                  />
                  <div className="flex justify-between text-[10px] text-white/30 font-mono">
                    <span>{p.min}</span>
                    <span>{p.max}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-indigo-600 rounded-3xl p-6 shadow-2xl shadow-indigo-600/20 relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
            
            <div className="relative z-10 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-indigo-200 text-[10px] font-bold uppercase tracking-widest mb-1">Abas</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl font-bold tracking-tighter">{baseArea.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                    <span className="text-indigo-200 text-[10px] font-medium">{areaUnit}</span>
                  </div>
                </div>
                <div>
                  <p className="text-indigo-200 text-[10px] font-bold uppercase tracking-widest mb-1">Alat</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl font-bold tracking-tighter">{lateralArea.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                    <span className="text-indigo-200 text-[10px] font-medium">{areaUnit}</span>
                  </div>
                </div>
              </div>

              <div className="h-px bg-white/20" />

              <div>
                <p className="text-indigo-200 text-xs font-bold uppercase tracking-widest mb-1">Aire Totale</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold tracking-tighter">{totalArea.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                  <span className="text-indigo-200 text-sm font-medium">{areaUnit}</span>
                </div>
              </div>

              <div className="h-px bg-white/20" />

              <div>
                <p className="text-indigo-200 text-xs font-bold uppercase tracking-widest mb-1">Volume</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold tracking-tighter">{volume.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                  <span className="text-indigo-200 text-sm font-medium">{volumeUnit}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-white/40">Formules détaillées</h3>
            <div className="space-y-3">
              <div className="p-3 bg-black/20 rounded-xl border border-white/5">
                <p className="text-[10px] text-white/40 uppercase mb-1">Aire Base</p>
                <code className="text-xs text-indigo-300 block whitespace-pre-line">{selectedShape.formulas.base}</code>
              </div>
              <div className="p-3 bg-black/20 rounded-xl border border-white/5">
                <p className="text-[10px] text-white/40 uppercase mb-1">Aire Latérale</p>
                <code className="text-xs text-indigo-300 block whitespace-pre-line">{selectedShape.formulas.lateral}</code>
              </div>
              <div className="p-3 bg-black/20 rounded-xl border border-white/5">
                <p className="text-[10px] text-white/40 uppercase mb-1">Aire Totale</p>
                <code className="text-xs text-indigo-300 block whitespace-pre-line">{selectedShape.formulas.total}</code>
              </div>
              <div className="p-3 bg-black/20 rounded-xl border border-white/5">
                <p className="text-[10px] text-white/40 uppercase mb-1">Volume</p>
                <code className="text-xs text-indigo-300 block whitespace-pre-line">{selectedShape.formulas.volume}</code>
              </div>
            </div>
          </div>
        </div>

        {/* Glossary Panel */}
        <div className="lg:col-span-12 mt-8">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
            <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <Info className="w-5 h-5 text-indigo-400" />
              Glossaire des formules
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              <div className="space-y-1">
                <p className="text-indigo-400 font-mono font-bold">C</p>
                <p className="text-xs text-white/60">côté (ou arête)</p>
              </div>
              <div className="space-y-1">
                <p className="text-indigo-400 font-mono font-bold">B</p>
                <p className="text-xs text-white/60">base (côté de la base)</p>
              </div>
              <div className="space-y-1">
                <p className="text-indigo-400 font-mono font-bold">Lon</p>
                <p className="text-xs text-white/60">longueur</p>
              </div>
              <div className="space-y-1">
                <p className="text-indigo-400 font-mono font-bold">lar</p>
                <p className="text-xs text-white/60">largeur</p>
              </div>
              <div className="space-y-1">
                <p className="text-indigo-400 font-mono font-bold">H</p>
                <p className="text-xs text-white/60">hauteur du solide</p>
              </div>
              <div className="space-y-1">
                <p className="text-indigo-400 font-mono font-bold">R</p>
                <p className="text-xs text-white/60">rayon</p>
              </div>
              <div className="space-y-1">
                <p className="text-indigo-400 font-mono font-bold">Pb</p>
                <p className="text-xs text-white/60">périmètre de la base</p>
              </div>
              <div className="space-y-1">
                <p className="text-indigo-400 font-mono font-bold">Abas</p>
                <p className="text-xs text-white/60">aire de la base</p>
              </div>
              <div className="space-y-1">
                <p className="text-indigo-400 font-mono font-bold">Alat</p>
                <p className="text-xs text-white/60">aire latérale</p>
              </div>
              <div className="space-y-1">
                <p className="text-indigo-400 font-mono font-bold">Apo</p>
                <p className="text-xs text-white/60">apothème (hauteur latérale pyramide)</p>
              </div>
              <div className="space-y-1">
                <p className="text-indigo-400 font-mono font-bold">Gén</p>
                <p className="text-xs text-white/60">génératrice du cône (g = √(r² + h²))</p>
              </div>
              <div className="space-y-1">
                <p className="text-indigo-400 font-mono font-bold">h_tri</p>
                <p className="text-xs text-white/60">hauteur du triangle (base)</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-6 py-12 border-t border-white/10 mt-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 opacity-50">
            <Calculator className="w-4 h-4" />
            <span className="text-xs font-medium">Frank Berrocal © 2026</span>
          </div>
          <div className="flex gap-8 text-[10px] uppercase tracking-widest font-bold text-white/30">
            <a href="#" className="hover:text-white transition-colors">Confidentialité</a>
            <a href="#" className="hover:text-white transition-colors">Conditions</a>
            <a href="#" className="hover:text-white transition-colors">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
