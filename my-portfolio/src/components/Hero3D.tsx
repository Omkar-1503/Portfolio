'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, Stars } from '@react-three/drei';
import { motion } from 'framer-motion';

// Simple sphere model instead of importing a GLB
function Model() {
  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
      <mesh>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshStandardMaterial 
          color="#2563eb" 
          roughness={0.2} 
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
}

export default function Hero3D() {
  return (
    <div className="h-screen w-full bg-gradient-to-b from-gray-900 via-blue-900 to-gray-900 relative">
      <Canvas camera={{ position: [0, 0, 6] }}>
        <Suspense fallback={null}>
          <Stars radius={50} depth={50} count={1000} factor={4} />
          <ambientLight intensity={0.2} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <Model />
          <OrbitControls 
            enableZoom={false} 
            autoRotate 
            autoRotateSpeed={0.5}
          />
        </Suspense>
      </Canvas>
      
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-center text-white p-8 bg-black/30 backdrop-blur-md rounded-lg"
        >
          <h1 className="text-5xl font-bold mb-4">Omkar Khadakkar</h1>
          <p className="text-xl mb-6">Web Developer & 3D Enthusiast</p>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full pointer-events-auto">
            View My Work
          </button>
        </motion.div>
      </div>
    </div>
  );
}
