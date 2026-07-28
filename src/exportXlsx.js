// Excel export. Writes a single sheet from the same column set as the CSV
// export so the two stay consistent.

import { toCsv } from './exportCsv'

export function toWorkbook(projects) {
  const rows = toCsv(projects).split('\n').map((line) => line.split(','))
  return { sheets: [{ name: 'Projects', rows }] }
}
