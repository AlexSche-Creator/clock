import { useId } from 'react';

interface Palette {
  light: string;
  deep: string;
  glow: string;
  ring: string;
  chip: string;
}

interface Props {
  title: string;
  palette: Palette;
  featured?: boolean;
}

// ⬇ HOURGLASS GEOMETRY ────────────────────────────────────────────────────
//   Change these to reshape the glass. CX is the horizontal centre.
//   `TOP_BULB`/`BOT_BULB` are full closed SVG paths; tweak control points
//   to make bulbs taller / rounder / more elegant.
const W = 280;
const H = 720;
const CX = 140;

const CAP_BOTTOM = 50;       // bottom edge of the metallic cap
const NECK_TOP = 296;        // where top bulb meets the neck
const NECK_BOT = 324;        // where neck meets bottom bulb
const PILE_TOP = 484;        // visual surface of the accumulated sand
const BOT_BULB_BOTTOM = 602; // bottom of the bottom bulb
const PED_TOP = 604;         // pedestal top ellipse y-centre

// Top bulb — slimmer, more elongated (smaller than the bottom).
const TOP_BULB =
  'M 90 50 C 60 56, 42 102, 42 152 C 42 222, 92 286, 131 296 L 149 296 C 188 286, 238 222, 238 152 C 238 102, 220 56, 190 50 Z';

// Bottom bulb — clearly larger, rounder, more voluminous.
const BOT_BULB =
  'M 131 324 C 80 336, 14 392, 14 476 C 14 544, 44 602, 76 602 L 204 602 C 236 602, 266 544, 266 476 C 266 392, 200 336, 149 324 Z';

// Tapered neck connecting the two bulbs.
const NECK =
  'M 131 296 C 134 302, 134 318, 131 324 L 149 324 C 146 318, 146 302, 149 296 Z';

const TOP_LABELS = ['350 млрд ₽', '262,5 млрд ₽', '175 млрд ₽', '87,5 млрд ₽', '50 млрд ₽'];
const BOT_LABELS = ['50 млрд ₽', '87,5 млрд ₽', '175 млрд ₽', '262,5 млрд ₽'];

