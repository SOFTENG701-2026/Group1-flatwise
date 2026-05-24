import React, { useState } from 'react';
import { useProgress } from '../lib/useProgress';

const AVATAR_COLORS = ['#7C3AED', '#D97706', '#059669', '#DB2777', '#2563EB', '#DC2626'];

const FAKE_FLATMATES = [
  { initials: 'AJ', name: 'Alex J', modulesCompleted: 3, color: AVATAR_COLORS[0] },
  { initials: 'SC', name: 'Sam C', modulesCompleted: 1, color: AVATAR_COLORS[1] },
  { initials: 'MK', name: 'Morgan K', modulesCompleted: 2, color: AVATAR_COLORS[2] },
];

const CHALLENGES = [
  {
    id: 'module-sprint',
    icon: '📚',
    title: 'Flat Module Sprint',
    badge: 'COLLABORATIVE',
    theory: 'Social Constructivism — Vygotsky',
    theoryTooltip: 'Learning alongside peers in a shared context reinforces understanding and motivation.',
    description: 'All opted-in flatmates complete this week\'s featured module before Sunday. Help each other if someone gets stuck.',
    daysLeft: 5,
    reward: '🪑 Shared bookshelf for your flat',
    rewardPreview: '📚 Bookshelf',
    xpBonus: null,
    flatmates: [
      { initials: 'AJ', color: AVATAR_COLORS[0], status: 'complete' },
      { initials: 'SC', color: AVATAR_COLORS[1], status: 'progress' },
      { initials: 'MK', color: AVATAR_COLORS[2], status: 'none' },
    ],
    optedIn: false,
    joined: 2,
    completed: 1,
    total: 3,
  },
  {
    id: 'predict-together',
    icon: '🔮',
    title: 'Predict Together',
    badge: 'COLLABORATIVE',
    theory: 'Constructivism — Predict & Reflect',
    theoryTooltip: 'Predicting outcomes before seeing them builds deeper understanding than passive reading.',
    description: 'Each flatmate submits their own prediction for a shared flat cost scenario. Predictions stay hidden until everyone submits — then see the full range together.',
    daysLeft: 3,
    reward: '🌱 Fairy lights for your flat',
    rewardPreview: '✨ Fairy Lights',
    xpBonus: 25,
    flatmates: [
      { initials: 'AJ', color: AVATAR_COLORS[0], status: 'complete' },
      { initials: 'SC', color: AVATAR_COLORS[1], status: 'none' },
      { initials: 'MK', color: AVATAR_COLORS[2], status: 'none' },
    ],
    optedIn: false,
    joined: 1,
    completed: 1,
    total: 3,
    predictScenario: 'How much does a 4-person Wellington flat spend on power in July?',
    predictions: null, // null = not revealed yet
  },
  {
    id: 'quiz-streak',
    icon: '⚡',
    title: 'Quiz Streak Challenge',
    badge: 'COLLABORATIVE',
    theory: 'Behaviourism — Group Reinforcement',
    theoryTooltip: 'Group accountability reinforces individual effort — completing together earns shared rewards.',
    description: 'Every opted-in flatmate scores at least 80% on this week\'s knowledge check quiz.',
    daysLeft: 7,
    reward: '+50 XP bonus for all completing members',
    rewardPreview: '⭐ +50 XP',
    xpBonus: 50,
    flatmates: [
      { initials: 'AJ', color: AVATAR_COLORS[0], status: 'complete' },
      { initials: 'SC', color: AVATAR_COLORS[1], status: 'progress' },
      { initials: 'MK', color: AVATAR_COLORS[2], status: 'none' },
    ],
    optedIn: false,
    joined: 2,
    completed: 1,
    total: 3,
  },
];

const INFO_SHEET_TEXT = "Challenges are optional. They're designed to help your flat learn together — not to create pressure or comparison around money. You can opt out of any challenge at any time.";

