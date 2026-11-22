import { useState } from 'react';
import { Star, Bookmark, Calendar } from 'lucide-react';
import { NormalizedMediaItem } from '@/types/media';
import VerdictBadge from '@/components/verdicts/VerdictBadge';
import { getPlaceholderImageUri } from '@/services/tmdb/images';

interface MovieCardProps {
  item: NormalizedMediaItem;
  rank?: number;
  badgeLabel?: string;
  badgeType?: 'theatrical' | 'ott' | 'upcoming';
  countdownDays?: number;
}

export default function MovieCard({
  item,
  rank,
  badgeLabel,
  badgeType = 'theatrical',
  countdownDays,
}: MovieCardProps) {
  const [isSaved, setIsSaved] = useState(false);
  const [hasImageError, setHasImageError] = useState(false);

  const fallbackUri = getPlaceholderImageUri(item.title, 'poster');
  const imageSrc = hasImageError || !item.posterUrl ? fallbackUri : item.posterUrl;

  const badgeStyles =
    badgeType === 'theatrical'
      ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
      : badgeType === 'ott'
      ? 'bg-sky-50 border-sky-200 text-sky-800'
      : 'bg-amber-50 border-amber-200 text-amber-800';

  return (
    <div className="group relative flex flex-col rounded-xl bg-white border border-[#DEDFDC] overflow-hidden hover:border-[#6D8795] shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 text-[#202020]">
      {/* Poster Media Frame (Strict 2:3 Aspect Ratio) */}
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-[#F4F4F1]">
        <img
          src={imageSrc}
          alt={`${item.title} poster`}
          loading="lazy"
          onError={() => setHasImageError(true)}
          className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-500 ease-out"
        />

        {/* Top Badges (Z-10 to prevent overlapping with any image artifacts) */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-1.5 z-10 pointer-events-none">
          {rank !== undefined ? (
            <span className="h-6 w-6 rounded-md bg-[#304957] text-white font-mono font-bold text-xs flex items-center justify-center shadow-subtle">
              #{rank}
            </span>
          ) : badgeLabel ? (
            <span className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider border shadow-subtle backdrop-blur-sm ${badgeStyles}`}>
              {badgeLabel}
            </span>
          ) : (
            <span />
          )}

          {/* TMDB Rating */}
          {item.tmdbRating > 0 && (
            <div className="flex items-center space-x-1 px-1.5 py-0.5 rounded-md bg-white/95 backdrop-blur-sm border border-[#DEDFDC] text-[11px] font-mono font-bold text-[#202020] shadow-subtle">
              <Star className="h-3 w-3 text-[#D4AF37] fill-[#D4AF37]" />
              <span>{item.tmdbRating}</span>
            </div>
          )}
        </div>

        {/* Quick Save Bookmark Action Button */}
        <button
          onClick={() => setIsSaved(!isSaved)}
          className={`absolute bottom-2.5 right-2.5 z-10 p-2 rounded-lg backdrop-blur-sm border transition-all cursor-pointer shadow-subtle ${
            isSaved
              ? 'bg-[#304957] border-[#304957] text-white'
              : 'bg-white/90 border-[#DEDFDC] text-[#686868] hover:text-[#202020] hover:border-[#6D8795]'
          }`}
          title={isSaved ? 'Saved to Vault' : 'Save to Vault'}
          aria-label={isSaved ? `Remove ${item.title} from vault` : `Save ${item.title} to vault`}
        >
          <Bookmark className={`h-3.5 w-3.5 ${isSaved ? 'fill-white text-white' : ''}`} />
        </button>

        {/* Countdown Pill for Upcoming Movies */}
        {countdownDays !== undefined && (
          <div className="absolute bottom-2.5 left-2.5 z-10 px-2 py-0.5 rounded-md bg-white/95 backdrop-blur-sm border border-[#304957]/40 text-[10px] font-mono text-[#304957] font-bold flex items-center space-x-1 shadow-subtle">
            <Calendar className="h-2.5 w-2.5" />
            <span>IN {countdownDays} DAYS</span>
          </div>
        )}
      </div>

      {/* Card Content (Strictly outside poster frame to prevent title overlap) */}
      <div className="p-3.5 flex flex-col justify-between flex-1 space-y-2 bg-white">
        <div>
          <h4 className="font-display text-sm font-bold text-[#202020] line-clamp-1 group-hover:text-[#304957] transition-colors">
            {item.title}
          </h4>
          <p className="text-[11px] font-mono text-[#686868] flex items-center space-x-1.5 mt-0.5">
            <span>{item.year}</span>
            <span>•</span>
            <span className="uppercase">{item.mediaType}</span>
            {item.genreNames.length > 0 && (
              <>
                <span>•</span>
                <span className="line-clamp-1 text-[#686868]">{item.genreNames[0]}</span>
              </>
            )}
          </p>
        </div>

        {/* Community Verdict Badge */}
        <div className="pt-1">
          <VerdictBadge
            tmdbId={item.rawId}
            mediaType={item.mediaType}
            mediaTitle={item.title}
            size="sm"
          />
        </div>
      </div>
    </div>
  );
}
