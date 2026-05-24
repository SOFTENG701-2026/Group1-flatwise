import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../lib/useProgress';
import { EXPLAINER_ITEMS, CATEGORISE_ITEMS, MODULE1_QUIZ } from '../lib/data';

export default function Module1() {
  const navigate = useNavigate();
  const { completeModule } = useProgress();
  const [step, setStep] = useState(0); // 0=intro 1=explainer 2=categorise 3=quiz 4=complete
  const [selected, setSelected] = useState({}); // {itemId: 'Fixed'|'Variable'}
  const [checked, setChecked] = useState(false);
  const [quizIdx, setQuizIdx] = useState(0);
  const [quizSelected, setQuizSelected] = useState(null);
  const [quizAnswered, setQuizAnswered] = useState(false);

  const totalSteps = 3;

  const handleTap = (itemId, zone) => {
    if (checked) return;
    setSelected(prev => ({
      ...prev,
      [itemId]: prev[itemId] === zone ? undefined : zone,
    }));
  };

  const allSelected = CATEGORISE_ITEMS.every(item => selected[item.id]);
  const correctCount = CATEGORISE_ITEMS.filter(item => selected[item.id] === item.correct).length;

  const handleQuizAnswer = (optId) => {
    if (quizAnswered) return;
    setQuizSelected(optId);
    setQuizAnswered(true);
  };

  const handleNextQ = () => {
    const q = MODULE1_QUIZ;
    if (quizIdx + 1 < q.length) {
      setQuizIdx(i => i + 1);
      setQuizSelected(null);
      setQuizAnswered(false);
    } else {
      completeModule('module1', 40);
      setStep(4);
    }
  };

  const currentQ = MODULE1_QUIZ[quizIdx];

  const Header = ({ activity, activityNum }) => (
    <div style={{ background: '#1B4332', padding: '48px 20px 20px' }}>
      <button onClick={() => step === 0 ? navigate('/') : setStep(s => s - 1)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.7)', fontSize: 13, cursor: 'pointer', padding: 0, marginBottom: 14, display: 'flex', alignItems: 'center', gap: 4 }}>
        ← {step === 0 ? 'Dashboard' : 'Module 1'}
      </button>
      {activityNum && (
        <>
          <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
            {[1,2,3].map(i => (
              <div key={i} style={{ flex: 1, height: 4, borderRadius: 99, background: i < activityNum ? '#52B788' : i === activityNum ? 'white' : 'rgba(255,255,255,0.25)' }} />
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12 }}>← Module 1</span>
            <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12 }}>Activity {activityNum} of {totalSteps}</span>
          </div>
        </>
      )}
      {activity && (
        <div style={{ marginTop: 8 }}>
          <span style={{ background: 'rgba(255,255,255,0.15)', color: 'white', padding: '4px 10px', borderRadius: 20, fontSize: 12, fontWeight: 600 }}>
            {activity === 'categorise' ? '🗂️ Categorise' : activity === 'explainer' ? '📖 Explainer' : '✅ Knowledge check'}
          </span>
        </div>
      )}
    </div>
  );

  // INTRO
  if (step === 0) return (
    <div style={{ minHeight: '100vh', background: '#F9FAFB' }}>
      <div style={{ background: '#1B4332', padding: '48px 20px 28px' }}>
        <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.7)', fontSize: 13, cursor: 'pointer', padding: 0, marginBottom: 16 }}>← Dashboard</button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 8 }}>
          <div style={{ width: 48, height: 48, background: 'rgba(255,255,255,0.15)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>📋</div>
          <div>
            <h1 style={{ color: 'white', fontSize: 20, fontWeight: 700 }}>Understanding flat costs</h1>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13 }}>Module 1 · 3 activities · ~8 min</p>
          </div>
        </div>
      </div>
      <div style={{ padding: 20 }}>
        <div style={{ background: '#F0FAF4', border: '1px solid #86EFAC', borderRadius: 14, padding: 14, marginBottom: 14, display: 'flex', gap: 10 }}>
          <span style={{ fontSize: 18 }}>🎯</span>
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, color: '#15803D', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 3 }}>Learning outcome</p>
            <p style={{ fontSize: 13, color: '#15803D', lineHeight: 1.5 }}>Recognise the typical income sources and expenses that make up a flat budget — <strong>Bloom: Remember → Understand</strong></p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
          <span className="pill pill-green">Bloom: Remember → Understand</span>
          <span className="pill pill-gray">Cognitive load: one concept at a time</span>
        </div>
        <div className="card" style={{ marginBottom: 14 }}>
          <p style={{ fontSize: 14, color: '#374151', lineHeight: 1.7 }}>Before you can split costs or predict bills, you need to know what you're actually paying for. This module walks you through every cost you'll encounter in a NZ flat — and the difference between fixed and variable expenses.</p>
        </div>
        <p style={{ fontSize: 12, fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 12 }}>What you'll do</p>
        {[
          { num: 1, text: <><strong>Read</strong> a short explainer on flat costs — rent, bond, power, internet, and contents insurance</> },
          { num: 2, text: <><strong>Categorise</strong> a set of flat expenses — sort them into Fixed or Variable</> },
          { num: 3, text: <><strong>Quiz</strong> — confirm your understanding with 2 quick questions</> },
        ].map(item => (
          <div key={item.num} style={{ display: 'flex', gap: 12, marginBottom: 10 }}>
            <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#1B4332', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{item.num}</div>
            <p style={{ fontSize: 14, color: '#374151', lineHeight: 1.5 }}>{item.text}</p>
          </div>
        ))}
        <div style={{ borderLeft: '3px solid #52B788', paddingLeft: 14, marginTop: 16, marginBottom: 20 }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: '#1B4332', marginBottom: 3 }}>No prior knowledge needed</p>
          <p style={{ fontSize: 13, color: '#6B7280', lineHeight: 1.5 }}>This is the starting point. Module 2 builds directly on what you learn here — you'll apply this knowledge to calculate fair splits.</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn-secondary" style={{ flex: 1 }} onClick={() => navigate('/')}>← Back</button>
          <button className="btn-primary" style={{ flex: 2 }} onClick={() => setStep(1)}>Start module</button>
        </div>
      </div>
    </div>
  );

  // EXPLAINER
  if (step === 1) return (
    <div style={{ minHeight: '100vh', background: '#F9FAFB' }}>
      <Header activity="explainer" activityNum={1} />
      <div style={{ padding: 20 }}>
        <h2 style={{ fontSize: 17, fontWeight: 700, marginBottom: 4 }}>Flat cost explainer</h2>
        <p style={{ fontSize: 13, color: '#6B7280', marginBottom: 16 }}>Fixed costs stay the same; variable costs change based on usage.</p>
        {EXPLAINER_ITEMS.map(item => (
          <div key={item.id} className="card" style={{ marginBottom: 10, display: 'flex', gap: 12 }}>
            <span style={{ fontSize: 28, flexShrink: 0 }}>{item.icon}</span>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <span style={{ fontWeight: 600, fontSize: 15 }}>{item.name}</span>
                <span className={`pill ${item.type === 'Fixed' ? 'pill-green' : 'pill-amber'}`}>{item.type}</span>
              </div>
              <p style={{ fontSize: 13, color: '#6B7280', lineHeight: 1.6 }}>{item.description}</p>
            </div>
          </div>
        ))}
        <div style={{ marginTop: 8 }}>
          <button className="btn-primary" onClick={() => setStep(2)}>Next: Categorise →</button>
        </div>
      </div>
    </div>
  );

  // CATEGORISE
  if (step === 2) return (
    <div style={{ minHeight: '100vh', background: '#F9FAFB' }}>
      <Header activity="categorise" activityNum={2} />
      <div style={{ padding: 20 }}>
        <h2 style={{ fontSize: 17, fontWeight: 700, marginBottom: 4 }}>Sort these flat expenses</h2>
        <p style={{ fontSize: 13, color: '#6B7280', marginBottom: 16 }}>Tap each expense, then tap the correct category</p>

        {/* Category boxes */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
          <div className="category-box fixed">
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
              <span style={{ fontSize: 14 }}>📌</span>
              <span style={{ fontWeight: 700, fontSize: 14, color: '#1B4332' }}>Fixed</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {CATEGORISE_ITEMS.filter(i => selected[i.id] === 'Fixed').map(item => (
                <div key={item.id} style={{ background: '#52B788', color: 'white', padding: '7px 12px', borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: 'pointer' }} onClick={() => !checked && setSelected(p => ({ ...p, [item.id]: undefined }))}>
                  {item.label}
                </div>
              ))}
            </div>
          </div>
          <div className="category-box variable">
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
              <span style={{ fontSize: 14 }}>📊</span>
              <span style={{ fontWeight: 700, fontSize: 14, color: '#92400E' }}>Variable</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {CATEGORISE_ITEMS.filter(i => selected[i.id] === 'Variable').map(item => (
                <div key={item.id} style={{ background: '#F59E0B', color: 'white', padding: '7px 12px', borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: 'pointer' }} onClick={() => !checked && setSelected(p => ({ ...p, [item.id]: undefined }))}>
                  {item.label}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Unselected chips */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
          {CATEGORISE_ITEMS.filter(i => !selected[i.id]).map(item => (
            <div key={item.id} style={{ display: 'flex', gap: 6 }}>
              <button className="tap-chip" onClick={() => handleTap(item.id, 'Fixed')} style={{ borderRight: 'none', borderRadius: '10px 0 0 10px', paddingRight: 8 }}>
                {item.label}
              </button>
              <button className="tap-chip" onClick={() => handleTap(item.id, 'Variable')} style={{ borderRadius: '0 10px 10px 0', paddingLeft: 8, fontSize: 12, color: '#6B7280' }}>
                F|V
              </button>
            </div>
          ))}
        </div>

        {/* Simpler: just tap chip to cycle */}
        <div style={{ background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: 12, padding: 12, marginBottom: 16, display: 'flex', gap: 8 }}>
          <span className="pill pill-green" style={{ alignSelf: 'flex-start' }}>Bloom: Understand</span>
          <p style={{ fontSize: 12, color: '#92400E' }}>Classifying expenses builds the mental model you need before Module 2</p>
        </div>

        {allSelected && !checked && (
          <button className="btn-primary" onClick={() => setChecked(true)}>Check my answers</button>
        )}
        {checked && (
          <>
            <div style={{ background: '#F0FDF4', border: '1px solid #86EFAC', borderRadius: 12, padding: 14, marginBottom: 12 }}>
              <p style={{ fontWeight: 700, color: '#15803D', fontSize: 15, marginBottom: 4 }}>{correctCount}/{CATEGORISE_ITEMS.length} correct</p>
              <p style={{ fontSize: 13, color: '#16A34A' }}>{correctCount >= 7 ? 'Great work! You know your fixed vs variable costs.' : 'Good effort — review any incorrect ones above.'}</p>
            </div>
            <button className="btn-primary" onClick={() => setStep(3)}>Next: Knowledge check →</button>
          </>
        )}
      </div>
    </div>
  );

  // QUIZ
  if (step === 3) return (
    <div style={{ minHeight: '100vh', background: '#F9FAFB' }}>
      <div style={{ background: '#1B4332', padding: '48px 20px 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, fontWeight: 600 }}>Knowledge check</span>
          <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13 }}>Question {quizIdx + 1} of {MODULE1_QUIZ.length}</span>
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          {MODULE1_QUIZ.map((_, i) => (
            <div key={i} style={{ flex: 1, height: 4, borderRadius: 99, background: i < quizIdx ? '#52B788' : i === quizIdx ? 'white' : 'rgba(255,255,255,0.25)' }} />
          ))}
        </div>
      </div>
      <div style={{ padding: 20 }}>
        <div className="card" style={{ marginBottom: 16 }}>
          <span className="pill pill-green" style={{ marginBottom: 10, display: 'inline-block' }}>Bloom: Remember</span>
          <p style={{ fontWeight: 700, fontSize: 16, lineHeight: 1.5, color: '#111827' }}>{currentQ.question}</p>
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
            <button key={opt.id} className={cls} onClick={() => handleQuizAnswer(opt.id)} disabled={quizAnswered}>
              {quizAnswered && opt.correct ? '✓ ' : ''}{opt.text}
            </button>
          );
        })}
        {quizAnswered && (
          <>
            <div style={{ background: '#F0FDF4', border: '1px solid #86EFAC', borderRadius: 12, padding: 14, marginBottom: 14 }}>
              <p style={{ fontSize: 13, color: '#15803D', lineHeight: 1.6 }}><strong>Correct.</strong> {currentQ.explanation}</p>
            </div>
            <button className="btn-primary" onClick={handleNextQ}>
              {quizIdx + 1 < MODULE1_QUIZ.length ? 'Next question →' : 'Complete module →'}
            </button>
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
        <h2 style={{ color: 'white', fontSize: 22, fontWeight: 800, marginBottom: 6 }}>Module 1 done!</h2>
        <p style={{ color: 'rgba(255,255,255,0.75)', marginBottom: 4 }}>You've finished <strong>Understanding flat costs</strong></p>
        <div className="xp-pill">+ 40 XP earned</div>
        <div style={{ marginTop: 16, background: 'rgba(255,255,255,0.1)', borderRadius: 12, padding: 14, textAlign: 'left' }}>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', marginBottom: 8 }}>What you learned</p>
          {['Fixed costs stay the same every period', 'Variable costs change based on usage', 'Power is the most variable cost in a NZ flat', 'Bond is held by Tenancy Services NZ'].map((t, i) => (
            <p key={i} style={{ fontSize: 13, color: 'white', marginBottom: 4 }}>✓ {t}</p>
          ))}
        </div>
      </div>
      <button className="btn-primary" onClick={() => navigate('/')}>Back to modules</button>
    </div>
  );
}
