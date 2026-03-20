// PizzaCanvas.jsx — uses container size for pizza
import { motion, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import PizzaBase from './PizzaBase';

const ToppingVectors = {
  pepperoni: (
    <svg viewBox="0 0 100 100" width="100%" height="100%" filter="drop-shadow(0px 2px 3px rgba(0,0,0,0.5))">
      <circle cx="50" cy="50" r="46" fill="#b91c1c" />
      <circle cx="50" cy="50" r="44" fill="none" stroke="#7f1d1d" strokeWidth="3" />
      <circle cx="30" cy="30" r="4" fill="#7f1d1d" opacity="0.7"/>
      <circle cx="70" cy="35" r="5" fill="#7f1d1d" opacity="0.7"/>
      <circle cx="45" cy="70" r="6" fill="#7f1d1d" opacity="0.7"/>
      <circle cx="25" cy="55" r="3" fill="#7f1d1d" opacity="0.7"/>
      <circle cx="65" cy="65" r="4.5" fill="#7f1d1d" opacity="0.7"/>
      <circle cx="55" cy="20" r="3.5" fill="#7f1d1d" opacity="0.7"/>
      <circle cx="35" cy="50" r="4" fill="#7f1d1d" opacity="0.7"/>
      <circle cx="50" cy="40" r="2.5" fill="#7f1d1d" opacity="0.7"/>
      <path d="M 20 50 A 30 30 0 0 1 50 20" fill="none" stroke="#fca5a5" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
      <path d="M 18 50 A 32 32 0 0 0 50 82" fill="none" stroke="#7f1d1d" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
    </svg>
  ),
  mushrooms: (
    <svg viewBox="0 0 100 100" width="100%" height="100%" filter="drop-shadow(0px 2px 3px rgba(0,0,0,0.5))">
      <path d="M 40 40 L 40 80 C 40 90, 60 90, 60 80 L 60 40 Z" fill="#fdfbf7" stroke="#d6ccb8" strokeWidth="2" />
      <path d="M 45 40 L 45 80" stroke="#e8e0d0" strokeWidth="2" />
      <path d="M 15 45 C 15 35, 85 35, 85 45 C 85 55, 15 55, 15 45 Z" fill="#6b5b4e" />
      <path d="M 25 45 L 30 50 M 35 45 L 40 50 M 65 45 L 60 50 M 75 45 L 70 50" stroke="#3d322b" strokeWidth="2" />
      <path d="M 10 45 C 10 10, 90 10, 90 45 C 90 50, 10 50, 10 45 Z" fill="#fdfbf7" stroke="#d6ccb8" strokeWidth="2" />
      <path d="M 25 35 C 40 20, 60 20, 75 35" fill="none" stroke="#e8e0d0" strokeWidth="3" />
    </svg>
  ),
  olives: (
    <svg viewBox="0 0 100 100" width="100%" height="100%" filter="drop-shadow(0px 2px 3px rgba(0,0,0,0.5))">
      <circle cx="50" cy="50" r="30" fill="none" stroke="#171717" strokeWidth="16" />
      <circle cx="50" cy="50" r="28" fill="none" stroke="#404040" strokeWidth="2" opacity="0.6"/>
      <path d="M 28 40 A 24 24 0 0 1 50 24" fill="none" stroke="#a3a3a3" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
    </svg>
  ),
  capsicum: (
    <svg viewBox="0 0 100 100" width="100%" height="100%" filter="drop-shadow(0px 2px 3px rgba(0,0,0,0.5))">
      <path d="M 50 10 C 70 10, 85 25, 85 40 C 85 45, 90 55, 90 65 C 90 85, 75 90, 50 90 C 25 90, 10 85, 10 65 C 10 55, 15 45, 15 40 C 15 25, 30 10, 50 10 Z" fill="none" stroke="#16a34a" strokeWidth="10" strokeLinejoin="round" />
      <path d="M 50 15 C 65 15, 75 25, 78 35 C 78 45, 80 50, 82 60 C 82 75, 70 80, 50 82 C 30 80, 18 75, 18 60 C 20 50, 22 45, 22 35 C 25 25, 35 15, 50 15 Z" fill="none" stroke="#86efac" strokeWidth="3" opacity="0.8" />
    </svg>
  ),
  tomato: (
    <svg viewBox="0 0 100 100" width="100%" height="100%" filter="drop-shadow(0px 2px 3px rgba(0,0,0,0.5))">
      <circle cx="50" cy="50" r="46" fill="#ef4444" />
      <circle cx="50" cy="50" r="42" fill="#fca5a5" />
      <circle cx="50" cy="50" r="40" fill="#ef4444" />
      <circle cx="50" cy="50" r="8" fill="#fca5a5" />
      <path d="M 50 10 L 50 90 M 10 50 L 90 50 M 22 22 L 78 78 M 22 78 L 78 22" stroke="#fca5a5" strokeWidth="4" />
      <path d="M 50 30 Q 35 30 40 15 Q 60 15 65 30 Z" fill="#b91c1c" />
      <path d="M 50 70 Q 35 70 40 85 Q 60 85 65 70 Z" fill="#b91c1c" transform="rotate(180 50 50)" />
      <path d="M 30 50 Q 30 35 15 40 Q 15 60 30 65 Z" fill="#b91c1c" />
      <path d="M 70 50 Q 70 35 85 40 Q 85 60 70 65 Z" fill="#b91c1c" transform="rotate(180 50 50)" />
      <circle cx="45" cy="20" r="1.5" fill="#fde047" />
      <circle cx="55" cy="25" r="1.5" fill="#fde047" />
      <circle cx="20" cy="45" r="1.5" fill="#fde047" />
      <circle cx="25" cy="55" r="1.5" fill="#fde047" />
      <circle cx="45" cy="80" r="1.5" fill="#fde047" />
      <circle cx="55" cy="75" r="1.5" fill="#fde047" />
      <circle cx="80" cy="45" r="1.5" fill="#fde047" />
      <circle cx="75" cy="55" r="1.5" fill="#fde047" />
    </svg>
  ),
  basil: (
    <svg viewBox="0 0 100 100" width="100%" height="100%" filter="drop-shadow(0px 3px 4px rgba(0,0,0,0.6))">
      <path d="M 15 85 C 0 45, 45 0, 85 15 C 100 55, 55 100, 15 85 Z" fill="#166534" stroke="#14532d" strokeWidth="2" />
      <path d="M 17 83 L 83 17" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
      <path d="M 50 50 L 65 30 M 35 65 L 50 80 M 65 65 L 80 50 M 35 35 L 20 50 M 25 75 L 40 60 L 60 40 L 75 25" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      <path d="M 20 50 C 15 30, 30 15, 50 20" fill="none" stroke="#4ade80" strokeWidth="2" opacity="0.4" />
    </svg>
  ),
  grated_cheese: (
    <svg viewBox="0 0 100 100" width="100%" height="100%" filter="drop-shadow(0px 1px 1px rgba(0,0,0,0.5))">
      <rect x="20" y="45" width="60" height="8" rx="4" fill="#fef08a" transform="rotate(15 50 50)" />
      <rect x="30" y="30" width="50" height="8" rx="4" fill="#fde047" transform="rotate(-20 50 50)" />
      <rect x="25" y="65" width="45" height="8" rx="4" fill="#facc15" transform="rotate(45 50 50)" />
      <rect x="40" y="20" width="40" height="8" rx="4" fill="#fef08a" transform="rotate(70 50 50)" />
    </svg>
  )
};

const TOPPING_EMOJIS = { pepperoni: '🔴', grated_cheese: '🧀', mushrooms: '🍄', olives: '⚫', capsicum: '🫑', tomato: '🍅', basil: '🌿' };

function ToppingPiece({ topping, index, isBaked }) {
  const isCheese = topping.toppingId === 'grated_cheese';
  
  if (isCheese && isBaked) {
    return (
      <motion.div className="absolute pointer-events-none"
        style={{
          top: topping.position.top, left: topping.position.left,
          transform: 'translate(-50%, -50%)',
          width: '100px', height: '100px',
          background: 'radial-gradient(circle at center, #facc15 0%, #fbbf24 60%, transparent 80%)',
          filter: 'blur(8px) drop-shadow(0 4px 6px rgba(200, 100, 0, 0.4))',
          zIndex: 2, // Melt completely underneath other toppings!
          opacity: 0.85,
          mixBlendMode: 'normal',
        }}
        initial={{ scale: 0.2, opacity: 0 }}
        animate={{ 
          scale: [0.2, 1.8], 
          opacity: 0.85,
          borderRadius: ['50%', '40% 60% 70% 30% / 40% 50% 60% 50%', '50% 40% 60% 50% / 40% 50% 50% 60%'] 
        }}
        transition={{ scale: { duration: 1.5, ease: "easeOut" }, borderRadius: { duration: 4, repeat: Infinity, ease: "easeInOut" } }}
      />
    );
  }

  const vector = ToppingVectors[topping.toppingId] || <div style={{ fontSize: '42px' }}>{TOPPING_EMOJIS[topping.toppingId] || '🔴'}</div>;

  const filter = isBaked && !isCheese 
    ? 'drop-shadow(1px 2px 4px rgba(0,0,0,0.8)) brightness(0.85) saturate(1.2)' 
    : 'none';

  return (
    <motion.div className="absolute select-none pointer-events-none"
      style={{
        top: topping.position.top, left: topping.position.left,
        transform: 'translate(-50%, -50%)', 
        zIndex: isCheese ? 3 : index + 10,
        width: isCheese ? '60px' : '75px', // Up-scaled for extreme detail visibility
        height: isCheese ? '60px' : '75px',
        filter,
      }}
      initial={{ scale: 0, rotate: -30, opacity: 0 }}
      animate={{ scale: 1, rotate: Math.random() * 360, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 350, damping: 18 }}
    >
      {vector}
    </motion.div>
  );
}

export default function PizzaCanvas({ toppings, isBaking, toppingCount, bakeCount }) {
  const isBaked = bakeCount > 0 && !isBaking;
  const containerRef = useRef(null);
  const [pizzaSize, setPizzaSize] = useState(220);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new ResizeObserver(entries => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setPizzaSize(Math.min(width, height) * 0.82);
      }
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>

      {/* Status label */}
      <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '9px', textAlign: 'center', minHeight: '16px' }}>
        {toppingCount === 0 && <span style={{ color: '#6b7280' }}>← click toppings to add them →</span>}
        {toppingCount > 0 && toppingCount < 3 && (
          <motion.span style={{ color: '#f97316' }} animate={{ opacity: [1, 0.5, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
            needs {3 - toppingCount} more... keep going
          </motion.span>
        )}
        {toppingCount >= 3 && toppingCount < 7 && (
          <span style={{ color: '#4ade80', textShadow: '0 0 6px #00ff00' }}>✓ BAKE UNLOCKED — ready to disappoint</span>
        )}
        {toppingCount >= 7 && (
          <motion.span style={{ color: '#facc15', textShadow: '0 0 8px #ffff00' }} animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 0.5, repeat: Infinity }}>
            ⚠️ HEALTH VIOLATION IN PROGRESS ⚠️
          </motion.span>
        )}
      </div>

      <PizzaBase isBaking={isBaking} size={pizzaSize}>
        <AnimatePresence>
          {toppings.map((topping, index) => (
            <ToppingPiece key={topping.id} topping={topping} index={index} isBaked={isBaked} />
          ))}
        </AnimatePresence>
      </PizzaBase>

      {/* Recent topping badges */}
      {toppingCount > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '3px', maxWidth: '260px' }}>
          {toppings.slice(-3).map(t => (
            <motion.span key={t.id} initial={{ scale: 0 }} animate={{ scale: 1 }}
              style={{
                fontFamily: "'Press Start 2P', monospace", fontSize: '7px',
                backgroundColor: '#111827', border: '1px solid #374151',
                borderRadius: '3px', padding: '1px 4px', color: '#9ca3af',
              }}
            >
              {TOPPING_EMOJIS[t.toppingId]} added
            </motion.span>
          ))}
          {toppingCount > 3 && (
            <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '7px', color: '#4b5563' }}>
              +{toppingCount - 3} sins
            </span>
          )}
        </div>
      )}
    </div>
  );
}
