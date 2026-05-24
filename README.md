# FlatWise — Personal Finance Learning Tool

An educational web app teaching university students personal finance skills through interactive modules.

## Educational Theories Applied
- **Situated Learning** — Real-world NZ flat scenarios
- **Scaffolded Learning (Vygotsky's ZPD)** — Progressive difficulty across 5 modules
- **Kolb's Learning Cycle** — Predict → Observe → Reflect → Apply
- **Bloom's Taxonomy** — Modules climb from Remember to Create
- **Active Learning** — Interactive categorisation, sliders, quizzes

## Modules
| Module | Topic | Bloom Level | XP |
|--------|-------|-------------|-----|
| 1 | Understanding flat costs | Remember → Understand | 40 |
| 2 | Splitting costs fairly | Apply | 60 |
| 3 | Variable bills season | Analyse | 60 |
| 4 | Surprise situations | Evaluate | 60 |
| 5 | Planning ahead | Create | 80 |

## Running the app

### Prerequisites
- Node.js 18+ ([download here](https://nodejs.org))

### Steps
```bash
# 1. Clone the repo
git clone https://github.com/SOFTENG701-2026/group1-flatwise.git
cd group1-flatwise

# 2. Install dependencies
npm install

# 3. Start the app
npm start
```

The app will open at http://localhost:3000

## Tech Stack
- React (Create React App)
- React Router DOM
- localStorage for progress tracking
- No external backend required
