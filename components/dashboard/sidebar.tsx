'use client';

import { Home, Users, Target, Swords, ScrollText, BarChart3, User, LayoutGrid } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const navItems = [
  { icon: Target, label: 'Training', path: '/dashboard/training' },
  { icon: LayoutGrid, label: 'Modules', path: '/dashboard/modules' },
  { icon: BarChart3, label: 'Analytics', path: '/dashboard/analytics' },
  { icon: Swords, label: 'Battle', path: '/dashboard/battle' },
  { icon: ScrollText, label: 'Script', path: '/dashboard/script' },
  { icon: Users, label: 'Team', path: '/dashboard/team' },
  { icon: User, label: 'Profile', path: '/dashboard/profile' },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const isHomeActive = pathname === '/';

  return (
    <aside className="fixed left-0 top-0 h-screen w-20 bg-sidebar border-r border-border flex flex-col items-center py-6 gap-6 z-40">
      <Link
        href="/"
        className={cn(
          'w-12 h-12 rounded-xl flex items-center justify-center cursor-pointer transition-all',
          isHomeActive
            ? 'bg-primary text-primary-foreground shadow-lg'
            : 'text-muted-foreground hover:bg-muted hover:text-foreground'
        )}
      >
        <Home className="w-6 h-6" />
      </Link>

      <nav className="flex-1 flex flex-col gap-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.path;

          return (
            <Link
              key={item.path}
              href={item.path}
              className={cn(
                'w-12 h-12 rounded-xl flex items-center justify-center transition-all',
                isActive
                  ? 'bg-primary text-primary-foreground shadow-lg'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              )}
              title={item.label}
            >
              <Icon className="w-5 h-5" />
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
