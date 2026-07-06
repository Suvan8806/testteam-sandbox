import { useEffect, useRef, useState } from 'react'
import {
  cacheAge,
  closeSprint,
  getRollup,
  invalidateRollup,
  listSprints,
  oldestOpenSprint,
} from '../rollupCache'
import { BTN_QUIET, BTN_SMALL, PANEL } from './ui'

function formatAge(ms) {
  if (ms === null || ms === undefined) return 'cold'
  const s = Math.round(ms / 1000)
  if (s < 60) return `${s}s old`
  const m = Math.round(s / 60)
  if (m < 60) return `${m}m old`
  return `${Math.round(m / 60)}h old`
}

function Stat({ label, value }) {
  const first = useRef(true)
  const [key, setKey] = useState(0)

  useEffect(() => {
    if (first.current) {
      first.current = false
      return
    }
    setKey((k) => k + 1)
  }, [value])

  return (
    <div>
      <dt className="text-[13px] text-neutral-500 dark:text-neutral-400">{label}</dt>
      <dd
        key={key}
        className="mt-1 animate-bump text-4xl font-semibold tabular-nums tracking-tight"
      >
        {value}
      </dd>
    </div>
  )
}

export default function RollupPanel() {
  const [rollup, setRollup] = useState(null)
  const [sprints, setSprints] = useState(() => listSprints())
  const [status, setStatus] = useState('Sprint board loaded.')

  async function refresh() {
    setRollup(await getRollup())
    setSprints(listSprints())
  }

  useEffect(() => {
    refresh()
  }, [])

  async function handleCloseSprint() {
    const target = oldestOpenSprint()
    if (!target) {
      setStatus('No open sprints left to close.')
      return
    }
    const closed = closeSprint(target.id)
    await refresh()
    setStatus(`Closed ${closed.id} — ${closed.name}.`)
  }

  async function handleScheduledRefresh() {
    invalidateRollup()
    await refresh()
    setStatus('Scheduled refresh ran — rollup recomputed.')
  }

  return (
    <div className={`mt-9 ${PANEL}`}>
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-200 pb-4 dark:border-neutral-800">
        <div className="flex items-center gap-2.5">
          <span className="h-2 w-2 animate-pulse2 rounded-full bg-indigo-500 ring-4 ring-indigo-500/15" />
          <h3 className="text-[17px] font-semibold">Portfolio rollup</h3>
        </div>
        <span className="font-mono text-[13px] text-neutral-500 dark:text-neutral-400">
          cache: {formatAge(cacheAge())}
        </span>
      </div>

      <dl className="grid grid-cols-1 gap-5 pb-1 pt-6 sm:grid-cols-3">
        <Stat label="Open sprints" value={rollup ? rollup.openSprints : '—'} />
        <Stat label="Points complete" value={rollup ? rollup.pointsComplete : '—'} />
        <Stat label="Sprints at risk" value={rollup ? rollup.atRisk : '—'} />
      </dl>

      <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.1em] text-neutral-500 dark:text-neutral-400">
        Sprint board
      </p>
      <ul className="mt-2.5 flex flex-wrap gap-2">
        {sprints.map((sprint) => (
          <li
            key={sprint.id}
            className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[13px] ${
              sprint.status === 'closed'
                ? 'border-neutral-200 text-neutral-400 line-through dark:border-neutral-800 dark:text-neutral-600'
                : 'border-neutral-200 bg-neutral-50 text-neutral-700 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-300'
            }`}
          >
            <span
              className={`h-[7px] w-[7px] flex-none rounded-full ${
                sprint.status === 'closed' ? 'bg-neutral-300 dark:bg-neutral-700' : 'bg-indigo-500'
              }`}
            />
            {sprint.id} · {sprint.name}
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-neutral-200 pt-5 dark:border-neutral-800">
        <button type="button" className={BTN_SMALL} onClick={handleCloseSprint}>
          Close oldest open sprint
        </button>
        <button type="button" className={BTN_QUIET} onClick={handleScheduledRefresh}>
          Run scheduled refresh
        </button>
        <span role="status" className="text-[13px] text-neutral-500 dark:text-neutral-400">
          {status}
        </span>
      </div>
    </div>
  )
}
