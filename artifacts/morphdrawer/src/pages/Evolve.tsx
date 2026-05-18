import React, { useState, useEffect } from 'react';
import { useRoute } from 'wouter';
import { CreatureForm, generateForm } from '@/lib/generator';
import { useNotebookMemory } from '@/lib/notebookMemory';
import { CreatureCard } from '@/components/CreatureCard';

const EVOLUTION_LABELS = [
  "Eerie Version", "Sleepy Version", "Relic Version", 
  "Dream Version", "Chaotic Version", "Softer Version"
];

function makeEvolutionConcept(parentConcept: string, label: string): string {
  const map: Record<string, string> = {
    "Eerie Version": "eerie",
    "Sleepy Version": "sleeping",
    "Relic Version": "ancient relic",
    "Dream Version": "dream-form",
    "Chaotic Version": "chaotic",
    "Softer Version": "softer",
  };
  const adjective = map[label] || "evolved";
  const words = parentConcept.split(' ');
  const core = words.slice(-2).join(' ');
  return adjective + ' ' + core;
}

export default function Evolve() {
  const [, params] = useRoute('/evolve/:id');
  const parentId = params?.id;
  const { forms, saveForm } = useNotebookMemory();
  const [parentForm, setParentForm] = useState<CreatureForm | null>(null);
  const [evolutions, setEvolutions] = useState<CreatureForm[]>([]);

  useEffect(() => {
    if (parentId) {
      // Find parent from memory if it exists, otherwise we're just evolving a transient form (which we don't have access to without context, but we can handle gracefully)
      const found = forms.find(f => f.id === parentId);
      if (found) {
        setParentForm(found);
      } else {
        // Fallback: Generate a placeholder parent if accessed directly with random ID
        setParentForm(generateForm()); 
      }
    }
  }, [parentId, forms]);

  useEffect(() => {
    if (parentForm && evolutions.length === 0) {
      // Generate 4 variants
      const labels = [...EVOLUTION_LABELS].sort(() => 0.5 - Math.random()).slice(0, 4);
      const newEvolutions = labels.map(label => {
        const evo = generateForm(parentForm.id, label);
        return { ...evo, concept: makeEvolutionConcept(parentForm.concept, label) };
      });
      setEvolutions(newEvolutions);
    }
  }, [parentForm, evolutions.length]);

  if (!parentForm) return null;

  return (
    <div className="flex flex-col items-center max-w-md mx-auto w-full pb-20">
      <div className="w-full mb-8 text-center mt-4">
        <h1 className="font-serif text-3xl text-foreground mb-2">Evolution Chamber</h1>
        {parentForm && (
          <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-muted-foreground/70 mt-1">
            evolving from: {parentForm.concept}
          </p>
        )}
        <p className="font-sans text-base leading-relaxed text-muted-foreground mt-2">Watch it change and grow.</p>
      </div>

      <div className="w-full mb-8">
        <h3 className="font-sans font-bold text-sm text-muted-foreground mb-4 uppercase tracking-widest text-center border-b border-border/30 pb-2">Parent Form</h3>
        <CreatureCard form={parentForm} showActions={false} />
      </div>

      <div className="w-full mb-4">
        <h3 className="font-sans font-bold text-sm text-muted-foreground mb-4 uppercase tracking-widest text-center border-b border-border/30 pb-2">Mutations</h3>
        <div className="space-y-6">
          {evolutions.map((evo, idx) => {
            const isSaved = forms.some(f => f.id === evo.id);
            return (
              <CreatureCard 
                key={evo.id} 
                form={evo} 
                onSave={saveForm} 
                isSaved={isSaved}
                delay={idx * 0.15}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
