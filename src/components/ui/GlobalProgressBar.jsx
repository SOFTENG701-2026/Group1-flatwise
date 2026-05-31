import React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useUserProgress } from '@/lib/useUserProgress';
import { getOverallProgress } from '@/lib/flatwiseData';

export default function GlobalProgressBar() {
  const { progress } = useUserProgress();
  const completed = progress?.completed_modules || [];
  const pct = getOverallProgress(completed);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="w-full cursor-help">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-medium text-[#1B4332]">Overall progress</span>
              <span className="text-xs font-semibold text-[#1B4332]">{pct}%</span>
            </div>
            <div className="w-full h-2 bg-[#D1FAE5] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#1B4332] rounded-full transition-all duration-700"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent className="text-xs">
          <p className="font-semibold">Behaviourism — Habit Formation and Reinforcement</p>
          <p className="mt-1">Visible progress reinforces continued engagement and builds learning momentum.</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}