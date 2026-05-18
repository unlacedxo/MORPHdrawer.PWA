import React from 'react';
import { useNotebookMemory } from '@/lib/notebookMemory';
import { MOTIF_POOL } from '@/lib/motifs';

export default function Motifs() {
  const { motifCounts } = useNotebookMemory();

  return (
    <div className="flex flex-col items-center max-w-md mx-auto w-full pb-20">
      <div className="w-full mb-8 text-center mt-4">
        <h1 className="font-serif text-3xl text-foreground mb-2">The Notebook's Language</h1>
        <p className="font-sans text-lg text-muted-foreground italic">Recurring symbols found in your drawings.</p>
      </div>

      <div className="grid grid-cols-2 gap-4 w-full">
        {MOTIF_POOL.map((motif) => {
          const count = motifCounts[motif.id] || 0;
          const discovered = count > 0;

          return (
            <div 
              key={motif.id}
              className={`p-4 sketch-border flex flex-col items-center text-center relative ${discovered ? 'bg-card/80 border-border/80' : 'bg-background/40 border-border/30 opacity-60'}`}
              style={{ rotate: `${(Math.random() - 0.5) * 2}deg` }}
            >
              <div className="tape-strip -top-2 left-1/2 -translate-x-1/2 w-8 h-3 opacity-40 rotate-[2deg]" />
              
              <svg width="48" height="48" viewBox="0 0 24 24" className={`mb-3 ${discovered ? 'text-foreground' : 'text-muted-foreground opacity-20'}`}>
                <path d={motif.svgPath} fill={motif.id === 'moth' || motif.id === 'themes' ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5" />
              </svg>
              
              <h3 className="font-serif font-bold text-md text-foreground leading-tight">
                {discovered ? motif.name : '???'}
              </h3>
              
              <p className="font-hand text-xs text-muted-foreground mt-2">
                {discovered ? `Seen ${count} times` : 'Undiscovered'}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
