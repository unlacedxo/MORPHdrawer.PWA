import React from 'react';
import { useNotebookMemory } from '@/lib/notebookMemory';
import { CreatureCard } from '@/components/CreatureCard';

export default function Archive() {
  const { forms, wearLevel } = useNotebookMemory();

  return (
    <div className="flex flex-col items-center max-w-md mx-auto w-full pb-20">
      <div className="w-full mb-8 mt-4 flex justify-between items-end border-b-2 border-border/50 pb-4">
        <div>
          <h1 className="font-serif text-4xl text-foreground mb-2">Archive</h1>
          <p className="font-sans text-lg text-muted-foreground italic">{forms.length} memories saved</p>
        </div>
        <div className="text-right flex flex-col items-end">
          <span className="font-sans text-sm text-muted-foreground">Notebook Wear</span>
          <span className="font-sans font-bold text-xl text-primary">{wearLevel}%</span>
        </div>
      </div>

      {forms.length === 0 ? (
        <div className="text-center py-20 opacity-60">
          <p className="font-sans text-xl italic mb-4">The pages are empty.</p>
          <p className="font-serif">Go to the sketchbook to find something to draw.</p>
        </div>
      ) : (
        <div className="w-full space-y-6">
          {forms.map((form, idx) => (
            <CreatureCard 
              key={form.id} 
              form={form} 
              isSaved={true} 
              delay={idx * 0.1}
            />
          ))}
        </div>
      )}
    </div>
  );
}
