I can't fix this from `src/App.jsx` — this file contains no contact-form logic. It only mounts `<ContactPanel />` (with no props, like every other panel), and nothing here intercepts clicks or blocks submission. The Send-button bug is almost certainly inside `src/components/ContactPanel.jsx` (e.g. a missing `onSubmit`/`type="submit"`, a handler that never calls `preventDefault`, or a `disabled`/validation guard). Please share that file and I'll patch it.

Returning `src/App.jsx` unchanged rather than inventing an edit that could break working behavior:

import { useEffect, useRef, useState } from 'react'
import ChangelogPanel from './components/ChangelogPanel'
import ContactPanel from './components/ContactPanel'
import CustomersPanel from './components/CustomersPanel'
import ExportPanel from './components/ExportPanel'
import FeaturesPanel from './components/FeaturesPanel'
import Footer from './components/Footer'
import Hero from './components/Hero'
import LogoWall from './components/LogoWall'
import Nav from './components/Nav'
import ProductPanel from './components/ProductPanel'
import RollupPanel from './components/Rollup'
import { BTN_GHOST, BTN_PRIMARY, SectionHeading } from './components/ui'
import { STRIP_STATS } from './data'
import { downloadCsv } from './exportCsv'
import { listProjects } from './projects'

const TABS = [
  { id: 'product', label: 'Product' },
  { id: 'features', label: 'Features' },
  { id: 'customers', label: 'Customers' },
  { id: 'changelog', label: 'Changelog' },
  { id: 'contact', label: 'Contact' },
]

const FAQS = [
  ['Does TestTeam replace our issue tracker?', 'No. It reads the boards you already run and aggregates them. Nothing is migrated and nothing is re-tagged.'],
  ['How fresh is the rollup?', 'Rollups are cached and refreshed on a schedule so the board loads instantly. A manual refresh recomputes immediately.'],
  ['Can I get the data out?', 'Yes — CSV export from the project table, plus a JSON API for everything the UI can see. Excel export is on the roadmap.'],
  ['Where does the weekly digest go?', 'Email and Slack, on whichever day and hour the workspace picks.'],
]

function useTheme() {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'))

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    try {
      localStorage.setItem('tt-theme', dark ? 'dark' : 'light')
    } catch {
      /* private mode — the class is still applied */
    }
  }, [dark])

  return [dark, () => setDark((d) => !d)]
}

