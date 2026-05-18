import React from 'react';
import { MOTIF_POOL } from '@/lib/motifs';

export const MarginDoodles = () => {
  const leftDoodles = MOTIF_POOL.slice(0, 3);
  const rightDoodles = MOTIF_POOL.slice(3, 6);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {leftDoodles.map((motif, i) => (
        <svg
          key={`l-${i}`}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className="absolute text-foreground"
          style={{
            left: `${Math.random() * 5 + 2}%`,
            top: `${20 + i * 25 + Math.random() * 10}%`,
            opacity: 0.06 + Math.random() * 0.04,
            animation: `float ${10 + i * 5}s infinite ease-in-out`,
          }}
        >
          <path d={motif.svgPath} fill="currentColor" />
        </svg>
      ))}
      
      {rightDoodles.map((motif, i) => (
        <svg
          key={`r-${i}`}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className="absolute text-foreground"
          style={{
            right: `${Math.random() * 5 + 2}%`,
            top: `${25 + i * 25 + Math.random() * 10}%`,
            opacity: 0.06 + Math.random() * 0.04,
            animation: `float ${12 + i * 5}s infinite ease-in-out reverse`,
          }}
        >
          <path d={motif.svgPath} fill="currentColor" />
        </svg>
      ))}

      <style>{`
        @keyframes float {
          0% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(5deg); }
          100% { transform: translateY(0) rotate(0deg); }
        }
      `}</style>
    </div>
  );
};
