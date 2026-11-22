import { Info } from 'lucide-react';

interface MockModeBadgeProps {
  className?: string;
}

export default function MockModeBadge({ className = '' }: MockModeBadgeProps) {
  return (
    <div
      className={`p-3.5 rounded-lg bg-[#385665] border border-[#6D8795] flex items-start space-x-3 text-xs text-[#E1E9ED] shadow-subtle ${className}`}
      role="status"
      aria-live="polite"
    >
      <Info className="h-4 w-4 text-white shrink-0 mt-0.5" />
      <div className="space-y-1">
        <p className="font-mono text-[11px] font-bold tracking-wider text-white uppercase flex items-center space-x-2">
          <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
          <span>ARCHIVAL DEMO // MOCK MODE ACTIVE</span>
        </p>
        <p className="text-[11px] text-[#C4D2D9] leading-relaxed">
          Displaying verified static demonstration records. Supply a TMDB API Key in{' '}
          <code className="bg-[#446879] px-1.5 py-0.5 rounded text-white font-mono text-[10px] border border-[#6D8795]">
            VITE_TMDB_API_KEY
          </code>{' '}
          within <code className="bg-[#446879] px-1.5 py-0.5 rounded text-white font-mono text-[10px] border border-[#6D8795]">.env</code> to stream live data.
        </p>
      </div>
    </div>
  );
}
