import { Bookmark, Sparkles, Shield, ArrowRight } from 'lucide-react';

export default function WatchlistTeaser() {
  return (
    <section id="watchlist-teaser" className="py-14 border-b border-[#6D8795] bg-[#385665]" aria-labelledby="vault-teaser-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl overflow-hidden bg-white border border-[#DEDFDC] p-8 sm:p-12 shadow-card text-[#202020]">
          <div className="max-w-2xl space-y-4">
            <div className="flex items-center space-x-2 text-xs font-mono text-[#304957] uppercase tracking-wider font-bold">
              <Bookmark className="h-4 w-4" />
              <span>PERSONALIZED CINEMA VAULT</span>
            </div>

            <h2 id="vault-teaser-title" className="font-display text-2xl sm:text-4xl font-extrabold text-[#202020] tracking-tight">
              Build Your Private Film Archive
            </h2>

            <p className="font-sans text-sm text-[#686868] leading-relaxed">
              Curate your personal watchlist, track confirmed theatrical and OTT release drops, record your community verdicts, and synchronize your cinema profile across devices.
            </p>

            {/* Feature Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs font-mono text-[#686868]">
              <div className="flex items-center space-x-2">
                <Sparkles className="h-4 w-4 text-[#304957] shrink-0" />
                <span className="text-[#202020]">Cast Community Verdicts</span>
              </div>
              <div className="flex items-center space-x-2">
                <Bookmark className="h-4 w-4 text-[#304957] shrink-0" />
                <span className="text-[#202020]">Curate Watchlist</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4 text-[#304957] shrink-0" />
                <span className="text-[#202020]">Supabase Cloud Sync</span>
              </div>
            </div>

            {/* Action */}
            <div className="pt-4 flex flex-wrap items-center gap-3">
              <a
                href="#featured"
                className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-lg bg-[#304957] hover:bg-[#20343F] text-white font-display text-xs font-bold tracking-wider transition-colors shadow-card"
              >
                <span>EXPLORE DISCOVERY</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
              <span className="text-[11px] font-mono text-[#929292]">
                * Cloud account sync connects with Supabase in Milestone 5
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
