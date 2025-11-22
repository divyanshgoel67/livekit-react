'use client';

import { DashboardSidebar } from '@/components/dashboard/sidebar';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/dashboard/ui/card';
import { User, Mail, Calendar, Award, Settings } from 'lucide-react';
import { Button } from '@/components/livekit/button';

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex">
      <DashboardSidebar />

      <main className="flex-1 ml-20">
        <DashboardHeader />

        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">Profile</h1>
            <p className="text-muted-foreground">Manage your account settings and view your achievements</p>
          </div>

          <div className="grid grid-cols-12 gap-6">
            {/* Profile Info */}
            <Card className="col-span-4 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center mb-6">
                  <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <User className="w-12 h-12 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground mb-1">Agent User</h2>
                  <p className="text-muted-foreground">Master Agent • Lvl 15</p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-foreground">user@example.com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-foreground">Member since Jan 2024</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Award className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-foreground">12,400 XP</span>
                  </div>
                </div>
                <Button className="w-full mt-6" variant="outline">
                  <Settings className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </CardContent>
            </Card>

            {/* Achievements & Stats */}
            <Card className="col-span-8 bg-card/50 backdrop-blur-sm">
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
                      className={`p-4 rounded-lg border-2 text-center ${
                        achievement.unlocked
                          ? 'bg-primary/10 border-primary/30'
                          : 'bg-muted/30 border-border opacity-50'
                      }`}
                    >
                      <div className="text-4xl mb-2">{achievement.icon}</div>
                      <p className="text-sm font-medium text-foreground">{achievement.name}</p>
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

