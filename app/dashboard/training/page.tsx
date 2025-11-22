'use client';

import { useState } from 'react';
import { DashboardSidebar } from '@/components/dashboard/sidebar';
import { PersonaSection } from '@/components/dashboard/persona-section';
import { RecentAttemptRow } from '@/components/dashboard/recent-attempt-row';
import { AnalyticsDashboard } from '@/components/dashboard/analytics-dashboard';
import { TabNavigation } from '@/components/dashboard/tab-navigation';
import { Button } from '@/components/livekit/button';
import { Flame, Trophy } from 'lucide-react';
import { Card, CardContent } from '@/components/dashboard/ui/card';
import { useSession } from '@/components/app/session-provider';
import { SessionView } from '@/components/app/session-view';
import { StartAudio, RoomAudioRenderer } from '@livekit/components-react';
import { Toaster } from '@/components/livekit/toaster';
import { motion } from 'motion/react';
import {
  lastPlayedPersonas,
  favoritePersonas,
  easyPersonas,
  hardPersonas,
  recentHistory,
} from '@/lib/training-data';

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
  const [activeTab, setActiveTab] = useState<'simulation' | 'analytics'>('simulation');
  const [selectedPersona, setSelectedPersona] = useState<number | null>(1);
  const [showLiveKit, setShowLiveKit] = useState(false);
  const { appConfig, isSessionActive, startSession } = useSession();

  // Show LiveKit interface when showLiveKit is true
  if (showLiveKit) {
    return (
      <>
        <div className="min-h-screen bg-background text-foreground">
          <MotionSessionView
            key="session-view"
            {...VIEW_MOTION_PROPS}
            appConfig={appConfig}
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
      <div className="min-h-screen bg-background text-foreground flex">
        <DashboardSidebar />

        <main className="flex-1 ml-20 p-8 overflow-x-hidden">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Introduction Call</h1>
            <p className="text-muted-foreground">Master the art of the first conversation</p>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 px-4 py-2 bg-card rounded-xl border border-border">
              <Trophy className="w-5 h-5 text-accent" />
              <span className="text-foreground font-bold">Lvl 15</span>
            </div>

            <div className="flex items-center gap-2 px-4 py-2 bg-card rounded-xl border border-border">
              <Flame className="w-5 h-5 text-accent" />
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
                <h2 className="text-2xl font-bold text-foreground mb-3">Scenario: The Website Lead</h2>
                <p className="text-muted-foreground">
                  <span className="text-foreground font-medium">Lead Source:</span> Contact form for 3BHK.{' '}
                  <span className="text-foreground font-medium ml-4">Goal:</span> Book a Discovery Meeting.
                </p>
              </CardContent>
            </Card>

            {/* Persona Selection */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-foreground">Select Customer Persona</h2>
                <button className="text-primary hover:text-primary/80 font-medium cursor-pointer">See All →</button>
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
                  setShowLiveKit(true);
                  startSession();
                }}
                className="flex-1 h-14 text-lg font-bold bg-primary hover:bg-primary/90 rounded-lg"
              >
                START SIMULATION
              </Button>
              <Button size="lg" variant="outline" className="px-12 h-14 text-lg rounded-lg">
                Create Custom Persona
              </Button>
            </div>

            {/* Recommendations */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-card/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                      <Trophy className="w-5 h-5 text-accent" />
                    </div>
                    <h3 className="font-bold text-foreground">Daily Focus</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Tip: Your &apos;Pace&apos; was too fast yesterday. Try to slow down to 130 WPM.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Flame className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-bold text-foreground">Next Challenge</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Recommended: Try &apos;The Angry Investor&apos; to boost your Objection Handling score.
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
              <h2 className="text-2xl font-bold text-foreground mb-4">Recent History</h2>
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
