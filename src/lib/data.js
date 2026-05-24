export const MODULES = [
  {
    id: 'module1',
    title: 'Understanding flat costs',
    subtitle: 'Bills, bond, shared expenses',
    tier: 1,
    xp: 40,
    duration: '~8 min',
    unlocked: true,
    bloomLevel: 'Remember → Understand',
    learningOutcome: 'Recognise typical income sources and expenses in a flat budget',
    activities: ['explainer', 'categorise', 'quiz'],
  },
  {
    id: 'module2',
    title: 'Splitting costs fairly',
    subtitle: 'Fixed vs variable, fair splits',
    tier: 1,
    xp: 60,
    duration: '~10 min',
    unlocked: false,
    bloomLevel: 'Apply',
    learningOutcome: "Calculate each flatmate's fair share when usage or time isn't equal",
    activities: ['predict', 'reveal', 'quiz'],
  },
  {
    id: 'module3',
    title: 'Variable bills season',
    subtitle: 'Winter power, usage spikes',
    tier: 2,
    xp: 60,
    duration: '~10 min',
    unlocked: false,
    bloomLevel: 'Analyse',
    learningOutcome: 'Estimate a variable bill before seeing the answer',
    activities: ['predict', 'reveal', 'quiz'],
  },
  {
    id: 'module4',
    title: 'Surprise situations',
    subtitle: 'Appliances, flatmate leaves',
    tier: 2,
    xp: 60,
    duration: '~12 min',
    unlocked: false,
    bloomLevel: 'Evaluate',
    learningOutcome: "Identify what you'd do differently after seeing an actual bill outcome",
    activities: ['scenario', 'quiz'],
  },
  {
    id: 'module5',
    title: 'Planning ahead',
    subtitle: 'Full semester budget',
    tier: 3,
    xp: 80,
    duration: '~15 min',
    unlocked: false,
    bloomLevel: 'Create',
    learningOutcome: 'Apply budgeting strategies to respond to an unexpected flatting situation',
    activities: ['budget', 'quiz'],
  },
];

export const EXPLAINER_ITEMS = [
  {
    id: 'rent',
    name: 'Rent',
    type: 'Fixed',
    icon: '🏠',
    description: 'Same amount every week or fortnight. Split between all flatmates. Usually your biggest cost.',
  },
  {
    id: 'bond',
    name: 'Bond',
    type: 'Fixed',
    icon: '🔑',
    description: 'Paid once at the start — usually 4 weeks rent. Held by Tenancy Services NZ and returned when you leave (if no damage).',
  },
  {
    id: 'power',
    name: 'Power',
    type: 'Variable',
    icon: '⚡',
    description: 'Changes every month based on usage. Can be 2–3x higher in winter due to heating.',
  },
  {
    id: 'internet',
    name: 'Internet',
    type: 'Fixed',
    icon: '📶',
    description: 'Usually a fixed monthly plan. Split evenly between flatmates.',
  },
  {
    id: 'contents',
    name: 'Contents insurance',
    type: 'Fixed',
    icon: '🛡️',
    description: 'Protects your belongings. Often overlooked by first-time flatters — but important.',
  },
];

export const CATEGORISE_ITEMS = [
  { id: 'rent', label: 'Rent', correct: 'Fixed' },
  { id: 'power', label: 'Power', correct: 'Variable' },
  { id: 'internet', label: 'Internet', correct: 'Fixed' },
  { id: 'bond', label: 'Bond', correct: 'Fixed' },
  { id: 'petrol', label: 'Petrol', correct: 'Variable' },
  { id: 'phone', label: 'Phone plan', correct: 'Fixed' },
  { id: 'gas', label: 'Gas heating', correct: 'Variable' },
  { id: 'water', label: 'Water', correct: 'Variable' },
  { id: 'contents', label: 'Contents insurance', correct: 'Fixed' },
];

export const MODULE1_QUIZ = [
  {
    id: 'q1',
    question: "Your flat receives a bill that's a different amount every month. What type of cost is this?",
    hint: 'Think back to the explainer — what made fixed and variable costs different?',
    options: [
      { id: 'a', text: 'Fixed — because it comes every month' },
      { id: 'b', text: 'Variable — because the amount changes based on usage', correct: true },
      { id: 'c', text: 'Optional — you can choose not to pay it' },
    ],
    explanation: 'Variable costs change based on how much you use — power is the most common example in a NZ flat. Fixed costs like rent stay the same regardless of usage.',
  },
  {
    id: 'q2',
    question: 'Which of these is a fixed cost in a typical NZ flat?',
    hint: 'Fixed costs stay the same every payment period.',
    options: [
      { id: 'a', text: 'Power bill' },
      { id: 'b', text: 'Petrol' },
      { id: 'c', text: 'Internet plan', correct: true },
    ],
    explanation: 'Internet plans are usually a fixed monthly amount. Power and petrol vary based on usage.',
  },
];

export const MODULE2_SCENARIO = {
  month: 'July',
  city: 'Auckland',
  flatmates: 4,
  absentWeeks: 2,
  knownCosts: {
    rent: 2400,
    internet: 80,
  },
  actualBill: 224,
  perPerson: 56,
  context: "It's July — coldest month. Electric heating running daily, everyone home most days this semester.",
};

export const MODULE2_QUIZ = [
  {
    id: 'q1',
    question: "Your flat's power bill is $240 in July. There are 4 flatmates. One was away for 2 of the 4 weeks. What's the fairest split?",
    hint: 'Think about proportional usage — who was actually there using power?',
    options: [
      { id: 'a', text: "Split evenly — $60 each, absence doesn't matter" },
      { id: 'b', text: 'Charge the person home most the full amount' },
      { id: 'c', text: '3 people pay full share, absent flatmate pays half — proportional to usage', correct: true },
    ],
    explanation: 'Proportional splitting is fairest. The absent flatmate used about half the power, so pays half their share. The others split the remaining amount.',
  },
];