export default function MyFlat() {
  const { progress } = useProgress();
  const [flatSetup, setFlatSetup] = useState(() => {
    try { return JSON.parse(localStorage.getItem('flatwise_flat') || 'null'); } catch { return null; }
  });
  const [setupStep, setSetupStep] = useState('choice'); // choice | create | join | confirm
  const [flatCode] = useState('FLAT-' + Math.random().toString(36).substr(2, 4).toUpperCase());
  const [joinInput, setJoinInput] = useState('');
  const [challenges, setChallenges] = useState(CHALLENGES);
  const [tappedFlatmate, setTappedFlatmate] = useState(null);
  const [showInfo, setShowInfo] = useState(false);
  const [hideProgress, setHideProgress] = useState(false);
  const [flatName, setFlatName] = useState('Flat 4B 🏠');
  const [editingName, setEditingName] = useState(false);
  const [predictInput, setPredictInput] = useState('');
  const [predictSubmitted, setPredictSubmitted] = useState(false);
  const [showPredictReveal, setShowPredictReveal] = useState(false);
  const [completedExpanded, setCompletedExpanded] = useState(false);

  const joinFlat = (name) => {
    const flat = { name, code: flatCode, joinedAt: Date.now() };
    localStorage.setItem('flatwise_flat', JSON.stringify(flat));
    setFlatSetup(flat);
    setSetupStep('confirm');
  };

  const toggleOptIn = (id) => {
    setChallenges(prev => prev.map(c => c.id === id ? { ...c, optedIn: !c.optedIn } : c));
  };

  // FLAT SETUP SCREEN
  if (!flatSetup || setupStep === 'confirm') {
    if (setupStep === 'choice') return (
      <div style={{ minHeight: '100vh', background: '#F0FAF4', display: 'flex', flexDirection: 'column', paddingBottom: 80 }}>
        <div style={{ flex: 1, padding: '60px 20px 20px' }}>
          {/* Banner */}
          <div style={{ background: '#1B4332', borderRadius: 20, padding: 24, marginBottom: 24, textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: -8, marginBottom: 12 }}>
              {['🧑‍🦱','👩‍🦰','🧑','👱'].map((e, i) => (
                <span key={i} style={{ fontSize: 32, marginLeft: i > 0 ? -4 : 0 }}>{e}</span>
              ))}
            </div>
            <h1 style={{ color: 'white', fontSize: 24, fontWeight: 800, marginBottom: 8 }}>Learn better together</h1>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14, lineHeight: 1.6, maxWidth: 280, margin: '0 auto 12px' }}>
              Connect with your flatmates to take on shared challenges and see everyone's progress.
            </p>
            <span style={{ background: 'rgba(82,183,136,0.3)', color: '#86EFAC', padding: '4px 12px', borderRadius: 99, fontSize: 12, fontWeight: 600 }}>
              🔒 Only your flatmates can see your progress
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <button onClick={() => setSetupStep('create')} style={{ background: 'white', border: '1.5px solid #E5E7EB', borderRadius: 16, padding: 18, textAlign: 'left', cursor: 'pointer', display: 'flex', gap: 14, alignItems: 'center' }}>
              <span style={{ fontSize: 28 }}>🏠</span>
              <div>
                <p style={{ fontWeight: 700, fontSize: 16, color: '#111827', marginBottom: 2 }}>Create a flat group</p>
                <p style={{ fontSize: 13, color: '#9CA3AF' }}>Get a flat code to share with your flatmates</p>
              </div>
            </button>
            <button onClick={() => setSetupStep('join')} style={{ background: 'white', border: '1.5px solid #E5E7EB', borderRadius: 16, padding: 18, textAlign: 'left', cursor: 'pointer', display: 'flex', gap: 14, alignItems: 'center' }}>
              <span style={{ fontSize: 28 }}>🔑</span>
              <div>
                <p style={{ fontWeight: 700, fontSize: 16, color: '#111827', marginBottom: 2 }}>Join an existing flat</p>
                <p style={{ fontSize: 13, color: '#9CA3AF' }}>Enter the code your flatmate shared with you</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    );

    if (setupStep === 'create') return (
      <div style={{ minHeight: '100vh', background: '#F0FAF4', padding: '60px 20px 100px' }}>
        <button onClick={() => setSetupStep('choice')} style={{ background: 'none', border: 'none', color: '#6B7280', fontSize: 13, cursor: 'pointer', padding: '0 0 20px', display: 'block' }}>← Back</button>
        <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 8 }}>Your flat code</h2>
        <p style={{ color: '#6B7280', fontSize: 14, marginBottom: 20 }}>Share this with your flatmates so they can join.</p>
        <div style={{ background: 'white', border: '2px solid #1B4332', borderRadius: 16, padding: 20, textAlign: 'center', marginBottom: 16 }}>
          <p style={{ fontSize: 32, fontWeight: 800, letterSpacing: 4, color: '#1B4332', fontFamily: 'monospace' }}>{flatCode}</p>
          <button onClick={() => navigator.clipboard?.writeText(flatCode)} style={{ background: '#F0FAF4', border: '1px solid #86EFAC', borderRadius: 99, padding: '6px 16px', fontSize: 13, fontWeight: 600, color: '#1B4332', cursor: 'pointer', marginTop: 8 }}>Copy code</button>
        </div>
        <button className="btn-primary" onClick={() => joinFlat('My Flat')}>This is my code — set up flat →</button>
      </div>
    );

    if (setupStep === 'join') return (
      <div style={{ minHeight: '100vh', background: '#F0FAF4', padding: '60px 20px 100px' }}>
        <button onClick={() => setSetupStep('choice')} style={{ background: 'none', border: 'none', color: '#6B7280', fontSize: 13, cursor: 'pointer', padding: '0 0 20px', display: 'block' }}>← Back</button>
        <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 8 }}>Join a flat</h2>
        <p style={{ color: '#6B7280', fontSize: 14, marginBottom: 20 }}>Enter the code your flatmate shared with you.</p>
        <input
          value={joinInput}
          onChange={e => setJoinInput(e.target.value.toUpperCase())}
          placeholder="e.g. FLAT-4K2X"
          style={{ width: '100%', border: '1.5px solid #D1D5DB', borderRadius: 12, padding: '12px 14px', fontSize: 16, letterSpacing: 2, fontFamily: 'monospace', boxSizing: 'border-box', marginBottom: 12 }}
        />
        <button className="btn-primary" onClick={() => joinInput.length >= 4 && joinFlat('Shared Flat')} style={{ opacity: joinInput.length < 4 ? 0.5 : 1 }}>Join flat →</button>
      </div>
    );

    if (setupStep === 'confirm') return (
      <div style={{ minHeight: '100vh', background: '#F0FAF4', padding: '60px 20px 100px', textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>🎉</div>
        <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 8 }}>You're in!</h2>
        <p style={{ color: '#6B7280', marginBottom: 20 }}>Your flatmates are already here:</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginBottom: 20 }}>
          {FAKE_FLATMATES.map((f, i) => (
            <div key={i} style={{ width: 44, height: 44, borderRadius: '50%', background: f.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: 14 }}>{f.initials}</div>
          ))}
        </div>
        <p style={{ fontSize: 13, color: '#9CA3AF', marginBottom: 24 }}>Challenges are opt-in — you choose which ones to join.</p>
        <button className="btn-primary" onClick={() => setSetupStep('main')}>Go to My Flat →</button>
      </div>
    );
  }

  // MAIN FLAT SCREEN
  const totalModules = (FAKE_FLATMATES.length + 1) * 6; // 4 members × 6 modules
  const completedTotal = FAKE_FLATMATES.reduce((a, f) => a + f.modulesCompleted, 0) + progress.completedModules.length;

  return (
    <div style={{ minHeight: '100vh', background: '#F0FAF4', paddingBottom: 100 }}>
      {/* Header */}
      <div style={{ background: '#1B4332', padding: '52px 20px 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          {editingName ? (
            <input
              value={flatName}
              onChange={e => setFlatName(e.target.value)}
              onBlur={() => setEditingName(false)}
              autoFocus
              style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: 8, color: 'white', fontSize: 18, fontWeight: 700, padding: '4px 8px', width: 180 }}
            />
          ) : (
            <button onClick={() => setEditingName(true)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
              <h1 style={{ color: 'white', fontSize: 20, fontWeight: 800, margin: 0 }}>{flatName}</h1>
              <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14 }}>✏️</span>
            </button>
          )}
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>My Flat</p>
        </div>

        {/* Flatmate avatars */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
          <div
            onClick={() => setTappedFlatmate(tappedFlatmate === 'me' ? null : 'me')}
            style={{ width: 40, height: 40, borderRadius: '50%', background: '#52B788', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: 14, cursor: 'pointer', border: '2px solid rgba(255,255,255,0.5)', position: 'relative' }}
          >
            You
          </div>
          {FAKE_FLATMATES.map((f, i) => (
            <div key={i}
              onClick={() => setTappedFlatmate(tappedFlatmate === i ? null : i)}
              style={{ width: 40, height: 40, borderRadius: '50%', background: f.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: 14, cursor: 'pointer', border: '2px solid rgba(255,255,255,0.3)' }}
            >
              {f.initials}
            </div>
          ))}
        </div>

        {/* Flatmate card popup */}
        {tappedFlatmate !== null && (
          <div style={{ background: 'white', borderRadius: 12, padding: 12, marginBottom: 8 }}>
            {tappedFlatmate === 'me' ? (
              <>
                <p style={{ fontWeight: 700, fontSize: 14, color: '#111827' }}>You</p>
                <p style={{ fontSize: 13, color: '#6B7280' }}>{progress.completedModules.length} module{progress.completedModules.length !== 1 ? 's' : ''} completed</p>
              </>
            ) : (
              <>
                <p style={{ fontWeight: 700, fontSize: 14, color: '#111827' }}>{FAKE_FLATMATES[tappedFlatmate].name}</p>
                <p style={{ fontSize: 13, color: '#6B7280' }}>{FAKE_FLATMATES[tappedFlatmate].modulesCompleted} modules completed</p>
              </>
            )}
          </div>
        )}
      </div>

      <div style={{ padding: '16px 16px 0' }}>
        {/* Flat progress card */}
        <div style={{ background: '#1B4332', borderRadius: 16, padding: 16, marginBottom: 14 }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.5)', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 8 }}>Flat learning progress</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
            <p style={{ color: 'white', fontWeight: 800, fontSize: 18 }}>{completedTotal} / {totalModules} modules</p>
            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>across your flat</span>
          </div>
          <div style={{ height: 6, background: 'rgba(255,255,255,0.15)', borderRadius: 99, overflow: 'hidden', marginBottom: 8 }}>
            <div style={{ height: '100%', width: `${(completedTotal / totalModules) * 100}%`, background: '#52B788', borderRadius: 99 }} />
          </div>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12 }}>⏱ Your flat has spent ~{Math.round(completedTotal * 0.5)} hours learning together this week</p>
        </div>

        {/* Challenges heading */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: '#111827', textTransform: 'uppercase', letterSpacing: 0.5 }}>This Week's Challenges</h2>
          <button onClick={() => setShowInfo(true)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 18 }}>ℹ️</button>
        </div>

        {/* Info bottom sheet */}
        {showInfo && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 200, display: 'flex', alignItems: 'flex-end' }} onClick={() => setShowInfo(false)}>
            <div style={{ background: 'white', borderRadius: '20px 20px 0 0', padding: 20, width: '100%' }} onClick={e => e.stopPropagation()}>
              <div style={{ width: 36, height: 4, background: '#E5E7EB', borderRadius: 99, margin: '0 auto 16px' }} />
              <p style={{ fontSize: 15, fontWeight: 700, marginBottom: 8 }}>How challenges work</p>
              <p style={{ fontSize: 14, color: '#6B7280', lineHeight: 1.6 }}>{INFO_SHEET_TEXT}</p>
              <button className="btn-primary" style={{ marginTop: 16 }} onClick={() => setShowInfo(false)}>Got it</button>
            </div>
          </div>
        )}

        {/* Challenge cards */}
        {challenges.map(c => (
          <ChallengeCard
            key={c.id}
            challenge={c}
            onToggleOptIn={() => toggleOptIn(c.id)}
            predictInput={predictInput}
            setPredictInput={setPredictInput}
            predictSubmitted={predictSubmitted}
            setPredictSubmitted={setPredictSubmitted}
            showPredictReveal={showPredictReveal}
            setShowPredictReveal={setShowPredictReveal}
          />
        ))}

        {/* Completed challenges */}
        <button
          onClick={() => setCompletedExpanded(e => !e)}
          style={{ background: 'white', border: '1px solid #E5E7EB', borderRadius: 14, padding: '12px 16px', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', marginBottom: 10 }}
        >
          <span style={{ fontWeight: 600, fontSize: 14, color: '#374151' }}>✓ Completed Challenges</span>
          <span style={{ color: '#9CA3AF' }}>{completedExpanded ? '▲' : '▼'}</span>
        </button>
        {completedExpanded && (
          <div style={{ background: 'white', border: '1px solid #E5E7EB', borderRadius: 14, padding: 14, marginBottom: 10 }}>
            <p style={{ color: '#9CA3AF', fontSize: 13, textAlign: 'center', padding: '8px 0' }}>No completed challenges yet — join one above!</p>
          </div>
        )}

        {/* Flat Learning Board */}
        <div style={{ background: 'white', border: '1px solid #E5E7EB', borderRadius: 16, padding: 16, marginBottom: 14 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: '#111827', textTransform: 'uppercase', letterSpacing: 0.5 }}>Flat Learning Board</h3>
            <button onClick={() => setHideProgress(p => !p)} style={{ background: 'none', border: 'none', fontSize: 12, color: '#9CA3AF', cursor: 'pointer' }}>
              {hideProgress ? '👁 Show my progress' : '🙈 Hide my progress'}
            </button>
          </div>

          {/* Me */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#52B788', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: 12, flexShrink: 0 }}>You</div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 3 }}>You</p>
              {hideProgress ? (
                <p style={{ fontSize: 12, color: '#9CA3AF' }}>🙈 Hidden</p>
              ) : (
                <div style={{ height: 6, background: '#F3F4F6', borderRadius: 99, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${Math.min(100, (progress.xp / 300) * 100)}%`, background: '#1B4332', borderRadius: 99 }} />
                </div>
              )}
            </div>
            {!hideProgress && <span style={{ fontSize: 12, fontWeight: 700, color: '#1B4332' }}>{progress.xp} XP</span>}
          </div>

          {FAKE_FLATMATES.map((f, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: f.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: 12, flexShrink: 0 }}>{f.initials}</div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 3 }}>{f.name}</p>
                <div style={{ height: 6, background: '#F3F4F6', borderRadius: 99, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${(f.modulesCompleted / 6) * 100}%`, background: f.color, borderRadius: 99 }} />
                </div>
              </div>
            </div>
          ))}

          <p style={{ fontSize: 12, color: '#9CA3AF', fontStyle: 'italic', textAlign: 'center', marginTop: 8 }}>Everyone learns at their own pace 🙂</p>
        </div>
      </div>
    </div>
  );
}

