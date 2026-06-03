export const BUDGETS = [
  {
    id: "alex-march",
    title: "Alex's March Budget",
    subtitle: "Find the 3 hidden errors",
    dateNote: "March 2024 — Monthly budget",
    headerNote: "Part-time worker, first year",
    summary: [
      "Always verify arithmetic with a calculator — small errors compound over months.",
      "Benchmark variable costs against realistic averages before finalising.",
      "Total lines should always be re-summed after any line item change.",
    ],
    biasCard: {
      name: "Optimism Bias",
      description: "We tend to underestimate costs we don't want to think about (like food). Always ask: 'Is this realistic, or just what I wish it would be?'"
    },
    sections: [
      {
        heading: "Income",
        items: [
          {
            id: "income-1",
            label: "Part-time work (20hrs @ $23/hr)",
            value: "$480",
            isMistake: true,
            correctValue: "$460",
            mistake: {
              number: 1,
              type: "Arithmetic Error",
              explanation: "20 × $23 = $460, not $480. Alex is off by $20 — likely a mental-math slip.",
              consequence: "Overestimating income means Alex thinks they have $20 more than they do. Over 6 months that's a $120 shortfall they haven't planned for.",
              chartData: { label: "Monthly income comparison", estimate: 480, realistic: 460, unit: "" }
            }
          }
        ]
      },
      {
        heading: "Fixed Expenses",
        items: [
          { id: "rent-1", label: "Weekly rent ($210/wk × 4)", value: "$840", isMistake: false },
          { id: "phone-1", label: "Phone plan", value: "$35", isMistake: false },
          { id: "transport-1", label: "Bus pass", value: "$65", isMistake: false },
        ]
      },
      {
        heading: "Variable Expenses",
        items: [
          {
            id: "groceries-1",
            label: "Groceries",
            value: "$80",
            isMistake: true,
            correctValue: "$200–$280",
            mistake: {
              number: 2,
              type: "Unrealistic Estimate",
              explanation: "The average NZ student spends $200–$280/month on groceries. $80 is less than $3/day — impossible to sustain a healthy diet.",
              consequence: "This will blow out in practice. Alex will overspend by ~$120–$200/month without realising why the budget isn't working.",
              chartData: { label: "Monthly grocery spend", estimate: 80, realistic: 240, unit: "" }
            }
          },
          { id: "entertainment-1", label: "Eating out + social", value: "$140", isMistake: false },
        ]
      },
      {
        heading: "Summary",
        items: [
          { id: "total-income-1", label: "TOTAL INCOME", value: "$480", isMistake: false },
          { id: "total-expenses-1", label: "TOTAL EXPENSES", value: "$1,180", isMistake: true, correctValue: "$1,160",
            mistake: {
              number: 3,
              type: "Addition Error",
              explanation: "Adding up the expenses: $840 + $35 + $65 + $80 + $140 = $1,160, not $1,180. Alex is off by $20 in the total line.",
              consequence: "Alex thinks they have $20 less surplus than they actually do. This kind of error makes budgets feel tighter than they are — leading to unnecessary anxiety or poor decisions.",
              chartData: null
            }
          },
        ]
      }
    ]
  },
  {
    id: "priya-july",
    title: "Priya's July Budget",
    subtitle: "Spot the seasonal blind spots",
    dateNote: "July 2024 — Monthly budget",
    headerNote: "Copied from March — not adjusted for winter",
    summary: [
      "Power bills in NZ winter (June–August) are typically 2–3× higher than summer.",
      "Seasonal one-off costs (clothing, heating) must be added month-by-month.",
      "Savings goals are only achievable when your actual surplus is positive.",
    ],
    biasCard: {
      name: "Status Quo Bias",
      description: "We tend to copy last month's budget rather than thinking through what's actually different. Seasonal costs are the most common victim of this bias."
    },
    sections: [
      {
        heading: "Income",
        items: [
          { id: "income-2", label: "Casual work", value: "$460", isMistake: false },
        ]
      },
      {
        heading: "Fixed Expenses",
        items: [
          { id: "rent-2", label: "Rent", value: "$880", isMistake: false },
          {
            id: "power-2",
            label: "Power bill (copied from March)",
            value: "$55",
            isMistake: true,
            correctValue: "$110–$160",
            mistake: {
              number: 1,
              type: "Seasonal Error",
              explanation: "Priya copied her March power figure into July. NZ winter bills are 2–3× higher due to heating. A realistic July bill is $110–$160.",
              consequence: "Priya will be short by $55–$105 just on power alone. This is the most common seasonal budgeting mistake in New Zealand.",
              chartData: { label: "Monthly power bill: March vs July", estimate: 55, realistic: 135, unit: "" }
            }
          },
          { id: "internet-2", label: "Internet", value: "$35", isMistake: false },
        ]
      },
      {
        heading: "Variable Expenses",
        items: [
          { id: "groceries-2", label: "Groceries", value: "$220", isMistake: false },
          { id: "transport-2", label: "Bus pass", value: "$65", isMistake: false },
          {
            id: "clothing-2",
            label: "Winter clothing",
            value: "$0",
            isMistake: true,
            correctValue: "$80–$200",
            mistake: {
              number: 2,
              type: "Missing Seasonal Item",
              explanation: "Priya moved from Auckland and doesn't own proper winter gear. July is peak winter — warm clothing can cost $80–$200 for a student buying second-hand.",
              consequence: "Zero-budgeting a seasonal need doesn't make it disappear — it creates an unplanned credit card spend in week 2 of July.",
              chartData: null
            }
          },
          { id: "entertainment-2", label: "Social / eating out", value: "$100", isMistake: false },
        ]
      },
      {
        heading: "Savings",
        items: [
          {
            id: "savings-2",
            label: "Savings goal",
            value: "$200",
            isMistake: true,
            correctValue: "$0 (surplus is negative)",
            mistake: {
              number: 3,
              type: "Logic Error — Impossible Goal",
              explanation: "With corrected power ($135) and clothing ($150), Priya's expenses total ~$1,650 against income of $460. Her surplus is negative before savings.",
              consequence: "Setting a savings target when you're already in deficit doesn't create savings — it creates debt. Priya needs to cut expenses first.",
              chartData: null
            }
          },
        ]
      }
    ]
  },
  {
    id: "tom-october",
    title: "Tom's October Budget",
    subtitle: "Catch the double-counting & omissions",
    dateNote: "October 2024 — Moving month budget",
    headerNote: "First time in a flat",
    summary: [
      "Moving month always costs more than expected — budget a 15% contingency buffer.",
      "Double-counting a line item inflates expenses and makes planning unreliable.",
      "Second-hand doesn't mean free — furniture costs $250–$600 even from Trade Me.",
    ],
    biasCard: {
      name: "Planning Fallacy",
      description: "We consistently underestimate how much time and money tasks will cost, especially for novel situations like moving into a first flat. Buffer by 20% for any new experience."
    },
    sections: [
      {
        heading: "Move-in Costs (One-off)",
        items: [
          { id: "bond-3", label: "Bond (4 weeks rent)", value: "$960", isMistake: false },
          { id: "rent-first-3", label: "First month rent", value: "$960", isMistake: false },
          {
            id: "furniture-3",
            label: "Second-hand furniture (Trade Me estimate)",
            value: "$60",
            isMistake: true,
            correctValue: "$250–$600",
            mistake: {
              number: 1,
              type: "Severe Underestimate",
              explanation: "Tom estimated $60 for furniture. A bed frame alone is $100–$180 second-hand. Add a desk and chair and you're at $250–$500 minimum from Trade Me or Facebook Marketplace.",
              consequence: "Tom will overspend his furniture budget by 4–10× and cover the gap on credit, starting flat life in debt.",
              chartData: { label: "Furniture budget vs. reality", estimate: 60, realistic: 380, unit: "" }
            }
          },
        ]
      },
      {
        heading: "Monthly Expenses",
        items: [
          {
            id: "rent-double-3",
            label: "Rent ($240/wk × 4 weeks)",
            value: "$960",
            isMistake: true,
            correctValue: "Remove — duplicate",
            mistake: {
              number: 2,
              type: "Double-Counting Error",
              explanation: "Tom already listed 'First month rent: $960' in move-in costs above. This is the same expense entered twice — inflating his total by $960.",
              consequence: "Double-counting makes the budget look $960 worse than it is. Tom might panic-cut other items unnecessarily or conclude moving is unaffordable.",
              chartData: null
            }
          },
          { id: "groceries-3", label: "Groceries", value: "$220", isMistake: false },
          { id: "internet-3", label: "Internet setup + first month", value: "$130", isMistake: false },
          { id: "transport-3", label: "Bus pass", value: "$65", isMistake: false },
        ]
      },
      {
        heading: "Safety Net",
        items: [
          {
            id: "emergency-3",
            label: "Emergency buffer",
            value: "$0",
            isMistake: true,
            correctValue: "$200–$350",
            mistake: {
              number: 3,
              type: "Missing Item — High Risk",
              explanation: "Moving month is the highest-risk month for unexpected costs: a broken appliance, a missing household item, a late flatmate payment. Tom has zero contingency.",
              consequence: "The first unexpected cost will send Tom to his overdraft. A $200–$350 buffer at move-in is standard financial hygiene for any first-time renter.",
              chartData: null
            }
          },
        ]
      }
    ]
  }
];