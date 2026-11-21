import { useState } from 'react';
import { Bell, Calendar, Info, Radio } from 'lucide-react';
import { RELEASE_RADAR_MOCK, ReleaseRadarItem } from '@/data/mock-media';
import { useUIStore } from '@/stores/ui-store';

export default function ReleaseRadarPreview() {
  const [activeTab, setActiveTab] = useState<'thisWeek' | 'inTheaters' | 'comingSoon'>('thisWeek');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const { preferredRegion } = useUIStore();

  const handleNotify = (title: string) => {
    setToastMessage(`Notification requested for "${title}". (Prototype preview — active notifications activate in Milestone 8)`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const getActiveList = (): ReleaseRadarItem[] => {
    switch (activeTab) {
      case 'thisWeek':
        return RELEASE_RADAR_MOCK.releasingThisWeek;
      case 'inTheaters':
        return RELEASE_RADAR_MOCK.inTheatersNow;
      case 'comingSoon':
        return RELEASE_RADAR_MOCK.comingSoon;
    }
  };

  const activeItems = getActiveList();

  return (
    <section className="py-14 border-b border-paper-rule" aria-labelledby="release-radar-title" id="release-radar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Prototype Guardrail Alert Banner */}
        <div className="mb-8 p-3 rounded-sm bg-paper-surface border border-paper-rule flex items-start space-x-3 text-xs">
          <Info className="h-4 w-4 text-accent-warm shrink-0 mt-0.5" />
          <div className="space-y-1 text-ink-muted">
            <p>
              <strong className="text-ink-primary font-mono text-[11px] uppercase tracking-wider">
                PROTOTYPE PREVIEW // RELEASE RADAR
              </strong>{' '}
              — Displays verified static releases for layout demonstration. Live regional dates from TMDB and regional streaming providers connect in Milestone 8.
            </p>
            <p className="text-[11px] text-ink-caption">
              <strong>Notice:</strong> Release dates denote authorized national debuts. CineVault does not provide live cinema seat booking or theater showtimes.
            </p>
          </div>
        </div>

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-4 border-b border-paper-rule mb-8 gap-4">
          <div>
            <div className="flex items-center space-x-2 text-[11px] font-mono tracking-wider text-ink-caption uppercase mb-1">
              <Radio className="h-3.5 w-3.5 text-accent-warm animate-pulse" />
              <span>THE HORIZON // RELEASE CALENDAR</span>
            </div>
            <h2 id="release-radar-title" className="font-serif text-2xl sm:text-3xl font-semibold text-ink-primary tracking-tight">
              Release Radar
            </h2>
          </div>

          {/* Tab Filter Controls */}
          <div className="flex items-center space-x-1 border border-paper-rule rounded-sm bg-paper-surface p-1 text-xs font-mono">
            <button
              onClick={() => setActiveTab('thisWeek')}
              className={`px-3 py-1.5 rounded-sm transition-colors cursor-pointer ${
                activeTab === 'thisWeek'
                  ? 'bg-paper-canvas text-accent-warm font-bold shadow-sm'
                  : 'text-ink-caption hover:text-ink-primary'
              }`}
              aria-pressed={activeTab === 'thisWeek'}
            >
              THIS WEEK
            </button>
            <button
              onClick={() => setActiveTab('inTheaters')}
              className={`px-3 py-1.5 rounded-sm transition-colors cursor-pointer ${
                activeTab === 'inTheaters'
                  ? 'bg-paper-canvas text-accent-warm font-bold shadow-sm'
                  : 'text-ink-caption hover:text-ink-primary'
              }`}
              aria-pressed={activeTab === 'inTheaters'}
            >
              IN THEATERS
            </button>
            <button
              onClick={() => setActiveTab('comingSoon')}
              className={`px-3 py-1.5 rounded-sm transition-colors cursor-pointer ${
                activeTab === 'comingSoon'
                  ? 'bg-paper-canvas text-accent-warm font-bold shadow-sm'
                  : 'text-ink-caption hover:text-ink-primary'
              }`}
              aria-pressed={activeTab === 'comingSoon'}
            >
              COMING SOON
            </button>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {activeItems.map((item) => (
            <article key={item.id} className="group border border-paper-rule rounded-sm bg-paper-canvas p-3 flex flex-col justify-between space-y-3">
              <div className="space-y-3">
                <div className="relative aspect-[3/2] overflow-hidden rounded-sm bg-paper-surface border border-paper-rule">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover grayscale-[10%] group-hover:scale-[1.015] transition-transform duration-500 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute top-2 left-2 bg-paper-canvas/95 px-2 py-0.5 text-[9px] font-mono font-bold tracking-wider uppercase text-ink-primary border border-paper-rule">
                    {item.releaseType}
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[11px] font-mono text-ink-caption">
                    <span className="flex items-center space-x-1 text-accent-warm font-medium">
                      <Calendar className="h-3 w-3" />
                      <span>{item.releaseDate}</span>
                    </span>
                    {item.certification && <span>CERT: {item.certification}</span>}
                  </div>

                  <h3 className="font-serif text-lg font-semibold text-ink-primary group-hover:text-accent-warm transition-colors leading-snug">
                    {item.title}
                  </h3>

                  <p className="font-serif italic text-xs text-ink-muted">
                    Directed by <span className="text-ink-primary not-italic font-medium">{item.director}</span>
                  </p>

                  <p className="text-[10px] font-mono text-ink-caption pt-1">
                    REGION: {item.region.includes('IN') ? preferredRegion : 'GLOBAL'}
                  </p>
                </div>
              </div>

              <button
                onClick={() => handleNotify(item.title)}
                className="w-full mt-2 py-2 px-3 text-[11px] font-mono tracking-wider text-ink-primary bg-paper-surface hover:bg-paper-highlight border border-paper-rule rounded-sm transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
                aria-label={`Set notification for ${item.title}`}
              >
                <Bell className="h-3 w-3 text-ink-caption" />
                <span>NOTIFY ME</span>
              </button>
            </article>
          ))}
        </div>

        {/* Informational Toast */}
        {toastMessage && (
          <div className="mt-4 p-3 rounded-sm bg-paper-surface border border-paper-rule text-xs font-mono text-ink-muted">
            {toastMessage}
          </div>
        )}
      </div>
    </section>
  );
}
