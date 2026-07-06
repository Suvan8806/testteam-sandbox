import { FEATURES } from '../data'
import { Icon } from './ui'

export default function FeaturesPanel() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {FEATURES.map((feature) => (
        <article
          key={feature.title}
          className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6 dark:border-neutral-800 dark:bg-neutral-950"
        >
          <div className="mb-4 grid h-10 w-10 place-items-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-300">
            <Icon name={feature.icon} />
          </div>
          <h3 className="font-semibold">{feature.title}</h3>
          <p className="mt-2 text-[15px] text-neutral-600 dark:text-neutral-400">{feature.body}</p>
        </article>
      ))}
    </div>
  )
}
