'use client';

import { Edit, FileText, Plus, Trash2 } from 'lucide-react';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { DashboardSidebar } from '@/components/dashboard/sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/dashboard/ui/card';
import { Button } from '@/components/livekit/button';

const scripts = [
  {
    id: 1,
    name: 'Introduction Call Script',
    description: 'Standard script for first-time customer interactions',
    lastModified: '2 days ago',
    isDefault: true,
  },
  {
    id: 2,
    name: 'Objection Handling Script',
    description: 'Responses for common price and timing objections',
    lastModified: '1 week ago',
    isDefault: false,
  },
  {
    id: 3,
    name: 'Follow-up Call Script',
    description: 'Template for follow-up conversations',
    lastModified: '3 days ago',
    isDefault: false,
  },
];

export default function ScriptPage() {
  return (
    <div className="bg-background text-foreground flex min-h-screen">
      <DashboardSidebar />

      <main className="ml-20 flex-1">
        <DashboardHeader />

        <div className="p-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-foreground mb-2 text-4xl font-bold">Scripts</h1>
              <p className="text-muted-foreground">
                Manage and customize your conversation scripts
              </p>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create New Script
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {scripts.map((script) => (
              <Card
                key={script.id}
                className="bg-card/50 hover:border-primary/50 backdrop-blur-sm transition-colors"
              >
                <CardHeader>
                  <div className="mb-2 flex items-start justify-between">
                    <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-lg">
                      <FileText className="text-primary h-6 w-6" />
                    </div>
                    {script.isDefault && (
                      <span className="bg-primary/20 text-primary rounded-full px-2 py-1 text-xs font-medium">
                        Default
                      </span>
                    )}
                  </div>
                  <CardTitle className="text-xl">{script.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 text-sm">{script.description}</p>
                  <p className="text-muted-foreground mb-4 text-xs">
                    Last modified: {script.lastModified}
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1" size="sm">
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </Button>
                    {!script.isDefault && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
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
