import { motion } from 'framer-motion';
import { palettes, type Segment } from '../data/segments';
import Hourglass from './Hourglass';
import KpiCard from './KpiCard';

// ⬇ Scale of the central (featured) hourglass vs side ones.
//    Side hourglasses use 0.86, featured uses 1.0.
const FEATURED_SCALE = 1.0;
const SIDE_SCALE = 0.86;

export default function RevenueColumn({ segment }: { segment: Segment }) {
  const palette = palettes[segment.color];
  const featured = !!segment.featured;
  const scale = featured ? FEATURED_SCALE : SIDE_SCALE;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
      className={'flex flex-col items-center ' + (featured ? 'md:-mt-6 md:mb-0' : 'md:mt-6')}
    >
      <div style={{ transform: `scale(${scale})`, transformOrigin: 'bottom center' }}>
        <Hourglass title={segment.title} palette={palette} featured={featured} />
      </div>
      <KpiCard segment={segment} palette={palette} />
    </motion.div>
  );
}
