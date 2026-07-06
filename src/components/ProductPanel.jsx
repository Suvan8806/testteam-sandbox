import { BOARD_ROWS, STEPS } from '../data'

const FILL = {
  ok: 'bg-indigo-500',
  warn: 'bg-amber-500',
  done: 'bg-neutral-300 dark:bg-neutral-700',
}

export default function ProductPanel() {
  return (
    <div className="grid items-center gap-10 lg:grid-cols-2">
      <div>
        <h3 className="text-xl font-semibold tracking-tight">
          One board for work that lives in five places
        </h3>
        <p className="mt-3 text-neutral-600 dark:text-neutral-400">
          Connect your projects once. TestTeam watches every sprint, keeps a
          running aggregate, and shows engineering and finance the same set of
          numbers — because they are literally the same numbers.
        </p>

        <ol className="mt-7 space-y-4">
          {STEPS.map(([title, body], i) => (
            <li key={title} className="flex items-start gap-3.5">
              <span className="mt-0.5 grid h-7 w-7 flex-none place-items-center rounded-full bg-indigo-50 text-[13px] font-semibold text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-300">
                {i + 1}
              </span>
              <div>
                <strong className="font-semibold">{title}</strong>
                <p className="mt-0.5 text-[15px] text-neutral-600 dark:text-neutral-400">{body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div
        className="overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-950"
        aria-hidden="true"
      >
        <div className="flex gap-1.5 border-b border-neutral-200 px-3.5 py-3 dark:border-neutral-800">
          <span className="h-2.5 w-2.5 rounded-full bg-neutral-300 dark:bg-neutral-700" />
          <span className="h-2.5 w-2.5 rounded-full bg-neutral-300 dark:bg-neutral-700" />
          <span className="h-2.5 w-2.5 rounded-full bg-neutral-300 dark:bg-neutral-700" />
        </div>
        <div className="space-y-3.5 px-4 pb-5 pt-4">
          {BOARD_ROWS.map(([label, pct, points, tone]) => (
            <div key={label} className="grid grid-cols-[5.2rem_1fr_2rem] items-center gap-3">
              <span className="text-[13px] text-neutral-500 dark:text-neutral-400">{label}</span>
              <span className="h-2 overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-800">
                <span className={`block h-full rounded-full ${FILL[tone]}`} style={{ width: `${pct}%` }} />
              </span>
              <span className="text-right text-[13px] tabular-nums text-neutral-700 dark:text-neutral-300">
                {points}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
