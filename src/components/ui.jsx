// Small shared presentational helpers. Keeping the class strings in one place
// stops the panels drifting apart visually.

export const BTN_PRIMARY =
  'inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-6 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-500 active:translate-y-px'

export const BTN_GHOST =
  'inline-flex items-center justify-center gap-2 rounded-lg border border-neutral-300 bg-white px-6 py-3 text-sm font-medium text-neutral-900 transition hover:border-indigo-500 hover:text-indigo-600 active:translate-y-px dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 dark:hover:border-indigo-400 dark:hover:text-indigo-300'

export const BTN_SMALL =
  'inline-flex items-center justify-center gap-2 rounded-lg border border-neutral-300 bg-neutral-50 px-4 py-2 text-sm font-medium text-neutral-900 transition hover:border-indigo-500 hover:text-indigo-600 active:translate-y-px dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 dark:hover:border-indigo-400 dark:hover:text-indigo-300'

export const BTN_QUIET =
  'inline-flex items-center justify-center gap-2 rounded-lg border border-neutral-200 bg-transparent px-4 py-2 text-sm font-medium text-neutral-500 transition hover:border-neutral-400 hover:text-neutral-900 active:translate-y-px dark:border-neutral-800 dark:text-neutral-400 dark:hover:border-neutral-600 dark:hover:text-neutral-100'

export const PANEL =
  'rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900'

// The wordmark, for surfaces that are not the marketing Nav — the sign-in card
// and the signed-in header. Nav keeps its own copy so the marketing shell has
// no dependency on the application pages.
export function Wordmark({ className = '' }) {
  return (
    <span className={`inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 ${className}`}>
      <svg viewBox="0 0 32 32" className="h-[22px] w-[22px]" aria-hidden="true">
        <rect width="32" height="32" rx="8" fill="currentColor" />
        <path d="M9 16h5v7H9zM18 9h5v14h-5z" fill="#fff" />
      </svg>
      <span className="text-[17px] font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
        TestTeam
      </span>
    </span>
  )
}

export function ThemeToggle({ dark, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label="Toggle light and dark theme"
      className="inline-flex h-[34px] w-[34px] flex-none items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-600 transition hover:text-neutral-900 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
    >
      {dark ? (
        <svg viewBox="0 0 24 24" className="h-[17px] w-[17px]" aria-hidden="true">
          <circle cx="12" cy="12" r="4.2" fill="currentColor" />
          <g stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <path d="M12 2.4v2.6M12 19v2.6M2.4 12h2.6M19 12h2.6M5.2 5.2l1.9 1.9M16.9 16.9l1.9 1.9M18.8 5.2l-1.9 1.9M7.1 16.9l-1.9 1.9" />
          </g>
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" className="h-[17px] w-[17px]" aria-hidden="true">
          <path d="M20 14.2A8.4 8.4 0 1 1 9.8 4a6.9 6.9 0 0 0 10.2 10.2z" fill="currentColor" />
        </svg>
      )}
    </button>
  )
}

// Form field and label classes, shared by the sign-in card and the signed-in
// pages so form controls never drift apart.
export const FIELD =
  'w-full rounded-lg border border-neutral-300 bg-white px-3.5 py-2.5 text-[15px] ' +
  'outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 ' +
  'dark:border-neutral-700 dark:bg-neutral-950'

export const FIELD_LABEL =
  'block text-[11px] font-semibold uppercase tracking-[0.07em] text-neutral-500 dark:text-neutral-400'

export function Kicker({ children }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-[0.13em] text-indigo-600 dark:text-indigo-400">
      {children}
    </p>
  )
}

export function SectionHeading({ kicker, title, lede, className = '' }) {
  return (
    <div className={className}>
      {kicker ? <Kicker>{kicker}</Kicker> : null}
      <h2 className="mt-3 max-w-[30ch] text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h2>
      {lede ? (
        <p className="mt-3 max-w-[52ch] text-neutral-600 dark:text-neutral-400">{lede}</p>
      ) : null}
    </div>
  )
}

export function Stars({ count = 5 }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} out of 5`}>
      {[0, 1, 2, 3, 4].map((i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          aria-hidden="true"
          className={`h-4 w-4 ${i < count ? 'text-amber-500' : 'text-neutral-300 dark:text-neutral-700'}`}
        >
          <path d="m12 3 2.6 5.6 6.1.8-4.5 4.2 1.2 6-5.4-3-5.4 3 1.2-6L3.3 9.4l6.1-.8z" fill="currentColor" />
        </svg>
      ))}
    </div>
  )
}

const ICON_PATHS = {
  chart: (
    <>
      <rect x="3" y="12" width="4" height="8" rx="1" fill="currentColor" />
      <rect x="10" y="7" width="4" height="13" rx="1" fill="currentColor" />
      <rect x="17" y="4" width="4" height="16" rx="1" fill="currentColor" />
    </>
  ),
  download: (
    <>
      <path d="M12 3v10m0 0 4-4m-4 4-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M4 16v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3 4 6.5v5.2c0 4.6 3.3 8.4 8 9.3 4.7-.9 8-4.7 8-9.3V6.5z" stroke="currentColor" strokeWidth="2" fill="none" strokeLinejoin="round" />
      <path d="m8.8 12 2.2 2.2 4.2-4.4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M12 7.2V12l3.2 2" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  link: (
    <>
      <path d="M8 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M20 4h-6m6 0v6m0-6-8 8" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
}

export function Icon({ name, className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      {ICON_PATHS[name] ?? null}
    </svg>
  )
}
