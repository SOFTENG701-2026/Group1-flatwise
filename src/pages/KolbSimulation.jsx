import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Info } from 'lucide-react';
import { MODULES, COGNITIVE_BIASES, KOLB_PHASES } from '@/lib/flatwiseData';
import { useUserProgress } from '@/lib/useUserProgress';
import KolbDiagram from '@/components/ui/KolbDiagram';
import TheoryPill from '@/components/ui/TheoryPill';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export default function KolbSimulation() {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const { progress, addXP } = useUserProgress();
  const mod = MODULES.find(m => m.id === moduleId);
  const scene = mod?.kolbScenario;

  const [phase, setPhase] = useState('experience'); // experience | predict | concept | apply
  const [prediction, setPrediction] = useState('');
  const [predictionSubmitted, setPredictionSubmitted] = useState(false);
  const [selectedApply, setSelectedApply] = useState(null);
  const [applyAnswered, setApplyAnswered] = useState(false);
  const [biasDetected, setBiasDetected] = useState(null);
  const [biasWatching, setBiasWatching] = useState(false);

  if (!mod || !scene) return <p className="text-center py-20 text-gray-500">Module not found</p>;

  const watchedBiases = progress?.watched_biases || [];

  const handlePredictionSubmit = () => {
    const val = parseFloat(prediction);
    if (isNaN(val)) return;
    setPredictionSubmitted(true);

    // Bias detection
    const deviation = (scene.actualOutcome - val) / scene.actualOutcome;
    if (deviation > 0.25) setBiasDetected(COGNITIVE_BIASES.present_bias);
    else if (deviation < -0.25) setBiasDetected(COGNITIVE_BIASES.optimism_bias);
    else setBiasDetected(null);

    setPhase('concept');
  };

  const handleApply = (idx) => {
    if (applyAnswered) return;
    setSelectedApply(idx);
    setApplyAnswered(true);
    if (scene.applyQuestion.options[idx].correct) addXP(30);
    else addXP(10);
  };

  const phaseIndex = KOLB_PHASES.findIndex(p => p.id === phase);
  const predVal = parseFloat(prediction) || 0;
  const maxBar = Math.max(predVal, scene.actualOutcome, 10);
  const predPct = Math.min((predVal / maxBar) * 100, 100);
  const actualPct = Math.min((scene.actualOutcome / maxBar) * 100, 100);
  const deviationPct = predVal > 0 ? Math.round(Math.abs(predVal - scene.actualOutcome) / scene.actualOutcome * 100) : 0;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-[#1A1A1A]">{scene.title}</h1>
          <p className="text-sm text-gray-600">{mod.title}</p>
        </div>
        <KolbDiagram activePhase={phase} />
      </div>

      {/* Phase indicator */}
      <div className="flex items-center gap-0">
        {KOLB_PHASES.map((p, i) => (
          <React.Fragment key={p.id}>
            <div className={`flex-1 text-center py-2 text-xs font-semibold rounded-xl transition-all ${
              p.id === phase ? 'bg-[#1B4332] text-white' : i < phaseIndex ? 'bg-[#D1FAE5] text-[#1B4332]' : 'bg-gray-100 text-gray-400'
            }`}>
              {p.short}
            </div>
            {i < KOLB_PHASES.length - 1 && <div className="w-1" />}
          </React.Fragment>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* ── PHASE 1: EXPERIENCE ── */}
        {phase === 'experience' && (
          <motion.div key="exp" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <div className="flex items-start justify-between mb-2">
                <p className="text-sm font-bold text-[#1B4332] uppercase tracking-wider">The Scenario</p>
                <TheoryPill label="Kolb: predict → reflect" color="#FEF9C3" text="#92400E" />
              </div>
              <p className="text-base text-gray-700 leading-relaxed mt-2">{scene.concreteSituation}</p>
            </div>
            {mod.scaffolding === 'full' && (
              <div className="bg-[#EEF5F0] rounded-2xl p-3 text-xs text-gray-600 flex items-start gap-2">
                <Info className="w-4 h-4 text-[#1B4332] shrink-0 mt-0.5" />
                <span className="text-sm"><strong>Hint (Tier 1):</strong> Before continuing, think about the numbers mentioned. What's your gut estimate?</span>
              </div>
            )}
            <button onClick={() => setPhase('predict')}
              className="w-full h-12 bg-[#1B4332] text-white rounded-2xl font-semibold text-sm">
              Make my prediction →
            </button>
          </motion.div>
        )}

        {/* ── PHASE 2: PREDICT ── */}
        {phase === 'predict' && (
          <motion.div key="pred" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="bg-white rounded-2xl p-4 shadow-sm cursor-help">
                    <div className="flex items-start justify-between mb-3">
                      <p className="text-sm font-bold text-[#1B4332] uppercase tracking-wider">Your Prediction</p>
                      <TheoryPill label="Cognitivism: bias surfacing" color="#FCE7F3" text="#9D174D" />
                    </div>
                    <p className="text-base text-gray-700 mb-4">{scene.predictionPrompt}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-[#1B4332]">$</span>
                      <input
                        type="number"
                        value={prediction}
                        onChange={e => setPrediction(e.target.value)}
                        placeholder="0"
                        className="flex-1 h-12 rounded-xl border-2 border-[#D1FAE5] text-center text-xl font-bold text-[#1B4332] outline-none focus:border-[#1B4332] bg-[#EEF5F0]"
                      />
                      <span className="text-base text-gray-600">{scene.predictionUnit}</span>
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent className="text-xs max-w-xs">
                  <p className="font-semibold">Cognitivism — Addressing Misconceptions</p>
                  <p className="mt-1">Recording a prediction before seeing the answer activates prior knowledge and creates a memorable moment of surprise when predictions are wrong — the key mechanism for correcting misconceptions.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <button
              onClick={handlePredictionSubmit}
              disabled={!prediction || isNaN(parseFloat(prediction))}
              className="w-full h-12 bg-[#1B4332] text-white rounded-2xl font-semibold text-sm disabled:opacity-40"
            >
              Submit prediction →
            </button>
          </motion.div>
        )}

        {/* ── PHASE 3: CONCEPT (after prediction) ── */}
        {phase === 'concept' && (
          <motion.div key="concept" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
            {/* Prediction vs Actual visual */}
            <div className={`rounded-2xl p-4 border-2 ${deviationPct > 25 ? 'border-[#F59E0B] bg-[#FEF9C3]' : 'border-[#D1FAE5] bg-white'} shadow-sm`}>
              <p className="text-sm font-bold text-[#1A1A1A] mb-1">
                {deviationPct <= 10 ? '🎯 Spot on!' : deviationPct <= 25 ? '🤏 Close — good thinking!' : '😮 Quite a gap!'}
              </p>
              <p className="text-sm text-gray-600 mb-4">{scene.actualExplanation}</p>
              {/* Bar comparison */}
              <div className="space-y-2.5">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-600 font-medium">YOUR GUESS</span>
                    <span className="font-bold text-[#1A1A1A]">${predVal.toFixed(0)}</span>
                  </div>
                  <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#6B7280] rounded-full transition-all duration-700" style={{ width: `${predPct}%` }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-600 font-medium">ACTUAL BILL</span>
                    <span className="font-bold text-[#1B4332]">${scene.actualOutcome}</span>
                  </div>
                  <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#1B4332] rounded-full transition-all duration-700" style={{ width: `${actualPct}%` }} />
                  </div>
                </div>
                <p className="text-sm text-gray-600 text-right">Deviation: {deviationPct}%</p>
              </div>
            </div>

            {/* Bias card */}
            {biasDetected && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl p-4 shadow-sm border"
                style={{ backgroundColor: biasDetected.color, borderColor: biasDetected.textColor + '30' }}>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{biasDetected.icon}</span>
                    <div>
                      <p className="text-sm font-bold uppercase tracking-wider" style={{ color: biasDetected.textColor }}>Cognitive Bias Detected</p>
                      <p className="text-sm font-bold text-[#1A1A1A]">{biasDetected.name}</p>
                    </div>
                  </div>
                  <TheoryPill label="Cognitivism: bias surfacing" color="#FCE7F3" text="#9D174D" />
                </div>
                <p className="text-sm text-gray-700 mb-3">{biasDetected.description}</p>
                <p className="text-sm text-gray-600 italic mb-3">💡 {biasDetected.tip}</p>
                {!biasWatching ? (
                  <button
                    onClick={() => setBiasWatching(true)}
                    className="w-full h-10 rounded-xl font-semibold text-sm text-white"
                    style={{ backgroundColor: biasDetected.textColor }}>
                    I'll watch for this →
                  </button>
                ) : (
                  <p className="text-xs font-semibold text-center" style={{ color: biasDetected.textColor }}>
                    ✓ Added to your Biases to Watch list
                  </p>
                )}
              </motion.div>
            )}

            {/* Concept card */}
            <div className="bg-[#1B4332] rounded-2xl p-4 shadow-sm">
              <p className="text-sm font-bold text-white/80 uppercase tracking-wider mb-1">
                💡 Concept — {scene.conceptCard.principle}
              </p>
              <p className="text-white text-sm font-semibold mb-2">{scene.conceptCard.title}</p>
              <p className="text-white/90 text-sm leading-relaxed">{scene.conceptCard.body}</p>
            </div>

            <button onClick={() => setPhase('apply')}
              className="w-full h-12 bg-[#1B4332] text-white rounded-2xl font-semibold text-sm">
              Apply it →
            </button>
          </motion.div>
        )}

        {/* ── PHASE 4: APPLY ── */}
        {phase === 'apply' && (
          <motion.div key="apply" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <div className="flex items-start justify-between mb-3">
                <p className="text-sm font-bold text-[#1B4332] uppercase tracking-wider">Apply It</p>
                <TheoryPill label="Bloom: Apply" color="#FEF9C3" text="#92400E" />
              </div>
              <p className="text-sm font-medium text-[#1A1A1A] mb-4">{scene.applyQuestion.prompt}</p>
              <div className="space-y-2">
                {scene.applyQuestion.options.map((opt, i) => {
                  const isSelected = selectedApply === i;
                  const showResult = applyAnswered && isSelected;
                  return (
                    <button key={i} onClick={() => handleApply(i)} disabled={applyAnswered}
                      className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-all ${
                        showResult && opt.correct ? 'border-[#1B4332] bg-[#D1FAE5]' :
                        showResult && !opt.correct ? 'border-red-300 bg-red-50' :
                        applyAnswered && opt.correct ? 'border-[#1B4332]/30 bg-[#D1FAE5]/30' :
                        'border-gray-200 hover:border-[#1B4332]/40 bg-white'
                      }`}>
                      <span>{opt.text}</span>
                      {showResult && (
                        <p className={`text-sm mt-1.5 font-medium ${opt.correct ? 'text-[#1B4332]' : 'text-red-600'}`}>
                          {opt.correct ? '✓' : '✗'} {opt.explanation}
                        </p>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
            {applyAnswered && (
              <motion.button
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                onClick={() => navigate(`/module/${moduleId}/quiz`)}
                className="w-full h-12 bg-[#1B4332] text-white rounded-2xl font-semibold text-sm flex items-center justify-center gap-2">
                Continue to knowledge check <ArrowRight className="w-4 h-4" />
              </motion.button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}