import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { useNotebookMemory } from '@/lib/notebookMemory';

export default function Home() {
  const [, setLocation] = useLocation();
  const { forms, resetNotebook } = useNotebookMemory();
  const [settingsOpen, setSettingsOpen] = useState(false);

  const handleRandomPage = () => {
    if (forms.length > 0) {
      const randomForm = forms[Math.floor(Math.random() * forms.length)];
      setLocation(`/evolve/${randomForm.id}`);
    } else {
      setLocation('/create');
    }
  };

  const cards = [
    {
      id: 'create',
      title: 'CREATE',
      desc: 'Draw something weird',
      href: '/create',
      rotate: -1.5,
      svg: <path d="M12 5 C6 5 2 12 2 12 C2 12 6 19 12 19 C18 19 22 12 22 12 C22 12 18 5 12 5 Z M12 15 A3 3 0 1 1 12 9 A3 3 0 1 1 12 15 Z M2 8 L5 10 M22 8 L19 10" fill="none" stroke="currentColor" strokeWidth="1.5" />
    },
    {
      id: 'evolve',
      title: 'EVOLVE',
      desc: 'Mutate old forms',
      href: '/notebook',
      rotate: 2.1,
      svg: <path d="M4 12 L10 12 M10 12 L16 6 M10 12 L16 18 M16 6 L20 6 M16 18 L20 18" fill="none" stroke="currentColor" strokeWidth="2" />
    },
    {
      id: 'sketchbook',
      title: 'SKETCHBOOK',
      desc: 'Browse your pages',
      href: '/notebook',
      rotate: -0.8,
      svg: <path d="M4 4 L16 4 L16 20 L4 20 Z M6 6 L18 6 L18 22 L6 22 Z M8 8 L20 8 L20 24 L8 24 Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
    },
    {
      id: 'themes',
      title: 'THEMES',
      desc: 'Change the atmosphere',
      href: '/themes',
      rotate: 1.2,
      svg: <path d="M4 4 H10 V10 H4 Z M14 4 H20 V10 H14 Z M4 14 H10 V20 H4 Z M14 14 H20 V20 H14 Z" fill="currentColor" opacity="0.8" />
    },
    {
      id: 'motifs',
      title: 'MOTIFS',
      desc: 'Recurring symbols',
      href: '/motifs',
      rotate: -2.2,
      svg: <><path d="M8 12 C8 9.5 10.5 7.5 13 8.5 C15.5 9.5 14.5 13 12 13 C9.5 13 8.5 10.5 10 8.5" fill="none" stroke="currentColor" strokeWidth="1.5" /><path d="M18 4 L19 7 L22 7 L19.5 9 L20.5 12 L18 10 L15.5 12 L16.5 9 L14 7 L17 7 Z" fill="currentColor" /></>
    },
    {
      id: 'settings',
      title: 'SETTINGS',
      desc: 'Notebook options',
      onClick: () => setSettingsOpen(!settingsOpen),
      rotate: 0.5,
      svg: <path d="M12 8 A4 4 0 1 0 12 16 A4 4 0 1 0 12 8 Z M12 4 L12 6 M12 18 L12 20 M4 12 L6 12 M18 12 L20 12 M6.3 6.3 L7.7 7.7 M16.3 16.3 L17.7 17.7 M6.3 17.7 L7.7 16.3 M16.3 6.3 L17.7 7.7" fill="none" stroke="currentColor" strokeWidth="2" />
    },
    {
      id: 'random',
      title: 'RANDOM PAGE',
      desc: 'Surprise me',
      onClick: handleRandomPage,
      rotate: -1.9,
      svg: <path d="M4 4 L20 4 L20 14 L14 20 L4 20 Z M14 14 L20 14 M14 14 L14 20" fill="none" stroke="currentColor" strokeWidth="1.5" />
    },
    {
      id: 'memory',
      title: 'MEMORY WALL',
      desc: 'Visual archive',
      href: '/memory',
      rotate: 1.8,
      svg: <><rect x="4" y="4" width="10" height="10" fill="currentColor" opacity="0.5" /><rect x="10" y="10" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="1.5" /><circle cx="8" cy="16" r="3" fill="currentColor" /></>
    }
  ];

  return (
    <div className="flex flex-col items-center w-full pb-20">
      <div className="grid grid-cols-2 gap-4 w-full px-2">
        {cards.map((card, idx) => {
          const isSettings = card.id === 'settings';
          const innerContent = (
            <motion.div
              whileHover={{ y: -4, rotate: 0, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="home-card bg-card/80 backdrop-blur-sm sketch-border relative flex flex-col justify-center items-center text-center p-4 cursor-pointer h-[140px] shadow-sm hover:shadow-md"
              style={{ rotate: `${card.rotate}deg` }}
              onClick={card.onClick}
            >
              {/* Tape strip */}
              <div className="tape-strip -top-2 left-4 w-8 h-4 opacity-50 rotate-[-5deg]" />
              
              <svg width="24" height="24" viewBox="0 0 24 24" className="text-foreground opacity-60 mb-2">
                {card.svg}
              </svg>
              
              <h3 className="font-serif font-bold text-lg text-foreground leading-tight tracking-wide">{card.title}</h3>
              <p className="font-mono text-[11px] tracking-[0.12em] uppercase text-muted-foreground/80 mt-1">{card.desc}</p>
            </motion.div>
          );

          return (
            <div key={card.id} className="relative">
              {card.href ? (
                <Link href={card.href} className="block w-full h-full no-underline">
                  {innerContent}
                </Link>
              ) : (
                innerContent
              )}
            </div>
          );
        })}
      </div>

      {settingsOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="w-full mt-8 p-6 bg-card/50 sketch-border border-dashed"
        >
          <h3 className="font-serif text-xl mb-4">Notebook Settings</h3>
          <div className="space-y-4 font-sans">
            <p className="text-sm text-muted-foreground">Adjust your experience or start fresh.</p>
            <button 
              onClick={() => {
                if (window.confirm("Are you sure? This will delete all saved memories and reset wear level.")) {
                  resetNotebook();
                  setSettingsOpen(false);
                }
              }}
              className="bg-destructive/10 text-destructive border border-destructive/30 px-4 py-2 sketch-border text-sm font-bold hover:bg-destructive hover:text-destructive-foreground transition-colors cursor-pointer"
            >
              Reset Entire Notebook
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
