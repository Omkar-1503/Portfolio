'use client';

import { ReactNode, useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Only initialize Lenis in browser environment
    if (typeof window === 'undefined') return;
    
    try {
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        smoothWheel: true,
        touchMultiplier: 2,
      });
// Add scroll event listener
lenis.on('scroll', (e: any) => {
    // Optional: do something on scroll
});  
      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
  
      requestAnimationFrame(raf);
  
      return () => {
        lenis.destroy();
      };
    } catch (error) {
      console.error("Lenis initialization error:", error);
      return undefined;
    }
  }, []);

  return <>{children}</>;
}
