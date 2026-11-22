import { useState } from 'react';
import { Calendar, Film, Tv, Info } from 'lucide-react';
import { RELEASE_RADAR_MOCK } from '@/data/mock-media';

type FilterType = 'all' | 'theatrical' | 'digital';

export default function ReleaseCalendar() {
  const [filter, setFilter] = useState<FilterType>('all');

  const allReleases = [
    ...RELEASE_RADAR_MOCK.releasingThisWeek.map((r) => ({ ...r, timelineStatus: 'This Week' })),
    ...RELEASE_RADAR_MOCK.inTheatersNow.map((r) => ({ ...r, timelineStatus: 'In Theatres' })),
    ...RELEASE_RADAR_MOCK.comingSoon.map((r) => ({ ...r, timelineStatus: 'Coming Soon' })),
  ];

  const filteredReleases = allReleases.filter((item) => {
    if (filter === 'theatrical') return item.releaseType === 'Theatrical';
    if (filter === 'digital') return item.releaseType !== 'Theatrical';
    return true;
  });

  return (
    <section id="calendar" className="py-12 border-b border-[#6D8795] bg-[#385665]" aria-labelledby="release-calendar-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Header & Filter Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[#6D8795]">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono text-[#C4D2D9] uppercase tracking-wider">
              <Calendar className="h-3.5 w-3.5" />
              <span>RELEASE RADAR // CALENDAR SCHEDULE</span>
            </div>
            <h2 id="release-calendar-title" className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
              Release Calendar
            </h2>
          </div>

          {/* Format Filter Pills */}
          <div className="flex items-center space-x-1.5 bg-[#527789] p-1 rounded-lg border border-[#6D8795] text-xs font-mono shadow-subtle">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                filter === 'all'
                  ? 'bg-white text-[#304957] font-bold shadow-subtle'
                  : 'text-[#E1E9ED] hover:text-white hover:bg-[#446879]'
              }`}
            >
              All Releases
            </button>
            <button
              onClick={() => setFilter('theatrical')}
              className={`px-3 py-1.5 rounded-md transition-colors flex items-center space-x-1 cursor-pointer ${
                filter === 'theatrical'
                  ? 'bg-white text-[#304957] font-bold shadow-subtle'
                  : 'text-[#E1E9ED] hover:text-white hover:bg-[#446879]'
              }`}
            >
              <Film className="h-3 w-3" />
              <span>Theatres</span>
            </button>
            <button
              onClick={() => setFilter('digital')}
              className={`px-3 py-1.5 rounded-md transition-colors flex items-center space-x-1 cursor-pointer ${
                filter === 'digital'
                  ? 'bg-white text-[#304957] font-bold shadow-subtle'
                  : 'text-[#E1E9ED] hover:text-white hover:bg-[#446879]'
              }`}
            >
              <Tv className="h-3 w-3" />
              <span>Digital/OTT</span>
            </button>
          </div>
        </div>

        {/* Calendar Timeline Table / Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredReleases.map((release) => {
            const isTheatrical = release.releaseType === 'Theatrical';
            return (
              <div
                key={release.id}
                className="p-4 rounded-xl bg-white border border-[#DEDFDC] hover:border-[#6D8795] flex items-start space-x-4 transition-all shadow-subtle hover:shadow-card text-[#202020]"
              >
                <div className="relative aspect-[2/3] w-16 rounded-lg overflow-hidden bg-[#F4F4F1] shrink-0 border border-[#DEDFDC]">
                  <img
                    src={release.imageUrl}
                    alt={release.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                <div className="flex-1 space-y-1.5 min-w-0">
                  <div className="flex items-center space-x-2">
                    <span
                      className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase tracking-wider border ${
                        isTheatrical
                          ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                          : 'bg-sky-50 border-sky-200 text-sky-800'
                      }`}
                    >
                      {release.releaseType}
                    </span>
                    <span className="text-[10px] font-mono text-[#929292]">
                      {release.timelineStatus}
                    </span>
                  </div>

                  <h4 className="font-display text-sm font-bold text-[#202020] truncate">
                    {release.title}
                  </h4>

                  <p className="text-[11px] font-mono text-[#686868]">
                    Release: <strong className="text-[#202020]">{release.releaseDate}</strong>
                  </p>

                  <p className="text-[10px] text-[#929292] font-mono truncate">
                    Director: {release.director} • {release.region}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Strict Real-Time Showtimes Notice */}
        <div className="p-3.5 rounded-lg bg-white border border-[#DEDFDC] flex items-center space-x-2.5 text-xs text-[#686868] font-mono shadow-subtle">
          <Info className="h-4 w-4 text-[#304957] shrink-0" />
          <span>
            INFORMATIONAL CALENDAR // Release schedules denote verified national release dates. CineVault does not sell cinema tickets or display real-time theatre seating availability.
          </span>
        </div>
      </div>
    </section>
  );
}
