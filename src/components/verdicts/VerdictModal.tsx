import { useState, useEffect } from 'react';
import { X, Sparkles, Trash2, CheckCircle2, AlertCircle } from 'lucide-react';
import { useVerdictStore } from '@/stores/verdict-store';
import { VERDICT_PRESETS } from '@/types/verdict';
import VerdictBreakdown from './VerdictBreakdown';

export default function VerdictModal() {
  const { modalTarget, closeVerdictModal, submitVerdict, deleteVerdict, getSummary } = useVerdictStore();
  const [selectedVerdict, setSelectedVerdict] = useState<string>('');
  const [customInput, setCustomInput] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const summary = modalTarget ? getSummary(modalTarget.tmdbId, modalTarget.mediaType) : null;
  const existingUserVerdict = summary?.userVerdict;

  useEffect(() => {
    if (existingUserVerdict) {
      setSelectedVerdict(existingUserVerdict.verdict);
      if (!VERDICT_PRESETS.some((p) => p.tag === existingUserVerdict.verdict)) {
        setCustomInput(existingUserVerdict.verdict);
      }
    } else {
      setSelectedVerdict('');
      setCustomInput('');
    }
    setErrorMsg(null);
  }, [existingUserVerdict, modalTarget]);

  if (!modalTarget) return null;

  const handlePresetSelect = (preset: string) => {
    setSelectedVerdict(preset);
    setCustomInput('');
    setErrorMsg(null);
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setCustomInput(val);
    setSelectedVerdict(val);
    setErrorMsg(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const verdictToSubmit = selectedVerdict.trim();

    if (verdictToSubmit.length < 2 || verdictToSubmit.length > 30) {
      setErrorMsg('Verdict must be between 2 and 30 characters.');
      return;
    }

    const result = submitVerdict({
      tmdbId: modalTarget.tmdbId,
      mediaType: modalTarget.mediaType,
      mediaTitle: modalTarget.mediaTitle,
      verdict: verdictToSubmit,
    });

    if (!result.success) {
      setErrorMsg(result.error || 'Failed to submit verdict.');
    }
  };

  const handleDelete = () => {
    deleteVerdict(modalTarget.tmdbId, modalTarget.mediaType);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="verdict-modal-title"
    >
      <div className="relative w-full max-w-lg rounded-xl bg-white border border-[#DEDFDC] p-6 shadow-card-hover space-y-5 text-[#202020]">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-[#DEDFDC]">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono text-[#304957] uppercase tracking-wider font-bold">
              <Sparkles className="h-3.5 w-3.5" />
              <span>THE COMMUNITY VERDICT</span>
            </div>
            <h3 id="verdict-modal-title" className="font-display text-xl font-bold text-[#202020] mt-1">
              {modalTarget.mediaTitle}
            </h3>
            <p className="text-xs text-[#686868] font-mono uppercase mt-0.5">
              TMDB #{modalTarget.tmdbId} • {modalTarget.mediaType}
            </p>
          </div>

          <button
            onClick={closeVerdictModal}
            className="p-1 rounded text-[#686868] hover:text-[#202020] hover:bg-[#F4F4F1] transition-colors cursor-pointer"
            aria-label="Close verdict modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Existing Verdict Alert */}
        {existingUserVerdict && (
          <div className="p-3 rounded-lg bg-[#F0F4F1] border border-[#D4E0D7] flex items-center justify-between text-xs font-mono text-[#425A4C]">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="h-4 w-4" />
              <span>Your active verdict: <strong>{existingUserVerdict.verdict}</strong></span>
            </div>
            <button
              onClick={handleDelete}
              className="text-[#686868] hover:text-[#B46D68] flex items-center space-x-1 cursor-pointer transition-colors"
              title="Remove your verdict"
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span>Remove</span>
            </button>
          </div>
        )}

        {/* Community Consensus Breakdown */}
        {summary && summary.totalVerdicts > 0 && (
          <div className="space-y-2">
            <h4 className="text-xs font-mono text-[#686868] uppercase tracking-wider">
              Current Community Consensus ({summary.totalVerdicts} verdicts)
            </h4>
            <VerdictBreakdown breakdown={summary.breakdown} totalVerdicts={summary.totalVerdicts} />
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          {/* Preset Buttons */}
          <div>
            <label className="block text-xs font-mono text-[#686868] uppercase tracking-wider mb-2">
              Select Curated Verdict Preset
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {VERDICT_PRESETS.map((preset) => {
                const isSelected = selectedVerdict === preset.tag;
                return (
                  <button
                    key={preset.tag}
                    type="button"
                    onClick={() => handlePresetSelect(preset.tag)}
                    className={`px-3 py-2 rounded-lg text-xs font-mono font-medium border text-center transition-all cursor-pointer ${
                      isSelected
                        ? `${preset.bg} ${preset.border} ${preset.color} ring-2 ring-[#304957] shadow-subtle`
                        : 'bg-[#F4F4F1] border-[#DEDFDC] text-[#202020] hover:text-[#202020] hover:bg-white hover:border-[#6D8795]'
                    }`}
                  >
                    {preset.tag}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Custom Verdict Input */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="custom-verdict-input" className="text-xs font-mono text-[#686868] uppercase tracking-wider">
                Or Write Custom Verdict (2–30 chars)
              </label>
              <span className="text-[10px] font-mono text-[#929292]">
                {customInput.length}/30
              </span>
            </div>
            <input
              id="custom-verdict-input"
              type="text"
              maxLength={30}
              value={customInput}
              onChange={handleCustomChange}
              placeholder="e.g., Sensory Tour de Force"
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#F4F4F1] border border-[#DEDFDC] text-[#202020] placeholder:text-[#929292] text-xs font-sans focus:outline-none focus:border-[#304957] focus:bg-white transition-colors"
            />
          </div>

          {/* Error Message */}
          {errorMsg && (
            <div className="flex items-center space-x-2 text-xs text-[#B46D68] font-mono">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-2 flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={closeVerdictModal}
              className="px-4 py-2 rounded-lg text-xs font-mono text-[#686868] hover:text-[#202020] hover:bg-[#F4F4F1] transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!selectedVerdict.trim()}
              className="px-5 py-2 rounded-lg bg-[#304957] hover:bg-[#20343F] disabled:opacity-40 disabled:cursor-not-allowed text-white font-display text-xs font-bold tracking-wider transition-colors shadow-card cursor-pointer"
            >
              {existingUserVerdict ? 'UPDATE VERDICT' : 'RECORD VERDICT'}
            </button>
          </div>
        </form>

        {/* Notice of Demo Status */}
        <div className="pt-2 border-t border-[#DEDFDC] text-[10px] font-mono text-[#929292]">
          DEMO STORE // Recorded in local demonstration state. Multi-user cloud synchronization activates in Milestone 5 with Supabase.
        </div>
      </div>
    </div>
  );
}
