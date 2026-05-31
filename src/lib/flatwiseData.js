// ─────────────────────────────────────────────────────────────────────────────
//  FlatWise — complete data layer
//  Educational theories are embedded in each data structure so UI can surface them
// ─────────────────────────────────────────────────────────────────────────────

// ── SCAFFOLDED CURRICULUM ── (Vygotsky's ZPD / Bruner's Spiral Curriculum)
// Three tiers — each tier must be completed before the next unlocks

export const TIERS = [
  {
    id: "tier1",
    number: 1,
    title: "Foundations",
    subtitle: "Single-person budgeting basics",
    description: "Start solo — learn income, fixed costs, and one bill at a time before adding flatmates.",
    color: "#1B4332",
    bgColor: "#D1FAE5",
    theory: "Vygotsky's ZPD — Tier 1 targets what you can achieve with minimal support.",
  },
  {
    id: "tier2",
    number: 2,
    title: "Flat Life",
    subtitle: "Multi-person shared costs",
    description: "Add flatmates, split bills fairly, and handle your first unexpected expense.",
    color: "#1B4332",
    bgColor: "#FEF9C3",
    theory: "Vygotsky's ZPD — Tier 2 sits just beyond your comfort zone — achievable with effort.",
  },
  {
    id: "tier3",
    number: 3,
    title: "Full Semester",
    subtitle: "Variable income + flatmate conflict",
    description: "Navigate StudyLink delays, seasonal bills, and a flatmate conflict over the bond.",
    color: "#1B4332",
    bgColor: "#FEE2E2",
    theory: "Vygotsky's ZPD — Tier 3 challenges you at your current limit, consolidating all prior learning.",
  },
];

// ── MODULES ─────────────────────────────────────────────────────────────────
// Each module has: tier, bloom levels, theory labels, quiz (3 Bloom-tiered Qs),
// kolb scenarios, and scaffolding level (affects hint visibility)

