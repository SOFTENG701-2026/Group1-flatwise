import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../lib/useProgress';
import { MODULES } from '../lib/data';

const TIERS = [
  {
    num: 1, label: 'Foundations', subtitle: 'Single-person budgeting basics',
    modules: [
      { id: 'module1', title: 'Income & Fixed Costs', icon: '💰', activities: 3, duration: '~8 min', bloom: 'Bloom: Identify', theory: 'Constructivist scaffolding', routeIdx: 1 },
      { id: 'module2', title: 'Splitting Bills Fairly', icon: '🧮', activities: 3, duration: '~10 min', bloom: 'Bloom: Apply', theory: 'Kolb: predict → reflect', routeIdx: 2 },
    ]
  },
  {
    num: 2, label: 'Flat Life', subtitle: 'Multi-person shared costs',
    modules: [
      { id: 'module3', title: 'Variable & Seasonal Bills', icon: '⚡', activities: 4, duration: '~12 min', bloom: 'Bloom: Calculate', theory: 'Social constructivism', routeIdx: null },
      { id: 'module4', title: 'Variable & Unexpected Costs', icon: '📊', activities: 3, duration: '~10 min', bloom: 'Bloom: Predict', theory: 'Cognitivism: bias surfacing', routeIdx: null },
    ]
  },
  {
    num: 3, label: 'Full Semester', subtitle: 'Variable income + flatmate conflict',
    modules: [
      { id: 'module5', title: 'Variable Income & StudyLink', icon: '📅', activities: 3, duration: '~12 min', bloom: 'Bloom: Predict', theory: 'Kolb: full cycle', routeIdx: null },
      { id: 'module6', title: 'Flatmate Conflict & Bond Return', icon: '🤝', activities: 3, duration: '~12 min', bloom: 'Bloom: Reflect', theory: 'Social constructivism', routeIdx: null },
    ]
  },
];

const NEGOTIATION_SCENARIOS = [
  { id: 'internet-bill', title: 'The Internet Bill', subtitle: 'Who pays for the upgrade?', route: '/negotiation/internet-bill' },
  { id: 'cleaning-roster', title: 'The Cleaning Roster', subtitle: "Why is the kitchen always a mess?", route: '/negotiation/cleaning-roster' },
  { id: 'late-night-noise', title: 'Late Night Noise', subtitle: 'You have a 9am lecture tomorrow.', route: '/negotiation/late-night-noise' },
];

const SPOT_MISTAKES = [
  { id: 'alex-march', title: "Alex's March Budget", subtitle: 'Find 3 budgeting mistakes', route: '/spot-mistake/alex-march' },
  { id: 'sam-july', title: "Sam's July Budget", subtitle: 'Find 3 hidden errors', route: '/spot-mistake/sam-july' },
];

