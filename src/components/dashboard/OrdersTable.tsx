import type { Order, OrderStatus } from '../../types'
import StatusBadge from '../StatusBadge'
import { formatCurrency, formatDate } from '../../utils/format'

interface Props {
  orders: Order[]
  selectedIds: Set<string>
  onToggleSelect: (id: string) => void
  onToggleSelectAll: () => void
  onOpenDetail: (order: Order) => void
  onBulkStatus: (status: OrderStatus) => void
  onBulkExport: () => void
  onClearSelection: () => void
}

const typeClasses: Record<Order['type'], string> = {
  Deposit: 'text-deposit',
  Payout: 'text-payout',
}

export default function OrdersTable({
  orders,
  selectedIds,
  onToggleSelect,
  onToggleSelectAll,
  onOpenDetail,
  onBulkStatus,
  onBulkExport,
  onClearSelection,
}: Props) {
  const allSelected = orders.length > 0 && orders.every((o) => selectedIds.has(o.id))

  return (
    <div className="relative">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-hairline text-xs uppercase tracking-wide text-ink-muted">
              <th className="w-10 px-4 py-3 sm:px-6">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={onToggleSelectAll}
                  aria-label="Select all orders on this page"
                />
              </th>
              <th className="px-3 py-3 font-medium">Type</th>
              <th className="px-3 py-3 font-medium">Customer</th>
              <th className="px-3 py-3 font-medium">Trading account</th>
              <th className="px-3 py-3 font-medium">Amount</th>
              <th className="px-3 py-3 font-medium">Request ID</th>
              <th className="px-3 py-3 font-medium">Date</th>
              <th className="px-3 py-3 font-medium">Status</th>
              <th className="px-3 py-3 font-medium sm:pr-6" />
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className={`border-b border-hairline transition-colors hover:bg-page ${
                  selectedIds.has(order.id) ? 'bg-brand/5' : ''
                }`}
              >
                <td className="px-4 py-3 sm:px-6">
                  <input
                    type="checkbox"
                    checked={selectedIds.has(order.id)}
                    onChange={() => onToggleSelect(order.id)}
                    aria-label={`Select order ${order.requestId}`}
                  />
                </td>
                <td className={`px-3 py-3 font-medium ${typeClasses[order.type]}`}>{order.type}</td>
                <td className="px-3 py-3">
                  <div className="text-ink-primary">{order.customerName}</div>
                  <div className="text-xs text-ink-muted">{order.customerEmail}</div>
                </td>
                <td className="px-3 py-3 text-ink-secondary">{order.tradingAccountId}</td>
                <td className="px-3 py-3 font-medium text-ink-primary tabular-nums">
                  {formatCurrency(order.amount, order.currency)}
                </td>
                <td className="px-3 py-3 text-ink-secondary">{order.requestId}</td>
                <td className="px-3 py-3 text-ink-secondary tabular-nums">{formatDate(order.date)}</td>
                <td className="px-3 py-3">
                  <StatusBadge status={order.status} />
                </td>
                <td className="px-3 py-3 text-right sm:pr-6">
                  <button
                    type="button"
                    onClick={() => onOpenDetail(order)}
                    className="rounded-md p-1.5 text-ink-secondary transition-colors hover:text-brand"
                    aria-label={`View order ${order.requestId}`}
                  >
                    {order.status === 'Sent' ? (
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <path
                          d="M11.5 2.5a1.4 1.4 0 0 1 2 2L5 13l-3 .5L2.5 10.5l9-8Z"
                          stroke="currentColor"
                          strokeWidth="1.3"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <path
                          d="M1 8s2.5-4.5 7-4.5S15 8 15 8s-2.5 4.5-7 4.5S1 8 1 8Z"
                          stroke="currentColor"
                          strokeWidth="1.3"
                        />
                        <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.3" />
                      </svg>
                    )}
                  </button>
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan={9} className="px-6 py-12 text-center text-sm text-ink-muted">
                  No orders match your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {selectedIds.size > 0 && (
        <div className="sticky bottom-4 z-10 mx-4 mt-3 flex items-center justify-between gap-4 rounded-lg bg-ink-primary px-4 py-3 text-page shadow-panel sm:mx-6">
          <span className="text-sm font-medium tabular-nums">{selectedIds.size} orders selected</span>
          <div className="flex items-center gap-4 text-sm">
            <button type="button" onClick={() => onBulkStatus('Success')} className="text-good hover:underline">
              Mark Success
            </button>
            <button type="button" onClick={() => onBulkStatus('Failed')} className="text-critical hover:underline">
              Mark Failed
            </button>
            <button type="button" onClick={onBulkExport} className="hover:underline">
              Export
            </button>
            <button type="button" onClick={onClearSelection} aria-label="Clear selection" className="text-lg leading-none">
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
