import { motion } from 'framer-motion';
import {
  Film,
  Sparkles,
  Radio,
  CheckCircle2,
  Command,
  ShieldCheck,
  Layers,
  ArrowRight,
  Database,
  Globe2,
} from 'lucide-react';
import { useUIStore } from '@/stores/ui-store';

export default function App() {
  const {
    isCommandPaletteOpen,
    toggleCommandPalette,
    preferredRegion,
    setPreferredRegion,
  } = useUIStore();

  return (
    <div className="relative min-h-screen bg-cinema-obsidian text-foreground overflow-hidden">
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-crimson-500/10 blur-[140px]" />
      <div className="pointer-events-none absolute top-1/2 -right-40 h-[400px] w-[600px] rounded-full bg-gold-500/5 blur-[120px]" />

      {/* Top Navigation Bar Preview */}
      <header className="sticky top-0 z-50 glass-panel border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-crimson-500 to-crimson-700 flex items-center justify-center glow-crimson">
              <Film className="h-5 w-5 text-white" />
            </div>
            <div>
              <span className="font-extrabold tracking-tight text-xl text-gradient-crimson">
                CINEVAULT
              </span>
              <span className="ml-1.5 px-1.5 py-0.5 rounded text-[10px] font-bold tracking-wider bg-crimson-500/20 text-crimson-400 border border-crimson-500/30">
                2.0
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {/* Region Selector Badge */}
            <button
              onClick={() => setPreferredRegion(preferredRegion === 'IN' ? 'US' : 'IN')}
              className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-cinema-elevated hover:bg-cinema-surface border border-white/10 transition-colors"
              title="Click to toggle default region between India and US"
            >
              <Globe2 className="h-3.5 w-3.5 text-gold-400" />
              <span>Region: <strong className="text-white">{preferredRegion}</strong></span>
            </button>

            {/* Command Palette Trigger */}
            <button
              onClick={toggleCommandPalette}
              className="flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-medium bg-cinema-elevated hover:bg-cinema-surface border border-white/10 text-muted-foreground hover:text-white transition-colors"
            >
              <Command className="h-3.5 w-3.5" />
              <span>Omni-Search</span>
              <kbd className="hidden md:inline-block px-1.5 py-0.5 text-[10px] bg-black/40 border border-white/10 rounded font-mono">
                Ctrl+K
              </kbd>
            </button>

            {/* Architecture Status Badge */}
            <span className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>System Online</span>
            </span>
          </div>
        </div>
      </header>

      {/* Main Content Showcase */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-muted-foreground mb-6">
            <Sparkles className="h-3.5 w-3.5 text-crimson-400" />
            <span>Milestone 0: Architecture & Foundation Active</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6">
            The Next-Generation <br />
            <span className="text-gradient-crimson">Cinematic Universe</span>
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            CineVault 2.0 is engineered with modern full-stack rigor: ultra-stable Vite 5, React 18,
            strict TypeScript, dark cinema design tokens, Zustand state synchronization, and a
            comprehensive multi-tier testing foundation.
          </p>
        </motion.div>

        {/* Technical Architecture Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {/* Card 1: Toolchain */}
          <div className="glass-card rounded-2xl p-6 relative overflow-hidden group hover:border-crimson-500/30 transition-all">
            <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-5 text-crimson-400 group-hover:scale-105 transition-transform">
              <Layers className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Ecosystem Foundation</h3>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              Vite 5 with React 18 and strict TypeScript. Path alias mapping (<code className="text-xs bg-black/40 px-1 py-0.5 rounded text-white">@/*</code>), zero runtime CSS bloat, and automated unit test coverage via Vitest.
            </p>
            <div className="flex items-center text-xs font-semibold text-emerald-400">
              <CheckCircle2 className="h-4 w-4 mr-1.5" />
              <span>Verified & Compiling</span>
            </div>
          </div>

          {/* Card 2: Release Radar */}
          <div className="glass-card rounded-2xl p-6 relative overflow-hidden group hover:border-gold-500/30 transition-all">
            <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-5 text-gold-400 group-hover:scale-105 transition-transform">
              <Radio className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Release Radar Engine</h3>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              Dedicated future discovery milestone featuring Indian theatrical release dates, regional calendars, live countdowns, and upcoming OTT premiere tracking.
            </p>
            <div className="flex items-center text-xs font-semibold text-gold-400">
              <Sparkles className="h-4 w-4 mr-1.5" />
              <span>Roadmap Milestone Ready</span>
            </div>
          </div>

          {/* Card 3: Cloud & State */}
          <div className="glass-card rounded-2xl p-6 relative overflow-hidden group hover:border-white/20 transition-all">
            <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-5 text-blue-400 group-hover:scale-105 transition-transform">
              <Database className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">State & Data Architecture</h3>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              Zustand for lightweight client state, TanStack Query for TMDB caching, and planned Supabase PostgreSQL schemas with Row-Level Security (RLS).
            </p>
            <div className="flex items-center text-xs font-semibold text-blue-400">
              <ShieldCheck className="h-4 w-4 mr-1.5" />
              <span>RLS Schema Ready</span>
            </div>
          </div>
        </div>

        {/* Live Interactive State Verification Panel */}
        <div className="glass-panel rounded-2xl p-6 sm:p-8 max-w-2xl mx-auto border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 rounded-full bg-crimson-500" />
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                Live State Verification (Zustand)
              </h4>
            </div>
            <span className="text-xs text-muted-foreground font-mono">Store Reactive</span>
          </div>

          <div className="space-y-3 font-mono text-xs bg-black/50 p-4 rounded-xl border border-white/5 text-slate-300 mb-5">
            <div className="flex justify-between">
              <span>Command Palette Open:</span>
              <span className={isCommandPaletteOpen ? 'text-emerald-400 font-bold' : 'text-slate-500'}>
                {String(isCommandPaletteOpen)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Selected Region Filter:</span>
              <span className="text-gold-400 font-bold">{preferredRegion} (India default)</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={toggleCommandPalette}
              className="flex-1 px-4 py-2.5 rounded-xl font-medium text-xs bg-crimson-600 hover:bg-crimson-500 text-white transition-colors flex items-center justify-center space-x-2"
            >
              <span>Toggle Command Palette State</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => setPreferredRegion(preferredRegion === 'IN' ? 'US' : 'IN')}
              className="flex-1 px-4 py-2.5 rounded-xl font-medium text-xs bg-cinema-elevated hover:bg-cinema-surface border border-white/10 text-white transition-colors flex items-center justify-center space-x-2"
            >
              <span>Cycle Region (Current: {preferredRegion})</span>
            </button>
          </div>
        </div>
      </main>

      {/* Global Command Palette Mock Preview */}
      {isCommandPaletteOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={toggleCommandPalette}
        >
          <div
            className="w-full max-w-lg glass-card rounded-2xl p-6 border border-white/20 glow-crimson"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center space-x-3 pb-4 border-b border-white/10">
              <Command className="h-5 w-5 text-crimson-400" />
              <input
                type="text"
                readOnly
                value="Omni-Search Command Palette (Active in Milestone 5)"
                className="w-full bg-transparent text-sm text-white focus:outline-none"
              />
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              Press Escape or click outside to dismiss. This demonstrates global Zustand state handling.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
