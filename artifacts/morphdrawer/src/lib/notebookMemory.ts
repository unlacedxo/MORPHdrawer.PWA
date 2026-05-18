import { useState, useEffect, useCallback } from 'react';
import { CreatureForm } from './generator';

const STORAGE_KEY = 'morphdrawer_memory';
const THEME_KEY = 'morphdrawer_theme';

export type NotebookMemory = {
  forms: CreatureForm[];
  wearLevel: number;
  theme: string;
  motifCounts: Record<string, number>;
};

const getInitialMemory = (): NotebookMemory => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (!parsed.motifCounts) parsed.motifCounts = {};
      return parsed;
    }
  } catch (e) {
    console.error("Failed to load notebook memory", e);
  }
  return {
    forms: [],
    wearLevel: 0,
    theme: 'moth-dust',
    motifCounts: {}
  };
};

export const useNotebookMemory = () => {
  const [memory, setMemory] = useState<NotebookMemory>(getInitialMemory);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', memory.theme);
    localStorage.setItem(THEME_KEY, memory.theme);
  }, [memory.theme]);

  const saveForm = useCallback((form: CreatureForm) => {
    setMemory(prev => {
      // Check if already saved
      if (prev.forms.some(f => f.id === form.id)) return prev;
      
      const newForms = [form, ...prev.forms];
      const nextWearLevel = Math.min(100, prev.wearLevel + 2); // Increases by 2% per save
      
      const newMotifCounts = { ...prev.motifCounts };
      if (form.motifId) {
        newMotifCounts[form.motifId] = (newMotifCounts[form.motifId] || 0) + 1;
      }
      
      const newMemory = {
        ...prev,
        forms: newForms,
        wearLevel: nextWearLevel,
        motifCounts: newMotifCounts
      };
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newMemory));
      return newMemory;
    });
  }, []);

  const setTheme = useCallback((theme: string) => {
    setMemory(prev => {
      const newMemory = { ...prev, theme };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newMemory));
      return newMemory;
    });
  }, []);

  const deleteForm = useCallback((id: string) => {
    setMemory(prev => {
      const newForms = prev.forms.filter(f => f.id !== id);
      const newMemory = { ...prev, forms: newForms };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newMemory));
      return newMemory;
    });
  }, []);

  const resetNotebook = useCallback(() => {
    setMemory({
      forms: [],
      wearLevel: 0,
      theme: 'moth-dust',
      motifCounts: {}
    });
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return {
    forms: memory.forms,
    wearLevel: memory.wearLevel,
    theme: memory.theme,
    motifCounts: memory.motifCounts,
    saveForm,
    setTheme,
    deleteForm,
    resetNotebook
  };
};
