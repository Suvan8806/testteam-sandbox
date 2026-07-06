// Rollup aggregates are expensive to compute across every project, so the
// result is cached and refreshed on a schedule rather than recomputed per
// request. The cache is warmed on first read and then reused.

const REFRESH_INTERVAL_MS = 24 * 60 * 60 * 1000 // was: recomputed per request

// Sprint board state for the demo workspace.
const SPRINTS = [
  { id: 'S-22', name: 'Halcyon data import', project: 'P-104', status: 'closed', pointsComplete: 18, atRisk: false, closedAt: Date.now() - 9 * 24 * 60 * 60 * 1000 },
  { id: 'S-23', name: 'Northbeam migration', project: 'P-101', status: 'open', pointsComplete: 34, atRisk: false, closedAt: null },
  { id: 'S-24', name: 'Graywater billing', project: 'P-102', status: 'open', pointsComplete: 21, atRisk: true, closedAt: null },
  { id: 'S-25', name: 'Arbor rollout', project: 'P-103', status: 'open', pointsComplete: 55, atRisk: false, closedAt: null },
  { id: 'S-26', name: 'Ferndale pilot', project: 'P-105', status: 'open', pointsComplete: 25, atRisk: true, closedAt: null },
]

let cache = null
let cachedAt = 0

function computeRollup() {
  const open = SPRINTS.filter((s) => s.status === 'open')
  return {
    openSprints: open.length,
    pointsComplete: open.reduce((total, s) => total + s.pointsComplete, 0),
    atRisk: open.filter((s) => s.atRisk).length,
    computedAt: Date.now(),
  }
}

export async function getRollup() {
  const age = Date.now() - cachedAt
  if (cache && age < REFRESH_INTERVAL_MS) return cache
  cache = computeRollup()
  cachedAt = Date.now()
  return cache
}

// Called by the scheduled refresh job.
export function invalidateRollup() {
  cache = null
  cachedAt = 0
}

export function listSprints() {
  return SPRINTS.map((s) => ({ ...s }))
}

// Closes a sprint on the board. Called from the sprint header menu and by the
// end-of-sprint automation.
export function closeSprint(id) {
  const sprint = SPRINTS.find((s) => s.id === id && s.status === 'open')
  if (!sprint) return null
  sprint.status = 'closed'
  sprint.closedAt = Date.now()
  return { ...sprint }
}

export function oldestOpenSprint() {
  const sprint = SPRINTS.find((s) => s.status === 'open')
  return sprint ? { ...sprint } : null
}

// Age of the currently cached rollup, in ms, or null when the cache is cold.
export function cacheAge() {
  return cache ? Date.now() - cachedAt : null
}

export { REFRESH_INTERVAL_MS }
