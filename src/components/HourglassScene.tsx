import { segments } from '../data/segments';
import RevenueColumn from './RevenueColumn';

export default function HourglassScene() {
  return (
    <section className="mx-auto mt-2 grid w-full max-w-[1500px] grid-cols-1 items-end gap-8 md:grid-cols-3 md:gap-6 lg:gap-10">
      {segments.map((s) => (
        <RevenueColumn key={s.id} segment={s} />
      ))}
    </section>
  );
}
