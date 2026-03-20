// usePizzaBuilder.js — The brain of this chaotic pizza engine
import { useState, useCallback } from 'react';
import { getRandomJoke } from '../utils/jokes';

// Topping definitions — each has an emoji, label, FNAF flavor text, and color
export const TOPPINGS = [
  { id: 'pepperoni', label: 'Pepperoni', emoji: '🔴', icon: '🔴', fnafName: "Freddy's Favorite", color: '#c0392b', bgColor: '#2d0a0a', description: "Classic slices" },
  { id: 'mushrooms', label: 'Mushrooms', emoji: '🍄', icon: '🍄', fnafName: "Bonnie's Secret", color: '#d4c4a8', bgColor: '#2a261f', description: "Earthy slices" },
  { id: 'olives', label: 'Black Olives', emoji: '⚫', icon: '⚫', fnafName: "Foxy's Hook", color: '#1a1a1a', bgColor: '#0a0a0a', description: "Dark rings" },
  { id: 'capsicum', label: 'Green Pepper', emoji: '🫑', icon: '🫑', fnafName: "Chica's Crunch", color: '#22c55e', bgColor: '#062811', description: "Crisp rings" },
  { id: 'tomato', label: 'Tomato', emoji: '🍅', icon: '🍅', fnafName: "Red Drops", color: '#ef4444', bgColor: '#320b0b', description: "Juicy slices" },
  { id: 'basil', label: 'Fresh Basil', emoji: '🌿', icon: '🌿', fnafName: "Puppet's Leaf", color: '#15803d', bgColor: '#051f0f', description: "Fresh leaves" },
  { id: 'grated_cheese', label: 'Grated Cheese', emoji: '🧀', icon: '🧀', fnafName: "Golden Strings", color: '#fef08a', bgColor: '#4a2f00', description: "Melts on bake" },
];

const LOCALSTORAGE_KEY = 'freddys_most_cursed_pizza';

export function usePizzaBuilder() {
  const [toppings, setToppings] = useState([]); // array of { id, toppingId, position }
  const [isBaking, setIsBaking] = useState(false);
  const [currentJoke, setCurrentJoke] = useState(null);
  const [showJoke, setShowJoke] = useState(false);
  const [bakeCount, setBakeCount] = useState(0);

  // Add a topping — perfectly scattered naturally
  const addTopping = useCallback((toppingId) => {
    setToppings(prev => {
      // Perfect organic random scatter inside a circle!
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.sqrt(Math.random()) * 38; // Max 38% radius to stay inside crust
      const newTopping = {
        id: Date.now() + Math.random(), // unique key
        toppingId,
        position: {
          top: `${50 + Math.sin(angle) * radius}%`,
          left: `${50 + Math.cos(angle) * radius}%`,
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
