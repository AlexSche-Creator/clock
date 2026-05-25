export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-left">
        <span className="info-icon">i</span>
        <span>Данные актуальны на <b>01.06.2024 12:30</b></span>
        <span className="footer-sep">Источник: <b>ERP система</b></span>
      </div>
      <button className="refresh-btn">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 12a9 9 0 0 1 15.5-6.3L21 8M21 3v5h-5" />
          <path d="M21 12a9 9 0 0 1-15.5 6.3L3 16M3 21v-5h5" />
        </svg>
        Обновить
      </button>
    </footer>
  );
}
