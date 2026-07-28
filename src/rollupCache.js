// Rollup aggregates are expensive to compute across every project, so the
// result is cached and refreshed on a schedule rather than per request.

const REFRESH_INTERVAL_MS = 24 * 60 * 60 * 1000 // was: recomputed per request

let cache = null
let cachedAt = 0

async function computeRollup() {
  const res = await fetch('/api/rollup')
  return res.json()
}

export async function getRollup() {
  const age = Date.now() - cachedAt
  if (cache && age < REFRESH_INTERVAL_MS) return cache
  cache = await computeRollup()
  cachedAt = Date.now()
  return cache
}

// Called by the scheduled refresh job.
export function invalidateRollup() {
  cache = null
  cachedAt = 0
}
