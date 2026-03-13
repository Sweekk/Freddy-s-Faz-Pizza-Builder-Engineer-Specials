// ToppingsPanel.jsx — compact sidebar that fits in height
import ToppingButton from './ToppingButton';
import { motion } from 'framer-motion';

export default function ToppingsPanel({ TOPPINGS, toppingCounts, toppingCount, addTopping, resetPizza, bakePizza, canBake, isBaking }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', gap: '6px',
      height: '100%', overflow: 'hidden',
    }}>
      {/* Title */}
      <div style={{ textAlign: 'center', borderBottom: '1px solid #991b1b', paddingBottom: '6px', flexShrink: 0 }}>
        <div style={{ fontFamily: "'Press Start 2P', monospace", color: '#f87171', fontSize: '9px', textShadow: '0 0 8px #ff0000' }}>
          ★ TOPPINGS ★
        </div>
        <div style={{ fontFamily: "'Press Start 2P', monospace", color: '#6b7280', fontSize: '7px', marginTop: '3px' }}>
          stacking allowed 🐔
        </div>
      </div>

      {/* Topping buttons — take available space */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', flex: 1, overflow: 'hidden' }}>
        {TOPPINGS.map(topping => (
          <ToppingButton
            key={topping.id}
            topping={topping}
            count={toppingCounts[topping.id] || 0}
            onClick={() => addTopping(topping.id)}
          />
        ))}
      </div>

      {/* Progress bar */}
      <div style={{ flexShrink: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: "'Press Start 2P', monospace", color: '#6b7280', fontSize: '7px', marginBottom: '3px' }}>
          <span>TOPPINGS</span>
          <span style={{ color: toppingCount >= 3 ? '#4ade80' : '#f97316' }}>{toppingCount}/3</span>
        </div>
        <div style={{ height: '6px', backgroundColor: '#111827', borderRadius: '3px', border: '1px solid #374151', overflow: 'hidden' }}>
          <motion.div style={{
            height: '100%', borderRadius: '3px',
            backgroundColor: toppingCount >= 3 ? '#4ade80' : '#f97316',
          }}
            animate={{ width: `${Math.min(100, (toppingCount / 10) * 100)}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        {toppingCount > 6 && (
          <div style={{ fontFamily: "'Press Start 2P', monospace", color: '#facc15', textAlign: 'center', fontSize: '7px', marginTop: '2px', textShadow: '0 0 6px #ffff00' }}>
            ⚠️ OVER-ENGINEERED ⚠️
          </div>
        )}
      </div>

      {/* Unlock hint */}
      {!canBake && toppingCount < 3 && (
        <div style={{ fontFamily: "'Press Start 2P', monospace", color: '#4b5563', textAlign: 'center', fontSize: '7px', flexShrink: 0 }}>
          add {3 - toppingCount} more to unlock
        </div>
      )}

      {/* BAKE button */}
      <motion.button
        onClick={bakePizza}
        disabled={!canBake || isBaking}
        whileHover={canBake && !isBaking ? { scale: 1.04 } : {}}
        whileTap={canBake && !isBaking ? { scale: 0.96 } : {}}
        style={{
          width: '100%', padding: '10px 0', borderRadius: '5px',
          border: `2px solid ${canBake && !isBaking ? '#ef4444' : '#3d0000'}`,
          fontFamily: "'Press Start 2P', monospace", fontSize: '11px',
          backgroundColor: canBake && !isBaking ? '#7f0000' : '#1a0000',
          color: canBake && !isBaking ? '#ff4444' : '#4d0000',
          textShadow: canBake && !isBaking ? '0 0 10px #ff0000' : 'none',
          boxShadow: canBake && !isBaking ? '0 0 20px #ff000066, inset 0 0 20px #ff000022' : 'none',
          cursor: canBake && !isBaking ? 'pointer' : 'not-allowed',
          position: 'relative', overflow: 'hidden', flexShrink: 0,
        }}
      >
        {isBaking ? (
          <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.4, repeat: Infinity }}>
            🔥 BAKING... 🔥
          </motion.span>
        ) : '🍕 BAKE IT! 🍕'}
        {canBake && !isBaking && (
          <motion.div style={{
            position: 'absolute', top: 0, bottom: 0, width: '30px',
            backgroundColor: 'white', opacity: 0.1, transform: 'skewX(12deg)',
          }}
            animate={{ left: ['-20%', '120%'] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
          />
        )}
      </motion.button>

      {/* Reset */}
      {toppingCount > 0 && !isBaking && (
        <motion.button
          onClick={resetPizza}
          whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
          style={{
            width: '100%', padding: '6px 0', borderRadius: '4px',
            border: '1px solid #374151', fontFamily: "'Press Start 2P', monospace",
            fontSize: '8px', color: '#6b7280', backgroundColor: 'transparent',
            cursor: 'pointer', flexShrink: 0,
          }}
        >
          🗑️ reset (wipe evidence)
        </motion.button>
      )}
    </div>
  );
}
