import { Info, RefreshCcw } from 'lucide-react';

export default function FooterStatus() {
  return (
    <footer className="relative z-10 flex items-center justify-between px-8 py-4 md:px-14 lg:px-20">
      <div className="flex items-center gap-5 text-[12px] text-inkSoft">
        <span className="inline-flex items-center gap-1.5">
          <Info size={14} className="text-inkMute" />
          Данные актуальны на <b className="text-ink">&nbsp;01.06.2024 12:30</b>
        </span>
        <span>Источник:&nbsp;<b className="text-ink">ERP система</b></span>
      </div>
      <button className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-white/80 px-3 py-1.5 text-[12px] font-medium text-[#1478FF] shadow-sm backdrop-blur transition hover:bg-white">
        <RefreshCcw size={13} />
        Обновить
      </button>
    </footer>
  );
}
