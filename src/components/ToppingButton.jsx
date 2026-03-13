// ToppingButton.jsx — compact topping selector
import { motion } from 'framer-motion';

export default function ToppingButton({ topping, count, onClick }) {
  const active = count > 0;
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.95 }}
      style={{
        width: '100%', padding: '6px 8px',
        display: 'flex', alignItems: 'center', gap: '7px',
        borderRadius: '5px', cursor: 'pointer', border: '1px solid',
        borderColor: active ? topping.color : '#1f2937',
        backgroundColor: active ? topping.bgColor : 'rgba(0,0,0,0.5)',
        boxShadow: active ? `0 0 8px ${topping.color}44` : 'none',
        transition: 'all 0.15s',
        textAlign: 'left',
        flex: 1,
        minHeight: 0,
      }}
    >
      <span style={{ fontSize: '18px', flexShrink: 0 }}>{topping.icon}</span>
      <div style={{ flex: 1, overflow: 'hidden' }}>
        <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '7px', color: active ? '#e5e7eb' : '#6b7280', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {topping.fnafName}
        </div>
        <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '6px', color: '#4b5563', marginTop: '1px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {topping.label}
        </div>
      </div>
      {count > 0 && (
        <motion.span
          initial={{ scale: 0 }} animate={{ scale: 1 }}
          style={{
            fontFamily: "'Press Start 2P', monospace", fontSize: '9px',
            color: topping.color, flexShrink: 0,
            textShadow: `0 0 6px ${topping.color}`,
          }}
        >
          ×{count}
        </motion.span>
      )}
    </motion.button>
  );
}
