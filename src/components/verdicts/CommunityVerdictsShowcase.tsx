import { Sparkles, MessageSquare, Flame } from 'lucide-react';
import { useVerdictStore } from '@/stores/verdict-store';
import { VERDICT_PRESETS } from '@/types/verdict';
import VerdictBreakdown from './VerdictBreakdown';

export default function CommunityVerdictsShowcase() {
  const { getRecentVerdicts, getSummary, openVerdictModal } = useVerdictStore();
  const recentVerdicts = getRecentVerdicts(6);

  // Featured spotlight titles for community consensus
  const featuredCases = [
    { tmdbId: 693134, mediaType: 'movie' as const, title: 'Dune: Part Two', year: '2024' },
    { tmdbId: 872585, mediaType: 'movie' as const, title: 'Oppenheimer', year: '2023' },
    { tmdbId: 126308, mediaType: 'tv' as const, title: 'Shōgun', year: '2024' },
  ];

  return (
    <section id="verdicts" className="py-14 border-b border-[#6D8795] bg-[#446879]" aria-labelledby="community-verdicts-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[#6D8795]">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono text-[#C4D2D9] uppercase tracking-wider">
              <Sparkles className="h-3.5 w-3.5" />
              <span>COMMUNITY CONSENSUS // THE VERDICT</span>
            </div>
            <h2 id="community-verdicts-title" className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
              Community Verdicts
            </h2>
          </div>
          <p className="text-xs text-[#E1E9ED] max-w-md font-sans">
            Short, definitive labels defining film and television experiences. 8 curated sentiments plus user-submitted verdicts.
          </p>
        </div>

        {/* 2-Column Grid: Featured Consensus on Left (7 cols), Recent Ticker on Right (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Featured Title Consensus Bars (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="text-xs font-mono text-[#C4D2D9] uppercase tracking-wider flex items-center space-x-1.5">
              <Flame className="h-3.5 w-3.5 text-[#FFFFFF]" />
              <span>Top Community Titles</span>
            </h3>

            <div className="space-y-4">
              {featuredCases.map((film) => {
                const summary = getSummary(film.tmdbId, film.mediaType);
                const preset = VERDICT_PRESETS.find((p) => p.tag === summary.topVerdict);
                const tagColor = preset ? preset.color : 'text-[#202020]';

                return (
                  <div
                    key={film.tmdbId}
                    className="p-5 rounded-xl bg-white border border-[#DEDFDC] space-y-3 hover:border-[#6D8795] transition-all shadow-subtle hover:shadow-card text-[#202020]"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-display text-base font-bold text-[#202020]">
                          {film.title} <span className="text-[#686868] text-xs font-normal">({film.year})</span>
                        </h4>
                        <p className="text-[11px] font-mono text-[#686868] uppercase">
                          Consensus: <span className={`font-bold ${tagColor}`}>{summary.topVerdict}</span> ({summary.topVerdictPercentage}% of {summary.totalVerdicts} verdicts)
                        </p>
                      </div>

                      <button
                        onClick={() => openVerdictModal({ tmdbId: film.tmdbId, mediaType: film.mediaType, mediaTitle: film.title })}
                        className="px-3 py-1.5 rounded-lg bg-[#F4F4F1] hover:bg-[#EAEAE7] border border-[#DEDFDC] text-xs font-mono text-[#304957] font-bold transition-colors cursor-pointer shadow-subtle"
                      >
                        {summary.userVerdict ? 'EDIT YOUR VERDICT' : '+ CAST VERDICT'}
                      </button>
                    </div>

                    <VerdictBreakdown breakdown={summary.breakdown} totalVerdicts={summary.totalVerdicts} />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent Verdicts Feed (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-xs font-mono text-[#C4D2D9] uppercase tracking-wider flex items-center space-x-1.5">
              <MessageSquare className="h-3.5 w-3.5 text-[#C4D2D9]" />
              <span>Recent Community Submissions</span>
            </h3>

            <div className="p-5 rounded-xl bg-white border border-[#DEDFDC] divide-y divide-[#EBEBE8] shadow-subtle text-[#202020]">
              {recentVerdicts.map((v) => {
                const preset = VERDICT_PRESETS.find((p) => p.tag === v.verdict) || {
                  color: 'text-[#202020]',
                  bg: 'bg-[#F4F4F1]',
                  border: 'border-[#DEDFDC]',
                };

                return (
                  <div key={v.id} className="py-3 first:pt-0 last:pb-0 flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-display text-xs font-semibold text-[#202020]">
                          {v.displayName}
                        </span>
                        <span className="text-[10px] font-mono text-[#929292]">
                          on <strong className="text-[#686868]">{v.mediaTitle}</strong>
                        </span>
                      </div>
                      <p className="text-[10px] font-mono text-[#929292]">
                        {new Date(v.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </p>
                    </div>

                    <span className={`px-2 py-0.5 rounded text-[11px] font-mono font-medium border shrink-0 ${preset.bg} ${preset.border} ${preset.color}`}>
                      {v.verdict}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Privacy Guarantee Note */}
            <p className="text-[10px] font-mono text-[#C4D2D9] px-2">
              PRIVACY SAFEGUARD // Public verdict feeds display verified community names without exposing internal user identifiers.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
