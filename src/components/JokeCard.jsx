// JokeCard.jsx — The grand reveal of engineering shame
import { motion, AnimatePresence } from 'framer-motion';

export default function JokeCard({ joke, onClose }) {
  if (!joke) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ backgroundColor: 'rgba(0,0,0,0.92)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        {/* Card */}
        <motion.div
          className="relative max-w-lg w-full rounded-lg border-4 p-6 text-center"
          style={{
            backgroundColor: '#0a0008',
            borderColor: '#8b00ff',
            boxShadow: '0 0 40px #8b00ff88, 0 0 80px #8b00ff44, inset 0 0 30px #8b00ff11',
          }}
          initial={{ scale: 0.5, rotate: -10, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 250, damping: 20 }}
          onClick={e => e.stopPropagation()}
        >
          {/* Purple corner decorations */}
          <div className="absolute top-2 left-2 text-purple-500 font-pixel" style={{ fontSize: '10px' }}>★</div>
          <div className="absolute top-2 right-2 text-purple-500 font-pixel" style={{ fontSize: '10px' }}>★</div>
          <div className="absolute bottom-2 left-2 text-purple-500 font-pixel" style={{ fontSize: '10px' }}>★</div>
          <div className="absolute bottom-2 right-2 text-purple-500 font-pixel" style={{ fontSize: '10px' }}>★</div>

          {/* Character icon + name */}
          <motion.div
            className="text-5xl mb-2"
            animate={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {joke.character}
          </motion.div>

          <div
            className="font-pixel text-purple-400 mb-3"
            style={{ fontSize: '10px', textShadow: '0 0 6px #8b00ff' }}
          >
            {joke.characterName} PRESENTS:
          </div>

          {/* Title */}
          <motion.h2
            className="font-pixel text-yellow-400 mb-4 leading-relaxed"
            style={{
              fontSize: '14px',
              textShadow: '0 0 10px #ffff00, 0 0 20px #ffaa00',
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {joke.title}
          </motion.h2>

          {/* Divider */}
          <div className="border-t border-purple-800 mb-4" />

          {/* The joke */}
          <motion.p
            className="font-pixel text-green-400 mb-4 leading-loose"
            style={{
              fontSize: '11px',
              textShadow: '0 0 6px #00ff00',
              lineHeight: '2',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {joke.joke}
          </motion.p>

          {/* Tag */}
          <motion.div
            className="inline-block border border-red-600 rounded px-3 py-1 mb-5"
            style={{ backgroundColor: '#1a0000' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <span
              className="font-pixel text-red-400"
              style={{ fontSize: '9px', textShadow: '0 0 6px #ff0000' }}
            >
              {joke.tag}
            </span>
          </motion.div>

          {/* Scanlines overlay on the card */}
          <div className="absolute inset-0 rounded-lg pointer-events-none" style={{
            background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)',
          }} />

          {/* Back to Building button */}
          <motion.button
            onClick={onClose}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative z-10 w-full py-3 rounded border-2 font-pixel text-sm"
            style={{
              backgroundColor: '#1a0030',
              borderColor: '#8b00ff',
              color: '#cc44ff',
              textShadow: '0 0 8px #8b00ff',
              boxShadow: '0 0 15px #8b00ff44',
              cursor: 'pointer',
            }}
          >
            ← BACK TO BUILDING (and shame)
          </motion.button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