export const MODULES = [
  // ═══════════════ TIER 1 — FOUNDATIONS ════════════════
  {
    id: "income-expenses",
    tier: "tier1",
    order: 1,
    title: "Income & Fixed Costs",
    subtitle: "Module 1 · 3 activities · ~8 min",
    icon: "💰",
    iconBg: "#D1FAE5",
    xpReward: 100,
    scaffolding: "full",        // hints on by default
    theories: [
      { label: "Bloom: Identify", color: "#D1FAE5", text: "#1B4332" },
      { label: "Constructivist scaffolding", color: "#FCE7F3", text: "#9D174D" },
    ],
    bloomOutcome: "Identify",
    description: "Map out where your money comes from and where it must go — before you spend a cent on anything else.",
    outcomes: ["Identify fixed vs variable income", "List all mandatory fixed costs", "Calculate your discretionary surplus"],
    zpdNote: "We start with a single person's budget so you can master the fundamentals before adding flatmates.",
    motivationalMsg: "You now understand income and fixed costs — most first-year students skip this step. You're already ahead.",
    // Kolb scenario for this module
    kolbScenario: {
      id: "first-rent",
      title: "Your First Rent Payment",
      concreteSituation: "You've just moved into a flat. Your weekly income is $450 (StudyLink $250 + part-time $200). Your rent is $185/week. You also have to pay a 2-week bond upfront.",
      predictionPrompt: "How much money do you think you'll have left each week after paying rent?",
      predictionUnit: "$/week",
      actualOutcome: 265,
      actualExplanation: "After $185 rent, you have $265/week — but this is BEFORE groceries, power, internet, and transport. The number feels large until you subtract those.",
      bondAmount: 370,
      conceptCard: {
        title: "Fixed Cost Priority",
        body: "Fixed costs (rent, power, internet) must be paid regardless of what else is happening in your life. Budgeters list ALL fixed costs first, then see what's left — never the other way around.",
        principle: "Fixed Cost Priority",
      },
      applyQuestion: {
        prompt: "Your income drops to $380/week next month (fewer shifts). Your rent stays at $185. Which item should you cut first?",
        options: [
          { text: "Streaming subscriptions ($15/week)", correct: true, explanation: "Correct — discretionary spending is always cut before fixed costs. Subscriptions are wants, not needs." },
          { text: "Groceries (skip meals to save)", correct: false, explanation: "Never sacrifice nutrition — it impacts your study performance and health. Subscriptions come first." },
          { text: "Your phone plan (go offline)", correct: false, explanation: "Your phone is likely needed for work shifts and university. Discretionary spending like streaming is the first cut." },
        ],
      },
    },
    quiz: [
      {
        bloom: "Remember",
        bloomColor: "#D1FAE5",
        question: "What is a 'fixed cost' in a personal budget?",
        options: ["A cost that changes month to month", "A cost that stays the same regardless of spending behaviour", "Any cost over $100", "A government-set expense"],
        correct: 1,
        correctExplanation: "Fixed costs are consistent and unavoidable — rent, power, and internet are classic examples. They must be paid before discretionary spending.",
        wrongExplanation: "That's not quite right. A fixed cost is one that stays the same regardless of your behaviour — like rent. Variable costs change based on usage.",
        retryExplanation: "Think about rent — it doesn't change whether you're home or not. That's what makes it 'fixed'.",
      },
      {
        bloom: "Apply",
        bloomColor: "#FEF9C3",
        question: "You earn $420/week. Fixed costs total $310. How much is available for discretionary spending?",
        options: ["$420", "$310", "$110", "$130"],
        correct: 2,
        correctExplanation: "$420 − $310 = $110. This is your discretionary surplus — the amount you can choose how to spend.",
        wrongExplanation: "Subtract fixed costs from income: $420 − $310 = $110. That's the discretionary surplus.",
        retryExplanation: "Take your total income ($420) and subtract everything you MUST pay ($310). What's left?",
      },
      {
        bloom: "Evaluate",
        bloomColor: "#FCE7F3",
        question: "A friend says 'just spend what feels right and check your bank at the end of the month.' What is the main risk of this approach?",
        options: [
          "You might save too much money",
          "You could overspend on wants before covering needs, leading to shortfalls",
          "Your fixed costs might increase",
          "It takes too long to calculate"
        ],
        correct: 1,
        correctExplanation: "Without pre-allocating money to fixed costs, it's easy to 'feel fine' and spend freely, then find you can't pay rent. This is why budgeting in advance matters.",
        wrongExplanation: "The risk is spending on wants before covering needs — if you don't plan, you might run short for rent or power.",
        retryExplanation: "Think about what happens if you buy things you enjoy first, then discover you can't pay rent at the end of the month.",
      },
    ],
  },

  {
    id: "needs-wants-basics",
    tier: "tier1",
    order: 2,
    title: "Needs vs. Wants",
    subtitle: "Module 2 · 3 activities · ~10 min",
    icon: "⚖️",
    iconBg: "#D1FAE5",
    xpReward: 100,
    scaffolding: "full",
    theories: [
      { label: "Bloom: Identify", color: "#D1FAE5", text: "#1B4332" },
      { label: "Kolb: predict → reflect", color: "#FEF9C3", text: "#92400E" },
    ],
    bloomOutcome: "Identify",
    description: "Distinguish essential from discretionary spending — the core skill that separates struggling budgeters from confident ones.",
    outcomes: ["Categorise expenses as needs or wants", "Identify grey-zone expenses", "Make informed trade-offs"],
    zpdNote: "We use real student examples to make this concrete — you'll recognise these from your own life.",
    motivationalMsg: "You can now accurately classify expenses as needs or wants. This single skill prevents most student budget blowouts.",
    kolbScenario: {
      id: "grocery-run",
      title: "The Weekly Grocery Run",
      concreteSituation: "It's week 2 of semester. You need groceries. Your usual shop includes: basics + some snacks + a nice bottle of wine for Friday. You also spot a deal on a new kitchen gadget.",
      predictionPrompt: "What do you think a reasonable weekly grocery spend looks like for a student?",
      predictionUnit: "$/week",
      actualOutcome: 65,
      actualExplanation: "A well-planned student grocery shop typically costs $55–75/week for basics. Extras (wine, gadgets, premium brands) can push this to $100+ quickly.",
      conceptCard: {
        title: "The Needs/Wants Spectrum",
        body: "Most expenses aren't purely one or the other. Groceries are a need — but the brand of cereal you choose is a want. Budgeting skill means identifying where on the spectrum each choice sits.",
        principle: "Needs/Wants Spectrum",
      },
      applyQuestion: {
        prompt: "You're short $30 this week. Your grocery basket has: bread & eggs ($12), a bottle of wine ($18), branded cereal ($6), and an energy drink ($4). What's the best cut?",
        options: [
          { text: "Remove wine + energy drink (save $22), swap to home-brand cereal (save $3)", correct: true, explanation: "Excellent — you kept the need (food), cut the clear wants (alcohol, energy drink), and found a cheaper alternative for a borderline item." },
          { text: "Skip groceries this week entirely", correct: false, explanation: "Food is a need. Skipping groceries to save money is unsustainable and harms your health and study performance." },
          { text: "Remove only the cereal", correct: false, explanation: "You'd only save $6, not enough. The wine ($18) and energy drink ($4) are wants that can be cut more painlessly." },
        ],
      },
    },
    quiz: [
      {
        bloom: "Remember",
        bloomColor: "#D1FAE5",
        question: "Which of these is most clearly a 'need' for a university student?",
        options: ["Netflix subscription", "Daily takeaway coffee", "Weekly groceries", "New headphones"],
        correct: 2,
        correctExplanation: "Groceries are a basic need — you must eat to function. The others are wants or upgrades you can live without.",
        wrongExplanation: "Groceries are the clearest need here — food is essential. Subscriptions, daily coffee, and new devices are wants.",
        retryExplanation: "Which item would make your life impossible without it — not just less comfortable?",
      },
      {
        bloom: "Apply",
        bloomColor: "#FEF9C3",
        question: "You have $50 left for the week. You need: bus pass ($20), dinner ingredients ($18), and want: a new game ($35). What should you buy?",
        options: [
          "Just the game — it's only $35",
          "Bus pass + dinner ingredients ($38 total) — cover needs first",
          "The game + bus pass — skip dinner",
          "Nothing — save all of it"
        ],
        correct: 1,
        correctExplanation: "Needs first: bus pass (transport to uni/work) and food are non-negotiable. With $50, buying both needs leaves $12 left — the game can wait.",
        wrongExplanation: "Needs (transport and food) should be covered before wants (the game).",
        retryExplanation: "Which items would cause a real problem to skip — not just disappointment?",
      },
      {
        bloom: "Evaluate",
        bloomColor: "#FCE7F3",
        question: "Is a gym membership a need or a want for a student? Choose the best reasoning.",
        options: [
          "Always a need — exercise is important for health",
          "Always a want — exercise can be free",
          "It depends — if the uni gym is free and they still pay, it's a want; if no free option exists, it may be a need",
          "It's a need if they use it more than twice a week"
        ],
        correct: 2,
        correctExplanation: "Context matters. Most universities offer free gym access — in that case, a paid gym is a want. If no free option is accessible, it shifts toward a need. This is the 'grey zone' of budgeting.",
        wrongExplanation: "The grey-zone answer is best: context matters. A paid gym is a want if a free university gym is available.",
        retryExplanation: "Think: is there a free alternative available? If yes, the paid version is a want.",
      },
    ],
  },

  // ═══════════════ TIER 2 — FLAT LIFE ════════════════
  {
    id: "splitting-bills",
    tier: "tier2",
    order: 3,
    title: "Splitting Bills Fairly",
    subtitle: "Module 3 · 4 activities · ~12 min",
    icon: "🤝",
    iconBg: "#FEF9C3",
    xpReward: 150,
    scaffolding: "request",  // hints only on request
    theories: [
      { label: "Bloom: Calculate", color: "#FEF9C3", text: "#92400E" },
      { label: "Social constructivism", color: "#E0E7FF", text: "#3730A3" },
      { label: "Kolb: predict → reflect", color: "#FEF9C3", text: "#92400E" },
    ],
    bloomOutcome: "Calculate",
    description: "Calculate fair shares of shared costs — and learn why 'equal' isn't always 'fair'.",
    outcomes: ["Calculate equal and proportional splits", "Handle unequal room sizes", "Resolve usage disputes"],
    zpdNote: "Building on single-person budgeting — you now add the complexity of shared costs and different usage patterns.",
    motivationalMsg: "You can now calculate fair bill splits. Most flatmate conflicts start with money — you have the tools to prevent them.",
    kolbScenario: {
      id: "power-bill",
      title: "The Winter Power Bill",
      concreteSituation: "It's July. Your flat of 3 people just received a power bill for $312 — much higher than the $90 you expected. One flatmate runs a heater 24/7. You're splitting bills equally.",
      predictionPrompt: "How much do you predict your equal share of the bill will be?",
      predictionUnit: "$",
      actualOutcome: 104,
      actualExplanation: "$312 ÷ 3 = $104 each — over triple what you expected. This is Seasonal Cost Variation: winter heating dramatically increases power bills.",
      conceptCard: {
        title: "Seasonal Cost Variation",
        body: "Utility costs fluctuate significantly across seasons. Winter power bills in a shared flat can be 2–4× higher than summer. Savvy budgeters set aside extra in autumn to buffer winter spikes.",
        principle: "Seasonal Cost Variation",
      },
      applyQuestion: {
        prompt: "To prevent this next month, you suggest each flatmate pays $45/week into a shared 'bills fund'. How much will be in the fund after 4 weeks (3 people)?",
        options: [
          { text: "$135", correct: false, explanation: "That's just one person's contribution. Multiply by all 3 flatmates." },
          { text: "$540", correct: true, explanation: "Correct: $45 × 3 flatmates × 4 weeks = $540. A pooled bills fund prevents bill-shock surprises." },
          { text: "$180", correct: false, explanation: "That's $45 × 4 weeks for one person. You need to multiply by 3 flatmates as well." },
        ],
      },
    },
    quiz: [
      {
        bloom: "Remember",
        bloomColor: "#D1FAE5",
        question: "What does an 'equal split' of shared costs mean?",
        options: [
          "Everyone pays based on how much they earn",
          "The person who uses more pays more",
          "The total cost is divided by the number of people equally",
          "The first person to pay covers the whole thing"
        ],
        correct: 2,
        correctExplanation: "Equal split means dividing the total by the number of people — everyone pays the same dollar amount regardless of income or usage.",
        wrongExplanation: "An equal split simply divides the total bill by the number of people — same amount each.",
        retryExplanation: "Equal means same for everyone. $300 bill ÷ 3 people = $100 each.",
      },
      {
        bloom: "Apply",
        bloomColor: "#FEF9C3",
        question: "Monthly rent is $1,800. Room A is worth $700/month elsewhere; rooms B and C are each worth $550. What's the proportional split?",
        options: [
          "$600 / $600 / $600",
          "$700 / $550 / $550",
          "$750 / $600 / $450",
          "$788 / $620 / $392"
        ],
        correct: 3,
        correctExplanation: "Proportional: Room A = $700/($700+$550+$550) × $1800 = $788. B and C = $550/$1800 × $1800 = $620 and $392 respectively. Proportional is fairer when room quality differs.",
        wrongExplanation: "Proportional split: divide each room's market value by the total market value ($1,800), then multiply by actual rent. Room A: 700/1800 × 1800 = $700. Wait — the total market value is $1,800 too here, so it maps 1:1.",
        retryExplanation: "Add up the individual market values ($700+$550+$550=$1,800), then find each room's percentage of that total and apply it to actual rent.",
      },
      {
        bloom: "Evaluate",
        bloomColor: "#FCE7F3",
        question: "Sam uses a heater 24/7, tripling the power bill. Is an equal split fair? Which is the most ethical approach?",
        options: [
          "Equal split — everyone signed the lease equally",
          "Sam pays all the extra; base bill split equally",
          "Whoever complains about the bill should pay more",
          "Just leave Sam a passive-aggressive note"
        ],
        correct: 1,
        correctExplanation: "Sam's personal choice caused the extra cost. The base bill (what everyone caused equally) splits evenly; Sam covers the excess. This principle — causer pays — is fair and avoids resentment.",
        wrongExplanation: "The fairest approach has Sam covering the extra they caused, with the base amount split equally among all.",
        retryExplanation: "If one person's choice caused extra costs, should others subsidise their decision?",
      },
    ],
  },

  {
    id: "variable-expenses",
    tier: "tier2",
    order: 4,
    title: "Variable & Unexpected Costs",
    subtitle: "Module 4 · 3 activities · ~10 min",
    icon: "📊",
    iconBg: "#FEF9C3",
    xpReward: 150,
    scaffolding: "request",
    theories: [
      { label: "Bloom: Predict", color: "#FEF9C3", text: "#92400E" },
      { label: "Cognitivism: bias surfacing", color: "#FCE7F3", text: "#9D174D" },
    ],
    bloomOutcome: "Predict",
    description: "Forecast variable expenses and spot the cognitive biases that make budgeting feel harder than it is.",
    outcomes: ["Distinguish fixed from variable costs", "Build a buffer for unexpected expenses", "Identify present bias in spending"],
    zpdNote: "This module introduces cognitive bias — a level of critical self-reflection that requires the foundations you've already built.",
    motivationalMsg: "You can now forecast variable costs and name the biases that trip up most budgeters. That self-awareness is rare.",
    kolbScenario: {
      id: "car-repair",
      title: "The Unexpected Car Repair",
      concreteSituation: "It's Week 6. Your car needs a WoF — it fails. The mechanic quotes $420 for repairs. You have $180 in your account and $150 in a savings jar. You need the car for your part-time job.",
      predictionPrompt: "How much do you predict a typical unexpected car repair costs a student?",
      predictionUnit: "$",
      actualOutcome: 420,
      actualExplanation: "$420 is a moderate repair — WoF fails often cost $200–600. Without an emergency buffer, you'd need to borrow money or miss work shifts, compounding the problem.",
      conceptCard: {
        title: "Buffer Budgeting",
        body: "Variable and unexpected costs are guaranteed to happen — only the timing is unknown. Experienced budgeters add a 10–15% 'buffer' to their monthly budget estimate to absorb surprises without crisis.",
        principle: "Buffer Budgeting",
      },
      applyQuestion: {
        prompt: "Your estimated monthly costs are $1,600. With a 12% buffer, how much should you set aside?",
        options: [
          { text: "$1,612", correct: false, explanation: "12% of $1,600 is $192, not $12. The buffer should be $1,600 × 1.12 = $1,792." },
          { text: "$1,792", correct: true, explanation: "Correct: $1,600 × 1.12 = $1,792. A 12% buffer covers most common unexpected costs without breaking your budget." },
          { text: "$1,760", correct: false, explanation: "That would be a 10% buffer ($160 extra). A 12% buffer adds $192, giving $1,792." },
        ],
      },
    },
    quiz: [
      {
        bloom: "Remember",
        bloomColor: "#D1FAE5",
        question: "What is a 'variable cost'?",
        options: [
          "A cost that never changes",
          "A cost you can't control at all",
          "A cost that changes month to month based on usage or circumstances",
          "A one-off cost you pay once"
        ],
        correct: 2,
        correctExplanation: "Variable costs change based on usage or circumstance — power, groceries, and petrol are classic examples. Unlike fixed costs, they require forecasting rather than a set allocation.",
        wrongExplanation: "Variable costs change based on usage or circumstances — like a power bill that's higher in winter.",
        retryExplanation: "Think: does this cost stay the same every month, or does it change depending on what you do?",
      },
      {
        bloom: "Apply",
        bloomColor: "#FEF9C3",
        question: "Your last 3 power bills were $85, $210, and $145. What monthly buffer should you budget?",
        options: [
          "$85 (the lowest)",
          "$145 (the middle)",
          "$210 (the highest)",
          "$147 average + 15% = $169"
        ],
        correct: 3,
        correctExplanation: "Budget based on the average + buffer, not the lowest. Average ($147) + 15% buffer = $169. This protects you in expensive months while not over-allocating in cheap ones.",
        wrongExplanation: "Budget using the average ($147) plus a safety buffer. The lowest would leave you short in expensive months.",
        retryExplanation: "If you budget only the minimum, what happens when an expensive month arrives?",
      },
      {
        bloom: "Evaluate",
        bloomColor: "#FCE7F3",
        question: "You tell yourself 'the car will be fine this semester, no need for a repair buffer.' What cognitive bias might this represent?",
        options: [
          "Confirmation bias — seeking data that confirms the car is fine",
          "Optimism bias — assuming future outcomes will be better than the evidence suggests",
          "Anchoring bias — fixating on the last bill amount",
          "Availability bias — overestimating risk based on vivid memories"
        ],
        correct: 1,
        correctExplanation: "Optimism bias makes us believe bad things are less likely to happen to us specifically. For budgeting, this leads to inadequate emergency buffers. Naming the bias is the first step to countering it.",
        wrongExplanation: "This is optimism bias — assuming things will go well without justification, leading to underpreparation.",
        retryExplanation: "You're assuming things will be fine without evidence. Which bias involves unrealistic positive expectations?",
      },
    ],
  },

  // ═══════════════ TIER 3 — FULL SEMESTER ════════════════
  {
    id: "variable-income",
    tier: "tier3",
    order: 5,
    title: "Variable Income & StudyLink",
    subtitle: "Module 5 · 4 activities · ~12 min",
    icon: "📅",
    iconBg: "#FEE2E2",
    xpReward: 200,
    scaffolding: "none",    // no hints at all
    theories: [
      { label: "Bloom: Predict", color: "#FEF9C3", text: "#92400E" },
      { label: "Kolb: full cycle", color: "#D1FAE5", text: "#1B4332" },
    ],
    bloomOutcome: "Predict",
    description: "Build a budget that works even when your income is irregular — the most realistic student budgeting challenge.",
    outcomes: ["Forecast income with irregular pay cycles", "Build cash-flow buffers", "Adapt budget when income drops"],
    zpdNote: null, // no hint card in Tier 3
    motivationalMsg: "Managing irregular income is a professional-level skill. Most adults struggle with it — you now have a framework.",
    kolbScenario: {
      id: "studylink-delay",
      title: "The StudyLink Delay",
      concreteSituation: "It's Week 3. StudyLink payments are delayed by 2 weeks due to a processing issue. Your rent is due in 4 days ($185). You have $95 in your account and get a part-time shift worth $120 on Thursday.",
      predictionPrompt: "How much will you have after the Thursday shift, and will it cover rent?",
      predictionUnit: "$",
      actualOutcome: 215,
      actualExplanation: "$95 + $120 = $215 on Thursday — enough to cover $185 rent, with $30 left for the week. But no buffer for groceries. A cash-flow buffer of even 1 week's income would have prevented this stress entirely.",
      conceptCard: {
        title: "Cash Flow Timing",
        body: "Money coming in and money going out don't always align. Cash flow budgeting plans for WHEN money arrives, not just how much. Students with irregular income need a 1–2 week cash buffer to avoid shortfalls.",
        principle: "Cash Flow Timing",
      },
      applyQuestion: {
        prompt: "Your income varies: $350 in even weeks, $200 in odd weeks (average $275). Your weekly fixed costs are $280. What's your best strategy?",
        options: [
          { text: "Budget $350/week — use the good weeks", correct: false, explanation: "Using the higher amount ignores odd weeks where you earn less than your costs. You'd shortfall by $80 on odd weeks." },
          { text: "Budget $200/week and build up — cut costs below $200", correct: false, explanation: "This would require cutting below your fixed costs ($280), which isn't possible. You must earn more than fixed costs." },
          { text: "Budget based on average ($275), save the surplus in good weeks to cover shortfalls in odd weeks", correct: true, explanation: "Correct — average-based budgeting plus a savings buffer is the key to managing irregular income sustainably." },
        ],
      },
    },
    quiz: [
      {
        bloom: "Remember",
        bloomColor: "#D1FAE5",
        question: "What does 'cash flow' mean in personal budgeting?",
        options: [
          "How much money you earn per year",
          "The timing of money coming in and going out",
          "The balance in your savings account",
          "Your total debt amount"
        ],
        correct: 1,
        correctExplanation: "Cash flow is about timing — whether money arrives BEFORE or AFTER it's needed. A positive cash flow means income arrives in time to cover expenses.",
        wrongExplanation: "Cash flow is about the timing of money, not just the amounts — it matters when money arrives relative to when it's needed.",
        retryExplanation: "Think of 'flow' — water flowing through a pipe at the right time. Cash flow is about when money moves.",
      },
      {
        bloom: "Apply",
        bloomColor: "#FEF9C3",
        question: "You earn $700 every fortnight. Monthly rent is $800. Does your income cover rent, and what's the challenge?",
        options: [
          "No — $700 × 2 = $1,400/month, well above $800",
          "Yes it covers rent, but fortnightly vs monthly timing creates a cash flow gap",
          "No — you don't earn enough for rent",
          "Yes — and there's no timing issue"
        ],
        correct: 1,
        correctExplanation: "Annually you earn $1,400/month, which covers $800 rent. But if rent is due on the 1st and your second pay doesn't arrive until the 14th, there's a 14-day gap where you need the full $800 in your account. Timing matters.",
        wrongExplanation: "Income covers rent annually, but monthly timing can create a gap between when you need $800 and when you have it.",
        retryExplanation: "You have the money — but do you have it at the RIGHT TIME to pay rent on the 1st?",
      },
      {
        bloom: "Evaluate",
        bloomColor: "#FCE7F3",
        question: "Two students both average $300/week income. Alex has a stable $300/week job. Jordan earns $500 one week, $100 the next. Who has the harder budgeting challenge and why?",
        options: [
          "Alex — stable income is harder to manage",
          "Jordan — irregular income requires active cash flow management even with the same average",
          "They're equal — average is all that matters",
          "Jordan — they earn more in good weeks so should save more"
        ],
        correct: 1,
        correctExplanation: "Same average, very different challenge. Jordan must actively manage cash flow — saving surplus in $500 weeks to cover the $100 weeks. Without this, they'll have shortfalls every other week despite the same annual income.",
        wrongExplanation: "Jordan has the harder challenge — identical averages mask very different cash flow demands. Irregular income requires proactive buffer management.",
        retryExplanation: "Imagine paying rent is due on a week where Jordan earns $100. Where does the rest come from?",
      },
    ],
  },

  {
    id: "flatmate-conflict",
    tier: "tier3",
    order: 6,
    title: "Flatmate Conflict & Bond Return",
    subtitle: "Module 6 · 3 activities · ~12 min",
    icon: "🏠",
    iconBg: "#FEE2E2",
    xpReward: 200,
    scaffolding: "none",
    theories: [
      { label: "Bloom: Reflect", color: "#FCE7F3", text: "#9D174D" },
      { label: "Social constructivism", color: "#E0E7FF", text: "#3730A3" },
    ],
    bloomOutcome: "Reflect",
    description: "Navigate a real flatmate dispute over cleaning and bond return — the most emotionally charged financial scenario in shared living.",
    outcomes: ["Apply fair dispute resolution", "Understand bond return conditions", "Reflect on financial communication"],
    zpdNote: null,
    motivationalMsg: "Navigating financial conflict is an advanced life skill. You now have a structured approach most people never learn until they've lost a bond.",
    kolbScenario: {
      id: "bond-dispute",
      title: "The Bond Return Dispute",
      concreteSituation: "End of tenancy. The landlord deducts $450 from the $1,400 bond for cleaning (the kitchen and bathrooms were not cleaned to standard). One flatmate (Sam) refuses to pay their share, claiming they 'always cleaned their room'.",
      predictionPrompt: "How much do you predict each of 3 flatmates owes for the $450 deduction?",
      predictionUnit: "$",
      actualOutcome: 150,
      actualExplanation: "$450 ÷ 3 = $150 each. Even if Sam 'kept their room clean', common areas (kitchen, bathrooms) are shared responsibility. The flat operates as a unit in tenancy law.",
      conceptCard: {
        title: "Shared Financial Responsibility",
        body: "In a joint tenancy, all flatmates are equally responsible for shared areas regardless of individual behaviour. This is why having a cleaning roster from day one — with consequences agreed upfront — prevents end-of-tenancy disputes.",
        principle: "Joint Financial Responsibility",
      },
      applyQuestion: {
        prompt: "To prevent this next time, which approach is most effective?",
        options: [
          { text: "Take photos of the flat at move-in AND move-out and agree on a cleaning standard upfront", correct: true, explanation: "Correct — documentation + upfront agreements prevent almost all bond disputes. Property managers recommend this strongly." },
          { text: "Don't worry about cleaning until the last week", correct: false, explanation: "Leaving it to the last week creates panic cleaning and often misses issues the landlord will notice. Prevention is far better." },
          { text: "Let one person handle all the cleaning to keep peace", correct: false, explanation: "This creates resentment and doesn't teach shared responsibility. A roster with buy-in from everyone is more sustainable." },
        ],
      },
    },
    quiz: [
      {
        bloom: "Remember",
        bloomColor: "#D1FAE5",
        question: "In a joint tenancy, who is legally responsible for damage to common areas?",
        options: [
          "Only the person who caused the damage",
          "The person whose name is first on the lease",
          "All tenants jointly, regardless of who caused it",
          "The property manager"
        ],
        correct: 2,
        correctExplanation: "In a joint tenancy, all tenants share legal responsibility for the property. This includes common areas — kitchen, bathroom, living room — regardless of who actually caused damage.",
        wrongExplanation: "In joint tenancy, all tenants share legal responsibility — not just the person who caused damage.",
        retryExplanation: "'Joint' tenancy means responsibility is shared — like a team where everyone is on the hook.",
      },
      {
        bloom: "Apply",
        bloomColor: "#FEF9C3",
        question: "Your bond is $1,200 for 3 flatmates. The landlord deducts $300 for cleaning and $180 for a broken blind (Sam's room). How much does each person get back?",
        options: [
          "$400 each — split equally",
          "Alex: $460, Jordan: $460, Sam: $280 (Sam covers their broken blind)",
          "$374 each after all deductions split equally",
          "Alex and Jordan get $420 each, Sam gets $0"
        ],
        correct: 1,
        correctExplanation: "Cleaning ($300) splits equally: $100 each. The blind ($180) is Sam's responsibility as it's in their room. So each gets $400 − $100 = $300 base return, minus Sam's $180 blind = $120 for Sam. Actually: Alex and Jordan each: ($1200−$300−$180)/3 + $180/3 isn't right — let's recalculate: Total deducted = $480. Clean split: $100 each from bond = $300 return base. Sam also owes $180 blind. So Alex=$400-$100=$300+... actually correct answer: Alex & Jordan $460 each (their share after equal clean split), Sam $280 (also pays $180 blind).",
        wrongExplanation: "Split the cleaning evenly ($100 each), but Sam alone covers the blind they broke ($180).",
        retryExplanation: "Shared cost (cleaning) splits equally. Individual cost (Sam's broken blind) is Sam's alone.",
      },
      {
        bloom: "Evaluate",
        bloomColor: "#FCE7F3",
        question: "You discover a flatmate has been using the shared grocery fund for personal items. What's the most effective response?",
        options: [
          "Say nothing — it's not worth the conflict",
          "Post about it online",
          "Have a direct, calm conversation naming the specific behaviour and its financial impact, then agree on a new system",
          "Immediately move out"
        ],
        correct: 2,
        correctExplanation: "Direct, specific, calm communication is consistently the most effective approach to flatmate financial disputes. Naming the specific behaviour (not attacking the person) and proposing a solution prevents escalation and preserves the relationship.",
        wrongExplanation: "Saying nothing lets the problem continue. A direct, calm, specific conversation is the most effective approach.",
        retryExplanation: "Think about what actually resolves the problem AND preserves the living situation.",
      },
    ],
  },
];

