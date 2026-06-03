import React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const THEORY_TOOLTIPS = {
  "Bloom: Identify": "Bloom's Revised Taxonomy — Remember level. Learners identify and recall key concepts.",
  "Bloom: Calculate": "Bloom's Revised Taxonomy — Apply level. Learners use knowledge to solve real problems.",
  "Bloom: Predict": "Bloom's Revised Taxonomy — Apply/Analyse level. Learners forecast outcomes using principles.",
  "Bloom: Reflect": "Bloom's Revised Taxonomy — Analyse/Evaluate level. Learners critically examine their own decisions.",
  "Bloom: Apply": "Bloom's Revised Taxonomy — Apply level. Learners use a concept in a new context.",
  "Bloom: Evaluate": "Bloom's Revised Taxonomy — Evaluate level. Learners make judgements using criteria.",
  "Bloom: Analyse": "Bloom's Revised Taxonomy — Analyse level. Learners break down information to identify patterns and errors.",
  "Kolb: predict → reflect": "Kolb's Experiential Learning Cycle — learners predict, experience, reflect, and then apply concepts.",
  "Kolb: full cycle": "Kolb's full 4-phase cycle: Concrete Experience → Reflective Observation → Abstract Conceptualisation → Active Experimentation.",
  "Kolb: Active Experimentation": "Kolb's Experiential Learning Cycle — Active Experimentation phase. Learners test strategies in realistic contexts and observe the consequences.",
  "Constructivist scaffolding": "Vygotsky's ZPD — hints and support are gradually removed as learner competence increases (fading scaffolding).",
  "Social constructivism": "Social Constructivism (Vygotsky) — learning is deepened through realistic social and collaborative scenarios.",
  "Cognitivism: bias surfacing": "Cognitivism — surfacing and naming cognitive biases helps learners correct systematic errors in thinking.",
  "Cognitivism: Error detection": "Cognitivism — Error detection tasks train learners to notice systematic mistakes, improving metacognitive accuracy."
};

export default function TheoryPill({ label, color = "#D1FAE5", text = "#1B4332", tooltip }) {
  const tip = tooltip || THEORY_TOOLTIPS[label] || label;
  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          




          
        </TooltipTrigger>
        <TooltipContent side="bottom" className="max-w-xs text-xs">
          {tip}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>);

}