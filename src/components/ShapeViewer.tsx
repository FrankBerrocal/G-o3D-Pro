import React from 'react';
import { ShapeType } from '../types';

interface ShapeViewerProps {
  type: ShapeType;
  params: Record<string, number>;
}

export const ShapeViewer: React.FC<ShapeViewerProps> = ({ type, params }) => {
  switch (type) {
    case 'cube':
      return (
        <mesh>
          <boxGeometry args={[params.a, params.a, params.a]} />
          <meshStandardMaterial color="#4f46e5" wireframe />
        </mesh>
      );
    case 'sphere':
      return (
        <mesh>
          <sphereGeometry args={[params.r, 32, 32]} />
          <meshStandardMaterial color="#06b6d4" wireframe />
        </mesh>
      );
    case 'cylinder':
      return (
        <mesh>
          <cylinderGeometry args={[params.r, params.r, params.h, 32]} />
          <meshStandardMaterial color="#10b981" wireframe />
        </mesh>
      );
    case 'cone':
      return (
        <mesh>
          <coneGeometry args={[params.r, params.h, 32]} />
          <meshStandardMaterial color="#f59e0b" wireframe />
        </mesh>
      );
    case 'pyramid':
      return (
        <mesh rotation={[0, 0, 0]}>
          <coneGeometry args={[params.a / Math.sqrt(2), params.h, 4]} />
          <meshStandardMaterial color="#ef4444" wireframe />
        </mesh>
      );
    case 'prism':
      return (
        <mesh>
          <boxGeometry args={[params.l, params.h, params.w]} />
          <meshStandardMaterial color="#8b5cf6" wireframe />
        </mesh>
      );
    case 'triangular_pyramid':
      return (
        <mesh>
          <coneGeometry args={[params.a / Math.sqrt(3), params.h, 3]} />
          <meshStandardMaterial color="#ec4899" wireframe />
        </mesh>
      );
    case 'triangular_prism':
      return (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[params.b / Math.sqrt(3), params.b / Math.sqrt(3), params.h, 3]} />
          <meshStandardMaterial color="#34d399" wireframe />
        </mesh>
      );
    case 'pentagonal_prism':
      return (
        <mesh>
          <cylinderGeometry args={[params.a / (2 * Math.sin(Math.PI / 5)), params.a / (2 * Math.sin(Math.PI / 5)), params.h, 5]} />
          <meshStandardMaterial color="#fbbf24" wireframe />
        </mesh>
      );
    case 'hexagonal_prism':
      return (
        <mesh>
          <cylinderGeometry args={[params.a / (2 * Math.sin(Math.PI / 6)), params.a / (2 * Math.sin(Math.PI / 6)), params.h, 6]} />
          <meshStandardMaterial color="#f87171" wireframe />
        </mesh>
      );
    case 'octagonal_prism':
      return (
        <mesh>
          <cylinderGeometry args={[params.a / (2 * Math.sin(Math.PI / 8)), params.a / (2 * Math.sin(Math.PI / 8)), params.h, 8]} />
          <meshStandardMaterial color="#60a5fa" wireframe />
        </mesh>
      );
    default:
      return null;
  }
};
