import { useState } from 'react'

const FAQS = [
  {
    q: 'Who can become a Payment Agent?',
    a: 'Anyone with an established local payment network and a track record of trustworthy transactions in their region can apply. All applicants go through a KYC and compliance review.',
  },
  {
    q: 'What payment methods can I offer?',
    a: 'Whatever your local traders trust most — bank transfer, e-wallets, mobile money, or cash pickup. You choose the methods you support during onboarding.',
  },
  {
    q: 'How do I track transactions?',
    a: 'Every request you process appears in your Payment Agent Dashboard in real time, with full search, filtering, and CSV export.',
  },
  {
    q: 'When and how do I get paid?',
    a: 'Commissions accrue per transaction and are visible in your dashboard balance; payout cadence is confirmed during onboarding.',
  },
  {
    q: 'Is there a setup fee or volume minimum?',
    a: 'No setup fee and no minimum volume — commissions scale with however much you process.',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <div className="mb-10 text-center">
        <p className="text-sm font-medium uppercase tracking-wide text-brand">FAQ</p>
        <h2 className="mt-2 text-3xl font-semibold text-ink-primary">Got questions? We have answers</h2>
      </div>

      <div className="divide-y divide-hairline overflow-hidden rounded-xl border border-hairline">
        {FAQS.map((item, i) => {
          const open = openIndex === i
          return (
            <div key={item.q} className="bg-surface">
              <button
                type="button"
                onClick={() => setOpenIndex(open ? null : i)}
                className="flex w-full items-center justify-between px-5 py-4 text-left text-sm font-medium text-ink-primary"
                aria-expanded={open}
              >
                {item.q}
                <span className="ml-4 text-lg text-ink-muted">{open ? '−' : '+'}</span>
              </button>
              {open && <p className="px-5 pb-4 text-sm text-ink-secondary">{item.a}</p>}
            </div>
          )
        })}
      </div>
    </section>
  )
}
