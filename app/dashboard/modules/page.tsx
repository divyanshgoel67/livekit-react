'use client';

import Link from 'next/link';
import { BookOpen, CheckCircle, Clock, Play } from 'lucide-react';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { DashboardSidebar } from '@/components/dashboard/sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/dashboard/ui/card';
import { Button } from '@/components/livekit/button';

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
    <div className="bg-background text-foreground flex min-h-screen">
      <DashboardSidebar />

      <main className="ml-20 flex-1">
        <DashboardHeader />

        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-foreground mb-2 text-4xl font-bold">Training Modules</h1>
            <p className="text-muted-foreground">
              Explore and complete training modules to improve your skills
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {modules.map((module) => (
              <Card
                key={module.id}
                className={`bg-card/50 backdrop-blur-sm ${
                  module.status === 'locked' ? 'opacity-60' : 'hover:border-primary/50'
                } transition-colors`}
              >
                <CardHeader>
                  <div className="mb-2 flex items-start justify-between">
                    <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-lg">
                      <BookOpen className="text-primary h-6 w-6" />
                    </div>
                    {module.status === 'completed' && (
                      <CheckCircle className="text-success h-6 w-6" />
                    )}
                    {module.status === 'locked' && (
                      <Clock className="text-muted-foreground h-6 w-6" />
                    )}
                  </div>
                  <CardTitle className="text-xl">{module.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{module.description}</p>
                  <div className="mb-4">
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">
                        {module.completed}/{module.lessons} lessons
                      </span>
                    </div>
                    <div className="bg-secondary h-2 w-full rounded-full">
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
                        <Play className="ml-2 h-4 w-4" />
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
