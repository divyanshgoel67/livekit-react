'use client';

import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from './ui/card';

interface RecentAttemptRowProps {
  date: string;
  persona: string;
  outcome: string;
  score: number;
  avatar: string;
}

export function RecentAttemptRow({ date, persona, outcome, score, avatar }: RecentAttemptRowProps) {
  const isSuccess = score >= 70;

  return (
    <Card className="hover:bg-card/50 transition-all group cursor-pointer">
      <CardContent className="flex items-center gap-4 p-4">
        <div className="text-sm text-muted-foreground min-w-32">{date}</div>

        <div className="flex items-center gap-3 flex-1">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={avatar} alt={persona} className="w-10 h-10 rounded-lg object-cover" />
          <span className="font-medium text-foreground">{persona}</span>
        </div>

        <div
          className={cn(
            'min-w-40 px-3 py-1 rounded-full text-sm font-medium',
            isSuccess
              ? 'bg-accent/20 text-accent border border-accent/30'
              : 'bg-destructive/20 text-destructive border border-destructive/30'
          )}
        >
          {outcome}
        </div>

        <div className="text-2xl font-bold text-foreground min-w-20 text-right">{score}</div>

        <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
      </CardContent>
    </Card>
  );
}
