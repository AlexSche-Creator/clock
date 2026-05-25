export default function StatsCard({ plan, fact, percent, accent, elevated }) {
  return (
    <div className={`stats-card${elevated ? ' elevated' : ''}`} style={{ '--accent': accent }}>
      <div className="stats-title">ВЫРУЧКА</div>
      <div className="stats-row">
        <div className="stats-col">
          <div className="stats-label">ПЛАН</div>
          <div className="stats-value">{plan}</div>
          <div className="stats-unit">млрд ₽</div>
        </div>
        <div className="stats-col">
          <div className="stats-label">ФАКТ</div>
          <div className="stats-value">{fact}</div>
          <div className="stats-unit">млрд ₽</div>
        </div>
      </div>
      <div className="progress-wrap">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${percent}%` }} />
        </div>
        <div className="progress-meta">
          <span className="progress-pct">{percent}%</span>
          <span className="progress-text">выполнение плана</span>
        </div>
      </div>
    </div>
  );
}
