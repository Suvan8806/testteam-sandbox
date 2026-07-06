// Weekly digest scheduler. Picks the next send time for a workspace, renders
// the digest body from the current rollup, and hands it to the mailer.

import { getRollup } from './rollupCache.js'

const DAY_MS = 24 * 60 * 60 * 1000

const DAY_NAMES = [
  'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday',
]

export function nextSendTime(workspace, now = new Date()) {
  const target = workspace.digestDay ?? 1 // Monday
  const current = now.getDay()
  const delta = (target - current + 7) % 7
  const next = new Date(now.getTime() + delta * DAY_MS)
  next.setHours(workspace.digestHour ?? 8, 0, 0, 0)
  return next
}

export function describeSchedule(workspace, now = new Date()) {
  const next = nextSendTime(workspace, now)
  const day = DAY_NAMES[next.getDay()]
  const hour = String(next.getHours()).padStart(2, '0')
  const minute = String(next.getMinutes()).padStart(2, '0')
  return `${day} ${hour}:${minute}`
}

export async function buildDigestBody(workspace) {
  const rollup = await getRollup()
  return [
    `TestTeam weekly digest — ${workspace.name ?? workspace.id}`,
    '',
    `Open sprints:     ${rollup.openSprints}`,
    `Points complete:  ${rollup.pointsComplete}`,
    `Sprints at risk:  ${rollup.atRisk}`,
  ].join('\n')
}

export async function sendDigest(workspace, mailer, now = new Date()) {
  const when = nextSendTime(workspace, now)
  if (when.getTime() > now.getTime()) return { sent: false, scheduled: when }
  const body = await buildDigestBody(workspace)
  await mailer.send(workspace.notifyEmail, 'Your weekly TestTeam digest', body)
  return { sent: true }
}
