import React from 'react';
import { useNotebookMemory } from '@/lib/notebookMemory';
import { motion } from 'framer-motion';

const THEMES = [
  {
    id: "moth-dust",
    name: "Moth Dust",
    mood: "An attic sketchbook slowly aging. Dusty brown, ash cream.",
    colors: ["#5d4b3c", "#e0d6c8", "#709090", "#a36a30", "#3c3228"]
  },
  {
    id: "bone-archive",
    name: "Bone Archive",
    mood: "An anatomical notebook mixed with occult taxonomy.",
    colors: ["#e6dcca", "#a05545", "#c09b60", "#555555", "#404040"]
  },
  {
    id: "lunar-static",
    name: "Lunar Static",
    mood: "A dreamlike cosmic notebook. Midnight static and moon glow.",
    colors: ["#2b2b36", "#d2d2e6", "#8b7ba0", "#7ba0a0", "#202028"]
  },
  {
    id: "cathedral-dust",
    name: "Cathedral Dust",
    mood: "A forgotten gothic manuscript. Incense and candle glow.",
    colors: ["#1f1f1f", "#c0b090", "#a03030", "#c8a040", "#405060"]
  }
];

export default function Themes() {
  const { theme, setTheme } = useNotebookMemory();

  return (
    <div className="flex flex-col items-center max-w-md mx-auto w-full pb-20">
      <div className="w-full mb-8 text-center mt-4">
        <h1 className="font-serif text-4xl text-foreground mb-2">Atmospheres</h1>
        <p className="font-sans text-lg text-muted-foreground italic">Change the notebook's physical world.</p>
      </div>

      <div className="w-full space-y-6">
        {THEMES.map((t) => (
          <motion.div 
            key={t.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setTheme(t.id)}
            className={`w-full p-6 sketch-border cursor-pointer transition-all duration-500 flex flex-col gap-4 ${theme === t.id ? 'border-primary border-4 bg-card/90 shadow-lg' : 'border-border border-2 bg-background/50 hover:bg-card/50'}`}
          >
            <div className="flex justify-between items-start">
              <h2 className="font-serif text-2xl font-bold text-foreground">{t.name}</h2>
              {theme === t.id && <span className="font-sans text-primary font-bold text-sm bg-primary/10 px-2 py-1 sketch-border rotate-3">Active</span>}
            </div>
            
            <p className="font-sans text-muted-foreground italic text-md">{t.mood}</p>
            
            <div className="flex gap-2 mt-2">
              {t.colors.map((color, i) => (
                <div 
                  key={i} 
                  className="w-8 h-8 rounded-full border border-border/50 sketch-border shadow-inner"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
