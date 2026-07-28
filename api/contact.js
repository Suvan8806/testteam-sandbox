// Contact form relay.
//
// Runs as a Vercel serverless function so the mail credential stays on the
// server. RESEND_API_KEY is read from the environment and is never shipped to
// the browser -- a VITE_-prefixed variable would be inlined into the bundle,
// which on a public repo means giving the key away.

const SUPPORT_INBOX = 'testteamcustomerservice@gmail.com'

// Resend's shared sender works without domain verification. Override with a
// verified domain by setting CONTACT_FROM.
const DEFAULT_FROM = 'TestTeam Support <onboarding@resend.dev>'

const MAX = { name: 120, email: 200, reason: 80, message: 4000 }

function clean(value, limit) {
  return typeof value === 'string' ? value.trim().slice(0, limit) : ''
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    // Fail loudly. A contact form that silently swallows messages is worse
    // than one that admits it is not configured.
    return res.status(503).json({
      error: 'Contact form is not configured (RESEND_API_KEY is unset).',
    })
  }

  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {}
  const name = clean(body.name, MAX.name)
  const email = clean(body.email, MAX.email)
  const reason = clean(body.reason, MAX.reason) || 'Something else'
  const message = clean(body.message, MAX.message)

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email and message are all required.' })
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return res.status(400).json({ error: 'That email address does not look right.' })
  }

  // Plain text on purpose. This lands in a support inbox that gets read by a
  // triage agent, and marketing chrome would become part of the complaint it
  // has to classify.
  const text = [
    message,
    '',
    '---',
    `From: ${name} <${email}>`,
    `Reason: ${reason}`,
    'Sent from the TestTeam contact form.',
  ].join('\n')

  try {
    const resend = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM || DEFAULT_FROM,
        to: [SUPPORT_INBOX],
        reply_to: email,
        subject: `${reason}: ${name}`,
        text,
      }),
    })

    if (!resend.ok) {
      const detail = await resend.text()
      console.error('resend failed', resend.status, detail)
      return res.status(502).json({ error: 'Could not send the message. Please try again.' })
    }

    const sent = await resend.json()
    return res.status(200).json({ ok: true, id: sent.id ?? null })
  } catch (err) {
    console.error('contact relay error', err)
    return res.status(502).json({ error: 'Could not reach the mail service.' })
  }
}
