// Weekly digest scheduler. Picks the next send time for a workspace and hands
// it to the mailer.

const DAY_MS = 24 * 60 * 60 * 1000

export function nextSendTime(workspace, now = new Date()) {
  const target = workspace.digestDay ?? 1 // Monday
  const current = now.getDay()
  const delta = (target - current + 7) % 7
  const next = new Date(now.getTime() + delta * DAY_MS)
  next.setHours(workspace.digestHour ?? 8, 0, 0, 0)
  return next
}

export async function sendDigest(workspace, mailer) {
  const when = nextSendTime(workspace)
  if (when.getTime() > Date.now()) return { sent: false, scheduled: when }
  const body = await buildDigestBody(workspace)
  await mailer.send(workspace.notifyEmail, 'Your weekly TestTeam digest', body)
  return { sent: true }
}

async function buildDigestBody(workspace) {
  const res = await fetch(`/api/workspaces/${workspace.id}/digest`)
  return res.text()
}
