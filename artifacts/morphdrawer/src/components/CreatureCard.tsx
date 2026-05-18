import React, { useState } from 'react';
import { CreatureForm } from '@/lib/generator';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'wouter';
import { CreatureDoodle } from '@/components/CreatureDoodle';

interface CreatureCardProps {
  form: CreatureForm;
  onSave?: (form: CreatureForm) => void;
  isSaved?: boolean;
  showActions?: boolean;
  delay?: number;
}

export const CreatureCard = ({ form, onSave, isSaved, showActions = true, delay = 0 }: CreatureCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const steps = form.constructionSteps ?? [];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className="w-full bg-card/80 backdrop-blur-sm p-6 mb-6 sketch-border relative group hover-shift"
      data-testid={`card-creature-${form.id}`}
    >
      {/* Silhouette doodle — larger and slightly more visible */}
      <div className="absolute top-3 right-6 pointer-events-none">
        <CreatureDoodle form={form} size={100} opacity={0.20} className="text-foreground" />
      </div>

      {/* Left margin rule */}
      <div className="absolute left-5 top-6 bottom-6 w-px bg-border/20 pointer-events-none" />

      {/* Tape strips */}
      <div
        className="tape-strip -top-2 left-8 w-12 h-5 opacity-60 rotate-[-8deg]"
        style={{ backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 4px, rgba(0,0,0,0.05) 4px, rgba(0,0,0,0.05) 5px)' }}
      />
      <div className="tape-strip -bottom-2 right-6 w-10 h-4 opacity-50 rotate-[5deg]" style={{ background: 'hsl(var(--secondary) / 0.25)' }} />

      {/* Margin doodles */}
      <div className="absolute right-2 top-0 bottom-0 w-5 flex flex-col justify-around items-center opacity-15 pointer-events-none" aria-hidden="true">
        <svg width="12" height="12" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2"/></svg>
        <svg width="10" height="10" viewBox="0 0 24 24"><path d="M12 2 L14 9 L21 9 L15 13 L17 20 L12 16 L7 20 L9 13 L3 9 L10 9 Z" fill="currentColor" opacity="0.5"/></svg>
        <svg width="8" height="14" viewBox="0 0 8 14"><path d="M4 0 Q6 4 4 7 Q2 10 4 14" fill="none" stroke="currentColor" strokeWidth="1.5"/></svg>
      </div>

      {form.evolutionLabel && (
        <div className="absolute -top-3 -right-2 bg-primary/15 text-primary border border-primary/30 font-mono text-[10px] tracking-[0.12em] uppercase px-2 py-1 sketch-border rotate-2 shadow-sm">
          {form.evolutionLabel}
        </div>
      )}

      {/* Header label */}
      <div className="font-mono text-[11px] tracking-[0.12em] uppercase text-muted-foreground/80 mb-1">What is it?</div>

      <h2 className="text-3xl font-serif font-bold text-foreground leading-tight pr-16">{form.concept}</h2>

      <div className="w-full h-px bg-border/15 mt-3 mb-3" />

      <div className="space-y-3 ink-reveal">
        <div className="flex flex-col">
          <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-muted-foreground/80">Silhouette</span>
          <span className="text-lg font-sans">{form.shape}</span>
        </div>

        <div className="flex flex-col">
          <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-muted-foreground/80">Face</span>
          <span className="text-lg font-sans">{form.face}</span>
        </div>

        {/* 3-step construction guide — always visible */}
        {steps.length > 0 && (
          <div className="mt-4">
            <span className="font-mono text-[11px] tracking-[0.14em] uppercase font-semibold text-primary mb-2 block">Sketch it in 3 steps</span>
            <ol className="space-y-2">
              {steps.map((step, i) => (
                <li key={i} className="flex gap-3 items-start">
                  <span className="font-mono text-[11px] tracking-[0.1em] text-primary/60 pt-0.5 shrink-0 w-4">{i + 1}.</span>
                  <span className="text-sm font-sans text-foreground/80 leading-snug">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* Drawing tip */}
        <div className="bg-primary/[0.07] border-l-2 border-primary/40 rounded-sm p-3 mt-2">
          <span className="font-mono text-[11px] tracking-[0.14em] uppercase font-semibold text-primary mb-1 block">Tip</span>
          <span className="text-base text-foreground/80 font-sans leading-snug">{form.tip}</span>
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
            <div className="pt-4 mt-4 border-t border-dashed border-border/50 space-y-3 font-sans">
              <div className="flex flex-col">
                <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-muted-foreground/80">Details</span>
                <span className="text-lg">{form.details.join(', ')}</span>
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-muted-foreground/80">Materials</span>
                <span className="text-lg">{form.materials}</span>
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-muted-foreground/80">Colors</span>
                <span className="text-lg">{form.colors.join(', ')}</span>
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-muted-foreground/80">Personality</span>
                <span className="text-lg">{form.personality}</span>
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-muted-foreground/80">Evolution Idea</span>
                <span className="text-lg text-primary font-bold">{form.evolutionIdea}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button 
        onClick={() => setExpanded(!expanded)}
        className="w-full text-center py-3 mt-4 font-mono text-[11px] tracking-[0.14em] uppercase text-muted-foreground hover:text-foreground transition-colors cursor-pointer flex items-center justify-center gap-2"
      >
        {expanded ? "Fold away..." : "See more..."}
        <svg width="10" height="10" viewBox="0 0 10 10" style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}>
          <path d="M2 3 L5 7 L8 3" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
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
            <div className="flex-1 text-center py-2 px-4 font-sans text-muted-foreground  border-2 border-transparent">
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
