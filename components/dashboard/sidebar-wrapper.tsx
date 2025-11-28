'use client';

import { Suspense } from 'react';
import Sidebar from './sidebar-new';

export function SidebarWrapper() {
  return (
    <Suspense fallback={<div className="fixed left-0 top-0 h-screen w-64 bg-gradient-to-b from-blue-900 to-violet-900"></div>}>
      <Sidebar />
    </Suspense>
  );
}
