'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BarChart3, Home, LayoutGrid, ScrollText, Swords, Target, User, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

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
    <aside className="bg-sidebar border-border fixed top-0 left-0 z-40 flex h-screen w-20 flex-col items-center gap-6 border-r py-6">
      <Link
        href="/"
        className={cn(
          'flex h-12 w-12 cursor-pointer items-center justify-center rounded-xl transition-all',
          isHomeActive
            ? 'bg-primary text-primary-foreground shadow-lg'
            : 'text-muted-foreground hover:bg-muted hover:text-foreground'
        )}
      >
        <Home className="h-6 w-6" />
      </Link>

      <nav className="flex flex-1 flex-col gap-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.path;

          return (
            <Link
              key={item.path}
              href={item.path}
              className={cn(
                'flex h-12 w-12 items-center justify-center rounded-xl transition-all',
                isActive
                  ? 'bg-primary text-primary-foreground shadow-lg'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              )}
              title={item.label}
            >
              <Icon className="h-5 w-5" />
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
