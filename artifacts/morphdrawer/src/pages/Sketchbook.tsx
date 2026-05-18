import React, { useState, useEffect } from 'react';
import { generateForm, CreatureForm } from '@/lib/generator';
import { CreatureCard } from '@/components/CreatureCard';
import { useNotebookMemory } from '@/lib/notebookMemory';
import { motion } from 'framer-motion';

export default function Sketchbook() {
  const [currentForm, setCurrentForm] = useState<CreatureForm | null>(null);
  const { saveForm, forms } = useNotebookMemory();

  useEffect(() => {
    // Generate initial form if empty
    if (!currentForm) {
      setCurrentForm(generateForm());
    }
  }, [currentForm]);

  const handleGenerate = () => {
    setCurrentForm(generateForm());
  };

  const isSaved = currentForm ? forms.some(f => f.id === currentForm.id) : false;

  return (
    <div className="flex flex-col items-center max-w-md mx-auto w-full pb-20">
      <div className="w-full mb-6 text-center mt-4">
        <h1 className="font-serif text-3xl text-foreground mb-1 leading-tight">Something is waiting to be drawn.</h1>
        <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-muted-foreground/70 mt-2">turn the page to find it</p>
      </div>

      <div className="w-full min-h-[400px]">
        {currentForm ? (
          <CreatureCard 
            key={currentForm.id} // forces re-render/animation on new form
            form={currentForm} 
            onSave={saveForm} 
            isSaved={isSaved} 
          />
        ) : (
          <div className="w-full h-64 flex items-center justify-center text-muted-foreground font-sans ">
            Waiting for an idea...
          </div>
        )}
      </div>

      <motion.button
        whileHover={{ scale: 1.02, rotate: -0.5 }}
        whileTap={{ scale: 0.97 }}
        onClick={handleGenerate}
        data-testid="button-generate"
        className="mt-6 bg-primary/90 text-primary-foreground font-sans text-lg py-4 px-8 sketch-border font-semibold shadow-sm cursor-pointer hover:bg-primary transition-colors w-full tracking-wide"
      >
        Open a New Page
      </motion.button>
    </div>
  );
}
