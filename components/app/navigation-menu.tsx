'use client';

import Link from 'next/link';
import { Home, Target, LayoutGrid, BarChart3, Swords, ScrollText, Users, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

const navItems = [
  { icon: Home, label: 'Dashboard', path: '/' },
  { icon: Target, label: 'Training', path: '/dashboard/training' },
  { icon: LayoutGrid, label: 'Modules', path: '/dashboard/modules' },
  { icon: BarChart3, label: 'Analytics', path: '/dashboard/analytics' },
  { icon: Swords, label: 'Battle', path: '/dashboard/battle' },
  { icon: ScrollText, label: 'Script', path: '/dashboard/script' },
  { icon: Users, label: 'Team', path: '/dashboard/team' },
  { icon: User, label: 'Profile', path: '/dashboard/profile' },
];

export function NavigationMenu() {
  const pathname = usePathname();

  return (
    <nav className="hidden md:flex items-center gap-1">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.path;

        return (
          <Link
            key={item.path}
            href={item.path}
            className={cn(
              'flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors',
              isActive
                ? 'text-foreground bg-muted'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            )}
          >
            <Icon className="w-4 h-4" />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

