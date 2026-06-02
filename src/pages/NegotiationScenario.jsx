import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, RotateCcw } from 'lucide-react';
import { NEGOTIATION_SCENARIOS } from '@/lib/negotiationData.js';
import { useUserProgress } from '@/lib/useUserProgress';
import TheoryPill from '@/components/ui/TheoryPill';

function ScoreBar({ label, value, color }) {
  const barColor = value >= 75 ? '#1B4332' : value >= 45 ? '#F59E0B' : '#EF4444';
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs text-gray-600">
        <span>{label}</span>
        <span className="font-semibold" style={{ color: barColor }}>{value}%</span>
      </div>
      <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
        <motion.div initial={{ width: 0 }} animate={{ width: `${value}%` }} transition={{ duration: 0.8, delay: 0.2 }}
          className="h-full rounded-full" style={{ backgroundColor: barColor }} />
      </div>
    </div>
  );
}

function ChatBubble({ from, text, avatar, name }) {
  if (from === 'flatmate') {
    return (
      <div className="flex items-end gap-2">
        <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
          style={{ backgroundColor: avatar.color }}>{avatar.initials}</div>
        <div className="max-w-[75%]">
          <p className="text-xs text-gray-600 mb-1 ml-1">{name}</p>
          <div className="bg-gray-100 rounded-2xl rounded-bl-sm px-4 py-2.5">
            <p className="text-sm text-gray-800">{text}</p>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex justify-end">
      <div className="max-w-[75%] bg-[#1B4332] rounded-2xl rounded-br-sm px-4 py-2.5">
        <p className="text-sm text-white">{text}</p>
      </div>
    </div>
  );
}

export default function NegotiationScenario() {
  const { scenarioId } = useParams();
  const { addXP } = useUserProgress();
  const scenario = NEGOTIATION_SCENARIOS.find(s => s.id === scenarioId);

  const [round, setRound] = useState(0);
  const [chatLog, setChatLog] = useState([{ from: 'flatmate', text: scenario?.openingMessage }]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showOutcome, setShowOutcome] = useState(false);
  const [roundScores, setRoundScores] = useState([]);
  const [finished, setFinished] = useState(false);

  if (!scenario) return <div className="p-4 text-center text-gray-500">Scenario not found. <Link to="/curriculum" className="text-[#1B4332] underline">Back to curriculum</Link></div>;

  const currentRound = scenario.rounds[round];

  const handleSelect = (optionIdx) => {
    if (selectedOption !== null) return;
    const opt = currentRound.options[optionIdx];
    setSelectedOption(optionIdx);
    setChatLog(prev => [...prev, { from: 'you', text: opt.text }]);
    setTimeout(() => {
      setChatLog(prev => [...prev, { from: 'flatmate', text: opt.flatmateReply }]);
      setRoundScores(prev => [...prev, opt.outcome]);
      setShowOutcome(true);
    }, 600);
  };

  const handleNext = () => {
    if (round + 1 < scenario.rounds.length) {
      setRound(r => r + 1);
      setSelectedOption(null);
      setShowOutcome(false);
    } else {
      setFinished(true);
      const avgRel = Math.round(roundScores.reduce((a, b) => a + b.relationship, 0) / roundScores.length);
      const avgFin = Math.round(roundScores.reduce((a, b) => a + b.financial, 0) / roundScores.length);
      if (avgRel + avgFin > 120) addXP(80);
      else addXP(50);
    }
  };

  const handleReset = () => {
    setRound(0);
    setChatLog([{ from: 'flatmate', text: scenario.openingMessage }]);
    setSelectedOption(null);
    setShowOutcome(false);
    setRoundScores([]);
    setFinished(false);
  };

  const currentOutcome = selectedOption !== null ? currentRound.options[selectedOption].outcome : null;

  const avgRel = roundScores.length ? Math.round(roundScores.reduce((a, b) => a + b.relationship, 0) / roundScores.length) : 0;
  const avgFin = roundScores.length ? Math.round(roundScores.reduce((a, b) => a + b.financial, 0) / roundScores.length) : 0;

  if (finished) {
    const isGood = avgRel + avgFin > 140;
    return (
      <div className="space-y-5">
        <Link to="/curriculum" className="flex items-center gap-1.5 text-sm text-[#1B4332] font-medium">
          <ArrowLeft className="w-4 h-4" /> Curriculum
        </Link>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center space-y-2 py-4">
          <div className="text-5xl mb-2">{isGood ? '🏆' : '💪'}</div>
          <h2 className="text-xl font-bold text-[#1A1A1A]">{isGood ? 'Excellent negotiator!' : 'Room to grow'}</h2>
          <p className="text-sm text-gray-600">You navigated {scenario.rounds.length} rounds of a real flatting conflict</p>
        </motion.div>

        <div className="bg-white rounded-2xl p-5 shadow-sm space-y-3">
          <h3 className="font-semibold text-[#1A1A1A] text-sm">Final outcome</h3>
          <ScoreBar label="Relationship impact" value={avgRel} />
          <ScoreBar label="Financial outcome" value={avgFin} />
        </div>

        <div className="bg-[#EEF5F0] rounded-2xl p-4 space-y-2">
          <p className="text-xs font-semibold text-[#1B4332] uppercase tracking-wide">What worked</p>
          <ul className="space-y-1.5">
            {scenario.whatWorked.map((w, i) => (
              <li key={i} className="flex gap-2 text-sm text-gray-700">
                <span className="text-[#1B4332] mt-0.5 shrink-0">✓</span>{w}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white border-2 border-[#D1FAE5] rounded-2xl p-4 space-y-1">
          <p className="text-xs font-semibold text-[#1B4332] uppercase tracking-wide">Negotiation principle</p>
          <p className="font-semibold text-[#1A1A1A] text-sm">{scenario.negotiationPrinciple.name}</p>
          <p className="text-xs text-gray-600 leading-relaxed">{scenario.negotiationPrinciple.description}</p>
        </div>

        <div className="flex gap-3">
          <button onClick={handleReset}
            className="flex-1 border-2 border-[#1B4332] text-[#1B4332] font-semibold py-3 rounded-xl text-sm flex items-center justify-center gap-2">
            <RotateCcw className="w-4 h-4" /> Try different approach
          </button>
          <Link to="/curriculum"
            className="flex-1 bg-[#1B4332] text-white font-semibold py-3 rounded-xl text-sm flex items-center justify-center gap-2">
            Continue to reflection <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Link to="/curriculum" className="flex items-center gap-1.5 text-sm text-[#1B4332] font-medium">
        <ArrowLeft className="w-4 h-4" /> Curriculum
      </Link>

      {/* Header */}
      <div>
        <div className="flex gap-2 flex-wrap mb-2">
          <TheoryPill label="Kolb: Active Experimentation" color="#FEF9C3" text="#92400E" tooltip="Kolb's Active Experimentation — learners test strategies in realistic contexts and observe the consequences of different approaches." />
          <TheoryPill label="Bloom: Evaluate" color="#D1FAE5" text="#1B4332" tooltip="Bloom's Taxonomy — Evaluate level. Learners make judgements about the effectiveness of different negotiation strategies." />
        </div>
        <h1 className="text-xl font-bold text-[#1A1A1A]">{scenario.title}</h1>
        <p className="text-sm text-gray-600">{scenario.subtitle}</p>
      </div>

      {/* Banner */}
      <div className="bg-gradient-to-r from-[#1B4332] to-[#2D6A4F] rounded-2xl p-5 text-center text-white">
        <div className="text-4xl mb-2">{scenario.bannerEmoji} 😤</div>
        <p className="text-sm font-medium opacity-90">Flatmate conflict scenario</p>
      </div>

      {/* Context chips */}
      <div className="flex gap-2 flex-wrap">
        {scenario.chips.map((chip, i) => (
          <div key={i} className="bg-white rounded-xl px-3 py-2 shadow-sm text-center min-w-[90px]">
            <p className="text-xs font-bold text-[#1A1A1A]">{chip.value}</p>
            <p className="text-xs text-gray-600">{chip.label}</p>
          </div>
        ))}
      </div>

      {/* Round indicator */}
      <div className="flex items-center gap-2">
        {scenario.rounds.map((_, i) => (
          <div key={i} className={`flex-1 h-1.5 rounded-full transition-all ${i < round ? 'bg-[#1B4332]' : i === round ? 'bg-[#D1FAE5] border border-[#1B4332]' : 'bg-gray-200'}`} />
        ))}
        <span className="text-xs text-gray-600 ml-1">Round {round + 1}/{scenario.rounds.length}</span>
      </div>

      {/* Chat interface */}
      <div className="bg-gray-50 rounded-2xl p-4 space-y-3 min-h-[160px]">
        <AnimatePresence>
          {chatLog.map((msg, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <ChatBubble from={msg.from} text={msg.text} avatar={scenario.flatmateAvatar} name={scenario.flatmateName} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Response options */}
      {!showOutcome && (
        <div className="space-y-2">
          <p className="text-xs text-gray-600 font-medium">Choose your response:</p>
          {currentRound.options.map((opt, i) => (
            <button key={i} onClick={() => handleSelect(i)}
              className={`w-full text-left bg-white rounded-xl p-4 shadow-sm border-2 transition-all ${selectedOption === i ? 'border-[#1B4332]' : 'border-transparent hover:border-[#D1FAE5]'}`}>
              <p className="text-sm font-semibold text-[#1A1A1A] mb-1">"{opt.text}"</p>
              <p className="text-xs text-gray-600 italic">{opt.tone}</p>
            </button>
          ))}
        </div>
      )}

      {/* Outcome card */}
      <AnimatePresence>
        {showOutcome && currentOutcome && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl p-4 shadow-sm border border-[#D1FAE5] space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{currentOutcome.emoji}</span>
              <p className="text-sm font-semibold text-[#1A1A1A]">{currentOutcome.result}</p>
            </div>
            <ScoreBar label="Relationship impact" value={currentOutcome.relationship} />
            <ScoreBar label="Financial outcome" value={currentOutcome.financial} />
            <button onClick={handleNext}
              className="w-full bg-[#1B4332] text-white font-semibold py-3 rounded-xl text-sm flex items-center justify-center gap-2 mt-2">
              {round + 1 < scenario.rounds.length ? <>Next round <ArrowRight className="w-4 h-4" /></> : <>See final results <ArrowRight className="w-4 h-4" /></>}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}