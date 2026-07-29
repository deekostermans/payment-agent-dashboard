import Hero from '../components/landing/Hero'
import StatsStrip from '../components/landing/StatsStrip'
import FeatureGrid from '../components/landing/FeatureGrid'
import EarningsCalculator from '../components/landing/EarningsCalculator'
import Steps from '../components/landing/Steps'
import FAQ from '../components/landing/FAQ'

export default function LandingPage() {
  return (
    <main>
      <Hero />
      <StatsStrip />
      <FeatureGrid />
      <EarningsCalculator />
      <Steps />
      <FAQ />

      <section className="border-t border-hairline bg-brand/5">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-4 py-12 text-center sm:flex-row sm:justify-between sm:px-6 sm:text-left">
          <div>
            <h3 className="text-lg font-semibold text-ink-primary">Earn more by referring traders</h3>
            <p className="mt-1 text-sm text-ink-secondary">
              Become a Payment Agent and earn competitive commissions, and manage everything from a single dashboard.
            </p>
          </div>
          <a
            href="#apply"
            className="shrink-0 rounded-md bg-brand px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-hover"
          >
            Become a Payment Agent
          </a>
        </div>
      </section>

      <footer className="px-4 py-8 text-center text-xs text-ink-muted sm:px-6">
        PayBridge is a fictional brand built for a portfolio project. All data shown is synthetic.
      </footer>
    </main>
  )
}
