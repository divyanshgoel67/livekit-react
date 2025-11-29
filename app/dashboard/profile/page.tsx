'use client';

export default function ProfilePage() {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4 animate-in fade-in duration-500">
      <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center">
        <span className="text-4xl">🚧</span>
                  </div>
      <h2 className="text-2xl font-bold text-slate-900">Profile</h2>
      <p className="text-slate-500 max-w-md">
        This training module is currently under construction. Please check back later or try the Introduction Calls module.
      </p>
    </div>
  );
}
