export function shuffleArray<T>(items: T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function pickRandom<T>(items: T[], count: number, exclude?: T): T[] {
  const pool = exclude ? items.filter((item) => item !== exclude) : items;
  return shuffleArray(pool).slice(0, count);
}

/** Escapes a string for safe use inside a RegExp constructor. */
function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Checks whether a target word (whole word, case-insensitive) appears in a transcript. */
export function transcriptContainsWord(transcript: string, targetWord: string): boolean {
  if (!transcript.trim() || !targetWord.trim()) return false;
  const pattern = new RegExp(`\\b${escapeRegExp(targetWord.trim())}\\b`, "i");
  return pattern.test(transcript);
}

export function formatSeconds(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export function classNames(...values: Array<string | false | null | undefined>): string {
  return values.filter(Boolean).join(" ");
}
