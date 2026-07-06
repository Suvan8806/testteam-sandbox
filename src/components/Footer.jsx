const COLUMNS = [
  ['Product', [['Live rollup', '#dashboard'], ['Export', '#export'], ['Explore', '#explore']]],
  ['Resources', [['Changelog', '#explore'], ['FAQ', '#faq'], ['Customers', '#customers']]],
  ['Company', [['Get started', '#cta'], ['Back to top', '#top']]],
]

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 pb-8 pt-12 dark:border-neutral-800">
      <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-10 px-6">
        <div className="max-w-xs">
          <span className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
            <svg viewBox="0 0 32 32" className="h-5 w-5" aria-hidden="true">
              <rect width="32" height="32" rx="8" fill="currentColor" />
              <path d="M9 16h5v7H9zM18 9h5v14h-5z" fill="#fff" />
            </svg>
            <span className="font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">TestTeam</span>
          </span>
          <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400">
            Cross-project sprint rollups, export, and digests.
          </p>
        </div>

        <div className="flex flex-wrap gap-x-14 gap-y-8">
          {COLUMNS.map(([heading, links]) => (
            <div key={heading}>
              <h4 className="text-[13px] font-semibold uppercase tracking-[0.06em] text-neutral-500 dark:text-neutral-400">
                {heading}
              </h4>
              <ul className="mt-3 space-y-2">
                {links.map(([label, href]) => (
                  <li key={label}>
                    <a href={href} className="text-[15px] text-neutral-700 transition hover:text-indigo-600 dark:text-neutral-300 dark:hover:text-indigo-400">
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-6xl border-t border-neutral-200 px-6 pt-6 dark:border-neutral-800">
        <p className="text-[13px] text-neutral-500 dark:text-neutral-400">
          Disposable demo sandbox. No real customers, no real data.
        </p>
      </div>
    </footer>
  )
}