export default function Hourglass({ title, palette, featured }: Props) {
  // useId() guarantees unique <defs> IDs per instance (needed for SVG filters).
  const u = useId().replace(/[:]/g, '');
  const capWidth = featured ? 230 : 160;
  const capX = CX - capWidth / 2;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width={W}
      height={H}
      className="block drop-shadow-[0_22px_30px_rgba(40,80,160,0.18)]"
    >
      <defs>
        {/* Glass gradient — very light, picks up the column tint a touch. */}
        <linearGradient id={`glass-${u}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.92)" />
          <stop offset="55%" stopColor="rgba(235,243,255,0.55)" />
          <stop offset="100%" stopColor="rgba(205,222,248,0.55)" />
        </linearGradient>
        {/* White shine band that sits on the left of each bulb. */}
        <linearGradient id={`shine-${u}`} x1="0" y1="0" x2="1" y2="0.6">
          <stop offset="0%" stopColor="rgba(255,255,255,0.85)" />
          <stop offset="40%" stopColor="rgba(255,255,255,0)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
        {/* Sand gradient (top → bottom of the pile / surface). */}
        <linearGradient id={`sand-${u}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={palette.light} />
          <stop offset="100%" stopColor={palette.deep} />
        </linearGradient>
        {/* Inverted gradient for the top sand mass. */}
        <linearGradient id={`sandTop-${u}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={palette.deep} stopOpacity="0.9" />
          <stop offset="100%" stopColor={palette.light} />
        </linearGradient>
        {/* Soft glow for the falling stream. */}
        <filter id={`streamGlow-${u}`} x="-50%" y="-10%" width="200%" height="120%">
          <feGaussianBlur stdDeviation="2.2" />
        </filter>
        {/* Tighter glow for individual sand grains. */}
        <filter id={`grainGlow-${u}`} x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="1.1" />
        </filter>
        {/* Subtle drop shadow on the glass body. */}
        <filter id={`bodyShadow-${u}`} x="-30%" y="-10%" width="160%" height="130%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="6" />
          <feOffset dx="0" dy="8" result="b" />
          <feComponentTransfer><feFuncA type="linear" slope="0.20" /></feComponentTransfer>
          <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        {/* Cap metallic gradient. */}
        <linearGradient id={`cap-${u}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="55%" stopColor="#EEF3FB" />
          <stop offset="100%" stopColor="#D4DEEF" />
        </linearGradient>
        {/* Pedestal top surface gradient. */}
        <radialGradient id={`pedTop-${u}`} cx="0.5" cy="0.4" r="0.6">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#DAE3F2" />
        </radialGradient>
        <linearGradient id={`pedSide-${u}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E2EAF6" />
          <stop offset="100%" stopColor="#B7C5DD" />
        </linearGradient>
        {/* Clip paths so sand never spills outside the glass. */}
        <clipPath id={`clipTop-${u}`}><path d={TOP_BULB} /></clipPath>
        <clipPath id={`clipBot-${u}`}><path d={BOT_BULB} /></clipPath>
      </defs>

      {/* ───── PEDESTAL ───── */}
      <g>
        {/* Diffuse ground shadow */}
        <ellipse cx={CX} cy={H - 16} rx="150" ry="18" fill="rgba(30,60,120,0.28)" filter={`url(#streamGlow-${u})`} />
        <ellipse cx={CX} cy={H - 14} rx="120" ry="10" fill="rgba(30,60,120,0.20)" />
        {/* Bottom ellipse (the base sitting on the ground) */}
        <ellipse cx={CX} cy={H - 30} rx="118" ry="14" fill="#9FB2D2" />
        {/* Pedestal sides */}
        <path
          d={`M ${CX - 138} ${PED_TOP} L ${CX - 118} ${H - 30} Q ${CX} ${H - 22} ${CX + 118} ${H - 30} L ${CX + 138} ${PED_TOP} Z`}
          fill={`url(#pedSide-${u})`}
        />
        {/* Side highlight on the left */}
        <path
          d={`M ${CX - 138} ${PED_TOP + 4} L ${CX - 122} ${H - 36}`}
          stroke="rgba(255,255,255,0.7)"
          strokeWidth="2"
          fill="none"
        />
        {/* Pedestal top surface */}
        <ellipse cx={CX} cy={PED_TOP} rx="138" ry="18" fill={`url(#pedTop-${u})`} stroke="#B7C7E2" strokeWidth="1.2" />
        {/* Inner subtle inset */}
        <ellipse cx={CX} cy={PED_TOP} rx="126" ry="14" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="0.7" />
        {/* Bright outer neon ring */}
        <ellipse
          cx={CX}
          cy={PED_TOP + 1}
          rx="138"
          ry="18"
          fill="none"
          stroke={palette.ring}
          strokeWidth="4"
          opacity="0.55"
          filter={`url(#streamGlow-${u})`}
          className="ring-pulse"
        />
        {/* Sharp inner neon line */}
        <ellipse cx={CX} cy={PED_TOP + 1} rx="138" ry="18" fill="none" stroke={palette.ring} strokeWidth="1.6" opacity="0.95" />
        {/* Reflection wash on the pedestal top */}
        <ellipse cx={CX} cy={PED_TOP - 4} rx="100" ry="6" fill="rgba(255,255,255,0.7)" />
      </g>

      {/* ───── BULB GLASS (back layer) ───── */}
      <g filter={`url(#bodyShadow-${u})`}>
        <path d={TOP_BULB} fill={`url(#glass-${u})`} stroke="#B7C7E2" strokeWidth="1.4" />
        <path d={BOT_BULB} fill={`url(#glass-${u})`} stroke="#B7C7E2" strokeWidth="1.4" />
        <path d={NECK} fill="rgba(220,232,250,0.7)" stroke="#B7C7E2" strokeWidth="1.2" />
      </g>

      {/* ───── TOP SAND MASS (clipped to top bulb) ───── */}
      <g clipPath={`url(#clipTop-${u})`}>
        {/* Bulk fill from cap-level down to the wavy surface */}
        <path
          d={`M 20 ${CAP_BOTTOM} L 260 ${CAP_BOTTOM}
              L 260 190
              C 220 200, 200 198, 180 192
              C 158 184, 140 196, 120 200
              C 100 204, 80 196, 60 190
              C 40 184, 28 196, 20 200 Z`}
          fill={`url(#sandTop-${u})`}
          className="sand-surface"
        />
        {/* Tiny shine along the cap line */}
        <rect x="20" y={CAP_BOTTOM} width="240" height="6" fill="rgba(255,255,255,0.25)" />
      </g>

      {/* ───── BOTTOM SAND PILE (mound, clipped to bottom bulb) ───── */}
      <g clipPath={`url(#clipBot-${u})`}>
        <path
          d={`M -10 ${PILE_TOP + 6}
              C 60 ${PILE_TOP - 18}, 110 ${PILE_TOP - 28}, 140 ${PILE_TOP - 30}
              C 170 ${PILE_TOP - 28}, 220 ${PILE_TOP - 18}, 290 ${PILE_TOP + 6}
              L 290 ${BOT_BULB_BOTTOM + 4}
              L -10 ${BOT_BULB_BOTTOM + 4} Z`}
          fill={`url(#sand-${u})`}
        />
        {/* Peak highlight */}
        <ellipse cx={CX} cy={PILE_TOP - 26} rx="60" ry="6" fill="rgba(255,255,255,0.35)" />
        {/* Soft inner shadow at the bowl bottom */}
        <ellipse cx={CX} cy={BOT_BULB_BOTTOM - 6} rx="120" ry="10" fill="rgba(0,0,0,0.10)" />
      </g>

      {/* ───── FALLING SAND STREAM ───── */}
      {/* Wide soft halo behind the stream */}
      <line
        x1={CX} y1={NECK_BOT - 2}
        x2={CX} y2={PILE_TOP - 20}
        stroke={palette.deep}
        strokeWidth="10"
        strokeLinecap="round"
        opacity="0.22"
        filter={`url(#streamGlow-${u})`}
      />
      {/* Inner halo */}
      <line
        x1={CX} y1={NECK_BOT - 2}
        x2={CX} y2={PILE_TOP - 20}
        stroke={palette.deep}
        strokeWidth="5"
        strokeLinecap="round"
        opacity="0.35"
      />
      {/* Main dashed stream (animated via CSS keyframes — see index.css) */}
      <line
        x1={CX} y1={NECK_BOT - 4}
        x2={CX} y2={PILE_TOP - 18}
        stroke={palette.deep}
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeDasharray="4 5"
        className="sand-stream"
      />
      {/* Bright inner core dashes */}
      <line
        x1={CX} y1={NECK_BOT - 4}
        x2={CX} y2={PILE_TOP - 18}
        stroke={palette.light}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeDasharray="3 6"
        className="sand-stream"
      />

      {/* ───── SAND PARTICLES (small grains with staggered delays) ───── */}
      {Array.from({ length: 14 }).map((_, i) => {
        const xJitter = ((i * 37) % 7) - 3;
        const delay = (i * 0.10).toFixed(2);
        const fall = PILE_TOP - NECK_BOT - 14;
        return (
          <circle
            key={i}
            cx={CX + xJitter * 0.6}
            cy={NECK_BOT - 6}
            r={1.2 + ((i * 13) % 9) / 14}
            fill={palette.deep}
            className="sand-particle"
            style={{ animationDelay: `${delay}s`, ['--fall' as never]: `${fall}px` }}
            filter={`url(#grainGlow-${u})`}
          />
        );
      })}
      {/* Bright sparkle grains */}
      {Array.from({ length: 6 }).map((_, i) => (
        <circle
          key={`s${i}`}
          cx={CX + (i - 2.5) * 1.2}
          cy={NECK_BOT - 4}
          r="0.9"
          fill={palette.light}
          className="sand-particle"
          style={{ animationDelay: `${(0.05 + i * 0.18).toFixed(2)}s`, ['--fall' as never]: `${PILE_TOP - NECK_BOT - 20}px` }}
        />
      ))}

      {/* ───── SCALE LABELS ───── */}
      <g fontFamily="Inter, system-ui, sans-serif" fontSize="10" fill="#7A8AAB" textAnchor="middle">
        {TOP_LABELS.map((label, i) => {
          const y = 92 + i * 32;
          return (
            <g key={`t${i}`}>
              <line x1={CX - 42} x2={CX + 42} y1={y - 6} y2={y - 6} stroke="#C8D3E8" strokeWidth="0.7" />
              <text x={CX} y={y + 4}>{label}</text>
            </g>
          );
        })}
        {BOT_LABELS.map((label, i) => {
          const y = 348 + i * 28;
          return (
            <g key={`b${i}`}>
              <line x1={CX - 42} x2={CX + 42} y1={y - 6} y2={y - 6} stroke="#C8D3E8" strokeWidth="0.7" />
              <text x={CX} y={y + 4}>{label}</text>
            </g>
          );
        })}
      </g>

      {/* ───── GLASS HIGHLIGHTS (front) ───── */}
      <g pointerEvents="none">
        <path d={TOP_BULB} fill={`url(#shine-${u})`} opacity="0.85" />
        <path d={BOT_BULB} fill={`url(#shine-${u})`} opacity="0.85" />
        {/* Subtle outline on top of everything to keep edges crisp */}
        <path d={TOP_BULB} fill="none" stroke="rgba(140,170,210,0.55)" strokeWidth="0.8" />
        <path d={BOT_BULB} fill="none" stroke="rgba(140,170,210,0.55)" strokeWidth="0.8" />
      </g>

      {/* ───── METALLIC CAP WITH NEON RING ───── */}
      <g>
        <ellipse cx={CX} cy={CAP_BOTTOM + 6} rx={capWidth / 2 + 4} ry="10" fill={palette.glow} opacity="0.7" filter={`url(#streamGlow-${u})`} />
        <rect
          x={capX}
          y={6}
          width={capWidth}
          height={42}
          rx="22"
          fill={`url(#cap-${u})`}
          stroke="#C9D5EA"
          strokeWidth="1.2"
        />
        {/* highlight strip on the cap */}
        <rect x={capX + 8} y="10" width={capWidth - 16} height="6" rx="3" fill="rgba(255,255,255,0.85)" />
        {/* neon glowing rim */}
        <ellipse
          cx={CX}
          cy={CAP_BOTTOM - 2}
          rx={capWidth / 2 - 4}
          ry="4"
          fill="none"
          stroke={palette.ring}
          strokeWidth="2.4"
          filter={`url(#streamGlow-${u})`}
          className="ring-pulse"
        />
        <ellipse cx={CX} cy={CAP_BOTTOM - 2} rx={capWidth / 2 - 4} ry="4" fill="none" stroke={palette.ring} strokeWidth="1" />
        {/* title */}
        <text
          x={CX}
          y={33}
          textAnchor="middle"
          fontFamily="Inter, system-ui, sans-serif"
          fontSize={featured ? 16 : 13.5}
          fontWeight="700"
          letterSpacing={featured ? '1.8' : '1.4'}
          fill="#142544"
        >
          {title}
        </text>
      </g>
    </svg>
  );
}
