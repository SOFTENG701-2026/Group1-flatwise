import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const SCENARIOS = [
  {
    id: 'internet-bill',
    title: 'The Unpaid Internet Bill',
    subtitle: "Month 3 of your flat. Jordan hasn't paid their $45 internet share in 6 weeks.",
    chips: ["💸 Amount owed: $90", "📅 Weeks overdue: 6", "👥 Flatmates affected: 3"],
    avatar: 'J',
    avatarColor: '#7C3AED',
    name: 'Jordan',
    opening: "Hey sorry I've been meaning to sort the internet money... been a bit tight lately. Can we talk about it?",
    rounds: [
      {
        options: [
          { text: "No worries, pay whenever you can 🙂", tone: "Accommodating — avoids conflict but risks ongoing non-payment", jordanReply: "Oh thanks, I really appreciate it. I'll sort it soon... probably next week maybe.", relationship: 60, financial: 20, outcomeEmoji: "😬", outcomeSummary: "Avoided conflict but likely delayed payment further." },
          { text: "We need to sort this out — can you pay half now and half next week?", tone: "Assertive — sets a clear expectation with a realistic plan", jordanReply: "Yeah that's fair. I can do $45 now and the rest on Friday. Sorry for the delay.", relationship: 80, financial: 85, outcomeEmoji: "👍", outcomeSummary: "Clear plan agreed. Good balance of firm and fair." },
          { text: "This isn't okay. You need to pay everything by Friday or we're changing the WiFi password.", tone: "Aggressive — direct but may damage the relationship", jordanReply: "Wow, okay... I said I'd sort it. No need to be like that. I'll pay it but that felt harsh.", relationship: 25, financial: 70, outcomeEmoji: "😰", outcomeSummary: "Payment likely but relationship damaged." },
        ]
      },
      {
        options: [
          { text: "I get it — money's tough. Maybe we can set up a payment plan?", tone: "Empathetic — acknowledges their situation while moving forward", jordanReply: "That would actually be really helpful. $30 a week works for me.", relationship: 90, financial: 75, outcomeEmoji: "🤝", outcomeSummary: "Strong outcome — practical solution with mutual respect." },
          { text: "What's your timeline? We need certainty.", tone: "Direct — focuses on concrete commitment", jordanReply: "I can pay the full $90 by the end of the month. I'll set a reminder.", relationship: 70, financial: 88, outcomeEmoji: "✅", outcomeSummary: "Specific commitment secured. Clear outcome." },
          { text: "You've said 'soon' before. This is a pattern.", tone: "Confrontational — may be accurate but escalates tension", jordanReply: "That's not fair, this is the first time I've been late. I don't need this stress.", relationship: 20, financial: 55, outcomeEmoji: "⚡", outcomeSummary: "Conflict escalated — accurate but poorly timed." },
        ]
      },
      {
        options: [
          { text: "Thanks for sorting it. Let's set up a shared expenses app so this doesn't happen again.", tone: "Constructive — turns conflict into a system improvement", jordanReply: "Yeah that's actually a great idea. Splitwise? I'll download it now.", relationship: 95, financial: 90, outcomeEmoji: "🌟", outcomeSummary: "Excellent — resolved conflict AND improved the flat system." },
          { text: "Cool, just make sure it doesn't happen again.", tone: "Firm closure — clear but leaves some tension", jordanReply: "Yep, understood. Won't happen again.", relationship: 65, financial: 85, outcomeEmoji: "👌", outcomeSummary: "Resolved, but the relationship wasn't fully repaired." },
          { text: "This has really stressed me out. I hope you understand that.", tone: "Emotional — honest but may feel guilt-inducing", jordanReply: "I'm sorry... I didn't realise it was that big a deal to you.", relationship: 50, financial: 80, outcomeEmoji: "😔", outcomeSummary: "Honest expression, but ends on a heavy note." },
        ]
      },
    ],
  },
  {
    id: 'cleaning-roster',
    title: 'The Cleaning Roster',
    subtitle: "Week 6. The kitchen is consistently dirty after Sam's cooking nights. Others are frustrated.",
    chips: ["🍳 Affected: Kitchen", "📅 Ongoing: 6 weeks", "👥 Flatmates: 4"],
    avatar: 'S',
    avatarColor: '#D97706',
    name: 'Sam',
    opening: "I don't really see what the big deal is — I clean up, it's just not always immediately. Everyone's so uptight about it.",
    rounds: [
      {
        options: [
          { text: "You're right, sorry to bring it up.", tone: "Passive — dismisses the issue entirely", jordanReply: "Exactly. It's fine.", relationship: 55, financial: 50, outcomeEmoji: "😶", outcomeSummary: "Issue avoided — will almost certainly resurface." },
          { text: "It's not about being uptight — cooking smells and mess affect everyone's space.", tone: "Assertive — reframes as shared space, not personal attack", jordanReply: "...okay I hadn't thought about it like that. What would help?", relationship: 80, financial: 70, outcomeEmoji: "💬", outcomeSummary: "Good reframe — opened dialogue without blame." },
          { text: "You leave the stove covered in oil every single time. It's disgusting.", tone: "Aggressive — specific but attacking", jordanReply: "Wow, okay. I won't bother cooking for the flat anymore then.", relationship: 15, financial: 40, outcomeEmoji: "💥", outcomeSummary: "Escalated badly — flat dynamic severely impacted." },
        ]
      },
      {
        options: [
          { text: "Could we agree on a '30 minute rule' — clean up within 30 mins of finishing?", tone: "Solution-focused — specific and fair", jordanReply: "Yeah 30 minutes is fair. I can do that.", relationship: 88, financial: 72, outcomeEmoji: "🕐", outcomeSummary: "Specific, reasonable standard agreed by both." },
          { text: "Maybe a shared roster with checkboxes? Then no one's singled out.", tone: "Systemic — removes personal blame", jordanReply: "Actually a roster makes sense. I'd prefer that to this conversation.", relationship: 85, financial: 68, outcomeEmoji: "📋", outcomeSummary: "Systemic fix — removes ongoing friction." },
          { text: "We'll start a cleaning fine system — $5 if the kitchen isn't clean by 10pm.", tone: "Punitive — creates accountability but feels transactional", jordanReply: "That feels really passive aggressive. But fine.", relationship: 40, financial: 60, outcomeEmoji: "😤", outcomeSummary: "Compliance likely but resentment increased." },
        ]
      },
      {
        options: [
          { text: "Appreciate you being open to it. We all want the flat to feel comfortable.", tone: "Warm closure — reinforces shared goal", jordanReply: "Yeah fair enough. I'll make more effort.", relationship: 92, financial: 75, outcomeEmoji: "🏡", outcomeSummary: "Strong finish — problem solved, relationship intact." },
          { text: "Let's try it for two weeks and check in.", tone: "Measured — sets a review point", jordanReply: "Two weeks works. I'll try.", relationship: 78, financial: 70, outcomeEmoji: "🗓️", outcomeSummary: "Good — trial period gives both sides flexibility." },
          { text: "Just make sure you stick to it this time.", tone: "Skeptical — closes on a note of distrust", jordanReply: "I said I would.", relationship: 50, financial: 65, outcomeEmoji: "😑", outcomeSummary: "Resolution achieved but trust remains low." },
        ]
      },
    ],
  },
  {
    id: 'late-night-noise',
    title: 'Late Night Noise',
    subtitle: "You have a 9am lecture tomorrow. Your flatmate Alex had friends over until 2am three nights in a row.",
    chips: ["🕐 Time: 11:30pm", "📅 Third night", "📚 Exam week"],
    avatar: 'A',
    avatarColor: '#059669',
    name: 'Alex',
    opening: "Oh come on, it's not even midnight. We're just hanging out, we'll keep it down.",
    rounds: [
      {
        options: [
          { text: "Fine, don't worry about it.", tone: "Passive — suppresses the issue at cost to yourself", jordanReply: "Cool, thanks. We'll try to keep it down a bit.", relationship: 55, financial: 50, outcomeEmoji: "😶", outcomeSummary: "Nothing resolved — same issue tomorrow night." },
          { text: "I have a 9am exam prep session. I genuinely need sleep — can you take it to your room or wrap up by midnight?", tone: "Specific and reasonable — clear need without blame", jordanReply: "Oh sorry, I didn't know you had something on. Yeah we can move to my room.", relationship: 85, financial: 70, outcomeEmoji: "🤝", outcomeSummary: "Immediate resolution — specific context helped." },
          { text: "This is the third night. I'm actually losing my mind.", tone: "Honest but escalating — emotional", jordanReply: "I didn't realise it was that bad — we can go out if you need quiet.", relationship: 65, financial: 60, outcomeEmoji: "😬", outcomeSummary: "Worked but tension introduced unnecessarily." },
        ]
      },
      {
        options: [
          { text: "Could we agree on a quiet-after-midnight rule during exam week?", tone: "Systemic — creates a shared norm", jordanReply: "That's fair. I didn't realise exams were this week. Sorry.", relationship: 90, financial: 72, outcomeEmoji: "📅", outcomeSummary: "Excellent — exam week norms established for the future." },
          { text: "I'll put the exam schedule on the fridge so we all know when it's crunch time.", tone: "Proactive — transparent and low-blame", jordanReply: "That would actually help a lot. I'd want to know too.", relationship: 88, financial: 68, outcomeEmoji: "📌", outcomeSummary: "Creative systemic fix — builds mutual awareness." },
          { text: "You could just use headphones or go to someone else's place.", tone: "Suggests burden should shift entirely to Alex", jordanReply: "...this is my flat too, you know.", relationship: 35, financial: 55, outcomeEmoji: "😒", outcomeSummary: "Reasonable point, poor delivery — dismissive." },
        ]
      },
      {
        options: [
          { text: "Thanks for being understanding — I know it's your space too.", tone: "Generous — acknowledges shared rights", jordanReply: "Yeah of course. Good luck tomorrow.", relationship: 95, financial: 80, outcomeEmoji: "🌟", outcomeSummary: "Perfect close — mutual respect preserved." },
          { text: "Appreciate it. Let's check in after exams about house norms.", tone: "Forward-looking — turns event into policy", jordanReply: "Yeah that's a good idea actually.", relationship: 88, financial: 78, outcomeEmoji: "📋", outcomeSummary: "Excellent — short-term fix plus long-term planning." },
          { text: "Okay. Just remember this next time.", tone: "Closes with a warning — transactional tone", jordanReply: "Okay...", relationship: 55, financial: 65, outcomeEmoji: "😐", outcomeSummary: "Resolved but ended on a slightly sour note." },
        ]
      },
    ],
  },
];

