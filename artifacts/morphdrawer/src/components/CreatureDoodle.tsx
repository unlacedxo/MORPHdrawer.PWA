import React from 'react';
import { CreatureForm } from '@/lib/generator';

interface CreatureDoodleProps {
  form: CreatureForm;
  size?: number;
  opacity?: number;
  className?: string;
}

function seededRandom(seed: string, index: number): number {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = Math.imul(31, h) + seed.charCodeAt(i) | 0;
  }
  h = Math.imul(h, index + 1) ^ (h >>> 16);
  return Math.abs(h % 1000) / 1000;
}

export const CreatureDoodle = ({ form, size = 120, opacity = 0.15, className = "" }: CreatureDoodleProps) => {
  const s = form.shape.toLowerCase();
  let bodyW = size * 0.38;
  let bodyH = size * 0.42;

  if (s.includes("tall") || s.includes("tube") || s.includes("pillar")) {
    bodyW = size * 0.28;
    bodyH = size * 0.55;
  } else if (s.includes("squat") || s.includes("square") || s.includes("slab")) {
    bodyW = size * 0.50;
    bodyH = size * 0.30;
  } else if (s.includes("tiny")) {
    bodyW = size * 0.30;
    bodyH = size * 0.28;
  }

  const cx = size / 2;
  const cy = size / 2;
  
  const rTL = seededRandom(form.id, 0) * (bodyW * 0.4) + bodyW * 0.1;
  const rTR = seededRandom(form.id, 1) * (bodyW * 0.4) + bodyW * 0.1;
  const rBR = seededRandom(form.id, 2) * (bodyW * 0.4) + bodyW * 0.1;
  const rBL = seededRandom(form.id, 3) * (bodyW * 0.4) + bodyW * 0.1;

  let lopsideX = 0;
  if (s.includes("floppy") || s.includes("droopy") || s.includes("lopsided")) {
    lopsideX = (seededRandom(form.id, 4) - 0.5) * (bodyW * 0.3);
  }

  const left = cx - bodyW / 2;
  const right = cx + bodyW / 2;
  const top = cy - bodyH / 2;
  const bottom = cy + bodyH / 2;
  const tLop = top + lopsideX;

  const bodyPath = `
    M ${left + rTL} ${tLop}
    Q ${right} ${tLop - rTL} ${right} ${tLop + rTR}
    L ${right} ${bottom - rBR}
    Q ${right} ${bottom} ${right - rBR} ${bottom}
    L ${left + rBL} ${bottom}
    Q ${left} ${bottom} ${left} ${bottom - rBL}
    L ${left} ${tLop + rTL}
    Q ${left} ${tLop} ${left + rTL} ${tLop}
    Z
  `;

  const hasSpikes = s.includes("spiky") || s.includes("thorny");

  const f = form.face.toLowerCase();
  const giantEye = f.includes("giant") || f.includes("single") || f.includes("huge");
  
  let eyes = null;
  const eyeY = cy - bodyH * 0.1;
  if (giantEye) {
    const eyeR = bodyW * 0.28;
    eyes = (
      <g>
        <circle cx={cx} cy={eyeY} r={eyeR} fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx={cx} cy={eyeY} r={eyeR * 0.2} fill="currentColor" />
      </g>
    );
  } else {
    const eyeR = bodyW * 0.12;
    const diff = seededRandom(form.id, 5) * 0.4 + 0.8;
    const leftR = eyeR * diff;
    const rightR = eyeR * (1 / diff);
    
    const isMoon = f.includes("crescent") || f.includes("moon");
    eyes = (
      <g>
        <circle cx={cx - bodyW * 0.2} cy={eyeY} r={leftR} fill={isMoon ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeDasharray={isMoon ? `${leftR*3.14} ${leftR*3.14}` : "none"} />
        <circle cx={cx + bodyW * 0.2} cy={eyeY} r={rightR} fill={isMoon ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeDasharray={isMoon ? `${rightR*3.14} ${rightR*3.14}` : "none"} />
        {!isMoon && <circle cx={cx - bodyW * 0.2} cy={eyeY} r={leftR * 0.3} fill="currentColor" />}
        {!isMoon && <circle cx={cx + bodyW * 0.2} cy={eyeY} r={rightR * 0.3} fill="currentColor" />}
      </g>
    );
  }

  const mouthY = eyeY + bodyH * 0.2;
  const mouthW = bodyW * 0.2;
  const mouthPath = `M ${cx - mouthW/2} ${mouthY} Q ${cx} ${mouthY + mouthW/2} ${cx + mouthW/2} ${mouthY}`;

  const armSide = seededRandom(form.id, 6) > 0.5 ? 1 : -1;
  const armX = cx + (bodyW/2) * armSide;
  const armY = cy;
  const armPath = `M ${armX} ${armY} Q ${armX + armSide * bodyW * 0.3} ${armY - bodyH * 0.1} ${armX + armSide * bodyW * 0.4} ${armY + bodyH * 0.1}`;

  const numLegs = Math.floor(seededRandom(form.id, 7) * 3) + 2;
  const legs = Array.from({ length: numLegs }).map((_, i) => {
    const lx = left + (bodyW / (numLegs + 1)) * (i + 1) + (seededRandom(form.id, 8 + i) - 0.5) * 10;
    return (
      <rect key={i} x={lx - 4} y={bottom - 2} width="8" height={10 + seededRandom(form.id, 12 + i) * 6} rx="4" fill="currentColor" />
    );
  });

  return (
    <svg 
      width={size} 
      height={size} 
      viewBox={`0 0 ${size} ${size}`} 
      className={className}
      style={{ opacity }}
      aria-hidden="true"
    >
      {hasSpikes && (
        <path d={`M ${cx - bodyW*0.3} ${tLop} L ${cx - bodyW*0.2} ${tLop - 15} L ${cx - bodyW*0.1} ${tLop} M ${cx - bodyW*0.05} ${tLop} L ${cx + bodyW*0.05} ${tLop - 18} L ${cx + bodyW*0.15} ${tLop} M ${cx + bodyW*0.2} ${tLop} L ${cx + bodyW*0.3} ${tLop - 12} L ${cx + bodyW*0.4} ${tLop}`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      )}
      <path d={bodyPath} fill="none" stroke="currentColor" strokeWidth="2" />
      {eyes}
      <path d={mouthPath} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d={armPath} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx={armX + armSide * bodyW * 0.4} cy={armY + bodyH * 0.1} r="3" fill="currentColor" />
      {legs}
    </svg>
  );
};
