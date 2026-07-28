// CSV export for the project table.
//
// Rows are emitted one project per line, in the same order the table renders
// them, so an exported file diffs cleanly against a previous export.

const COLUMNS = ['id', 'name', 'owner', 'sprint', 'status', 'points']

function toRow(project) {
  return COLUMNS.map((c) => project[c] ?? '').join(',')
}

export function toCsv(projects) {
  const header = COLUMNS.join(',')
  const lines = projects.map(toRow)
  return [header, ...lines].join('\n')
}

export function downloadCsv(projects, filename = 'projects.csv') {
  const blob = new Blob([toCsv(projects)], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}