const PRINCIPLES = [
  "Interest-based negotiation — focus on needs, not positions. Asking 'what do you need?' often unlocks solutions that hard demands never would.",
  "BATNA awareness — knowing your Best Alternative helps you stay calm. You don't need their agreement to survive.",
  "Timing is everything — raising an issue at 11pm during the problem is harder than a calm morning conversation.",
];

export default function NegotiationScenario() {
  const navigate = useNavigate();
  const { id } = useParams();
  const scenario = SCENARIOS.find(s => s.id === id) || SCENARIOS[0];

  const [phase, setPhase] = useState('intro'); // intro | chat | outcome
  const [round, setRound] = useState(0);
  const [messages, setMessages] = useState([
    { from: 'them', text: scenario.opening }
  ]);
  const [scores, setScores] = useState([]);
  const [chosen, setChosen] = useState(null);
  const [showOutcome, setShowOutcome] = useState(false);
  const chatRef = useRef(null);

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages]);

  const handleChoice = (opt, idx) => {
    if (chosen !== null) return;
    setChosen(idx);
    const newMsgs = [
      ...messages,
      { from: 'me', text: opt.text },
    ];
    setMessages(newMsgs);
    setScores(prev => [...prev, { relationship: opt.relationship, financial: opt.financial }]);

    setTimeout(() => {
      setMessages(prev => [...prev, { from: 'them', text: opt.jordanReply }]);
      setShowOutcome(true);
    }, 800);
  };

  const handleNext = () => {
    if (round + 1 >= scenario.rounds.length) {
      setPhase('outcome');
    } else {
      setRound(r => r + 1);
      setChosen(null);
      setShowOutcome(false);
    }
  };

  const avgRel = scores.length ? Math.round(scores.reduce((a, b) => a + b.relationship, 0) / scores.length) : 0;
  const avgFin = scores.length ? Math.round(scores.reduce((a, b) => a + b.financial, 0) / scores.length) : 0;

  const currentOpts = scenario.rounds[round]?.options || [];
  const currentChosen = chosen !== null ? currentOpts[chosen] : null;

  const principleIdx = Math.min(round, PRINCIPLES.length - 1);

  if (phase === 'intro') return (
    <div style={{ minHeight: '100vh', background: '#F9FAFB', paddingBottom: 80 }}>
      <div style={{ background: '#1B4332', padding: '48px 20px 20px' }}>
        <button onClick={() => navigate('/learn')} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.7)', fontSize: 13, cursor: 'pointer', padding: 0, marginBottom: 16 }}>← Learn</button>
        <h1 style={{ color: 'white', fontSize: 20, fontWeight: 700, marginBottom: 4 }}>Negotiation Scenario</h1>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          <span style={{ background: '#FBBF24', color: '#78350F', padding: '3px 10px', borderRadius: 99, fontSize: 11, fontWeight: 700 }}>Kolb: Active Experimentation</span>
          <span style={{ background: '#86EFAC', color: '#14532D', padding: '3px 10px', borderRadius: 99, fontSize: 11, fontWeight: 700 }}>Bloom: Evaluate</span>
        </div>
      </div>
      <div style={{ padding: 20 }}>
        <div style={{ background: '#1B4332', borderRadius: 16, padding: 20, marginBottom: 16, textAlign: 'center' }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>💬</div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginBottom: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: scenario.avatarColor, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: 16 }}>{scenario.avatar}</div>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#52B788', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: 16 }}>You</div>
          </div>
        </div>
        <div style={{ background: 'white', borderRadius: 16, padding: 16, marginBottom: 14, border: '1px solid #E5E7EB' }}>
          <h2 style={{ fontSize: 18, fontWeight: 800, marginBottom: 4 }}>{scenario.title}</h2>
          <p style={{ color: '#6B7280', fontSize: 13, marginBottom: 12 }}>{scenario.subtitle}</p>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {scenario.chips.map((c, i) => (
              <span key={i} style={{ background: '#F3F4F6', color: '#374151', padding: '4px 10px', borderRadius: 99, fontSize: 12, fontWeight: 500 }}>{c}</span>
            ))}
          </div>
        </div>
        <div style={{ background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: 12, padding: 12, marginBottom: 16 }}>
          <p style={{ fontSize: 13, color: '#92400E', lineHeight: 1.5 }}>You'll have <strong>3 decision rounds</strong> to navigate this conversation. Your choices affect both the relationship and financial outcome.</p>
        </div>
        <button className="btn-primary" onClick={() => setPhase('chat')}>Start conversation →</button>
      </div>
    </div>
  );

  if (phase === 'outcome') {
    const headline = avgRel >= 80 && avgFin >= 80 ? "Assertive and fair — strong outcome 🌟"
      : avgRel >= 70 ? "Good communication — solid result 👍"
      : avgFin >= 70 ? "Financial win, but relationship took a hit 💰"
      : "Room for improvement — try a different approach 🔄";

    return (
      <div style={{ minHeight: '100vh', background: '#F9FAFB', padding: 20, paddingBottom: 100 }}>
        <button onClick={() => navigate('/learn')} style={{ background: 'none', border: 'none', color: '#6B7280', fontSize: 13, cursor: 'pointer', padding: '0 0 16px', display: 'block' }}>← Learn</button>
        <div style={{ background: '#1B4332', borderRadius: 20, padding: 20, marginBottom: 16, textAlign: 'center' }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>
            {avgRel >= 80 && avgFin >= 80 ? '🤝' : avgRel >= 70 ? '😊' : avgFin >= 70 ? '💰' : '😬'}
          </div>
          <h2 style={{ color: 'white', fontSize: 20, fontWeight: 800, marginBottom: 4 }}>{headline}</h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13 }}>Here's how your conversation went</p>
        </div>

        <div style={{ background: 'white', borderRadius: 16, padding: 16, marginBottom: 14, border: '1px solid #E5E7EB' }}>
          <p style={{ fontWeight: 700, fontSize: 14, marginBottom: 12 }}>Your outcome scores</p>
          <ScoreBar label="Relationship health" value={avgRel} />
          <ScoreBar label="Financial resolution" value={avgFin} />
        </div>

        <div style={{ background: 'white', borderRadius: 16, padding: 16, marginBottom: 14, border: '1px solid #E5E7EB' }}>
          <p style={{ fontWeight: 700, fontSize: 14, marginBottom: 10 }}>What worked</p>
          {avgRel >= 80 ? (
            <>
              <p style={{ fontSize: 13, color: '#374151', marginBottom: 6 }}>✓ You acknowledged the other person's situation</p>
              <p style={{ fontSize: 13, color: '#374151', marginBottom: 6 }}>✓ You proposed specific, actionable solutions</p>
              <p style={{ fontSize: 13, color: '#374151' }}>✓ You closed constructively and left the relationship intact</p>
            </>
          ) : (
            <>
              <p style={{ fontSize: 13, color: '#374151', marginBottom: 6 }}>• Try leading with empathy before stating your needs</p>
              <p style={{ fontSize: 13, color: '#374151', marginBottom: 6 }}>• Specific proposals ("by Friday") work better than vague ones</p>
              <p style={{ fontSize: 13, color: '#374151' }}>• Ending on a warm note preserves the long-term relationship</p>
            </>
          )}
        </div>

        <div style={{ background: '#F0FAF4', border: '1.5px solid #86EFAC', borderRadius: 14, padding: 14, marginBottom: 20 }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: '#15803D', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 }}>Negotiation principle</p>
          <p style={{ fontSize: 13, color: '#15803D', lineHeight: 1.6 }}>{PRINCIPLES[principleIdx]}</p>
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn-secondary" style={{ flex: 1 }} onClick={() => { setPhase('intro'); setRound(0); setMessages([{ from: 'them', text: scenario.opening }]); setScores([]); setChosen(null); setShowOutcome(false); }}>
            Try again
          </button>
          <button className="btn-primary" style={{ flex: 1 }} onClick={() => navigate('/learn')}>
            Continue →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#F9FAFB', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ background: '#1B4332', padding: '48px 20px 16px', flexShrink: 0 }}>
        <button onClick={() => navigate('/learn')} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.7)', fontSize: 13, cursor: 'pointer', padding: 0, marginBottom: 10 }}>← Learn</button>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ color: 'white', fontWeight: 700, fontSize: 14 }}>{scenario.title}</p>
          <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12 }}>Round {round + 1} of {scenario.rounds.length}</span>
        </div>
        <div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
          {scenario.rounds.map((_, i) => (
            <div key={i} style={{ flex: 1, height: 3, borderRadius: 99, background: i < round ? '#52B788' : i === round ? 'white' : 'rgba(255,255,255,0.25)' }} />
          ))}
        </div>
      </div>

      {/* Chat */}
      <div ref={chatRef} style={{ flex: 1, padding: '16px 16px 8px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: msg.from === 'me' ? 'flex-end' : 'flex-start', alignItems: 'flex-end', gap: 8 }}>
            {msg.from === 'them' && (
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: scenario.avatarColor, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: 12, flexShrink: 0 }}>{scenario.avatar}</div>
            )}
            <div style={{
              maxWidth: '72%',
              background: msg.from === 'me' ? '#1B4332' : 'white',
              color: msg.from === 'me' ? 'white' : '#111827',
              border: msg.from === 'them' ? '1px solid #E5E7EB' : 'none',
              borderRadius: msg.from === 'me' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
              padding: '10px 14px',
              fontSize: 14,
              lineHeight: 1.5,
            }}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Outcome card */}
      {showOutcome && currentChosen && (
        <div style={{ background: 'white', borderTop: '1px solid #E5E7EB', padding: '12px 16px' }}>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 8 }}>
            <span style={{ fontSize: 18 }}>{currentChosen.outcomeEmoji}</span>
            <p style={{ fontSize: 13, color: '#374151', fontWeight: 600 }}>{currentChosen.outcomeSummary}</p>
          </div>
          <div style={{ display: 'flex', gap: 12, marginBottom: 10 }}>
            <MiniBar label="Relationship" value={currentChosen.relationship} />
            <MiniBar label="Financial" value={currentChosen.financial} />
          </div>
          <button className="btn-primary" style={{ padding: '10px' }} onClick={handleNext}>
            {round + 1 >= scenario.rounds.length ? 'See final outcome →' : 'Next round →'}
          </button>
        </div>
      )}

      {/* Options */}
      {!showOutcome && (
        <div style={{ background: '#F9FAFB', borderTop: '1px solid #E5E7EB', padding: '12px 16px 100px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 }}>Choose your response</p>
          {currentOpts.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleChoice(opt, i)}
              disabled={chosen !== null}
              style={{
                background: chosen === i ? '#F0FAF4' : 'white',
                border: `1.5px solid ${chosen === i ? '#1B4332' : '#E5E7EB'}`,
                borderRadius: 14,
                padding: '12px 14px',
                textAlign: 'left',
                cursor: chosen !== null ? 'default' : 'pointer',
                opacity: chosen !== null && chosen !== i ? 0.5 : 1,
                transition: 'all 0.15s',
              }}
            >
              <p style={{ fontSize: 14, fontWeight: 600, color: '#111827', marginBottom: 3, lineHeight: 1.4 }}>{opt.text}</p>
              <p style={{ fontSize: 12, color: '#9CA3AF', fontStyle: 'italic' }}>{opt.tone}</p>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function ScoreBar({ label, value }) {
  const color = value >= 80 ? '#22C55E' : value >= 60 ? '#F59E0B' : '#EF4444';
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
        <span style={{ fontSize: 13, color: '#374151' }}>{label}</span>
        <span style={{ fontSize: 13, fontWeight: 700, color }}>{value}%</span>
      </div>
      <div style={{ height: 8, background: '#F3F4F6', borderRadius: 99, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${value}%`, background: color, borderRadius: 99, transition: 'width 0.6s ease' }} />
      </div>
    </div>
  );
}

function MiniBar({ label, value }) {
  const color = value >= 80 ? '#22C55E' : value >= 60 ? '#F59E0B' : '#EF4444';
  return (
    <div style={{ flex: 1 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
        <span style={{ fontSize: 11, color: '#9CA3AF' }}>{label}</span>
        <span style={{ fontSize: 11, fontWeight: 700, color }}>{value}%</span>
      </div>
      <div style={{ height: 5, background: '#F3F4F6', borderRadius: 99, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${value}%`, background: color, borderRadius: 99 }} />
      </div>
    </div>
  );
}
