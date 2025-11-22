'use client';

import { AlertCircle, TrendingUp } from 'lucide-react';
import {
  CartesianGrid,
  Line,
  LineChart,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
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
              <XAxis
                dataKey="month"
                stroke="hsl(var(--muted-foreground))"
                style={{ fontSize: '12px' }}
              />
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
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Skill Analysis */}
        <Card className="bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Skill Analysis</CardTitle>
              <div className="text-success flex items-center gap-1 text-sm">
                <TrendingUp className="h-4 w-4" />
                <span>+12%</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <RadarChart data={skillsData}>
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
                    <span className="text-foreground font-bold">{obj.success}%</span>
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
              <div className="bg-destructive/10 flex h-10 w-10 items-center justify-center rounded-lg">
                <AlertCircle className="text-destructive h-5 w-5" />
              </div>
              <CardTitle>Key Weakness</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              You frequently interrupt the customer within the first 10 seconds. Focus on active
              listening and letting them finish their thoughts before responding.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
