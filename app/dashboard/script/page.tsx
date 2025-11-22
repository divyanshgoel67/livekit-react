'use client';

import { DashboardSidebar } from '@/components/dashboard/sidebar';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/dashboard/ui/card';
import { FileText, Plus, Edit, Trash2 } from 'lucide-react';
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
    <div className="min-h-screen bg-background text-foreground flex">
      <DashboardSidebar />

      <main className="flex-1 ml-20">
        <DashboardHeader />

        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">Scripts</h1>
              <p className="text-muted-foreground">Manage and customize your conversation scripts</p>
            </div>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create New Script
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {scripts.map((script) => (
              <Card key={script.id} className="bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <FileText className="w-6 h-6 text-primary" />
                    </div>
                    {script.isDefault && (
                      <span className="px-2 py-1 text-xs font-medium bg-primary/20 text-primary rounded-full">
                        Default
                      </span>
                    )}
                  </div>
                  <CardTitle className="text-xl">{script.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 text-sm">{script.description}</p>
                  <p className="text-xs text-muted-foreground mb-4">Last modified: {script.lastModified}</p>
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1" size="sm">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                    {!script.isDefault && (
                      <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                        <Trash2 className="w-4 h-4" />
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

