import React from 'react';
import { useNavigate } from 'react-router-dom';

const OUTCOMES = [
  { num: 1, level: 'Remember', text: 'Recognise the typical income sources and expenses that make up a flat budget', color: '#1B4332', bg: '#D8F3DC' },
  { num: 2, level: 'Apply', text: "Calculate each flatmate's fair share when usage or time at the flat isn't equal", color: '#1B4332', bg: '#D8F3DC' },
  { num: 3, level: 'Analyse', text: 'Estimate a variable bill before seeing the answer, and explain what factors affected it', color: '#2D6A4F', bg: '#D8F3DC' },
  { num: 4, level: 'Evaluate', text: "Identify what you'd do differently after seeing an actual bill outcome", color: '#1a3a2a', bg: '#B7E4C7' },
  { num: 5, level: 'Create', text: 'Apply budgeting strategies to respond to an unexpected flatting situation', color: '#0d2b1e', bg: '#95D5B2' },
];

export default function Onboarding() {
  const navigate = useNavigate();
  return (
    <div style={{ minHeight: '100vh', background: '#F0FAF4', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, padding: '60px 24px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* Logo */}
        <p style={{ fontSize: 13, fontWeight: 700, letterSpacing: 2, color: '#1B4332', marginBottom: 20, textTransform: 'uppercase' }}>FLATWISE</p>
        <div style={{ width: 72, height: 72, background: '#1B4332', borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, marginBottom: 24 }}>🏠</div>

        {/* Headline */}
        <h1 style={{ fontSize: 28, fontWeight: 800, color: '#111827', textAlign: 'center', lineHeight: 1.2, marginBottom: 10, letterSpacing: -0.5 }}>
          Budget smarter,<br />flat better.
        </h1>
        <p style={{ fontSize: 15, color: '#6B7280', textAlign: 'center', lineHeight: 1.6, marginBottom: 28, maxWidth: 300 }}>
          Learn to manage money in your first flat — through real scenarios, not boring articles.
        </p>

        {/* Learning outcomes */}
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
          {OUTCOMES.map(o => (
            <div key={o.num} style={{ background: 'white', border: '1px solid #E5E7EB', borderRadius: 14, padding: '12px 14px', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, flexShrink: 0 }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: o.color, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700 }}>{o.num}</div>
                <span style={{ fontSize: 10, fontWeight: 600, color: o.color, background: o.bg, padding: '2px 6px', borderRadius: 6 }}>{o.level}</span>
              </div>
              <p style={{ fontSize: 13, color: '#374151', lineHeight: 1.5, paddingTop: 4 }}>{o.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div style={{ padding: '0 24px 40px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <button className="btn-primary" onClick={() => navigate('/')}>Get started</button>
        <button className="btn-secondary" onClick={() => navigate('/')}>I already have an account</button>
      </div>
    </div>
  );
}
