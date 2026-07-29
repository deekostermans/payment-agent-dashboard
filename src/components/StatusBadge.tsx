import type { OrderStatus } from '../types'

const CONFIG: Record<OrderStatus, { label: string; dot: string; text: string; bg: string }> = {
  Sent: {
    label: 'Sent',
    dot: 'bg-warning',
    text: 'text-[var(--status-warning-text)]',
    bg: 'bg-warning/15',
  },
  Success: {
    label: 'Success',
    dot: 'bg-good',
    text: 'text-[var(--status-good-text)]',
    bg: 'bg-good/10',
  },
  Failed: {
    label: 'Failed',
    dot: 'bg-critical',
    text: 'text-critical',
    bg: 'bg-critical/10',
  },
}

export default function StatusBadge({ status }: { status: OrderStatus }) {
  const c = CONFIG[status]
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${c.bg} ${c.text}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${c.dot}`} aria-hidden="true" />
      {c.label}
    </span>
  )
}
