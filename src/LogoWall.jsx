// Customer logo strip. Logos are single-colour SVGs tinted by CSS so they sit
// evenly against the section background rather than fighting each other.

const CUSTOMERS = ['Northbeam', 'Graywater', 'Ferndale Labs', 'Halcyon', 'Arbor & Co']

export default function LogoWall() {
  return (
    <section id="customers" className="bg-white dark:bg-neutral-950">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <p className="text-center text-xs uppercase tracking-widest text-neutral-500">
          Trusted by teams shipping every week
        </p>
        <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-14 gap-y-8">
          {CUSTOMERS.map((name) => (
            <li key={name} className="text-neutral-400 dark:text-neutral-700 text-xl font-medium">
              {name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
