// Project table data for the demo workspace. The marketing page renders this
// list into the project table and exports the same array to CSV, so the export
// and the table can never drift apart.

export const PROJECTS = [
  { id: 'P-101', name: 'Northbeam Migration', owner: 'dana', sprint: 'S-23', status: 'on track', points: 34 },
  { id: 'P-102', name: 'Graywater Billing', owner: 'rui', sprint: 'S-24', status: 'at risk', points: 21 },
  { id: 'P-103', name: 'Arbor & Co, Ltd Rollout', owner: 'mikael', sprint: 'S-25', status: 'on track', points: 55 },
  { id: 'P-104', name: 'Halcyon Data Import', owner: 'priya', sprint: 'S-22', status: 'done', points: 18 },
  { id: 'P-105', name: 'Ferndale Labs Pilot', owner: 'tom', sprint: 'S-26', status: 'at risk', points: 25 },
]

export function listProjects() {
  return PROJECTS.map((p) => ({ ...p }))
}
