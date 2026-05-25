import { useEffect, useId, useRef } from 'react';

const TOP_LABELS = ['350 млрд ₽', '262,5 млрд ₽', '175 млрд ₽', '87,5 млрд ₽', '50 млрд ₽'];
const BOT_LABELS = ['50 млрд ₽', '87,5 млрд ₽', '175 млрд ₽', '262,5 млрд ₽', '350 млрд ₽'];

// Hourglass SVG geometry (matches the canvas dims below).
const W = 220;
const H = 480;
const CENTER = W / 2;
const NECK_Y_TOP = 230;
const NECK_Y_BOT = 250;
const PILE_TOP = 412;

// Outline paths for the two bulbs.
const TOP_BULB = 'M 40 0 C 15 30 0 70 0 110 C 0 165 50 215 100 230 L 120 230 C 170 215 220 165 220 110 C 220 70 205 30 180 0 Z';
const BOT_BULB = 'M 100 250 C 50 265 0 315 0 370 C 0 410 15 450 40 480 L 180 480 C 205 450 220 410 220 370 C 220 315 170 265 120 250 Z';

// Approximate bulb half-width at height y (used to clamp particles inside the glass).
function halfWidthAt(y) {
  if (y < 0 || y > H) return 0;
  if (y <= NECK_Y_TOP) {
    const t = y / NECK_Y_TOP;
    if (t <= 0.5) {
      const u = t / 0.5;
      return 70 + (110 - 70) * (1 - (1 - u) * (1 - u));
    }
    const u = (t - 0.5) / 0.5;
    return 110 - (110 - 10) * u * u;
  }
  if (y < NECK_Y_BOT) return 10;
  const t = (y - NECK_Y_BOT) / (H - NECK_Y_BOT);
  if (t <= 0.5) {
    const u = t / 0.5;
    return 10 + (110 - 10) * (1 - (1 - u) * (1 - u));
  }
  const u = (t - 0.5) / 0.5;
  return 110 - (110 - 70) * u * u;
}

