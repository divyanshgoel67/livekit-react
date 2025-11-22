'use client';

import { Plus } from 'lucide-react';

export function CreateCustomCard() {
  return (
    <div className="flex-shrink-0 p-2">
      <div className="bg-card/30 border-primary/50 hover:border-primary hover:bg-card/50 group flex min-h-[320px] w-72 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed backdrop-blur-sm transition-all">
        <div className="bg-primary/10 group-hover:bg-primary/20 mb-4 flex h-16 w-16 items-center justify-center rounded-full transition-all">
          <Plus className="text-primary h-8 w-8" />
        </div>
        <h3 className="text-foreground mb-1 font-bold">Create Custom Persona</h3>
        <p className="text-muted-foreground text-sm">Customize difficulty & traits</p>
      </div>
    </div>
  );
}
