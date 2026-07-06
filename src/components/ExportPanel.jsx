import { useState } from 'react'
import { downloadCsv, toCsv } from '../exportCsv'
import { listProjects } from '../projects'
import { BTN_QUIET, BTN_SMALL, PANEL } from './ui'

const COLUMN_LABELS = ['ID', 'Name', 'Owner', 'Sprint', 'Status', 'Points']
const COLUMN_KEYS = ['id', 'name', 'owner', 'sprint', 'status', 'points']

export default function ExportPanel() {
  const [status, setStatus] = useState('')
  const projects = listProjects()

  function handleDownload() {
    downloadCsv(projects, 'testteam-projects.csv')
    setStatus('Downloaded testteam-projects.csv')
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(toCsv(projects))
      setStatus('CSV copied to clipboard.')
    } catch {
      setStatus('Clipboard blocked — copy from the preview below.')
    }
  }

  return (
    <div className={`mt-9 ${PANEL}`}>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[42rem] border-collapse text-[15px]">
          <thead>
            <tr>
              {COLUMN_LABELS.map((label) => (
                <th
                  key={label}
                  className="border-b border-neutral-200 px-3.5 py-2.5 text-left text-[11px] font-semibold uppercase tracking-[0.07em] text-neutral-500 dark:border-neutral-800 dark:text-neutral-400"
                >
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id}>
                {COLUMN_KEYS.map((key) => (
                  <td
                    key={key}
                    className="whitespace-nowrap border-b border-neutral-200 px-3.5 py-2.5 last:tabular-nums dark:border-neutral-800"
                  >
                    {project[key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-neutral-200 pt-5 dark:border-neutral-800">
        <button type="button" className={BTN_SMALL} onClick={handleDownload}>
          Download CSV
        </button>
        <button type="button" className={BTN_QUIET} onClick={handleCopy}>
          Copy CSV
        </button>
        <span role="status" className="text-[13px] text-neutral-500 dark:text-neutral-400">
          {status}
        </span>
      </div>

      <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.1em] text-neutral-500 dark:text-neutral-400">
        Generated CSV
      </p>
      <pre className="mt-2.5 overflow-x-auto rounded-lg border border-neutral-200 bg-neutral-50 p-4 font-mono text-[13px] leading-7 text-neutral-700 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-300">
        {toCsv(projects)}
      </pre>
    </div>
  )
}
