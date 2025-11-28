'use client';

import React, { useState } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Home, Target, FileText, Users, BarChart2, Award, ScrollText, User, ChevronDown, ChevronRight } from 'lucide-react';

interface SidebarProps {
  onNavigate?: (view: string) => void;
  activeView?: string;
}

const Sidebar = ({ onNavigate, activeView }: SidebarProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [expandedMenu, setExpandedMenu] = useState<string | null>('Training Arena');

  const menuItems = [
    { icon: Home, label: 'Home', id: 'home', path: '/' },
    {
      icon: Target,
      label: 'Training Arena',
      id: 'training-arena',
      path: '/dashboard/training',
      subItems: [
        { label: 'Cold Calls', id: 'cold-calls', path: '/dashboard/training?view=cold-calls' },
        { label: 'Introduction Calls', id: 'introduction-calls', path: '/dashboard/training?view=introduction-calls' },
        { label: 'Discovery Calls', id: 'discovery-calls', path: '/dashboard/training?view=discovery-calls' },
        { label: 'Negotiation & Closing', id: 'negotiation', path: '/dashboard/training?view=negotiation' },
        { label: 'Situation handling', id: 'situation', path: '/dashboard/training?view=situation' },
      ]
    },
    { icon: FileText, label: 'Evaluation Mode', id: 'evaluation', path: '/dashboard/evaluation' },
    { icon: Users, label: 'Shadowing', id: 'shadowing', path: '/dashboard/team' },
    { icon: BarChart2, label: 'Analytics', id: 'analytics', path: '/dashboard/analytics' },
    { icon: Award, label: 'Leaderboard', id: 'leaderboard', path: '/dashboard/battle' },
    { icon: ScrollText, label: 'Scripts', id: 'scripts', path: '/dashboard/script' },
    { icon: User, label: 'Profile', id: 'profile', path: '/dashboard/profile' },
  ];

  const handleItemClick = (item: any) => {
    if (item.subItems) {
      setExpandedMenu(expandedMenu === item.label ? null : item.label);
    } else {
      if (item.path) {
        router.push(item.path);
      }
      if (onNavigate) {
        onNavigate(item.id);
      }
    }
  };

  const handleSubItemClick = (subItem: any) => {
    if (subItem.path) {
      router.push(subItem.path);
    }
    if (onNavigate) {
      onNavigate(subItem.id);
    }
  };

  // Determine active view based on pathname, search params, or activeView prop
  const getActiveView = () => {
    if (activeView) return activeView;
    if (pathname === '/' || pathname === '/dashboard') return 'home';
    if (pathname?.startsWith('/dashboard/training')) {
      // Check URL search params for view using Next.js useSearchParams
      const view = searchParams?.get('view');
      if (view) return view;
      return 'introduction-calls';
    }
    if (pathname?.startsWith('/dashboard/evaluation')) return 'evaluation';
    if (pathname?.startsWith('/dashboard/analytics')) return 'analytics';
    if (pathname?.startsWith('/dashboard/battle')) return 'leaderboard';
    if (pathname?.startsWith('/dashboard/script')) return 'scripts';
    if (pathname?.startsWith('/dashboard/team')) return 'shadowing';
    if (pathname?.startsWith('/dashboard/profile')) return 'profile';
    return '';
  };

  const currentActiveView = getActiveView();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-gradient-to-b from-blue-900 to-violet-900 border-r border-slate-700/50 flex flex-col z-50 overflow-y-auto">
      <div className="p-6 flex items-center gap-3 shrink-0">
        <div className="w-8 h-8 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/20">
          <span className="text-white font-bold text-xl">S</span>
        </div>
        <span className="text-white font-bold text-lg tracking-wide">SALES SIM</span>
      </div>

      <nav className="flex-1 py-4 space-y-1">
        {menuItems.map((item, index) => {
          const isActive = currentActiveView === item.id || item.subItems?.some(sub => currentActiveView === sub.id);
          const isExpanded = expandedMenu === item.label;

          return (
            <div key={index}>
              <div
                onClick={() => handleItemClick(item)}
                className={`flex items-center gap-4 px-4 py-3 mx-3 cursor-pointer transition-all duration-200 group relative rounded-xl
                  ${isActive && !item.subItems
                    ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-900/20'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
              >
                <item.icon size={20} className={isActive ? 'text-white' : 'group-hover:text-white'} />
                <span className="font-medium flex-1">{item.label}</span>
                {item.subItems && (
                  isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />
                )}
              </div>

              {/* Sub-items */}
              {item.subItems && isExpanded && (
                <div className="mt-1 pb-2 space-y-0.5 relative">
                  {/* Connecting line visual guide */}
                  <div className="absolute left-11 top-0 bottom-2 w-px bg-gradient-to-b from-white/10 to-transparent"></div>

                  {item.subItems.map((subItem, subIndex) => {
                    const isSubActive = currentActiveView === subItem.id;
                    return (
                      <div
                        key={subIndex}
                        onClick={() => handleSubItemClick(subItem)}
                        className={`pl-16 pr-6 py-2.5 cursor-pointer text-sm transition-all duration-200 flex items-center justify-between relative group/sub
                          ${isSubActive
                            ? 'text-cyan-300 font-medium bg-cyan-500/10'
                            : 'text-blue-200/60 hover:text-white hover:bg-white/5'
                          }`}
                      >
                        <span className="relative z-10">{subItem.label}</span>
                        {isSubActive && (
                          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]"></div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      <div className="p-6 border-t border-white/10 shrink-0">
        <div className="flex items-center gap-3 text-slate-300 hover:text-white cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center border border-white/10">
            <span className="text-xs font-medium text-white">JD</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-white">John Doe</span>
            <span className="text-xs text-slate-400">Sales Rep</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