function ChallengeCard({ challenge: c, onToggleOptIn, predictInput, setPredictInput, predictSubmitted, setPredictSubmitted, showPredictReveal, setShowPredictReveal }) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div style={{
      background: 'white',
      border: `1.5px solid ${c.optedIn ? '#1B4332' : '#E5E7EB'}`,
      borderLeft: `4px solid ${c.optedIn ? '#1B4332' : '#E5E7EB'}`,
      borderRadius: 16,
      padding: 16,
      marginBottom: 12,
    }}>
      {/* Top */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
        <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', flex: 1 }}>
          <span style={{ fontSize: 24, flexShrink: 0 }}>{c.icon}</span>
          <div>
            <p style={{ fontWeight: 700, fontSize: 15, color: '#111827', marginBottom: 3 }}>{c.title}</p>
            <span style={{ background: '#D8F3DC', color: '#14532D', padding: '2px 8px', borderRadius: 99, fontSize: 11, fontWeight: 700 }}>COLLABORATIVE</span>
          </div>
        </div>
        <button
          onClick={onToggleOptIn}
          style={{
            background: c.optedIn ? '#1B4332' : 'white',
            border: '1.5px solid #1B4332',
            borderRadius: 99,
            padding: '4px 12px',
            fontSize: 12,
            fontWeight: 700,
            color: c.optedIn ? 'white' : '#1B4332',
            cursor: 'pointer',
            flexShrink: 0,
            marginLeft: 8,
          }}
        >
          {c.optedIn ? 'OPTED IN ✓' : 'OPT IN'}
        </button>
      </div>

      {/* Theory tag */}
      <div style={{ marginBottom: 10 }}>
        <button onClick={() => setShowTooltip(t => !t)} style={{ background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: 99, padding: '3px 10px', fontSize: 11, fontWeight: 700, color: '#92400E', cursor: 'pointer' }}>
          {c.theory} ℹ️
        </button>
        {showTooltip && (
          <div style={{ background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: 10, padding: 10, marginTop: 6 }}>
            <p style={{ fontSize: 12, color: '#78350F', lineHeight: 1.5 }}>{c.theoryTooltip}</p>
          </div>
        )}
      </div>

      {/* Description */}
      <p style={{ fontSize: 13, color: '#374151', lineHeight: 1.6, marginBottom: 10 }}>{c.description}</p>

      {/* Predict Together special input */}
      {c.id === 'predict-together' && c.optedIn && !predictSubmitted && (
        <div style={{ background: '#F0FAF4', borderRadius: 10, padding: 12, marginBottom: 10 }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: '#1B4332', marginBottom: 6 }}>{c.predictScenario}</p>
          <div style={{ display: 'flex', gap: 8 }}>
            <input
              value={predictInput}
              onChange={e => setPredictInput(e.target.value)}
              placeholder="Your prediction ($)"
              style={{ flex: 1, border: '1.5px solid #86EFAC', borderRadius: 8, padding: '8px 10px', fontSize: 14 }}
            />
            <button onClick={() => predictInput && setPredictSubmitted(true)} style={{ background: '#1B4332', color: 'white', border: 'none', borderRadius: 8, padding: '8px 14px', fontWeight: 700, cursor: 'pointer', fontSize: 13 }}>Submit</button>
          </div>
        </div>
      )}

      {c.id === 'predict-together' && predictSubmitted && !showPredictReveal && (
        <div style={{ background: '#F0FAF4', borderRadius: 10, padding: 12, marginBottom: 10 }}>
          <p style={{ fontSize: 13, color: '#15803D' }}>✓ Your prediction: <strong>${predictInput}</strong></p>
          <p style={{ fontSize: 12, color: '#6B7280', marginTop: 4 }}>Waiting for all flatmates to submit before revealing results...</p>
          <button onClick={() => setShowPredictReveal(true)} style={{ background: 'none', border: '1px solid #86EFAC', borderRadius: 99, padding: '4px 12px', fontSize: 12, color: '#15803D', cursor: 'pointer', marginTop: 8 }}>
            Reveal early (demo) →
          </button>
        </div>
      )}

      {c.id === 'predict-together' && showPredictReveal && (
        <div style={{ background: '#F9FAFB', borderRadius: 10, padding: 12, marginBottom: 10 }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: '#111827', marginBottom: 8 }}>Predictions revealed 🎉</p>
          <div style={{ display: 'flex', gap: 4, alignItems: 'flex-end', height: 60, marginBottom: 8 }}>
            {['$45', `$${predictInput || '80'}`, '$120', '$87 actual'].map((val, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                <div style={{ width: '100%', background: i === 3 ? '#1B4332' : '#86EFAC', borderRadius: '4px 4px 0 0', height: [30, 50, 60, 45][i] }} />
                <p style={{ fontSize: 9, color: '#6B7280', textAlign: 'center' }}>{val}</p>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 12, color: '#6B7280', fontStyle: 'italic' }}>Range: $45–$120 · Actual: $87 — look how differently we all thought about this!</p>
        </div>
      )}

      {/* Progress bar */}
      <div style={{ marginBottom: 10 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
          <span style={{ fontSize: 12, color: '#6B7280' }}>{c.joined} / {c.total} flatmates joined · {c.completed} completed</span>
        </div>
        <div style={{ height: 5, background: '#F3F4F6', borderRadius: 99, overflow: 'hidden', marginBottom: 8 }}>
          <div style={{ height: '100%', width: `${(c.completed / c.total) * 100}%`, background: '#52B788', borderRadius: 99 }} />
        </div>
        {/* Avatar row */}
        <div style={{ display: 'flex', gap: 6 }}>
          {c.flatmates.map((f, i) => (
            <div key={i} style={{
              width: 28, height: 28, borderRadius: '50%',
              background: f.status === 'complete' ? f.color : f.status === 'progress' ? 'white' : '#E5E7EB',
              border: `2px solid ${f.status === 'complete' ? f.color : f.status === 'progress' ? f.color : '#E5E7EB'}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: f.status === 'complete' ? 'white' : f.color,
              fontWeight: 700, fontSize: 11,
            }}>
              {f.status === 'complete' ? '✓' : f.initials[0]}
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 12, color: '#9CA3AF' }}>⏳ {c.daysLeft} days left</span>
        <span style={{ fontSize: 12, color: '#1B4332', fontWeight: 600 }}>🏆 {c.rewardPreview}</span>
      </div>
      {c.optedIn && (
        <button className="btn-primary" style={{ marginTop: 10, fontSize: 13, padding: '10px' }}>Continue your part →</button>
      )}
      {!c.optedIn && (
        <button onClick={onToggleOptIn} style={{ background: 'none', border: 'none', color: '#1B4332', fontSize: 13, fontWeight: 600, cursor: 'pointer', marginTop: 8, padding: 0 }}>Join this challenge →</button>
      )}
    </div>
  );
}
