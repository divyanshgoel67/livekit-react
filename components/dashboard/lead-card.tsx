'use client';

import { Star, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

interface LeadCardProps {
  name: string;
  role: string;
  avatar: string;
  difficulty: number;
  source: string;
  dealValue: string;
  onClick?: () => void;
}

export function LeadCard({ name, role, avatar, difficulty, source, dealValue, onClick }: LeadCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl p-5 border border-slate-300 shadow-sm cursor-pointer transition-all duration-300 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-900/5 group relative overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-start gap-4 mb-4">
        <div className="w-14 h-14 rounded-full bg-slate-100 p-0.5 border border-slate-200 group-hover:border-blue-400 transition-colors">
          <img src={avatar} alt={name} className="w-full h-full rounded-full object-cover" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-slate-900 font-bold text-lg truncate group-hover:text-blue-700 transition-colors">{name}</h3>
          <p className="text-slate-500 text-sm truncate">{role}</p>
        </div>
      </div>

      {/* Deal Value - Hero Metric */}
      <div className="mb-4">
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">Est. Deal Value</p>
        <p className="text-2xl font-extrabold text-slate-900">{dealValue}</p>
      </div>

      {/* Footer Stats */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-50 rounded-md border border-slate-100">
          <Globe size={12} className="text-blue-500" />
          <span className="text-xs font-semibold text-slate-600">Source: {source}</span>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-50 rounded-md border border-slate-100">
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={12}
                className={star <= difficulty ? "text-amber-500 fill-amber-500" : "text-slate-300"}
              />
            ))}
          </div>
          <span className="text-xs font-semibold text-slate-600 ml-1">
            {difficulty <= 1 ? 'Low Pressure' : difficulty <= 3 ? 'Medium Pressure' : 'High Pressure'}
          </span>
        </div>
      </div>
    </div>
  );
}
