import { useState } from 'react'
import { DEMO_CREDENTIALS, signIn } from '../auth'
import { BTN_PRIMARY, FIELD, FIELD_LABEL, PANEL, ThemeToggle, Wordmark } from './ui'

/**
 * Sign-in page, served at `#/login`.
 *
 * A successful sign-in hands the session up to App, which is what moves the
 * route to `#/dashboard`. This component never navigates on its own, so there
 * is exactly one place that decides what a signed-in visitor sees.
 */
export default function LoginPage({ onSignedIn, dark, onToggleTheme }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setSubmitting(true)

    const result = signIn(email, password)
    if (!result.ok) {
      setError(result.error)
      setSubmitting(false)
      return
    }
    onSignedIn(result.session)
  }

  return (
    <div className="relative flex min-h-screen flex-col font-sans">
      <div aria-hidden="true" className="hero-grid pointer-events-none absolute inset-0" />

      <header className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-6">
        <a href="#top" aria-label="TestTeam home">
          <Wordmark />
        </a>
        <ThemeToggle dark={dark} onToggle={onToggleTheme} />
      </header>

      <main className="relative z-10 flex flex-1 items-center justify-center px-6 pb-16 pt-4">
        <div className="w-full max-w-md">
          <div className={PANEL}>
            <h1 className="text-2xl font-semibold tracking-tight">Sign in to TestTeam</h1>
            <p className="mt-2.5 text-[15px] leading-7 text-neutral-600 dark:text-neutral-400">
              Your portfolio rollup, sprint board, and exports — all in one place.
            </p>

            <form className="mt-7 grid gap-5" onSubmit={handleSubmit}>
              <div>
                <label className={FIELD_LABEL} htmlFor="login-email">Email</label>
                <input
                  id="login-email"
                  type="email"
                  autoComplete="username"
                  className={`mt-2 ${FIELD}`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  required
                />
              </div>

              <div>
                <label className={FIELD_LABEL} htmlFor="login-password">Password</label>
                <input
                  id="login-password"
                  type="password"
                  autoComplete="current-password"
                  className={`mt-2 ${FIELD}`}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••"
                  required
                />
              </div>

              {error ? (
                <p
                  role="alert"
                  className="rounded-lg border border-rose-200 bg-rose-50 px-3.5 py-2.5 text-[14px] text-rose-700 dark:border-rose-900/60 dark:bg-rose-950/40 dark:text-rose-300"
                >
                  {error}
                </p>
              ) : null}

              <button type="submit" className={`${BTN_PRIMARY} w-full`} disabled={submitting}>
                {submitting ? 'Signing in…' : 'Log in'}
              </button>
            </form>

            {/* This is a public demo sandbox with no real account behind it, so
                the credentials are printed rather than shared out of band. */}
            <div className="mt-7 rounded-xl border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-950">
              <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-neutral-500 dark:text-neutral-400">
                Demo workspace
              </p>
              <dl className="mt-3 grid gap-1.5 font-mono text-[13px] text-neutral-700 dark:text-neutral-300">
                <div className="flex justify-between gap-4">
                  <dt className="text-neutral-500 dark:text-neutral-400">email</dt>
                  <dd>{DEMO_CREDENTIALS.email}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-neutral-500 dark:text-neutral-400">password</dt>
                  <dd>{DEMO_CREDENTIALS.password}</dd>
                </div>
              </dl>
            </div>
          </div>

          <p className="mt-6 text-center text-[14px] text-neutral-500 dark:text-neutral-400">
            <a href="#top" className="transition hover:text-indigo-600 dark:hover:text-indigo-400">
              ← Back to testteam.com
            </a>
          </p>
        </div>
      </main>
    </div>
  )
}
