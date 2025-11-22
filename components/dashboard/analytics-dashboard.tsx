'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar } from 'recharts';
import { TrendingUp, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';

const trendData = [
  { month: 'Jan', score: 65 },
  { month: 'Feb', score: 75 },
  { month: 'Mar', score: 70 },
  { month: 'Apr', score: 80 },
  { month: 'May', score: 78 },
  { month: 'Jun', score: 85 },
  { month: 'Jul', score: 82 },
  { month: 'Aug', score: 88 },
  { month: 'Sep', score: 92 },
  { month: 'Oct', score: 90 },
  { month: 'Nov', score: 95 },
  { month: 'Dec', score: 98 },
];

const skillsData = [
  { subject: 'Empathy', A: 120, fullMark: 150 },
  { subject: 'Closing', A: 98, fullMark: 150 },
  { subject: 'Pace', A: 86, fullMark: 150 },
  { subject: 'Objections', A: 99, fullMark: 150 },
  { subject: 'Knowledge', A: 85, fullMark: 150 },
  { subject: 'Discovery', A: 65, fullMark: 150 },
];

const objections = [
  { name: 'Price Concerns', success: 85 },
  { name: 'Not Interested', success: 72 },
  { name: 'Bad Timing', success: 68 },
  { name: 'Need to Think', success: 90 },
];

export function AnalyticsDashboard() {
  return (
    <div className="space-y-6">
      {/* Trend Chart */}
      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Performance Trend (Last Year)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" style={{ fontSize: '12px' }} />
              <YAxis stroke="hsl(var(--muted-foreground))" style={{ fontSize: '12px' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                }}
              />
              <Line
                type="monotone"
                dataKey="score"
                stroke="hsl(var(--primary))"
                strokeWidth={3}
                dot={{ fill: 'hsl(var(--primary))', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Skill Analysis */}
        <Card className="bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Skill Analysis</CardTitle>
              <div className="flex items-center gap-1 text-sm text-success">
                <TrendingUp className="w-4 h-4" />
                <span>+12%</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <RadarChart data={skillsData}>
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }} />
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

        {/* Objection Breakdown */}
        <Card className="bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Objection Success Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {objections.map((obj, index) => (
                <div key={index} className="space-y-1.5">
                  <div className="flex justify-between text-sm">
                    <span className="text-foreground">{obj.name}</span>
                    <span className="font-bold text-foreground">{obj.success}%</span>
                  </div>
                  <Progress value={obj.success} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Weakness Spotlight */}
        <Card className="bg-card/50 backdrop-blur-sm lg:col-span-2">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-destructive" />
              </div>
              <CardTitle>Key Weakness</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              You frequently interrupt the customer within the first 10 seconds. Focus on active listening and
              letting them finish their thoughts before responding.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
