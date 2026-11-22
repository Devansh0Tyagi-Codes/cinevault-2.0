interface MediaSkeletonProps {
  aspectRatio?: '2.39/1' | '16/9' | '3/4' | '16/10' | '2/3';
  className?: string;
}

export default function MediaSkeleton({
  aspectRatio = '2/3',
  className = '',
}: MediaSkeletonProps) {
  const aspectClass =
    aspectRatio === '2.39/1'
      ? 'aspect-[2.39/1]'
      : aspectRatio === '16/9'
      ? 'aspect-[16/9]'
      : aspectRatio === '3/4'
      ? 'aspect-[3/4]'
      : aspectRatio === '2/3'
      ? 'aspect-[2/3]'
      : 'aspect-[16/10]';

  return (
    <div
      className={`animate-pulse rounded-lg bg-minimal-surface-secondary border border-border-default ${aspectClass} ${className} flex items-center justify-center overflow-hidden relative shadow-subtle`}
      aria-label="Loading cinematic media..."
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer" />
      <span className="text-[10px] font-mono tracking-widest text-ink-muted uppercase opacity-60">
        LOADING...
      </span>
    </div>
  );
}
