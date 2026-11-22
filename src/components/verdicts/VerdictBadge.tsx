import { Sparkles } from 'lucide-react';
import { useVerdictStore } from '@/stores/verdict-store';
import { VERDICT_PRESETS } from '@/types/verdict';

interface VerdictBadgeProps {
  tmdbId: number;
  mediaType: 'movie' | 'tv';
  mediaTitle: string;
  size?: 'sm' | 'md' | 'lg';
  showCount?: boolean;
  interactive?: boolean;
  className?: string;
}

export default function VerdictBadge({
  tmdbId,
  mediaType,
  mediaTitle,
  size = 'md',
  showCount = true,
  interactive = true,
  className = '',
}: VerdictBadgeProps) {
  const { getSummary, openVerdictModal } = useVerdictStore();
  const summary = getSummary(tmdbId, mediaType);

  if (summary.totalVerdicts === 0) {
    if (!interactive) return null;
    return (
      <button
        onClick={() => openVerdictModal({ tmdbId, mediaType, mediaTitle })}
        className={`inline-flex items-center space-x-1.5 px-2 py-0.5 rounded text-[11px] font-mono border border-[#DEDFDC] hover:border-[#304957] bg-white text-[#686868] hover:text-[#304957] transition-colors cursor-pointer shadow-subtle ${className}`}
        title="Be the first to cast a community verdict"
        aria-label={`Cast first verdict for ${mediaTitle}`}
      >
        <Sparkles className="h-3 w-3 text-[#304957]" />
        <span>CAST VERDICT</span>
      </button>
    );
  }

  const presetStyle = VERDICT_PRESETS.find((p) => p.tag === summary.topVerdict) || {
    color: 'text-accent-primary',
    bg: 'bg-accent-wash',
    border: 'border-accent-primary/20',
  };

  const sizeClasses =
    size === 'sm'
      ? 'px-1.5 py-0.5 text-[10px]'
      : size === 'lg'
      ? 'px-3 py-1.5 text-xs'
      : 'px-2 py-0.5 text-[11px]';

  const content = (
    <span
      className={`inline-flex items-center space-x-1.5 rounded font-mono font-medium border ${presetStyle.bg} ${presetStyle.border} ${presetStyle.color} ${sizeClasses} ${className}`}
    >
      <Sparkles className="h-3 w-3 shrink-0" />
      <span className="font-bold">{summary.topVerdictPercentage}%</span>
      <span className="uppercase tracking-wider">{summary.topVerdict}</span>
      {showCount && (
        <span className="text-[10px] opacity-75 font-normal">
          ({summary.totalVerdicts})
        </span>
      )}
    </span>
  );

  if (!interactive) {
    return content;
  }

  return (
    <button
      onClick={() => openVerdictModal({ tmdbId, mediaType, mediaTitle })}
      className="cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-transform text-left"
      title={`Community Verdict: ${summary.topVerdictPercentage}% say ${summary.topVerdict}. Click to cast your verdict.`}
      aria-label={`Community verdict for ${mediaTitle}: ${summary.topVerdictPercentage}% ${summary.topVerdict}. Click to vote.`}
    >
      {content}
    </button>
  );
}
