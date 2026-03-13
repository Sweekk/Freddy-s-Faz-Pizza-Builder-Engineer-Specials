// Header.jsx — Compact neon sign
import { useState, useEffect } from 'react';

const MARQUEE_TEXTS = [
  "🎉 WELCOME TO FREDDY FAZBEAR'S PIZZA! 🎉",
  "🍕 WHERE FANTASY AND FUN COME TO LIFE! 🍕",
  "⚠️ SECURITY BREACH ON AISLE 4 ⚠️",
  "🐻 FREDDY SAYS: npm install --save-pizza 🐻",
  "🎵 GREAT PLACE FOR KIDS AND STACK OVERFLOWS! 🎵",
  "🏴‍☠️ FOXY IS OUT OF ORDER (AGAIN) 🏴‍☠️",
  "💚 DO NOT ENTER THE PARTS & SERVICE ROOM 💚",
  "🎩 TONIGHT: FREDDY'S LEGENDARY 6AM DEPLOY 🎩",
];

export default function Header({ bakeCount }) {
  const [marqueeIndex, setMarqueeIndex] = useState(0);
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => {
        setMarqueeIndex(i => (i + 1) % MARQUEE_TEXTS.length);
        setGlitch(false);
      }, 150);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header style={{
      position: 'relative',
      width: '100%',
      textAlign: 'center',
      padding: '8px 12px',
      borderBottom: '3px solid #b91c1c',
      backgroundColor: '#000',
      flexShrink: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '12px',
    }}>
      {/* Decorative bouncing emojis */}
      <div style={{ fontSize: '20px', opacity: 0.6, animation: 'bounce 3s infinite', flexShrink: 0 }}>🎩</div>

      {/* Title + marquee stacked */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
        <h1 className="neon-text" style={{
          fontFamily: "'Press Start 2P', monospace",
          fontSize: 'clamp(10px, 2vw, 18px)',
          color: '#facc15',
          textShadow: '0 0 10px #ffff00, 0 0 20px #ffff00, 0 0 40px #ff8800',
          margin: 0,
          whiteSpace: 'nowrap',
        }}>
          FREDDY'S FAZ-PIZZA BUILDER™
        </h1>

        <div style={{
          backgroundColor: '#450a0a',
          border: '1px solid #dc2626',
          borderRadius: '4px',
          padding: '2px 10px',
          maxWidth: '500px',
          overflow: 'hidden',
        }}>
          <p style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: 'clamp(6px, 1vw, 9px)',
            color: '#4ade80',
            textShadow: '0 0 6px #00ff00',
            margin: 0,
            opacity: glitch ? 0 : 1,
            transition: 'opacity 0.15s',
            whiteSpace: 'nowrap',
          }}>
            {MARQUEE_TEXTS[marqueeIndex]}
          </p>
        </div>
      </div>

      <div style={{ fontSize: '20px', opacity: 0.6, animation: 'bounce 2.5s 0.5s infinite', flexShrink: 0 }}>🍕</div>

      {/* Bake counter */}
      {bakeCount > 0 && (
        <div style={{
          position: 'absolute', top: '6px', right: '10px',
          fontFamily: "'Press Start 2P', monospace",
          fontSize: '8px', color: '#a78bfa',
        }}>
          RUINED: {bakeCount}
        </div>
      )}
    </header>
  );
}
