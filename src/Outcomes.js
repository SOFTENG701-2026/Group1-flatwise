import React from 'react';
import { useProgress } from '../lib/useProgress';

const LEARNING_OUTCOMES = [
  {
    num: 1,
    verb: 'Identify',
    verbColor: '#22C55E',
    description: 'the income and expense structure of a flatting budget',
    tags: ['income expenses', 'needs wants basics'],
    modules: ['module1', 'module2'],
  },
  {
    num: 2,
    verb: 'Calculate',
    verbColor: '#3B82F6',
    description: 'fair shares of fixed and variable shared costs',
    tags: ['splitting bills'],
    modules: ['module2', 'module3'],
  },
  {
    num: 3,
    verb: 'Predict',
    verbColor: '#8B5CF6',
    description: 'and forecast variable expenses across seasons',
    tags: ['variable expenses', 'variable income'],
    modules: ['module3', 'module4'],
  },
  {
    num: 4,
    verb: 'Reflect',
    verbColor: '#F59E0B',
    description: 'on mismatches between intended and actual spending',
    tags: ['variable expenses', 'flatmate conflict'],
    modules: ['module4', 'module5'],
  },
  {
    num: 5,
    verb: 'Recognise',
    verbColor: '#EF4444',
    description: 'at least one cognitive bias in their own financial decisions',
    tags: ['variable expenses', 'variable income', 'flatmate conflict'],
    modules: ['module5', 'module6'],
  },
];

const NUM_COLORS = ['#22C55E', '#3B82F6', '#8B5CF6', '#F59E0B', '#EF4444'];

export default function Outcomes() {
  const { progress } = useProgress();
  const completed = progress.completedModules || [];

  return (
    <div style={{ minHeight: '100vh', background: '#F9FAFB', paddingBottom: 80 }}>
      <div style={{ background: '#1B4332', padding: '52px 20px 20px' }}>
        <h1 style={{ color: 'white', fontSize: 22, fontWeight: 800 }}>Learning Outcomes</h1>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13, marginTop: 4, textDecoration: 'underline', cursor: 'pointer' }}>
          Aligned to Bloom's Revised Taxonomy (Anderson & Krathwohl, 2001)
        </p>
      </div>

      <div style={{ padding: 16 }}>
        {LEARNING_OUTCOMES.map((o, i) => {
          const matchedModules = o.modules.filter(m => completed.includes(m));
          const pct = Math.round((matchedModules.length / o.modules.length) * 100);
          const status = pct === 100 ? 'Achieved' : pct > 0 ? 'In progress' : 'Not started';
          const statusColor = pct === 100 ? '#16A34A' : pct > 0 ? '#D97706' : '#9CA3AF';

          return (
            <div key={i} style={{ background: 'white', border: '1px solid #E5E7EB', borderRadius: 16, padding: 16, marginBottom: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', flex: 1 }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: NUM_COLORS[i], display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: 13, flexShrink: 0 }}>
                    {o.num}
                  </div>
                  <p style={{ fontSize: 15, color: '#111827', lineHeight: 1.5 }}>
                    <span style={{ color: o.verbColor, fontWeight: 700 }}>{o.verb}</span>
                    {' '}{o.description}
                  </p>
                </div>
                <span style={{ fontSize: 12, color: statusColor, fontWeight: 600, flexShrink: 0, marginLeft: 8 }}>{status}</span>
              </div>

              <div style={{ marginBottom: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: 12, color: '#9CA3AF' }}>Progress</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: '#374151' }}>{pct}%</span>
                </div>
                <div style={{ height: 5, background: '#F3F4F6', borderRadius: 99, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${pct}%`, background: o.verbColor, borderRadius: 99, transition: 'width 0.4s ease' }} />
                </div>
              </div>

              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {o.tags.map((tag, j) => (
                  <span key={j} style={{ background: '#F3F4F6', color: '#6B7280', padding: '3px 8px', borderRadius: 6, fontSize: 11 }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          );
        })}

        <div style={{ background: '#F0FAF4', border: '1px solid #86EFAC', borderRadius: 14, padding: 14, marginTop: 4 }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: '#15803D', marginBottom: 4 }}>About this screen</p>
          <p style={{ fontSize: 12, color: '#374151', lineHeight: 1.6, marginBottom: 6 }}>
            Each outcome is tied to specific modules and quizzes. Complete the relevant modules to achieve each outcome. Progress bars reflect how many related modules you've completed.
          </p>
          <p style={{ fontSize: 12, color: '#6B7280', fontStyle: 'italic' }}>
            Bloom verbs used: Identify (Remember), Calculate & Predict (Apply), Reflect (Analyse), Recognise (Evaluate)
          </p>
        </div>
      </div>
    </div>
  );
}
