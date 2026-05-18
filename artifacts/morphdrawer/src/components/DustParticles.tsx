import React, { useEffect, useState } from 'react';

export const DustParticles = () => {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; duration: number; delay: number; driftX: number }>>([]);

  useEffect(() => {
    // Generate 18-22 static dust motes
    const count = Math.floor(Math.random() * 5) + 18;
    const motes = Array.from({ length: count }).map((_, i) => {
      // varied speeds
      const speedType = Math.random();
      const duration = speedType > 0.8 ? (Math.random() * 5 + 5) : speedType > 0.4 ? (Math.random() * 10 + 10) : (Math.random() * 20 + 20);
      
      return {
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        duration,
        delay: Math.random() * -20,
        driftX: (Math.random() - 0.5) * 100, // Horizontal drift
      };
    });
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
            animation: `drift-${p.id} ${p.duration}s infinite linear`,
            animationDelay: `${p.delay}s`,
            opacity: 0.6,
          }}
        />
      ))}
      <style>{`
        ${particles.map(p => `
          @keyframes drift-${p.id} {
            0% { transform: translateY(0) translateX(0) rotate(0deg); opacity: 0; }
            20% { opacity: 0.8; }
            80% { opacity: 0.8; }
            100% { transform: translateY(-100px) translateX(${p.driftX}px) rotate(360deg); opacity: 0; }
          }
        `).join('\n')}
      `}</style>
    </div>
  );
};
