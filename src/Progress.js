import React from 'react';
import { useProgress } from '../lib/useProgress';

const TIERS = [
  { label: 'Tier 1: Foundations', modules: ['module1', 'module2'], icons: ['💰', '🧮'] },
  { label: 'Tier 2: Flat Life',   modules: ['module3', 'module4'], icons: ['⚡', '📊'] },
  { label: 'Tier 3: Full Semester', modules: ['module5', 'module6'], icons: ['📅', '🤝'] },
];

const MODULE_NAMES = {
  module1: 'Income & Fixed Costs',
  module2: 'Splitting Bills Fairly',
  module3: 'Variable & Seasonal Bills',
  module4: 'Variable & Unexpected Costs',
  module5: 'Variable Income & StudyLink',
  module6: 'Flatmate Conflict & Bond Return',
};

function getLevel(xp) {
  if (xp < 100) return { num: 1, name: 'Budget Beginner',    next: 100 };
  if (xp < 300) return { num: 2, name: 'Flat Learner',       next: 300 };
  if (xp < 600) return { num: 3, name: 'Spending Savvy',     next: 600 };
  if (xp < 900) return { num: 4, name: 'Money Wise',         next: 900 };
  return              { num: 5, name: 'Budget Master',        next: null };
}

export default function Progress() {
  const { progress } = useProgress();
  const { xp, completedModules, streak } = progress;
  const level = getLevel(xp);
  const prevXp = [0, 100, 300, 600, 900][level.num - 1] || 0;
  const levelPct = level.next ? Math.round(((xp - prevXp) / (level.next - prevXp)) * 100) : 100;

  return (
    <div style={{ minHeight: '100vh', background: '#F9FAFB', paddingBottom: 80 }}>
      <div style={{ background: '#1B4332', padding: '52px 20px 20px' }}>
        <h1 style={{ color: 'white', fontSize: 22, fontWeight: 800 }}>My Progress</h1>
      </div>

      <div style={{ padding: 16 }}>
        {/* XP / Level card */}
        <div style={{ background: '#1B4332', borderRadius: 20, padding: 20, marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
            <div>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13, marginBottom: 2 }}>Level {level.num} — {level.name}</p>
              <p style={{ color: 'white', fontSize: 36, fontWeight: 900 }}>{xp} XP</p>
            </div>
            <span style={{ fontSize: 32 }}>⭐</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>Level {level.num}</span>
            {level.next && <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>Level {level.num + 1} at {level.next} XP</span>}
          </div>
          <div style={{ height: 8, background: 'rgba(255,255,255,0.2)', borderRadius: 99, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${levelPct}%`, background: '#52B788', borderRadius: 99 }} />
          </div>
        </div>

        {/* Stats row */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
          {[
            { icon: '🔥', value: streak, label: 'Streak' },
            { icon: '📖', value: `${completedModules.length}/6`, label: 'Modules' },
            { icon: '🏆', value: 0, label: 'Biases tracked' },
          ].map((s, i) => (
            <div key={i} style={{ flex: 1, background: 'white', border: '1px solid #E5E7EB', borderRadius: 14, padding: '14px 8px', textAlign: 'center' }}>
              <p style={{ fontSize: 22, marginBottom: 4 }}>{s.icon}</p>
              <p style={{ fontWeight: 800, fontSize: 18, color: '#111827' }}>{s.value}</p>
              <p style={{ fontSize: 11, color: '#9CA3AF' }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Tier progress */}
        {TIERS.map((tier, ti) => {
          const done = tier.modules.filter(m => completedModules.includes(m));
          const locked = ti > 0 && TIERS[ti - 1].modules.some(m => !completedModules.includes(m));
          return (
            <div key={ti} style={{ background: 'white', border: '1px solid #E5E7EB', borderRadius: 16, padding: 14, marginBottom: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <p style={{ fontWeight: 700, fontSize: 14, color: locked ? '#9CA3AF' : '#111827' }}>
                  {locked ? '🔒 ' : ''}{tier.label}
                </p>
                <span style={{ fontSize: 13, color: '#9CA3AF' }}>{done.length}/{tier.modules.length}</span>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                {tier.modules.map((m, mi) => (
                  <div key={mi} style={{ display: 'flex', alignItems: 'center', gap: 6, flex: 1, background: '#F9FAFB', borderRadius: 10, padding: '8px 10px' }}>
                    <span style={{ fontSize: 16 }}>{tier.icons[mi]}</span>
                    <span style={{ fontSize: 12, color: completedModules.includes(m) ? '#15803D' : '#9CA3AF', fontWeight: completedModules.includes(m) ? 600 : 400 }}>
                      {completedModules.includes(m) ? '✓ ' : ''}{MODULE_NAMES[m]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {/* Biases to Watch */}
        <div style={{ background: 'white', border: '1px solid #E5E7EB', borderRadius: 16, padding: 14 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <p style={{ fontWeight: 700, fontSize: 14, color: '#111827' }}>Biases to Watch</p>
            <span style={{ fontSize: 12, color: '#9CA3AF' }}>Cognitivism</span>
          </div>
          <p style={{ fontSize: 13, color: '#9CA3AF', fontStyle: 'italic' }}>
            No biases tracked yet — complete a simulation to detect them.
          </p>
        </div>
      </div>
    </div>
  );
}
