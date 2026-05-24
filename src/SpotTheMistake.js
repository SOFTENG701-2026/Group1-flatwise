import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const BUDGETS = [
  {
    id: 'alex-march',
    title: "Alex's March Budget 📋",
    student: 'Alex',
    month: 'March',
    note: '✓ Bond paid March 1st',
    sections: [
      {
        heading: 'INCOME',
        items: [
          { id: 'studylink', label: 'StudyLink payment', amount: '$385/week', correct: true },
          { id: 'work', label: 'Casual work (avg)', amount: '$180/week', correct: true },
          { id: 'total-income', label: 'Total weekly income', amount: '$540/week', correct: false,
            mistakeNum: 1, errorType: 'Arithmetic error',
            explanation: '385 + 180 = $565, not $540. This is a simple addition mistake that means Alex thinks they have $25/week less than they actually do — which could cause unnecessary stress or missed savings opportunities.',
            hasChart: false },
        ]
      },
      {
        heading: 'FIXED COSTS',
        items: [
          { id: 'rent', label: 'Rent (share of 4)', amount: '$215/week', correct: true },
          { id: 'internet', label: 'Internet (share of 4)', amount: '$22.50/week', correct: true },
          { id: 'subscriptions', label: 'Subscriptions (Spotify, Netflix split)', amount: '$8/week', correct: true },
        ]
      },
      {
        heading: 'VARIABLE COSTS',
        items: [
          { id: 'power', label: 'Power (winter estimate)', amount: '$18/week', correct: false,
            mistakeNum: 2, errorType: 'Seasonal cost underestimate',
            explanation: 'Winter power for a 4-person NZ flat typically runs $30–45/week shared. $18/week is a serious underestimate — likely based on summer usage. This kind of optimism bias with variable costs leads to budget blowouts when the real bills arrive.',
            hasChart: true, chartActual: 37, chartBudgeted: 18 },
          { id: 'groceries', label: 'Groceries', amount: '$90/week', correct: true },
          { id: 'transport', label: 'Transport', amount: '$25/week', correct: true },
        ]
      },
      {
        heading: 'SAVINGS',
        items: [
          { id: 'bond', label: 'Bond savings goal', amount: '$50/week', correct: false,
            mistakeNum: 3, errorType: 'Redundant expense',
            explanation: 'The note at the top says "Bond paid March 1st ✓" — but Alex is still budgeting $50/week to save for it. This is a common cognitive error: keeping old budget lines even after the goal is achieved. That\'s $200/month going nowhere.' ,
            hasChart: false },
        ]
      },
    ],
  },
  {
    id: 'sam-july',
    title: "Sam's July Budget 📋",
    student: 'Sam',
    month: 'July',
    note: '⚠ Starting new flat July 1',
    sections: [
      {
        heading: 'INCOME',
        items: [
          { id: 'studylink2', label: 'StudyLink payment', amount: '$385/week', correct: true },
          { id: 'work2', label: 'Part-time café work', amount: '$220/week', correct: true },
          { id: 'total2', label: 'Total weekly income', amount: '$605/week', correct: true },
        ]
      },
      {
        heading: 'FIXED COSTS',
        items: [
          { id: 'rent2', label: 'Rent (share of 3)', amount: '$290/week', correct: true },
          { id: 'internet2', label: 'Internet', amount: '$25/week', correct: true },
          { id: 'gym', label: 'Gym membership', amount: '$15/week', correct: true },
        ]
      },
      {
        heading: 'VARIABLE COSTS',
        items: [
          { id: 'power2', label: 'Power (July estimate)', amount: '$12/week', correct: false,
            mistakeNum: 1, errorType: 'Seasonal cost underestimate',
            explanation: 'July is mid-winter in NZ. A 3-person flat heating daily typically costs $35–50/week for power. $12/week is dangerously optimistic — Sam is likely basing this on a mild-weather estimate.',
            hasChart: true, chartActual: 42, chartBudgeted: 12 },
          { id: 'groceries2', label: 'Groceries', amount: '$75/week', correct: true },
          { id: 'transport2', label: 'Transport', amount: '$20/week', correct: true },
        ]
      },
      {
        heading: 'SAVINGS',
        items: [
          { id: 'emergency', label: 'Emergency fund', amount: '$30/week', correct: true },
          { id: 'split', label: 'Flat bond split (3 ways)', amount: '$80/week', correct: false,
            mistakeNum: 2, errorType: 'Wrong split calculation',
            explanation: 'The note says starting a new flat July 1 — bond is typically 4 weeks rent. Rent is $290/week × 3 = $870/week total flat cost. Bond = $870 × 4 = $3,480 ÷ 3 flatmates = $1,160 each. At $80/week that takes 14.5 weeks — but bond is due on move-in day. This is a timing mistake, not a savings amount mistake.',
            hasChart: false },
          { id: 'textbooks', label: 'Textbooks (once-off)', amount: '$45/week', correct: false,
            mistakeNum: 3, errorType: 'Recurring vs one-off error',
            explanation: 'Textbooks are a one-off semester cost, not a weekly recurring expense. Listing them as $45/week would mean $2,340/year on textbooks — about 10× the actual cost. This is a very common budgeting error: treating one-off costs as ongoing.',
            hasChart: false },
        ]
      },
    ],
  },
];

