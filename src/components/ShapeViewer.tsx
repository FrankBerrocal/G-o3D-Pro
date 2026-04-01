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
          <boxGeometry args={[params.w, params.h, params.d]} />
          <meshStandardMaterial color="#8b5cf6" wireframe />
        </mesh>
      );
    default:
      return null;
  }
};
