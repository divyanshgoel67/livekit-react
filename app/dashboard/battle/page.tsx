'use client';

import { Clock, Swords, Trophy, Users, Zap } from 'lucide-react';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { DashboardSidebar } from '@/components/dashboard/sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/dashboard/ui/card';
import { Button } from '@/components/livekit/button';

const activeBattles = [
  { id: 1, opponent: 'Alex Sales', score: 850, timeLeft: '2h 15m', status: 'active' },
  { id: 2, opponent: 'Sarah Chen', score: 920, timeLeft: '45m', status: 'active' },
];

const leaderboard = [
  { rank: 1, name: 'Sarah Chen', score: 920, change: '+2' },
  { rank: 2, name: 'Alex Sales', score: 850, change: '-1' },
  { rank: 3, name: 'You', score: 780, change: '+1' },
  { rank: 4, name: 'Mike Johnson', score: 750, change: '-1' },
  { rank: 5, name: 'Emma Wilson', score: 720, change: '0' },
];

export default function BattlePage() {
  return (
    <div className="bg-background text-foreground flex min-h-screen">
      <DashboardSidebar />

      <main className="ml-20 flex-1">
        <DashboardHeader />

        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-foreground mb-2 text-4xl font-bold">Battle Arena</h1>
            <p className="text-muted-foreground">
              Compete with other agents and climb the leaderboard
            </p>
          </div>

          <div className="grid grid-cols-12 gap-6">
            {/* Active Battles */}
            <Card className="from-accent/20 to-destructive/20 border-accent/30 col-span-8 bg-gradient-to-br">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="bg-accent/20 flex h-12 w-12 items-center justify-center rounded-xl">
                    <Swords className="text-accent h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle>Active Battles</CardTitle>
                    <div className="flex items-center gap-1 text-sm">
                      <div className="bg-success h-2 w-2 animate-pulse rounded-full" />
                      <span className="text-success">Live</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activeBattles.map((battle) => (
                    <div
                      key={battle.id}
                      className="bg-card/50 border-border flex items-center justify-between rounded-lg border p-4"
                    >
                      <div className="flex items-center gap-4">
                        <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-full">
                          <Users className="text-primary h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="text-foreground font-bold">{battle.opponent}</h3>
                          <p className="text-muted-foreground text-sm">Score: {battle.score}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-muted-foreground text-sm">Time Left</p>
                          <p className="text-foreground font-bold">{battle.timeLeft}</p>
                        </div>
                        <Button variant="outline">View Battle</Button>
                      </div>
                    </div>
                  ))}
                </div>
                <Button className="mt-4 w-full" size="lg">
                  <Zap className="mr-2 h-4 w-4" />
                  Find New Battle
                </Button>
              </CardContent>
            </Card>

            {/* Leaderboard */}
            <Card className="bg-card/50 col-span-4 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Trophy className="text-accent h-6 w-6" />
                  <CardTitle>Leaderboard</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {leaderboard.map((entry) => (
                    <div
                      key={entry.rank}
                      className={`flex items-center justify-between rounded-lg p-3 ${
                        entry.name === 'You'
                          ? 'bg-primary/10 border-primary/30 border'
                          : 'bg-muted/50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-foreground w-6 font-bold">#{entry.rank}</span>
                        <span className="text-foreground font-medium">{entry.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-foreground font-bold">{entry.score}</span>
                        <span
                          className={`text-xs ${
                            entry.change.startsWith('+')
                              ? 'text-success'
                              : entry.change.startsWith('-')
                                ? 'text-destructive'
                                : 'text-muted-foreground'
                          }`}
                        >
                          {entry.change}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
