'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

export default function AnimatedSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Ensure we're in a browser environment
    if (typeof window === 'undefined') return;
    
    try {
      // Register ScrollTrigger plugin
      gsap.registerPlugin(ScrollTrigger);
      
      const el = sectionRef.current;
      if (!el) return;
      
      // Find the element with the gsap-element class
      const gsapElement = el.querySelector('.gsap-element');
      if (!gsapElement) return;
      
      // Create GSAP animation triggered by scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top bottom-=100',
          end: 'center center',
          scrub: 1,
          // markers: true, // Uncomment to debug scroll positions
        }
      });
      
      tl.fromTo(
        gsapElement,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 }
      );
      
      // Clean up ScrollTrigger when component unmounts
      return () => {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      };
    } catch (error) {
      console.error("GSAP error:", error);
      return undefined;
    }
  }, []);
  
  return (
    <section 
      ref={sectionRef} 
      className="min-h-screen flex flex-col items-center justify-center p-8 bg-slate-100 dark:bg-slate-900"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-20 text-center"
      >
        <h2 className="text-4xl font-bold mb-4">Framer Motion Animation</h2>
        <p className="text-lg max-w-md mx-auto">This heading uses Framer Motion for entrance animation.</p>
      </motion.div>
      
      <div className="gsap-element w-full max-w-md p-8 bg-white dark:bg-slate-800 rounded-xl shadow-lg">
        <h3 className="text-2xl font-semibold mb-4">GSAP Scroll Animation</h3>
        <p>This card animates with GSAP when you scroll down to it.</p>
      </div>
    </section>
  );
}
