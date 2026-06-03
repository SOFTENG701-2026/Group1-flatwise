import React from 'react';
import { Link } from 'react-router-dom';
import { Lock, CheckCircle, ChevronRight, MessageSquare, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { useUserProgress } from '@/lib/useUserProgress';
import { MODULES, TIERS, isTierUnlocked, getModulesByTier } from '@/lib/flatwiseData';
import TheoryPill from '@/components/ui/TheoryPill';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { NEGOTIATION_SCENARIOS } from '@/lib/negotiationData.js';
import { BUDGETS } from '@/lib/spotMistakeData.js';

export default function CurriculumPage() {
  const { progress } = useUserProgress();
  const completed = progress?.completed_modules || [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#1A1A1A]">Learning Modules</h1>
        <p className="text-sm text-gray-600 mt-1">Complete each tier to unlock the next</p>
      </div>

      {TIERS.map((tier, tIdx) => {
        const unlocked = isTierUnlocked(tier.id, completed);
        const tierModules = getModulesByTier(tier.id);
        const tierDone = tierModules.filter((m) => completed.includes(m.id)).length;

        return (
          <motion.div key={tier.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: tIdx * 0.1 }}>
            {/* Tier header */}
            <div className={`rounded-2xl p-4 mb-3 ${unlocked ? 'bg-[#1B4332]' : 'bg-gray-100'}`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm font-semibold uppercase tracking-wider ${unlocked ? 'text-white/80' : 'text-gray-400'}`}>
                    Tier {tier.number}
                  </p>
                  <h2 className={`text-lg font-bold mt-0.5 ${unlocked ? 'text-white' : 'text-gray-400'}`}>{tier.title}</h2>
                  <p className={`text-sm mt-1 ${unlocked ? 'text-white/70' : 'text-gray-400'}`}>{tier.subtitle}</p>
                </div>
                {!unlocked ?
                <div className="flex flex-col items-center gap-1">
                    <Lock className="w-6 h-6 text-gray-400" />
                    <span className="text-xs text-gray-400">Locked</span>
                  </div> :

                <div className="text-right">
                    <p className="text-white text-base font-semibold">{tierDone}/{tierModules.length}</p>
                    <p className="text-white/70 text-sm">complete</p>
                  </div>
                }
              </div>
              {/* ZPD note */}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    

                    
                  </TooltipTrigger>
                  <TooltipContent className="text-xs max-w-xs">
                    <p className="font-semibold">Scaffolded Curriculum — Vygotsky's ZPD</p>
                    <p className="mt-1">Each tier sits just beyond the learner's current ability — achievable with effort, not overwhelming. This is Vygotsky's Zone of Proximal Development in practice.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            {/* Module cards */}
            <div className="space-y-3">
              {tierModules.map((mod, mIdx) => {
                const done = completed.includes(mod.id);
                const isNext = unlocked && !done && (mIdx === 0 || completed.includes(tierModules[mIdx - 1]?.id));

                return (
                  <Link
                    key={mod.id}
                    to={unlocked ? `/module/${mod.id}` : '#'}
                    className={`block bg-white rounded-2xl p-4 shadow-sm transition-all ${
                    isNext ? 'border-2 border-[#1B4332]' : 'border border-transparent'} ${
                    !unlocked ? 'opacity-50 pointer-events-none' : 'hover:shadow-md'}`}>
                    
                    <div className="flex items-start gap-3">
                      <span className="w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0"
                      style={{ backgroundColor: mod.iconBg }}>
                        {mod.icon}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-sm font-bold text-[#1A1A1A]">{mod.title}</p>
                          {done ?
                          <span className="shrink-0 flex items-center gap-1 text-xs text-[#1B4332] bg-[#D1FAE5] px-2 py-0.5 rounded-full font-semibold">
                              <CheckCircle className="w-3 h-3" /> Done
                            </span> :
                          isNext ?
                          <span className="shrink-0 text-xs font-bold text-white bg-[#1B4332] px-3 py-1 rounded-full">Start</span> :

                          <ChevronRight className="w-4 h-4 text-gray-300 shrink-0" />
                          }
                        </div>
                        <p className="text-sm text-gray-600 mt-0.5">{mod.subtitle}</p>
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {mod.theories.map((t, i) =>
                          <TheoryPill key={i} label={t.label} color={t.color} text={t.text} />
                          )}
                        </div>
                        {/* Scaffolding indicator */}
                        <div className="mt-2 text-sm text-gray-600 flex items-center gap-1">
                          <span className={`w-2 h-2 rounded-full ${
                          mod.scaffolding === 'full' ? 'bg-green-400' :
                          mod.scaffolding === 'request' ? 'bg-yellow-400' : 'bg-gray-300'}`
                          } />
                          {mod.scaffolding === 'full' ? 'Scaffolding: ON — hints visible' :
                          mod.scaffolding === 'request' ? 'Scaffolding: Hint available on request' :
                          'Scaffolding: OFF — no hints'}
                        </div>
                      </div>
                    </div>
                  </Link>);

              })}
            </div>
          </motion.div>);

      })}

      {/* ── Negotiation Activities ── */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <div className="bg-[#FEF9C3] rounded-2xl p-4 mb-3">
          <div className="flex items-center gap-2 mb-0.5">
            <MessageSquare className="w-5 h-5 text-[#92400E]" />
            <p className="text-xs font-semibold uppercase tracking-wider text-[#92400E]">Activities</p>
          </div>
          <h2 className="text-lg font-bold text-[#1A1A1A]">Negotiation Scenarios</h2>
          <p className="text-xs text-[#92400E]/70 mt-0.5">Practice real flatting conflict conversations</p>
        </div>
        <div className="space-y-3">
          {NEGOTIATION_SCENARIOS.map((s, i) => (
            <Link key={s.id} to={`/negotiation/${s.id}`}
              className="block bg-white rounded-2xl p-4 shadow-sm border border-transparent hover:border-[#FEF9C3] hover:shadow-md transition-all">
              <div className="flex items-start gap-3">
                <span className="w-11 h-11 rounded-xl bg-[#FEF9C3] flex items-center justify-center text-xl shrink-0">{s.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-bold text-[#1A1A1A]">{s.title}</p>
                    <ChevronRight className="w-4 h-4 text-gray-300 shrink-0" />
                  </div>
                  <p className="text-sm text-gray-600 mt-0.5">{s.subtitle}</p>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    <TheoryPill label="Kolb: Active Experimentation" color="#FEF9C3" text="#92400E" tooltip="Kolb — Active Experimentation phase: practice strategies and observe consequences." />
                    <TheoryPill label="Bloom: Evaluate" color="#D1FAE5" text="#1B4332" tooltip="Bloom — Evaluate: judge the effectiveness of different negotiation approaches." />
                  </div>
                  <p className="text-sm text-gray-600 mt-2">3 decision rounds · iMessage-style chat</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </motion.div>

      {/* ── Spot the Mistake Activities ── */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
        <div className="bg-[#E0E7FF] rounded-2xl p-4 mb-3">
          <div className="flex items-center gap-2 mb-0.5">
            <Search className="w-5 h-5 text-[#3730A3]" />
            <p className="text-xs font-semibold uppercase tracking-wider text-[#3730A3]">Activities</p>
          </div>
          <h2 className="text-lg font-bold text-[#1A1A1A]">Spot the Mistake</h2>
          <p className="text-sm text-[#3730A3]/70 mt-0.5">Find the 3 errors hidden in student budgets</p>
        </div>
        <div className="space-y-3">
          {BUDGETS.map((b, i) => (
            <Link key={b.id} to={`/spot-mistake/${b.id}`}
              className="block bg-white rounded-2xl p-4 shadow-sm border border-transparent hover:border-[#E0E7FF] hover:shadow-md transition-all">
              <div className="flex items-start gap-3">
                <span className="w-11 h-11 rounded-xl bg-[#E0E7FF] flex items-center justify-center text-xl shrink-0">🔍</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-bold text-[#1A1A1A]">{b.title}</p>
                    <ChevronRight className="w-4 h-4 text-gray-300 shrink-0" />
                  </div>
                  <p className="text-sm text-gray-600 mt-0.5">{b.subtitle}</p>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    <TheoryPill label="Bloom: Analyse" color="#D1FAE5" text="#1B4332" tooltip="Bloom — Analyse: break down a budget to identify errors and inconsistencies." />
                    <TheoryPill label="Cognitivism: Error detection" color="#E0E7FF" text="#3730A3" tooltip="Cognitivism — Error detection trains learners to notice systematic mistakes." />
                  </div>
                  <p className="text-sm text-gray-600 mt-2">3 mistakes hidden · Tap to find them</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </motion.div>
    </div>);

}