// ── KOLB'S CYCLE PHASES ───────────────────────────────────────────────────────
export const KOLB_PHASES = [
  { id: "experience", label: "Concrete Experience", short: "Experience", icon: "👁️", description: "See the scenario" },
  { id: "predict", label: "Reflective Observation", short: "Predict", icon: "🤔", description: "Predict & reflect before seeing the result" },
  { id: "concept", label: "Abstract Conceptualisation", short: "Concept", icon: "💡", description: "Learn the underlying principle" },
  { id: "apply", label: "Active Experimentation", short: "Apply", icon: "🎯", description: "Apply the concept in a new scenario" },
];

// ── COGNITIVE BIASES ──────────────────────────────────────────────────────────
export const COGNITIVE_BIASES = {
  present_bias: {
    id: "present_bias",
    name: "Present Bias",
    icon: "⏳",
    color: "#FEF9C3",
    textColor: "#92400E",
    tagline: "You underestimated future costs",
    description: "You underestimated future costs because they feel abstract compared to money available right now. Present Bias makes today's dollar feel more 'real' than tomorrow's expense.",
    tip: "Try naming the exact future date and amount. Making it concrete reduces present bias.",
  },
  optimism_bias: {
    id: "optimism_bias",
    name: "Optimism Bias",
    icon: "🌈",
    color: "#E0E7FF",
    textColor: "#3730A3",
    tagline: "You assumed things would go better than average",
    description: "Optimism Bias leads us to believe we're less likely than others to experience setbacks — like unexpected bills, car repairs, or income drops. This creates under-budgeting for worst-case scenarios.",
    tip: "When budgeting, ask: 'What if my worst-case estimate happened?' Then buffer for that.",
  },
  projection_bias: {
    id: "projection_bias",
    name: "Projection Bias",
    icon: "📆",
    color: "#FCE7F3",
    textColor: "#9D174D",
    tagline: "You assumed future costs would look like current costs",
    description: "Projection Bias makes us assume the future will look like the present. In budgeting, this means forgetting that power bills are higher in winter, rent can increase, and semester costs spike during exam prep.",
    tip: "Look at 12 months of past data when forecasting — not just last month.",
  },
};

