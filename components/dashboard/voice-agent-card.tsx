'use client';

import { Phone, Play } from 'lucide-react';
import type { AppConfig } from '@/app-config';
import { Button } from '@/components/livekit/button';
import { Card, CardContent } from './ui/card';

interface VoiceAgentCardProps {
  appConfig: AppConfig;
  onStartSession: () => void;
  isSessionActive: boolean;
}

export function VoiceAgentCard({
  appConfig,
  onStartSession,
  isSessionActive,
}: VoiceAgentCardProps) {
  return (
    <Card className="from-primary/20 to-accent/20 border-primary/30 relative col-span-8 overflow-hidden bg-gradient-to-br">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800')] bg-cover bg-center opacity-10" />
      <div className="relative p-8">
        <div className="mb-6 flex items-start justify-between">
          <div>
            <div className="bg-accent/20 text-accent mb-3 inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium">
              <Phone className="h-4 w-4" />
              Voice Agent Simulation
            </div>
            <h2 className="text-foreground mb-2 text-3xl font-bold">Practice with AI Agent</h2>
            <p className="text-muted-foreground max-w-2xl">
              Start a conversation with our AI voice agent to practice your communication skills.
              The agent will simulate real-world scenarios and provide feedback.
            </p>
          </div>
        </div>

        {!isSessionActive ? (
          <Button
            size="lg"
            onClick={onStartSession}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold"
          >
            <Play className="mr-2 h-5 w-5" />
            Start Voice Session
          </Button>
        ) : (
          <div className="space-y-4">
            <div className="text-success flex items-center gap-2">
              <div className="bg-success h-3 w-3 animate-pulse rounded-full" />
              <span className="font-medium">
                Session Active - Check the voice agent interface below
              </span>
            </div>
            <p className="text-muted-foreground text-sm">
              Your voice session is now active. Use the controls at the bottom of the page to
              interact with the agent.
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}
