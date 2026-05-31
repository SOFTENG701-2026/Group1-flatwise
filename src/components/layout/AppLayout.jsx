import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, Gamepad2, BarChart2, Menu, X, Target, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import GlobalProgressBar from '@/components/ui/GlobalProgressBar';
import { useUserProgress } from '@/lib/useUserProgress';

const NAV = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/curriculum', label: 'Learn', icon: BookOpen },
  { path: '/simulator', label: 'Simulate', icon: Gamepad2 },
  { path: '/outcomes', label: 'Outcomes', icon: Target },
  { path: '/progress', label: 'Progress', icon: BarChart2 },
  { path: '/my-flat', label: 'My Flat', icon: Users },
];

export default function AppLayout() {
  const [open, setOpen] = useState(false);
  const loc = useLocation();
  const { progress, user } = useUserProgress();
  const initials = user?.full_name ? user.full_name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : 'U';

  return (
    <div className="min-h-screen bg-[#EEF5F0]">
      {/* Top bar */}
      <header className="sticky top-0 z-50 bg-white border-b border-[#D1FAE5] shadow-sm">
        <div className="max-w-[420px] mx-auto px-4 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#1B4332] flex items-center justify-center text-white text-sm font-bold">🏠</div>
            <span className="font-bold text-[#1B4332] text-base">FlatWise</span>
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#1B4332] flex items-center justify-center text-white text-xs font-bold">
              {initials}
            </div>
            <button className="lg:hidden" onClick={() => setOpen(o => !o)}>
              {open ? <X className="w-5 h-5 text-[#1B4332]" /> : <Menu className="w-5 h-5 text-[#1B4332]" />}
            </button>
          </div>
        </div>
        {/* Global progress bar */}
        <div className="max-w-[420px] mx-auto px-4 pb-2">
          <GlobalProgressBar />
        </div>
      </header>

      {/* Mobile nav drawer */}
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            className="fixed inset-x-0 top-[88px] z-40 bg-white border-b border-[#D1FAE5] shadow-lg max-w-[420px] mx-auto">
            <nav className="p-3 space-y-1">
              {NAV.map(item => {
                const Icon = item.icon;
                const active = loc.pathname === item.path || (item.path !== '/' && loc.pathname.startsWith(item.path));
                return (
                  <Link key={item.path} to={item.path} onClick={() => setOpen(false)}
                    className={cn("flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                      active ? "bg-[#1B4332] text-white" : "text-gray-600 hover:bg-[#EEF5F0]")}>
                    <Icon className="w-5 h-5" />{item.label}
                  </Link>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page content */}
      <main className="max-w-[420px] mx-auto px-4 py-6 pb-24">
        <Outlet />
      </main>

      {/* Bottom nav */}
      <nav className="fixed bottom-0 inset-x-0 z-40 bg-white border-t border-[#D1FAE5] shadow-lg">
        <div className="max-w-[420px] mx-auto flex">
          {NAV.map(item => {
            const Icon = item.icon;
            const active = loc.pathname === item.path || (item.path !== '/' && loc.pathname.startsWith(item.path));
            return (
              <Link key={item.path} to={item.path}
                className={cn("flex-1 flex flex-col items-center py-2.5 gap-0.5 text-xs font-medium transition-all",
                  active ? "text-[#1B4332]" : "text-gray-400")}>
                <Icon className={cn("w-5 h-5", active && "stroke-[2.5]")} />
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}