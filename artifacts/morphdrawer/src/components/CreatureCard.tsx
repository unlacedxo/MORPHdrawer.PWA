import React, { useState } from 'react';
import { CreatureForm } from '@/lib/generator';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'wouter';

interface CreatureCardProps {
  form: CreatureForm;
  onSave?: (form: CreatureForm) => void;
  isSaved?: boolean;
  showActions?: boolean;
  delay?: number;
}

export const CreatureCard = ({ form, onSave, isSaved, showActions = true, delay = 0 }: CreatureCardProps) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className="w-full bg-card/80 backdrop-blur-sm p-6 mb-6 sketch-border relative group hover-shift"
    >
      {form.evolutionLabel && (
        <div className="absolute -top-3 -right-2 bg-primary text-primary-foreground font-sans px-3 py-1 text-sm font-bold sketch-border rotate-3 shadow-sm">
          {form.evolutionLabel}
        </div>
      )}

      <div className="font-sans text-sm text-muted-foreground mb-1 italic">What is it?</div>
      <h2 className="text-3xl font-serif font-bold text-foreground mb-4 leading-tight">{form.concept}</h2>
      
      <div className="space-y-3 ink-reveal">
        <div className="flex flex-col">
          <span className="font-sans text-sm text-muted-foreground italic">Main Shape</span>
          <span className="text-lg">{form.shape}</span>
        </div>
        
        <div className="flex flex-col">
          <span className="font-sans text-sm text-muted-foreground italic">Face</span>
          <span className="text-lg">{form.face}</span>
        </div>

        <div className="flex flex-col bg-muted/30 p-3 rounded-lg mt-4 border border-border/50 sketch-border border-dashed">
          <span className="font-sans text-sm font-bold text-primary mb-1">Drawing Tip</span>
          <span className="text-md italic text-foreground/80">{form.tip}</span>
        </div>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="pt-4 mt-4 border-t border-dashed border-border/50 space-y-3">
              <div className="flex flex-col">
                <span className="font-sans text-sm text-muted-foreground italic">Details</span>
                <span className="text-lg">{form.details.join(', ')}</span>
              </div>
              <div className="flex flex-col">
                <span className="font-sans text-sm text-muted-foreground italic">Materials</span>
                <span className="text-lg">{form.materials}</span>
              </div>
              <div className="flex flex-col">
                <span className="font-sans text-sm text-muted-foreground italic">Colors</span>
                <span className="text-lg">{form.colors.join(', ')}</span>
              </div>
              <div className="flex flex-col">
                <span className="font-sans text-sm text-muted-foreground italic">Personality</span>
                <span className="text-lg">{form.personality}</span>
              </div>
              <div className="flex flex-col">
                <span className="font-sans text-sm text-muted-foreground italic">Evolution Idea</span>
                <span className="text-lg text-primary font-bold">{form.evolutionIdea}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button 
        onClick={() => setExpanded(!expanded)}
        className="w-full text-center py-2 mt-4 font-sans text-muted-foreground hover:text-foreground transition-colors border-b border-transparent hover:border-border border-dashed cursor-pointer"
      >
        {expanded ? "Fold away..." : "See more..."}
      </button>

      {showActions && (
        <div className="flex gap-3 mt-6">
          {onSave && !isSaved && (
            <button 
              onClick={() => onSave(form)}
              className="flex-1 bg-background text-foreground border-2 border-border py-2 px-4 sketch-border font-sans font-bold hover:bg-muted hover-shift cursor-pointer"
            >
              Save to Archive
            </button>
          )}
          {isSaved && (
            <div className="flex-1 text-center py-2 px-4 font-sans text-muted-foreground italic border-2 border-transparent">
              Saved
            </div>
          )}
          <Link href={`/evolve/${form.id}`} className="flex-1 bg-primary text-primary-foreground py-2 px-4 sketch-border font-sans font-bold text-center hover:opacity-90 hover-shift cursor-pointer">
            Evolve
          </Link>
        </div>
      )}
    </motion.div>
  );
};
