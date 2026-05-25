import { motion } from 'framer-motion';
import { progressOf, ru, type Segment } from '../data/segments';

interface Palette { light: string; deep: string; chip: string; }

export default function KpiCard({ segment, palette }: { segment: Segment; palette: Palette }) {
  const fraction = progressOf(segment);
  const percent = (fraction * 100).toFixed(1).replace('.', ',');
  const featured = !!segment.featured;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.15 }}
      className={
        'relative -mt-2 w-[300px] rounded-2xl border border-line bg-white/90 px-5 py-4 backdrop-blur ' +
        (featured ? 'shadow-cardLg w-[340px] z-10' : 'shadow-card')
      }
    >
      {featured && (
        <>
          <span className="absolute left-3 top-3 text-[14px] font-bold" style={{ color: palette.chip }}>+</span>
          <span className="absolute right-3 top-3 text-[14px] font-bold" style={{ color: palette.chip }}>+</span>
        </>
      )}

      <div className="mb-3 text-center text-[11px] font-semibold tracking-[2px] text-inkSoft">
        ВЫРУЧКА
      </div>

      <div className="mb-3 grid grid-cols-2 gap-3">
        <Cell label="ПЛАН" value={ru(segment.plan)} />
        <Cell label="ФАКТ" value={ru(segment.fact)} />
      </div>

      <div className="mt-1 h-[5px] w-full overflow-hidden rounded-full bg-line">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${fraction * 100}%` }}
          transition={{ duration: 1.0, delay: 0.35, ease: [0.22, 0.61, 0.36, 1] }}
          className="h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, ${palette.deep}, ${palette.light})`,
            boxShadow: `0 0 10px ${palette.deep}80`,
          }}
        />
      </div>
      <div className="mt-2 flex items-baseline justify-between">
        <span className="text-[15px] font-bold" style={{ color: palette.deep }}>
          {percent}%
        </span>
        <span className="text-[11px] text-inkSoft">выполнение плана</span>
      </div>
    </motion.div>
  );
}

function Cell({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center">
      <div className="mb-1 text-[10px] font-semibold tracking-[1.5px] text-inkMute">{label}</div>
      <div className="text-[26px] font-extrabold leading-none text-ink">{value}</div>
      <div className="mt-1 text-[10.5px] text-inkSoft">млрд ₽</div>
    </div>
  );
}
