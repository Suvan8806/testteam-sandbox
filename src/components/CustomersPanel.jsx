import { TESTIMONIALS } from '../data'
import { BTN_SMALL, Stars } from './ui'

/**
 * Customers tab.
 *
 * The export button is rendered here but its click handler is attached by the
 * page shell, which owns the export data. The button keeps a stable id so the
 * shell can find it.
 */
export default function CustomersPanel() {
  return (
    <div>
      <div className="grid gap-5 lg:grid-cols-3">
        {TESTIMONIALS.map((t) => (
          <figure
            key={t.name}
            className="flex flex-col gap-4 rounded-2xl border border-neutral-200 bg-neutral-50 p-6 dark:border-neutral-800 dark:bg-neutral-950"
          >
            <Stars count={t.stars} />
            <blockquote className="text-[15px] text-neutral-700 dark:text-neutral-300">
              {t.quote}
            </blockquote>
            <figcaption className="mt-auto flex items-center gap-3">
              <span className="grid h-9 w-9 flex-none place-items-center rounded-full bg-indigo-50 text-xs font-semibold text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-300">
                {t.initials}
              </span>
              <span className="flex flex-col">
                <strong className="text-[15px] font-semibold">{t.name}</strong>
                <span className="text-[13px] text-neutral-500 dark:text-neutral-400">{t.role}</span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="mt-7 flex flex-wrap items-center gap-3 border-t border-neutral-200 pt-6 dark:border-neutral-800">
        <button id="customers-export" type="button" className={BTN_SMALL}>
          Export customer list
        </button>
        <span className="text-[13px] text-neutral-500 dark:text-neutral-400">
          Downloads every project attached to a named customer.
        </span>
      </div>
    </div>
  )
}
