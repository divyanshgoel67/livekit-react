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
    <Card className="col-span-8 bg-card/50 backdrop-blur-sm">
      <CardContent className="p-6">
        <h3 className="text-xl font-bold text-foreground mb-6">Career Journey</h3>

        <div className="flex items-center justify-between relative">
          {/* Progress Line */}
          <div className="absolute top-8 left-0 right-0 h-1 bg-border">
            <div className="h-full bg-primary w-1/2" />
          </div>

          {/* Nodes */}
          {careerNodes.map((node, index) => (
            <div key={index} className="flex flex-col items-center gap-3 relative z-10">
              <div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl border-2 ${
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