export default function SpotTheMistake() {
  const navigate = useNavigate();
  const { id } = useParams();
  const budget = BUDGETS.find(b => b.id === id) || BUDGETS[0];

  const mistakes = budget.sections.flatMap(s => s.items).filter(i => !i.correct);
  const mistakeIds = new Set(mistakes.map(m => m.id));

  const [found, setFound] = useState(new Set());
  const [wrongTaps, setWrongTaps] = useState(0);
  const [flash, setFlash] = useState(null); // id of flashing item
  const [sheet, setSheet] = useState(null); // mistake item showing bottom sheet
  const [phase, setPhase] = useState('activity'); // activity | results

  const handleTap = (item) => {
    if (phase !== 'activity') return;
    if (found.has(item.id)) return;

    if (!item.correct) {
      setFound(prev => new Set([...prev, item.id]));
      setSheet(item);
    } else {
      setWrongTaps(w => w + 1);
      setFlash(item.id);
      setTimeout(() => setFlash(null), 600);
    }
  };

  const dismissSheet = () => {
    setSheet(null);
    if (found.size >= mistakes.length) {
      setTimeout(() => setPhase('results'), 300);
    }
  };

  const score = Math.max(0, 100 - wrongTaps * 10);

  if (phase === 'results') return (
    <div style={{ minHeight: '100vh', background: '#F9FAFB', padding: 20, paddingBottom: 100 }}>
      <button onClick={() => navigate('/learn')} style={{ background: 'none', border: 'none', color: '#6B7280', fontSize: 13, cursor: 'pointer', padding: '0 0 16px', display: 'block' }}>← Learn</button>
      <div style={{ background: '#1B4332', borderRadius: 20, padding: 20, marginBottom: 16, textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 8 }}>🎉</div>
        <h2 style={{ color: 'white', fontSize: 22, fontWeight: 800, marginBottom: 4 }}>All mistakes found!</h2>
        <div style={{ background: 'rgba(255,255,255,0.15)', borderRadius: 99, padding: '6px 20px', display: 'inline-block', marginTop: 8 }}>
          <span style={{ color: 'white', fontWeight: 800, fontSize: 28 }}>{score}</span>
          <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14 }}> / 100</span>
        </div>
        {wrongTaps > 0 && <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12, marginTop: 4 }}>−{wrongTaps * 10} pts from {wrongTaps} wrong tap{wrongTaps > 1 ? 's' : ''}</p>}
      </div>

      <div style={{ background: 'white', borderRadius: 16, padding: 16, marginBottom: 14, border: '1px solid #E5E7EB' }}>
        <p style={{ fontWeight: 700, fontSize: 14, marginBottom: 12 }}>What these mistakes teach you</p>
        {mistakes.map((m, i) => (
          <div key={i} style={{ borderLeft: '3px solid #52B788', paddingLeft: 12, marginBottom: 12 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: '#111827', marginBottom: 3 }}>{m.errorType}</p>
            <p style={{ fontSize: 12, color: '#6B7280', lineHeight: 1.5 }}>{m.explanation.slice(0, 120)}...</p>
          </div>
        ))}
      </div>

      <div style={{ background: '#FFFBEB', border: '1.5px solid #FDE68A', borderRadius: 14, padding: 14, marginBottom: 20 }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: '#92400E', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 }}>Cognitive trap detected</p>
        <p style={{ fontSize: 13, color: '#78350F', lineHeight: 1.6 }}><strong>Optimism bias</strong> — we naturally underestimate future costs because they feel abstract. Alex's power estimate is a classic example of this universal human tendency.</p>
      </div>

      <div style={{ display: 'flex', gap: 10 }}>
        <button className="btn-secondary" style={{ flex: 1 }} onClick={() => { setFound(new Set()); setWrongTaps(0); setPhase('activity'); }}>Try another</button>
        <button className="btn-primary" style={{ flex: 1 }} onClick={() => navigate('/learn')}>Continue →</button>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: '#F9FAFB', paddingBottom: 100 }}>
      {/* Header */}
      <div style={{ background: '#1B4332', padding: '48px 20px 16px' }}>
        <button onClick={() => navigate('/learn')} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.7)', fontSize: 13, cursor: 'pointer', padding: 0, marginBottom: 10 }}>← Learn</button>
        <h1 style={{ color: 'white', fontSize: 18, fontWeight: 700 }}>Spot the Mistake</h1>
        <div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
          <span style={{ background: '#86EFAC', color: '#14532D', padding: '3px 10px', borderRadius: 99, fontSize: 11, fontWeight: 700 }}>Bloom: Analyse</span>
          <span style={{ background: '#BFDBFE', color: '#1E3A8A', padding: '3px 10px', borderRadius: 99, fontSize: 11, fontWeight: 700 }}>Cognitivism: Error detection</span>
        </div>
      </div>

      <div style={{ padding: '16px 16px 0' }}>
        {/* Instruction card */}
        <div style={{ background: 'white', borderRadius: 14, padding: 14, marginBottom: 14, border: '1px solid #E5E7EB', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
          <div style={{ width: 36, height: 36, background: '#F0FAF4', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>🔍</div>
          <div style={{ flex: 1 }}>
            <p style={{ fontWeight: 700, fontSize: 14, color: '#111827', marginBottom: 2 }}>Find the {mistakes.length} mistakes in this budget</p>
            <p style={{ fontSize: 12, color: '#9CA3AF' }}>Tap anything that looks wrong. Think carefully — some errors are subtle.</p>
          </div>
          <div style={{ background: found.size === mistakes.length ? '#D8F3DC' : '#F3F4F6', borderRadius: 99, padding: '4px 12px', flexShrink: 0 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: found.size === mistakes.length ? '#15803D' : '#6B7280' }}>{found.size}/{mistakes.length}</span>
          </div>
        </div>

        {/* Budget document */}
        <div style={{
          background: '#FEFCE8',
          borderRadius: 16,
          border: '1px solid #FDE68A',
          padding: 16,
          fontFamily: 'Georgia, serif',
          position: 'relative',
        }}>
          {/* Note */}
          <div style={{ background: '#FEF9C3', border: '1px solid #FDE68A', borderRadius: 8, padding: '6px 10px', marginBottom: 12, fontSize: 12, color: '#92400E' }}>
            {budget.note}
          </div>

          {/* Title */}
          <h2 style={{ fontSize: 18, fontWeight: 800, color: '#1B4332', marginBottom: 14, fontFamily: 'cursive, Georgia' }}>
            {budget.title}
          </h2>

          {/* Found all banner */}
          {found.size === mistakes.length && (
            <div style={{ background: '#16A34A', color: 'white', borderRadius: 10, padding: '8px 14px', textAlign: 'center', fontWeight: 700, fontSize: 14, marginBottom: 12 }}>
              ✓ All mistakes found!
            </div>
          )}

          {budget.sections.map((section, si) => (
            <div key={si} style={{ marginBottom: 14 }}>
              <p style={{ fontSize: 11, fontWeight: 800, color: '#6B7280', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 6, borderBottom: '1px solid #E5E7EB', paddingBottom: 4 }}>
                {section.heading}
              </p>
              {section.items.map((item) => {
                const isFound = found.has(item.id);
                const isFlashing = flash === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleTap(item)}
                    style={{
                      width: '100%',
                      background: isFound ? '#FEF3C7' : isFlashing ? '#FEE2E2' : 'transparent',
                      border: isFound ? '1px solid #F59E0B' : '1px solid transparent',
                      borderRadius: 8,
                      padding: '7px 8px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.15s',
                      animation: isFlashing ? 'shake 0.3s ease' : 'none',
                      marginBottom: 2,
                    }}
                  >
                    <span style={{ fontSize: 13, color: '#374151', textAlign: 'left' }}>
                      {isFound && <span style={{ marginRight: 6 }}>⚠️</span>}
                      {item.label}
                    </span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: isFound ? '#D97706' : '#111827', fontFamily: 'monospace' }}>
                      {item.amount}
                    </span>
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom sheet */}
      {sheet && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 200, display: 'flex', alignItems: 'flex-end' }} onClick={dismissSheet}>
          <div style={{ background: 'white', borderRadius: '20px 20px 0 0', padding: 20, width: '100%', maxHeight: '70vh', overflowY: 'auto' }} onClick={e => e.stopPropagation()}>
            <div style={{ width: 36, height: 4, background: '#E5E7EB', borderRadius: 99, margin: '0 auto 16px' }} />
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 12 }}>
              <span style={{ background: '#FEF3C7', borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>⚠️</span>
              <div>
                <p style={{ fontSize: 11, color: '#9CA3AF', fontWeight: 600 }}>Mistake {sheet.mistakeNum} of {mistakes.length} found 🎯</p>
                <p style={{ fontSize: 15, fontWeight: 800, color: '#111827' }}>{sheet.errorType}</p>
              </div>
            </div>
            <p style={{ fontSize: 13, color: '#374151', lineHeight: 1.7, marginBottom: 14 }}>{sheet.explanation}</p>

            {sheet.hasChart && (
              <div style={{ background: '#F9FAFB', borderRadius: 12, padding: 14, marginBottom: 14 }}>
                <p style={{ fontSize: 12, color: '#6B7280', marginBottom: 10, fontWeight: 600 }}>Weekly power cost comparison</p>
                <div style={{ display: 'flex', gap: 16, alignItems: 'flex-end' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ height: Math.round(sheet.chartBudgeted / sheet.chartActual * 80), background: '#EF4444', borderRadius: '4px 4px 0 0', minHeight: 20 }} />
                    <p style={{ fontSize: 11, color: '#374151', marginTop: 4, textAlign: 'center' }}>Alex's budget</p>
                    <p style={{ fontSize: 13, fontWeight: 700, color: '#EF4444', textAlign: 'center' }}>${sheet.chartBudgeted}/wk</p>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ height: 80, background: '#22C55E', borderRadius: '4px 4px 0 0' }} />
                    <p style={{ fontSize: 11, color: '#374151', marginTop: 4, textAlign: 'center' }}>Realistic range</p>
                    <p style={{ fontSize: 13, fontWeight: 700, color: '#22C55E', textAlign: 'center' }}>${sheet.chartActual}/wk avg</p>
                  </div>
                </div>
              </div>
            )}

            <button className="btn-primary" onClick={dismissSheet}>Got it →</button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }
      `}</style>
    </div>
  );
}
