'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { RoomAudioRenderer, StartAudio } from '@livekit/components-react';
import type { AppConfig } from '@/app-config';
import { useSession } from '@/components/app/session-provider';
import { SessionView } from '@/components/app/session-view';
import { DashboardSidebar } from '@/components/dashboard/sidebar';
import { Button } from '@/components/livekit/button';
import { Toaster } from '@/components/livekit/toaster';

export function VoiceAgentContent({ appConfig }: { appConfig: AppConfig }) {
  const router = useRouter();
  const { isSessionActive, startSession, endSession } = useSession();

  // Handle disconnect - redirect to dashboard home
  const handleDisconnect = () => {
    endSession();
    router.push('/');
  };

  return (
    <>
      <div className="bg-background text-foreground flex min-h-screen">
        <DashboardSidebar />

        <main className="ml-20 flex-1">
          {!isSessionActive ? (
            <div className="flex min-h-screen flex-col items-center justify-center p-8">
              <div className="w-full max-w-2xl space-y-8">
                <Link href="/">
                  <Button variant="outline" className="mb-4">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Dashboard
                  </Button>
                </Link>

                <div className="bg-card/50 border-border rounded-2xl border p-8 text-center backdrop-blur-sm">
                  <h1 className="text-foreground mb-4 text-4xl font-bold">
                    Voice Agent Simulation
                  </h1>
                  <p className="text-muted-foreground mb-8 text-lg">
                    Start a conversation with our AI voice agent to practice your communication
                    skills. The agent will simulate real-world scenarios and provide feedback.
                  </p>

                  <Button
                    size="lg"
                    onClick={startSession}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg font-bold"
                  >
                    Start Voice Session
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-screen">
              <SessionView
                appConfig={appConfig}
                className="h-full w-full"
                onDisconnect={handleDisconnect}
              />
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
