import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, X, RotateCcw } from 'lucide-react';
import { BUDGETS } from '@/lib/spotMistakeData.js';
import { useUserProgress } from '@/lib/useUserProgress';
import TheoryPill from '@/components/ui/TheoryPill';

function MiniBarChart({ data }) {
  const maxVal = data.realistic * 1.2;
  return (
    <div className="bg-gray-50 rounded-xl p-3 mt-2">
      <p className="text-xs font-medium text-gray-500 mb-2">{data.label}</p>
      <div className="space-y-2">
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-red-500 font-medium">Alex's estimate</span>
            <span className="text-red-500 font-bold">{data.estimate}{data.unit}</span>
          </div>
          <div className="h-4 bg-red-50 rounded overflow-hidden">
            <div className="h-full bg-red-400 rounded" style={{ width: `${(data.estimate / maxVal) * 100}%` }} />
          </div>
        </div>
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-[#1B4332] font-medium">Realistic range</span>
            <span className="text-[#1B4332] font-bold">{data.realistic}{data.unit}</span>
          </div>
          <div className="h-4 bg-[#EEF5F0] rounded overflow-hidden">
            <div className="h-full bg-[#1B4332] rounded" style={{ width: `${(data.realistic / maxVal) * 100}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SpotMistake() {
  const { budgetId } = useParams();
  const { addXP } = useUserProgress();
  const budget = BUDGETS.find(b => b.id === budgetId);

  const [foundMistakes, setFoundMistakes] = useState([]);
  const [wrongTaps, setWrongTaps] = useState(0);
  const [flashItem, setFlashItem] = useState(null);
  const [openSheet, setOpenSheet] = useState(null);
  const [finished, setFinished] = useState(false);

  if (!budget) return <div className="p-4 text-center text-gray-500">Budget not found. <Link to="/curriculum" className="text-[#1B4332] underline">Back</Link></div>;

  const totalMistakes = budget.sections.flatMap(s => s.items).filter(i => i.isMistake).length;

  const handleTap = (item) => {
    if (finished || openSheet) return;
    if (item.isMistake) {
      if (foundMistakes.includes(item.id)) return;
      const newFound = [...foundMistakes, item.id];
      setFoundMistakes(newFound);
      setOpenSheet(item);
      if (newFound.length === totalMistakes) {
        setTimeout(() => setFinished(true), 400);
      }
    } else {
      setFlashItem(item.id);
      setWrongTaps(w => w + 1);
      setTimeout(() => setFlashItem(null), 700);
    }
  };

  const score = Math.max(0, 100 - wrongTaps * 10);

  const handleReset = () => {
    setFoundMistakes([]);
    setWrongTaps(0);
    setFlashItem(null);
    setOpenSheet(null);
    setFinished(false);
  };

  if (finished && !openSheet) {
    addXP(score >= 80 ? 60 : 30);
    return (
      <div className="space-y-5">
        <Link to="/curriculum" className="flex items-center gap-1.5 text-sm text-[#1B4332] font-medium">
          <ArrowLeft className="w-4 h-4" /> Curriculum
        </Link>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-4 space-y-2">
          <div className="text-5xl">{score >= 80 ? '🔍' : '🧐'}</div>
          <h2 className="text-xl font-bold text-[#1A1A1A]">All 3 mistakes found!</h2>
          <div className="inline-flex items-center gap-2 bg-[#1B4332] text-white px-5 py-2 rounded-full">
            <span className="text-lg font-bold">{score}/100</span>
            <span className="text-sm opacity-80">{wrongTaps > 0 ? `(−${wrongTaps * 10} for ${wrongTaps} wrong tap${wrongTaps > 1 ? 's' : ''})` : 'Perfect!'}</span>
          </div>
        </motion.div>

        <div className="bg-[#EEF5F0] rounded-2xl p-4 space-y-2">
          <p className="text-xs font-semibold text-[#1B4332] uppercase tracking-wide">What these mistakes teach you</p>
          <ul className="space-y-1.5">
            {budget.summary.map((s, i) => (
              <li key={i} className="flex gap-2 text-sm text-gray-700">
                <span className="text-[#1B4332] mt-0.5 shrink-0">✓</span>{s}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white border-2 border-[#D1FAE5] rounded-2xl p-4 space-y-1">
          <p className="text-xs font-semibold text-[#1B4332] uppercase tracking-wide">Cognitive bias</p>
          <p className="font-semibold text-[#1A1A1A] text-sm">{budget.biasCard.name}</p>
          <p className="text-xs text-gray-600 leading-relaxed">{budget.biasCard.description}</p>
        </div>

        <div className="flex gap-3">
          <button onClick={handleReset}
            className="flex-1 border-2 border-[#1B4332] text-[#1B4332] font-semibold py-3 rounded-xl text-sm flex items-center justify-center gap-2">
            <RotateCcw className="w-4 h-4" /> Try another budget
          </button>
          <Link to="/curriculum"
            className="flex-1 bg-[#1B4332] text-white font-semibold py-3 rounded-xl text-sm flex items-center justify-center gap-2">
            Continue <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 relative">
      <Link to="/curriculum" className="flex items-center gap-1.5 text-sm text-[#1B4332] font-medium">
        <ArrowLeft className="w-4 h-4" /> Curriculum
      </Link>

      {/* Header */}
      <div>
        <div className="flex gap-2 flex-wrap mb-2">
          <TheoryPill label="Bloom: Analyse" color="#D1FAE5" text="#1B4332" tooltip="Bloom's Taxonomy — Analyse level. Learners break down a budget to identify errors and inconsistencies." />
          <TheoryPill label="Cognitivism: Error detection" color="#E0E7FF" text="#3730A3" tooltip="Cognitivism — Error detection tasks train learners to notice systematic mistakes, improving metacognitive accuracy." />
        </div>
        <h1 className="text-xl font-bold text-[#1A1A1A]">{budget.title}</h1>
        <p className="text-sm text-gray-500">{budget.subtitle}</p>
      </div>

      {/* Instruction card */}
      <div className="bg-white rounded-2xl p-4 shadow-sm flex items-center gap-3">
        <div className="w-10 h-10 bg-[#FEF9C3] rounded-xl flex items-center justify-center text-xl shrink-0">🔍</div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-[#1A1A1A]">Find the 3 mistakes</p>
          <p className="text-xs text-gray-500">Tap any line item you think contains an error</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-[#1B4332]">{foundMistakes.length}/3</p>
          <p className="text-xs text-gray-400">found</p>
        </div>
      </div>

      {/* Budget document */}
      <div className="bg-[#FAFAF7] rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Paper header */}
        <div className="bg-white border-b border-gray-100 px-5 pt-5 pb-3">
          <p className="font-bold text-[#1A1A1A] text-base" style={{ fontFamily: 'Georgia, serif' }}>{budget.title}</p>
          <p className="text-xs text-gray-400 mt-0.5">{budget.dateNote}</p>
          {budget.headerNote && (
            <div className="mt-2 inline-flex items-center gap-1.5 bg-[#D1FAE5] text-[#1B4332] text-xs font-medium px-3 py-1 rounded-full">
              📌 {budget.headerNote}
            </div>
          )}
        </div>

        <div className="px-4 py-3 space-y-4">
          {budget.sections.map((section) => (
            <div key={section.heading}>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 px-1">{section.heading}</p>
              <div className="space-y-1">
                {section.items.map((item) => {
                  const isFound = foundMistakes.includes(item.id);
                  const isFlashing = flashItem === item.id;
                  const isBold = item.label.startsWith('TOTAL');
                  return (
                    <motion.button key={item.id} onClick={() => handleTap(item)}
                      animate={isFlashing ? { x: [-4, 4, -4, 4, 0] } : {}}
                      transition={{ duration: 0.3 }}
                      className={`w-full flex justify-between items-center px-3 py-2.5 rounded-xl transition-all text-left ${
                        isFound ? 'bg-amber-50 border border-amber-300' :
                        isFlashing ? 'bg-red-50 border border-red-200' :
                        'hover:bg-gray-50 border border-transparent'
                      }`}>
                      <span className={`text-sm ${isBold ? 'font-bold text-[#1A1A1A]' : 'text-gray-700'}`}>{item.label}</span>
                      <div className="flex items-center gap-2">
                        {isFound && <span className="text-xs font-medium text-amber-700">⚠ Mistake #{item.mistake.number}</span>}
                        {isFlashing && <span className="text-xs font-medium text-red-500">Not this one</span>}
                        <span className={`text-sm font-semibold ${isBold ? 'text-[#1A1A1A]' : 'text-gray-600'} ${isFound ? 'line-through text-amber-600' : ''}`}>
                          {item.value}
                        </span>
                        {isFound && item.isMistake && (
                          <span className="text-xs font-bold text-[#1B4332]">{item.correctValue}</span>
                        )}
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {wrongTaps > 0 && (
          <div className="px-4 pb-3">
            <p className="text-xs text-gray-400">Wrong taps: {wrongTaps} (−{wrongTaps * 10} points)</p>
          </div>
        )}
      </div>

      {/* Bottom sheet for mistake explanation */}
      <AnimatePresence>
        {openSheet && (
          <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-x-0 bottom-0 z-50 bg-white rounded-t-3xl shadow-2xl p-5 max-w-[420px] mx-auto max-h-[80vh] overflow-y-auto">
            <div className="flex items-start justify-between mb-3">
              <div>
                <span className="text-xs font-semibold text-[#1B4332] bg-[#D1FAE5] px-2 py-0.5 rounded-full">Mistake #{openSheet.mistake.number}</span>
                <h3 className="font-bold text-[#1A1A1A] mt-2">{openSheet.mistake.type}</h3>
              </div>
              <button onClick={() => setOpenSheet(null)} className="p-1.5 rounded-full hover:bg-gray-100">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="flex justify-between items-center bg-gray-50 rounded-xl px-4 py-2 mb-3">
              <div className="text-center">
                <p className="text-xs text-gray-400">Budgeted</p>
                <p className="font-bold text-red-500 line-through">{openSheet.value}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400" />
              <div className="text-center">
                <p className="text-xs text-gray-400">Should be</p>
                <p className="font-bold text-[#1B4332]">{openSheet.correctValue}</p>
              </div>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed mb-2">{openSheet.mistake.explanation}</p>
            <p className="text-sm text-gray-500 italic leading-relaxed">{openSheet.mistake.consequence}</p>
            {openSheet.mistake.chartData && <MiniBarChart data={openSheet.mistake.chartData} />}
            <button onClick={() => setOpenSheet(null)}
              className="w-full bg-[#1B4332] text-white font-semibold py-3 rounded-xl text-sm mt-4">
              Got it →
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      {openSheet && <div className="fixed inset-0 bg-black/30 z-40" onClick={() => setOpenSheet(null)} />}

      {/* All found banner */}
      {finished && (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          className="fixed inset-x-4 top-1/2 -translate-y-1/2 z-50 bg-[#1B4332] text-white rounded-2xl p-5 text-center shadow-2xl max-w-[380px] mx-auto">
          <p className="text-2xl mb-1">✅</p>
          <p className="font-bold text-lg">All mistakes found!</p>
          <p className="text-sm opacity-80 mt-1">See your full results below</p>
        </motion.div>
      )}
    </div>
  );
}