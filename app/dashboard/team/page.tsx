'use client';

import { Target, TrendingUp, Trophy, Users } from 'lucide-react';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { DashboardSidebar } from '@/components/dashboard/sidebar';
import { Card, CardContent } from '@/components/dashboard/ui/card';

const teamMembers = [
  {
    id: 1,
    name: 'Sarah Chen',
    role: 'Senior Agent',
    score: 920,
    sessions: 45,
    rank: 1,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
  },
  {
    id: 2,
    name: 'Alex Sales',
    role: 'Agent',
    score: 850,
    sessions: 38,
    rank: 2,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
  },
  {
    id: 3,
    name: 'You',
    role: 'Agent',
    score: 780,
    sessions: 32,
    rank: 3,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
  },
  {
    id: 4,
    name: 'Mike Johnson',
    role: 'Junior Agent',
    score: 750,
    sessions: 28,
    rank: 4,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
  },
];

export default function TeamPage() {
  return (
    <div className="bg-background text-foreground flex min-h-screen">
      <DashboardSidebar />

      <main className="ml-20 flex-1">
        <DashboardHeader />

        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-foreground mb-2 text-4xl font-bold">Team</h1>
            <p className="text-muted-foreground">View your team members and their performance</p>
          </div>

          {/* Team Stats */}
          <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-4">
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="mb-2 flex items-center gap-3">
                  <Users className="text-primary h-5 w-5" />
                  <span className="text-muted-foreground text-sm">Team Size</span>
                </div>
                <div className="text-foreground text-3xl font-bold">12</div>
              </CardContent>
            </Card>
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="mb-2 flex items-center gap-3">
                  <Trophy className="text-accent h-5 w-5" />
                  <span className="text-muted-foreground text-sm">Avg. Score</span>
                </div>
                <div className="text-foreground text-3xl font-bold">825</div>
              </CardContent>
            </Card>
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="mb-2 flex items-center gap-3">
                  <Target className="text-success h-5 w-5" />
                  <span className="text-muted-foreground text-sm">Total Sessions</span>
                </div>
                <div className="text-foreground text-3xl font-bold">1,234</div>
              </CardContent>
            </Card>
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="mb-2 flex items-center gap-3">
                  <TrendingUp className="text-primary h-5 w-5" />
                  <span className="text-muted-foreground text-sm">Growth</span>
                </div>
                <div className="text-foreground text-3xl font-bold">+12%</div>
              </CardContent>
            </Card>
          </div>

          {/* Team Members */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member) => (
              <Card
                key={member.id}
                className={`bg-card/50 backdrop-blur-sm ${
                  member.name === 'You' ? 'border-primary border-2' : 'hover:border-primary/50'
                } transition-colors`}
              >
                <CardContent className="p-6">
                  <div className="mb-4 flex items-center gap-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="h-16 w-16 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="text-foreground text-lg font-bold">{member.name}</h3>
                      <p className="text-muted-foreground text-sm">{member.role}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground text-sm">Rank</span>
                      <span className="text-foreground font-bold">#{member.rank}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground text-sm">Score</span>
                      <span className="text-foreground font-bold">{member.score}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground text-sm">Sessions</span>
                      <span className="text-foreground font-bold">{member.sessions}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
