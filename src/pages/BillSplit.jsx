import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, RotateCcw } from 'lucide-react';
import TheoryPill from '@/components/ui/TheoryPill';

const SCENARIO = {
  title: "Flatmates splitting power bill",
  amount: 180,
  dueDate: "15 June 2026",
  flatmates: [
    { name: "Alex", usage: 35 },
    { name: "Jordan", usage: 45 },
    { name: "Sam", usage: 20 },
  ],
};

const COMPLICATION_OPTIONS = [
  {
    id: "cover",
    label: "Cover them temporarily",
    tone: "Generous",
    description: "You pay their share now and they pay you back next week.",
    outcome: {
      emoji: "🤝",
      result: "Jordan appreciates the gesture and pays you back promptly. Relationship intact.",
      lesson: "Short-term generosity can smooth flat finances — but always set a clear repayment date.",
    }
  },
  {
    id: "late",
    label: "Ask them to pay late",
    tone: "Flexible",
    description: "Everyone else pays now; Jordan pays their share in 2 weeks when they get paid.",
    outcome: {
      emoji: "✅",
      result: "The provider gets partial payment. Jordan is relieved. A small late fee may apply.",
      lesson: "Paying most of the bill on time limits damage. Confirm the late-payment terms with your provider first.",
    }
  },
  {
    id: "shortfall",
    label: "Split the shortfall equally",
    tone: "Collective",
    description: "Alex and Sam each cover a third of Jordan's share for now.",
    outcome: {
      emoji: "😬",
      result: "Bill paid in full, but Alex and Sam feel put out. Jordan owes the flat, not just one person.",
      lesson: "Collective coverage works but can breed resentment. Make the repayment agreement explicit.",
    }
  },
  {
    id: "extension",
    label: "Contact provider for extension",
    tone: "Proactive",
    description: "Call the power company together and request a payment extension for the full bill.",
    outcome: {
      emoji: "💡",
      result: "Many providers grant a 2-week extension for first-time requests. No one has to front the money.",
      lesson: "Proactive communication with providers is an underused tool. Most utility companies have hardship options.",
    }
  },
];

function calculateShares(flatmates, method, customShares) {
  const total = SCENARIO.amount;
  const n = flatmates.length;
  if (method === 'equal') {
    const share = parseFloat((total / n).toFixed(2));
    return flatmates.map(f => ({ ...f, share }));
  }
  if (method === 'usage') {
    return flatmates.map(f => ({ ...f, share: parseFloat(((f.usage / 100) * total).toFixed(2)) }));
  }
  if (method === 'custom') {
    return flatmates.map(f => ({ ...f, share: parseFloat(customShares[f.name] || 0) }));
  }
  return flatmates.map(f => ({ ...f, share: 0 }));
}

