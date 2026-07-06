import { CHANGELOG } from '../data'

export default function ChangelogPanel() {
  return (
    <ol className="ml-1.5 border-l-2 border-neutral-200 dark:border-neutral-800">
      {CHANGELOG.map((entry) => (
        <li key={entry.version} className="relative pb-8 pl-7 last:pb-0">
          <span className="absolute -left-[7px] top-2 h-3 w-3 rounded-full border-[3px] border-white bg-indigo-500 dark:border-neutral-900" />
          <div className="mb-1.5 flex items-center gap-2.5">
            <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 font-mono text-xs font-semibold text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-300">
              {entry.version}
            </span>
            <time className="text-[13px] text-neutral-500 dark:text-neutral-400">{entry.when}</time>
          </div>
          <h3 className="font-semibold">{entry.title}</h3>
          <p className="mt-1.5 max-w-[62ch] text-[15px] text-neutral-600 dark:text-neutral-400">
            {entry.body}
          </p>
        </li>
      ))}
    </ol>
  )
}
