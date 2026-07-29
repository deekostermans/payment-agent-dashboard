const STATS = [
  { value: '$1M+', label: 'Processed monthly' },
  { value: '70+', label: 'Active agents' },
  { value: '24/7', label: 'Dashboard access' },
  { value: '12+', label: 'Local currencies' },
]

export default function StatsStrip() {
  return (
    <section className="border-y border-hairline bg-surface">
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 px-4 py-10 sm:grid-cols-4 sm:px-6">
        {STATS.map((stat) => (
          <div key={stat.label} className="text-center">
            <div className="text-3xl font-semibold tabular-nums text-ink-primary">{stat.value}</div>
            <div className="mt-1 text-sm text-ink-muted">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
