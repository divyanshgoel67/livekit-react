'use client';

import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import {
  TrendingUp,
  AlertCircle,
  CheckCircle,
  XCircle,
  Play,
  Search,
  Filter,
  Target,
  Globe,
  Linkedin,
  Mail,
  Phone
} from 'lucide-react';

const HistoricalSimulationsView = () => {
  const [selectedSimulation, setSelectedSimulation] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [performanceData, setPerformanceData] = useState<any[]>([]);
  const [flightLog, setFlightLog] = useState<any[]>([]);

  // Mock Data for Chart (Last 10 scores)
  const mockPerformanceData = [
    { call: '1', score: 65, date: 'Nov 12' },
    { call: '2', score: 68, date: 'Nov 13' },
    { call: '3', score: 72, date: 'Nov 14' },
    { call: '4', score: 70, date: 'Nov 15' },
    { call: '5', score: 75, date: 'Nov 16' },
    { call: '6', score: 74, date: 'Nov 18' },
    { call: '7', score: 78, date: 'Nov 19' },
    { call: '8', score: 82, date: 'Nov 20' },
    { call: '9', score: 80, date: 'Nov 21' },
    { call: '10', score: 85, date: 'Today' },
  ];

  // Mock Data for Flight Log
  const mockFlightLog = [
    {
      id: 1,
      lead: { name: 'Sarah Jenkins', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=faces' },
      source: 'LinkedIn',
      duration: '2m 15s',
      outcome: 'Meeting Booked',
      score: 85,
      date: 'Today, 10:30 AM'
    },
    {
      id: 2,
      lead: { name: 'David Chen', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces' },
      source: 'Referral',
      duration: '4m 30s',
      outcome: 'Follow-up',
      score: 80,
      date: 'Today, 09:15 AM'
    },
    {
      id: 3,
      lead: { name: 'Amanda Low', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=faces' },
      source: 'Inbound',
      duration: '1m 45s',
      outcome: 'Gatekeeper Blocked',
      score: 78,
      date: 'Yesterday'
    },
    {
      id: 4,
      lead: { name: 'Vikram Malhotra', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=faces' },
      source: 'Conference',
      duration: '3m 10s',
      outcome: 'Meeting Booked',
      score: 74,
      date: 'Yesterday'
    },
    {
      id: 5,
      lead: { name: 'Priya Patel', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=faces' },
      source: 'Cold Email',
      duration: '45s',
      outcome: 'Hung Up',
      score: 65,
      date: '2 days ago'
    }
  ];

  useEffect(() => {
    // Simulate async data fetching
    const fetchData = async () => {
      setIsLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setPerformanceData(mockPerformanceData);
      setFlightLog(mockFlightLog);
      setIsLoading(false);
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getOutcomeBadgeStyle = (outcome: string) => {
    switch (outcome) {
      case 'Meeting Booked': return 'bg-emerald-50 text-emerald-700 border border-emerald-100';
      case 'Hung Up': return 'bg-red-50 text-red-700 border border-red-100';
      case 'Gatekeeper Blocked': return 'bg-orange-50 text-orange-700 border border-orange-100';
      case 'Follow-up': return 'bg-amber-50 text-amber-700 border border-amber-100';
      default: return 'bg-slate-50 text-slate-700 border border-slate-100';
    }
  };

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'LinkedIn': return <Linkedin size={14} />;
      case 'Cold Email': return <Mail size={14} />;
      case 'Website':
      case 'Inbound': return <Globe size={14} />;
      default: return <Phone size={14} />;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-600';
    return 'text-red-600';
  };

  if (isLoading) {
    return (
      <div className="space-y-8 animate-in fade-in duration-500 pb-10 bg-gray-50 p-6 rounded-xl">
        {/* Loading shimmer for vitals */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm animate-pulse">
              <div className="h-4 bg-slate-200 rounded w-24 mb-4"></div>
              <div className="h-10 bg-slate-200 rounded w-20"></div>
            </div>
          ))}
        </div>
        {/* Loading shimmer for chart */}
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm animate-pulse">
          <div className="h-6 bg-slate-200 rounded w-48 mb-6"></div>
          <div className="h-64 bg-slate-100 rounded"></div>
        </div>
        {/* Loading shimmer for table */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm animate-pulse">
          <div className="p-6 border-b border-slate-100">
            <div className="h-6 bg-slate-200 rounded w-32"></div>
          </div>
          <div className="p-6 space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-16 bg-slate-100 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10 bg-gray-50 p-6 rounded-xl">
      {/* Section A: Readiness Vitals */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Readiness Score */}
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex items-center justify-between relative overflow-hidden">
          <div>
            <h3 className="text-slate-500 text-sm font-medium uppercase tracking-wide flex items-center gap-2">
              <Target size={14} /> Readiness Score
            </h3>
            <div className="mt-2">
              <span className="text-4xl font-bold text-slate-900">72%</span>
            </div>
            <p className="text-xs text-slate-400 mt-1">Target: 80% to go live</p>
          </div>
          {/* Visual: Circular Progress */}
          <div className="relative w-20 h-20 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="40"
                cy="40"
                r="36"
                stroke="#f1f5f9"
                strokeWidth="8"
                fill="transparent"
              />
              <circle
                cx="40"
                cy="40"
                r="36"
                stroke="#f97316"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray={2 * Math.PI * 36}
                strokeDashoffset={2 * Math.PI * 36 * (1 - 0.72)}
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        {/* Card 2: Simulated Booking Rate */}
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-slate-500 text-sm font-medium uppercase tracking-wide">Simulated Booking Rate</h3>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-bold text-slate-900">28%</span>
              <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full border border-emerald-100 flex items-center gap-1">
                <TrendingUp size={12} /> +4%
              </span>
            </div>
          </div>
        </div>

        {/* Card 3: Script Adherence */}
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-slate-500 text-sm font-medium uppercase tracking-wide">Script Adherence</h3>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-bold text-slate-900">85%</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2 mt-3">
              <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '85%' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Section B: Progression & Critique */}
      <div className="flex flex-col lg:flex-row gap-6 h-auto lg:h-80">
        {/* Left Col: Graph */}
        <div className="lg:w-[60%] bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-slate-900 font-bold text-lg">Score Progression <span className="text-slate-400 font-normal text-sm ml-2">(Last 10)</span></h3>
          </div>
          <div className="flex-1 w-full min-h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis
                  dataKey="call"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#94a3b8', fontSize: 12 }}
                  dy={10}
                />
                <YAxis
                  hide={false}
                  domain={[0, 100]}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#94a3b8', fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                  cursor={{ stroke: '#e2e8f0', strokeWidth: 2 }}
                />
                <ReferenceLine y={80} stroke="#10b981" strokeDasharray="3 3" label={{ value: 'Passing Grade', position: 'insideTopRight', fill: '#10b981', fontSize: 12 }} />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#4f46e5"
                  strokeWidth={3}
                  dot={{ fill: '#fff', stroke: '#4f46e5', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: '#4f46e5' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Col: Performance Analysis */}
        <div className="lg:w-[40%] bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex flex-col">
          <h3 className="text-slate-900 font-bold text-lg mb-4">Performance Analysis</h3>

          <div className="flex-1 flex flex-col gap-4">
            {/* Zone 1: Top Strengths */}
            <div className="p-4 bg-emerald-50/50 rounded-lg border border-emerald-100">
              <h4 className="text-emerald-800 font-bold text-sm flex items-center gap-2 mb-3">
                <CheckCircle size={16} className="text-emerald-600" /> Top Strengths
              </h4>
              <ul className="space-y-2">
                <li className="text-sm text-emerald-900 flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5"></span>
                  Good Energy & Tone
                </li>
                <li className="text-sm text-emerald-900 flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5"></span>
                  Strong Closing Questions
                </li>
              </ul>
            </div>

            {/* Zone 2: Critical Weaknesses */}
            <div className="p-4 bg-red-50/50 rounded-lg border border-red-100">
              <h4 className="text-red-800 font-bold text-sm flex items-center gap-2 mb-3">
                <XCircle size={16} className="text-red-600" /> Critical Weaknesses
              </h4>
              <ul className="space-y-2">
                <li className="text-sm text-red-900 flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5"></span>
                  Talking Speed {'>'} 160wpm
                </li>
                <li className="text-sm text-red-900 flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5"></span>
                  Missed Budget Question
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Section C: Simulation Log */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-slate-900 font-bold text-lg">Simulation Log</h3>
          <div className="flex gap-2">
            <button className="p-2 hover:bg-slate-50 rounded-lg text-slate-400 hover:text-slate-600 transition-colors">
              <Search size={18} />
            </button>
            <button className="p-2 hover:bg-slate-50 rounded-lg text-slate-400 hover:text-slate-600 transition-colors">
              <Filter size={18} />
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Lead</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Source</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Duration</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Outcome</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Score</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {flightLog.map((log) => (
                <tr key={log.id} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors group">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <img src={log.lead.avatar} alt={log.lead.name} className="w-8 h-8 rounded-full bg-slate-100 object-cover" />
                      <span className="font-bold text-slate-900 text-sm">{log.lead.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2 text-slate-500 text-sm">
                      {getSourceIcon(log.source)}
                      <span>{log.source}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-mono text-slate-500 text-sm">{log.duration}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-2.5 py-1 rounded-md text-xs font-medium ${getOutcomeBadgeStyle(log.outcome)}`}>
                      {log.outcome}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`font-bold ${getScoreColor(log.score)}`}>{log.score}</span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button
                      onClick={() => setSelectedSimulation(log)}
                      className="px-4 py-2 rounded-lg border border-indigo-600 text-indigo-600 text-xs font-medium hover:bg-indigo-600 hover:text-white transition-all duration-200 flex items-center gap-2 ml-auto"
                    >
                      <Play size={12} /> Review Call
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HistoricalSimulationsView;

