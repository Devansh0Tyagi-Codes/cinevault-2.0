import { AlertCircle, RotateCcw } from 'lucide-react';

interface ErrorCardProps {
  message?: string;
  onRetry?: () => void;
  title?: string;
}

export default function ErrorCard({
  title = 'Service Interrupted',
  message = 'Failed to retrieve records from TMDB services.',
  onRetry,
}: ErrorCardProps) {
  return (
    <div className="p-6 rounded-lg bg-white border border-border-default text-ink-secondary space-y-3 shadow-subtle">
      <div className="flex items-center space-x-2 text-accent-primary">
        <AlertCircle className="h-5 w-5 shrink-0" />
        <h4 className="font-display text-base font-semibold text-ink-primary">
          {title}
        </h4>
      </div>
      <p className="font-sans text-xs text-ink-secondary leading-relaxed">
        {message}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded bg-minimal-surface-secondary hover:bg-white border border-border-default hover:border-border-strong text-xs font-mono text-ink-primary transition-colors cursor-pointer shadow-subtle"
        >
          <RotateCcw className="h-3.5 w-3.5 text-accent-primary" />
          <span>RETRY REQUEST</span>
        </button>
      )}
    </div>
  );
}
