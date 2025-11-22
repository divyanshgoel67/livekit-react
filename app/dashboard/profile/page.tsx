'use client';

import { Award, Calendar, Mail, Settings, User } from 'lucide-react';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { DashboardSidebar } from '@/components/dashboard/sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/dashboard/ui/card';
import { Button } from '@/components/livekit/button';

export default function ProfilePage() {
  return (
    <div className="bg-background text-foreground flex min-h-screen">
      <DashboardSidebar />

      <main className="ml-20 flex-1">
        <DashboardHeader />

        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-foreground mb-2 text-4xl font-bold">Profile</h1>
            <p className="text-muted-foreground">
              Manage your account settings and view your achievements
            </p>
          </div>

          <div className="grid grid-cols-12 gap-6">
            {/* Profile Info */}
            <Card className="bg-card/50 col-span-4 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="mb-6 flex flex-col items-center text-center">
                  <div className="bg-primary/10 mb-4 flex h-24 w-24 items-center justify-center rounded-full">
                    <User className="text-primary h-12 w-12" />
                  </div>
                  <h2 className="text-foreground mb-1 text-2xl font-bold">Agent User</h2>
                  <p className="text-muted-foreground">Master Agent • Lvl 15</p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Mail className="text-muted-foreground h-4 w-4" />
                    <span className="text-foreground text-sm">user@example.com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="text-muted-foreground h-4 w-4" />
                    <span className="text-foreground text-sm">Member since Jan 2024</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Award className="text-muted-foreground h-4 w-4" />
                    <span className="text-foreground text-sm">12,400 XP</span>
                  </div>
                </div>
                <Button className="mt-6 w-full" variant="outline">
                  <Settings className="mr-2 h-4 w-4" />
                  Edit Profile
                </Button>
              </CardContent>
            </Card>

            {/* Achievements & Stats */}
            <Card className="bg-card/50 col-span-8 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { name: 'First Call', icon: '🎯', unlocked: true },
                    { name: 'Perfect Week', icon: '🔥', unlocked: true },
                    { name: 'Century Club', icon: '💯', unlocked: true },
                    { name: 'Master Closer', icon: '🏆', unlocked: true },
                    { name: 'Speed Demon', icon: '⚡', unlocked: false },
                    { name: 'Social Butterfly', icon: '👥', unlocked: false },
                  ].map((achievement, index) => (
                    <div
                      key={index}
                      className={`rounded-lg border-2 p-4 text-center ${
                        achievement.unlocked
                          ? 'bg-primary/10 border-primary/30'
                          : 'bg-muted/30 border-border opacity-50'
                      }`}
                    >
                      <div className="mb-2 text-4xl">{achievement.icon}</div>
                      <p className="text-foreground text-sm font-medium">{achievement.name}</p>
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
