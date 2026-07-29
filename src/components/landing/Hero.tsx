import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <section className="mx-auto max-w-3xl px-4 pb-14 pt-16 text-center sm:px-6 sm:pt-24">
      <h1 className="text-4xl font-semibold leading-tight text-ink-primary sm:text-5xl">
        Move money for clients,
        <br />
        <span className="text-brand">earn on every transfer.</span>
      </h1>
      <p className="mx-auto mt-5 max-w-xl text-base text-ink-secondary sm:text-lg">
        Become a PayBridge Payment Agent — process deposits and withdrawals for your clients, earn competitive
        commissions, and manage everything from a single dashboard.
      </p>
      <Link
        to="/dashboard"
        className="mt-8 inline-flex items-center justify-center rounded-md bg-brand px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-hover"
      >
        Become a Payment Agent
      </Link>
    </section>
  )
}