// ── Stage 1: Split method selection + confirmation ────────────────────────────
function SplitStage({ onConfirm }) {
  const [method, setMethod] = useState(null);
  const [customShares, setCustomShares] = useState(
    Object.fromEntries(SCENARIO.flatmates.map(f => [f.name, '']))
  );

  const flatmatesWithShares = method ? calculateShares(SCENARIO.flatmates, method, customShares) : null;
  const customTotal = Object.values(customShares).reduce((a, b) => a + parseFloat(b || 0), 0);
  const customValid = Math.abs(customTotal - SCENARIO.amount) < 0.01;
  const canConfirm = method && (method !== 'custom' || customValid);

  const METHODS = [
    { id: 'equal', label: 'Equal split', desc: `$${(SCENARIO.amount / SCENARIO.flatmates.length).toFixed(2)} each`, emoji: '⚖️' },
    { id: 'usage', label: 'Usage-based split', desc: 'Based on estimated usage %', emoji: '📊' },
    { id: 'custom', label: 'Custom split', desc: 'Set each person\'s share manually', emoji: '✏️' },
  ];

  return (
    <div className="space-y-4">
      <Link to="/curriculum" className="flex items-center gap-1.5 text-sm text-[#1B4332] font-medium">
        <ArrowLeft className="w-4 h-4" /> Curriculum
      </Link>

      <div>
        <div className="flex gap-2 flex-wrap mb-2">
          <TheoryPill label="Bloom: Apply" color="#D1FAE5" text="#1B4332" tooltip="Bloom — Apply: use mathematical knowledge to solve a real shared-expense problem." />
          <TheoryPill label="Social constructivism" color="#FEF9C3" text="#92400E" tooltip="Social Constructivism — learning through realistic collaborative social scenarios." />
        </div>
        <h1 className="text-xl font-bold text-[#1A1A1A]">{SCENARIO.title}</h1>
        <p className="text-sm text-gray-600">Choose how to divide the bill fairly</p>
      </div>

      {/* Bill summary card */}
      <div className="bg-[#1B4332] rounded-2xl p-5 text-white">
        <p className="text-xs font-semibold text-white/80 uppercase tracking-wide mb-1">Power Bill</p>
        <p className="text-4xl font-bold">${SCENARIO.amount}</p>
        <p className="text-sm text-white/80 mt-1">Due {SCENARIO.dueDate}</p>
        <div className="flex gap-2 mt-3">
          {SCENARIO.flatmates.map(f => (
            <div key={f.name} className="bg-white/10 rounded-xl px-3 py-1.5 text-center">
              <p className="text-sm font-bold">{f.name}</p>
              <p className="text-xs text-white/80">{f.usage}% usage</p>
            </div>
          ))}
        </div>
      </div>

      {/* Split method selector */}
      <div className="space-y-2">
        <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Select split method</p>
        {METHODS.map(m => (
          <button key={m.id} onClick={() => setMethod(m.id)}
            className={`w-full text-left bg-white rounded-2xl p-4 shadow-sm border-2 transition-all flex items-center gap-3 ${method === m.id ? 'border-[#1B4332]' : 'border-transparent hover:border-[#D1FAE5]'}`}>
            <span className="text-2xl">{m.emoji}</span>
            <div className="flex-1">
              <p className="text-sm font-semibold text-[#1A1A1A]">{m.label}</p>
              <p className="text-xs text-gray-600">{m.desc}</p>
            </div>
            {method === m.id && <Check className="w-5 h-5 text-[#1B4332] shrink-0" />}
          </button>
        ))}
      </div>

      {/* Custom inputs */}
      <AnimatePresence>
        {method === 'custom' && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            className="bg-[#EEF5F0] rounded-2xl p-4 space-y-3 overflow-hidden">
            <p className="text-sm font-semibold text-[#1B4332]">Enter each person's share (must total ${SCENARIO.amount})</p>
            {SCENARIO.flatmates.map(f => (
              <div key={f.name} className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-700 w-16">{f.name}</span>
                <div className="relative flex-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                  <input type="number" value={customShares[f.name]}
                    onChange={e => setCustomShares(p => ({ ...p, [f.name]: e.target.value }))}
                    className="w-full pl-7 pr-3 py-2 rounded-xl border border-[#D1FAE5] text-sm focus:outline-none focus:border-[#1B4332]"
                    placeholder="0.00" />
                </div>
              </div>
            ))}
            <div className={`text-xs font-semibold ${customValid ? 'text-[#1B4332]' : 'text-red-500'}`}>
              Total: ${customTotal.toFixed(2)} {!customValid && `(need $${SCENARIO.amount})`}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Calculated shares */}
      <AnimatePresence>
        {flatmatesWithShares && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-4 shadow-sm border border-[#D1FAE5] space-y-2">
            <p className="text-sm font-semibold text-[#1B4332] uppercase tracking-wide">Calculated shares</p>
            {flatmatesWithShares.map(f => (
              <div key={f.name} className="flex justify-between items-center py-1.5 border-b border-gray-50 last:border-0">
                <span className="text-sm font-medium text-gray-700">{f.name}</span>
                <span className="text-sm font-bold text-[#1A1A1A]">${f.share.toFixed(2)}</span>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <button onClick={() => canConfirm && onConfirm(method, flatmatesWithShares)}
        disabled={!canConfirm}
        className={`w-full font-semibold py-3.5 rounded-2xl text-sm flex items-center justify-center gap-2 transition-all ${canConfirm ? 'bg-[#1B4332] text-white' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}>
        Confirm split <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}

// ── Stage 2: Complication ─────────────────────────────────────────────────────
function ComplicationStage({ method, shares, onReset }) {
  const [selected, setSelected] = useState(null);
  const [showOutcome, setShowOutcome] = useState(false);

  const handleSelect = (opt) => {
    if (showOutcome) return;
    setSelected(opt);
    setTimeout(() => setShowOutcome(true), 400);
  };

  const methodLabel = { equal: 'Equal split', usage: 'Usage-based', custom: 'Custom split' }[method];

  return (
    <div className="space-y-4">
      <Link to="/curriculum" className="flex items-center gap-1.5 text-sm text-[#1B4332] font-medium">
        <ArrowLeft className="w-4 h-4" /> Curriculum
      </Link>

      {/* Agreed split recap */}
      <div className="bg-[#EEF5F0] rounded-2xl p-4 flex items-center gap-3">
        <span className="text-2xl">✅</span>
        <div>
          <p className="text-sm font-semibold text-[#1B4332]">Split agreed: {methodLabel}</p>
          <p className="text-xs text-gray-600">{shares.map(f => `${f.name} $${f.share.toFixed(2)}`).join(' · ')}</p>
        </div>
      </div>

      {/* Complication card */}
      <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
        className="bg-[#FEF9C3] rounded-2xl p-5 space-y-2 border-2 border-amber-200">
        <div className="flex items-center gap-2">
          <span className="text-3xl">⚠️</span>
          <div>
            <p className="text-sm font-semibold text-[#92400E] uppercase tracking-wide">Complication</p>
            <h2 className="text-base font-bold text-[#1A1A1A]">Jordan can't pay on time</h2>
          </div>
        </div>
        <p className="text-sm text-[#92400E] leading-relaxed">
          Jordan messages the flat group chat: <span className="italic">"Hey sorry, I don't get paid until next Friday. Can we sort something?"</span>
        </p>
      </motion.div>

      {!showOutcome ? (
        <div className="space-y-2">
          <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">How does the flat respond?</p>
          {COMPLICATION_OPTIONS.map(opt => (
            <button key={opt.id} onClick={() => handleSelect(opt)}
              className={`w-full text-left bg-white rounded-2xl p-4 shadow-sm border-2 transition-all ${selected?.id === opt.id ? 'border-[#1B4332]' : 'border-transparent hover:border-[#D1FAE5]'}`}>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-sm font-semibold text-[#1A1A1A]">{opt.label}</p>
                  <p className="text-xs text-gray-600 mt-0.5 italic">"{opt.description}"</p>
                </div>
                <span className="text-sm text-gray-600 shrink-0 mt-0.5">{opt.tone}</span>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <AnimatePresence>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            className="space-y-4">
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#D1FAE5] space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-3xl">{selected.outcome.emoji}</span>
                <p className="text-sm font-semibold text-[#1A1A1A]">{selected.outcome.result}</p>
              </div>
              <div className="bg-[#EEF5F0] rounded-xl p-3">
                <p className="text-sm font-semibold text-[#1B4332] mb-1">💡 What this teaches you</p>
                <p className="text-sm text-gray-700 leading-relaxed">{selected.outcome.lesson}</p>
              </div>
            </div>

            <div className="bg-white border-2 border-[#D1FAE5] rounded-2xl p-4 space-y-1">
              <p className="text-sm font-semibold text-[#1B4332] uppercase tracking-wide">Negotiation principle</p>
              <p className="font-semibold text-[#1A1A1A] text-base">Contingency Planning</p>
              <p className="text-sm text-gray-600 leading-relaxed">Real bills don't wait for payday. A flat that discusses payment flexibility in advance — rather than scrambling when it happens — handles money conflicts far better.</p>
            </div>

            <div className="flex gap-3">
              <button onClick={onReset}
                className="flex-1 border-2 border-[#1B4332] text-[#1B4332] font-semibold py-3 rounded-xl text-sm flex items-center justify-center gap-2">
                <RotateCcw className="w-4 h-4" /> Try again
              </button>
              <Link to="/curriculum"
                className="flex-1 bg-[#1B4332] text-white font-semibold py-3 rounded-xl text-sm flex items-center justify-center gap-2">
                Back to curriculum <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function BillSplit() {
  const [stage, setStage] = useState('split'); // 'split' | 'complication'
  const [confirmedMethod, setConfirmedMethod] = useState(null);
  const [confirmedShares, setConfirmedShares] = useState(null);

  const handleConfirm = (method, shares) => {
    setConfirmedMethod(method);
    setConfirmedShares(shares);
    setStage('complication');
  };

  const handleReset = () => {
    setStage('split');
    setConfirmedMethod(null);
    setConfirmedShares(null);
  };

  return (
    <div>
      {stage === 'split' && <SplitStage onConfirm={handleConfirm} />}
      {stage === 'complication' && (
        <ComplicationStage method={confirmedMethod} shares={confirmedShares} onReset={handleReset} />
      )}
    </div>
  );
}