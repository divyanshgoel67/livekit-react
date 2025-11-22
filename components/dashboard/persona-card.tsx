'use client';

import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PersonaCardProps {
  id: number;
  name: string;
  tag: string;
  difficulty: number;
  source: string;
  avatar: string;
  selected?: boolean;
  onClick?: () => void;
}

export function PersonaCard({
  id,
  name,
  tag,
  difficulty,
  source,
  avatar,
  selected = false,
  onClick,
}: PersonaCardProps) {
  const difficultyLabel = difficulty <= 2 ? 'Easy' : difficulty === 3 ? 'Medium' : 'Hard';

  return (
    <div className="flex-shrink-0 p-2">
      <div
        onClick={onClick}
        className={cn(
          'bg-card/50 relative w-72 cursor-pointer overflow-hidden rounded-2xl border-2 backdrop-blur-sm transition-all hover:scale-105',
          selected
            ? 'border-primary shadow-primary/20 shadow-lg'
            : 'border-border hover:border-primary/50'
        )}
      >
        <div className="bg-muted aspect-[4/3] overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={avatar} alt={name} className="h-full w-full object-cover" />
        </div>

        <div className="space-y-2 p-4">
          <div>
            <h3 className="text-foreground mb-1 font-bold">Name: {name}</h3>
            <p className="text-muted-foreground text-sm">{tag}</p>
          </div>

          <div className="flex items-center gap-1 text-sm">
            <span className="text-muted-foreground">Difficulty:</span>
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    'h-3.5 w-3.5',
                    i < difficulty ? 'fill-accent text-accent' : 'text-muted-foreground/30'
                  )}
                />
              ))}
            </div>
            <span className="text-muted-foreground ml-1">({difficultyLabel})</span>
          </div>
        </div>
      </div>
    </div>
  );
}
