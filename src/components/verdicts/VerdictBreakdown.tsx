import { VerdictBreakdownItem, VERDICT_PRESETS } from '@/types/verdict';

interface VerdictBreakdownProps {
  breakdown: VerdictBreakdownItem[];
  totalVerdicts: number;
  className?: string;
}

export default function VerdictBreakdown({
  breakdown,
  totalVerdicts,
  className = '',
}: VerdictBreakdownProps) {
  if (totalVerdicts === 0 || breakdown.length === 0) {
    return (
      <div className={`text-xs text-ink-muted font-mono py-2 ${className}`}>
        No community verdicts cast yet. Be the first to review.
      </div>
    );
  }

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Stacked Distribution Bar */}
      <div className="h-2.5 w-full rounded-full bg-minimal-surface-secondary overflow-hidden flex border border-border-default">
        {breakdown.map((item) => {
          const preset = VERDICT_PRESETS.find((p) => p.tag === item.verdict);
          const barBg = preset ? preset.color.replace('text-', 'bg-') : 'bg-accent-primary';
          return (
            <div
              key={item.verdict}
              style={{ width: `${item.percentage}%` }}
              className={`${barBg} h-full transition-all duration-500`}
              title={`${item.verdict}: ${item.percentage}% (${item.count} votes)`}
            />
          );
        })}
      </div>

      {/* Individual Breakdown List */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-mono">
        {breakdown.map((item) => {
          const preset = VERDICT_PRESETS.find((p) => p.tag === item.verdict) || {
            color: 'text-ink-primary',
            bg: 'bg-minimal-surface-secondary',
            border: 'border-border-default',
          };
          return (
            <div
              key={item.verdict}
              className={`p-2 rounded border ${preset.bg} ${preset.border} flex items-center justify-between`}
            >
              <span className={`font-semibold ${preset.color}`}>{item.verdict}</span>
              <div className="flex items-center space-x-1 text-ink-muted">
                <span className="font-bold text-ink-primary">{item.percentage}%</span>
                <span className="text-[10px]">({item.count})</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
