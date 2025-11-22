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
    <Card className="hover:bg-card/50 group cursor-pointer transition-all">
      <CardContent className="flex items-center gap-4 p-4">
        <div className="text-muted-foreground min-w-32 text-sm">{date}</div>

        <div className="flex flex-1 items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={avatar} alt={persona} className="h-10 w-10 rounded-lg object-cover" />
          <span className="text-foreground font-medium">{persona}</span>
        </div>

        <div
          className={cn(
            'min-w-40 rounded-full px-3 py-1 text-sm font-medium',
            isSuccess
              ? 'bg-accent/20 text-accent border-accent/30 border'
              : 'bg-destructive/20 text-destructive border-destructive/30 border'
          )}
        >
          {outcome}
        </div>

        <div className="text-foreground min-w-20 text-right text-2xl font-bold">{score}</div>

        <ArrowRight className="text-muted-foreground group-hover:text-primary h-5 w-5 transition-colors" />
      </CardContent>
    </Card>
  );
}
