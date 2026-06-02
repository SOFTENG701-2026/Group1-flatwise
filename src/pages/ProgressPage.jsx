import React from 'react';
import { motion } from 'framer-motion';
import { Star, Flame, BookOpen, Trophy, Lock } from 'lucide-react';
import { useUserProgress } from '@/lib/useUserProgress';
import {
  MODULES, TIERS, LEVEL_TITLES, getLevelFromXP, getLevelProgress,
  getXPForNextLevel, LEVEL_THRESHOLDS, isTierUnlocked, getModulesByTier,
  COGNITIVE_BIASES
} from '@/lib/flatwiseData';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export default function ProgressPage() {
  const { progress } = useUserProgress();
  const xp = progress?.xp || 0;
  const level = getLevelFromXP(xp);
  const levelPct = getLevelProgress(xp);
  const nextXP = getXPForNextLevel(xp);
  const streak = progress?.streak_days || 0;
  const completed = progress?.completed_modules || [];
  const watchedBiases = progress?.watched_biases || [];

  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-bold text-[#1A1A1A]">My Progress</h1>

      {/* XP card */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="bg-[#1B4332] rounded-2xl p-5 cursor-help">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-white/80 text-xs font-semibold">Level {level} — {LEVEL_TITLES[level - 1]}</p>
                  <p className="text-white text-3xl font-bold">{xp} XP</p>
                </div>
                <Star className="w-10 h-10 text-[#F59E0B]" fill="#F59E0B" />
              </div>
              <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-[#D1FAE5] rounded-full" style={{ width: `${levelPct}%` }} />
              </div>
              {nextXP && <p className="text-white/70 text-xs mt-1">{nextXP - xp} XP to Level {level + 1}</p>}
            </div>
          </TooltipTrigger>
          <TooltipContent className="text-xs max-w-xs">
            <p className="font-semibold">Behaviourism — Habit Formation and Reinforcement</p>
            <p className="mt-1">Visible XP progress reinforces continued engagement through a variable-ratio reward schedule — one of the most powerful reinforcement mechanisms in learning science.</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white rounded-2xl p-3 text-center shadow-sm">
          <Flame className="w-5 h-5 text-[#F59E0B] mx-auto mb-1" />
          <p className="text-xl font-bold text-[#1A1A1A]">{streak}</p>
          <p className="text-xs text-gray-600">Streak</p>
        </div>
        <div className="bg-white rounded-2xl p-3 text-center shadow-sm">
          <BookOpen className="w-5 h-5 text-[#1B4332] mx-auto mb-1" />
          <p className="text-xl font-bold text-[#1A1A1A]">{completed.length}/{MODULES.length}</p>
          <p className="text-xs text-gray-600">Modules</p>
        </div>
        <div className="bg-white rounded-2xl p-3 text-center shadow-sm">
          <Trophy className="w-5 h-5 text-[#F59E0B] mx-auto mb-1" />
          <p className="text-xl font-bold text-[#1A1A1A]">{watchedBiases.length}</p>
          <p className="text-xs text-gray-600">Biases tracked</p>
        </div>
      </div>

      {/* Tier progress */}
      {TIERS.map((tier, tIdx) => {
        const unlocked = isTierUnlocked(tier.id, completed);
        const tierModules = getModulesByTier(tier.id);
        const tierDone = tierModules.filter(m => completed.includes(m.id)).length;
        const pct = Math.round((tierDone / tierModules.length) * 100);

        return (
          <motion.div key={tier.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: tIdx * 0.1 }}>
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {!unlocked && <Lock className="w-4 h-4 text-gray-300" />}
                  <p className={`text-sm font-bold ${unlocked ? 'text-[#1A1A1A]' : 'text-gray-400'}`}>Tier {tier.number}: {tier.title}</p>
                </div>
                <span className={`text-xs font-semibold ${unlocked ? 'text-[#1B4332]' : 'text-gray-400'}`}>{tierDone}/{tierModules.length}</span>
              </div>
              <div className="w-full h-2 bg-[#EEF5F0] rounded-full overflow-hidden">
                <div className="h-full bg-[#1B4332] rounded-full transition-all duration-700" style={{ width: `${unlocked ? pct : 0}%` }} />
              </div>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {tierModules.map(m => (
                  <span key={m.id} className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    completed.includes(m.id) ? 'bg-[#D1FAE5] text-[#1B4332]' : 'bg-gray-100 text-gray-400'
                  }`}>
                    {m.icon} {m.title}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        );
      })}

      {/* Biases to Watch */}
      <div className="bg-white rounded-2xl p-4 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-bold text-[#1A1A1A]">Biases to Watch</p>
          <span className="text-xs text-gray-600 bg-gray-100 px-2 py-0.5 rounded-full">Cognitivism</span>
        </div>
        {watchedBiases.length === 0 ? (
          <p className="text-xs text-gray-600 text-center py-3">No biases tracked yet — complete a simulation to detect them.</p>
        ) : (
          <div className="space-y-2">
            {watchedBiases.map(biasId => {
              const bias = COGNITIVE_BIASES[biasId];
              if (!bias) return null;
              return (
                <div key={biasId} className="flex items-center gap-3 p-2 rounded-xl"
                  style={{ backgroundColor: bias.color }}>
                  <span className="text-xl">{bias.icon}</span>
                  <div>
                    <p className="text-sm font-bold" style={{ color: bias.textColor }}>{bias.name}</p>
                    <p className="text-xs" style={{ color: bias.textColor + 'cc' }}>{bias.tagline}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Level map */}
      <div className="bg-white rounded-2xl p-4 shadow-sm">
        <p className="text-sm font-bold text-[#1A1A1A] mb-3">Level Map</p>
        <div className="grid grid-cols-2 gap-2">
          {LEVEL_TITLES.map((title, i) => (
            <div key={i} className={`p-2.5 rounded-xl text-center ${
              i + 1 === level ? 'bg-[#1B4332] text-white' :
              i + 1 < level ? 'bg-[#D1FAE5] text-[#1B4332]' : 'bg-gray-50 text-gray-400'
            }`}>
              <p className="text-xs font-bold">Lv {i + 1}</p>
              <p className="text-xs mt-0.5">{title}</p>
              <p className="text-xs opacity-70">{LEVEL_THRESHOLDS[i]} XP</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}