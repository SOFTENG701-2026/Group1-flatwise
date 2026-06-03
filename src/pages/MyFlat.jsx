import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, Info, ChevronDown, ChevronUp, Users, Eye, EyeOff } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useUserProgress } from '@/lib/useUserProgress';
import { WEEKLY_CHALLENGES, FLAT_VISUALISATION_ITEMS } from '@/lib/flatChallengeData.js';
import confetti from 'canvas-confetti';

// ── Avatar component ──────────────────────────────────────────────────────────
function Avatar({ email, size = 'md', filled = true }) {
  const colors = ['#1B4332', '#8B5CF6', '#F59E0B', '#EF4444', '#3B82F6', '#EC4899'];
  const idx = email ? email.charCodeAt(0) % colors.length : 0;
  const initials = email ? email.slice(0, 2).toUpperCase() : '?';
  const sz = size === 'sm' ? 'w-7 h-7 text-xs' : size === 'lg' ? 'w-12 h-12 text-base' : 'w-9 h-9 text-xs';
  return (
    <div className={`${sz} rounded-full flex items-center justify-center font-bold text-white shrink-0 ${filled ? '' : 'opacity-50'}`}
      style={{ backgroundColor: filled ? colors[idx] : '#9CA3AF', border: filled ? 'none' : '2px solid #9CA3AF' }}>
      {filled ? initials : '?'}
    </div>
  );
}

