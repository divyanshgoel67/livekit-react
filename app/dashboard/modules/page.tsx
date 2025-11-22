'use client';

import { DashboardSidebar } from '@/components/dashboard/sidebar';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/dashboard/ui/card';
import { BookOpen, CheckCircle, Clock, Play } from 'lucide-react';
import { Button } from '@/components/livekit/button';
import Link from 'next/link';

const modules = [
  {
    id: 1,
    title: 'Introduction Call',
    description: 'Master the art of the first conversation',
    progress: 75,
    status: 'in-progress',
    lessons: 8,
    completed: 6,
  },
  {
    id: 2,
    title: 'Objection Handling',
    description: 'Learn to handle common customer objections',
    progress: 100,
    status: 'completed',
    lessons: 10,
    completed: 10,
  },
  {
    id: 3,
    title: 'Closing Techniques',
    description: 'Advanced strategies for closing deals',
    progress: 0,
    status: 'locked',
    lessons: 12,
    completed: 0,
  },
  {
    id: 4,
    title: 'Discovery Questions',
    description: 'Ask the right questions to understand customer needs',
    progress: 30,
    status: 'in-progress',
    lessons: 6,
    completed: 2,
  },
];

export default function ModulesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex">
      <DashboardSidebar />

      <main className="flex-1 ml-20">
        <DashboardHeader />

        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">Training Modules</h1>
            <p className="text-muted-foreground">Explore and complete training modules to improve your skills</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((module) => (
              <Card
                key={module.id}
                className={`bg-card/50 backdrop-blur-sm ${
                  module.status === 'locked' ? 'opacity-60' : 'hover:border-primary/50'
                } transition-colors`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-primary" />
                    </div>
                    {module.status === 'completed' && (
                      <CheckCircle className="w-6 h-6 text-success" />
                    )}
                    {module.status === 'locked' && (
                      <Clock className="w-6 h-6 text-muted-foreground" />
                    )}
                  </div>
                  <CardTitle className="text-xl">{module.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{module.description}</p>
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">{module.completed}/{module.lessons} lessons</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{ width: `${module.progress}%` }}
                      />
                    </div>
                  </div>
                  {module.status === 'locked' ? (
                    <Button disabled className="w-full" variant="outline">
                      Locked
                    </Button>
                  ) : (
                    <Link href="/dashboard/training" className="block">
                      <Button className="w-full">
                        {module.status === 'completed' ? 'Review' : 'Continue'}
                        <Play className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

