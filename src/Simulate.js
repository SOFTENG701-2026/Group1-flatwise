import React, { useState } from 'react';

const EVENTS = [
  {
    week: 1,
    description: 'Your textbooks cost $120 more than expected.',
    amount: -120,
    choices: null,
    type: 'fixed',
  },
  {
    week: 1,
    description: 'Bulk buy invitation — join the flat grocery co-op?',
    amount: null,
    choices: [
      { label: 'Join the bulk buy ($45)', cost: -45, happiness: +5, wisdom: +8 },
      { label: 'Buy your own as usual', cost: 0, happiness: 0, wisdom: +2 },
    ],
    type: 'choice',
  },
  {
    week: 2,
    description: "Friend's birthday — group dinner invitation.",
    amount: null,
    choices: [
      { label: 'Go to the $40 dinner', cost: -40, happiness: +15, wisdom: +5 },
      { label: 'Suggest a $15 picnic instead', cost: -15, happiness: +10, wisdom: +10 },
      { label: 'Skip it', cost: 0, happiness: -5, wisdom: +3 },
    ],
    type: 'choice',
  },
  {
    week: 3,
    description: 'Power bill arrived — winter heaters pushed it up. Your share: $104.',
    amount: -104,
    choices: null,
    type: 'fixed',
    bias: 'optimism_bias',
  },
  {
    week: 3,
    description: 'You spot something on Wishlist — limited sale.',
    amount: null,
    choices: [
      { label: 'Buy it now ($55)', cost: -55, happiness: +20, wisdom: -5 },
      { label: 'Wishlist it — check back next month', cost: 0, happiness: 0, wisdom: +12 },
    ],
    type: 'choice',
  },
  {
    week: 4,
    description: 'Your flatmate offers you extra work shifts.',
    amount: null,
    choices: [
      { label: 'Pick up an extra shift (+$85)', cost: +85, happiness: -5, wisdom: +8 },
      { label: 'Rest — you need it', cost: 0, happiness: +10, wisdom: +5 },
    ],
    type: 'choice',
  },
  {
    week: 4,
    description: 'Suggest cooking together to split ingredients.',
    amount: null,
    choices: [
      { label: 'Cook together ($8 each)', cost: -8, happiness: +15, wisdom: +10 },
      { label: 'Order takeaway ($22)', cost: -22, happiness: +8, wisdom: -3 },
    ],
    type: 'choice',
  },
];

const START_MONEY = 1800;

