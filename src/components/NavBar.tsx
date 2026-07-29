import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import LoginModal from './LoginModal'

type Theme = 'light' | 'dark'

function getInitialTheme(): Theme {
  const stored = window.localStorage.getItem('pb-theme')
  if (stored === 'light' || stored === 'dark') return stored
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export default function NavBar() {
  const location = useLocation()
  const [theme, setTheme] = useState<Theme>(getInitialTheme)
  const [loginOpen, setLoginOpen] = useState(false)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    window.localStorage.setItem('pb-theme', theme)
  }, [theme])

  const isDashboard = location.pathname.startsWith('/dashboard')

  return (
    <header className="sticky top-0 z-40 border-b border-hairline bg-surface/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2">
          <svg width="28" height="28" viewBox="0 0 32 32" aria-hidden="true">
            <rect width="32" height="32" rx="8" fill="var(--color-brand)" />
            <path
              d="M9 22V10h6.2a4.4 4.4 0 0 1 0 8.8H12.6V22H9Zm3.6-6.2h2.4a1.4 1.4 0 0 0 0-2.8h-2.4v2.8Z"
              fill="#ffffff"
            />
          </svg>
          <span className="text-lg font-semibold text-ink-primary">PayBridge</span>
        </Link>

        <nav className="flex items-center gap-2 sm:gap-4">
          <Link
            to="/"
            className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              !isDashboard ? 'text-brand' : 'text-ink-secondary hover:text-ink-primary'
            }`}
          >
            Become an Agent
          </Link>
          <Link
            to="/dashboard"
            className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              isDashboard ? 'text-brand' : 'text-ink-secondary hover:text-ink-primary'
            }`}
          >
            Agent Dashboard
          </Link>
          <button
            type="button"
            onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            className="ml-1 rounded-md border border-hairline p-2 text-ink-secondary transition-colors hover:text-ink-primary"
          >
            {theme === 'dark' ? (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path
                  d="M8 1v2M8 13v2M2.5 2.5l1.4 1.4M12.1 12.1l1.4 1.4M1 8h2M13 8h2M2.5 13.5l1.4-1.4M12.1 3.9l1.4-1.4"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
                <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.4" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path
                  d="M13.5 9.5A6 6 0 0 1 6.5 2.5a6 6 0 1 0 7 7Z"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </button>
          <button
            type="button"
            onClick={() => setLoginOpen(true)}
            className="ml-1 rounded-md bg-brand px-3 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-brand-hover"
          >
            Log in
          </button>
        </nav>
      </div>

      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </header>
  )
}
