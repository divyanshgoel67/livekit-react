'use client';

import { Plus } from 'lucide-react';

export function CreateCustomCard() {
  return (
    <div className="flex-shrink-0 p-2">
      <div className="w-72 bg-card/30 backdrop-blur-sm rounded-2xl border-2 border-dashed border-primary/50 hover:border-primary hover:bg-card/50 transition-all cursor-pointer flex flex-col items-center justify-center min-h-[320px] group">
      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-all">
        <Plus className="w-8 h-8 text-primary" />
      </div>
        <h3 className="font-bold text-foreground mb-1">Create Custom Persona</h3>
        <p className="text-sm text-muted-foreground">Customize difficulty & traits</p>
      </div>
    </div>
  );
}
