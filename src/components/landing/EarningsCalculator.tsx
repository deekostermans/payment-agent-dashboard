import { useState } from 'react'
import { formatCurrency, formatCompactCurrency } from '../../utils/format'

const MIN_VOLUME = 0
const MAX_VOLUME = 500_000
const VOLUME_STEP = 5_000
const MIN_RATE = 1
const MAX_RATE = 3
const RATE_STEP = 0.1

export default function EarningsCalculator() {
  const [volume, setVolume] = useState(150_000)
  const [rate, setRate] = useState(2.5)

  const earnings = (volume * rate) / 100

  return (
    <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-brand">Earnings</p>
          <h2 className="mt-2 text-3xl font-semibold text-ink-primary">Transparent, competitive payouts</h2>
          <p className="mt-3 text-ink-secondary">
            Earn 1–3% on every transaction you process, with no cap on volume. Estimate your monthly take-home with
            the live calculator.
          </p>
          <div className="mt-4 flex flex-wrap gap-2 text-xs text-ink-secondary">
            {['Deposits', 'Withdrawals', 'No cap on volume'].map((tag) => (
              <span key={tag} className="rounded-full border border-hairline px-3 py-1">
                {tag}
              </span>
            ))}
          </div>
          <p className="mt-4 text-xs text-ink-muted">
            Illustrative only. Actual rates are confirmed during onboarding and may vary by region and payment
            method.
          </p>
        </div>

        <div className="rounded-xl border border-hairline bg-surface p-6">
          <div className="mb-5 flex items-center justify-between">
            <span className="text-sm font-medium text-ink-primary">Live earnings estimate</span>
            <span className="rounded-full bg-brand/10 px-2.5 py-1 text-xs font-medium text-brand">
              Typical agent · 1–3%
            </span>
          </div>

          <div className="mb-6 rounded-lg bg-page p-5 text-center">
            <div className="text-xs text-ink-muted">You earn per month</div>
            <div className="mt-1 text-4xl font-semibold tabular-nums text-ink-primary">
              {formatCurrency(earnings)}
            </div>
            <div className="mt-1 text-sm text-good">
              {rate.toFixed(1)}% of {formatCompactCurrency(volume)} monthly volume
            </div>
          </div>

          <label className="mb-1 flex items-center justify-between text-sm text-ink-secondary">
            <span>Monthly volume processed</span>
            <span className="font-medium text-ink-primary tabular-nums">{formatCompactCurrency(volume)}</span>
          </label>
          <input
            type="range"
            min={MIN_VOLUME}
            max={MAX_VOLUME}
            step={VOLUME_STEP}
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="mb-5 w-full accent-[var(--color-brand)]"
          />

          <label className="mb-1 flex items-center justify-between text-sm text-ink-secondary">
            <span>Commission rate</span>
            <span className="font-medium text-ink-primary tabular-nums">{rate.toFixed(1)}%</span>
          </label>
          <input
            type="range"
            min={MIN_RATE}
            max={MAX_RATE}
            step={RATE_STEP}
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            className="w-full accent-[var(--color-brand)]"
          />
        </div>
      </div>
    </section>
  )
}
