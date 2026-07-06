import { BTN_GHOST, BTN_PRIMARY } from './ui'

/**
 * Hero.
 *
 * The nav is fixed and therefore out of flow, so the hero is pulled up
 * underneath it and pads itself back down. `-mt-16 pt-16` is sized against the
 * desktop nav so the gradient bleeds to the top of the viewport.
 */
export default function Hero() {
  return (
    <header
      id="top"
      className="relative -mt-16 overflow-hidden border-b border-neutral-200 bg-gradient-to-b from-indigo-50 to-white pt-16 dark:border-neutral-800 dark:from-neutral-900 dark:to-neutral-950"
    >
      <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -top-64 left-1/2 h-[36rem] w-[min(72rem,135%)] -translate-x-1/2 rounded-full bg-indigo-400/25 blur-3xl dark:bg-indigo-500/15"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-3xl px-6 pb-24 pt-14 text-center sm:pt-28">
        <p className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-indigo-50 px-3.5 py-1 text-[13px] font-medium text-indigo-700 dark:border-neutral-800 dark:bg-indigo-500/10 dark:text-indigo-300">
          <span className="h-1.5 w-1.5 animate-pulse2 rounded-full bg-current" />
          Now with cross-project rollups
        </p>

        <h1 className="mt-6 text-[clamp(2.1rem,6.2vw,3.6rem)] font-semibold leading-[1.08] tracking-[-0.033em]">
          Every sprint, every project,
          <br className="hidden sm:inline" /> one view.
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-lg text-neutral-600 dark:text-neutral-400">
          TestTeam aggregates sprint progress across your whole portfolio, exports
          it in one click, and mails a digest your team actually reads. No
          spreadsheet archaeology on Monday morning.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a href="#cta" className={BTN_PRIMARY}>Start free</a>
          <a href="#dashboard" className={BTN_GHOST}>See a live rollup</a>
        </div>

        <p className="mt-5 text-[13px] text-neutral-500 dark:text-neutral-500">
          No credit card &middot; 14-day trial &middot; Disposable demo data
        </p>
      </div>
    </header>
  )
}
