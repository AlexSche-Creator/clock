export default function TopBar() {
  return (
    <div className="topbar">
      <div className="topbar-left">
        <div className="brand">
          <div className="brand-logo">
            <svg viewBox="0 0 32 32" width="28" height="28">
              <circle cx="16" cy="16" r="14" fill="none" stroke="#3a9eff" strokeWidth="2.2" />
              <circle cx="16" cy="16" r="4" fill="#3a9eff" />
              <circle cx="16" cy="16" r="9" fill="none" stroke="#3a9eff" strokeWidth="1.2" opacity="0.6" />
            </svg>
          </div>
          <span className="brand-name">BI.<b>ROSEL</b></span>
        </div>

        <nav className="nav">
          <a className="nav-link active" href="#">Дашборд</a>
          <a className="nav-link" href="#">Аналитика</a>
          <a className="nav-link" href="#">Отчеты</a>
          <a className="nav-link" href="#">Планирование</a>
        </nav>
      </div>

      <div className="topbar-right">
        <span className="period">Текущий период: <b>Июнь 2024</b></span>
        <button className="icon-btn" title="Календарь">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6">
            <rect x="3" y="5" width="18" height="16" rx="2" />
            <path d="M3 9h18M8 3v4M16 3v4" />
          </svg>
        </button>
        <button className="icon-btn" title="Фильтр">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M3 5h18l-7 9v6l-4-2v-4z" />
          </svg>
        </button>
        <button className="icon-btn" title="Уведомления">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M6 8a6 6 0 0 1 12 0v5l2 3H4l2-3z" />
            <path d="M10 19a2 2 0 0 0 4 0" />
          </svg>
          <span className="badge">3</span>
        </button>
        <div className="avatar">SL</div>
      </div>
    </div>
  );
}