// ── Challenge Card ─────────────────────────────────────────────────────────────
function ChallengeCard({ challenge, flatGroup, currentUser, onOptIn, onChallengeComplete }) {
  const [showInfo, setShowInfo] = useState(false);
  const [predictionValue, setPredictionValue] = useState('');
  const [predictionSubmitted, setPredictionSubmitted] = useState(false);

  const challengeData = flatGroup?.challenge_data?.[challenge.id] || {};
  const optedIn = (challengeData.opted_in || []).includes(currentUser?.email);
  const members = flatGroup?.members || [];
  const optedInMembers = challengeData.opted_in || [];
  const completedMembers = challengeData.completed || [];
  const predictions = challengeData.predictions || {};
  const comments = challengeData.comments || {};
  const allSubmitted = optedInMembers.length > 0 && optedInMembers.every(e => predictions[e] !== undefined);
  const userHasPredicted = predictions[currentUser?.email] !== undefined;

  const progress = optedInMembers.length === 0 ? 0 : Math.round((completedMembers.length / optedInMembers.length) * 100);

  const handleOptIn = () => onOptIn(challenge.id);

  const handlePredictionSubmit = async () => {
    if (!predictionValue) return;
    const val = parseFloat(predictionValue);
    if (isNaN(val)) return;
    const newPredictions = { ...predictions, [currentUser.email]: val };
    await base44.entities.FlatGroup.update(flatGroup.id, {
      challenge_data: { ...flatGroup.challenge_data, [challenge.id]: { ...challengeData, predictions: newPredictions } }
    });
    setPredictionSubmitted(true);
    // check if all submitted
    if (optedInMembers.every(e => e === currentUser.email || newPredictions[e] !== undefined)) {
      onChallengeComplete(challenge.id, challenge.reward);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-4 space-y-3">
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{challenge.emoji}</span>
            <div>
              <p className="font-semibold text-[#1A1A1A] text-sm">{challenge.title}</p>
              <span className="text-xs font-medium text-[#1B4332] bg-[#D1FAE5] px-2 py-0.5 rounded-full">COLLABORATIVE</span>
            </div>
          </div>
          <button onClick={handleOptIn}
            className={`shrink-0 text-xs font-semibold px-3 py-1.5 rounded-xl border-2 transition-all ${optedIn ? 'bg-[#1B4332] border-[#1B4332] text-white' : 'border-[#1B4332] text-[#1B4332]'}`}>
            {optedIn ? 'OPTED IN ✓' : 'OPT IN'}
          </button>
        </div>

        {/* Theory tag */}
        <span className="inline-block text-xs font-medium px-2 py-0.5 rounded-full" style={{ backgroundColor: challenge.theoryTag.color, color: challenge.theoryTag.text }}>
          {challenge.theoryTag.label}
        </span>

        <p className="text-sm text-gray-600">{challenge.description}</p>

        {/* Progress bar */}
        {optedInMembers.length > 0 && (
          <div>
            <div className="flex justify-between text-xs text-gray-600 mb-1">
              <span>Flat progress</span><span>{completedMembers.length}/{optedInMembers.length} done</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <motion.div className="h-full bg-[#1B4332] rounded-full" initial={{ width: 0 }} animate={{ width: `${progress}%` }} />
            </div>
          </div>
        )}

        {/* Flatmate avatar row */}
        <div className="flex gap-1.5">
          {members.map(email => {
            const isOptedIn = optedInMembers.includes(email);
            const isDone = completedMembers.includes(email);
            return (
              <div key={email} className="relative">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${isDone ? 'bg-[#1B4332] text-white' : isOptedIn ? 'border-2 border-[#1B4332] text-[#1B4332] bg-white' : 'bg-gray-100 text-gray-400'}`}>
                  {email.slice(0, 2).toUpperCase()}
                </div>
              </div>
            );
          })}
        </div>

        {/* Prediction UI */}
        {challenge.type === 'prediction' && optedIn && !allSubmitted && (
          <div className="bg-[#EEF5F0] rounded-xl p-3 space-y-2">
            {!userHasPredicted && !predictionSubmitted ? (
              <>
                <p className="text-xs font-semibold text-[#1B4332]">Your prediction: {challenge.scenario.title}</p>
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                    <input type="number" value={predictionValue} onChange={e => setPredictionValue(e.target.value)}
                      placeholder="Your guess" className="w-full pl-7 pr-3 py-2 rounded-lg border border-[#D1FAE5] text-sm focus:outline-none focus:border-[#1B4332]" />
                  </div>
                  <button onClick={handlePredictionSubmit} className="bg-[#1B4332] text-white px-4 py-2 rounded-lg text-sm font-semibold">
                    Submit
                  </button>
                </div>
                <p className="text-xs text-gray-600">{challenge.scenario.unit}</p>
              </>
            ) : (
              <p className="text-sm text-[#1B4332] font-medium">✓ Your prediction submitted — waiting for flatmates...</p>
            )}
          </div>
        )}

        {/* Prediction reveal */}
        {challenge.type === 'prediction' && allSubmitted && (
          <div className="bg-[#EEF5F0] rounded-xl p-3 space-y-2">
            <p className="text-xs font-semibold text-[#1B4332] mb-2">Predictions revealed! 🎉</p>
            {Object.entries(predictions).map(([email, val]) => (
              <div key={email} className="flex justify-between text-sm">
                <span className="text-gray-600 truncate max-w-[140px]">{email.split('@')[0]}</span>
                <span className="font-bold text-[#1A1A1A]">${val}</span>
              </div>
            ))}
            <div className="border-t border-[#D1FAE5] pt-2 flex justify-between text-sm">
              <span className="text-[#1B4332] font-semibold">Actual</span>
              <span className="font-bold text-[#1B4332]">{challenge.scenario.actualLabel}</span>
            </div>
            <p className="text-xs text-gray-600 mt-1">💬 Chat about it (max 100 chars each):</p>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-1">
          <span className="text-sm text-gray-600">⏳ {challenge.daysLeft} days left</span>
          <div className="flex items-center gap-1.5 bg-[#EEF5F0] rounded-xl px-3 py-1.5">
            <span className="text-sm">{challenge.reward.xpBonus > 0 ? `+${challenge.reward.xpBonus} XP + ` : ''}{FLAT_VISUALISATION_ITEMS[challenge.reward.itemId]?.emoji}</span>
            <span className="text-sm text-[#1B4332] font-medium">{challenge.reward.itemLabel}</span>
          </div>
        </div>

        <button className="w-full bg-[#1B4332] text-white font-semibold py-2.5 rounded-xl text-sm">
          {optedIn ? 'Continue your part →' : 'Join this challenge →'}
        </button>
      </div>
    </div>
  );
}

// ── Flat Visualisation ─────────────────────────────────────────────────────────
function FlatVis({ unlockedItems }) {
  const defaultItems = Object.entries(FLAT_VISUALISATION_ITEMS).filter(([, v]) => v.default).map(([k]) => k);
  const allItems = [...new Set([...defaultItems, ...(unlockedItems || [])])];
  return (
    <div className="bg-gradient-to-b from-[#EEF5F0] to-white rounded-2xl p-5 border border-[#D1FAE5]">
      <p className="text-xs font-semibold text-[#1B4332] uppercase tracking-wide mb-3">Your flat 🏠</p>
      <div className="flex flex-wrap gap-4 justify-center">
        {allItems.map(id => {
          const item = FLAT_VISUALISATION_ITEMS[id];
          if (!item) return null;
          return (
            <div key={id} className="flex flex-col items-center gap-1">
              <span className="text-3xl">{item.emoji}</span>
              <span className="text-xs text-gray-600">{item.label}</span>
            </div>
          );
        })}
      </div>
      {(unlockedItems || []).length === 0 && (
        <p className="text-xs text-center text-gray-400 mt-2">Complete flat challenges to unlock new items!</p>
      )}
    </div>
  );
}

// ── Main MyFlat page ───────────────────────────────────────────────────────────
export default function MyFlat() {
  const { progress, user, updateFlatCode, addXP, completeChallenge } = useUserProgress();
  const [flatGroup, setFlatGroup] = useState(null);
  const [loadingFlat, setLoadingFlat] = useState(true);
  const [joinCode, setJoinCode] = useState('');
  const [joinError, setJoinError] = useState('');
  const [copied, setCopied] = useState(false);
  const [showInfoSheet, setShowInfoSheet] = useState(false);
  const [showCompleted, setShowCompleted] = useState(false);
  const [hideProgress, setHideProgress] = useState(false);
  const [celebratingChallenge, setCelebratingChallenge] = useState(null);

  useEffect(() => {
    if (!progress?.flat_code) { setLoadingFlat(false); return; }
    loadFlatGroup(progress.flat_code);
  }, [progress?.flat_code]);

  const loadFlatGroup = async (code) => {
    setLoadingFlat(true);
    const groups = await base44.entities.FlatGroup.filter({ code });
    if (groups.length > 0) setFlatGroup(groups[0]);
    setLoadingFlat(false);
  };

  const generateCode = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let c = 'FLAT-';
    for (let i = 0; i < 4; i++) c += chars[Math.floor(Math.random() * chars.length)];
    return c;
  };

  const handleCreate = async () => {
    const code = generateCode();
    const group = await base44.entities.FlatGroup.create({
      code,
      name: `${user?.full_name?.split(' ')[0] || 'My'}'s Flat`,
      members: [user.email],
      completed_challenges: [],
      unlocked_items: [],
      challenge_data: {}
    });
    await updateFlatCode(code);
    setFlatGroup(group);
  };

  const handleJoin = async () => {
    const code = joinCode.trim().toUpperCase();
    if (!code) { setJoinError('Please enter a code'); return; }
    const groups = await base44.entities.FlatGroup.filter({ code });
    if (groups.length === 0) { setJoinError('No flat found with that code'); return; }
    const group = groups[0];
    const members = group.members || [];
    if (!members.includes(user.email)) {
      const updated = await base44.entities.FlatGroup.update(group.id, { members: [...members, user.email] });
      setFlatGroup(updated);
    } else {
      setFlatGroup(group);
    }
    await updateFlatCode(code);
    setJoinError('');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(flatGroup?.code || '');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOptIn = async (challengeId) => {
    if (!flatGroup) return;
    const cd = flatGroup.challenge_data || {};
    const challengeData = cd[challengeId] || {};
    const optedIn = challengeData.opted_in || [];
    const isIn = optedIn.includes(user.email);
    const newOptedIn = isIn ? optedIn.filter(e => e !== user.email) : [...optedIn, user.email];
    const updated = await base44.entities.FlatGroup.update(flatGroup.id, {
      challenge_data: { ...cd, [challengeId]: { ...challengeData, opted_in: newOptedIn } }
    });
    setFlatGroup(updated);
  };

  const handleChallengeComplete = async (challengeId, reward) => {
    confetti({ particleCount: 80, spread: 60, colors: ['#1B4332', '#D1FAE5', '#F59E0B'] });
    setCelebratingChallenge(challengeId);
    if (reward.xpBonus > 0) addXP(reward.xpBonus);
    completeChallenge(challengeId, 0);
    // unlock flat item
    if (reward.itemId && flatGroup) {
      const unlocked = flatGroup.unlocked_items || [];
      if (!unlocked.includes(reward.itemId)) {
        const updated = await base44.entities.FlatGroup.update(flatGroup.id, {
          unlocked_items: [...unlocked, reward.itemId],
          completed_challenges: [...(flatGroup.completed_challenges || []), challengeId]
        });
        setFlatGroup(updated);
      }
    }
    setTimeout(() => setCelebratingChallenge(null), 4000);
  };

  const totalModulesInFlat = () => {
    // placeholder — would need to fetch all member progress records
    return (flatGroup?.members?.length || 0) * 1;
  };

  if (loadingFlat) return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="w-8 h-8 border-4 border-[#D1FAE5] border-t-[#1B4332] rounded-full animate-spin" />
    </div>
  );

  // ── Setup screen ──────────────────────────────────────────────────────────────
  if (!progress?.flat_code || !flatGroup) {
    return (
      <div className="space-y-5">
        <div>
          <h1 className="text-2xl font-bold text-[#1A1A1A]">My Flat 👥</h1>
          <p className="text-sm text-gray-600 mt-0.5">Study together, learn together</p>
        </div>

        <div className="flex items-center gap-2 bg-[#EEF5F0] rounded-xl px-3 py-2">
          <span className="text-sm">🔒</span>
          <p className="text-sm text-[#1B4332] font-medium">Only your flatmates can see your progress</p>
        </div>

        {/* Create */}
        <div className="bg-white rounded-2xl p-5 shadow-sm space-y-3">
          <div className="w-10 h-10 bg-[#D1FAE5] rounded-xl flex items-center justify-center text-xl">🏠</div>
          <h2 className="font-bold text-[#1A1A1A]">Create a flat group</h2>
          <p className="text-sm text-gray-600">Generate a code and share it with your flatmates</p>
          <button onClick={handleCreate} className="w-full bg-[#1B4332] text-white font-semibold py-3 rounded-xl text-sm">
            Create my flat →
          </button>
        </div>

        {/* Join */}
        <div className="bg-white rounded-2xl p-5 shadow-sm space-y-3">
          <div className="w-10 h-10 bg-[#FEF9C3] rounded-xl flex items-center justify-center text-xl">🔑</div>
          <h2 className="font-bold text-[#1A1A1A]">Join a flat</h2>
          <p className="text-sm text-gray-600">Enter a code from your flatmate</p>
          <div className="flex gap-2">
            <input value={joinCode} onChange={e => setJoinCode(e.target.value.toUpperCase())}
              placeholder="FLAT-XXXX" className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-mono focus:outline-none focus:border-[#1B4332]" />
            <button onClick={handleJoin} className="bg-[#1B4332] text-white font-semibold px-5 py-2.5 rounded-xl text-sm">
              Join
            </button>
          </div>
          {joinError && <p className="text-xs text-red-500">{joinError}</p>}
        </div>
      </div>
    );
  }

  // ── Main screen ───────────────────────────────────────────────────────────────
  const completedChallengeIds = flatGroup.completed_challenges || [];
  const activeChallenges = WEEKLY_CHALLENGES.filter(c => !completedChallengeIds.includes(c.id));
  const completedChallenges = WEEKLY_CHALLENGES.filter(c => completedChallengeIds.includes(c.id));

  return (
    <div className="space-y-5 pb-4">
      {/* Flat name + members */}
      <div>
        <h1 className="text-2xl font-bold text-[#1A1A1A]">{flatGroup.name || 'My Flat'} 🏠</h1>
        <div className="flex items-center gap-2 mt-2">
          {(flatGroup.members || []).map(email => (
            <Avatar key={email} email={email} size="md" />
          ))}
          <div className="bg-white rounded-full px-3 py-1 text-xs font-medium text-gray-500 shadow-sm border border-gray-100 ml-1">
            Code: <span className="font-mono font-bold text-[#1B4332]">{flatGroup.code}</span>
          </div>
          <button onClick={handleCopy} className="p-1.5 rounded-full bg-white shadow-sm border border-gray-100 ml-auto">
            {copied ? <Check className="w-4 h-4 text-[#1B4332]" /> : <Copy className="w-4 h-4 text-gray-400" />}
          </button>
        </div>
      </div>

      {/* Flat visualisation */}
      <FlatVis unlockedItems={flatGroup.unlocked_items} />

      {/* Flat learning progress card */}
      <div className="bg-[#1B4332] rounded-2xl p-5 text-white">
        <p className="text-xs font-semibold text-white/80 uppercase tracking-wide mb-1">FLAT LEARNING PROGRESS</p>
        <p className="text-2xl font-bold">{totalModulesInFlat()} modules</p>
        <p className="text-sm text-white/80 mt-0.5">completed across the flat this week</p>
        <p className="text-xs text-white/70 mt-2">~{(flatGroup.members || []).length} flatmates learning together</p>
      </div>

      {/* Challenges heading */}
      <div className="flex items-center gap-2">
        <h2 className="text-base font-bold text-[#1A1A1A]">THIS WEEK'S CHALLENGES</h2>
        <button onClick={() => setShowInfoSheet(true)}>
          <Info className="w-4 h-4 text-gray-400" />
        </button>
      </div>

      {/* Challenge cards */}
      <div className="space-y-4">
        {activeChallenges.map(c => (
          <ChallengeCard key={c.id} challenge={c} flatGroup={flatGroup} currentUser={user}
            onOptIn={handleOptIn} onChallengeComplete={handleChallengeComplete} />
        ))}
      </div>

      {/* Completed challenges */}
      {completedChallenges.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <button onClick={() => setShowCompleted(v => !v)}
            className="w-full flex items-center justify-between p-4 text-sm font-semibold text-[#1A1A1A]">
            Completed Challenges ({completedChallenges.length})
            {showCompleted ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          <AnimatePresence>
            {showCompleted && (
              <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                <div className="px-4 pb-4 space-y-2">
                  {completedChallenges.map(c => (
                    <div key={c.id} className="flex items-center gap-3 py-2 border-t border-gray-50">
                      <span className="text-xl">{c.emoji}</span>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-600">{c.title}</p>
                        <p className="text-xs text-gray-600">{c.reward.itemLabel} unlocked</p>
                      </div>
                      <span className="text-green-500 text-sm">✓</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Flat Learning Board */}
      <div className="bg-white rounded-2xl shadow-sm p-5 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-[#1A1A1A]">FLAT LEARNING BOARD</h2>
          <button onClick={() => setHideProgress(v => !v)} className="flex items-center gap-1 text-xs text-gray-400">
            {hideProgress ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
            {hideProgress ? 'Show my progress' : 'Hide my progress'}
          </button>
        </div>
        <div className="space-y-3">
          {(flatGroup.members || []).map((email, i) => {
            const isMe = email === user?.email;
            const isHidden = isMe && hideProgress;
            const xpWidth = isHidden ? 0 : Math.min(100, (i + 1) * 20);
            return (
              <div key={email} className="flex items-center gap-3">
                <Avatar email={email} size="sm" />
                <div className="flex-1">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-medium text-gray-700">{isHidden ? '🙈 Hidden' : email.split('@')[0]}</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    {!isHidden && <div className="h-full bg-[#1B4332] rounded-full" style={{ width: `${xpWidth}%` }} />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <p className="text-sm text-gray-600 text-center">Everyone learns at their own pace 🙂</p>
      </div>

      {/* Challenge info bottom sheet */}
      <AnimatePresence>
        {showInfoSheet && (
          <>
            <div className="fixed inset-0 bg-black/30 z-40" onClick={() => setShowInfoSheet(false)} />
            <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', damping: 25 }}
              className="fixed inset-x-0 bottom-0 z-50 bg-white rounded-t-3xl p-5 max-w-[420px] mx-auto">
              <h3 className="font-bold text-[#1A1A1A] mb-3">About challenges</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Challenges are optional. Designed to help your flat learn together — not to create pressure around money. Opt out anytime.
              </p>
              <p className="text-sm text-gray-600 mt-3 leading-relaxed">
                Completing challenges together unlocks shared items in your flat visualisation — a fun way to see your collective learning progress.
              </p>
              <button onClick={() => setShowInfoSheet(false)}
                className="w-full bg-[#1B4332] text-white font-semibold py-3 rounded-xl text-sm mt-4">
                Got it
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Challenge celebration overlay */}
      <AnimatePresence>
        {celebratingChallenge && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-4 z-50 bg-[#1B4332] rounded-3xl flex flex-col items-center justify-center text-center p-6 shadow-2xl max-w-[380px] mx-auto">
            <div className="text-6xl mb-3">🎉</div>
            <h2 className="text-2xl font-bold text-white mb-2">Challenge complete!</h2>
            {(() => {
              const ch = WEEKLY_CHALLENGES.find(c => c.id === celebratingChallenge);
              return ch ? (
                <>
                  <p className="text-[#D1FAE5] text-sm mb-4">{ch.reward.description}</p>
                  <div className="bg-white/10 rounded-2xl p-4 mb-4 w-full">
                    <p className="text-3xl">{FLAT_VISUALISATION_ITEMS[ch.reward.itemId]?.emoji}</p>
                    <p className="text-white font-semibold mt-1">{ch.reward.itemLabel}</p>
                    <p className="text-[#D1FAE5] text-xs mt-1">Added to your flat!</p>
                  </div>
                  <button onClick={() => setCelebratingChallenge(null)}
                    className="w-full bg-white text-[#1B4332] font-bold py-3 rounded-xl text-sm">
                    Back to challenges
                  </button>
                </>
              ) : null;
            })()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}