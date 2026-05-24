import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../lib/useProgress';
import { MODULES } from '../lib/data';

const MODULE_ICONS = ['📋', '🧮', '⚡', '⚠️', '🎯'];

export default function Dashboard() {
  const navigate = useNavigate();
  const { progress } = useProgress();
  const { completedModules, xp, streak } = progress;
  const totalXP = MODULES.reduce((s, m) => s + m.xp, 0);


  const getStatus = (mod, idx) => {
    if (completedModules.includes(mod.id)) return 'done';
    if (idx === 0 || completedModules.includes(MODULES[idx - 1].id)) return 'available';
    return 'locked';
  };

  return (
    <div style={{ background: '#F0FAF4', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ background: '#1B4332', padding: '52px 20px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
          <div>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 13, fontWeight: 600, letterSpacing: 0.5 }}>FlatWise</p>
            <h1 style={{ color: 'white', fontSize: 24, fontWeight: 800, marginTop: 2, letterSpacing: -0.5 }}>Hey Alex 👋</h1>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, marginTop: 3 }}>
              {completedModules.length === 0 ? "Let's start learning!" : "Keep that streak going — you're on a roll."}
            </p>
          </div>
          <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#52B788', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: 14 }}>AJ</div>
        </div>

        {/* XP progress card */}
        <div style={{ background: 'rgba(0,0,0,0.2)', borderRadius: 16, padding: 16 }}>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 6 }}>Your progress</p>
          <p style={{ color: 'white', fontSize: 36, fontWeight: 800, letterSpacing: -1, marginBottom: 2 }}>{xp} XP</p>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 12, marginBottom: 10 }}>
            Level {Math.floor(xp / 100) + 1} · {100 - (xp % 100)} XP to next level
          </p>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>Level {Math.floor(xp / 100) + 1}</span>
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>Level {Math.floor(xp / 100) + 2}</span>
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${xp % 100}%` }} />
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginTop: 12 }}>
          {[
            { icon: '🔥', val: streak || 0, label: 'STREAK' },
            { icon: '⭐', val: xp, label: 'XP' },
            { icon: '📚', val: `${completedModules.length}/${MODULES.length}`, label: 'MODULES' },
          ].map(s => (
            <div key={s.label} style={{ background: 'rgba(255,255,255,0.1)', borderRadius: 12, padding: '10px 0', textAlign: 'center' }}>
              <p style={{ fontSize: 20, marginBottom: 2 }}>{s.icon}</p>
              <p style={{ color: 'white', fontWeight: 700, fontSize: 18, lineHeight: 1 }}>{s.val}</p>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 10, marginTop: 3, letterSpacing: 0.5 }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Modules list */}
      <div style={{ padding: '20px 16px 32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <h2 style={{ fontSize: 17, fontWeight: 700, color: '#111827' }}>Modules</h2>
          <span style={{ fontSize: 13, color: '#52B788', fontWeight: 600 }}>See all</span>
        </div>

        {MODULES.map((mod, idx) => {
          const status = getStatus(mod, idx);
          const locked = status === 'locked';
          const done = status === 'done';
          const active = status === 'available' && !done;

          return (
            <div
              key={mod.id}
              onClick={() => !locked && navigate(`/module/${idx + 1}`)}
              style={{
                background: 'white',
                borderRadius: 16,
                border: `1.5px solid ${active ? '#1B4332' : done ? '#86EFAC' : '#E5E7EB'}`,
                padding: '14px 16px',
                marginBottom: 10,
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                cursor: locked ? 'default' : 'pointer',
                opacity: locked ? 0.55 : 1,
                transition: 'all 0.15s',
                boxShadow: active ? '0 0 0 1px #1B4332' : 'none',
              }}
            >
              <div style={{
                width: 46, height: 46, borderRadius: 12, flexShrink: 0,
                background: done ? '#D8F3DC' : locked ? '#F3F4F6' : '#F0FAF4',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22,
              }}>
                {locked ? '🔒' : MODULE_ICONS[idx]}
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: 600, fontSize: 15, color: '#111827', marginBottom: 2, letterSpacing: -0.2 }}>{mod.title}</p>
                <p style={{ fontSize: 13, color: '#9CA3AF' }}>{mod.subtitle}</p>
              </div>
              {done && <span style={{ fontSize: 12, fontWeight: 600, color: '#15803D', background: '#D8F3DC', padding: '5px 10px', borderRadius: 20, flexShrink: 0 }}>✓ Done</span>}
              {active && <span style={{ fontSize: 13, fontWeight: 700, color: 'white', background: '#1B4332', padding: '6px 14px', borderRadius: 20, flexShrink: 0 }}>Go</span>}
              {locked && <span style={{ fontSize: 12, color: '#9CA3AF', flexShrink: 0 }}>🔒 Locked</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
