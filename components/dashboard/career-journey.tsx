'use client';

import { Card, CardContent } from './ui/card';

const careerNodes = [
  { label: 'Cold Call', status: 'completed', icon: '✓' },
  { label: 'Discovery', status: 'completed', icon: '✓' },
  { label: 'Presentation', status: 'current', icon: '📊' },
  { label: 'Negotiation', status: 'locked', icon: '🔒' },
  { label: 'Closing', status: 'locked', icon: '🔒' },
];

export function CareerJourney() {
  return (
    <Card className="bg-card/50 col-span-8 backdrop-blur-sm">
      <CardContent className="p-6">
        <h3 className="text-foreground mb-6 text-xl font-bold">Career Journey</h3>

        <div className="relative flex items-center justify-between">
          {/* Progress Line */}
          <div className="bg-border absolute top-8 right-0 left-0 h-1">
            <div className="bg-primary h-full w-1/2" />
          </div>

          {/* Nodes */}
          {careerNodes.map((node, index) => (
            <div key={index} className="relative z-10 flex flex-col items-center gap-3">
              <div
                className={`flex h-16 w-16 items-center justify-center rounded-2xl border-2 text-2xl ${
                  node.status === 'completed'
                    ? 'bg-success/20 border-success'
                    : node.status === 'current'
                      ? 'bg-primary/20 border-primary animate-pulse'
                      : 'bg-muted border-border'
                }`}
              >
                {node.icon}
              </div>
              <span
                className={`text-sm font-medium ${
                  node.status === 'completed' || node.status === 'current'
                    ? 'text-foreground'
                    : 'text-muted-foreground'
                }`}
              >
                {node.label}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
