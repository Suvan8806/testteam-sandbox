// Sign-in for the demo workspace.
//
// This repository is a disposable sandbox that holds nothing real, so the one
// demo account lives in source instead of behind an identity provider and the
// password is compared in the browser. That is only acceptable because there
// is nothing here to protect — do not copy this into anything that matters.

const DEMO_ACCOUNT = {
  email: 'testest@gmail.com',
  password: 'testestpassword123',
  name: 'Test Test',
  role: 'Workspace admin',
  workspace: 'TestTeam Demo',
}

const SESSION_KEY = 'tt-session'

const BAD_CREDENTIALS = 'That email and password do not match an account.'

export const DEMO_CREDENTIALS = {
  email: DEMO_ACCOUNT.email,
  password: DEMO_ACCOUNT.password,
}

export function signIn(email, password) {
  const submitted = typeof email === 'string' ? email.trim().toLowerCase() : ''
  if (submitted !== DEMO_ACCOUNT.email || password !== DEMO_ACCOUNT.password) {
    // One message for both a wrong address and a wrong password: which half
    // was wrong is not the signed-out visitor's business.
    return { ok: false, error: BAD_CREDENTIALS }
  }

  const session = {
    email: DEMO_ACCOUNT.email,
    name: DEMO_ACCOUNT.name,
    role: DEMO_ACCOUNT.role,
    workspace: DEMO_ACCOUNT.workspace,
    signedInAt: Date.now(),
  }
  writeSession(session)
  return { ok: true, session }
}

export function readSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY)
    if (!raw) return null
    const session = JSON.parse(raw)
    // A truncated or hand-edited entry is treated as signed out rather than
    // handed to the dashboard, which would render `undefined` at the reader.
    return session && session.email ? session : null
  } catch {
    return null
  }
}

function writeSession(session) {
  try {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session))
  } catch {
    /* private mode — the session still holds for this tab, in memory */
  }
}

export function signOut() {
  try {
    localStorage.removeItem(SESSION_KEY)
  } catch {
    /* nothing persisted, nothing to clear */
  }
}
