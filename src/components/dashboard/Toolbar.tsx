import type { OrderStatus } from '../../types'

export interface Filters {
  search: string
  status: OrderStatus | 'All'
  dateFrom: string
  dateTo: string
}

interface Props {
  filters: Filters
  onChange: (filters: Filters) => void
  onExport: () => void
  onRefresh: () => void
}

const inputClasses =
  'h-10 rounded-md border border-hairline bg-surface px-3 text-sm text-ink-primary placeholder:text-ink-muted focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand'

export default function Toolbar({ filters, onChange, onExport, onRefresh }: Props) {
  return (
    <div className="flex flex-col gap-3 border-b border-hairline px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
      <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
        <input
          type="text"
          placeholder="Find order by ID, name, or email…"
          value={filters.search}
          onChange={(e) => onChange({ ...filters, search: e.target.value })}
          className={`${inputClasses} w-full sm:w-64`}
        />
        <div className="flex items-center gap-2">
          <input
            type="date"
            value={filters.dateFrom}
            onChange={(e) => onChange({ ...filters, dateFrom: e.target.value })}
            className={`${inputClasses} w-full sm:w-36`}
            aria-label="Date from"
          />
          <span className="text-ink-muted">–</span>
          <input
            type="date"
            value={filters.dateTo}
            onChange={(e) => onChange({ ...filters, dateTo: e.target.value })}
            className={`${inputClasses} w-full sm:w-36`}
            aria-label="Date to"
          />
        </div>
        <select
          value={filters.status}
          onChange={(e) => onChange({ ...filters, status: e.target.value as Filters['status'] })}
          className={`${inputClasses} w-full sm:w-40`}
        >
          <option value="All">All statuses</option>
          <option value="Sent">Sent</option>
          <option value="Success">Success</option>
          <option value="Failed">Failed</option>
        </select>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onExport}
          className="inline-flex h-10 items-center gap-1.5 rounded-md border border-hairline px-3 text-sm font-medium text-ink-primary transition-colors hover:bg-page"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d="M8 1v9m0 0L5 7m3 3 3-3M2 12v1.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V12"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Export CSV
        </button>
        <button
          type="button"
          onClick={onRefresh}
          aria-label="Refresh"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-hairline text-ink-secondary transition-colors hover:text-ink-primary"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d="M13.5 8a5.5 5.5 0 1 1-1.6-3.9M13.5 2v3h-3"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}
