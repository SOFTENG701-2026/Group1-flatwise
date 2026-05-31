export const NEGOTIATION_SCENARIOS = [
  {
    id: "internet-bill",
    title: "The Internet Bill",
    subtitle: "Who pays for the upgrade?",
    bannerEmoji: "📶",
    flatmateName: "Jordan",
    flatmateAvatar: { initials: "JO", color: "#8B5CF6" },
    openingMessage: "Hey, can we upgrade the internet? I'm getting terrible speeds for my work calls. The $100 plan is way better — we'd split it 50/50 obviously.",
    chips: [
      { value: "$60→$100", label: "Monthly cost" },
      { value: "2 people", label: "Flatmates" },
      { value: "WFH", label: "Jordan's need" },
    ],
    rounds: [
      {
        id: "r1",
        options: [
          {
            text: "Sure, 50/50 sounds fair.",
            tone: "Accommodating",
            flatmateReply: "Sweet, I'll set it up tonight!",
            outcome: { emoji: "😐", result: "Agreement reached, but you're paying equally for something Jordan needs more.", relationship: 70, financial: 40 }
          },
          {
            text: "Can we split it based on usage? You work from home.",
            tone: "Assertive & fair",
            flatmateReply: "That's a fair point actually. What split did you have in mind?",
            outcome: { emoji: "✅", result: "Jordan is open to a proportional split. Great opening.", relationship: 75, financial: 70 }
          },
          {
            text: "I don't think we need it. I'm fine with the current plan.",
            tone: "Dismissive",
            flatmateReply: "Okay... I guess I'll just deal with it. Whatever.",
            outcome: { emoji: "😬", result: "Jordan feels frustrated. The tension lingers.", relationship: 30, financial: 60 }
          },
        ]
      },
      {
        id: "r2",
        options: [
          {
            text: "60% you, 40% me — you use it for work.",
            tone: "Proportional",
            flatmateReply: "That actually makes sense. Let's do that.",
            outcome: { emoji: "🤝", result: "Fair split agreed. Both feel the outcome is reasonable.", relationship: 80, financial: 75 }
          },
          {
            text: "Let's just do 50/50 to keep things simple.",
            tone: "Cooperative",
            flatmateReply: "Yeah sure, easy. Thanks for being flexible.",
            outcome: { emoji: "😊", result: "Simple and clean. Jordan appreciates you not overcomplicating it.", relationship: 75, financial: 45 }
          },
          {
            text: "You should pay 80% — it's your work, not mine.",
            tone: "Aggressive",
            flatmateReply: "Wow, okay. That feels a bit much honestly.",
            outcome: { emoji: "😤", result: "Technically defensible, socially awkward. Jordan feels ambushed.", relationship: 35, financial: 80 }
          },
        ]
      },
      {
        id: "r3",
        options: [
          {
            text: "Let's do a 30-day trial and reassess if it's not better.",
            tone: "Pragmatic",
            flatmateReply: "Love that. Gives us a clear out if it doesn't work.",
            outcome: { emoji: "🏆", result: "You've built a habit of reviewing shared expenses. Best outcome.", relationship: 90, financial: 80 }
          },
          {
            text: "Sure. If it's not faster, we downgrade.",
            tone: "Direct",
            flatmateReply: "Fair enough. Deal.",
            outcome: { emoji: "✅", result: "Practical and fair. Jordan nods.", relationship: 75, financial: 70 }
          },
          {
            text: "Whatever, just set it up.",
            tone: "Disengaged",
            flatmateReply: "...okay.",
            outcome: { emoji: "😕", result: "Jordan feels dismissed. Agreement made but vibe is off.", relationship: 45, financial: 50 }
          },
        ]
      }
    ],
    whatWorked: [
      "Raising the usage-proportionality point early",
      "Proposing a trial period instead of a permanent commitment",
      "Staying calm and not making it personal",
    ],
    negotiationPrinciple: {
      name: "Interests vs. Positions",
      description: "Jordan's position was '50/50.' Their interest was reliable work connectivity. Uncovering the underlying interest opens up fairer, more creative solutions."
    }
  },
  {
    id: "cleaning-dispute",
    title: "The Cleaning Roster",
    subtitle: "Why is the kitchen always a mess?",
    bannerEmoji: "🧹",
    flatmateName: "Sam",
    flatmateAvatar: { initials: "SA", color: "#F59E0B" },
    openingMessage: "Sorry about the kitchen — exams have been brutal. I'll clean it this weekend, I promise.",
    chips: [
      { value: "3 weeks", label: "Pattern length" },
      { value: "Exams", label: "Sam's excuse" },
      { value: "No roster", label: "Current system" },
    ],
    rounds: [
      {
        id: "r1",
        options: [
          {
            text: "No worries, good luck with exams!",
            tone: "Passive",
            flatmateReply: "Thanks 😊 I'll sort it soon.",
            outcome: { emoji: "😐", result: "Sam feels relieved. But nothing changes — the pattern repeats next week.", relationship: 60, financial: 50 }
          },
          {
            text: "I get it. Can we set up a simple roster so it's clearer going forward?",
            tone: "Constructive",
            flatmateReply: "A roster sounds good actually. How should we divide it?",
            outcome: { emoji: "✅", result: "Sam appreciates you being constructive, not accusatory.", relationship: 80, financial: 60 }
          },
          {
            text: "This has been going on for 3 weeks, not just exams.",
            tone: "Accusatory",
            flatmateReply: "Wow, okay. I said I'd sort it...",
            outcome: { emoji: "😬", result: "True, but the delivery stings. Sam gets defensive.", relationship: 30, financial: 50 }
          },
        ]
      },
      {
        id: "r2",
        options: [
          {
            text: "Alternate weeks — one does kitchen, other does bathroom.",
            tone: "Clear and fair",
            flatmateReply: "That works! I'll write it on the fridge.",
            outcome: { emoji: "🏆", result: "Clear, simple, and fair. Sam writes it on the fridge that night.", relationship: 90, financial: 65 }
          },
          {
            text: "Clean up after yourself + a shared deep clean monthly.",
            tone: "Flexible",
            flatmateReply: "I can try that. Makes sense.",
            outcome: { emoji: "✅", result: "Works in theory. Needs follow-through, but Sam agrees to try.", relationship: 70, financial: 60 }
          },
          {
            text: "You should do the kitchen every week — you make the most mess.",
            tone: "Blunt",
            flatmateReply: "That's really unfair to say.",
            outcome: { emoji: "😤", result: "Sam shuts down. Technically maybe true — cruel to say directly.", relationship: 20, financial: 55 }
          },
        ]
      },
      {
        id: "r3",
        options: [
          {
            text: "Give each other a heads up if life gets crazy — no guilt, just communicate.",
            tone: "Empathetic",
            flatmateReply: "That's really mature. I appreciate that.",
            outcome: { emoji: "🏆", result: "Gold standard answer. Your flat runs better from now on.", relationship: 95, financial: 65 }
          },
          {
            text: "We swap weeks rather than skip.",
            tone: "Practical",
            flatmateReply: "Yeah that makes sense, nothing slips then.",
            outcome: { emoji: "✅", result: "Means nothing ever truly slips through.", relationship: 75, financial: 60 }
          },
          {
            text: "Then the other person is owed a favour I guess.",
            tone: "Transactional",
            flatmateReply: "Uh... sure, I guess.",
            outcome: { emoji: "😕", result: "Vague and transactional. Fragile as a system.", relationship: 50, financial: 55 }
          },
        ]
      }
    ],
    whatWorked: [
      "Addressing the system (roster) rather than Sam's character",
      "Acknowledging exam stress before raising the issue",
      "Building in a communication norm for when life gets busy",
    ],
    negotiationPrinciple: {
      name: "Separate the Person from the Problem",
      description: "Sam isn't a messy person — they're under exam stress. Addressing the pattern, not the person, keeps the conversation constructive and preserves the relationship."
    }
  },
  {
    id: "noise-conflict",
    title: "Late Night Noise",
    subtitle: "You have a 9am lecture tomorrow.",
    bannerEmoji: "🎧",
    flatmateName: "Alex",
    flatmateAvatar: { initials: "AL", color: "#EF4444" },
    openingMessage: "Come join us! 🎉",
    chips: [
      { value: "1am", label: "Current time" },
      { value: "9am", label: "Your lecture" },
      { value: "Tuesday", label: "School night" },
    ],
    rounds: [
      {
        id: "r1",
        options: [
          {
            text: "Hey, could you keep it down? I have a 9am lecture 🙏",
            tone: "Polite request",
            flatmateReply: "Oh sorry! Yeah we'll turn it down.",
            outcome: { emoji: "✅", result: "Alex is a bit embarrassed but turns it down. Most people respect a polite ask.", relationship: 70, financial: 55 }
          },
          {
            text: "Can you move to the lounge and close doors? Bedroom walls are thin.",
            tone: "Specific & actionable",
            flatmateReply: "Of course! Sorry, hadn't thought about that.",
            outcome: { emoji: "🏆", result: "Specific and actionable. Alex says of course — hadn't thought about it.", relationship: 85, financial: 55 }
          },
          {
            text: "Can you just leave?? I'm trying to sleep!",
            tone: "Aggressive",
            flatmateReply: "Woah... okay that was unnecessary.",
            outcome: { emoji: "😤", result: "Alex's friends are shocked. The vibe is ruined and Alex is angry.", relationship: 15, financial: 50 }
          },
        ]
      },
      {
        id: "r2",
        options: [
          {
            text: "Yes — quiet after midnight on school nights?",
            tone: "Norm-building",
            flatmateReply: "That's fair, yeah. Let's make that a house rule.",
            outcome: { emoji: "🏆", result: "You've turned a conflict into a house norm.", relationship: 90, financial: 55 }
          },
          {
            text: "Maybe just give me a heads up when you have people over.",
            tone: "Flexible",
            flatmateReply: "Yeah I should have done that. I'll text next time.",
            outcome: { emoji: "✅", result: "Flexible and respectful. Alex likes that it's not a hard rule.", relationship: 80, financial: 55 }
          },
          {
            text: "I'd prefer no guests on weeknights honestly.",
            tone: "Firm",
            flatmateReply: "That feels pretty restrictive...",
            outcome: { emoji: "😬", result: "Reasonable but strict. Alex feels like they're living in a library.", relationship: 45, financial: 55 }
          },
        ]
      },
      {
        id: "r3",
        options: [
          {
            text: "All good. Appreciate you being understanding 😊",
            tone: "Gracious",
            flatmateReply: "No worries. We'll be better about it.",
            outcome: { emoji: "🏆", result: "Perfect close. Conflict resolved and relationship stronger than before.", relationship: 95, financial: 55 }
          },
          {
            text: "Thanks. Next time just give me a heads up.",
            tone: "Direct",
            flatmateReply: "Will do.",
            outcome: { emoji: "✅", result: "Practical and clear. Alex nods.", relationship: 75, financial: 55 }
          },
          {
            text: "It's fine... (walks away)",
            tone: "Withdrawn",
            flatmateReply: "...are you sure?",
            outcome: { emoji: "😕", result: "Unresolved tension. Alex isn't sure if you're actually okay.", relationship: 50, financial: 55 }
          },
        ]
      }
    ],
    whatWorked: [
      "Making a specific, actionable request rather than a vague complaint",
      "Turning the conflict into an opportunity to set a house norm",
      "Closing the conversation graciously, not with lingering tension",
    ],
    negotiationPrinciple: {
      name: "Specific Requests Get Better Results",
      description: "'Keep it down' is vague. 'Move to the lounge and close the door' is actionable. The more concrete your ask, the more likely it is to be followed — and remembered."
    }
  }
];