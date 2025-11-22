'use client';

import { DashboardSidebar } from '@/components/dashboard/sidebar';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { CareerJourney } from '@/components/dashboard/career-journey';
import { Card, CardContent } from '@/components/dashboard/ui/card';
import { Progress } from '@/components/dashboard/ui/progress';
import { Button } from '@/components/livekit/button';
import { Swords, Target, Clock, Trophy, TrendingUp } from 'lucide-react';
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer } from 'recharts';
import Link from 'next/link';

const skillsData = [
  { subject: 'Empathy', A: 120, fullMark: 150 },
  { subject: 'Closing', A: 98, fullMark: 150 },
  { subject: 'Pace', A: 86, fullMark: 150 },
  { subject: 'Objections', A: 99, fullMark: 150 },
  { subject: 'Knowledge', A: 85, fullMark: 150 },
  { subject: 'Discovery', A: 65, fullMark: 150 },
];

export function DashboardContent() {
  return (
    <div className="min-h-screen bg-background text-foreground flex">
      <DashboardSidebar />

      <main className="flex-1 ml-20">
        <DashboardHeader />

        {/* Main Dashboard Grid */}
        <div className="p-8 grid grid-cols-12 gap-6">
          {/* Daily Mission Hero Card */}
          <Card className="col-span-8 bg-gradient-to-br from-primary/20 to-accent/20 border-primary/30 overflow-hidden relative">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800')] bg-cover bg-center opacity-10" />
            <div className="relative p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/20 rounded-full text-accent text-sm font-medium mb-3">
                    <Target className="w-4 h-4" />
                    Daily Mission
                  </div>
                  <h2 className="text-3xl font-bold text-foreground mb-2">The Luxury Penthouse Deal</h2>
                  <p className="text-muted-foreground max-w-2xl">
                    Handle the &apos;Price too high&apos; objection for the Downtown project. This is a premium client
                    worth 3x XP.
                  </p>
                </div>
                <div className="px-4 py-2 bg-success/20 rounded-xl border border-success/30">
                  <span className="text-success font-bold text-lg">+500 XP</span>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Mission Progress</span>
                  <span className="text-sm font-bold text-foreground">2/3 Objectives</span>
                </div>
                <Progress value={65} className="h-3" />
              </div>

              <Link href="/dashboard/agent">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold">
                  Resume Mission
                </Button>
              </Link>
            </div>
          </Card>

          {/* Battle Arena Promo */}
          <Card className="col-span-4 bg-gradient-to-br from-accent/20 to-destructive/20 border-accent/30">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                  <Swords className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">Battle Arena</h3>
                  <div className="flex items-center gap-1 text-sm">
                    <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                    <span className="text-success">Live</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between py-2 border-b border-border/50">
                  <span className="text-muted-foreground">Online Agents</span>
                  <span className="text-foreground font-bold">14</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-border/50">
                  <span className="text-muted-foreground">Next Tournament</span>
                  <span className="text-accent font-bold">2h 30m</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-muted-foreground">Your Rank</span>
                  <span className="text-primary font-bold">#8</span>
                </div>
              </div>

              <Button size="lg" variant="outline" className="w-full border-accent/50 hover:bg-accent/10 hover:text-accent">
                Find Match
              </Button>
            </CardContent>
          </Card>

          {/* Career Progress Map */}
          <CareerJourney />

          {/* Quick Stats Radar */}
          <Card className="col-span-4 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-foreground">Skill Analysis</h3>
                <div className="flex items-center gap-1 text-sm text-success">
                  <TrendingUp className="w-4 h-4" />
                  <span>+12%</span>
                </div>
              </div>

              <ResponsiveContainer width="100%" height={200}>
                <RadarChart data={skillsData}>
                  <PolarGrid stroke="hsl(var(--border))" />
                  <PolarAngleAxis
                    dataKey="subject"
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
                  />
                  <Radar
                    name="Skills"
                    dataKey="A"
                    stroke="hsl(var(--primary))"
                    fill="hsl(var(--primary))"
                    fillOpacity={0.3}
                  />
                </RadarChart>
              </ResponsiveContainer>

              <p className="text-sm text-muted-foreground mt-4 text-center">
                Your <span className="text-primary font-medium">Empathy</span> is trending up ⬆️
              </p>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="col-span-12 grid grid-cols-3 gap-4">
            <Link href="/dashboard/training">
              <Card className="bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-colors cursor-pointer">
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Target className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">Training Arena</h4>
                    <p className="text-sm text-muted-foreground">Practice makes perfect</p>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Card className="bg-card/50 backdrop-blur-sm hover:border-accent/50 transition-colors cursor-pointer">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground">Recent Sessions</h4>
                  <p className="text-sm text-muted-foreground">Review your performance</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm hover:border-success/50 transition-colors cursor-pointer">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-success" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground">Leaderboard</h4>
                  <p className="text-sm text-muted-foreground">See where you rank</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

