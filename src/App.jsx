import { useState } from 'react'
import LogoWall from './LogoWall'
import { RollupPanel } from './Rollup'

// Top navigation. Each entry scrolls to the section with the matching id.
const NAV_LINKS = [
  { label: 'Product', href: '#product' },
  { label: 'Features', href: '#features' },
  { label: 'Customers', href: '#customers' },
  { label: 'Pricing', href: '#pricing' },
]

function Nav() {
  return (
    <nav className="fixed top-0 inset-x-0 h-16 bg-white dark:bg-neutral-950 border-b z-50">
      <div className="mx-auto max-w-6xl h-full flex items-center justify-between px-6">
        <span className="font-semibold">TestTeam</span>
        <ul className="flex gap-6 text-sm">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="hover:underline">{l.label}</a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

function Hero() {
  // The nav is fixed at h-16. Pulling the hero up by 4rem tucks it under the
  // nav so the gradient bleeds to the top of the viewport.
  return (
    <section id="top" className="-mt-16 pt-16 bg-gradient-to-b from-indigo-50 to-white dark:from-neutral-900 dark:to-neutral-950">
      <div className="mx-auto max-w-6xl px-6 py-28 text-center">
        <h1 className="text-5xl font-bold tracking-tight">Every sprint, every project, one view.</h1>
        <p className="mt-5 text-lg text-neutral-600 dark:text-neutral-400">
          Cross-project rollups, one-click export, and a digest your team actually reads.
        </p>
        <a href="#cta" className="inline-block mt-8 rounded-lg bg-indigo-600 px-6 py-3 text-white">
          Start free
        </a>
      </div>
    </section>
  )
}

function Product() {
  return (
    <section id="product" className="mx-auto max-w-6xl px-6 py-24">
      <h2 className="text-3xl font-semibold">Built for teams running more than one thing at once</h2>
      <RollupPanel />
    </section>
  )
}

function Features() {
  const items = [
    ['Cross-project rollups', 'Aggregate sprint progress across every project on one board.'],
    ['CSV and Excel export', 'Hand finance a spreadsheet without rebuilding it by hand.'],
    ['Slack and email digests', 'A weekly summary that lands before the standup.'],
  ]
  return (
    <section id="features" className="bg-neutral-50 dark:bg-neutral-900">
      <div className="mx-auto max-w-6xl px-6 py-24 grid gap-10 md:grid-cols-3">
        {items.map(([title, body]) => (
          <div key={title}>
            <h3 className="font-semibold">{title}</h3>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">{body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function Cta() {
  return (
    <section id="cta" className="mx-auto max-w-6xl px-6 py-24 text-center">
      <h2 className="text-3xl font-semibold">Try it on your next sprint</h2>
      <a href="#top" className="inline-block mt-6 rounded-lg bg-indigo-600 px-6 py-3 text-white">
        Start free
      </a>
    </section>
  )
}

export default function App() {
  const [dark] = useState(false)
  return (
    <div className={dark ? 'dark' : ''}>
      <Nav />
      <Hero />
      <Product />
      <Features />
      <LogoWall />
      <Cta />
    </div>
  )
}
