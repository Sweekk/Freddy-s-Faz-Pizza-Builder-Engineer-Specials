# 🍕🐻 Freddy's Faz-Pizza Builder — Engineer Specials

> *"Where Fantasy and Fun Come to Life... and So Do the Bugs"*

A completely useless, entirely delightful FNAF-themed pizza toy that reveals engineering jokes starring your favorite animatronics.

## 🚀 Quick Start

```bash
npm install
npm run dev
```
Then open [http://localhost:5173](http://localhost:5173) and start ruining pizzas.

## ✨ Features

- 🎩 Dark FNAF pizzeria aesthetic with CRT scanlines + neon glow
- 🍕 5 FNAF-themed toppings (stacking allowed — Chica approved)
- 🔥 Bake button unlocks after 3+ toppings
- 😂 12 random engineering-pun joke cards on bake
- 💾 LocalStorage saves your "most cursed pizza"
- ⚠️ "IT'S ME" flash during baking
- 📱 Responsive (mobile ok, desktop best)
- 🎮 Pixel font (Press Start 2P)

## 🛠️ Tech Stack

- **React 19** (Vite 8)
- **Tailwind CSS v4** (`@tailwindcss/vite`)
- **Framer Motion** (topping animations + joke card reveal)

## 📁 Project Structure

```
src/
├── components/
│   ├── Header.jsx         ← Rotating marquee neon sign
│   ├── PizzaBase.jsx      ← Animated SVG pizza circle
│   ├── PizzaCanvas.jsx    ← Topping placement renderer
│   ├── ToppingButton.jsx  ← Clickable topping selector
│   ├── ToppingsPanel.jsx  ← Left sidebar with bake button
│   └── JokeCard.jsx       ← Full-screen joke reveal
├── hooks/
│   └── usePizzaBuilder.js ← All pizza state logic
├── utils/
│   └── jokes.js           ← 12 FNAF engineering puns
├── App.jsx
├── main.jsx
└── index.css              ← CRT scanlines + neon effects
```

## 🎭 The Joke Roster

- Freddy's Over-Engineered Special (infinite respawn bugs)
- Chica's Infinite Loop Pizza (dependency hell)
- Springlock OS Edition (Friday deploy horror)
- Foxy's Pirate-Coded Toppings (move fast, miss eye)
- Bonnie's One-Ear Debug Session (console.log everywhere)
- Afton's Abstraction Layer Stack (over-engineering)
- The Purple Guy's Git History (`git push --force`)
- Golden Freddy's Memory Leak (NULL pointer to the soul)
- The Marionette's Callback Hell (2012 JavaScript)
- Mangle's Microservices Disaster (47 services, 1 pizza)
- Nightmare Freddy's Tech Debt (PHP 5.6 sauce)
- Baby's AI-Generated Requirements (GDPR violations)

---

*Fazbear Entertainment LLC is not responsible for springlock failures, git history trauma, or unresolved promises.*
