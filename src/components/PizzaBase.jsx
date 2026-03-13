// PizzaBase.jsx — scales to fill available space
import { motion } from 'framer-motion';

export default function PizzaBase({ isBaking, children, size = 240 }) {
  return (
    <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {/* Glow ring when baking */}
      {isBaking && (
        <motion.div style={{
          position: 'absolute', borderRadius: '50%',
          border: '4px solid #f97316',
          width: size + 40, height: size + 40,
        }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 0.4, repeat: Infinity }}
        />
      )}

      <motion.div style={{ position: 'relative', width: size, height: size }}
        animate={isBaking ? { rotate: [0, 360], scale: [1, 1.05, 1] } : { rotate: 0, scale: 1 }}
        transition={isBaking ? {
          rotate: { duration: 0.8, repeat: 3, ease: 'linear' },
          scale: { duration: 0.4, repeat: 6 },
        } : { duration: 0.3 }}
      >
        <svg viewBox="0 0 200 200" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="sauceGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#e74c3c" stopOpacity="0" />
              <stop offset="100%" stopColor="#922b21" stopOpacity="0.4" />
            </radialGradient>
          </defs>
          <circle cx="100" cy="100" r="98" fill="#c8943a" />
          {[...Array(12)].map((_, i) => {
            const angle = (i / 12) * Math.PI * 2;
            return <circle key={i} cx={100 + Math.cos(angle) * 90} cy={100 + Math.sin(angle) * 90} r="5" fill="#b07d2a" opacity="0.6" />;
          })}
          <circle cx="100" cy="100" r="82" fill="#c0392b" />
          <circle cx="100" cy="100" r="82" fill="url(#sauceGrad)" />
          <circle cx="100" cy="100" r="76" fill="#f0c050" opacity="0.85" />
          <ellipse cx="80" cy="85" rx="18" ry="12" fill="#e8b830" opacity="0.6" />
          <ellipse cx="115" cy="110" rx="15" ry="10" fill="#e8b830" opacity="0.6" />
          <ellipse cx="90" cy="120" rx="12" ry="8" fill="#e8b830" opacity="0.5" />
          <ellipse cx="75" cy="70" rx="20" ry="14" fill="white" opacity="0.07" />
        </svg>

        {/* Toppings layer */}
        <div style={{ position: 'absolute', top: '8%', left: '8%', width: '84%', height: '84%', borderRadius: '50%', overflow: 'hidden' }}>
          {children}
        </div>
      </motion.div>

      {/* Baking fire */}
      {isBaking && (
        <div style={{ position: 'absolute', bottom: -10, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '4px' }}>
          {['🔥', '🔥', '🔥'].map((f, i) => (
            <motion.span key={i} style={{ fontSize: '20px' }}
              animate={{ y: [-8, -25, -8], opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 0.5, delay: i * 0.15, repeat: Infinity }}
            >{f}</motion.span>
          ))}
        </div>
      )}
    </div>
  );
}