export default function App() {
  const [activeTab, setActiveTab] = useState('product')
  const [dark, toggleTheme] = useTheme()
  const tabRefs = useRef({})

  // Wire the Customers tab export button to the project export. The button
  // lives inside the Customers panel and keeps a stable id.
  useEffect(() => {
    const btn = document.getElementById('customers-export')
    if (!btn) return undefined
    const handler = () => downloadCsv(listProjects(), 'customers.csv')
    btn.addEventListener('click', handler)
    return () => btn.removeEventListener('click', handler)
  }, [])

  function handleTabKeyDown(event) {
    const i = TABS.findIndex((t) => t.id === activeTab)
    let next = null
    if (event.key === 'ArrowRight') next = TABS[(i + 1) % TABS.length]
    else if (event.key === 'ArrowLeft') next = TABS[(i - 1 + TABS.length) % TABS.length]
    else if (event.key === 'Home') next = TABS[0]
    else if (event.key === 'End') next = TABS[TABS.length - 1]
    if (!next) return
    event.preventDefault()
    setActiveTab(next.id)
    tabRefs.current[next.id]?.focus()
  }

  return (
    <div className="font-sans">
      <Nav onSelectTab={setActiveTab} dark={dark} onToggleTheme={toggleTheme} />

      <Hero />

      {/* Trust strip */}
      <section aria-label="At a glance" className="border-b border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-5 px-6 py-7 text-center sm:grid-cols-4">
          {STRIP_STATS.map(([value, label]) => (
            <div key={label} className="flex flex-col">
              <strong className="text-2xl font-semibold tabular-nums tracking-tight">{value}</strong>
              <span className="text-[13px] text-neutral-500 dark:text-neutral-400">{label}</span>
            </div>
          ))}
        </div>
      </section>

      <main>
        {/* Live rollup */}
        <section id="dashboard" className="scroll-mt-32 py-20 sm:scroll-mt-24 sm:py-24">
          <div className="mx-auto max-w-6xl px-6">
            <SectionHeading
              kicker="Live rollup"
              title="The whole portfolio, aggregated on a schedule"
              lede="Every open sprint across every project, rolled into one panel. These numbers are computed in your browser by src/rollupCache.js — the real module, not a mock-up."
            />
            <RollupPanel />
          </div>
        </section>

        {/* Tabbed explorer */}
        <section
          id="explore"
          className="scroll-mt-32 border-y border-neutral-200 bg-neutral-50 py-20 dark:border-neutral-800 dark:bg-neutral-900 sm:scroll-mt-24 sm:py-24"
        >
          <div className="mx-auto max-w-6xl px-6">
            <SectionHeading kicker="Explore" title="Everything TestTeam does, in one place" />

            <div className="mt-8 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <div
                role="tablist"
                aria-label="Explore TestTeam"
                className="inline-flex gap-1 rounded-full border border-neutral-200 bg-white p-1 shadow-sm dark:border-neutral-800 dark:bg-neutral-950"
              >
                {TABS.map((tab) => {
                  const selected = tab.id === activeTab
                  return (
                    <button
                      key={tab.id}
                      ref={(el) => { tabRefs.current[tab.id] = el }}
                      role="tab"
                      id={`tab-${tab.id}`}
                      aria-controls={`panel-${tab.id}`}
                      aria-selected={selected}
                      tabIndex={selected ? 0 : -1}
                      onClick={() => setActiveTab(tab.id)}
                      onKeyDown={handleTabKeyDown}
                      className={`whitespace-nowrap rounded-full px-5 py-2.5 text-[15px] font-medium transition ${
                        selected
                          ? 'bg-indigo-600 text-white'
                          : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100'
                      }`}
                    >
                      {tab.label}
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="mt-7 animate-fade rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 sm:p-8">
              {activeTab === 'product' && (
                <div role="tabpanel" id="panel-product" aria-labelledby="tab-product" tabIndex={0}>
                  <ProductPanel />
                </div>
              )}
              {activeTab === 'features' && (
                <div role="tabpanel" id="panel-features" aria-labelledby="tab-features" tabIndex={0}>
                  <FeaturesPanel />
                </div>
              )}
              {activeTab === 'customers' && (
                <div role="tabpanel" id="panel-customers" aria-labelledby="tab-customers" tabIndex={0}>
                  <CustomersPanel />
                </div>
              )}
              {activeTab === 'changelog' && (
                <div role="tabpanel" id="panel-changelog" aria-labelledby="tab-changelog" tabIndex={0}>
                  <ChangelogPanel />
                </div>
              )}

              {activeTab === 'contact' && (
                <div role="tabpanel" id="panel-contact" aria-labelledby="tab-contact" tabIndex={0}>
                  <ContactPanel />
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Export */}
        <section id="export" className="scroll-mt-32 py-20 sm:scroll-mt-24 sm:py-24">
          <div className="mx-auto max-w-6xl px-6">
            <SectionHeading
              kicker="Export"
              title="One click, one file"
              lede="The project table below is exported verbatim. The preview is produced by the same toCsv() the download button calls."
            />
            <ExportPanel />
          </div>
        </section>

        <LogoWall />

        {/* FAQ */}
        <section
          id="faq"
          className="scroll-mt-32 border-y border-neutral-200 bg-neutral-50 py-20 dark:border-neutral-800 dark:bg-neutral-900 sm:scroll-mt-24 sm:py-24"
        >
          <div className="mx-auto max-w-6xl px-6">
            <SectionHeading kicker="FAQ" title="The questions we actually get asked" />
            <div className="mt-9 grid max-w-3xl gap-3">
              {FAQS.map(([q, a]) => (
                <details
                  key={q}
                  className="group rounded-xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-950"
                >
                  <summary className="flex cursor-pointer items-center justify-between gap-4 font-medium marker:content-none [&::-webkit-details-marker]:hidden">
                    {q}
                    <span className="flex-none text-lg leading-none text-indigo-600 dark:text-indigo-400">
                      <span className="group-open:hidden">+</span>
                      <span className="hidden group-open:inline">&minus;</span>
                    </span>
                  </summary>
                  <p className="mt-3 text-[15px] text-neutral-600 dark:text-neutral-400">{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section id="cta" className="scroll-mt-32 py-20 text-center sm:scroll-mt-24 sm:py-24">
          <div className="mx-auto max-w-2xl px-6">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Try it on your next sprint
            </h2>
            <p className="mx-auto mt-3 text-neutral-600 dark:text-neutral-400">
              Connect a project, close a sprint, watch the rollup move.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a href="#top" className={BTN_PRIMARY}>Start free</a>
              <a href="#dashboard" className={BTN_GHOST}>Replay the rollup demo</a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}