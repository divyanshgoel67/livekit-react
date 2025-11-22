import { create } from 'zustand';
import type { Persona } from '@/lib/training-data';

interface TrainingState {
  selectedPersona: Persona | null;
  setSelectedPersona: (persona: Persona | null) => void;
}

export const useTrainingStore = create<TrainingState>((set) => ({
  selectedPersona: null,
  setSelectedPersona: (persona) => {
    console.log('🎭 Selected Persona:', persona);
    set({ selectedPersona: persona });
  },
}));
