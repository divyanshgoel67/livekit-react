'use client';

import type { Persona } from '@/lib/training-data';
import { CreateCustomCard } from './create-custom-card';
import { PersonaCard } from './persona-card';

interface PersonaSectionProps {
  title: string;
  personas: Persona[];
  selectedPersona: Persona | null;
  onPersonaSelect: (persona: Persona) => void;
  showCreateCustom?: boolean;
}

export function PersonaSection({
  title,
  personas,
  selectedPersona,
  onPersonaSelect,
  showCreateCustom = false,
}: PersonaSectionProps) {
  return (
    <div>
      <h3 className="text-foreground mb-3 text-lg font-semibold">{title}</h3>
      <div className="scrollbar-hide -mx-6 flex gap-4 overflow-x-auto px-6 pb-6">
        {showCreateCustom && <CreateCustomCard />}
        {personas.map((persona) => (
          <PersonaCard
            key={persona.id}
            {...persona}
            selected={selectedPersona?.id === persona.id}
            onClick={() => onPersonaSelect(persona)}
          />
        ))}
      </div>
    </div>
  );
}