export default function Hourglass({ title, palette, scale = 1, capWide }) {
  const canvasRef = useRef(null);
  const rid = useId().replace(/[:]/g, '');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const dpr = window.devicePixelRatio || 1;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = `${W}px`;
    canvas.style.height = `${H}px`;
    ctx.scale(dpr, dpr);

    const particles = [];
    const STREAM_TARGET = 90;
    const TOP_DRIFT_TARGET = 26;

    function spawnStream() {
      particles.push({
        kind: 'stream',
        x: CENTER + (Math.random() - 0.5) * 4,
        y: 215 + Math.random() * 10,
        vx: (Math.random() - 0.5) * 0.15,
        vy: 1.6 + Math.random() * 1.4,
        r: 0.9 + Math.random() * 1.1,
        a: 0.85 + Math.random() * 0.15,
      });
    }

    function spawnTopDrift() {
      const y = 40 + Math.random() * 150;
      const maxX = halfWidthAt(y) - 4;
      const x = CENTER + (Math.random() - 0.5) * maxX * 1.4;
      particles.push({
        kind: 'top',
        x,
        y,
        vx: 0,
        vy: 0.25 + Math.random() * 0.5,
        r: 0.6 + Math.random() * 0.9,
        a: 0.35 + Math.random() * 0.35,
      });
    }

    let raf;
    function frame() {
      ctx.clearRect(0, 0, W, H);

      const streamCount = particles.reduce((n, p) => n + (p.kind === 'stream' ? 1 : 0), 0);
      const topCount = particles.length - streamCount;
      const streamNeeded = Math.min(4, STREAM_TARGET - streamCount);
      for (let i = 0; i < streamNeeded; i++) spawnStream();
      if (topCount < TOP_DRIFT_TARGET && Math.random() < 0.6) spawnTopDrift();

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.vy += 0.05;
        p.y += p.vy;
        p.x += p.vx;

        if (p.kind === 'top') {
          const dx = CENTER - p.x;
          p.vx += dx * 0.0015;
          p.vx *= 0.96;
          if (p.y > NECK_Y_TOP - 6) {
            particles.splice(i, 1);
            continue;
          }
        } else {
          if (p.y > PILE_TOP - p.r) {
            particles.splice(i, 1);
            continue;
          }
        }

        const halfW = halfWidthAt(p.y);
        const minX = CENTER - halfW + p.r;
        const maxX = CENTER + halfW - p.r;
        if (p.x < minX) { p.x = minX; p.vx = Math.abs(p.vx) * 0.4; }
        if (p.x > maxX) { p.x = maxX; p.vx = -Math.abs(p.vx) * 0.4; }
      }

      // Draw stream first (above) then top drift, with glow.
      for (const p of particles) {
        ctx.globalAlpha = p.a;
        ctx.fillStyle = palette.sand;
        ctx.shadowColor = palette.glow;
        ctx.shadowBlur = p.kind === 'stream' ? 6 : 3;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;

      raf = requestAnimationFrame(frame);
    }
    frame();

    return () => cancelAnimationFrame(raf);
  }, [palette]);

  const glassFill = `url(#glass-${rid})`;
  const shineFill = `url(#shine-${rid})`;
  const pileFill = `url(#pile-${rid})`;

  return (
    <div className="hourglass-wrap" style={{ transform: `scale(${scale})` }}>
      <div className={`hourglass-cap${capWide ? ' wide' : ''}`}>
        <div className="cap-glow" style={{ background: palette.glow }} />
        <span className="cap-title">{title}</span>
      </div>

      <div className="hourglass-body" style={{ width: W, height: H }}>
        <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} className="hourglass-svg">
          <defs>
            <linearGradient id={`glass-${rid}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(140, 190, 255, 0.18)" />
              <stop offset="45%" stopColor="rgba(70, 130, 220, 0.07)" />
              <stop offset="100%" stopColor="rgba(70, 110, 200, 0.20)" />
            </linearGradient>
            <linearGradient id={`shine-${rid}`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="rgba(255,255,255,0.45)" />
              <stop offset="25%" stopColor="rgba(255,255,255,0.05)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </linearGradient>
            <linearGradient id={`pile-${rid}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={palette.sand} />
              <stop offset="100%" stopColor={palette.sandDeep} />
            </linearGradient>
            <radialGradient id={`pileGlow-${rid}`} cx="0.5" cy="0.4" r="0.6">
              <stop offset="0%" stopColor={palette.sand} stopOpacity="0.7" />
              <stop offset="100%" stopColor={palette.sand} stopOpacity="0" />
            </radialGradient>
            <clipPath id={`botClip-${rid}`}>
              <path d={BOT_BULB} />
            </clipPath>
            <clipPath id={`topClip-${rid}`}>
              <path d={TOP_BULB} />
            </clipPath>
          </defs>

          {/* Top bulb */}
          <path d={TOP_BULB} fill={glassFill} stroke="rgba(180, 210, 255, 0.55)" strokeWidth="1.4" />
          <path d={TOP_BULB} fill={shineFill} opacity="0.9" />
          {/* Bottom bulb */}
          <path d={BOT_BULB} fill={glassFill} stroke="rgba(180, 210, 255, 0.55)" strokeWidth="1.4" />
          <path d={BOT_BULB} fill={shineFill} opacity="0.9" />

          {/* Neck connector outline */}
          <path d="M100 230 L120 230 L120 250 L100 250 Z" fill="rgba(20,30,55,0.6)" stroke="rgba(180,210,255,0.55)" strokeWidth="1.2" />

          {/* Scale tick marks + labels in top bulb */}
          <g className="scale" fontFamily="Inter, sans-serif" fontSize="10" fill="rgba(220,230,250,0.55)" textAnchor="middle">
            {TOP_LABELS.map((label, i) => {
              const y = 70 + i * 28;
              return (
                <g key={`t${i}`}>
                  <line x1={CENTER - 38} x2={CENTER + 38} y1={y - 4} y2={y - 4} stroke="rgba(220,230,250,0.18)" strokeWidth="0.7" />
                  <text x={CENTER} y={y + 4}>{label}</text>
                </g>
              );
            })}
          </g>

          {/* Sand pile fill — clipped to the bulb shape so edges follow the glass */}
          <g clipPath={`url(#botClip-${rid})`}>
            <path
              d="M -10 412 C 60 392 160 392 230 412 L 230 490 L -10 490 Z"
              fill={pileFill}
            />
            <ellipse cx={CENTER} cy="406" rx="90" ry="7" fill={`url(#pileGlow-${rid})`} />
          </g>

          {/* Scale tick marks + labels in bottom bulb (above pile) */}
          <g className="scale" fontFamily="Inter, sans-serif" fontSize="10" fill="rgba(220,230,250,0.55)" textAnchor="middle">
            {BOT_LABELS.slice(0, 4).map((label, i) => {
              const y = 285 + i * 26;
              return (
                <g key={`b${i}`}>
                  <line x1={CENTER - 38} x2={CENTER + 38} y1={y - 4} y2={y - 4} stroke="rgba(220,230,250,0.18)" strokeWidth="0.7" />
                  <text x={CENTER} y={y + 4}>{label}</text>
                </g>
              );
            })}
          </g>

          {/* Outline overlay to keep edges crisp on top of canvas */}
          <path d={TOP_BULB} fill="none" stroke="rgba(220,235,255,0.35)" strokeWidth="1" />
          <path d={BOT_BULB} fill="none" stroke="rgba(220,235,255,0.35)" strokeWidth="1" />
        </svg>

        <canvas ref={canvasRef} className="sand-canvas" />
      </div>

      <div className="pedestal">
        <div className="pedestal-ring" style={{ '--ring-color': palette.ring }} />
        <div className="pedestal-base" />
      </div>
    </div>
  );
}
