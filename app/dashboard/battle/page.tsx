'use client';

import { DashboardSidebar } from '@/components/dashboard/sidebar';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/dashboard/ui/card';
import { Swords, Trophy, Users, Clock, Zap } from 'lucide-react';
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
    <div className="min-h-screen bg-background text-foreground flex">
      <DashboardSidebar />

      <main className="flex-1 ml-20">
        <DashboardHeader />

        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">Battle Arena</h1>
            <p className="text-muted-foreground">Compete with other agents and climb the leaderboard</p>
          </div>

          <div className="grid grid-cols-12 gap-6">
            {/* Active Battles */}
            <Card className="col-span-8 bg-gradient-to-br from-accent/20 to-destructive/20 border-accent/30">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                    <Swords className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <CardTitle>Active Battles</CardTitle>
                    <div className="flex items-center gap-1 text-sm">
                      <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
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
                      className="flex items-center justify-between p-4 bg-card/50 rounded-lg border border-border"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <Users className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-bold text-foreground">{battle.opponent}</h3>
                          <p className="text-sm text-muted-foreground">Score: {battle.score}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Time Left</p>
                          <p className="font-bold text-foreground">{battle.timeLeft}</p>
                        </div>
                        <Button variant="outline">View Battle</Button>
                      </div>
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-4" size="lg">
                  <Zap className="w-4 h-4 mr-2" />
                  Find New Battle
                </Button>
              </CardContent>
            </Card>

            {/* Leaderboard */}
            <Card className="col-span-4 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Trophy className="w-6 h-6 text-accent" />
                  <CardTitle>Leaderboard</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {leaderboard.map((entry) => (
                    <div
                      key={entry.rank}
                      className={`flex items-center justify-between p-3 rounded-lg ${
                        entry.name === 'You' ? 'bg-primary/10 border border-primary/30' : 'bg-muted/50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-foreground w-6">#{entry.rank}</span>
                        <span className="font-medium text-foreground">{entry.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-foreground">{entry.score}</span>
                        <span
                          className={`text-xs ${
                            entry.change.startsWith('+') ? 'text-success' : entry.change.startsWith('-') ? 'text-destructive' : 'text-muted-foreground'
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