export default function Learn() {
  const navigate = useNavigate();
  const { progress } = useProgress();
  const { completedModules } = progress;

  const isUnlocked = (tierNum, modIdx) => {
    if (tierNum === 1) return true;
    if (tierNum === 2) return completedModules.length >= 2;
    if (tierNum === 3) return completedModules.length >= 4;
    return false;
  };

  return (
    <div style={{ minHeight: '100vh', background: '#F9FAFB', paddingBottom: 100 }}>
      <div style={{ background: '#1B4332', padding: '52px 20px 20px' }}>
        <h1 style={{ color: 'white', fontSize: 22, fontWeight: 800, marginBottom: 2 }}>Learning Modules</h1>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13 }}>Complete each tier to unlock the next</p>
      </div>

      <div style={{ padding: '16px 16px 0' }}>
        {TIERS.map(tier => {
          const unlocked = isUnlocked(tier.num, 0);
          return (
            <div key={tier.num} style={{ marginBottom: 20 }}>
              {/* Tier header */}
              <div style={{
                background: unlocked ? '#1B4332' : '#E5E7EB',
                borderRadius: 12,
                padding: '10px 14px',
                marginBottom: 8,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
                <div>
                  <p style={{ fontSize: 11, color: unlocked ? 'rgba(255,255,255,0.6)' : '#9CA3AF', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>TIER {tier.num}</p>
                  <p style={{ fontSize: 15, fontWeight: 700, color: unlocked ? 'white' : '#6B7280' }}>{tier.label}</p>
                  <p style={{ fontSize: 12, color: unlocked ? 'rgba(255,255,255,0.6)' : '#9CA3AF' }}>{tier.subtitle}</p>
                </div>
                {!unlocked && <span style={{ fontSize: 20 }}>🔒</span>}
                {unlocked && (
                  <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13 }}>
                    {tier.modules.filter(m => completedModules.includes(m.id)).length}/{tier.modules.length} complete
                  </span>
                )}
              </div>

              {/* Modules */}
              {tier.modules.map((mod, i) => {
                const done = completedModules.includes(mod.id);
                const available = unlocked;
                return (
                  <div
                    key={mod.id}
                    onClick={() => available && mod.routeIdx && navigate(`/module/${mod.routeIdx}`)}
                    style={{
                      background: 'white',
                      border: `1.5px solid ${done ? '#86EFAC' : available && !done ? '#D1D5DB' : '#F3F4F6'}`,
                      borderRadius: 14,
                      padding: 14,
                      marginBottom: 8,
                      cursor: available && mod.routeIdx ? 'pointer' : 'default',
                      opacity: !available ? 0.6 : 1,
                    }}
                  >
                    <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                      <div style={{ width: 40, height: 40, borderRadius: 10, background: done ? '#D8F3DC' : '#F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>
                        {!available ? '🔒' : mod.icon}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <p style={{ fontWeight: 600, fontSize: 14, color: '#111827' }}>{mod.title}</p>
                          {done && <span style={{ fontSize: 12, fontWeight: 600, color: '#15803D', background: '#D8F3DC', padding: '3px 8px', borderRadius: 99 }}>✓ Done</span>}
                          {available && !done && mod.routeIdx && <span style={{ fontSize: 12, fontWeight: 700, color: 'white', background: '#1B4332', padding: '4px 12px', borderRadius: 99 }}>Start</span>}
                        </div>
                        <p style={{ fontSize: 12, color: '#9CA3AF', marginTop: 2 }}>Module {i + 1 + (tier.num - 1) * 2} · {mod.activities} activities · {mod.duration}</p>
                        <div style={{ display: 'flex', gap: 6, marginTop: 6, flexWrap: 'wrap' }}>
                          <span style={{ background: '#D8F3DC', color: '#14532D', padding: '2px 8px', borderRadius: 99, fontSize: 11, fontWeight: 600 }}>{mod.bloom}</span>
                          <span style={{ background: '#BFDBFE', color: '#1E3A8A', padding: '2px 8px', borderRadius: 99, fontSize: 11, fontWeight: 600 }}>{mod.theory}</span>
                        </div>
                        <p style={{ fontSize: 11, color: available ? '#22C55E' : '#9CA3AF', marginTop: 4 }}>
                          ● Scaffolding: {available ? 'ON — hints visible' : 'OFF — no hints'}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}

        {/* Negotiation Scenarios section */}
        <div style={{ background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: 14, padding: 14, marginBottom: 8 }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: '#92400E', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>Activities</p>
          <p style={{ fontSize: 16, fontWeight: 800, color: '#111827', marginBottom: 2 }}>Negotiation Scenarios</p>
          <p style={{ fontSize: 13, color: '#9CA3AF', marginBottom: 12 }}>Practice real flatting conflict conversations</p>
          {NEGOTIATION_SCENARIOS.map(s => (
            <div key={s.id} onClick={() => navigate(s.route)} style={{ background: 'white', border: '1px solid #E5E7EB', borderRadius: 12, padding: 14, marginBottom: 8, cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ fontWeight: 600, fontSize: 14, color: '#111827', marginBottom: 2 }}>{s.title}</p>
                <p style={{ fontSize: 12, color: '#9CA3AF', marginBottom: 6 }}>{s.subtitle}</p>
                <div style={{ display: 'flex', gap: 6 }}>
                  <span style={{ background: '#FBBF24', color: '#78350F', padding: '2px 8px', borderRadius: 99, fontSize: 11, fontWeight: 600 }}>Kolb: Active Experimentation</span>
                </div>
                <p style={{ fontSize: 11, color: '#9CA3AF', marginTop: 4 }}>3 decision rounds · iMessage-style chat</p>
              </div>
              <span style={{ color: '#D1D5DB', fontSize: 20 }}>›</span>
            </div>
          ))}
        </div>

        {/* Spot the Mistake section */}
        <div style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: 14, padding: 14, marginBottom: 20 }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: '#1E3A8A', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>Activities</p>
          <p style={{ fontSize: 16, fontWeight: 800, color: '#111827', marginBottom: 2 }}>Spot the Mistake</p>
          <p style={{ fontSize: 13, color: '#9CA3AF', marginBottom: 12 }}>Find errors in student budgets</p>
          {SPOT_MISTAKES.map(s => (
            <div key={s.id} onClick={() => navigate(s.route)} style={{ background: 'white', border: '1px solid #E5E7EB', borderRadius: 12, padding: 14, marginBottom: 8, cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ fontWeight: 600, fontSize: 14, color: '#111827', marginBottom: 2 }}>{s.title}</p>
                <p style={{ fontSize: 12, color: '#9CA3AF', marginBottom: 6 }}>{s.subtitle}</p>
                <div style={{ display: 'flex', gap: 6 }}>
                  <span style={{ background: '#D8F3DC', color: '#14532D', padding: '2px 8px', borderRadius: 99, fontSize: 11, fontWeight: 600 }}>Bloom: Analyse</span>
                </div>
                <p style={{ fontSize: 11, color: '#9CA3AF', marginTop: 4 }}>3 mistakes to find · tappable document</p>
              </div>
              <span style={{ color: '#D1D5DB', fontSize: 20 }}>›</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
