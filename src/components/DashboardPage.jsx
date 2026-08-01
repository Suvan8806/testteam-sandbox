import { useEffect, useState } from 'react'
import { downloadCsv } from '../exportCsv'
import { listProjects } from '../projects'
import { cacheAge, getRollup, listSprints } from '../rollupCache'
import { BTN_QUIET, BTN_SMALL, Kicker, PANEL, ThemeToggle, Wordmark } from './ui'

const COLUMN_LABELS = ['ID', 'Project', 'Owner', 'Sprint', 'Status', 'Points']
const COLUMN_KEYS = ['id', 'name', 'owner', 'sprint', 'status', 'points']

// Status pill colours. Keyed by the status strings projects.js already emits,
// so a new status shows up in neutral rather than crashing the row.
const STATUS_STYLES = {
  'on track':
    'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/60 dark:bg-emerald-950/40 dark:text-emerald-300',
  'at risk':
    'border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900/60 dark:bg-amber-950/40 dark:text-amber-300',
  done: 'border-neutral-200 bg-neutral-50 text-neutral-500 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-400',
}

const NEUTRAL_STATUS =
  'border-neutral-200 bg-neutral-50 text-neutral-600 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-300'

function formatAge(ms) {
  if (ms === null || ms === undefined) return 'cold'
  const s = Math.round(ms / 1000)
  if (s < 60) return `${s}s old`
  const m = Math.round(s / 60)
  if (m < 60) return `${m}m old`
  return `${Math.round(m / 60)}h old`
}

function firstName(session) {
  if (session?.name) return session.name.split(' ')[0]
  return session?.email ? session.email.split('@')[0] : 'there'
}

function Stat({ label, value, hint }) {
  return (
    <div className={PANEL}>
      <dt className="text-[13px] text-neutral-500 dark:text-neutral-400">{label}</dt>
      <dd className="mt-1.5 text-4xl font-semibold tabular-nums tracking-tight">{value}</dd>
      {hint ? (
        <p className="mt-2 text-[13px] text-neutral-500 dark:text-neutral-400">{hint}</p>
      ) : null}
    </div>
  )
}

/**
 * The signed-in board, served at `#/dashboard`.
 *
 * Every number on this page comes from the same modules the marketing page
 * renders — rollupCache.js and projects.js — so the logged-in view and the
 * public demo can never disagree about the workspace.
 */
export default function DashboardPage({ session, onSignOut, dark, onToggleTheme }) {
  const [rollup, setRollup] = useState(null)
  const [status, setStatus] = useState('')
  const projects = listProjects()
  const sprints = listSprints()

  useEffect(() => {
    let live = true
    getRollup().then((result) => {
      if (live) setRollup(result)
    })
    return () => {
      live = false
    }
  }, [])

  function handleExport() {
    downloadCsv(projects, 'testteam-projects.csv')
    setStatus('Downloaded testteam-projects.csv')
  }

  return (
    <div className="min-h-screen font-sans">
      <header className="sticky top-0 z-50 border-b border-neutral-900/10 bg-white/75 backdrop-blur-md backdrop-saturate-150 dark:border-white/10 dark:bg-neutral-950/70">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-6">
          <div className="flex items-center gap-3">
            <a href="#top" aria-label="TestTeam home">
              <Wordmark />
            </a>
            <span className="hidden rounded-full border border-neutral-200 px-2.5 py-0.5 text-[12px] font-medium text-neutral-500 dark:border-neutral-800 dark:text-neutral-400 sm:inline-block">
              Dashboard
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <span className="hidden text-[14px] text-neutral-500 dark:text-neutral-400 sm:inline">
              {session.email}
            </span>
            <ThemeToggle dark={dark} onToggle={onToggleTheme} />
            <button type="button" className={BTN_QUIET} onClick={onSignOut}>
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-12">
        <Kicker>{session.workspace || 'Workspace'}</Kicker>
        <h1 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
          Welcome back, {firstName(session)}
        </h1>
        <p className="mt-3 max-w-[52ch] text-neutral-600 dark:text-neutral-400">
          Every open sprint across every project, aggregated on a schedule. Signed in as{' '}
          {session.role ? session.role.toLowerCase() : 'a member'}.
        </p>

        <dl className="mt-9 grid grid-cols-1 gap-5 sm:grid-cols-3">
          <Stat
            label="Open sprints"
            value={rollup ? rollup.openSprints : '—'}
            hint={`cache: ${formatAge(cacheAge())}`}
          />
          <Stat
            label="Points complete"
            value={rollup ? rollup.pointsComplete : '—'}
            hint="across open sprints"
          />
          <Stat
            label="Sprints at risk"
            value={rollup ? rollup.atRisk : '—'}
            hint="trending behind burn-down"
          />
        </dl>

        <section className="mt-12">
          <h2 className="text-[17px] font-semibold">Sprint board</h2>
          <ul className="mt-4 flex flex-wrap gap-2">
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
                    sprint.status === 'closed'
                      ? 'bg-neutral-300 dark:bg-neutral-700'
                      : 'bg-indigo-500'
                  }`}
                />
                {sprint.id} · {sprint.name}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-12">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-[17px] font-semibold">Projects</h2>
            <div className="flex flex-wrap items-center gap-3">
              <span role="status" className="text-[13px] text-neutral-500 dark:text-neutral-400">
                {status}
              </span>
              <button type="button" className={BTN_SMALL} onClick={handleExport}>
                Export CSV
              </button>
            </div>
          </div>

          <div className={`mt-4 ${PANEL}`}>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[42rem] border-collapse text-[15px]">
                <thead>
                  <tr>
                    {COLUMN_LABELS.map((label) => (
                      <th
                        key={label}
                        className="border-b border-neutral-200 px-3.5 py-2.5 text-left text-[11px] font-semibold uppercase tracking-[0.07em] text-neutral-500 dark:border-neutral-800 dark:text-neutral-400"
                      >
                        {label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {projects.map((project) => (
                    <tr key={project.id}>
                      {COLUMN_KEYS.map((key) => (
                        <td
                          key={key}
                          className="whitespace-nowrap border-b border-neutral-200 px-3.5 py-2.5 last:tabular-nums dark:border-neutral-800"
                        >
                          {key === 'status' ? (
                            <span
                              className={`inline-flex rounded-full border px-2.5 py-0.5 text-[13px] ${
                                STATUS_STYLES[project.status] || NEUTRAL_STATUS
                              }`}
                            >
                              {project.status}
                            </span>
                          ) : (
                            project[key]
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}