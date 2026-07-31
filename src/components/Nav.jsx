import { NAV_LINKS } from '../data'

function Logo() {
  return (
    <svg viewBox="0 0 32 32" className="h-[22px] w-[22px]" aria-hidden="true">
      <rect width="32" height="32" rx="8" fill="currentColor" />
      <path d="M9 16h5v7H9zM18 9h5v14h-5z" fill="#fff" />
    </svg>
  )
}

/**
 * Fixed top navigation.
 *
 * Every entry activates the matching tab in the explorer section. Entries
 * without a `tab` fall through to plain anchor behaviour.
 */
export default function Nav({ onSelectTab, dark, onToggleTheme }) {
  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 top-0 z-50 h-28 border-b border-neutral-900/10 bg-white/75 backdrop-blur-md backdrop-saturate-150 dark:border-white/10 dark:bg-neutral-950/70 sm:h-16"
    >
      <div className="relative mx-auto flex h-full max-w-6xl flex-col items-center justify-center gap-2.5 px-4 sm:flex-row sm:justify-between sm:gap-6 sm:px-6">
        <a href="#top" className="inline-flex flex-none items-center gap-2 text-indigo-600 dark:text-indigo-400">
          <Logo />
          <span className="text-[17px] font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
            TestTeam
          </span>
        </a>

        <ul className="flex w-full items-center justify-center gap-5 overflow-x-auto text-sm text-neutral-600 [scrollbar-width:none] dark:text-neutral-400 sm:w-auto sm:gap-7 [&::-webkit-scrollbar]:hidden">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                onClick={() => link.tab && onSelectTab(link.tab)}
                className="inline-block whitespace-nowrap border-b-2 border-transparent py-0.5 transition hover:border-indigo-500 hover:text-neutral-900 dark:hover:text-neutral-100"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="absolute right-4 top-3.5 flex flex-none items-center gap-2.5 sm:static sm:right-auto sm:top-auto">
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label="Toggle light and dark theme"
            className="inline-flex h-[34px] w-[34px] items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-600 transition hover:text-neutral-900 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
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
          <a
            href="#/login"
            className="whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium text-neutral-600 transition hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
          >
            Sign in
          </a>
          <a
            href="#cta"
            className="hidden rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-500 lg:inline-block"
          >
            Start free
          </a>
        </div>
      </div>
    </nav>
  )
}
