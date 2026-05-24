import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../lib/useProgress';
import { MODULE2_SCENARIO, MODULE2_QUIZ } from '../lib/data';

export default function Module2() {
  const navigate = useNavigate();
  const { completeModule } = useProgress();
  const [step, setStep] = useState(0); // 0=intro 1=predict 2=reveal 3=quiz 4=complete
  const [guess, setGuess] = useState(165);
  const [reflection, setReflection] = useState('');
  const [quizSelected, setQuizSelected] = useState(null);
  const [quizAnswered, setQuizAnswered] = useState(false);

  const s = MODULE2_SCENARIO;
  const diff = s.actualBill - guess;
  const absDiff = Math.abs(diff);
  const accuracy = absDiff <= 20 ? 'great' : absDiff <= 60 ? 'close' : 'off';
  const currentQ = MODULE2_QUIZ[0];

  const Header = ({ title, activityNum, subtitle }) => (
    <div style={{ background: '#1B4332', padding: '48px 20px 20px' }}>
      <button onClick={() => step === 0 ? navigate('/') : setStep(s => s - 1)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.7)', fontSize: 13, cursor: 'pointer', padding: 0, marginBottom: 14 }}>
        ← {step === 0 ? 'Dashboard' : 'Module 2'}
      </button>
      {activityNum && (
        <>
          <div style={{ display: 'flex', gap: 6, marginBottom: 10 }}>
            {[1,2,3].map(i => (
              <div key={i} style={{ flex: 1, height: 4, borderRadius: 99, background: i < activityNum ? '#52B788' : i === activityNum ? 'white' : 'rgba(255,255,255,0.25)' }} />
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12 }}>← Module 2</span>
            <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12 }}>Activity {activityNum} of 3</span>
          </div>
        </>
      )}
      {title && <p style={{ color: 'white', fontWeight: 700, fontSize: 16, marginTop: 8 }}>{title}</p>}
      {subtitle && <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12, marginTop: 2 }}>{subtitle}</p>}
    </div>
  );

  // INTRO
  if (step === 0) return (
    <div style={{ minHeight: '100vh', background: '#F9FAFB' }}>
      <div style={{ background: '#1B4332', padding: '48px 20px 28px' }}>
        <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.7)', fontSize: 13, cursor: 'pointer', padding: 0, marginBottom: 16 }}>← Dashboard</button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 48, height: 48, background: 'rgba(255,255,255,0.15)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>🧮</div>
          <div>
            <h1 style={{ color: 'white', fontSize: 20, fontWeight: 700 }}>Splitting costs fairly</h1>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13 }}>Module 2 · 3 activities · ~10 min</p>
          </div>
        </div>
      </div>
      <div style={{ padding: 20 }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
          <span className="pill pill-green">Bloom: Apply</span>
          <span className="pill pill-blue">Constructivist scaffolding</span>
        </div>
        <div className="card" style={{ marginBottom: 14 }}>
          <p style={{ fontSize: 14, color: '#374151', lineHeight: 1.7 }}>Not all flat costs split equally — and understanding why is key. This module covers fixed costs, variable costs, and what "fair" really means when four people have different habits and schedules.</p>
        </div>
        <p style={{ fontSize: 12, fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 12 }}>What you'll do</p>
        {[
          { num: 1, text: <><strong>Predict</strong> your flat's power bill for the month</> },
          { num: 2, text: <><strong>Reveal + reflect</strong> — see the actual bill, how close you were, Kolb's cycle strip, then write a reflection</> },
          { num: 3, text: <><strong>Quiz</strong> — apply the proportional splitting concept to a scenario</> },
        ].map(item => (
          <div key={item.num} style={{ display: 'flex', gap: 12, marginBottom: 10 }}>
            <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#1B4332', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{item.num}</div>
            <p style={{ fontSize: 14, color: '#374151', lineHeight: 1.5 }}>{item.text}</p>
          </div>
        ))}
        <div style={{ background: '#F0FAF4', border: '1px solid #86EFAC', borderRadius: 12, padding: 12, marginTop: 12, marginBottom: 20 }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: '#15803D', marginBottom: 3 }}>Vygotsky's ZPD in action</p>
          <p style={{ fontSize: 12, color: '#16A34A' }}>Builds on Module 1. Progresses from known fixed costs to unpredictable variable ones — gradually expanding your zone of proximal development.</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn-secondary" style={{ flex: 1 }} onClick={() => navigate('/')}>← Back</button>
          <button className="btn-primary" style={{ flex: 2 }} onClick={() => setStep(1)}>Start module</button>
        </div>
      </div>
    </div>
  );

  // PREDICT
  if (step === 1) return (
    <div style={{ minHeight: '100vh', background: '#F9FAFB' }}>
      <Header activityNum={1} />
      <div style={{ padding: 20 }}>
        <span className="pill pill-green" style={{ marginBottom: 14, display: 'inline-block' }}>🎯 Predict</span>
        <p style={{ fontSize: 11, fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>Scenario</p>

        <div className="card" style={{ marginBottom: 12 }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 6 }}>🏠 Your flat</p>
          <p style={{ fontSize: 14, color: '#374151', lineHeight: 1.6 }}>
            You share a <strong>3-bed Auckland flat</strong> with {s.flatmates - 1} flatmates. It's <strong>{s.month}</strong> — coldest month. Electric heating running daily, everyone home most days this semester.
          </p>
        </div>

        <div className="card" style={{ marginBottom: 16 }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 10 }}>⚡ Known costs this month</p>
          {Object.entries(s.knownCosts).map(([k, v]) => (
            <div key={k} style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 8, marginBottom: 8, borderBottom: '1px solid #F3F4F6' }}>
              <span style={{ fontSize: 14, color: '#374151', textTransform: 'capitalize' }}>{k} (whole flat)</span>
              <span style={{ fontSize: 14, fontWeight: 700 }}>${v.toLocaleString()}</span>
            </div>
          ))}
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 14, color: '#374151' }}>Power bill</span>
            <span style={{ background: '#FEF3C7', color: '#92400E', padding: '3px 10px', borderRadius: 20, fontSize: 13, fontWeight: 600 }}>? Unknown</span>
          </div>
        </div>

        <h3 style={{ fontSize: 18, fontWeight: 800, color: '#111827', marginBottom: 4 }}>What's your estimate?</h3>
        <p style={{ fontSize: 13, color: '#6B7280', marginBottom: 20, fontStyle: 'italic' }}>No penalty for being wrong — this activates your thinking before the answer is revealed.</p>

        <div className="card" style={{ textAlign: 'center', marginBottom: 16 }}>
          <p style={{ fontSize: 44, fontWeight: 800, color: '#1B4332', marginBottom: 16 }}>${guess}</p>
          <input type="range" min="50" max="400" step="5" value={guess} onChange={e => setGuess(Number(e.target.value))} style={{ width: '100%', accentColor: '#1B4332', marginBottom: 6 }} />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 12, color: '#9CA3AF' }}>$50</span>
            <span style={{ fontSize: 12, color: '#9CA3AF' }}>$400</span>
          </div>
        </div>

        <div style={{ background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: 12, padding: 12, marginBottom: 20, display: 'flex', gap: 8 }}>
          <span>💡</span>
          <p style={{ fontSize: 13, color: '#92400E' }}>Average NZ winter power for a 3-bed flat: <strong>$160–$280/month</strong>. Varies by heating habits and insulation.</p>
        </div>

        <button className="btn-primary" onClick={() => setStep(2)}>Submit my prediction</button>
      </div>
    </div>
  );

  // REVEAL
  if (step === 2) return (
    <div style={{ minHeight: '100vh', background: '#F9FAFB' }}>
      <div style={{ background: '#1B4332', padding: '48px 20px 20px' }}>
        <button onClick={() => setStep(1)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.7)', fontSize: 13, cursor: 'pointer', padding: 0, marginBottom: 14 }}>← Module 2</button>
        <p style={{ color: 'white', fontWeight: 700, fontSize: 16 }}>Activity 2 · Result</p>
      </div>
      <div style={{ padding: 20 }}>
        {/* Result card */}
        <div style={{ border: `1.5px solid ${accuracy === 'great' ? '#22C55E' : '#F59E0B'}`, borderRadius: 16, padding: 16, marginBottom: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <span style={{ fontSize: 20 }}>📊</span>
            <p style={{ fontWeight: 700, fontSize: 15, color: '#111827' }}>
              {accuracy === 'great' ? 'Spot on — great thinking!' : accuracy === 'close' ? 'Close — good thinking!' : `You were $${absDiff} ${diff > 0 ? 'under' : 'over'}`}
            </p>
          </div>
          <p style={{ fontSize: 13, color: '#6B7280', marginBottom: 14, lineHeight: 1.5 }}>
            You guessed <strong>${guess}</strong>, actual was <strong>${s.actualBill}</strong> — ${absDiff} {diff > 0 ? 'under' : 'over'}. Winter heating surprises most new flatters. With {s.flatmates} people home daily, usage adds up fast.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
            {[
              { label: 'YOUR GUESS', val: `$${guess}`, bg: '#FEF3C7', color: '#92400E' },
              { label: 'ACTUAL BILL', val: `$${s.actualBill}`, bg: '#FEE2E2', color: '#991B1B' },
              { label: 'PER PERSON', val: `$${s.perPerson}`, bg: '#D8F3DC', color: '#15803D' },
            ].map(stat => (
              <div key={stat.label} style={{ background: stat.bg, borderRadius: 10, padding: '10px 8px', textAlign: 'center' }}>
                <p style={{ fontSize: 18, fontWeight: 800, color: stat.color }}>{stat.val}</p>
                <p style={{ fontSize: 10, color: stat.color, marginTop: 2, fontWeight: 600 }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Kolb's cycle */}
        <div style={{ background: '#1B4332', borderRadius: 16, padding: 16, marginBottom: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
            <span style={{ fontSize: 14 }}>📊</span>
            <p style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.8)', textTransform: 'uppercase', letterSpacing: 0.5 }}>Kolb's learning cycle</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 8, marginBottom: 12 }}>
            {[
              { label: 'Predict', icon: '🎯', active: false, done: true },
              { label: 'Observe', icon: '👀', active: true, done: false },
              { label: 'Reflect', icon: '🧠', active: false, done: false },
              { label: 'Apply', icon: '⚡', active: false, done: false },
            ].map(stage => (
              <div key={stage.label} style={{ background: stage.active ? '#52B788' : 'rgba(255,255,255,0.1)', borderRadius: 10, padding: '8px 4px', textAlign: 'center' }}>
                <p style={{ fontSize: 18, marginBottom: 4 }}>{stage.icon}</p>
                <p style={{ fontSize: 11, color: stage.active ? 'white' : 'rgba(255,255,255,0.6)', fontWeight: stage.active ? 700 : 400 }}>{stage.label}</p>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)', lineHeight: 1.6 }}>
            You've moved from <span style={{ color: '#52B788', fontWeight: 600 }}>concrete experience</span> to <span style={{ color: '#52B788', fontWeight: 600 }}>reflective observation</span>. Now let's build the mental model before the next scenario.
          </p>
        </div>

        {/* Reflection */}
        <div className="card" style={{ marginBottom: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <p style={{ fontWeight: 700, fontSize: 14 }}>✏️ Your reflection</p>
            <span className="pill pill-green">Bloom: Evaluate</span>
          </div>
          <p style={{ fontSize: 13, color: '#6B7280', marginBottom: 10 }}>What would you do differently next month to reduce your power bill share?</p>
          <textarea
            value={reflection}
            onChange={e => setReflection(e.target.value)}
            placeholder="e.g. I'd suggest heating timers, or agree on a flat usage rule for winter months..."
            style={{ width: '100%', minHeight: 90, padding: 12, borderRadius: 10, border: '1.5px solid #E5E7EB', fontSize: 13, resize: 'vertical', fontFamily: 'inherit', outline: 'none', color: '#374151' }}
          />
        </div>

        <button className="btn-primary" onClick={() => setStep(3)}>Continue to knowledge check →</button>
      </div>
    </div>
  );

  // QUIZ
  if (step === 3) return (
    <div style={{ minHeight: '100vh', background: '#F9FAFB' }}>
      <div style={{ background: '#1B4332', padding: '48px 20px 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, fontWeight: 600 }}>Knowledge check</span>
          <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13 }}>Question 1 of 1</span>
        </div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: quizAnswered ? '100%' : '0%' }} />
        </div>
      </div>
      <div style={{ padding: 20 }}>
        <div className="card" style={{ marginBottom: 16 }}>
          <span className="pill pill-green" style={{ marginBottom: 10, display: 'inline-block' }}>Bloom: Apply</span>
          <p style={{ fontWeight: 700, fontSize: 15, lineHeight: 1.5, color: '#111827' }}>{currentQ.question}</p>
          {!quizAnswered && (
            <div style={{ marginTop: 10, background: '#FFFBEB', borderRadius: 10, padding: '8px 12px' }}>
              <p style={{ fontSize: 12, color: '#92400E' }}>💡 {currentQ.hint}</p>
            </div>
          )}
        </div>
        {currentQ.options.map(opt => {
          let cls = 'quiz-option';
          if (quizAnswered) {
            if (opt.correct) cls += ' correct';
            else if (opt.id === quizSelected) cls += ' incorrect';
          }
          return (
            <button key={opt.id} className={cls} onClick={() => { if (!quizAnswered) { setQuizSelected(opt.id); setQuizAnswered(true); } }} disabled={quizAnswered}>
              {quizAnswered && opt.correct ? '✓ ' : ''}{opt.text}
            </button>
          );
        })}
        {quizAnswered && (
          <>
            <div style={{ background: '#F0FDF4', border: '1px solid #86EFAC', borderRadius: 12, padding: 14, marginBottom: 14 }}>
              <p style={{ fontSize: 13, color: '#15803D', lineHeight: 1.6 }}>{currentQ.explanation}</p>
            </div>
            <button className="btn-primary" onClick={() => { completeModule('module2', 60); setStep(4); }}>Complete module →</button>
          </>
        )}
      </div>
    </div>
  );

  // COMPLETE
  return (
    <div style={{ minHeight: '100vh', background: '#F9FAFB', padding: 20 }}>
      <div className="completion-card">
        <p style={{ fontSize: 40, marginBottom: 8 }}>🏆</p>
        <h2 style={{ color: 'white', fontSize: 22, fontWeight: 800, marginBottom: 6 }}>Module 2 done!</h2>
        <p style={{ color: 'rgba(255,255,255,0.75)', marginBottom: 4 }}>You've finished <strong>Splitting costs fairly</strong></p>
        <div className="xp-pill">+ 60 XP earned</div>
        <div style={{ marginTop: 16, background: 'rgba(255,255,255,0.1)', borderRadius: 12, padding: 14, textAlign: 'left' }}>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', marginBottom: 8 }}>What you learned</p>
          {[
            'Variable bills can be 2–3x higher in winter',
            'Proportional splitting is fairer than even splits',
            'Predicting costs sharpens your budgeting instinct',
            'Reflection helps you plan better for next month',
          ].map((t, i) => (
            <p key={i} style={{ fontSize: 13, color: 'white', marginBottom: 4 }}>✓ {t}</p>
          ))}
        </div>
      </div>
      <button className="btn-primary" onClick={() => navigate('/')}>Back to modules</button>
    </div>
  );
}
