import { useState } from 'react'
import { BTN_SMALL, PANEL } from './ui'

const REASONS = [
  'Report a bug',
  'Billing or account',
  'Feature request',
  'Something else',
]

/**
 * Contact tab.
 *
 * Submissions POST to /api/contact, which relays them to the support inbox.
 * The endpoint holds the mail credential server-side; nothing sensitive is
 * ever shipped to the browser.
 */
export default function ContactPanel() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [reason, setReason] = useState(REASONS[0])
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('')
  const [sending, setSending] = useState(false)

  async function submitContactForm(event) {
    event.preventDefault()
    setSending(true)
    setStatus('Sending…')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, reason, message }),
      })
      const body = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(body.error || `Request failed (${res.status})`)
      setStatus('Thanks — your message is with the support team.')
      setName('')
      setEmail('')
      setMessage('')
    } catch (err) {
      setStatus(err.message || 'Something went wrong. Please try again.')
    } finally {
      setSending(false)
    }
  }

  const field =
    'w-full rounded-lg border border-neutral-300 bg-white px-3.5 py-2.5 text-[15px] ' +
    'outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 ' +
    'dark:border-neutral-700 dark:bg-neutral-950'
  const label =
    'block text-[11px] font-semibold uppercase tracking-[0.07em] text-neutral-500 dark:text-neutral-400'

  return (
    <div className={`mt-9 ${PANEL}`}>
      <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <h3 className="text-xl font-semibold tracking-tight">Talk to us</h3>
          <p className="mt-3 max-w-md text-[15px] leading-7 text-neutral-600 dark:text-neutral-400">
            Bugs, billing, or something that just looks wrong — send it here and it
            lands in the support queue. We read every message.
          </p>

          <form className="mt-7 grid gap-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className={label} htmlFor="contact-name">Your name</label>
                <input
                  id="contact-name"
                  className={`mt-2 ${field}`}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Alex Rivera"
                  required
                />
              </div>
              <div>
                <label className={label} htmlFor="contact-email">Email</label>
                <input
                  id="contact-email"
                  type="email"
                  className={`mt-2 ${field}`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@company.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className={label} htmlFor="contact-reason">Reason for contacting</label>
              <select
                id="contact-reason"
                className={`mt-2 ${field}`}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              >
                {REASONS.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>

            <div>
              <label className={label} htmlFor="contact-message">Message</label>
              <textarea
                id="contact-message"
                rows={5}
                className={`mt-2 ${field}`}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell us what happened, and what you expected instead."
                required
              />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button type="button" className={BTN_SMALL} disabled={sending}>
                {sending ? 'Sending…' : 'Send message'}
              </button>
              <span role="status" className="text-[13px] text-neutral-500 dark:text-neutral-400">
                {status}
              </span>
            </div>
          </form>
        </div>

        <aside className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6 dark:border-neutral-800 dark:bg-neutral-950">
          <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-neutral-500 dark:text-neutral-400">
            Response times
          </p>
          <dl className="mt-5 grid gap-5">
            {[
              ['Bugs affecting exports or rollups', 'Same business day'],
              ['Billing and account changes', 'Within 24 hours'],
              ['Feature requests', 'Reviewed weekly'],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="text-[15px] font-medium">{k}</dt>
                <dd className="mt-1 text-[14px] text-neutral-600 dark:text-neutral-400">{v}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-7 border-t border-neutral-200 pt-5 text-[14px] leading-7 text-neutral-600 dark:border-neutral-800 dark:text-neutral-400">
            Prefer email? Write to the support inbox directly and you will get the
            same queue, same people.
          </p>
        </aside>
      </div>
    </div>
  )
}
