import { Bell, Calendar, Filter } from 'lucide-react';

const navItems = ['Дашборд', 'Аналитика', 'Отчеты', 'Планирование'];

export default function Header() {
  return (
    <header className="relative z-20 flex items-center justify-between px-8 py-5 md:px-14 lg:px-20">
      <div className="flex items-center gap-10">
        <div className="flex items-center gap-2.5">
          <Logo />
          <span className="text-[17px] font-semibold tracking-wide text-ink">
            BI.<span className="font-extrabold text-[#1478FF]">ROSEL</span>
          </span>
        </div>
        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((label, i) => {
            const active = i === 0;
            return (
              <a
                key={label}
                href="#"
                className={
                  'relative pb-1.5 text-[14px] transition-colors ' +
                  (active ? 'text-ink font-semibold' : 'text-inkMute hover:text-inkSoft')
                }
              >
                {label}
                {active && (
                  <span className="absolute -bottom-px left-0 right-0 h-[2px] rounded-full bg-gradient-to-r from-[#1478FF] to-[#54C4FF]" />
                )}
              </a>
            );
          })}
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <span className="hidden text-[13px] text-inkSoft md:block">
          Текущий период:&nbsp;<span className="font-semibold text-ink">Июнь 2024</span>
        </span>
        <IconBtn><Calendar size={18} /></IconBtn>
        <IconBtn><Filter size={18} /></IconBtn>
        <IconBtn badge="3"><Bell size={18} /></IconBtn>
        <Avatar />
      </div>
    </header>
  );
}

function IconBtn({ children, badge }: { children: React.ReactNode; badge?: string }) {
  return (
    <button className="relative grid h-9 w-9 place-items-center rounded-lg border border-line bg-white/70 text-inkSoft shadow-sm backdrop-blur transition hover:text-ink hover:bg-white">
      {children}
      {badge && (
        <span className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-[#1478FF] px-1 text-[10px] font-bold text-white shadow">
          {badge}
        </span>
      )}
    </button>
  );
}

function Avatar() {
  return (
    <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-[#5A8CFF] to-[#2C4EA6] text-[12px] font-bold text-white shadow-md">
      SL
    </div>
  );
}

function Logo() {
  return (
    <svg width="28" height="28" viewBox="0 0 32 32">
      <defs>
        <linearGradient id="logoGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#54C4FF" />
          <stop offset="100%" stopColor="#1478FF" />
        </linearGradient>
      </defs>
      <circle cx="16" cy="16" r="14" fill="none" stroke="url(#logoGrad)" strokeWidth="2.4" />
      <circle cx="16" cy="16" r="9" fill="none" stroke="url(#logoGrad)" strokeWidth="1.2" opacity="0.55" />
      <circle cx="16" cy="16" r="4" fill="url(#logoGrad)" />
    </svg>
  );
}
