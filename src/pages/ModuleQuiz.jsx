import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Trophy, RotateCcw } from 'lucide-react';
import { MODULES } from '@/lib/flatwiseData';
import { useUserProgress } from '@/lib/useUserProgress';
import TheoryPill from '@/components/ui/TheoryPill';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const BLOOM_COLORS = {
  Remember: { bg: '#D1FAE5', text: '#1B4332' },
  Apply: { bg: '#FEF9C3', text: '#92400E' },
  Evaluate: { bg: '#FCE7F3', text: '#9D174D' }
};

export default function ModuleQuiz() {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const { completeModule, addXP } = useUserProgress();
  const mod = MODULES.find((m) => m.id === moduleId);
  const questions = mod?.quiz;

  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [attempts, setAttempts] = useState(0); // 0 = not answered, 1 = first attempt, 2 = second
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  if (!mod || !questions) return <p className="text-center py-20 text-gray-500">Module not found</p>;

  const q = questions[current];
  const bloomMeta = BLOOM_COLORS[q.bloom] || BLOOM_COLORS.Remember;
  const totalQ = questions.length;

  const handleSelect = (idx) => {
    if (attempts >= 2 || isCorrect) return;
    setSelected(idx);
    const correct = idx === q.correct;
    setAttempts((a) => a + 1);
    if (correct) {
      setIsCorrect(true);
      setScore((s) => s + (attempts === 0 ? 2 : 1));
    }
  };

  const handleNext = () => {
    if (current < totalQ - 1) {
      setCurrent((c) => c + 1);
      setSelected(null);
      setAttempts(0);
      setIsCorrect(false);
    } else {
      setDone(true);
      completeModule(moduleId, mod.xpReward);
      addXP(score * 15);
    }
  };

  const handleReveal = () => {
    setSelected(q.correct);
    setAttempts(2);
  };

  if (done) {
    const maxScore = totalQ * 2;
    const pct = Math.round(score / maxScore * 100);
    // Find next module
    const idx = MODULES.findIndex((m) => m.id === moduleId);
    const next = MODULES[idx + 1];

    return (
      <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="space-y-5">
        {/* Completion header */}
        <div className="bg-[#1B4332] rounded-2xl p-5 text-center">
          <div className="w-14 h-14 rounded-full bg-[#D1FAE5] flex items-center justify-center text-2xl mx-auto mb-3">🏆</div>
          <p className="text-white/80 text-sm font-semibold uppercase tracking-wider">Module complete!</p>
          <p className="text-white text-xl font-bold mt-1">{mod.title}</p>
          <button className="mt-3 px-4 py-1.5 rounded-full bg-[#D1FAE5] text-[#1B4332] text-sm font-bold">
            +{mod.xpReward + score * 15} XP earned
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white rounded-2xl p-3 text-center shadow-sm">
            <p className="text-xl font-bold text-[#1A1A1A]">{totalQ}</p>
            <p className="text-sm text-gray-600">Activities</p>
          </div>
          <div className="bg-[#D1FAE5] rounded-2xl p-3 text-center">
            <p className="text-xl font-bold text-[#1B4332]">{mod.xpReward + score * 15}</p>
            <p className="text-sm text-[#1B4332]">XP Earned</p>
          </div>
          <div className="bg-white rounded-2xl p-3 text-center shadow-sm">
            <p className="text-xl font-bold text-[#1A1A1A]">{pct}%</p>
            <p className="text-sm text-gray-600">Quiz Score</p>
          </div>
        </div>

        {/* What you learned */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <p className="text-sm font-bold text-gray-600 uppercase tracking-wider mb-3">What you learned</p>
          <ul className="space-y-2">
            {mod.outcomes.map((o, i) =>
            <li key={i} className="flex items-start gap-2 text-sm text-[#1A1A1A]">
                <CheckCircle className="w-4 h-4 text-[#1B4332] shrink-0 mt-0.5" />
                {o}
              </li>
            )}
          </ul>
        </div>

        {/* Motivational message */}
        <div className="bg-[#EEF5F0] rounded-2xl p-4 text-sm text-[#1B4332] font-medium border-l-4 border-[#1B4332]">
          {mod.motivationalMsg}
        </div>

        {/* Unlock next */}
        {next &&
        <div className="bg-white rounded-2xl p-4 shadow-sm flex items-center gap-3">
            <span className="text-2xl">{next.icon}</span>
            <div>
              <p className="text-sm text-gray-600">Unlocked</p>
              <p className="text-base font-bold text-[#1B4332]">Module {next.order} — {next.title}</p>
            </div>
          </div>
        }

        <button onClick={() => navigate('/')}
        className="w-full h-12 bg-[#1B4332] text-white rounded-2xl font-semibold text-sm">
          Back to dashboard
        </button>
      </motion.div>);

  }

  const showResult = selected !== null;
  const isRight = selected === q.correct;
  const canRetry = attempts === 1 && !isCorrect;
  const forceReveal = attempts >= 2 && !isCorrect;

  return (
    <div className="space-y-5">
      {/* Header */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="cursor-help">
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-bold text-gray-600 uppercase tracking-wider">Knowledge Check</p>
                <span className="text-sm text-gray-600">{current + 1}/{totalQ}</span>
              </div>
              <div className="flex gap-1.5">
                {questions.map((_, i) =>
                <div key={i} className={`flex-1 h-1.5 rounded-full ${i < current ? 'bg-[#1B4332]' : i === current ? 'bg-[#D1FAE5] border border-[#1B4332]' : 'bg-gray-200'}`} />
                )}
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-sm text-gray-600">Score: {score}/{current * 2 + (isCorrect ? 2 : attempts > 0 ? 1 : 0)}</span>
                <TheoryPill label="Bloom: Apply" color={bloomMeta.bg} text={bloomMeta.text} />
              </div>
            </div>
          </TooltipTrigger>
          <TooltipContent className="text-xs max-w-xs">
            <p className="font-semibold">Behaviourism — Reinforcement and Feedback</p>
            <p className="mt-1">Immediate, explanatory feedback after each answer reinforces correct understanding and corrects misconceptions in the moment — far more effective than delayed feedback.</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div key={current} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
        className="bg-white rounded-2xl p-4 shadow-sm space-y-4">
          <div className="flex items-start justify-between gap-2">
            <p className="text-sm font-semibold text-[#1A1A1A] flex-1">{q.question}</p>
            

            
          </div>

          <div className="space-y-2">
            {q.options.map((opt, i) => {
              const isSel = selected === i;
              const isAns = i === q.correct;
              let style = 'border-gray-200 bg-white text-[#1A1A1A]';
              if (showResult) {
                if (isSel && isRight) style = 'border-[#1B4332] bg-[#D1FAE5] text-[#1B4332]';else
                if (isSel && !isRight) style = 'border-red-300 bg-red-50 text-red-700';else
                if (!isSel && isAns && forceReveal) style = 'border-[#1B4332]/40 bg-[#D1FAE5]/40 text-[#1B4332]';
              }
              return (
                <button key={i} onClick={() => handleSelect(i)}
                disabled={isCorrect || attempts >= 2}
                className={`w-full text-left px-4 py-3 rounded-xl border text-sm font-medium transition-all flex items-start gap-3 ${style} ${!showResult ? 'hover:border-[#1B4332]/30' : ''}`}>
                  <span className="shrink-0 w-5 h-5 rounded-full border flex items-center justify-center text-xs">
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="flex-1">{opt}</span>
                  {showResult && isSel && isRight && <CheckCircle className="w-5 h-5 text-[#1B4332] shrink-0" />}
                  {showResult && isSel && !isRight && <XCircle className="w-5 h-5 text-red-500 shrink-0" />}
                </button>);

            })}
          </div>

          {/* Feedback */}
          {showResult &&
          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
          className={`rounded-xl p-3 text-sm ${isRight ? 'bg-[#D1FAE5] text-[#1B4332]' : 'bg-red-50 text-red-700'}`}>
              {isRight ?
            <>✓ {q.correctExplanation}</> :
            forceReveal ?
            <>The answer is: <strong>{q.options[q.correct]}</strong>. {q.wrongExplanation}</> :

            <>{q.wrongExplanation}</>
            }
            </motion.div>
          }

          {/* Action buttons */}
          {showResult && !isRight && canRetry &&
          <button onClick={() => {setSelected(null);}}
          className="w-full h-10 border-2 border-[#1B4332] text-[#1B4332] rounded-xl font-semibold text-sm flex items-center justify-center gap-2">
              <RotateCcw className="w-4 h-4" /> Try again
            </button>
          }
          {showResult && !isRight && !canRetry && !forceReveal &&
          <button onClick={handleReveal}
          className="w-full h-10 border-2 border-gray-300 text-gray-600 rounded-xl text-sm">
              Show answer
            </button>
          }
          {(isRight || forceReveal) &&
          <button onClick={handleNext}
          className="w-full h-12 bg-[#1B4332] text-white rounded-2xl font-semibold text-sm">
              {current < totalQ - 1 ? 'Next question →' : 'Complete module →'}
            </button>
          }
        </motion.div>
      </AnimatePresence>
    </div>);

}