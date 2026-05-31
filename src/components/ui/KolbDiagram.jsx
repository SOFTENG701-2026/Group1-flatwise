import React from 'react';
import { KOLB_PHASES } from '@/lib/flatwiseData';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export default function KolbDiagram({ activePhase, size = "sm" }) {
  const isLg = size === "lg";
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className={`flex items-center gap-1 cursor-help ${isLg ? 'gap-2' : ''}`}>
            {KOLB_PHASES.map((phase, idx) => {
              const isActive = phase.id === activePhase;
              return (
                <React.Fragment key={phase.id}>
                  <div className={`flex flex-col items-center ${isLg ? 'gap-1' : ''}`}>
                    <div
                      className={`rounded-full flex items-center justify-center text-xs transition-all ${
                        isActive
                          ? 'bg-[#1B4332] text-white shadow-sm'
                          : 'bg-[#D1FAE5] text-[#1B4332]'
                      } ${isLg ? 'w-9 h-9 text-base' : 'w-7 h-7'}`}
                    >
                      {phase.icon}
                    </div>
                    {isLg && (
                      <span className={`text-xs font-medium ${isActive ? 'text-[#1B4332]' : 'text-gray-400'}`}>
                        {phase.short}
                      </span>
                    )}
                  </div>
                  {idx < KOLB_PHASES.length - 1 && (
                    <div className={`h-0.5 ${isActive || KOLB_PHASES[idx + 1].id === activePhase ? 'bg-[#1B4332]' : 'bg-gray-200'} ${isLg ? 'w-6' : 'w-3'}`} />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="max-w-xs text-xs">
          <p className="font-semibold mb-1">Kolb's Experiential Learning Cycle</p>
          <p>This simulation follows Kolb's 4-phase cycle: Experience a scenario → Reflect & predict → Learn the concept → Apply it in a new context.</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}