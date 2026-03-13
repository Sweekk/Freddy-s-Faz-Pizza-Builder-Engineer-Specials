// jokes.js — The sacred tome of FNAF engineering puns
// Each joke has: title, joke text, character emoji, subtitle flavor

export const jokes = [
  {
    id: 1,
    title: "Freddy's Over-Engineered Special",
    character: "🎩🐻",
    characterName: "FREDDY FAZBEAR",
    joke: "Why do engineers love Freddy's pizza? Infinite respawns — just like bugs in production! The CI/CD pipeline ran 47 times and still shipped at 6AM.",
    tag: "RUNTIME ERROR: DELICIOUS",
  },
  {
    id: 2,
    title: "Chica's Infinite Loop Pizza",
    character: "🍕🐔",
    characterName: "CHICA",
    joke: "Chica ordered this with extra cheese: Now it's got more dependencies than the entire Fazbear codebase. npm install took 3 nights to complete. IT'S ME was printed 847 times to console.",
    tag: "while(true) { addCheese(); }",
  },
  {
    id: 3,
    title: "Springlock OS Edition",
    character: "🐰💚",
    characterName: "SPRINGTRAP",
    joke: "This pizza runs on Springlock OS — one wrong move and it locks up forever. We deployed to production on a Friday. The on-call engineer is still in there. We don't talk about it.",
    tag: "CRITICAL FAILURE IMMINENT",
  },
  {
    id: 4,
    title: "Foxy's Pirate-Coded Toppings",
    character: "🏴‍☠️🦊",
    characterName: "FOXY",
    joke: "Foxy pirate-coded the toppings: 10/10 for speed, 2/10 for missing half the eye (eye patch). Move fast and break toppings. The sprint ended. The pizza was 'done'. Nobody checked the acceptance criteria.",
    tag: "SHIPPED IT. REGRETS IT.",
  },
  {
    id: 5,
    title: "Bonnie's One-Ear Debug Session",
    character: "🎸🐰",
    characterName: "BONNIE",
    joke: "Bonnie debugged this pizza so aggressively it only has one ear left. 'Have you tried turning the pizza off and on again?' — Bonnie, 3AM, red-eyed, console.log(pizza) everywhere.",
    tag: "undefined is not a topping",
  },
  {
    id: 6,
    title: "Afton's Abstraction Layer Stack",
    character: "👻🔧",
    characterName: "WILLIAM AFTON",
    joke: "This pizza has more layers than Afton's family trauma — classic over-abstraction! 14 wrapper components, 3 context providers, and a HOC nobody asked for. The sauce is now a microservice.",
    tag: "I ALWAYS COME BACK (to legacy code)",
  },
  {
    id: 7,
    title: "The Purple Guy's Git History",
    character: "🟣👾",
    characterName: "THE PURPLE GUY",
    joke: "The git blame on this pizza points to one suspicious commit: 'misc changes' by user 'dontlookatme' at 2:13AM. The commit message was 'trust me bro'. 847 files changed. No PR. No review.",
    tag: "git push --force (always)",
  },
  {
    id: 8,
    title: "Golden Freddy's Memory Leak",
    character: "⭐🐻",
    characterName: "GOLDEN FREDDY",
    joke: "This pizza appeared in the repo with no commit history. The ingredients are undefined yet somehow render. The RAM usage is inexplicably 98%. Closing the tab makes it worse. IT'S STILL THERE.",
    tag: "NULL POINTER TO THE SOUL",
  },
  {
    id: 9,
    title: "The Marionette's Event Loop",
    character: "🎭🎪",
    characterName: "THE MARIONETTE",
    joke: "The Marionette controls the pizza with callbacks nested 12 layers deep — true callback hell, circa 2012. The promise chain is so long it achieved sentience. It asked for a raise. We gave it a pizza.",
    tag: "CALLBACK(CALLBACK(CALLBACK(hell)))",
  },
  {
    id: 10,
    title: "Mangle's Microservices Disaster",
    character: "🤖🔩",
    characterName: "MANGLE",
    joke: "Mangle was 'improved' by the engineers until it became unrecognizable — just like our monolith after 3 years of 'quick refactors'. Now it's 47 microservices. One of them is just a pizza. Nobody knows which.",
    tag: "REFACTOR COMPLETE. NOTHING WORKS.",
  },
  {
    id: 11,
    title: "Nightmare Freddy's Tech Debt",
    character: "😱🐻",
    characterName: "NIGHTMARE FREDDY",
    joke: "This pizza was built on top of the original 1987 recipe with 'minor updates'. The flour import is deprecated. The sauce is PHP 5.6. The TODO comments outnumber the actual ingredients. Sleep paralysis has better architecture.",
    tag: "TODO: fix this before launch (2019)",
  },
  {
    id: 12,
    title: "Baby's AI-Generated Requirements",
    character: "🤖👧",
    characterName: "CIRCUS BABY",
    joke: "The pizza requirements were written by AI and nobody read them. Somehow the pizza collects children AND violates GDPR. The product manager said 'make it pop'. The engineers wept. The pizza wept louder.",
    tag: "REQUIREMENTS.EXE HAS STOPPED WORKING",
  },
  {
    id: 0,
    title: "The Empty Pizza Protocol",
    character: "❓👁️",
    characterName: "THE VOID",
    joke: "Plain pizza? That's what happens when engineers forget requirements. The Jira ticket said 'make pizza'. No acceptance criteria. No wireframes. Just vibes and a deadline of 'yesterday'. This is the result.",
    tag: "FEATURE REQUEST: TOPPINGS",
    isEmpty: true,
  },
];

// Returns a random joke (excluding the empty one unless explicitly requested)
export const getRandomJoke = (isEmpty = false) => {
  if (isEmpty) return jokes.find(j => j.isEmpty);
  const pool = jokes.filter(j => !j.isEmpty);
  return pool[Math.floor(Math.random() * pool.length)];
};
