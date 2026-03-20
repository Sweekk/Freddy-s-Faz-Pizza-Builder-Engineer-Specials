// ToppingButton.jsx — compact topping selector
import { motion } from 'framer-motion';

export default function ToppingButton({ topping, count, onClick }) {
  const active = count > 0;
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05, filter: 'brightness(1.2)' }}
      whileTap={{ scale: 0.95 }}
      style={{
        width: '100%', padding: '8px 10px',
        display: 'flex', alignItems: 'center', gap: '8px',
        borderRadius: '8px', cursor: 'pointer',
        border: `2px solid ${active ? topping.color : '#1f2937'}`,
        background: active 
          ? `linear-gradient(135deg, ${topping.bgColor}dd, ${topping.bgColor}88)`
          : 'linear-gradient(135deg, rgba(30, 41, 59, 0.6), rgba(15, 23, 42, 0.8))',
        boxShadow: active 
          ? `0 0 15px ${topping.color}88, inset 0 0 10px ${topping.color}44` 
          : '0 4px 6px rgba(0,0,0,0.3)',
        transition: 'all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        textAlign: 'left',
        flex: 1,
        minHeight: 0,
        backdropFilter: 'blur(4px)',
      }}
    >
      <motion.span 
        style={{ fontSize: '20px', flexShrink: 0 }}
        animate={active ? { scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] } : {}}
        transition={{ duration: 0.5 }}
      >
        {topping.icon}
      </motion.span>
      <div style={{ flex: 1, overflow: 'hidden' }}>
        <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '8px', color: active ? '#ffffff' : '#9ca3af', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', textShadow: active ? `0 0 5px ${topping.color}` : 'none' }}>
          {topping.fnafName}
        </div>
        <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '6.5px', color: active ? '#cbd5e1' : '#4b5563', marginTop: '3px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {topping.label}
        </div>
      </div>
      {count > 0 && (
        <motion.span
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          style={{
            fontFamily: "'Press Start 2P', monospace", fontSize: '10px',
            color: '#ffffff', flexShrink: 0,
            textShadow: `0 0 8px ${topping.color}, 0 0 15px ${topping.color}`,
            background: topping.color, padding: '2px 5px', borderRadius: '4px',
            border: '1px solid white'
          }}
        >
          ×{count}
        </motion.span>
      )}
    </motion.button>
  );
}
