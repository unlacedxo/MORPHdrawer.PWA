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
      <div className="w-full mb-8 text-center mt-4">
        <h1 className="font-serif text-4xl text-foreground mb-2">Blank Page</h1>
        <p className="font-sans text-base leading-relaxed text-muted-foreground">Draw what you see in your mind.</p>
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
        whileHover={{ scale: 1.02, rotate: -1 }}
        whileTap={{ scale: 0.98, rotate: 1 }}
        onClick={handleGenerate}
        className="mt-8 bg-foreground text-background font-sans text-xl py-4 px-8 sketch-border-heavy font-bold shadow-md cursor-pointer hover:bg-foreground/90 transition-colors w-full"
      >
        Turn the Page
      </motion.button>
    </div>
  );
}
