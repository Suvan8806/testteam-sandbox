import { useEffect, useState } from 'react'
import { getRollup } from './rollupCache'

export function RollupPanel() {
  const [rollup, setRollup] = useState(null)
  useEffect(() => { getRollup().then(setRollup) }, [])
  if (!rollup) return <p className="mt-8 text-sm text-neutral-500">Loading rollup…</p>
  return (
    <dl className="mt-8 grid gap-6 sm:grid-cols-3">
      <div><dt className="text-sm text-neutral-500">Open sprints</dt><dd className="text-3xl font-semibold">{rollup.openSprints}</dd></div>
      <div><dt className="text-sm text-neutral-500">Points complete</dt><dd className="text-3xl font-semibold">{rollup.pointsComplete}</dd></div>
      <div><dt className="text-sm text-neutral-500">At risk</dt><dd className="text-3xl font-semibold">{rollup.atRisk}</dd></div>
    </dl>
  )
}
