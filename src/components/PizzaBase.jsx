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
              <stop offset="100%" stopColor="#922b21" stopOpacity="0.6" />
            </radialGradient>
            
            {/* Goo factor for the cheese */}
            <filter id="goo">
              <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
              <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
              <feBlend in="SourceGraphic" in2="goo" />
            </filter>

            {/* Depth shadow for crust */}
            <filter id="innerShadow">
              <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#3d1b06" floodOpacity="0.8"/>
            </filter>
            
            <linearGradient id="cheeseShine" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Crust Bottom */}
          <circle cx="100" cy="100" r="98" fill="#a26c22" />
          
          {/* Main Crust */}
          <circle cx="100" cy="100" r="94" fill="#c8943a" filter="url(#innerShadow)" />
          
          {/* Crust texture */}
          {[...Array(14)].map((_, i) => {
            const angle = (i / 14) * Math.PI * 2;
            return <circle key={i} cx={100 + Math.cos(angle) * 88} cy={100 + Math.sin(angle) * 88} r="6" fill="#8c5a1a" opacity="0.4" />;
          })}
          
          {/* Sauce Layer */}
          <circle cx="100" cy="100" r="82" fill="#a51e12" />
          <circle cx="100" cy="100" r="82" fill="url(#sauceGrad)" />

          {/* New Gooey Cheese Layer */}
          <g filter="url(#goo)">
            {/* Base Melted Cheese */}
            <circle cx="100" cy="100" r="78" fill="#facc15" />
            
            {/* Darker cheese spots for depth */}
            <circle cx="100" cy="100" r="78" fill="url(#cheeseShine)" />
            
            {/* Thick dynamic bubbles */}
            <motion.circle cx="80" cy="80" r="22" fill="#fbbf24" animate={isBaking ? { scale: [1, 1.1, 1], r: [22, 24, 22] } : {}} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} />
            <motion.circle cx="130" cy="90" r="25" fill="#fbbf24" animate={isBaking ? { scale: [1, 1.05, 1], r: [25, 27, 25] } : {}} transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }} />
            <motion.circle cx="100" cy="130" r="20" fill="#f59e0b" animate={isBaking ? { scale: [1, 1.15, 1], r: [20, 23, 20] } : {}} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay: 1 }} />
            <motion.circle cx="65" cy="120" r="18" fill="#fbbf24" animate={isBaking ? { scale: [1, 1.08, 1], r: [18, 19, 18] } : {}} transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }} />
            <motion.circle cx="140" cy="130" r="15" fill="#f59e0b" animate={isBaking ? { scale: [1, 1.1, 1], r: [15, 17, 15] } : {}} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }} />
            <motion.circle cx="100" cy="65" r="17" fill="#f59e0b" animate={isBaking ? { scale: [1, 1.1, 1], r: [17, 18, 17] } : {}} transition={{ duration: 2.1, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }} />
          </g>
          
          {/* Cheese Highlights/Shine for 3D premium feel */}
          <path d="M 60 70 Q 100 30 140 70" fill="transparent" stroke="white" strokeWidth="4" strokeLinecap="round" opacity="0.3" filter="blur(2px)" />
          <ellipse cx="80" cy="85" rx="8" ry="4" fill="white" opacity="0.4" transform="rotate(-20 80 85)" />
          <ellipse cx="120" cy="110" rx="6" ry="3" fill="white" opacity="0.3" transform="rotate(25 120 110)" />
        </svg>

        {/* Toppings layer (overflow removed so edge toppings spill onto the crust naturally) */}
        <div style={{ position: 'absolute', top: '8%', left: '8%', width: '84%', height: '84%' }}>
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
