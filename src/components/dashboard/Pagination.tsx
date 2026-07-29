interface Props {
  page: number
  pageSize: number
  total: number
  onPageChange: (page: number) => void
}

export default function Pagination({ page, pageSize, total, onPageChange }: Props) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const start = total === 0 ? 0 : (page - 1) * pageSize + 1
  const end = Math.min(page * pageSize, total)

  const btn =
    'inline-flex h-8 w-8 items-center justify-center rounded-md border border-hairline text-ink-secondary transition-colors hover:text-ink-primary disabled:cursor-not-allowed disabled:opacity-40'

  return (
    <div className="flex items-center justify-between px-4 py-3 sm:px-6">
      <p className="text-sm text-ink-secondary tabular-nums">
        {start}-{end} of {total}
      </p>
      <div className="flex items-center gap-1.5">
        <button className={btn} disabled={page <= 1} onClick={() => onPageChange(1)} aria-label="First page">
          «
        </button>
        <button className={btn} disabled={page <= 1} onClick={() => onPageChange(page - 1)} aria-label="Previous page">
          ‹
        </button>
        <span className="px-2 text-sm text-ink-secondary tabular-nums">
          {page} / {totalPages}
        </span>
        <button
          className={btn}
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
          aria-label="Next page"
        >
          ›
        </button>
        <button
          className={btn}
          disabled={page >= totalPages}
          onClick={() => onPageChange(totalPages)}
          aria-label="Last page"
        >
          »
        </button>
      </div>
    </div>
  )
}
