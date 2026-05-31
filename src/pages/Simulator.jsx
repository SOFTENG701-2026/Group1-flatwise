import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, RotateCcw, DollarSign, Heart, Brain, Trophy } from 'lucide-react';
import { useUserProgress } from '@/lib/useUserProgress';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import TheoryPill from '@/components/ui/TheoryPill';
import KolbDiagram from '@/components/ui/KolbDiagram';

const EVENTS = [
  { week: 1, type: 'expense', text: "Your textbooks cost $120 more than expected.", amount: 120 },
  { week: 1, type: 'decision', text: "Flatmate wants to split a Costco grocery run. Your share: $45.", options: [
    { text: "Join the bulk buy ($45) — better value per item", cost: 45, happiness: 8, wisdom: 12 },
    { text: "Buy your own groceries separately", cost: 35, happiness: 3, wisdom: 3 },
  ]},
  { week: 2, type: 'decision', text: "Friend's birthday — group dinner invitation.", options: [
    { text: "Go to the $40 dinner", cost: 40, happiness: 15, wisdom: 0 },
    { text: "Suggest a $15 picnic instead", cost: 15, happiness: 10, wisdom: 10 },
    { text: "Skip it", cost: 0, happiness: -5, wisdom: 5 },
  ]},
  { week: 3, type: 'expense', text: "Power bill arrived — winter heaters pushed it up. Your share: $104.", amount: 104 },
  { week: 3, type: 'decision', text: "Flash sale: jacket 50% off ($37.50).", options: [
    { text: "Buy it — great deal!", cost: 37.5, happiness: 10, wisdom: -5 },
    { text: "Wishlist it — check back next month", cost: 0, happiness: 2, wisdom: 15 },
  ]},
  { week: 4, type: 'income', text: "You picked up an extra shift at work!", amount: 85 },
  { week: 4, type: 'decision', text: "Flat wants group takeaway to celebrate semester end.", options: [
    { text: "Join the $25 takeaway", cost: 25, happiness: 12, wisdom: 0 },
    { text: "Suggest cooking together ($8 each)", cost: 8, happiness: 10, wisdom: 12 },
  ]},
];

const INITIAL_BUDGET = 1800; // 4 weeks × $450

