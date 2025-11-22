'use client';

import { PersonaCard } from './persona-card';
import { CreateCustomCard } from './create-custom-card';
import type { Persona } from '@/lib/training-data';

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
      <h3 className="text-lg font-semibold text-foreground mb-3">{title}</h3>
      <div className="flex gap-4 overflow-x-auto pb-6 px-6 scrollbar-hide -mx-6">
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