export default function Simulate() {
  const [phase, setPhase] = useState('intro'); // intro | playing | results
  const [eventIdx, setEventIdx] = useState(0);
  const [money, setMoney] = useState(START_MONEY);
  const [happiness, setHappiness] = useState(50);
  const [wisdom, setWisdom] = useState(0);
  const [log, setLog] = useState([]);

  const event = EVENTS[eventIdx];

  const handleFixed = () => {
    const e = event;
    setMoney(m => m + e.amount);
    setLog(l => [...l, { week: `Week ${e.week}`, label: e.description, delta: e.amount }]);
    next();
  };

  const handleChoice = (choice) => {
    setMoney(m => m + choice.cost);
    setHappiness(h => Math.min(100, Math.max(0, h + (choice.happiness || 0))));
    setWisdom(w => w + (choice.wisdom || 0));
    setLog(l => [...l, { week: `Week ${event.week}`, label: choice.label, delta: choice.cost }]);
    next();
  };

  const next = () => {
    if (eventIdx + 1 >= EVENTS.length) {
      setPhase('results');
    } else {
      setEventIdx(i => i + 1);
    }
  };

  const restart = () => {
    setPhase('intro');
    setEventIdx(0);
    setMoney(START_MONEY);
    setHappiness(50);
    setWisdom(0);
    setLog([]);
  };

  if (phase === 'intro') return (
    <div style={{ minHeight: '100vh', background: '#F9FAFB', paddingBottom: 80 }}>
      <div style={{ background: '#1B4332', padding: '52px 20px 20px' }}>
        <h1 style={{ color: 'white', fontSize: 22, fontWeight: 800 }}>Budget Simulator</h1>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13, marginTop: 4 }}>Practice financial decisions in a safe, fictional semester scenario.</p>
      </div>
      <div style={{ padding: 20 }}>
        <div style={{ background: 'white', borderRadius: 16, padding: 16, border: '1px solid #E5E7EB' }}>
          <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', marginBottom: 14 }}>
            <div style={{ width: 48, height: 48, background: '#F3F4F6', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0 }}>🎮</div>
            <div>
              <p style={{ fontWeight: 700, fontSize: 16, color: '#111827', marginBottom: 2 }}>Semester Kickoff</p>
              <p style={{ fontSize: 13, color: '#9CA3AF' }}>4 weeks · $450/week income · {EVENTS.length} events</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 6, marginBottom: 14, flexWrap: 'wrap' }}>
            <span style={{ background: '#D8F3DC', color: '#14532D', padding: '3px 10px', borderRadius: 99, fontSize: 12, fontWeight: 600 }}>Kolb: full cycle</span>
            <span style={{ background: '#FECACA', color: '#991B1B', padding: '3px 10px', borderRadius: 99, fontSize: 12, fontWeight: 600 }}>Cognitivism: bias surfacing</span>
          </div>
          <p style={{ fontSize: 13, color: '#6B7280', lineHeight: 1.6, fontStyle: 'italic', background: '#F9FAFB', borderRadius: 10, padding: 12 }}>
            Situated Learning — you face realistic financial decisions that first-year students encounter, in a consequence-free environment.
          </p>
        </div>
        <button
          onClick={() => setPhase('playing')}
          style={{ width: '100%', background: '#1B4332', color: 'white', border: 'none', borderRadius: 12, padding: '14px 0', fontSize: 15, fontWeight: 700, cursor: 'pointer', marginTop: 16 }}
        >
          Start simulation →
        </button>
      </div>
    </div>
  );

  if (phase === 'results') {
    const score = money >= 1600 ? 'Strong budgeting — you planned ahead! 💚'
      : money >= 1400 ? 'Good effort — a few unexpected hits.'
      : 'Tough semester — common for first years.';
    return (
      <div style={{ minHeight: '100vh', background: '#F9FAFB', paddingBottom: 80 }}>
        <div style={{ background: '#1B4332', borderRadius: '0 0 20px 20px', padding: '52px 20px 24px', textAlign: 'center', marginBottom: 16 }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>🏆</div>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13, marginBottom: 4 }}>Semester complete!</p>
          <p style={{ color: 'white', fontSize: 16, fontWeight: 700, marginBottom: 8 }}>Flat Budget Score</p>
          <p style={{ color: '#86EFAC', fontSize: 36, fontWeight: 900 }}>${money.toLocaleString()} remaining</p>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13, marginTop: 4 }}>{score}</p>
        </div>

        <div style={{ padding: '0 16px' }}>
          <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
            {[
              { icon: '$', label: 'Left over', value: `$${money.toLocaleString()}` },
              { icon: '♥', label: 'Happiness', value: `${happiness}%` },
              { icon: '◎', label: 'Wisdom', value: wisdom },
            ].map((s, i) => (
              <div key={i} style={{ flex: 1, background: 'white', border: '1px solid #E5E7EB', borderRadius: 14, padding: '12px 8px', textAlign: 'center' }}>
                <p style={{ fontSize: 20, color: i === 1 ? '#E11D48' : i === 2 ? '#7C3AED' : '#1B4332', marginBottom: 4 }}>{s.icon}</p>
                <p style={{ fontWeight: 800, fontSize: 18, color: '#111827' }}>{s.value}</p>
                <p style={{ fontSize: 11, color: '#9CA3AF' }}>{s.label}</p>
              </div>
            ))}
          </div>

          <div style={{ background: 'white', border: '1px solid #E5E7EB', borderRadius: 16, padding: 16, marginBottom: 16 }}>
            <p style={{ fontWeight: 700, fontSize: 14, color: '#111827', marginBottom: 12 }}>Your decisions</p>
            {log.map((l, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', paddingBottom: 8, marginBottom: 8, borderBottom: i < log.length - 1 ? '1px solid #F3F4F6' : 'none' }}>
                <div>
                  <p style={{ fontSize: 11, color: '#9CA3AF', marginBottom: 2 }}>{l.week}</p>
                  <p style={{ fontSize: 13, color: '#374151', maxWidth: 220 }}>{l.label}</p>
                </div>
                {l.delta !== 0 && (
                  <span style={{ fontSize: 13, fontWeight: 700, color: l.delta > 0 ? '#15803D' : '#EF4444', flexShrink: 0 }}>
                    {l.delta > 0 ? '+' : ''}{l.delta !== null ? `$${l.delta}` : ''}
                  </span>
                )}
              </div>
            ))}
          </div>

          <button onClick={restart} style={{ width: '100%', background: 'white', color: '#1B4332', border: '1.5px solid #1B4332', borderRadius: 12, padding: '13px 0', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>
            ↺ Try again
          </button>
        </div>
      </div>
    );
  }

  // Playing
  const moneyPct = Math.min(100, (money / START_MONEY) * 100);
  const hapPct = happiness;

  return (
    <div style={{ minHeight: '100vh', background: '#F9FAFB', paddingBottom: 80 }}>
      <div style={{ background: '#1B4332', padding: '52px 20px 16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13 }}>Semester Kickoff</p>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13 }}>Event {eventIdx + 1} of {EVENTS.length}</p>
        </div>

        {/* Progress dots */}
        <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 16 }}>
          {EVENTS.map((_, i) => (
            <div key={i} style={{
              width: i === eventIdx ? 24 : 8,
              height: 8,
              borderRadius: 99,
              background: i < eventIdx ? '#52B788' : i === eventIdx ? 'white' : 'rgba(255,255,255,0.25)',
              transition: 'all 0.2s',
            }} />
          ))}
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', gap: 10 }}>
          <div style={{ flex: 1, background: 'rgba(255,255,255,0.1)', borderRadius: 12, padding: '10px 12px' }}>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 11 }}>$</p>
            <p style={{ color: 'white', fontWeight: 800, fontSize: 20 }}>${money.toLocaleString()}</p>
            <div style={{ height: 3, background: 'rgba(255,255,255,0.2)', borderRadius: 99, marginTop: 6 }}>
              <div style={{ height: '100%', width: `${moneyPct}%`, background: '#52B788', borderRadius: 99 }} />
            </div>
          </div>
          <div style={{ flex: 1, background: 'rgba(255,255,255,0.1)', borderRadius: 12, padding: '10px 12px' }}>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 11 }}>♥</p>
            <p style={{ color: 'white', fontWeight: 800, fontSize: 20 }}>{happiness}%</p>
            <div style={{ height: 3, background: 'rgba(255,255,255,0.2)', borderRadius: 99, marginTop: 6 }}>
              <div style={{ height: '100%', width: `${hapPct}%`, background: '#FB7185', borderRadius: 99 }} />
            </div>
          </div>
          <div style={{ flex: 1, background: 'rgba(255,255,255,0.1)', borderRadius: 12, padding: '10px 12px' }}>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 11 }}>◎</p>
            <p style={{ color: 'white', fontWeight: 800, fontSize: 20 }}>{wisdom}</p>
            <div style={{ height: 3, background: 'rgba(255,255,255,0.2)', borderRadius: 99, marginTop: 6 }}>
              <div style={{ height: '100%', width: `${Math.min(100, wisdom * 2)}%`, background: '#A78BFA', borderRadius: 99 }} />
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: 20 }}>
        <div style={{ background: 'white', border: '1px solid #E5E7EB', borderRadius: 16, padding: 16, marginBottom: 16 }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 8 }}>Week {event.week}</p>
          <p style={{ fontSize: 16, color: '#111827', lineHeight: 1.5, marginBottom: event.amount ? 12 : 0 }}>{event.description}</p>
          {event.amount && (
            <p style={{ fontSize: 28, fontWeight: 900, color: event.amount > 0 ? '#16A34A' : '#EF4444' }}>
              {event.amount > 0 ? '+' : ''}${event.amount}
            </p>
          )}
        </div>

        {event.type === 'fixed' && (
          <button onClick={handleFixed} style={{ width: '100%', background: '#1B4332', color: 'white', border: 'none', borderRadius: 12, padding: '14px 0', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>
            Pay expense →
          </button>
        )}

        {event.type === 'choice' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {event.choices.map((choice, i) => (
              <button
                key={i}
                onClick={() => handleChoice(choice)}
                style={{ background: 'white', border: '1.5px solid #E5E7EB', borderRadius: 14, padding: '14px 16px', textAlign: 'left', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              >
                <span style={{ fontSize: 14, color: '#111827', fontWeight: 500 }}>{choice.label}</span>
                {choice.cost !== 0 && (
                  <span style={{ fontSize: 14, fontWeight: 700, color: choice.cost > 0 ? '#16A34A' : '#EF4444', flexShrink: 0, marginLeft: 8 }}>
                    {choice.cost > 0 ? '+' : ''}${choice.cost}
                  </span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
