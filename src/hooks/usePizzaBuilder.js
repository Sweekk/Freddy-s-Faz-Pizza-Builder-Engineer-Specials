// usePizzaBuilder.js — The brain of this chaotic pizza engine
import { useState, useCallback } from 'react';
import { getRandomJoke } from '../utils/jokes';

// Topping definitions — each has an emoji, label, FNAF flavor text, and color
export const TOPPINGS = [
  {
    id: 'pepperoni',
    label: 'Pepperoni',
    emoji: '🔴',
    icon: '🍕',
    fnafName: "Freddy's Favorite",
    color: '#c0392b',
    bgColor: '#2d0a0a',
    description: "Freddy-approved™",
  },
  {
    id: 'cheese',
    label: 'Cheese Overload',
    emoji: '🟡',
    icon: '🧀',
    fnafName: "Chica's Dream",
    color: '#f39c12',
    bgColor: '#2d1f0a',
    description: "Chica-certified™",
  },
  {
    id: 'mushrooms',
    label: 'Mushrooms',
    emoji: '🟤',
    icon: '🍄',
    fnafName: "Bonnie's Secret",
    color: '#8B6914',
    bgColor: '#1a1208',
    description: "Debugged by Bonnie™",
  },
  {
    id: 'olives',
    label: 'Olives',
    emoji: '⚫',
    icon: '🫒',
    fnafName: "Foxy's Hook",
    color: '#1a1a1a',
    bgColor: '#0a0a0a',
    description: "Pirate-coded™",
  },
  {
    id: 'sausage',
    label: 'Sausage',
    emoji: '🟠',
    icon: '🌭',
    fnafName: "Springtrap's Twist",
    color: '#8B2500',
    bgColor: '#1f0900',
    description: "Springlock certified™",
  },
];

// Fixed positions for toppings on the pizza (percentage-based for responsiveness)
const TOPPING_POSITIONS = [
  { top: '20%', left: '25%' },
  { top: '15%', left: '55%' },
  { top: '35%', left: '70%' },
  { top: '55%', left: '65%' },
  { top: '60%', left: '30%' },
  { top: '45%', left: '15%' },
  { top: '25%', left: '42%' },
  { top: '50%', left: '48%' },
  { top: '70%', left: '50%' },
  { top: '30%', left: '15%' },
  { top: '65%', left: '15%' },
  { top: '18%', left: '35%' },
];

const LOCALSTORAGE_KEY = 'freddys_most_cursed_pizza';

export function usePizzaBuilder() {
  const [toppings, setToppings] = useState([]); // array of { id, toppingId, position }
  const [isBaking, setIsBaking] = useState(false);
  const [currentJoke, setCurrentJoke] = useState(null);
  const [showJoke, setShowJoke] = useState(false);
  const [bakeCount, setBakeCount] = useState(0);

  // Add a topping — stacking allowed, Chica approved
  const addTopping = useCallback((toppingId) => {
    setToppings(prev => {
      const positionIndex = prev.length % TOPPING_POSITIONS.length;
      // Slightly randomize position so stacked toppings don't perfectly overlap
      const base = TOPPING_POSITIONS[positionIndex];
      const jitter = () => `${parseFloat(base.top) + (Math.random() * 8 - 4)}%`;
      const newTopping = {
        id: Date.now() + Math.random(), // unique key
        toppingId,
        position: {
          top: jitter(),
          left: `${parseFloat(base.left) + (Math.random() * 8 - 4)}%`,
        },
      };
      return [...prev, newTopping];
    });
  }, []);

  // Clear all toppings
  const resetPizza = useCallback(() => {
    setToppings([]);
    setCurrentJoke(null);
    setShowJoke(false);
  }, []);

  // BAKE THE PIZZA
  const bakePizza = useCallback(() => {
    if (isBaking) return;
    setIsBaking(true);

    // Save "most cursed pizza" to localStorage
    const toppingIds = toppings.map(t => t.toppingId);
    const counts = {};
    toppingIds.forEach(id => { counts[id] = (counts[id] || 0) + 1; });
    const cursedCombo = Object.entries(counts)
      .map(([id, count]) => `${count}x ${id}`)
      .join(', ');
    try {
      localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify({
        combo: cursedCombo,
        total: toppings.length,
        date: new Date().toISOString(),
      }));
    } catch (e) { /* localStorage blocked in some envs */ }

    // Determine joke
    const isEmpty = toppings.length === 0;
    const joke = getRandomJoke(isEmpty);

    // Fake bake time with drama
    setTimeout(() => {
      setIsBaking(false);
      setBakeCount(c => c + 1);
      setCurrentJoke(joke);
      setShowJoke(true);
    }, 2200);
  }, [toppings, isBaking]);

  const closeJoke = useCallback(() => {
    setShowJoke(false);
    setCurrentJoke(null);
  }, []);

  const canBake = toppings.length >= 3;
  const toppingCount = toppings.length;

  // Get counts per topping for display
  const toppingCounts = toppings.reduce((acc, t) => {
    acc[t.toppingId] = (acc[t.toppingId] || 0) + 1;
    return acc;
  }, {});

  return {
    toppings,
    addTopping,
    resetPizza,
    bakePizza,
    canBake,
    isBaking,
    toppingCount,
    toppingCounts,
    showJoke,
    currentJoke,
    closeJoke,
    bakeCount,
    TOPPINGS,
  };
}
