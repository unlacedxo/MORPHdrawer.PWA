import React, { useEffect, useState } from 'react';

export const DustParticles = () => {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; duration: number; delay: number }>>([]);

  useEffect(() => {
    // Generate static dust motes
    const motes = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * -20,
    }));
    setParticles(motes);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 10 }}>
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: 'var(--dust-color)',
            animation: `drift ${p.duration}s infinite linear`,
            animationDelay: `${p.delay}s`,
            opacity: 0.6,
          }}
        />
      ))}
      <style>{`
        @keyframes drift {
          0% { transform: translateY(0) translateX(0) rotate(0deg); opacity: 0; }
          20% { opacity: 0.8; }
          80% { opacity: 0.8; }
          100% { transform: translateY(-100px) translateX(50px) rotate(360deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
};
