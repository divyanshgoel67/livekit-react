'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Flame, Trophy } from 'lucide-react';
import { motion } from 'motion/react';
import { RoomAudioRenderer, StartAudio } from '@livekit/components-react';
import { useSession } from '@/components/app/session-provider';
import { SessionView } from '@/components/app/session-view';
import { AnalyticsDashboard } from '@/components/dashboard/analytics-dashboard';
import { PersonaSection } from '@/components/dashboard/persona-section';
import { RecentAttemptRow } from '@/components/dashboard/recent-attempt-row';
import { DashboardSidebar } from '@/components/dashboard/sidebar';
import { TabNavigation } from '@/components/dashboard/tab-navigation';
import { Card, CardContent } from '@/components/dashboard/ui/card';
import { Button } from '@/components/livekit/button';
import { Toaster } from '@/components/livekit/toaster';
import {
  easyPersonas,
  favoritePersonas,
  hardPersonas,
  lastPlayedPersonas,
  recentHistory,
} from '@/lib/training-data';
import { useTrainingStore } from '@/store/training-store';

const MotionSessionView = motion.create(SessionView);

const VIEW_MOTION_PROPS = {
  variants: {
    visible: {
      opacity: 1,
    },
    hidden: {
      opacity: 0,
    },
  },
  initial: 'hidden',
  animate: 'visible',
  exit: 'hidden',
  transition: {
    duration: 0.5,
    ease: 'linear',
  },
};

export default function TrainingPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'simulation' | 'analytics'>('simulation');
  const [showLiveKit, setShowLiveKit] = useState(false);
  const { appConfig, isSessionActive, startSession, endSession } = useSession();
  const { selectedPersona, setSelectedPersona } = useTrainingStore();

  // Initialize with first persona if none selected
  useEffect(() => {
    if (!selectedPersona && lastPlayedPersonas.length > 0) {
      setSelectedPersona(lastPlayedPersonas[0]);
    }
  }, [selectedPersona, setSelectedPersona]);

  // Handle disconnect - redirect to dashboard home
  const handleDisconnect = () => {
    endSession();
    setShowLiveKit(false);
    router.push('/');
  };

  // Show LiveKit interface when showLiveKit is true
  if (showLiveKit) {
    return (
      <>
        <div className="bg-background text-foreground min-h-screen">
          <MotionSessionView
            key="session-view"
            {...VIEW_MOTION_PROPS}
            appConfig={appConfig}
            onDisconnect={handleDisconnect}
          />
        </div>
        <StartAudio label="Start Audio" />
        <RoomAudioRenderer />
        <Toaster />
      </>
    );
  }

  return (
    <>
      <div className="bg-background text-foreground flex min-h-screen">
        <DashboardSidebar />

        <main className="ml-20 flex-1 overflow-x-hidden p-8">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-foreground mb-2 text-4xl font-bold">Introduction Call</h1>
              <p className="text-muted-foreground">Master the art of the first conversation</p>
            </div>

            <div className="flex items-center gap-6">
              <div className="bg-card border-border flex items-center gap-2 rounded-xl border px-4 py-2">
                <Trophy className="text-accent h-5 w-5" />
                <span className="text-foreground font-bold">Lvl 15</span>
              </div>

              <div className="bg-card border-border flex items-center gap-2 rounded-xl border px-4 py-2">
                <Flame className="text-accent h-5 w-5" />
                <span className="text-foreground font-bold">5 Day Streak</span>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <TabNavigation
            tabs={[
              { value: 'simulation', label: 'Start Simulation' },
              { value: 'analytics', label: 'Historical Simulations' },
            ]}
            activeTab={activeTab}
            onTabChange={(value) => setActiveTab(value as 'simulation' | 'analytics')}
          />

          {/* Tab Content */}
          {activeTab === 'simulation' ? (
            <div className="space-y-8">
              {/* Scenario Card */}
              <Card className="bg-card/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h2 className="text-foreground mb-3 text-2xl font-bold">
                    Scenario: The Website Lead
                  </h2>
                  <p className="text-muted-foreground">
                    <span className="text-foreground font-medium">Lead Source:</span> Contact form
                    for 3BHK. <span className="text-foreground ml-4 font-medium">Goal:</span> Book a
                    Discovery Meeting.
                  </p>
                </CardContent>
              </Card>

              {/* Persona Selection */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-foreground text-2xl font-bold">Select Customer Persona</h2>
                  <button className="text-primary hover:text-primary/80 cursor-pointer font-medium">
                    See All →
                  </button>
                </div>

                <PersonaSection
                  title="Last Played"
                  personas={lastPlayedPersonas}
                  selectedPersona={selectedPersona}
                  onPersonaSelect={setSelectedPersona}
                />

                <PersonaSection
                  title="Favourites"
                  personas={favoritePersonas}
                  selectedPersona={selectedPersona}
                  onPersonaSelect={setSelectedPersona}
                />

                <PersonaSection
                  title="Difficulty: Easy"
                  personas={easyPersonas}
                  selectedPersona={selectedPersona}
                  onPersonaSelect={setSelectedPersona}
                  showCreateCustom
                />

                <PersonaSection
                  title="Difficulty: Hard"
                  personas={hardPersonas}
                  selectedPersona={selectedPersona}
                  onPersonaSelect={setSelectedPersona}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <Button
                  size="lg"
                  onClick={() => {
                    console.log('🚀 Starting simulation with persona:', selectedPersona);
                    setShowLiveKit(true);
                    startSession();
                  }}
                  className="bg-primary hover:bg-primary/90 h-14 flex-1 rounded-lg text-lg font-bold"
                >
                  START SIMULATION
                </Button>
                <Button size="lg" variant="outline" className="h-14 rounded-lg px-12 text-lg">
                  Create Custom Persona
                </Button>
              </div>

              {/* Recommendations */}
              <div className="grid grid-cols-2 gap-4">
                <Card className="bg-card/50 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="mb-3 flex items-center gap-3">
                      <div className="bg-accent/10 flex h-10 w-10 items-center justify-center rounded-lg">
                        <Trophy className="text-accent h-5 w-5" />
                      </div>
                      <h3 className="text-foreground font-bold">Daily Focus</h3>
                    </div>
                    <p className="text-muted-foreground">
                      Tip: Your &apos;Pace&apos; was too fast yesterday. Try to slow down to 130
                      WPM.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-card/50 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="mb-3 flex items-center gap-3">
                      <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-lg">
                        <Flame className="text-primary h-5 w-5" />
                      </div>
                      <h3 className="text-foreground font-bold">Next Challenge</h3>
                    </div>
                    <p className="text-muted-foreground">
                      Recommended: Try &apos;The Angry Investor&apos; to boost your Objection
                      Handling score.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              <AnalyticsDashboard />

              {/* Recent History */}
              <div>
                <h2 className="text-foreground mb-4 text-2xl font-bold">Recent History</h2>
                <div className="space-y-3">
                  {recentHistory.map((attempt) => (
                    <RecentAttemptRow key={attempt.id} {...attempt} />
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
      <StartAudio label="Start Audio" />
      <RoomAudioRenderer />
      <Toaster />
    </>
  );
}
