'use client';

import { Phone, Play } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from '@/components/livekit/button';
import type { AppConfig } from '@/app-config';

interface VoiceAgentCardProps {
  appConfig: AppConfig;
  onStartSession: () => void;
  isSessionActive: boolean;
}

export function VoiceAgentCard({ appConfig, onStartSession, isSessionActive }: VoiceAgentCardProps) {
  return (
    <Card className="col-span-8 bg-gradient-to-br from-primary/20 to-accent/20 border-primary/30 overflow-hidden relative">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800')] bg-cover bg-center opacity-10" />
      <div className="relative p-8">
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/20 rounded-full text-accent text-sm font-medium mb-3">
              <Phone className="w-4 h-4" />
              Voice Agent Simulation
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-2">Practice with AI Agent</h2>
            <p className="text-muted-foreground max-w-2xl">
              Start a conversation with our AI voice agent to practice your communication skills. The agent will
              simulate real-world scenarios and provide feedback.
            </p>
          </div>
        </div>

        {!isSessionActive ? (
          <Button
            size="lg"
            onClick={onStartSession}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold"
          >
            <Play className="w-5 h-5 mr-2" />
            Start Voice Session
          </Button>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-success">
              <div className="w-3 h-3 rounded-full bg-success animate-pulse" />
              <span className="font-medium">Session Active - Check the voice agent interface below</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Your voice session is now active. Use the controls at the bottom of the page to interact with the agent.
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}

