'use client';

import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import * as THREE from 'three';

// Define proper types for the Box component props
interface BoxProps {
  position: [number, number, number];
  color: string;
  scale: number;
  rotationSpeed: number;
}

// Rotating Box component
function Box(props: BoxProps) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHover] = useState(false);
  const { rotationSpeed } = props;
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.5 * rotationSpeed;
      meshRef.current.rotation.y += delta * 0.2 * rotationSpeed;
    }
  });
  
  return (
    <mesh
      position={props.position}
      ref={meshRef}
      scale={hovered ? props.scale * 1.1 : props.scale}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : props.color} />
    </mesh>
  );
}

// Define the type for box properties
interface BoxSettings {
  color: string;
  scale: number;
  rotationSpeed: number;
}

// Custom Control Panel instead of Tweakpane
function ControlPanel({ 
  boxProps, 
  setBoxProps 
}: { 
  boxProps: BoxSettings; 
  setBoxProps: React.Dispatch<React.SetStateAction<BoxSettings>>; 
}) {
  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBoxProps(prev => ({ ...prev, color: e.target.value }));
  };
  
  const handleScaleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBoxProps(prev => ({ ...prev, scale: Number(e.target.value) }));
  };
  
  const handleSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBoxProps(prev => ({ ...prev, rotationSpeed: Number(e.target.value) }));
  };
  
  return (
    <div className="bg-black/50 backdrop-blur-sm p-4 rounded text-white">
      <h3 className="font-bold text-sm mb-3">3D Controls</h3>
      
      <div className="space-y-3 text-xs">
        <div>
          <label className="block mb-1">Color</label>
          <input 
            type="color" 
            value={boxProps.color} 
            onChange={handleColorChange}
            className="w-full h-6 rounded cursor-pointer"
          />
        </div>
        
        <div>
          <div className="flex justify-between mb-1">
            <label>Size</label>
            <span>{boxProps.scale.toFixed(1)}</span>
          </div>
          <input 
            type="range" 
            min="0.5" 
            max="2" 
            step="0.1" 
            value={boxProps.scale} 
            onChange={handleScaleChange}
            className="w-full"
          />
        </div>
        
        <div>
          <div className="flex justify-between mb-1">
            <label>Speed</label>
            <span>{boxProps.rotationSpeed.toFixed(1)}</span>
          </div>
          <input 
            type="range" 
            min="0" 
            max="5" 
            step="0.1" 
            value={boxProps.rotationSpeed} 
            onChange={handleSpeedChange}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}

export default function Scene3D() {
  const [boxProps, setBoxProps] = useState<BoxSettings>({
    color: '#ff7700',
    scale: 1,
    rotationSpeed: 1
  });
  
  return (
    <div className="relative h-[600px] w-full max-w-4xl mx-auto rounded-lg overflow-hidden">
      <Canvas shadows>
        <color attach="background" args={['#111827']} />
        <fog attach="fog" args={['#111827', 10, 20]} />
        
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        
        <Box 
          position={[0, 0, 0]} 
          color={boxProps.color} 
          scale={boxProps.scale}
          rotationSpeed={boxProps.rotationSpeed}
        />
        
        <OrbitControls 
          enableZoom={true} 
          enablePan={true}
          minDistance={3}
          maxDistance={10}
        />
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <Environment preset="sunset" />
      </Canvas>
      
      <div className="absolute top-4 right-4 z-10">
        <ControlPanel boxProps={boxProps} setBoxProps={setBoxProps} />
      </div>
      
      <div className="absolute bottom-4 left-4 z-10 bg-black/30 backdrop-blur-sm p-3 rounded text-white text-sm">
        <p>Try interacting with the 3D cube:</p>
        <ul className="list-disc pl-5 mt-1 space-y-1 text-xs">
          <li>Click and drag to rotate the view</li>
          <li>Scroll to zoom in/out</li>
          <li>Use the control panel to adjust properties</li>
        </ul>
      </div>
    </div>
  );
}
