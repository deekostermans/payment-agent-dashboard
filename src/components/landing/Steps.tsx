const STEPS = [
  {
    title: 'Submit your application',
    body: 'Fill in the agent application form with your personal details, business model, and the regions you operate in.',
  },
  {
    title: 'KYC & compliance review',
    body: 'Our compliance team verifies your identity and reviews your application. This typically takes 3–5 business days.',
  },
  {
    title: 'Access your dashboard',
    body: 'Once approved, you’ll receive login credentials to the Payment Agent Dashboard.',
  },
]

export default function Steps() {
  return (
    <section id="apply" className="scroll-mt-20 border-t border-hairline bg-surface">
      <div className="mx-auto max-w-5xl px-4 py-16 text-center sm:px-6">
        <p className="text-sm font-medium uppercase tracking-wide text-brand">How to become a payment agent</p>
        <h2 className="mt-2 text-3xl font-semibold text-ink-primary">Three steps to get started</h2>
        <p className="mx-auto mt-3 max-w-xl text-ink-secondary">
          The application process is straightforward. We review all agents to ensure quality and compliance — most
          applicants are approved in under a week.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-3">
          {STEPS.map((step, i) => (
            <div key={step.title} className="text-left">
              <span className="mb-3 inline-flex items-center rounded-full border border-hairline px-3 py-1 text-xs font-medium text-ink-secondary">
                Step {i + 1}
              </span>
              <h3 className="text-lg font-semibold text-ink-primary">{step.title}</h3>
              <p className="mt-1 text-sm text-ink-secondary">{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
