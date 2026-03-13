// App.jsx — Freddy's Faz-Pizza Builder: A monument to terrible decisions
import { usePizzaBuilder } from './hooks/usePizzaBuilder';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import PizzaCanvas from './components/PizzaCanvas';
import ToppingsPanel from './components/ToppingsPanel';
import JokeCard from './components/JokeCard';

export default function App() {
  const {
    toppings, addTopping, resetPizza, bakePizza,
    canBake, isBaking, toppingCount, toppingCounts,
    showJoke, currentJoke, closeJoke, bakeCount, TOPPINGS,
  } = usePizzaBuilder();

  return (
    <div
      className="font-pixel overflow-hidden"
      style={{
        height: '100dvh',
        width: '100vw',
        backgroundColor: '#080005',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      {/* CRT scanlines */}
      <div className="scanlines" style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 40 }} />

      {/* Background */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none',
        background: `radial-gradient(ellipse at 20% 50%, #1a0008 0%, transparent 60%),
                     radial-gradient(ellipse at 80% 20%, #0a0018 0%, transparent 50%), #080005`,
      }} />

      {/* IT'S ME easter egg */}
      <AnimatePresence>
        {isBaking && (
          <motion.div style={{
            position: 'fixed', top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: '40px', color: 'white', pointerEvents: 'none',
            textShadow: '0 0 30px white', zIndex: 30,
            fontFamily: "'Press Start 2P', monospace",
          }}
            animate={{ opacity: [0, 0.8, 0], scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            IT'S ME
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full-height layout */}
      <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', height: '100%' }}>

        <Header bakeCount={bakeCount} />

        {/* Three-column content area */}
        <div style={{
          flex: 1, display: 'flex', flexDirection: 'row',
          overflow: 'hidden', padding: '8px', gap: '8px', minHeight: 0,
        }}>

          {/* Left — toppings panel */}
          <motion.div
            style={{ width: '200px', flexShrink: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
            initial={{ x: -40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }}
          >
            <ToppingsPanel
              TOPPINGS={TOPPINGS} toppingCounts={toppingCounts} toppingCount={toppingCount}
              addTopping={addTopping} resetPizza={resetPizza} bakePizza={bakePizza}
              canBake={canBake} isBaking={isBaking}
            />
          </motion.div>

          {/* Center — pizza */}
          <motion.div
            style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: 0, overflow: 'hidden' }}
            initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
          >
            <PizzaCanvas toppings={toppings} isBaking={isBaking} toppingCount={toppingCount} />
          </motion.div>

          {/* Right — lore panel */}
          <motion.div
            style={{ width: '175px', flexShrink: 0, overflow: 'hidden' }}
            initial={{ x: 40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3 }}
          >
            <div style={{
              border: '1px solid #4c1d95', borderRadius: '6px', padding: '10px',
              backgroundColor: 'rgba(0,0,0,0.6)', boxShadow: '0 0 15px #8b00ff22',
              height: '100%', display: 'flex', flexDirection: 'column', gap: '8px', overflow: 'hidden',
            }}>
              <div style={{ color: '#a78bfa', textAlign: 'center', fontSize: '8px', textShadow: '0 0 6px #8b00ff' }}>★ HOW TO PLAY ★</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                {[
                  { n: '1', t: 'Click toppings to pile them on' },
                  { n: '2', t: 'Stack as many as you dare' },
                  { n: '3', t: '3+ toppings unlocks BAKE' },
                  { n: '4', t: 'Receive your engineering fate' },
                ].map(({ n, t }) => (
                  <div key={n} style={{ display: 'flex', gap: '5px', alignItems: 'flex-start' }}>
                    <span style={{ color: '#eab308', fontSize: '8px', flexShrink: 0 }}>{n}.</span>
                    <span style={{ color: '#6b7280', fontSize: '7px', lineHeight: '1.5' }}>{t}</span>
                  </div>
                ))}
              </div>
              <div style={{ borderTop: '1px solid #4c1d95' }} />
              <div style={{ color: '#ef4444', textAlign: 'center', fontSize: '7px', lineHeight: 1.8 }}>
                ⚠️ WARNING ⚠️
                <div style={{ color: '#4b5563', marginTop: '3px' }}>
                  Not liable for:<br />- Springlock failures<br />- Git trauma<br />- Unresolved promises
                </div>
              </div>
              <div style={{ borderTop: '1px solid #4c1d95' }} />
              <div style={{ color: '#a78bfa', textAlign: 'center', fontSize: '7px', marginBottom: '2px' }}>TONIGHT'S CAST:</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '3px', textAlign: 'center' }}>
                {['🎩🐻', '🍕🐔', '🎸🐰', '🏴‍☠️🦊', '💚🐰', '⭐🐻'].map((char, i) => (
                  <motion.div key={i} style={{ fontSize: '16px' }}
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
                  >{char}</motion.div>
                ))}
              </div>
              <div style={{ marginTop: 'auto', color: '#1f2937', fontSize: '6px', textAlign: 'center', lineHeight: 1.6 }}>
                FAZBEAR ENT. LLC<br />EST. 1987
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {showJoke && <JokeCard joke={currentJoke} onClose={closeJoke} />}
    </div>
  );
}
