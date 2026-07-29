const FEATURES = [
  {
    title: 'Process payments',
    body: 'Accept deposits from traders and process withdrawals through your local payment methods.',
    icon: (
      <path
        d="M2 6h12M2 6a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1M2 6v6a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V6M5 10h2"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    title: 'Earn commissions',
    body: 'Earn a transparent, competitive commission on every deposit and withdrawal you process.',
    icon: (
      <>
        <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.4" />
        <path d="M8 5v6M6 6.5c0-.8.9-1.5 2-1.5s2 .5 2 1.3-1 1.2-2 1.2-2 .4-2 1.2 1 1.3 2 1.3 2-.5 2-1.3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </>
    ),
  },
  {
    title: 'Live dashboard',
    body: 'Track incoming orders and completed payments in real time from your agent portal.',
    icon: (
      <path
        d="M2 13V3m4 10V6m4 7V8m4 5V4"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    title: 'Platform backed',
    body: 'Operate under the platform’s regulated infrastructure with full agent success support.',
    icon: (
      <path
        d="M8 1.5 13.5 4v4c0 3.5-2.4 6-5.5 6.5C4.9 14 2.5 11.5 2.5 8V4L8 1.5Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    ),
  },
]

export default function FeatureGrid() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <p className="text-sm font-medium uppercase tracking-wide text-brand">What is a payment agent</p>
        <h2 className="mt-2 text-3xl font-semibold text-ink-primary">Your bridge between traders &amp; the platform</h2>
        <p className="mt-3 text-ink-secondary">
          Payment agents act as trusted intermediaries who help traders fund their accounts and withdraw earnings,
          especially where direct bank transfers are unavailable or impractical.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2">
        {FEATURES.map((feature) => (
          <div key={feature.title} className="flex gap-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                {feature.icon}
              </svg>
            </span>
            <div>
              <h3 className="font-semibold text-ink-primary">{feature.title}</h3>
              <p className="mt-1 text-sm text-ink-secondary">{feature.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
