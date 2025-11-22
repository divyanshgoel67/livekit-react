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
          'relative w-72 bg-card/50 backdrop-blur-sm rounded-2xl overflow-hidden border-2 transition-all cursor-pointer hover:scale-105',
          selected ? 'border-primary shadow-lg shadow-primary/20' : 'border-border hover:border-primary/50'
        )}
      >
        <div className="absolute top-4 left-4 w-8 h-8 rounded-lg bg-background/80 backdrop-blur-sm flex items-center justify-center font-bold text-foreground">
          {id}
        </div>

        <div className="aspect-[4/3] overflow-hidden bg-muted">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={avatar} alt={name} className="w-full h-full object-cover" />
        </div>

        <div className="p-4 space-y-2">
          <div>
            <h3 className="font-bold text-foreground mb-1">Name: {name}</h3>
            <p className="text-sm text-muted-foreground">Tag: {tag}</p>
          </div>

          <div className="flex items-center gap-1 text-sm">
            <span className="text-muted-foreground">Difficulty:</span>
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    'w-3.5 h-3.5',
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
