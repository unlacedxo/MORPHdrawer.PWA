import React from 'react';
import { Link, useLocation } from 'wouter';
import { DustParticles } from './DustParticles';
import { MarginDoodles } from './MarginDoodles';
import { Logo } from './Logo';
import { useNotebookMemory } from '@/lib/notebookMemory';
import { motion } from 'framer-motion';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const [location] = useLocation();
  const { wearLevel } = useNotebookMemory();

  // Dynamic wear effects based on notebook usage
  const wearOpacity = Math.min(0.8, wearLevel / 100);
  const darkEdgeOpacity = Math.min(0.5, wearLevel / 150);

  const isHome = location === '/';

  return (
    <div className="min-h-[100dvh] w-full relative flex flex-col items-center">
      <div className="paper-texture" />
      <DustParticles />
      <MarginDoodles />
      
      {/* Edge wear overlay */}
      <div 
        className="pointer-events-none fixed inset-0 z-40 transition-opacity duration-1000"
        style={{
          boxShadow: `inset 0 0 100px rgba(0,0,0,${darkEdgeOpacity})`,
          opacity: wearOpacity
        }}
      />

      {/* Navigation */}
      <header className="w-full max-w-md mx-auto p-4 z-20 flex justify-between items-center relative min-h-[72px]">
        {isHome ? (
          <div className="w-full flex justify-center">
            <div className="flex items-center gap-2 text-foreground group">
              <Logo size={40} className="text-primary transition-colors" />
              <span className="font-sans font-bold text-xl tracking-wider text-foreground">MORPHDRAWER</span>
            </div>
          </div>
        ) : (
          <>
            <Link href="/" className="font-sans text-muted-foreground hover:text-foreground hover-shift no-underline cursor-pointer flex items-center gap-2">
              ← Notebook
            </Link>
            <div className="flex items-center gap-2">
              <Logo size={24} className="text-primary opacity-50" />
            </div>
          </>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-md mx-auto p-4 z-20 relative flex flex-col">
        <motion.div
          key={location}
          initial={{ opacity: 0, y: 10, rotate: -1 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          exit={{ opacity: 0, y: -10, rotate: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex-1 flex flex-col"
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
};
