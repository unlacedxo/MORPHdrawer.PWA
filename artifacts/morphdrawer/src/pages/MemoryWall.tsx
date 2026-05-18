import React from 'react';
import { useNotebookMemory } from '@/lib/notebookMemory';
import { MOTIF_POOL } from '@/lib/motifs';
import { Link } from 'wouter';

export default function MemoryWall() {
  const { forms } = useNotebookMemory();

  return (
    <div className="flex flex-col items-center max-w-md mx-auto w-full pb-20">
      <div className="w-full mb-8 text-center mt-4">
        <h1 className="font-serif text-4xl text-foreground mb-2">Memory Wall</h1>
        <p className="font-sans text-base leading-relaxed text-muted-foreground">A collage of past forms.</p>
      </div>

      {forms.length < 3 ? (
        <div className="text-center py-20 opacity-60">
          <p className="font-sans text-xl leading-relaxed mb-4 text-muted-foreground">The wall awaits your first sketches...</p>
        </div>
      ) : (
        <div className="relative w-full flex flex-wrap justify-center gap-4 py-8">
          {forms.map((form, index) => {
            const motif = MOTIF_POOL.find(m => m.id === form.motifId);
            const rotate = (index % 5 - 2) * 1.5;
            
            return (
              <Link key={form.id} href={`/evolve/${form.id}`} className="block no-underline">
                <div 
                  className="bg-card/90 p-4 sketch-border shadow-sm hover:shadow-md transition-shadow cursor-pointer w-[150px] relative hover-shift"
                  style={{ rotate: `${rotate}deg` }}
                >
                  <div className="tape-strip -top-2 left-4 w-8 h-4 opacity-50 rotate-[-5deg]" />
                  
                  {motif && (
                    <svg width="20" height="20" viewBox="0 0 24 24" className="text-foreground opacity-30 absolute top-2 right-2">
                      <path d={motif.svgPath} fill="none" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                  )}
                  
                  <h3 className="font-serif font-bold text-lg text-foreground mt-4 leading-tight mb-2 line-clamp-2">{form.concept}</h3>
                  <p className="font-mono text-[11px] tracking-[0.12em] uppercase text-muted-foreground/80 line-clamp-2">{form.personality}</p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
