import { useState } from 'react'
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom'

interface Props {
  open: boolean
  onClose: () => void
}

export default function LoginModal({ open, onClose }: Props) {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  if (!open) return null

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onClose()
    navigate('/dashboard')
  }

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto px-4 pt-24 sm:pt-32">
      <div className="fixed inset-0 bg-black/40" onClick={onClose} aria-hidden="true" />

      <div className="relative w-full max-w-sm rounded-xl border border-hairline bg-surface p-6 shadow-panel">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-base font-semibold text-ink-primary">Log in to PayBridge</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-md p-1.5 text-ink-secondary hover:text-ink-primary"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 3l10 10M13 3 3 13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <label className="mb-1 block text-sm font-medium text-ink-primary" htmlFor="login-email">
            Email
          </label>
          <input
            id="login-email"
            type="email"
            required
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-4 h-10 w-full rounded-md border border-hairline bg-page px-3 text-sm text-ink-primary placeholder:text-ink-muted focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
          />

          <label className="mb-1 block text-sm font-medium text-ink-primary" htmlFor="login-password">
            Password
          </label>
          <input
            id="login-password"
            type="password"
            required
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-2 h-10 w-full rounded-md border border-hairline bg-page px-3 text-sm text-ink-primary placeholder:text-ink-muted focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
          />

          <p className="mb-4 text-xs text-ink-muted">
            Demo prototype — any email/password will do, there's no real backend.
          </p>

          <button
            type="submit"
            className="w-full rounded-md bg-brand py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-hover"
          >
            Log in
          </button>
        </form>
      </div>
    </div>,
    document.body,
  )
}
