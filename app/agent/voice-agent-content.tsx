'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { RoomAudioRenderer, StartAudio } from '@livekit/components-react';
import type { AppConfig } from '@/app-config';
import { useSession } from '@/components/app/session-provider';
import { SessionView } from '@/components/app/session-view';
import { Toaster } from '@/components/livekit/toaster';

export function VoiceAgentContent({ appConfig }: { appConfig: AppConfig }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isSessionActive, startSession, endSession } = useSession();
  const [isInitializing, setIsInitializing] = useState(true);

  // Get agent name from URL params
  const agentName = searchParams?.get('agentName') || undefined;

  // Auto-start session when page loads
  useEffect(() => {
    if (!isSessionActive) {
      startSession(agentName);
    }
  }, [isSessionActive, startSession, agentName]);

  // Show loading screen briefly, then transition to session
  useEffect(() => {
    if (isSessionActive) {
      // Small delay to ensure smooth transition
      const timer = setTimeout(() => {
        setIsInitializing(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isSessionActive]);

  // Handle disconnect - redirect to loading page
  const handleDisconnect = () => {
    endSession();
    router.push('/dashboard/loading');
  };

  // Show loading screen initially
  if (isInitializing || !isSessionActive) {
    return (
      <div className="bg-background text-foreground min-h-screen flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-foreground">Connecting to agent...</h2>
            <p className="text-muted-foreground">Please wait while we set up your session</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-background text-foreground min-h-screen">
        <div className="h-screen">
          <SessionView
            appConfig={appConfig}
            className="h-full w-full"
            onDisconnect={handleDisconnect}
          />
        </div>
      </div>

      {/* LiveKit Audio Components */}
      <StartAudio label="Start Audio" />
      <RoomAudioRenderer />
      <Toaster />
    </>
  );
}