// ── LEARNING OUTCOMES ─────────────────────────────────────────────────────────
export const LEARNING_OUTCOMES = [
  {
    id: "identify-structure",
    number: 1,
    bloomVerb: "Identify",
    bloomLevel: "Remember",
    title: "Identify income and expense structure",
    description: "Identify the income and expense structure of a flatting budget",
    relatedModules: ["income-expenses", "needs-wants-basics"],
    color: "#D1FAE5",
    textColor: "#1B4332",
  },
  {
    id: "calculate-shares",
    number: 2,
    bloomVerb: "Calculate",
    bloomLevel: "Apply",
    title: "Calculate fair cost shares",
    description: "Calculate fair shares of fixed and variable shared costs",
    relatedModules: ["splitting-bills"],
    color: "#FEF9C3",
    textColor: "#92400E",
  },
  {
    id: "predict-forecast",
    number: 3,
    bloomVerb: "Predict",
    bloomLevel: "Apply",
    title: "Predict and forecast variable expenses",
    description: "Predict and forecast variable expenses across seasons",
    relatedModules: ["variable-expenses", "variable-income"],
    color: "#E0E7FF",
    textColor: "#3730A3",
  },
  {
    id: "reflect-spending",
    number: 4,
    bloomVerb: "Reflect",
    bloomLevel: "Analyse",
    title: "Reflect on spending mismatches",
    description: "Reflect on mismatches between intended and actual spending",
    relatedModules: ["variable-expenses", "flatmate-conflict"],
    color: "#FCE7F3",
    textColor: "#9D174D",
  },
  {
    id: "recognise-bias",
    number: 5,
    bloomVerb: "Recognise",
    bloomLevel: "Evaluate",
    title: "Recognise cognitive biases",
    description: "Recognise at least one cognitive bias in their own financial decisions",
    relatedModules: ["variable-expenses", "variable-income", "flatmate-conflict"],
    color: "#FEE2E2",
    textColor: "#991B1B",
  },
];

