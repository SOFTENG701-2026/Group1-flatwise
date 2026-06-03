import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Flame, Star, BookOpen, Lock, CheckCircle, ChevronRight, ArrowRight, Trophy } from 'lucide-react';
import { useUserProgress } from '@/lib/useUserProgress';
import {
  MODULES, TIERS, getLevelFromXP, getLevelProgress, getXPForNextLevel,
  LEVEL_TITLES, isTierUnlocked, getModulesByTier } from
'@/lib/flatwiseData';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const MOTIVATIONAL_MESSAGES = {
  "income-expenses": "You now understand income and fixed costs — most first-year students skip this step.",
  "needs-wants-basics": "You can now classify expenses as needs or wants. This prevents most budget blowouts.",
  "splitting-bills": "You can calculate fair bill splits. Most flatmate conflicts start with money — you're equipped.",
  "variable-expenses": "You can forecast variable costs and name cognitive biases. That self-awareness is rare.",
  "variable-income": "Managing irregular income is a professional-level skill. You now have a framework.",
  "flatmate-conflict": "You can navigate financial conflict. Most people never learn this until they've lost a bond."
};

export default function Dashboard() {
  const { progress, loading, user } = useUserProgress();
  const name = user?.full_name?.split(' ')[0] || 'there';
  const xp = progress?.xp || 0;
  const level = getLevelFromXP(xp);
  const levelTitle = LEVEL_TITLES[level - 1];
  const levelPct = getLevelProgress(xp);
  const nextXP = getXPForNextLevel(xp);
  const completed = progress?.completed_modules || [];
  const sessionStreak = progress?.session_streak || completed.length;

  // Last completed module message
  const lastCompleted = [...completed].reverse()[0];
  const motivationMsg = lastCompleted ? MOTIVATIONAL_MESSAGES[lastCompleted] : null;

  if (loading) return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="w-8 h-8 border-3 border-[#D1FAE5] border-t-[#1B4332] rounded-full animate-spin" />
    </div>);


  return (
    <div className="space-y-5">
      {/* Greeting */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-[#1A1A1A]">Hey {name} 👋</h1>
        <p className="text-sm text-gray-600 mt-0.5">
          {completed.length === 0 ?
          "Start your budgeting journey — pick a module below." :
          `${completed.length} module${completed.length !== 1 ? 's' : ''} complete. Keep the momentum going!`}
        </p>
      </motion.div>

      {/* Last completion message */}
      {motivationMsg &&
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
      className="rounded-xl bg-[#1B4332] text-white p-4 text-sm leading-relaxed">
          🎉 {motivationMsg}
        </motion.div>
      }

      {/* XP / Level card */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="rounded-2xl bg-[#1B4332] p-5 cursor-help">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-white/80 text-sm font-medium uppercase tracking-wider">Current level</p>
                    <p className="text-white text-3xl font-bold mt-0.5">Level {level} — {levelTitle}</p>
                    <p className="text-white/80 text-base mt-1">{xp} XP total</p>
                  </div>
                  <Star className="w-8 h-8 text-[#F59E0B]" fill="#F59E0B" />
                </div>
                <div className="mt-4">
                  <div className="flex justify-between text-sm text-white/80 mb-1.5">
                    <span>Level {level}</span>
                    {nextXP && <span>Level {level + 1} at {nextXP} XP</span>}
                  </div>
                  <div className="w-full h-2.5 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-[#D1FAE5] rounded-full transition-all duration-700" style={{ width: `${levelPct}%` }} />
                  </div>
                </div>
              </div>
            </TooltipTrigger>
            <TooltipContent className="text-xs max-w-xs">
              <p className="font-semibold">Behaviourism — Habit Formation and Reinforcement</p>
              <p className="mt-1">XP and levels provide extrinsic reinforcement that builds intrinsic motivation over time.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </motion.div>

      {/* Stat pills */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white rounded-2xl p-3 text-center shadow-sm">
          <Flame className="w-5 h-5 text-[#F59E0B] mx-auto mb-1" />
          <p className="text-xl font-bold text-[#1A1A1A]">{sessionStreak}</p>
          <p className="text-sm text-gray-600">Streak</p>
        </div>
        <div className="bg-white rounded-2xl p-3 text-center shadow-sm">
          <Star className="w-5 h-5 text-[#F59E0B] mx-auto mb-1" fill="#F59E0B" />
          <p className="text-xl font-bold text-[#1A1A1A]">{xp}</p>
          <p className="text-sm text-gray-600">XP</p>
        </div>
        <div className="bg-white rounded-2xl p-3 text-center shadow-sm">
          <BookOpen className="w-5 h-5 text-[#1B4332] mx-auto mb-1" />
          <p className="text-xl font-bold text-[#1A1A1A]">{completed.length}/{MODULES.length}</p>
          <p className="text-sm text-gray-600">Modules</p>
        </div>
      </div>

      {/* Scaffolded Curriculum — Learning Path */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <h2 className="text-base font-bold text-[#1A1A1A] cursor-help underline decoration-dotted">Curriculum

                </h2>
              </TooltipTrigger>
              <TooltipContent className="text-xs max-w-xs">
                <p className="font-semibold">Vygotsky's Zone of Proximal Development</p>
                <p className="mt-1">Each tier targets what you can achieve with the right level of support — slightly beyond your current comfort zone, but achievable.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Link to="/curriculum" className="text-sm text-[#1B4332] font-medium flex items-center gap-1">
          See all <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="space-y-4">
          {TIERS.map((tier, tIdx) => {
            const unlocked = isTierUnlocked(tier.id, completed);
            const tierModules = getModulesByTier(tier.id);
            const tierDone = tierModules.filter((m) => completed.includes(m.id)).length;
            const allDone = tierDone === tierModules.length;

            return (
              <motion.div key={tier.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: tIdx * 0.1 + 0.2 }}>
                {/* Tier header */}
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                  allDone ? 'bg-[#1B4332] text-white' : unlocked ? 'bg-[#D1FAE5] text-[#1B4332]' : 'bg-gray-100 text-gray-400'}`}>
                    {allDone ? '✓' : tier.number}
                  </div>
                  <div className="flex-1">
                    <span className={`text-base font-semibold ${unlocked ? 'text-[#1A1A1A]' : 'text-gray-500'}`}>{tier.title}</span>
                    <span className="text-sm text-gray-600 ml-2">{tier.subtitle}</span>
                  </div>
                  {!unlocked && <span className="text-sm bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full flex items-center gap-1"><Lock className="w-3 h-3" />Locked</span>}
                  {unlocked && !allDone && <span className="text-sm text-gray-600">{tierDone}/{tierModules.length}</span>}
                </div>

                {/* Modules in tier */}
                <div className="space-y-2 pl-9">
                  {tierModules.map((mod, mIdx) => {
                    const done = completed.includes(mod.id);
                    const isActive = unlocked && !done && (mIdx === 0 || completed.includes(tierModules[mIdx - 1]?.id));
                    return (
                      <Link
                        key={mod.id}
                        to={unlocked ? `/module/${mod.id}` : '#'}
                        className={`flex items-center gap-3 bg-white rounded-2xl px-4 py-3 shadow-sm transition-all ${
                        isActive ? 'border-2 border-[#1B4332]' : 'border border-transparent'} ${
                        !unlocked ? 'opacity-50 pointer-events-none' : 'hover:shadow-md'}`}>
                        
                        <span className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg shrink-0`}
                        style={{ backgroundColor: mod.iconBg }}>
                          {mod.icon}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="text-base font-semibold text-[#1A1A1A] truncate">{mod.title}</p>
                          <p className="text-sm text-gray-600 truncate">{mod.subtitle}</p>
                        </div>
                        {done ?
                        <span className="shrink-0 flex items-center gap-1 text-sm font-medium text-[#1B4332] bg-[#D1FAE5] px-2.5 py-1 rounded-full">
                            <CheckCircle className="w-3.5 h-3.5" /> Done
                          </span> :
                        isActive ?
                        <span className="shrink-0 text-sm font-semibold text-white bg-[#1B4332] px-3 py-1 rounded-full">Go</span> :
                        unlocked ?
                        <ChevronRight className="w-4 h-4 text-gray-400 shrink-0" /> :

                        <Lock className="w-4 h-4 text-gray-300 shrink-0" />
                        }
                      </Link>);

                  })}
                </div>
              </motion.div>);

          })}
        </div>
      </div>

      {/* Earned badges */}
      {completed.length > 0 &&
      <div>
          <h2 className="text-base font-bold text-[#1A1A1A] mb-3">Earned Badges</h2>
          <div className="flex flex-col gap-2">
            {completed.map((id) => {
            const mod = MODULES.find((m) => m.id === id);
            if (!mod) return null;
            const badge = mod.badge;
            if (!badge) return null;
            return (
              <div key={id} className="flex items-center gap-3 bg-white rounded-2xl px-4 py-3 shadow-sm border border-gray-50">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
                    style={{ backgroundColor: badge.color }}>
                    {badge.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-base font-bold" style={{ color: badge.textColor }}>{badge.name}</p>
                    <p className="text-sm text-gray-600 leading-snug mt-0.5">{badge.description}</p>
                  </div>
                  <span className="text-sm font-medium text-gray-600 shrink-0">+{mod.xpReward} XP</span>
                </div>);
          })}
          </div>
        </div>
      }
    </div>);

}