'use client';

import { DashboardSidebar } from '@/components/dashboard/sidebar';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { Card, CardContent } from '@/components/dashboard/ui/card';
import { Users, Trophy, TrendingUp, Target } from 'lucide-react';

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
    <div className="min-h-screen bg-background text-foreground flex">
      <DashboardSidebar />

      <main className="flex-1 ml-20">
        <DashboardHeader />

        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">Team</h1>
            <p className="text-muted-foreground">View your team members and their performance</p>
          </div>

          {/* Team Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Users className="w-5 h-5 text-primary" />
                  <span className="text-muted-foreground text-sm">Team Size</span>
                </div>
                <div className="text-3xl font-bold text-foreground">12</div>
              </CardContent>
            </Card>
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Trophy className="w-5 h-5 text-accent" />
                  <span className="text-muted-foreground text-sm">Avg. Score</span>
                </div>
                <div className="text-3xl font-bold text-foreground">825</div>
              </CardContent>
            </Card>
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Target className="w-5 h-5 text-success" />
                  <span className="text-muted-foreground text-sm">Total Sessions</span>
                </div>
                <div className="text-3xl font-bold text-foreground">1,234</div>
              </CardContent>
            </Card>
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  <span className="text-muted-foreground text-sm">Growth</span>
                </div>
                <div className="text-3xl font-bold text-foreground">+12%</div>
              </CardContent>
            </Card>
          </div>

          {/* Team Members */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map((member) => (
              <Card
                key={member.id}
                className={`bg-card/50 backdrop-blur-sm ${
                  member.name === 'You' ? 'border-primary border-2' : 'hover:border-primary/50'
                } transition-colors`}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-bold text-foreground text-lg">{member.name}</h3>
                      <p className="text-sm text-muted-foreground">{member.role}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground text-sm">Rank</span>
                      <span className="font-bold text-foreground">#{member.rank}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground text-sm">Score</span>
                      <span className="font-bold text-foreground">{member.score}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground text-sm">Sessions</span>
                      <span className="font-bold text-foreground">{member.sessions}</span>
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

