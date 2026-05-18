import React from 'react';

export const Logo = ({ className, size = 64 }: { className?: string, size?: number }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ overflow: 'visible' }}
    >
      <path 
        d="M20 50 Q 30 20, 50 15 T 80 50 Q 70 80, 50 85 T 20 50 Z" 
        stroke="currentColor" 
        strokeWidth="3" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        fill="none"
        className="ink-reveal"
      />
      <circle cx="50" cy="50" r="8" fill="currentColor" className="ink-reveal" style={{ animationDelay: '0.2s' }}/>
      <path d="M45 45 Q 50 40, 55 45" stroke="currentColor" strokeWidth="2" fill="none" className="ink-reveal" style={{ animationDelay: '0.3s' }}/>
      <path d="M10 50 Q 5 45, 15 40" stroke="currentColor" strokeWidth="2" fill="none" strokeDasharray="4 4" className="ink-reveal" style={{ animationDelay: '0.4s' }}/>
      <path d="M90 50 Q 95 55, 85 60" stroke="currentColor" strokeWidth="2" fill="none" strokeDasharray="4 4" className="ink-reveal" style={{ animationDelay: '0.5s' }}/>
      <path d="M40 80 Q 50 95, 60 80" stroke="currentColor" strokeWidth="2" fill="none" className="ink-reveal" style={{ animationDelay: '0.6s' }}/>
    </svg>
  );
};
