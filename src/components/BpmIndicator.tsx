import type { BpmCategoria } from '@/lib/types';
import { BPM_CATEGORIES } from '@/lib/types';

interface BpmIndicatorProps {
  bpm?: number;
}

const getBpmCategory = (bpm: number): BpmCategoria | undefined => {
  return BPM_CATEGORIES.find(cat => bpm >= cat.rango_minimo && bpm < cat.rango_maximo + (cat.rango_maximo === 140 ? 1 : 0) ); // Adjust for upper bound inclusive for last category
};

export default function BpmIndicator({ bpm }: BpmIndicatorProps) {
  if (bpm === undefined || bpm === null) {
    return <span className="text-xs text-muted-foreground">N/A</span>;
  }

  const category = getBpmCategory(bpm);

  if (!category) {
    return <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">{bpm} BPM</span>;
  }

  return (
    <span
      className={`text-xs font-medium px-2 py-1 rounded-full inline-flex items-center gap-1 ${category.className}`}
      aria-label={`BPM: ${bpm}, Category: ${category.color}`}
    >
      {category.emoji} {bpm}
    </span>
  );
}
