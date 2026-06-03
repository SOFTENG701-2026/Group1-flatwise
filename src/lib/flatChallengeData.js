export const FLAT_VISUALISATION_ITEMS = {
  sofa: { emoji: "🛋️", label: "Sofa", default: true },
  kettle: { emoji: "☕", label: "Kettle", default: true },
  plant: { emoji: "🪴", label: "Plant", default: false },
  tv: { emoji: "📺", label: "TV", default: false },
  rug: { emoji: "🟫", label: "Rug", default: false },
  bookshelf: { emoji: "📚", label: "Bookshelf", default: false },
  coffee_table: { emoji: "🪑", label: "Coffee Table", default: false },
  artwork: { emoji: "🖼️", label: "Artwork", default: false },
  fairy_lights: { emoji: "✨", label: "Fairy Lights", default: false },
  cat: { emoji: "🐱", label: "Flat Cat", default: false },
};

export const WEEKLY_CHALLENGES = [
  {
    id: "module-sprint-1",
    type: "sprint",
    emoji: "🏃",
    title: "Module Sprint",
    description: "Everyone in the flat completes at least one module this week. Learning together builds shared vocabulary around money.",
    daysLeft: 5,
    theoryTag: { label: "Social Constructivism", color: "#D1FAE5", text: "#1B4332" },
    reward: {
      xpBonus: 50,
      itemId: "plant",
      itemLabel: "Flat Plant 🪴",
      description: "Your flat completed a module sprint together — you've earned a plant for your space!"
    }
  },
  {
    id: "predict-together-1",
    type: "prediction",
    emoji: "🔮",
    title: "Predict Together",
    description: "Everyone submits a prediction for this week's question, then compares answers. No wrong answers — just discussion.",
    daysLeft: 6,
    theoryTag: { label: "Kolb: predict → reflect", color: "#FEF9C3", text: "#92400E" },
    scenario: {
      title: "How much does the average NZ student spend on groceries per month?",
      unit: "Enter your estimate in dollars",
      actualLabel: "$200–$280/month (Stats NZ 2024)"
    },
    reward: {
      xpBonus: 30,
      itemId: "coffee_table",
      itemLabel: "Coffee Table ☕",
      description: "Your flat predicted together and revealed the actual figure. Knowledge shared is knowledge doubled."
    }
  },
  {
    id: "quiz-streak-1",
    type: "sprint",
    emoji: "⚡",
    title: "Quiz Streak",
    description: "Every flatmate completes a quiz this week. Combined correct answers unlock a shared reward.",
    daysLeft: 7,
    theoryTag: { label: "Bloom: Evaluate", color: "#FCE7F3", text: "#9D174D" },
    reward: {
      xpBonus: 40,
      itemId: "bookshelf",
      itemLabel: "Bookshelf 📚",
      description: "Your flat aced a quiz streak! A bookshelf has been added to your flat."
    }
  },
  {
    id: "predict-together-2",
    type: "prediction",
    emoji: "💡",
    title: "Power Bill Prediction",
    description: "Predict how much a 4-person Wellington flat spends on power in July. Compare with your flatmates.",
    daysLeft: 4,
    theoryTag: { label: "Kolb: predict → reflect", color: "#FEF9C3", text: "#92400E" },
    scenario: {
      title: "Monthly power bill for 4 people in Wellington, July",
      unit: "Enter your estimate in dollars",
      actualLabel: "$220–$320/month (Powerswitch NZ avg)"
    },
    reward: {
      xpBonus: 25,
      itemId: "fairy_lights",
      itemLabel: "Fairy Lights ✨",
      description: "You predicted your power bill together — now you can actually see the light!"
    }
  }
];