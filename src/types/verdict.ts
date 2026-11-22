import { MediaType } from './media';

export type StandardVerdictPreset =
  | 'Masterpiece'
  | 'Must Watch'
  | 'Mind Blowing'
  | 'Banger'
  | 'Worth It'
  | 'One Time Watch'
  | 'Overrated'
  | 'Disappointing';

export const VERDICT_PRESETS: {
  tag: StandardVerdictPreset;
  color: string;
  bg: string;
  border: string;
}[] = [
  { tag: 'Masterpiece', color: 'text-[#303030]', bg: 'bg-[#EAEAE7]', border: 'border-[#D0D0CD]' },
  { tag: 'Must Watch', color: 'text-[#425A4C]', bg: 'bg-[#F0F4F1]', border: 'border-[#D4E0D7]' },
  { tag: 'Mind Blowing', color: 'text-[#3B4856]', bg: 'bg-[#F0F3F6]', border: 'border-[#D5DCE4]' },
  { tag: 'Banger', color: 'text-[#5A4832]', bg: 'bg-[#F7F4EE]', border: 'border-[#E4DDD0]' },
  { tag: 'Worth It', color: 'text-[#3A5255]', bg: 'bg-[#F0F4F5]', border: 'border-[#D4E0E2]' },
  { tag: 'One Time Watch', color: 'text-[#555552]', bg: 'bg-[#F3F3F0]', border: 'border-[#DCDCD6]' },
  { tag: 'Overrated', color: 'text-[#6A4045]', bg: 'bg-[#F6F1F2]', border: 'border-[#E2D5D7]' },
  { tag: 'Disappointing', color: 'text-[#6A3838]', bg: 'bg-[#F6F0F0]', border: 'border-[#E2D4D4]' },
];

export interface PublicVerdict {
  id: string;
  displayName: string;
  avatarUrl?: string;
  tmdbId: number;
  mediaType: MediaType;
  mediaTitle: string;
  verdict: string;
  isPreset: boolean;
  createdAt: string; // ISO 8601
}

export interface UserVerdictRecord extends PublicVerdict {
  isOwner: boolean;
  updatedAt: string;
}

export interface VerdictBreakdownItem {
  verdict: string;
  count: number;
  percentage: number;
}

export interface TitleVerdictSummary {
  tmdbId: number;
  mediaType: MediaType;
  totalVerdicts: number;
  topVerdict: string;
  topVerdictPercentage: number;
  breakdown: VerdictBreakdownItem[];
  userVerdict?: UserVerdictRecord | null;
}

export interface VerdictSubmissionPayload {
  tmdbId: number;
  mediaType: MediaType;
  mediaTitle: string;
  verdict: string;
}
