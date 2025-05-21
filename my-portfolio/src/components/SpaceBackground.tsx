'use client';

import React, { useState, useEffect } from 'react';

const SpaceBackground: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // State to control when to show stars (only after client-side hydration)
  const [isMounted, setIsMounted] = useState(false);
  const [stars, setStars] = useState<React.ReactNode[]>([]);

  // Only run this effect on the client after hydration
  useEffect(() => {
    setIsMounted(true);
    
    // Generate stars only on the client side
    const starElements = Array.from({ length: 50 }).map((_, i) => {
      const size = Math.random() * 2 + 1;
      const top = `${Math.random() * 100}%`;
      const left = `${Math.random() * 100}%`;
      const opacity = Math.random() * 0.7 + 0.3;
      
      return (
        <div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            top,
            left,
            width: `${size}px`,
            height: `${size}px`,
            opacity,
          }}
        />
      );
    });
    
    setStars(starElements);
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#0b0b30] via-[#13064f] to-[#020420]">
      {/* Star background - only rendered on client */}
      {isMounted && (
        <div className="fixed inset-0 pointer-events-none z-[-20]">
          {/* Static celestial elements */}
          <div className="absolute inset-0 opacity-80">
            {stars}
          </div>
          
          {/* Fixed nebulae (simpler implementation) */}
          <div 
            className="absolute rounded-full bg-gradient-radial from-purple-900/20 via-purple-800/10 to-transparent blur-3xl"
            style={{
              top: '30%',
              left: '70%',
              width: '300px',
              height: '300px',
              transform: 'translate(-50%, -50%)',
              opacity: 0.4,
            }}
          />
          <div 
            className="absolute rounded-full bg-gradient-radial from-blue-900/20 via-blue-800/10 to-transparent blur-3xl"
            style={{
              top: '70%',
              left: '30%',
              width: '400px',
              height: '400px',
              transform: 'translate(-50%, -50%)',
              opacity: 0.4,
            }}
          />
          
          {/* Vignette effect */}
          <div className="absolute inset-0 bg-gradient-radial from-transparent to-[#020420] opacity-70"></div>
        </div>
      )}
      
      {/* Main content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default SpaceBackground;
