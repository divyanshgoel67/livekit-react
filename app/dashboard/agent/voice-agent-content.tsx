'use client';

import { DashboardSidebar } from '@/components/dashboard/sidebar';
import { SessionView } from '@/components/app/session-view';
import { StartAudio, RoomAudioRenderer } from '@livekit/components-react';
import { Toaster } from '@/components/livekit/toaster';
import { useSession } from '@/components/app/session-provider';
import { Button } from '@/components/livekit/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import type { AppConfig } from '@/app-config';

export function VoiceAgentContent({ appConfig }: { appConfig: AppConfig }) {
  const { isSessionActive, startSession, endSession } = useSession();

  return (
    <>
      <div className="min-h-screen bg-background text-foreground flex">
        <DashboardSidebar />

        <main className="flex-1 ml-20">
          {!isSessionActive ? (
            <div className="flex flex-col items-center justify-center min-h-screen p-8">
              <div className="max-w-2xl w-full space-y-8">
                <Link href="/">
                  <Button variant="outline" className="mb-4">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Dashboard
                  </Button>
                </Link>

                <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border text-center">
                  <h1 className="text-4xl font-bold text-foreground mb-4">Voice Agent Simulation</h1>
                  <p className="text-muted-foreground mb-8 text-lg">
                    Start a conversation with our AI voice agent to practice your communication skills. The agent will
                    simulate real-world scenarios and provide feedback.
                  </p>

                  <Button
                    size="lg"
                    onClick={startSession}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg px-8 py-6"
                  >
                    Start Voice Session
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-screen">
              <SessionView appConfig={appConfig} className="h-full w-full" />
            </div>
          )}
        </main>
      </div>

      {/* LiveKit Audio Components */}
      <StartAudio label="Start Audio" />
      <RoomAudioRenderer />
      <Toaster />
    </>
  );
}

