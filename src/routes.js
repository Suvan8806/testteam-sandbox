// Hash routing for the signed-in application.
//
// The marketing page already owns plain `#section` anchors (`#explore`,
// `#dashboard`, `#cta`), so application routes are namespaced under `#/`.
// `#dashboard` still scrolls to the rollup section; `#/dashboard` is the
// signed-in board. Hash routing also means no server rewrite rules — a deep
// link to `#/login` is served by the same static index.html as everything else.

import { useEffect, useState } from 'react'

export const ROUTES = {
  home: '/',
  login: '/login',
  dashboard: '/dashboard',
}

export function currentRoute() {
  const hash = typeof window === 'undefined' ? '' : window.location.hash
  // Anything that is not an app route is the marketing page, including the
  // bare `#section` anchors it scrolls with.
  if (!hash.startsWith('#/')) return ROUTES.home
  const path = hash.slice(1).replace(/\/+$/, '')
  return path || ROUTES.home
}

export function navigate(route) {
  const next = `#${route}`
  if (window.location.hash === next) return
  window.location.hash = next
}

export function useRoute() {
  const [route, setRoute] = useState(currentRoute)

  useEffect(() => {
    const onHashChange = () => setRoute(currentRoute())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  return route
}
