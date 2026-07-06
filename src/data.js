// Static marketing content for the TestTeam site. Everything the page renders
// comes from here so copy changes never require touching a component.

export const NAV_LINKS = [
  { label: 'Product', href: '#explore', tab: 'product' },
  { label: 'Features', href: '#explore', tab: 'features' },
  { label: 'Customers', href: '#explore', tab: 'customers' },
  { label: 'Changelog', href: '#explore', tab: 'changelog' },
  { label: 'Pricing', href: '#pricing' },
]

export const STRIP_STATS = [
  ['1,400+', 'teams onboarded'],
  ['38k', 'sprints rolled up weekly'],
  ['99.95%', 'rollup uptime'],
  ['<2s', 'portfolio recompute'],
]

export const STEPS = [
  ['Connect projects', 'Point TestTeam at the boards you already run. No migration, no re-tagging.'],
  ['Roll it up', 'Sprint state is aggregated across the portfolio and cached so the board stays instant.'],
  ['Ship it out', 'Export to CSV or schedule a digest so nobody has to open the tool to get the number.'],
]

export const BOARD_ROWS = [
  ['Northbeam', 82, 34, 'ok'],
  ['Graywater', 48, 21, 'warn'],
  ['Arbor', 94, 55, 'ok'],
  ['Halcyon', 100, 18, 'done'],
  ['Ferndale', 36, 25, 'warn'],
]

export const FEATURES = [
  {
    title: 'Cross-project rollups',
    body: 'Aggregate sprint progress across every project on one board, with the same numbers finance and engineering both see.',
    icon: 'chart',
  },
  {
    title: 'CSV and Excel export',
    body: 'Hand finance a spreadsheet without rebuilding it by hand. Rows come out in the order the table renders them.',
    icon: 'download',
  },
  {
    title: 'Slack and email digests',
    body: 'A weekly summary that lands before the standup, scheduled per workspace on whichever day the workspace picks.',
    icon: 'mail',
  },
  {
    title: 'Role-scoped access',
    body: 'Contractors see one project, VPs see the portfolio. Scopes are inherited, so nobody hand-maintains a permission matrix.',
    icon: 'shield',
  },
  {
    title: 'Burn-down history',
    body: 'Every rollup is snapshotted, so you can answer "what did we think three sprints ago" without reconstructing it.',
    icon: 'clock',
  },
  {
    title: 'Webhooks and API',
    body: 'Every rollup is readable over a plain JSON API, and every sprint close fires a webhook you can hang automation off.',
    icon: 'link',
  },
]

export const TESTIMONIALS = [
  {
    quote: 'We stopped running a Monday spreadsheet ritual. The rollup is the spreadsheet now, and it is never out of date by more than a refresh.',
    name: 'Dana Reyes',
    role: 'Director of Engineering, Northbeam',
    initials: 'DR',
    stars: 5,
  },
  {
    quote: 'Finance asked for a portfolio number for three years. We gave them an export button and they have not asked since.',
    name: 'Mikael Ohlsson',
    role: 'VP Delivery, Arbor & Co',
    initials: 'MO',
    stars: 5,
  },
  {
    quote: 'The weekly digest is the only automated email nobody on my team filters. That is the highest praise I have.',
    name: 'Priya Sharma',
    role: 'Head of Programme, Halcyon',
    initials: 'PS',
    stars: 4,
  },
]

export const CUSTOMERS = ['Northbeam', 'Graywater', 'Ferndale Labs', 'Halcyon', 'Arbor & Co']

export const CHANGELOG = [
  {
    version: 'v2.6',
    when: 'this week',
    title: 'Rollup aggregate cache',
    body: 'Portfolio rollups are cached and refreshed on a 24-hour schedule instead of recomputed per request. Board load dropped from 2.4s to under 200ms.',
  },
  {
    version: 'v2.5',
    when: 'last month',
    title: 'Per-workspace digest scheduling',
    body: 'Workspaces choose their own digest day and hour rather than inheriting a global Monday 08:00 default.',
  },
  {
    version: 'v2.4',
    when: 'two months ago',
    title: 'Project table export',
    body: 'The project table exports to CSV in the order it renders, so an export diffs cleanly against the previous one.',
  },
  {
    version: 'v2.3',
    when: 'this spring',
    title: 'Sprint risk flags',
    body: 'Sprints trending behind their burn-down are flagged at risk and surfaced in the rollup header.',
  },
]
