import React from 'react';
import * as THREE from 'three';
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
          <boxGeometry args={[params.C, params.C, params.C]} />
          <meshStandardMaterial color="#4f46e5" wireframe />
        </mesh>
      );
    case 'sphere':
      return (
        <mesh>
          <sphereGeometry args={[params.R, 32, 32]} />
          <meshStandardMaterial color="#06b6d4" wireframe />
        </mesh>
      );
    case 'cylinder':
      return (
        <mesh>
          <cylinderGeometry args={[params.R, params.R, params.H, 32]} />
          <meshStandardMaterial color="#10b981" wireframe />
        </mesh>
      );
    case 'cone':
      return (
        <mesh>
          <coneGeometry args={[params.R, params.H, 32]} />
          <meshStandardMaterial color="#f59e0b" wireframe />
        </mesh>
      );
    case 'pyramid':
      return (
        <mesh rotation={[0, 0, 0]}>
          <coneGeometry args={[params.C / Math.sqrt(2), params.H, 4]} />
          <meshStandardMaterial color="#ef4444" wireframe />
        </mesh>
      );
    case 'prism':
      return (
        <mesh>
          <boxGeometry args={[params.Lon, params.H, params.lar]} />
          <meshStandardMaterial color="#8b5cf6" wireframe />
        </mesh>
      );
    case 'triangular_pyramid':
      return (
        <mesh>
          <coneGeometry args={[params.C / Math.sqrt(3), params.H, 3]} />
          <meshStandardMaterial color="#ec4899" wireframe />
        </mesh>
      );
    case 'triangular_prism': {
      const shape = new THREE.Shape();
      const h_tri = (Math.sqrt(3) / 2) * params.C;
      shape.moveTo(-params.C / 2, -h_tri / 3);
      shape.lineTo(params.C / 2, -h_tri / 3);
      shape.lineTo(0, (2 * h_tri) / 3);
      shape.lineTo(-params.C / 2, -h_tri / 3);
      
      const extrudeSettings = {
        steps: 1,
        depth: params.H,
        bevelEnabled: false,
      };
      
      return (
        <mesh 
          rotation={[-Math.PI / 2, 0, 0]} 
          position={[0, -params.H / 2, 0]}
        >
          <extrudeGeometry args={[shape, extrudeSettings]} />
          <meshStandardMaterial color="#34d399" wireframe />
        </mesh>
      );
    }
    case 'triangular_prism_right': {
      const { b, h_tri, Lon } = params;
      const shape = new THREE.Shape();
      shape.moveTo(-b / 2, 0);
      shape.lineTo(b / 2, 0);
      shape.lineTo(0, h_tri);
      shape.lineTo(-b / 2, 0);
      
      const extrudeSettings = {
        steps: 1,
        depth: Lon,
        bevelEnabled: false,
      };
      
      return (
        <mesh 
          rotation={[-Math.PI / 2, 0, 0]} 
          position={[0, -Lon / 2, -h_tri / 2]}
        >
          <extrudeGeometry args={[shape, extrudeSettings]} />
          <meshStandardMaterial color="#34d399" wireframe />
        </mesh>
      );
    }
    case 'pentagonal_prism':
      return (
        <mesh>
          <cylinderGeometry args={[params.C / (2 * Math.sin(Math.PI / 5)), params.C / (2 * Math.sin(Math.PI / 5)), params.H, 5]} />
          <meshStandardMaterial color="#fbbf24" wireframe />
        </mesh>
      );
    case 'hexagonal_prism':
      return (
        <mesh>
          <cylinderGeometry args={[params.C / (2 * Math.sin(Math.PI / 6)), params.C / (2 * Math.sin(Math.PI / 6)), params.H, 6]} />
          <meshStandardMaterial color="#f87171" wireframe />
        </mesh>
      );
    case 'octagonal_prism':
      return (
        <mesh>
          <cylinderGeometry args={[params.C / (2 * Math.sin(Math.PI / 8)), params.C / (2 * Math.sin(Math.PI / 8)), params.H, 8]} />
          <meshStandardMaterial color="#60a5fa" wireframe />
        </mesh>
      );
    default:
      return null;
  }
};
