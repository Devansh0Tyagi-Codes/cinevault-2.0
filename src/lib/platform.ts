/**
 * Returns the platform-appropriate keyboard modifier string for shortcuts.
 * e.g., '⌘K' on macOS / iOS, 'Ctrl+K' on Windows / Linux / Android.
 */
export function getPlatformShortcut(): string {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return 'Ctrl+K';
  }

  const platform =
    (navigator as { userAgentData?: { platform?: string } }).userAgentData?.platform ||
    navigator.platform ||
    navigator.userAgent ||
    '';

  const isApple = /Mac|iPod|iPhone|iPad/i.test(platform);
  return isApple ? '⌘K' : 'Ctrl+K';
}
