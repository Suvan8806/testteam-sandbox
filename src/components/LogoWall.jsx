import { CUSTOMERS } from '../data'

// Customer logo strip. Logos are single-colour inline SVGs tinted by CSS so
// they sit evenly against the section background rather than fighting each
// other.
const MARKS = {
  Northbeam: <path d="M4 20V4l16 16V4" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinejoin="round" />,
  Graywater: (
    <>
      <path d="M3 13c3-4 6-4 9 0s6 4 9 0" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <path d="M3 19c3-4 6-4 9 0s6 4 9 0" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="round" />
    </>
  ),
  'Ferndale Labs': (
    <>
      <path d="M9 3v7L4.6 19a1.5 1.5 0 0 0 1.3 2.2h12.2A1.5 1.5 0 0 0 19.4 19L15 10V3" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinejoin="round" />
      <path d="M8 3h8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </>
  ),
  Halcyon: (
    <>
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="2.2" fill="none" />
      <path d="M12 3.5v17" stroke="currentColor" strokeWidth="2.2" />
    </>
  ),
  'Arbor & Co': (
    <>
      <path d="M12 21V11" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M12 11c0-4 3-7 7-7 0 4-3 7-7 7zM12 13c0-3.3-2.5-6-6-6 0 3.3 2.5 6 6 6z" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinejoin="round" />
    </>
  ),
}

export default function LogoWall() {
  return (
    <section id="customers" className="border-t border-neutral-200 bg-white py-20 dark:border-neutral-800 dark:bg-neutral-950">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.17em] text-neutral-500 dark:text-neutral-400">
          Trusted by teams shipping every week
        </p>
        <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-14 gap-y-7">
          {CUSTOMERS.map((name) => (
            <li
              key={name}
              className="inline-flex items-center gap-2.5 text-lg font-semibold tracking-tight text-neutral-400 dark:text-neutral-700"
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6 flex-none" aria-hidden="true">
                {MARKS[name]}
              </svg>
              {name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
