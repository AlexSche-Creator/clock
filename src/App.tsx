import Header from './components/Header';
import DashboardTitle from './components/DashboardTitle';
import HourglassScene from './components/HourglassScene';
import FooterStatus from './components/FooterStatus';

export default function App() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Decorative background layer (orbits + dot patterns). */}
      <BackgroundDecor />

      <div className="relative z-10 flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 px-8 pt-2 pb-6 md:px-14 lg:px-20">
          <DashboardTitle />
          <HourglassScene />
        </main>
        <FooterStatus />
      </div>
    </div>
  );
}

function BackgroundDecor() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {/* Faint dot pattern, left side */}
      <svg className="absolute -left-10 top-24 opacity-[0.35]" width="320" height="520" viewBox="0 0 320 520">
        <defs>
          <pattern id="dotsL" x="0" y="0" width="22" height="22" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.4" fill="#B7C7E2" />
          </pattern>
        </defs>
        <rect width="320" height="520" fill="url(#dotsL)" />
      </svg>

      {/* Faint dot pattern, right side */}
      <svg className="absolute -right-10 top-40 opacity-[0.30]" width="300" height="500" viewBox="0 0 300 500">
        <defs>
          <pattern id="dotsR" x="0" y="0" width="22" height="22" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.4" fill="#B7C7E2" />
          </pattern>
        </defs>
        <rect width="300" height="500" fill="url(#dotsR)" />
      </svg>

      {/* Thin orbits in the lower center */}
      <svg
        className="absolute left-1/2 bottom-[-220px] -translate-x-1/2 opacity-70"
        width="1400" height="600" viewBox="0 0 1400 600"
      >
        <defs>
          <linearGradient id="orbit" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#CBDAF3" stopOpacity="0" />
            <stop offset="50%" stopColor="#CBDAF3" stopOpacity="1" />
            <stop offset="100%" stopColor="#CBDAF3" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[260, 220, 180, 140, 100].map((ry, i) => (
          <ellipse
            key={i}
            cx="700"
            cy="300"
            rx={680 - i * 80}
            ry={ry}
            fill="none"
            stroke="url(#orbit)"
            strokeWidth={i === 0 ? 1.2 : 0.8}
            opacity={0.55 - i * 0.07}
          />
        ))}
      </svg>

      {/* Soft color blobs hinting at the column accents */}
      <div className="absolute left-[8%] top-[55%] h-[280px] w-[280px] rounded-full bg-[#D7E7FF] blur-[80px] opacity-60" />
      <div className="absolute right-[8%] top-[58%] h-[260px] w-[260px] rounded-full bg-[#EADCFF] blur-[80px] opacity-55" />
      <div className="absolute left-1/2 top-[65%] -translate-x-1/2 h-[320px] w-[420px] rounded-full bg-[#FFE3C9] blur-[90px] opacity-55" />
    </div>
  );
}