export default function Simulator() {
  const { addXP } = useUserProgress();
  const [started, setStarted] = useState(false);
  const [eventIdx, setEventIdx] = useState(0);
  const [money, setMoney] = useState(INITIAL_BUDGET);
  const [happiness, setHappiness] = useState(50);
  const [wisdom, setWisdom] = useState(0);
  const [history, setHistory] = useState([]);
  const [done, setDone] = useState(false);

  const ev = EVENTS[eventIdx];

  const advance = (cost, happy, wise, label) => {
    setMoney(m => m - cost);
    setHappiness(h => Math.min(100, Math.max(0, h + happy)));
    setWisdom(w => w + wise);
    setHistory(prev => [...prev, { text: ev.text, choice: label, cost, week: ev.week }]);
    if (eventIdx < EVENTS.length - 1) setEventIdx(i => i + 1);
    else {
      setDone(true);
      addXP(wisdom >= 30 ? 150 : 75);
    }
  };

  const reset = () => { setStarted(false); setEventIdx(0); setMoney(INITIAL_BUDGET); setHappiness(50); setWisdom(0); setHistory([]); setDone(false); };

  if (!started) return (
    <div className="space-y-5">
      <h1 className="text-2xl font-bold text-[#1A1A1A]">Budget Simulator</h1>
      <p className="text-sm text-gray-500">Practice financial decisions in a safe, fictional semester scenario.</p>
      <div className="bg-white rounded-2xl p-5 shadow-sm space-y-4">
        <div className="flex items-start gap-3">
          <span className="text-3xl">🎮</span>
          <div>
            <p className="font-bold text-[#1A1A1A]">Semester Kickoff</p>
            <p className="text-sm text-gray-600 mt-1">4 weeks · $450/week income · 7 events</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <TheoryPill label="Kolb: full cycle" color="#D1FAE5" text="#1B4332" />
          <TheoryPill label="Cognitivism: bias surfacing" color="#FCE7F3" text="#9D174D" />
        </div>
        <div className="bg-[#EEF5F0] rounded-xl p-3 text-xs text-gray-600 italic">
          Situated Learning — you face realistic financial decisions that first-year students encounter, in a consequence-free environment.
        </div>
        <button onClick={() => setStarted(true)}
          className="w-full h-12 bg-[#1B4332] text-white rounded-2xl font-semibold text-sm">
          Start simulation →
        </button>
      </div>
    </div>
  );

  if (done) {
    const remaining = Math.max(0, money);
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
        <div className="bg-[#1B4332] rounded-2xl p-5 text-center">
          <div className="w-14 h-14 rounded-full bg-[#D1FAE5] flex items-center justify-center text-2xl mx-auto mb-2">🏆</div>
          <p className="text-[#D1FAE5] text-xs font-semibold">Semester complete!</p>
          <p className="text-white text-xl font-bold mt-1">Flat Budget Score</p>
          <p className="text-[#D1FAE5] text-3xl font-bold mt-2">${remaining.toFixed(0)} remaining</p>
          <p className="text-[#D1FAE5]/70 text-sm mt-1">
            {remaining >= 300 ? "Strong budgeting — you planned ahead! 💚" :
             remaining >= 100 ? "Solid effort — a little more buffer next time. 👍" :
             "Tight finish — consider boosting your emergency buffer. 💪"}
          </p>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white rounded-2xl p-3 text-center shadow-sm"><DollarSign className="w-5 h-5 text-[#1B4332] mx-auto mb-1"/><p className="font-bold text-[#1A1A1A]">${remaining.toFixed(0)}</p><p className="text-xs text-gray-500">Left over</p></div>
          <div className="bg-white rounded-2xl p-3 text-center shadow-sm"><Heart className="w-5 h-5 text-red-400 mx-auto mb-1"/><p className="font-bold text-[#1A1A1A]">{happiness}%</p><p className="text-xs text-gray-500">Happiness</p></div>
          <div className="bg-white rounded-2xl p-3 text-center shadow-sm"><Brain className="w-5 h-5 text-purple-400 mx-auto mb-1"/><p className="font-bold text-[#1A1A1A]">{wisdom}</p><p className="text-xs text-gray-500">Wisdom</p></div>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <p className="text-sm font-bold text-[#1A1A1A] mb-3">Your decisions</p>
          <div className="space-y-2">
            {history.map((h, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-gray-600">
                <span className="shrink-0 text-gray-400">Week {h.week}</span>
                <span className="flex-1">{h.choice || h.text}</span>
                <span className={h.cost > 0 ? 'text-red-500 font-medium' : 'text-[#1B4332] font-medium'}>
                  {h.cost > 0 ? `-$${h.cost}` : `+$${Math.abs(h.cost)}`}
                </span>
              </div>
            ))}
          </div>
        </div>
        <button onClick={reset} className="w-full h-12 border-2 border-[#1B4332] text-[#1B4332] rounded-2xl font-semibold text-sm flex items-center justify-center gap-2">
          <RotateCcw className="w-4 h-4" /> Try again
        </button>
      </motion.div>
    );
  }

  const moneyPct = Math.min(100, Math.round((money / INITIAL_BUDGET) * 100));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-500">Semester Kickoff</p>
          <p className="text-sm font-bold text-[#1A1A1A]">Event {eventIdx + 1} of {EVENTS.length}</p>
        </div>
        <KolbDiagram activePhase={ev.type === 'decision' ? 'apply' : 'experience'} />
      </div>

      {/* Status */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { icon: <DollarSign className="w-4 h-4 text-[#1B4332]"/>, label: 'Budget', value: `$${money.toFixed(0)}`, pct: moneyPct, color: '#1B4332' },
          { icon: <Heart className="w-4 h-4 text-red-400"/>, label: 'Happiness', value: `${happiness}%`, pct: happiness, color: '#F87171' },
          { icon: <Brain className="w-4 h-4 text-purple-400"/>, label: 'Wisdom', value: wisdom, pct: Math.min(100, wisdom * 2), color: '#A78BFA' },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-2xl p-3 shadow-sm">
            {s.icon}
            <p className="text-sm font-bold text-[#1A1A1A] mt-1">{s.value}</p>
            <div className="w-full h-1.5 bg-gray-100 rounded-full mt-1.5 overflow-hidden">
              <div className="h-full rounded-full transition-all" style={{ width: `${s.pct}%`, backgroundColor: s.color }} />
            </div>
          </div>
        ))}
      </div>

      {/* Event */}
      <AnimatePresence mode="wait">
        <motion.div key={eventIdx} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
          className="bg-white rounded-2xl p-4 shadow-sm">
          <span className="text-xs font-semibold text-gray-400 uppercase">Week {ev.week}</span>
          <p className="text-sm font-semibold text-[#1A1A1A] mt-1 mb-4">{ev.text}</p>

          {ev.type === 'expense' && (
            <div>
              <p className="text-2xl font-bold text-red-500 mb-3">-${ev.amount}</p>
              <button onClick={() => advance(ev.amount, 0, 5, ev.text)}
                className="w-full h-12 bg-[#1B4332] text-white rounded-2xl font-semibold text-sm">
                Pay expense <ArrowRight className="inline w-4 h-4 ml-1" />
              </button>
            </div>
          )}
          {ev.type === 'income' && (
            <div>
              <p className="text-2xl font-bold text-[#1B4332] mb-3">+${ev.amount}</p>
              <button onClick={() => advance(-ev.amount, 5, 5, ev.text)}
                className="w-full h-12 bg-[#1B4332] text-white rounded-2xl font-semibold text-sm">
                Receive income <ArrowRight className="inline w-4 h-4 ml-1" />
              </button>
            </div>
          )}
          {ev.type === 'decision' && (
            <div className="space-y-2">
              {ev.options.map((opt, i) => (
                <button key={i} onClick={() => advance(opt.cost, opt.happiness, opt.wisdom, opt.text)}
                  className="w-full text-left px-4 py-3 rounded-xl border border-gray-200 hover:border-[#1B4332]/40 text-sm transition-all">
                  <span>{opt.text}</span>
                  {opt.cost > 0 && <span className="text-xs text-red-400 ml-2 font-medium">-${opt.cost}</span>}
                </button>
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}