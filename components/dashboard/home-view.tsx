'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Clock, Swords, Target, TrendingUp, Trophy } from 'lucide-react';
import { PolarAngleAxis, PolarGrid, Radar, RadarChart, ResponsiveContainer } from 'recharts';
import { CareerJourney } from '@/components/dashboard/career-journey';
import { Card, CardContent } from '@/components/dashboard/ui/card';
import { Progress } from '@/components/dashboard/ui/progress';
import { Button } from '@/components/livekit/button';
import { HomeCardShimmer } from './shimmer';

interface HomeData {
  skillsData: Array<{ subject: string; A: number; fullMark: number }>;
  missionProgress: number;
  battleArena: {
    onlineAgents: number;
    nextTournament: string;
    yourRank: number;
  };
}

const defaultSkillsData = [
  { subject: 'Empathy', A: 120, fullMark: 150 },
  { subject: 'Closing', A: 98, fullMark: 150 },
  { subject: 'Pace', A: 86, fullMark: 150 },
  { subject: 'Objections', A: 99, fullMark: 150 },
  { subject: 'Knowledge', A: 85, fullMark: 150 },
  { subject: 'Discovery', A: 65, fullMark: 150 },
];

export function HomeView() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<HomeData | null>(null);

  useEffect(() => {
    // Simulate async data fetching
    const fetchData = async () => {
      setIsLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 900));
      
      setData({
        skillsData: defaultSkillsData,
        missionProgress: 65,
        battleArena: {
          onlineAgents: 14,
          nextTournament: '2h 30m',
          yourRank: 8,
        },
      });
      setIsLoading(false);
    };

    fetchData();
  }, []);

  if (isLoading || !data) {
    return (
      <div className="space-y-6 animate-in fade-in duration-500">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-8">
            <HomeCardShimmer />
          </div>
          <div className="col-span-4">
            <HomeCardShimmer />
          </div>
          <div className="col-span-8">
            <HomeCardShimmer />
          </div>
          <div className="col-span-4">
            <HomeCardShimmer />
          </div>
          <div className="col-span-12 grid grid-cols-3 gap-4">
            <HomeCardShimmer />
            <HomeCardShimmer />
            <HomeCardShimmer />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-12 gap-6">
        {/* Daily Mission Hero Card */}
        <Card className="from-primary/20 to-accent/20 border-primary/30 relative col-span-8 overflow-hidden bg-gradient-to-br">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800')] bg-cover bg-center opacity-10" />
          <div className="relative p-8">
            <div className="mb-6 flex items-start justify-between">
              <div>
                <div className="bg-accent/20 text-accent mb-3 inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium">
                  <Target className="h-4 w-4" />
                  Daily Mission
                </div>
                <h2 className="text-foreground mb-2 text-3xl font-bold">
                  The Luxury Penthouse Deal
                </h2>
                <p className="text-muted-foreground max-w-2xl">
                  Handle the &apos;Price too high&apos; objection for the Downtown project. This
                  is a premium client worth 3x XP.
                </p>
              </div>
              <div className="bg-success/20 border-success/30 rounded-xl border px-4 py-2">
                <span className="text-success text-lg font-bold">+500 XP</span>
              </div>
            </div>

            <div className="mb-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-muted-foreground text-sm">Mission Progress</span>
                <span className="text-foreground text-sm font-bold">2/3 Objectives</span>
              </div>
              <Progress value={data.missionProgress} className="h-3" />
            </div>

            <Link href="/dashboard/agent">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold"
              >
                Resume Mission
              </Button>
            </Link>
          </div>
        </Card>

        {/* Battle Arena Promo */}
        <Card className="from-accent/20 to-destructive/20 border-accent/30 col-span-4 bg-gradient-to-br">
          <CardContent className="p-6">
            <div className="mb-4 flex items-center gap-3">
              <div className="bg-accent/20 flex h-12 w-12 items-center justify-center rounded-xl">
                <Swords className="text-accent h-6 w-6" />
              </div>
              <div>
                <h3 className="text-foreground text-xl font-bold">Battle Arena</h3>
                <div className="flex items-center gap-1 text-sm">
                  <div className="bg-success h-2 w-2 animate-pulse rounded-full" />
                  <span className="text-success">Live</span>
                </div>
              </div>
            </div>

            <div className="mb-6 space-y-4">
              <div className="border-border/50 flex items-center justify-between border-b py-2">
                <span className="text-muted-foreground">Online Agents</span>
                <span className="text-foreground font-bold">{data.battleArena.onlineAgents}</span>
              </div>
              <div className="border-border/50 flex items-center justify-between border-b py-2">
                <span className="text-muted-foreground">Next Tournament</span>
                <span className="text-accent font-bold">{data.battleArena.nextTournament}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-muted-foreground">Your Rank</span>
                <span className="text-primary font-bold">#{data.battleArena.yourRank}</span>
              </div>
            </div>

            <Button
              size="lg"
              variant="outline"
              className="border-accent/50 hover:bg-accent/10 hover:text-accent w-full"
            >
              Find Match
            </Button>
          </CardContent>
        </Card>

        {/* Career Progress Map */}
        <CareerJourney />

        {/* Quick Stats Radar */}
        <Card className="bg-card/50 col-span-4 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-foreground text-lg font-bold">Skill Analysis</h3>
              <div className="text-success flex items-center gap-1 text-sm">
                <TrendingUp className="h-4 w-4" />
                <span>+12%</span>
              </div>
            </div>

            <ResponsiveContainer width="100%" height={200}>
              <RadarChart data={data.skillsData}>
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

            <p className="text-muted-foreground mt-4 text-center text-sm">
              Your <span className="text-primary font-medium">Empathy</span> is trending up ⬆️
            </p>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="col-span-12 grid grid-cols-3 gap-4">
          <Link href="/dashboard/training">
            <Card className="bg-card/50 hover:border-primary/50 cursor-pointer backdrop-blur-sm transition-colors">
              <CardContent className="flex items-center gap-4 p-6">
                <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-xl">
                  <Target className="text-primary h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-foreground font-bold">Training Arena</h4>
                  <p className="text-muted-foreground text-sm">Practice makes perfect</p>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Card className="bg-card/50 hover:border-accent/50 cursor-pointer backdrop-blur-sm transition-colors">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="bg-accent/10 flex h-12 w-12 items-center justify-center rounded-xl">
                <Clock className="text-accent h-6 w-6" />
              </div>
              <div>
                <h4 className="text-foreground font-bold">Recent Sessions</h4>
                <p className="text-muted-foreground text-sm">Review your performance</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 hover:border-success/50 cursor-pointer backdrop-blur-sm transition-colors">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="bg-success/10 flex h-12 w-12 items-center justify-center rounded-xl">
                <Trophy className="text-success h-6 w-6" />
              </div>
              <div>
                <h4 className="text-foreground font-bold">Leaderboard</h4>
                <p className="text-muted-foreground text-sm">See where you rank</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