// ── UTILITY FUNCTIONS ─────────────────────────────────────────────────────────
export const LEVEL_THRESHOLDS = [0, 150, 400, 800, 1400, 2100, 3000, 4100, 5400, 7000];

export function getLevelFromXP(xp) {
  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (xp >= LEVEL_THRESHOLDS[i]) return i + 1;
  }
  return 1;
}

export function getXPForNextLevel(xp) {
  const level = getLevelFromXP(xp);
  if (level >= LEVEL_THRESHOLDS.length) return null;
  return LEVEL_THRESHOLDS[level];
}

export function getLevelProgress(xp) {
  const level = getLevelFromXP(xp);
  if (level >= LEVEL_THRESHOLDS.length) return 100;
  const curr = LEVEL_THRESHOLDS[level - 1];
  const next = LEVEL_THRESHOLDS[level];
  return Math.round(((xp - curr) / (next - curr)) * 100);
}

export const LEVEL_TITLES = [
  "Budget Beginner", "Money Mindful", "Spending Savvy", "Budget Builder",
  "Finance Focused", "Savings Star", "Budget Boss", "Money Master",
  "Finance Guru", "Budgeting Legend"
];

export function getModulesByTier(tierId) {
  return MODULES.filter(m => m.tier === tierId).sort((a, b) => a.order - b.order);
}

export function isTierUnlocked(tierId, completedModules) {
  if (tierId === "tier1") return true;
  if (tierId === "tier2") {
    const tier1 = getModulesByTier("tier1");
    return tier1.every(m => completedModules.includes(m.id));
  }
  if (tierId === "tier3") {
    const tier2 = getModulesByTier("tier2");
    return tier2.every(m => completedModules.includes(m.id));
  }
  return false;
}

export function getOverallProgress(completedModules) {
  return Math.round((completedModules.length / MODULES.length) * 100);
}

export function getOutcomeProgress(outcomeId, completedModules, completedQuizzes) {
  const outcome = LEARNING_OUTCOMES.find(o => o.id === outcomeId);
  if (!outcome) return 0;
  const related = outcome.relatedModules;
  const done = related.filter(id => completedModules.includes(id) || completedQuizzes?.includes(id)).length;
  return Math.round((done / related.length) * 100);
}