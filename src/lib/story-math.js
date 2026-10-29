// Pure helpers for the Portfolio Story page. Kept out of Story.jsx so they can
// be exercised by story-math.test.mjs without a JSX toolchain.

export const DOTS = 500; // 25 × 20 grid, one dot per 100 learners
export const DOT_COLS = 25;
export const DOT_ROWS = 20;

export const clamp01 = (x) => Math.max(0, Math.min(1, x));

export const smoothstep = (x) => x * x * (3 - 2 * x);

export const hostOf = (url) =>
  url ? url.replace(/^https?:\/\//, '').replace(/\/$/, '') : 'local application';

/**
 * Order the dots light up in. A seeded LCG shuffle rather than Math.random so
 * the fill pattern is identical on every load (and in screenshots).
 * @returns {number[]} rank[i] = how many dots light before dot i does.
 */
export function dotRanks() {
  const order = Array.from({ length: DOTS }, (_, i) => i);
  let seed = 7;
  for (let i = DOTS - 1; i > 0; i--) {
    seed = (seed * 9301 + 49297) % 233280;
    const j = Math.floor((seed / 233280) * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  const rank = new Array(DOTS);
  order.forEach((dot, r) => {
    rank[dot] = r;
  });
  return rank;
}
