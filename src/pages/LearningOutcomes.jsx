import React from 'react';
import { motion } from 'framer-motion';
import { useUserProgress } from '@/lib/useUserProgress';
import { LEARNING_OUTCOMES, getOutcomeProgress } from '@/lib/flatwiseData';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const BLOOM_COLORS = {
  Remember: { bg: '#D1FAE5', text: '#1B4332' },
  Apply: { bg: '#FEF9C3', text: '#92400E' },
  Analyse: { bg: '#E0E7FF', text: '#3730A3' },
  Evaluate: { bg: '#FCE7F3', text: '#9D174D' }
};

export default function LearningOutcomes() {
  const { progress } = useUserProgress();
  const completed = progress?.completed_modules || [];
  const completedQuizzes = progress?.completed_quizzes || [];

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-[#1A1A1A]">Learning Outcomes</h1>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <p className="text-sm text-gray-600 mt-1 cursor-help flex items-center gap-1">
                Aligned to Bloom's Revised Taxonomy (Anderson & Krathwohl, 2001)
                <span className="inline-flex items-center justify-center w-4 h-4 rounded-full border border-gray-400 text-gray-400 text-[10px] font-bold leading-none shrink-0">?</span>
              </p>
            </TooltipTrigger>
            <TooltipContent className="text-xs max-w-xs">
              <p className="font-semibold">Bloom's Revised Taxonomy</p>
              <p className="mt-1">Each learning outcome is mapped to a Bloom's cognitive level — from Remember (lowest) to Evaluate/Create (highest). The Bloom verb at the start of each outcome shows exactly which cognitive skill is being developed.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="space-y-4">
        {LEARNING_OUTCOMES.map((outcome, idx) => {
          const pct = getOutcomeProgress(outcome.id, completed, completedQuizzes);
          const bloomMeta = BLOOM_COLORS[outcome.bloomLevel] || BLOOM_COLORS.Remember;
          const status = pct === 0 ? 'Not started' : pct === 100 ? 'Achieved' : 'In progress';
          const statusColor = pct === 0 ? 'bg-gray-100 text-gray-400' :
          pct === 100 ? 'bg-[#D1FAE5] text-[#1B4332]' :
          'bg-[#1B4332] text-white';

          return (
            <motion.div key={outcome.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.08 }}>
              <div className="bg-white rounded-2xl p-4 shadow-sm">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5"
                    style={{ backgroundColor: outcome.color, color: outcome.textColor }}>
                      {outcome.number}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-base font-semibold text-[#1A1A1A]">
                        <span className="font-bold" style={{ color: outcome.textColor }}>{outcome.bloomVerb} </span>
                        {outcome.description.replace(outcome.bloomVerb + ' ', '')}
                      </p>
                    </div>
                  </div>
                  <span className={`shrink-0 text-sm font-semibold px-2.5 py-1 rounded-full ${statusColor}`}>
                    {status}
                  </span>
                </div>

                {/* Bloom level badge */}
                <div className="flex items-center gap-2 mb-3">
                  

                  
                  
                </div>

                {/* Progress bar */}
                <div>
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Progress</span>
                    <span className="font-semibold">{pct}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-[#EEF5F0] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${pct}%`,
                        backgroundColor: pct === 100 ? '#1B4332' : outcome.textColor
                      }} />
                    
                  </div>
                </div>

                {/* Related modules */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {outcome.relatedModules.map((modId) =>
                  <span key={modId}
                  className={`text-sm px-2 py-0.5 rounded-full ${completed.includes(modId) ? 'bg-[#D1FAE5] text-[#1B4332] font-semibold' : 'bg-gray-100 text-gray-400'}`}>
                      {completed.includes(modId) ? '✓ ' : ''}{modId.replace(/-/g, ' ')}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>);

        })}
      </div>

      {/* Theory note */}
      <div className="bg-[#EEF5F0] rounded-2xl p-4 text-sm text-gray-600 border-l-4 border-[#1B4332]">
        <p className="font-bold text-[#1B4332] mb-1">About this screen</p>
        <p>Each outcome is tied to specific modules and quizzes. Complete the relevant modules to achieve each outcome. Progress bars reflect how many related modules you've completed.</p>
        <p className="mt-2 italic">Bloom verbs used: Identify (Remember), Calculate & Predict (Apply), Reflect (Analyse), Recognise (Evaluate)</p>
      </div>
    </div>);

}