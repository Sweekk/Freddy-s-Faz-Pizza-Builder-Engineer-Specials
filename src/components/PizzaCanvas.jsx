// PizzaCanvas.jsx — uses container size for pizza
import { motion, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import PizzaBase from './PizzaBase';

const TOPPING_EMOJIS = { pepperoni: '🔴', cheese: '🟡', mushrooms: '🍄', olives: '⚫', sausage: '🟠' };

function ToppingPiece({ topping, index }) {
  const emoji = TOPPING_EMOJIS[topping.toppingId] || '🔴';
  return (
    <motion.div className="absolute select-none pointer-events-none"
      style={{
        top: topping.position.top, left: topping.position.left,
        transform: 'translate(-50%, -50%)', zIndex: index + 1,
        fontSize: '22px', filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.8))',
      }}
      initial={{ scale: 0, rotate: -30, opacity: 0 }}
      animate={{ scale: 1, rotate: Math.random() * 30 - 15, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
    >{emoji}</motion.div>
  );
}

export default function PizzaCanvas({ toppings, isBaking, toppingCount }) {
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
            <ToppingPiece key={topping.id} topping={topping} index={index} />
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
